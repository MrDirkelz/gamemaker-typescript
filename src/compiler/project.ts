import crypto from "node:crypto";
import fs from "fs-extra";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import json5 from "json5";
import {IObject} from "../entities/object";
import {createObjectEvent, IObjectEvent} from "../entities/objectEvent";
import {IProject, IProjectResource} from "../entities/project";
import {
  EventTypes,
  getCollisionTargetName,
  isCollisionHandler,
  isDynamicKeyboardHandler,
  objectEvents,
  resolveObjectEvent,
} from "../events";
import {processObjectFile} from "../processor/object";
import {processScriptFile} from "../processor/script";
import {MIN_REQUIRED_IDE_VERSION, TARGET_RUNTIME_VERSION} from "../const";
import {isVersionHigher} from "../utils/version";
import {fromTypeScriptDiagnostic, GMTSCompilationError, GMTSDiagnostic, nodeDiagnostic} from "./diagnostics";
import {validateGmlSubset} from "./subset";
import {GmlEmitError} from "./emitter";

const COMPILER_VERSION = "1.0.0";
const TYPE_PACK_VERSION = TARGET_RUNTIME_VERSION;
const MANIFEST_PATH = ".gmts/manifest.json";
const GENERATED_DECLARATIONS_PATH = ".gmts/generated/project.d.ts";

interface ManifestFile {
  sha256: string;
  resource: string;
  eventKey?: string;
}

interface ManifestResource {
  events?: string[];
  parentObjectId?: { name: string; path: string } | null;
  previousParentObjectId?: { name: string; path: string } | null;
}

interface GMTSManifest {
  schemaVersion: 2;
  compilerVersion: string;
  typePackVersion: string;
  files: Record<string, ManifestFile>;
  resources: Record<string, ManifestResource>;
}

interface ObjectSource {
  resource: IProjectResource;
  sourcePath: string;
  sourceFile: ts.SourceFile;
  classNode: ts.ClassDeclaration;
  className: string;
  extendsName?: string;
}

interface PlannedWrite {
  path: string;
  content: string;
  generated: boolean;
  resource: string;
  eventKey?: string;
}

export interface CompilationChange {
  kind: "write" | "delete" | "adopt";
  path: string;
}

export interface CompilationPlan {
  root: string;
  projectFile: string;
  diagnostics: GMTSDiagnostic[];
  changes: CompilationChange[];
  metadataChanges: string[];
  writes: PlannedWrite[];
  deletions: string[];
  manifest: GMTSManifest;
  inputHashes: Record<string, string | null>;
}

export interface AnalyzeProjectOptions {
  root: string;
  libraryRoot: string;
}

const sha256 = (content: string | Buffer): string => crypto.createHash("sha256").update(content).digest("hex");
const relative = (root: string, filename: string): string => path.relative(root, filename).split(path.sep).join("/");
const absolute = (root: string, filename: string): string => {
  const resolvedRoot = path.resolve(root);
  const resolved = path.resolve(resolvedRoot, filename);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new GMTSCompilationError([{
      code: "GMTS2007",
      message: `Resource path escapes the GameMaker project: ${filename}.`,
      severity: "error",
    }]);
  }
  const realRoot = fs.existsSync(resolvedRoot) ? fs.realpathSync(resolvedRoot) : resolvedRoot;
  let existing = resolved;
  while (!fs.existsSync(existing) && existing !== resolvedRoot) existing = path.dirname(existing);
  if (fs.existsSync(existing)) {
    const realExisting = fs.realpathSync(existing);
    if (realExisting !== realRoot && !realExisting.startsWith(`${realRoot}${path.sep}`)) {
      throw new GMTSCompilationError([{
        code: "GMTS2007",
        message: `Resource path resolves outside the real GameMaker project through a symbolic link: ${filename}.`,
        severity: "error",
      }]);
    }
  }
  return resolved;
};

const readJson5 = <T>(filename: string): T => json5.parse(fs.readFileSync(filename, "utf8")) as T;

const emptyManifest = (): GMTSManifest => ({
  schemaVersion: 2,
  compilerVersion: COMPILER_VERSION,
  typePackVersion: TYPE_PACK_VERSION,
  files: {},
  resources: {},
});

const readManifest = (root: string): GMTSManifest => {
  const filename = absolute(root, MANIFEST_PATH);
  if (!fs.existsSync(filename)) return emptyManifest();
  try {
    const manifest = JSON.parse(fs.readFileSync(filename, "utf8")) as Omit<GMTSManifest, "schemaVersion"> & { schemaVersion: number };
    const schemaVersion = manifest.schemaVersion;
    if (schemaVersion !== 1 && schemaVersion !== 2) throw new Error(`unsupported schema ${String(schemaVersion)}`);
    if (!manifest.files || typeof manifest.files !== "object" || Array.isArray(manifest.files)) throw new Error("files must be an object");
    if (!manifest.resources || typeof manifest.resources !== "object" || Array.isArray(manifest.resources)) throw new Error("resources must be an object");
    if (typeof manifest.compilerVersion !== "string" || typeof manifest.typePackVersion !== "string") throw new Error("compilerVersion and typePackVersion are required");
    return { ...manifest, schemaVersion: 2 };
  } catch (error) {
    throw new GMTSCompilationError([{
      code: "GMTS2403",
      message: `Ownership manifest is invalid: ${error instanceof Error ? error.message : String(error)}. Repair or remove it explicitly before compiling.`,
      severity: "error",
      file: MANIFEST_PATH,
    }]);
  }
};

const findProjectFile = (root: string): string => {
  const projectFiles = fs.readdirSync(root).filter((filename) => filename.endsWith(".yyp"));
  if (projectFiles.length !== 1) {
    throw new GMTSCompilationError([{
      code: "GMTS2001",
      message: `Expected exactly one .yyp project in ${root}; found ${projectFiles.length}.`,
      severity: "error",
    }]);
  }
  return path.join(root, projectFiles[0]);
};

const implementationFiles = (folder: string): string[] => fs.existsSync(folder)
  ? fs.readdirSync(folder)
    .filter((filename) => filename.endsWith(".ts") && !filename.endsWith(".d.ts"))
    .map((filename) => path.join(folder, filename))
    .sort()
  : [];

const extendsNameOf = (declaration: ts.ClassDeclaration): string | undefined => {
  const clause = declaration.heritageClauses?.find((item) => item.token === ts.SyntaxKind.ExtendsKeyword);
  const expression = clause?.types[0]?.expression;
  return expression && ts.isIdentifier(expression) ? expression.text : undefined;
};

const eventKey = (event: IObjectEvent): string =>
  `${event.eventNum}_${event.eventType}${event.collisionObjectId?.name ? `_${event.collisionObjectId.name}` : ""}`;

const eventKeyFor = (eventNum: number, eventType: number, collisionName?: string): string =>
  `${eventNum}_${eventType}${collisionName ? `_${collisionName}` : ""}`;

const assetTypeByFolder: Record<string, string> = {
  animcurves: "Asset.GMAnimCurve",
  animationcurves: "Asset.GMAnimCurve",
  audiogroups: "Asset.GMAudioGroup",
  fonts: "Asset.GMFont",
  objects: "Asset.GMObject",
  particles: "Asset.GMParticleSystem",
  particlesystems: "Asset.GMParticleSystem",
  paths: "Asset.GMPath",
  rooms: "Asset.GMRoom",
  sequences: "Asset.GMSequence",
  shaders: "Asset.GMShader",
  sounds: "Asset.GMSound",
  sprites: "Asset.GMSprite",
  tilesets: "Asset.GMTileSet",
  timelines: "Asset.GMTimeline",
};

const resourceFolder = (resource: IProjectResource): string => resource.id.path.replaceAll("\\", "/").split("/")[0];

const extensionDeclarations = (root: string, resources: IProjectResource[]): string[] => {
  const lines: string[] = [];
  const extensionType = (type: number | undefined): string => type === 1 ? "string" : type === 2 ? "number" : "unknown";
  for (const resource of resources.filter((item) => resourceFolder(item) === "extensions")) {
    const filename = absolute(root, resource.id.path);
    if (!fs.existsSync(filename)) continue;
    const extension = readJson5<{ files?: Array<{ functions?: Array<{ name?: string; argCount?: number; args?: number[]; returnType?: number }>; constants?: Array<{ name?: string }> }> }>(filename);
    for (const file of extension.files ?? []) {
      for (const fn of file.functions ?? []) {
        if (!fn.name || !/^[A-Za-z_$][\w$]*$/.test(fn.name)) continue;
        const args = fn.argCount === -1
          ? ["...args: unknown[]"]
          : Array.from({ length: Math.max(0, fn.argCount ?? fn.args?.length ?? 0) }, (_, index) => `arg${index}: ${extensionType(fn.args?.[index])}`);
        lines.push(`declare function ${fn.name}(${args.join(", ")}): ${extensionType(fn.returnType)};`);
      }
      for (const constant of file.constants ?? []) {
        if (constant.name && /^[A-Za-z_$][\w$]*$/.test(constant.name)) lines.push(`declare const ${constant.name}: unknown;`);
      }
    }
  }
  return lines;
};

const safeIdentifier = (name: string): boolean => /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);

const inferLiteralType = (value: string): string => {
  const trimmed = value.trim();
  if (/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(trimmed)) return trimmed;
  if (/^(?:true|false)$/.test(trimmed)) return trimmed;
  if (/^"(?:[^"\\]|\\.)*"$/.test(trimmed)) return trimmed;
  return "unknown";
};

/** Conservative declarations for protected, hand-authored GML resources. */
const declaredNamesFromTypeFiles = (files: Iterable<string>): Set<string> => {
  const names = new Set<string>();
  for (const filename of files) {
    if (!fs.existsSync(filename)) continue;
    const sourceFile = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
    for (const statement of sourceFile.statements) {
      if ((
        ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) || ts.isEnumDeclaration(statement)
      ) && statement.name) names.add(statement.name.text);
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) if (ts.isIdentifier(declaration.name)) names.add(declaration.name.text);
      }
    }
  }
  return names;
};

const manualGmlDeclarations = (
  root: string,
  resources: IProjectResource[],
  typedScripts: Set<string>,
  refinedNames: Set<string>,
): string[] => {
  const lines: string[] = [];
  for (const resource of resources.filter((item) => resourceFolder(item) === "scripts" && !typedScripts.has(item.id.name))) {
    const resourcePath = absolute(root, resource.id.path);
    const gmlPath = path.join(path.dirname(resourcePath), `${resource.id.name}.gml`);
    if (!fs.existsSync(gmlPath)) continue;
    const source = fs.readFileSync(gmlPath, "utf8");
    for (const match of source.matchAll(/^\s*#macro\s+([A-Za-z_][A-Za-z0-9_]*)\s+(.+)$/gm)) {
      if (!refinedNames.has(match[1])) lines.push(`declare const ${match[1]}: ${inferLiteralType(match[2])};`);
    }
    for (const match of source.matchAll(/\benum\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{([^}]*)\}/gs)) {
      const members = [...match[2].matchAll(/(?:^|,)\s*([A-Za-z_][A-Za-z0-9_]*)(?:\s*=\s*(-?\d+))?/g)];
      if (!members.length) continue;
      let next = 0;
      const body = members.map((member) => {
        if (member[2] !== undefined) next = Number(member[2]);
        const line = `  ${member[1]} = ${next}`;
        next += 1;
        return line;
      });
      if (!refinedNames.has(match[1])) lines.push(`declare enum ${match[1]} {\n${body.join(",\n")}\n}`);
    }
    for (const match of source.matchAll(/\bfunction\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(([^)]*)\)\s*(constructor)?/g)) {
      const name = match[1];
      const parameters = match[2].split(",").map((part) => part.trim()).filter(Boolean).map((part, index) => {
        const [rawName, initializer] = part.split("=", 2);
        const candidate = rawName.trim().replace(/^\.{3}/, "");
        const parameter = safeIdentifier(candidate) ? candidate : `arg${index}`;
        return `${parameter}${initializer === undefined ? "" : "?"}: unknown`;
      });
      if (refinedNames.has(name)) continue;
      if (match[3]) lines.push(`declare class ${name} { constructor(${parameters.join(", ")}); }`);
      else lines.push(`declare function ${name}(${parameters.join(", ")}): unknown;`);
    }
  }
  return lines;
};

const roomInstanceDeclarations = (
  root: string,
  resources: IProjectResource[],
  classByResource: Map<string, string>,
): string[] => {
  const lines: string[] = [];
  const visitLayers = (layers: unknown[]) => {
    for (const rawLayer of layers) {
      if (!rawLayer || typeof rawLayer !== "object") continue;
      const layer = rawLayer as { instances?: unknown[]; layers?: unknown[] };
      for (const rawInstance of layer.instances ?? []) {
        if (!rawInstance || typeof rawInstance !== "object") continue;
        const instance = rawInstance as { name?: string; objectId?: { name?: string } };
        const className = instance.objectId?.name ? classByResource.get(instance.objectId.name) : undefined;
        if (instance.name && safeIdentifier(instance.name) && className) lines.push(`declare const ${instance.name}: ${className};`);
      }
      if (layer.layers) visitLayers(layer.layers);
    }
  };
  for (const resource of resources.filter((item) => resourceFolder(item) === "rooms")) {
    const filename = absolute(root, resource.id.path);
    if (!fs.existsSync(filename)) continue;
    const room = readJson5<{ layers?: unknown[] }>(filename);
    visitLayers(room.layers ?? []);
  }
  return lines;
};

const projectDeclarations = (
  root: string,
  resources: IProjectResource[],
  objectSources: ObjectSource[],
  typedScripts: Set<string>,
  refinementFiles: Iterable<string>,
): string => {
  const classByResource = new Map(
    resources
      .filter((resource) => resourceFolder(resource) === "objects")
      .map((resource) => [resource.id.name, "GMObject"]),
  );
  for (const source of objectSources) classByResource.set(source.resource.id.name, source.className);
  const lines = [
    `// Generated by gmts ${COMPILER_VERSION} for GameMaker LTS ${TYPE_PACK_VERSION}.`,
    "",
  ];
  for (const resource of resources) {
    const folder = resourceFolder(resource);
    const type = assetTypeByFolder[folder];
    if (!type || !/^[A-Za-z_$][\w$]*$/.test(resource.id.name)) continue;
    if (folder === "objects") {
      const className = classByResource.get(resource.id.name) ?? "GMObject";
      lines.push(`declare const ${resource.id.name}: Asset.GMObject<${className}>;`);
    } else lines.push(`declare const ${resource.id.name}: ${type};`);
  }
  lines.push(
    ...roomInstanceDeclarations(root, resources, classByResource),
    ...manualGmlDeclarations(root, resources, typedScripts, declaredNamesFromTypeFiles(refinementFiles)),
    ...extensionDeclarations(root, resources),
    "",
    "interface GMObject {",
  );
  for (const event of objectEvents) lines.push(`  ${event.handler}(): void;`);
  for (const source of objectSources) {
    for (const member of source.classNode.members) {
      if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name)) continue;
      const methodName = member.name.text;
      if (isCollisionHandler(methodName)) {
        const targetClass = classByResource.get(getCollisionTargetName(methodName));
        if (targetClass) lines.push(`  ${methodName}(other: ${targetClass}): void;`);
      } else if (isDynamicKeyboardHandler(methodName) && resolveObjectEvent(methodName)) {
        lines.push(`  ${methodName}(): void;`);
      }
    }
  }
  lines.push("}", "");
  return [...new Set(lines)].join("\n") + "\n";
};

const eraseTypeOnlyModuleSyntax = (filename: string, source: string): string => {
  const sourceFile = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const characters = source.split("");
  const aliases: string[] = [];
  const blank = (start: number, end: number) => {
    for (let index = start; index < end; index += 1) if (characters[index] !== "\n" && characters[index] !== "\r") characters[index] = " ";
  };
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) {
      const bindings = statement.importClause?.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          if (element.propertyName && element.propertyName.text !== element.name.text) aliases.push(`type ${element.name.text} = ${element.propertyName.text};`);
        }
      }
      blank(statement.getStart(sourceFile), statement.end);
      continue;
    }
    if (ts.isExportDeclaration(statement)) {
      blank(statement.getStart(sourceFile), statement.end);
      continue;
    }
    if (ts.canHaveModifiers(statement)) {
      for (const modifier of ts.getModifiers(statement) ?? []) {
        if (modifier.kind === ts.SyntaxKind.ExportKeyword || modifier.kind === ts.SyntaxKind.DefaultKeyword) blank(modifier.getStart(sourceFile), modifier.end);
      }
    }
  }
  return `${characters.join("")}\n${aliases.join("\n")}`;
};

interface ProjectTypeScriptConfiguration {
  fileNames: string[];
  options: ts.CompilerOptions;
  diagnostics: ts.Diagnostic[];
}

const strictCompilerOptions: ts.CompilerOptions = {
  allowUnreachableCode: false,
  exactOptionalPropertyTypes: true,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  noEmit: true,
  noFallthroughCasesInSwitch: true,
  noImplicitOverride: true,
  noLib: true,
  noUncheckedIndexedAccess: true,
  skipLibCheck: false,
  strict: true,
  strictPropertyInitialization: false,
  target: ts.ScriptTarget.ES2022,
  useDefineForClassFields: false,
};

const loadProjectTypeScriptConfiguration = (root: string): ProjectTypeScriptConfiguration => {
  const configPath = path.join(root, "tsconfig.gmts.json");
  if (!fs.existsSync(configPath)) return { fileNames: [], options: strictCompilerOptions, diagnostics: [] };
  const read = ts.readConfigFile(configPath, ts.sys.readFile);
  if (read.error) return { fileNames: [], options: strictCompilerOptions, diagnostics: [read.error] };
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, root, strictCompilerOptions, configPath);
  return {
    fileNames: parsed.fileNames.map((filename) => path.resolve(filename)),
    options: { ...parsed.options, ...strictCompilerOptions },
    diagnostics: [...parsed.errors],
  };
};

const programDiagnostics = (
  root: string,
  libraryRoot: string,
  sourceFiles: string[],
  generatedDeclarations: string,
  configuration: ProjectTypeScriptConfiguration,
): GMTSDiagnostic[] => {
  const staticTypes = path.join(libraryRoot, "gamemaker-config", ".ts", "static", "index.d.ts");
  if (!fs.existsSync(staticTypes)) {
    return [{ code: "GMTS2002", message: `LTS declarations were not found at ${staticTypes}.`, severity: "error" }];
  }
  const virtualFile = absolute(root, GENERATED_DECLARATIONS_PATH);
  const options = configuration.options;
  const host = ts.createCompilerHost(options);
  const erasedSources = new Map(sourceFiles.map((filename) => {
    const resolved = path.resolve(filename);
    return [resolved, eraseTypeOnlyModuleSyntax(resolved, fs.readFileSync(resolved, "utf8"))];
  }));
  const originalFileExists = host.fileExists.bind(host);
  const originalReadFile = host.readFile.bind(host);
  const originalGetSourceFile = host.getSourceFile.bind(host);
  host.fileExists = (filename) => path.resolve(filename) === virtualFile || erasedSources.has(path.resolve(filename)) || originalFileExists(filename);
  host.readFile = (filename) => path.resolve(filename) === virtualFile ? generatedDeclarations : erasedSources.get(path.resolve(filename)) ?? originalReadFile(filename);
  host.getSourceFile = (filename, languageVersion, onError, shouldCreateNewSourceFile) => {
    if (path.resolve(filename) === virtualFile) return ts.createSourceFile(filename, generatedDeclarations, languageVersion, true);
    const erased = erasedSources.get(path.resolve(filename));
    if (erased !== undefined) return ts.createSourceFile(filename, erased, languageVersion, true);
    return originalGetSourceFile(filename, languageVersion, onError, shouldCreateNewSourceFile);
  };
  const program = ts.createProgram({
    rootNames: [
      ...new Set([
        ...sourceFiles,
        ...configuration.fileNames.filter((filename) => !filename.includes(`${path.sep}.gmts${path.sep}types${path.sep}`)),
        staticTypes,
        virtualFile,
      ]),
    ],
    options,
    host,
  });
  return [...configuration.diagnostics, ...ts.getPreEmitDiagnostics(program)]
    .map((diagnostic) => fromTypeScriptDiagnostic(diagnostic, root));
};

const validateCollisionMethods = (
  objectSources: ObjectSource[],
  resources: IProjectResource[],
  diagnostics: GMTSDiagnostic[],
) => {
  const classByResource = new Map(
    resources
      .filter((resource) => resourceFolder(resource) === "objects")
      .map((resource) => [resource.id.name, "GMObject"]),
  );
  for (const source of objectSources) classByResource.set(source.resource.id.name, source.className);
  for (const source of objectSources) {
    for (const member of source.classNode.members) {
      if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name)) continue;
      const methodName = member.name.text;
      if (isDynamicKeyboardHandler(methodName) && !resolveObjectEvent(methodName)) {
        diagnostics.push(nodeDiagnostic(source.sourceFile, member.name, "GMTS2101", `Unknown keyboard event suffix in ${methodName}. Use vk_*, A-Z, or Digit0-Digit9.`));
      }
      if (!isCollisionHandler(methodName)) continue;
      const targetName = getCollisionTargetName(methodName);
      const targetClass = classByResource.get(targetName);
      const hasOverride = member.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.OverrideKeyword);
      if (!hasOverride) diagnostics.push(nodeDiagnostic(source.sourceFile, member.name, "GMTS2103", `Collision handler ${methodName} must use the override modifier.`));
      if (!targetClass) {
        diagnostics.push(nodeDiagnostic(source.sourceFile, member.name, "GMTS2102", `Collision target object ${targetName} does not exist.`));
        continue;
      }
      if (member.parameters.length !== 1 || !ts.isIdentifier(member.parameters[0].name) || member.parameters[0].name.text !== "other") {
        diagnostics.push(nodeDiagnostic(source.sourceFile, member, "GMTS2104", `Collision handler ${methodName} must declare exactly one parameter named other.`));
        continue;
      }
      const typeText = member.parameters[0].type?.getText(source.sourceFile);
      if (typeText !== targetClass) {
        diagnostics.push(nodeDiagnostic(source.sourceFile, member.parameters[0], "GMTS2105", `Collision parameter other must have type ${targetClass}; found ${typeText ?? "no type"}.`));
      }
    }
  }
};

const validateInheritance = (objectSources: ObjectSource[], diagnostics: GMTSDiagnostic[]) => {
  const sourceByClass = new Map<string, ObjectSource>();
  for (const source of objectSources) {
    if (sourceByClass.has(source.className)) {
      diagnostics.push(nodeDiagnostic(source.sourceFile, source.classNode.name!, "GMTS2201", `Duplicate object class ${source.className}.`));
    } else sourceByClass.set(source.className, source);
  }
  for (const source of objectSources) {
    if (!source.extendsName) {
      diagnostics.push(nodeDiagnostic(source.sourceFile, source.classNode, "GMTS2202", `Object class ${source.className} must extend GMObject or another object class.`));
    } else if (source.extendsName !== "GMObject" && !sourceByClass.has(source.extendsName)) {
      diagnostics.push(nodeDiagnostic(source.sourceFile, source.classNode, "GMTS2203", `Parent object class ${source.extendsName} cannot be resolved.`));
    }
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (name: string, chain: string[]) => {
    if (visiting.has(name)) {
      const source = sourceByClass.get(name)!;
      diagnostics.push(nodeDiagnostic(source.sourceFile, source.classNode, "GMTS2204", `Circular object inheritance: ${[...chain, name].join(" -> ")}.`));
      return;
    }
    if (visited.has(name)) return;
    visiting.add(name);
    const parent = sourceByClass.get(name)?.extendsName;
    if (parent && parent !== "GMObject" && sourceByClass.has(parent)) visit(parent, [...chain, name]);
    visiting.delete(name);
    visited.add(name);
  };
  for (const name of sourceByClass.keys()) visit(name, []);
};

const validateObjectSuperCalls = (objectSources: ObjectSource[], diagnostics: GMTSDiagnostic[]) => {
  const sourceByClass = new Map(objectSources.map((source) => [source.className, source]));
  const parentDefinesHelper = (source: ObjectSource, methodName: string): boolean => {
    let parentName = source.extendsName;
    while (parentName && parentName !== "GMObject") {
      const parent = sourceByClass.get(parentName);
      if (!parent) return false;
      if (parent.classNode.members.some((member) => ts.isMethodDeclaration(member) && ts.isIdentifier(member.name) && member.name.text === methodName)) return true;
      parentName = parent.extendsName;
    }
    return false;
  };
  for (const source of objectSources) {
    for (const member of source.classNode.members) {
      if (!ts.isMethodDeclaration(member) || !member.body || !ts.isIdentifier(member.name)) continue;
      const currentName = member.name.text;
      const currentIsEvent = Boolean(resolveObjectEvent(currentName) || isCollisionHandler(currentName));
      let inheritedEventCalls = 0;
      const visit = (node: ts.Node) => {
        if (
          ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression) &&
          node.expression.expression.kind === ts.SyntaxKind.SuperKeyword
        ) {
          const calledName = node.expression.name.text;
          const calledIsEvent = Boolean(resolveObjectEvent(calledName) || isCollisionHandler(calledName));
          if (calledIsEvent) {
            inheritedEventCalls += 1;
            if (!currentIsEvent || calledName !== currentName) {
              diagnostics.push(nodeDiagnostic(source.sourceFile, node, "GMTS2106", `Event ${currentName} may inherit only itself; found super.${calledName}().`));
            }
            if (!ts.isExpressionStatement(node.parent) || node.parent.parent !== member.body) {
              diagnostics.push(nodeDiagnostic(source.sourceFile, node, "GMTS2107", "An inherited event call must be one direct top-level statement in the event body."));
            }
            const validCollisionArgument = isCollisionHandler(currentName) && node.arguments.length === 1 && ts.isIdentifier(node.arguments[0]) && node.arguments[0].text === "other";
            if (node.arguments.length !== 0 && !validCollisionArgument) {
              diagnostics.push(nodeDiagnostic(source.sourceFile, node, "GMTS2108", "Inherited events accept no arguments; a collision event may optionally pass its built-in other parameter, which is erased."));
            }
          } else if (!parentDefinesHelper(source, calledName)) {
            diagnostics.push(nodeDiagnostic(source.sourceFile, node, "GMTS2109", `Parent helper ${calledName} cannot be resolved in the object inheritance chain.`));
          }
        }
        ts.forEachChild(node, visit);
      };
      ts.forEachChild(member.body, visit);
      if (inheritedEventCalls > 1) {
        diagnostics.push(nodeDiagnostic(source.sourceFile, member.name, "GMTS2110", `Event ${currentName} may call its inherited event at most once.`));
      }
    }
  }
};

const pushWrite = (writes: PlannedWrite[], write: PlannedWrite) => {
  const existing = writes.find((item) => item.path === write.path);
  if (existing && existing.content !== write.content) throw new Error(`Conflicting output plan for ${write.path}.`);
  if (!existing) writes.push(write);
};

const asCompilationError = (root: string, error: unknown): never => {
  if (error instanceof GmlEmitError) {
    throw new GMTSCompilationError([{
      code: error.code,
      message: error.detail,
      severity: "error",
      file: relative(root, error.file),
      line: error.line,
      column: error.column,
    }]);
  }
  throw error;
};

export const analyzeProject = (options: AnalyzeProjectOptions): CompilationPlan => {
  const root = path.resolve(options.root);
  const projectFile = findProjectFile(root);
  const project = readJson5<IProject>(projectFile);
  const diagnostics: GMTSDiagnostic[] = [];
  if (!isVersionHigher(project.MetaData.IDEVersion, MIN_REQUIRED_IDE_VERSION)) {
    diagnostics.push({
      code: "GMTS2009",
      message: `GameMaker IDE ${project.MetaData.IDEVersion} is unsupported; minimum ${MIN_REQUIRED_IDE_VERSION} is required for the compiler hook.`,
      severity: "error",
      file: relative(root, projectFile),
    });
  }
  const objectSources: ObjectSource[] = [];
  const scriptSources: Array<{ resource: IProjectResource; sourcePath: string; sourceFile: ts.SourceFile }> = [];
  const helperSources = new Set<string>();

  for (const resource of project.resources) {
    const kind = resourceFolder(resource);
    if (kind !== "objects" && kind !== "scripts") continue;
    const resourcePath = absolute(root, resource.id.path);
    if (fs.existsSync(path.dirname(resourcePath))) {
      for (const filename of fs.readdirSync(path.dirname(resourcePath))) {
        if (filename.endsWith(".d.ts")) helperSources.add(path.join(path.dirname(resourcePath), filename));
      }
    }
    const sources = implementationFiles(path.dirname(resourcePath));
    if (sources.length > 1) {
      diagnostics.push({
        code: "GMTS2003",
        message: `Resource ${resource.id.name} has ${sources.length} implementation .ts files; exactly one is allowed. Neighbouring .d.ts helpers are permitted.`,
        severity: "error",
        file: relative(root, path.dirname(resourcePath)),
      });
      continue;
    }
    if (sources.length === 0) continue;
    const sourcePath = sources[0];
    const sourceFile = ts.createSourceFile(sourcePath, fs.readFileSync(sourcePath, "utf8"), ts.ScriptTarget.Latest, true);
    diagnostics.push(...validateGmlSubset(sourceFile).map((diagnostic) => ({ ...diagnostic, file: relative(root, diagnostic.file!) })));
    if (kind === "scripts") {
      scriptSources.push({ resource, sourcePath, sourceFile });
      continue;
    }
    const classes = sourceFile.statements.filter(ts.isClassDeclaration).filter((item) => item.name);
    if (classes.length !== 1) {
      diagnostics.push({
        code: "GMTS2004",
        message: `Object resource ${resource.id.name} must contain exactly one named top-level class; found ${classes.length}.`,
        severity: "error",
        file: relative(root, sourcePath),
      });
      continue;
    }
    const classNode = classes[0];
    for (const statement of sourceFile.statements) {
      if (
        statement === classNode ||
        ts.isImportDeclaration(statement) ||
        ts.isExportDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isEmptyStatement(statement)
      ) continue;
      diagnostics.push(nodeDiagnostic(
        sourceFile,
        statement,
        "GMTS2008",
        ts.isEnumDeclaration(statement)
          ? "Runtime enums must be declared in a script resource so GameMaker can expose them globally."
          : "Object resources may contain one object class plus type-only declarations; move other runtime declarations to a script resource.",
      ));
    }
    for (const member of classNode.members) {
      if (ts.isConstructorDeclaration(member)) {
        diagnostics.push(nodeDiagnostic(sourceFile, member, "GMTS2005", "GameMaker object classes use onCreate(), not a TypeScript constructor."));
      }
      if (ts.canHaveModifiers(member) && ts.getModifiers(member)?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword)) {
        diagnostics.push(nodeDiagnostic(sourceFile, member, "GMTS2006", "Static object members cannot be emitted with GameMaker instance semantics."));
      }
    }
    objectSources.push({
      resource,
      sourcePath,
      sourceFile,
      classNode,
      className: classNode.name!.text,
      extendsName: extendsNameOf(classNode),
    });
  }

  validateInheritance(objectSources, diagnostics);
  validateCollisionMethods(objectSources, project.resources, diagnostics);
  validateObjectSuperCalls(objectSources, diagnostics);
  const configuration = loadProjectTypeScriptConfiguration(root);
  const implementationSourceSet = new Set([
    ...objectSources.map((source) => path.resolve(source.sourcePath)),
    ...scriptSources.map((source) => path.resolve(source.sourcePath)),
  ]);
  for (const filename of configuration.fileNames) {
    if (filename.endsWith(".d.ts")) helperSources.add(filename);
    else if (filename.endsWith(".ts") && !implementationSourceSet.has(filename)) {
      diagnostics.push({
        code: "GMTS2010",
        message: "Runtime TypeScript files must belong to exactly one GameMaker object or script resource; move shared declarations to a .d.ts file.",
        severity: "error",
        file: relative(root, filename),
      });
    }
  }
  const declarations = projectDeclarations(
    root,
    project.resources,
    objectSources,
    new Set(scriptSources.map((source) => source.resource.id.name)),
    helperSources,
  );
  const allSources = [...objectSources.map((source) => source.sourcePath), ...scriptSources.map((source) => source.sourcePath), ...helperSources];
  diagnostics.push(...programDiagnostics(root, options.libraryRoot, allSources, declarations, configuration));
  if (diagnostics.some((diagnostic) => diagnostic.severity === "error")) throw new GMTSCompilationError(diagnostics);

  const writes: PlannedWrite[] = [];
  const metadataChanges: string[] = [];
  const resources: GMTSManifest["resources"] = {};
  const previousManifest = readManifest(root);
  const objectResourceByName = new Map(project.resources.filter((resource) => resourceFolder(resource) === "objects").map((resource) => [resource.id.name, resource]));
  const sourceByClass = new Map(objectSources.map((source) => [source.className, source]));

  for (const source of objectSources) {
    const resourcePath = absolute(root, source.resource.id.path);
    const resourceRelative = relative(root, resourcePath);
    const object = readJson5<IObject>(resourcePath);
    const priorEventKeys = (object.eventList ?? []).map(eventKey).sort();
    const priorParent = object.parentObjectId;
    let processed;
    try { processed = processObjectFile(source.sourcePath, (name) => objectResourceByName.get(name)?.id); }
    catch (error) { asCompilationError(root, error); }
    if (!processed) continue;
    const generatedEvents: IObjectEvent[] = [];
    const generatedKeys: string[] = [];
    for (const script of processed.scripts) {
      const event = resolveObjectEvent(script.scriptName);
      if (!event) throw new GMTSCompilationError([{ code: "GMTS2301", message: `Unknown event handler ${script.scriptName}.`, severity: "error", file: relative(root, source.sourcePath) }]);
      const key = eventKeyFor(event.eventNum, event.eventType);
      const output = relative(root, path.join(path.dirname(resourcePath), `${event.name}.gml`));
      pushWrite(writes, { path: output, content: script.code, generated: true, resource: resourceRelative, eventKey: key });
      generatedEvents.push(createObjectEvent({ eventNum: event.eventNum, eventType: event.eventType }));
      generatedKeys.push(key);
    }
    for (const script of processed.collisionScripts) {
      const target = objectResourceByName.get(script.targetObjectName)!;
      const key = eventKeyFor(0, EventTypes.COLLISION, target.id.name);
      const output = relative(root, path.join(path.dirname(resourcePath), `Collision_${target.id.name}.gml`));
      pushWrite(writes, { path: output, content: script.code, generated: true, resource: resourceRelative, eventKey: key });
      generatedEvents.push(createObjectEvent({ eventNum: 0, eventType: EventTypes.COLLISION, collisionObjectId: target.id }));
      generatedKeys.push(key);
    }
    const previouslyOwned = new Set(previousManifest.resources[resourceRelative]?.events ?? []);
    const preservedEvents = (object.eventList ?? []).filter((event) => !previouslyOwned.has(eventKey(event)) && !generatedKeys.includes(eventKey(event)));
    object.eventList = [...preservedEvents, ...generatedEvents];
    const parentSource = source.extendsName && source.extendsName !== "GMObject" ? sourceByClass.get(source.extendsName) : undefined;
    object.parentObjectId = parentSource?.resource.id ?? null;
    const nextEventKeys = object.eventList.map(eventKey).sort();
    if (JSON.stringify(priorEventKeys) !== JSON.stringify(nextEventKeys) || JSON.stringify(priorParent) !== JSON.stringify(object.parentObjectId)) {
      metadataChanges.push(`${resourceRelative}: events [${nextEventKeys.join(", ")}], parent ${object.parentObjectId?.name ?? "none"}`);
    }
    const previousResourceState = previousManifest.resources[resourceRelative];
    resources[resourceRelative] = {
      events: generatedKeys.sort(),
      parentObjectId: object.parentObjectId,
      previousParentObjectId: previousResourceState && "previousParentObjectId" in previousResourceState
        ? previousResourceState.previousParentObjectId ?? null
        : priorParent,
    };
    pushWrite(writes, {
      path: resourceRelative,
      content: JSON.stringify(object, null, 2) + "\n",
      generated: false,
      resource: resourceRelative,
    });
  }

  for (const source of scriptSources) {
    const resourcePath = absolute(root, source.resource.id.path);
    const resourceRelative = relative(root, resourcePath);
    let processed;
    try { processed = processScriptFile(source.sourcePath); }
    catch (error) { asCompilationError(root, error); }
    if (!processed) continue;
    const output = relative(root, path.join(path.dirname(resourcePath), `${source.resource.id.name}.gml`));
    pushWrite(writes, { path: output, content: processed.code, generated: true, resource: resourceRelative });
    resources[resourceRelative] = {};
  }

  for (const [resourceRelative, previousResource] of Object.entries(previousManifest.resources)) {
    if (resources[resourceRelative] || !resourceRelative.startsWith("objects/")) continue;
    const resourcePath = absolute(root, resourceRelative);
    if (!fs.existsSync(resourcePath)) continue;
    const object = readJson5<IObject>(resourcePath);
    const ownedEvents = new Set(previousResource.events ?? []);
    const priorEventKeys = (object.eventList ?? []).map(eventKey).sort();
    object.eventList = (object.eventList ?? []).filter((event) => !ownedEvents.has(eventKey(event)));
    if (JSON.stringify(object.parentObjectId) === JSON.stringify(previousResource.parentObjectId ?? null)) {
      object.parentObjectId = previousResource.previousParentObjectId ?? null;
    }
    const nextEventKeys = object.eventList.map(eventKey).sort();
    metadataChanges.push(`${resourceRelative}: released TypeScript ownership; events [${nextEventKeys.join(", ")}], parent ${object.parentObjectId?.name ?? "none"}`);
    pushWrite(writes, {
      path: resourceRelative,
      content: JSON.stringify(object, null, 2) + "\n",
      generated: false,
      resource: resourceRelative,
    });
  }

  pushWrite(writes, {
    path: GENERATED_DECLARATIONS_PATH,
    content: declarations,
    generated: true,
    resource: relative(root, projectFile),
  });

  const manifest: GMTSManifest = {
    schemaVersion: 2,
    compilerVersion: COMPILER_VERSION,
    typePackVersion: TYPE_PACK_VERSION,
    files: {},
    resources,
  };
  const adoptions: string[] = [];
  for (const write of writes.filter((item) => item.generated)) {
    manifest.files[write.path] = { sha256: sha256(write.content), resource: write.resource, eventKey: write.eventKey };
  }

  const deletions: string[] = [];
  for (const [filename, owned] of Object.entries(previousManifest.files)) {
    const currentPath = absolute(root, filename);
    const planned = manifest.files[filename];
    if (!fs.existsSync(currentPath)) continue;
    const currentHash = sha256(fs.readFileSync(currentPath));
    if (currentHash !== owned.sha256) {
      diagnostics.push({ code: "GMTS2401", message: `Generated file ${filename} was modified after the previous compile. Restore it or move the manual code before compiling.`, severity: "error", file: filename });
    } else if (!planned) deletions.push(filename);
  }
  for (const write of writes.filter((item) => item.generated)) {
    const filename = absolute(root, write.path);
    if (!fs.existsSync(filename)) continue;
    try { assertOutputPathIsSafe(root, filename); }
    catch (error) {
      if (error instanceof GMTSCompilationError) diagnostics.push(...error.diagnostics);
      else throw error;
      continue;
    }
    const currentHash = sha256(fs.readFileSync(filename));
    const previouslyOwned = previousManifest.files[write.path];
    if (previouslyOwned) {
      if (currentHash !== previouslyOwned.sha256) diagnostics.push({ code: "GMTS2401", message: `Generated file ${write.path} was modified after the previous compile.`, severity: "error", file: write.path });
    } else if (currentHash !== sha256(write.content)) {
      diagnostics.push({ code: "GMTS2402", message: `Refusing to overwrite unowned GML at ${write.path}. Move it, or make it identical to the generated output for adoption.`, severity: "error", file: write.path });
    } else adoptions.push(write.path);
  }
  if (diagnostics.some((diagnostic) => diagnostic.severity === "error")) throw new GMTSCompilationError(diagnostics);

  const manifestContent = JSON.stringify(manifest, null, 2) + "\n";
  pushWrite(writes, { path: MANIFEST_PATH, content: manifestContent, generated: false, resource: relative(root, projectFile) });
  const changes: CompilationChange[] = [];
  for (const write of writes) {
    const filename = absolute(root, write.path);
    if (!fs.existsSync(filename) || fs.readFileSync(filename, "utf8") !== write.content) changes.push({ kind: "write", path: write.path });
  }
  for (const filename of deletions) changes.push({ kind: "delete", path: filename });
  for (const filename of adoptions) changes.push({ kind: "adopt", path: filename });

  const observed = new Set<string>([
    relative(root, projectFile),
    MANIFEST_PATH,
    ...project.resources.map((resource) => resource.id.path.replaceAll("\\", "/")),
    ...allSources.map((filename) => relative(root, filename)),
    ...writes.map((write) => write.path),
    ...deletions,
  ]);
  const configPath = path.join(root, "tsconfig.gmts.json");
  if (fs.existsSync(configPath)) observed.add(relative(root, configPath));
  for (const resource of project.resources.filter((item) => resourceFolder(item) === "scripts")) {
    const gml = path.join(path.dirname(absolute(root, resource.id.path)), `${resource.id.name}.gml`);
    if (fs.existsSync(gml)) observed.add(relative(root, gml));
  }
  const inputHashes: Record<string, string | null> = {};
  for (const filename of [...observed].sort()) {
    if (!filename || filename.startsWith("../")) continue;
    const target = absolute(root, filename);
    inputHashes[filename] = fs.existsSync(target) ? sha256(fs.readFileSync(target)) : null;
  }

  return { root, projectFile: relative(root, projectFile), diagnostics, changes, metadataChanges, writes, deletions, manifest, inputHashes };
};

interface TransactionOperation {
  kind: "write" | "delete";
  path: string;
  stage?: string;
  backup: string;
  previousHash: string | null;
  nextHash: string | null;
  applied: boolean;
}

interface TransactionJournal {
  schemaVersion: 1;
  id: string;
  state: "prepared" | "committing" | "committed";
  createdAt: string;
  operations: TransactionOperation[];
}

const fsyncPath = (filename: string): void => {
  const descriptor = fs.openSync(filename, "r");
  try { fs.fsyncSync(descriptor); } finally { fs.closeSync(descriptor); }
};

const writeJournal = (filename: string, journal: TransactionJournal): void => {
  const temporary = `${filename}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(journal, null, 2) + "\n", "utf8");
  fsyncPath(temporary);
  fs.renameSync(temporary, filename);
  fsyncPath(filename);
};

const assertOutputPathIsSafe = (root: string, filename: string): void => {
  const resolvedRoot = path.resolve(root);
  const relativePath = relative(resolvedRoot, filename);
  let cursor = resolvedRoot;
  for (const segment of relativePath.split("/").filter(Boolean)) {
    cursor = path.join(cursor, segment);
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) {
      throw new GMTSCompilationError([{
        code: "GMTS2504",
        message: `Transactional output paths may not traverse symbolic links: ${relativePath}.`,
        severity: "error",
        file: relativePath,
      }]);
    }
  }
};

const rollbackJournal = (root: string, transactionDirectory: string, journal: TransactionJournal): void => {
  for (const operation of [...journal.operations].reverse()) {
    const target = absolute(root, operation.path);
    const backup = path.join(transactionDirectory, operation.backup);
    if (fs.existsSync(backup)) {
      if (fs.existsSync(target)) fs.removeSync(target);
      fs.ensureDirSync(path.dirname(target));
      fs.renameSync(backup, target);
    } else if (operation.previousHash === null && fs.existsSync(target)) {
      const currentHash = sha256(fs.readFileSync(target));
      if (currentHash !== operation.nextHash) {
        throw new GMTSCompilationError([{
          code: "GMTS2505",
          message: `Cannot recover ${operation.path} because it changed after the interrupted transaction.`,
          severity: "error",
          file: operation.path,
        }]);
      }
      fs.removeSync(target);
    }
  }
};

const recoverTransactions = (root: string): void => {
  const transactionRoot = absolute(root, ".gmts/transactions");
  if (!fs.existsSync(transactionRoot)) return;
  for (const entry of fs.readdirSync(transactionRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const directory = path.join(transactionRoot, entry.name);
    const journalPath = path.join(directory, "journal.json");
    if (!fs.existsSync(journalPath)) {
      throw new GMTSCompilationError([{
        code: "GMTS2506",
        message: `Transaction ${entry.name} has no readable journal; preserve it and repair manually.`,
        severity: "error",
        file: relative(root, directory),
      }]);
    }
    let journal: TransactionJournal;
    try {
      journal = JSON.parse(fs.readFileSync(journalPath, "utf8")) as TransactionJournal;
    } catch (error) {
      throw new GMTSCompilationError([{
        code: "GMTS2506",
        message: `Transaction journal ${entry.name} is invalid: ${error instanceof Error ? error.message : String(error)}.`,
        severity: "error",
        file: relative(root, journalPath),
      }]);
    }
    if (journal.state !== "committed") rollbackJournal(root, directory, journal);
    try { fs.removeSync(directory); } catch (error) {
      console.warn(`gmts warning: unable to clean recovered transaction ${entry.name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
};

const assertPlanInputsUnchanged = (plan: CompilationPlan): void => {
  for (const [filename, expectedHash] of Object.entries(plan.inputHashes)) {
    const target = absolute(plan.root, filename);
    const currentHash = fs.existsSync(target) ? sha256(fs.readFileSync(target)) : null;
    if (currentHash !== expectedHash) {
      throw new GMTSCompilationError([{
        code: "GMTS2502",
        message: "The project changed after validation. No files were committed; run gmts compile again.",
        severity: "error",
        file: filename,
      }]);
    }
  }
};

const acquireCompileLock = (root: string): string => {
  const gmtsRoot = absolute(root, ".gmts");
  fs.ensureDirSync(gmtsRoot);
  const lockPath = path.join(gmtsRoot, "compile.lock");
  let descriptor: number;
  try { descriptor = fs.openSync(lockPath, "wx"); }
  catch {
    throw new GMTSCompilationError([{
      code: "GMTS2501",
      message: "Another compile or an interrupted compile owns .gmts/compile.lock. Run gmts doctor --repair-lock after verifying no compiler is active.",
      severity: "error",
      file: ".gmts/compile.lock",
    }]);
  }
  try {
    fs.writeFileSync(descriptor, JSON.stringify({
      schemaVersion: 1,
      pid: process.pid,
      host: os.hostname(),
      createdAt: new Date().toISOString(),
      project: fs.realpathSync(root),
    }, null, 2) + "\n");
    fs.fsyncSync(descriptor);
  } catch (error) {
    fs.closeSync(descriptor);
    try { fs.removeSync(lockPath); } catch { /* retain the original failure */ }
    throw error;
  }
  fs.closeSync(descriptor);
  return lockPath;
};

const releaseCompileLock = (lockPath: string): void => {
  try { if (fs.existsSync(lockPath)) fs.removeSync(lockPath); }
  catch (error) { console.warn(`gmts warning: could not remove compile lock: ${error instanceof Error ? error.message : String(error)}`); }
};

/** Recover before analysis for a mutating compile. Check and dry-run never call this. */
export const recoverInterruptedCompilation = (root: string): void => {
  const lockPath = acquireCompileLock(root);
  try { recoverTransactions(root); }
  finally { releaseCompileLock(lockPath); }
};

export const applyCompilationPlan = (plan: CompilationPlan): void => {
  const gmtsRoot = absolute(plan.root, ".gmts");
  const lockPath = acquireCompileLock(plan.root);

  let transactionDirectory: string | undefined;
  let journal: TransactionJournal | undefined;
  let committed = false;
  try {
    recoverTransactions(plan.root);
    assertPlanInputsUnchanged(plan);
    const id = `${Date.now()}-${process.pid}-${crypto.randomBytes(6).toString("hex")}`;
    transactionDirectory = path.join(gmtsRoot, "transactions", id);
    fs.ensureDirSync(transactionDirectory);
    const operations: TransactionOperation[] = [];
    const changedWrites = plan.writes
      .filter((write) => {
        const target = absolute(plan.root, write.path);
        return !fs.existsSync(target) || fs.readFileSync(target, "utf8") !== write.content;
      })
      .sort((left, right) => Number(left.path === MANIFEST_PATH) - Number(right.path === MANIFEST_PATH));

    for (const [index, write] of changedWrites.entries()) {
      const target = absolute(plan.root, write.path);
      assertOutputPathIsSafe(plan.root, target);
      const stage = `stage-${index}`;
      const stagePath = path.join(transactionDirectory, stage);
      fs.writeFileSync(stagePath, write.content, "utf8");
      fsyncPath(stagePath);
      operations.push({
        kind: "write",
        path: write.path,
        stage,
        backup: `backup-${index}`,
        previousHash: fs.existsSync(target) ? sha256(fs.readFileSync(target)) : null,
        nextHash: sha256(write.content),
        applied: false,
      });
    }
    for (const [offset, filename] of plan.deletions.entries()) {
      const target = absolute(plan.root, filename);
      if (!fs.existsSync(target)) continue;
      assertOutputPathIsSafe(plan.root, target);
      const index = operations.length + offset;
      operations.push({
        kind: "delete",
        path: filename,
        backup: `backup-${index}`,
        previousHash: sha256(fs.readFileSync(target)),
        nextHash: null,
        applied: false,
      });
    }
    operations.sort((left, right) => Number(left.path === MANIFEST_PATH) - Number(right.path === MANIFEST_PATH));
    journal = { schemaVersion: 1, id, state: "prepared", createdAt: new Date().toISOString(), operations };
    const journalPath = path.join(transactionDirectory, "journal.json");
    writeJournal(journalPath, journal);
    // Staging can take long enough for an editor or GameMaker to save another
    // input. Revalidate again at the final commit boundary.
    assertPlanInputsUnchanged(plan);
    journal.state = "committing";
    writeJournal(journalPath, journal);

    for (const operation of journal.operations) {
      const target = absolute(plan.root, operation.path);
      const backup = path.join(transactionDirectory, operation.backup);
      fs.ensureDirSync(path.dirname(target));
      if (fs.existsSync(target)) fs.renameSync(target, backup);
      if (operation.kind === "write") fs.renameSync(path.join(transactionDirectory, operation.stage!), target);
      operation.applied = true;
      writeJournal(journalPath, journal);
    }
    journal.state = "committed";
    writeJournal(journalPath, journal);
    committed = true;
  } catch (error) {
    if (!committed && transactionDirectory && journal) {
      try { rollbackJournal(plan.root, transactionDirectory, journal); }
      catch (rollbackError) {
        throw new Error(`${error instanceof Error ? error.message : String(error)}\nRollback also failed: ${rollbackError instanceof Error ? rollbackError.message : String(rollbackError)}`);
      }
    }
    throw error;
  } finally {
    if (committed && transactionDirectory) {
      try { fs.removeSync(transactionDirectory); }
      catch (error) { console.warn(`gmts warning: committed successfully but could not clean transaction backups: ${error instanceof Error ? error.message : String(error)}`); }
    }
    releaseCompileLock(lockPath);
  }
};
