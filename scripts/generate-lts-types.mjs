import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(import.meta.dirname, "..");
const PACK_VERSION = "2026.0.0.23";
const PACK_DIR = path.join(ROOT, "gamemaker-config", "lts", PACK_VERSION);
const MANIFEST_PATH = path.join(PACK_DIR, "manifest.json");
const OVERRIDES_PATH = path.join(PACK_DIR, "overrides.json");
const TYPES_DIR = path.join(ROOT, "gamemaker-config", ".ts", "static");
const GENERATED_PATH = path.join(TYPES_DIR, "generated.d.ts");
const CORE_PATH = path.join(TYPES_DIR, "core.d.ts");
const INDEX_PATH = path.join(TYPES_DIR, "index.d.ts");
const CHECK = process.argv.includes("--check");

const defaultSpec = path.join(
  os.homedir(),
  "Library", "Caches", "GameMakerCLI", "runtimes-gms2",
  `runtime-${PACK_VERSION}`,
  "GmlSpec.xml",
);

const decode = (value = "") => value
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&quot;", "\"")
  .replaceAll("&apos;", "'")
  .replaceAll("&amp;", "&")
  .replace(/\r/g, "")
  .trim();

const attrs = (source = "") => Object.fromEntries(
  [...source.matchAll(/([A-Za-z][\w-]*)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]),
);

const elements = (source, tag) => {
  const pattern = new RegExp(`<${tag}\\b([^>]*?)(?:>([\\s\\S]*?)<\\/${tag}>|\\s*\\/>)`, "g");
  return [...source.matchAll(pattern)].map((match) => ({ attrs: attrs(match[1]), body: match[2] ?? "" }));
};

const textOf = (source, tag) => decode(elements(source, tag)[0]?.body ?? "");
const doc = (value) => decode(value).replaceAll("*/", "* /").replace(/\s+/g, " ");
const bool = (value) => value === "true";

function parseSpec(xml) {
  const root = attrs(xml.match(/<GameMakerLanguageSpec\b([^>]*)>/)?.[1]);
  const section = (name) => xml.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`))?.[1] ?? "";

  const functions = elements(section("Functions"), "Function").map((entry) => ({
    name: entry.attrs.Name,
    returnType: entry.attrs.ReturnType || "Any",
    deprecated: bool(entry.attrs.Deprecated),
    pure: bool(entry.attrs.Pure),
    description: textOf(entry.body, "Description"),
    parameters: elements(entry.body, "Parameter").map((parameter) => ({
      name: parameter.attrs.Name,
      type: parameter.attrs.Type || "Any",
      optional: bool(parameter.attrs.Optional),
      description: decode(parameter.body),
    })),
  }));

  const constants = elements(section("Constants"), "Constant").map((entry) => ({
    name: entry.attrs.Name,
    class: entry.attrs.Class || null,
    type: entry.attrs.Type || "Any",
    deprecated: bool(entry.attrs.Deprecated),
    description: decode(entry.body),
  }));

  const variables = elements(section("Variables"), "Variable").map((entry) => ({
    name: entry.attrs.Name,
    type: entry.attrs.Type || "Any",
    deprecated: bool(entry.attrs.Deprecated),
    get: bool(entry.attrs.Get),
    set: bool(entry.attrs.Set),
    instance: bool(entry.attrs.Instance),
    description: decode(entry.body),
  }));

  const structures = elements(section("Structures"), "Structure").map((entry) => ({
    name: entry.attrs.Name,
    fields: elements(entry.body, "Field").map((field) => ({
      name: field.attrs.Name,
      type: field.attrs.Type || "Any",
      get: bool(field.attrs.Get),
      set: bool(field.attrs.Set),
      description: decode(field.body),
    })),
  }));

  const enumerations = elements(section("Enumerations"), "Enumeration").map((entry) => ({
    name: entry.attrs.Name,
    members: elements(entry.body, "Member").map((member) => ({
      name: member.attrs.Name,
      value: Number(member.attrs.Value),
      deprecated: bool(member.attrs.Deprecated),
      description: decode(member.body),
    })),
  }));

  return {
    schemaVersion: 1,
    packVersion: PACK_VERSION,
    runtimeVersion: PACK_VERSION,
    specRuntimeVersion: root.RuntimeVersion,
    sourceSha256: crypto.createHash("sha256").update(xml).digest("hex"),
    counts: {
      functions: functions.length,
      constants: constants.length,
      globals: variables.length,
      enumerations: enumerations.length,
      structures: structures.length,
    },
    functions,
    constants,
    variables,
    enumerations,
    structures,
  };
}

const splitTopLevel = (value) => {
  const result = [];
  let depth = 0;
  let current = "";
  for (const character of value) {
    if (character === "[") depth += 1;
    if (character === "]") depth -= 1;
    if ((character === "," || character === "|") && depth === 0) {
      result.push(current);
      current = "";
    } else current += character;
  }
  if (current) result.push(current);
  return result.map((part) => part.trim()).filter(Boolean);
};

const primitive = new Map([
  ["Real", "number"], ["Int32", "number"], ["Int64", "number"],
  ["Bool", "boolean"], ["Boolean", "boolean"], ["String", "string"],
  ["Undefined", "undefined"], ["undefined", "undefined"], ["Any", "unknown"], ["Mixed", "unknown"],
  ["Variable", "unknown"], ["Object", "GMObject"], ["Function", "GMLFunction"],
  ["Method", "GMLFunction"], ["Pointer", "Pointer.Any"], ["Asset", "Asset.Any"],
  ["Struct", "Record<string, unknown>"], ["Array", "unknown[]"],
]);

const identifier = (value, fallback) => {
  const cleaned = value.replace(/[^A-Za-z0-9_$]/g, "_");
  return /^[A-Za-z_$]/.test(cleaned) ? cleaned : fallback;
};

const reserved = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete",
  "do", "else", "enum", "export", "extends", "false", "finally", "for", "function", "if",
  "import", "in", "instanceof", "new", "null", "return", "super", "switch", "this", "throw",
  "true", "try", "typeof", "var", "void", "while", "with", "yield", "let", "static",
  "implements", "interface", "package", "private", "protected", "public", "await",
]);

function mapType(raw = "Any") {
  let value = raw.trim();
  if (value.startsWith("(") && value.endsWith(")")) value = value.slice(1, -1).trim();
  const union = splitTopLevel(value);
  if (union.length > 1) return [...new Set(union.map(mapType))].join(" | ");

  const arrayBracket = value.match(/^Array\[(.*)]$/i);
  if (arrayBracket) return `Array<${mapType(arrayBracket[1])}>`;
  const tupleBracket = value.match(/^\[(.*)]$/);
  if (tupleBracket) return `Array<${mapType(tupleBracket[1])}>`;
  const arrayDot = value.match(/^Array\.(.+)$/i);
  if (arrayDot) return `Array<${mapType(arrayDot[1])}>`;
  if (primitive.has(value)) return primitive.get(value);
  if (value === "Enum.colspace" || value === "colspace") return "Enum.colspace";
  if (value.startsWith("Enum.")) return value;
  if (/^(Asset|Id|Constant|Pointer|Struct)\.[A-Za-z_$][\w$]*$/.test(value)) return value;
  return `GML.${identifier(value, "Unknown")}`;
}

const curatedOverrides = JSON.parse(fs.readFileSync(OVERRIDES_PATH, "utf8"));
if (curatedOverrides.runtimeVersion !== PACK_VERSION) throw new Error(`Curated overrides target ${curatedOverrides.runtimeVersion}, expected ${PACK_VERSION}.`);
const overrides = new Set(Object.keys(curatedOverrides.functions));

const objectEventHandlers = [
  "onCreate", "onDestroy", "onCleanUp", "onOutsideRoom", "onIntersectBoundary", "onGameStart", "onGameEnd", "onRoomStart", "onRoomEnd",
  "onBeginStep", "onStep", "onEndStep", "onPreDraw", "onDrawBegin", "onDraw", "onDrawEnd",
  "onPostDraw", "onDrawGuiBegin", "onDrawGui", "onDrawGuiEnd", "onDrawResize", "onAnimationEnd",
  "onAnimationUpdate", "onAnimationEvent", "onEndOfPath", "onCloseButton", "onMouseLeft", "onMouseRight",
  "onMouseMiddle", "onMouseNone", "onMouseLeftPressed", "onMouseRightPressed", "onMouseMiddlePressed",
  "onMouseLeftReleased", "onMouseRightReleased", "onMouseMiddleReleased", "onMouseEnter", "onMouseLeave",
  "onMouseWheelUp", "onMouseWheelDown",
  "onGlobalLeft", "onGlobalRight", "onGlobalMiddle", "onGlobalLeftPressed", "onGlobalRightPressed",
  "onGlobalMiddlePressed", "onGlobalLeftReleased", "onGlobalRightReleased", "onGlobalMiddleReleased",
  "onAsyncImageLoaded", "onAsyncHttp", "onAsyncSystem", "onAsyncSocial", "onAsyncSaveLoad", "onAsyncSteam",
  "onAsyncDialog", "onAsyncNetworking", "onAsyncSoundLoaded", "onAsyncIAP", "onAsyncCloud", "onAsyncPushNotification", "onAsyncAudioRecording", "onAsyncAudioPlayback", "onAsyncAudioPlaybackEnded", "onBroadcastMessage",
  "onRollbackStart", "onRollbackEvent", "onWallpaperConfig", "onWallpaperSubscriptionData",
  ...["Tap", "DoubleTap", "DragStart", "Dragging", "DragEnd", "Flick", "PinchStart", "PinchIn", "PinchOut", "PinchEnd", "RotateStart", "Rotating", "RotateEnd"].flatMap((name) => [`onGesture${name}`, `onGlobalGesture${name}`]),
  ...Array.from({ length: 12 }, (_, index) => `onAlarm_${index}`),
  ...Array.from({ length: 16 }, (_, index) => `onUserEvent_${index}`),
  ...Array.from({ length: 8 }, (_, index) => `onOutsideView_${index}`),
  ...Array.from({ length: 8 }, (_, index) => `onIntersectViewBoundary_${index}`),
];

const emitDoc = (description, deprecated, indent = "") => {
  if (!description && !deprecated) return "";
  const lines = [`${indent}/**`];
  if (description) lines.push(`${indent} * ${doc(description)}`);
  if (deprecated) lines.push(`${indent} * @deprecated`);
  lines.push(`${indent} */`);
  return lines.join("\n") + "\n";
};

function emitCore(manifest) {
  const namespaceNames = { Asset: new Set(), Id: new Set(), Constant: new Set(), Pointer: new Set(), Struct: new Set(), Enum: new Set() };
  const bareNames = new Set();
  const consume = (raw) => {
    for (const token of raw.matchAll(/(?:^|[\[,])\s*([A-Za-z_$][\w$]*)(?:\.([A-Za-z_$][\w$]*))?/g)) {
      const [, first, second] = token;
      if (second && namespaceNames[first]) namespaceNames[first].add(second);
      else if (!second && !primitive.has(first) && first !== "Array" && first !== "Enum" && first !== "undefined") bareNames.add(first);
    }
  };
  for (const fn of manifest.functions) {
    consume(fn.returnType);
    fn.parameters.forEach((parameter) => consume(parameter.type));
  }
  manifest.constants.forEach((constant) => consume(constant.type));
  manifest.variables.forEach((variable) => consume(variable.type));
  manifest.structures.flatMap((structure) => structure.fields).forEach((field) => consume(field.type));
  manifest.constants.filter((constant) => constant.class).forEach((constant) => namespaceNames.Constant.add(constant.class));

  namespaceNames.Asset.add("GMObject");
  const assetLines = [...namespaceNames.Asset].sort().map((name) => name === "GMObject"
    ? `  type GMObject<T extends globalThis.GMObject = globalThis.GMObject> = Brand<\"GMObject\"> & { readonly __instanceType?: T };`
    : `  type ${name} = Brand<\"${name}\">;`);
  const idLines = [...namespaceNames.Id].sort().map((name) => name === "Instance"
    ? `  type Instance<T extends globalThis.GMObject = globalThis.GMObject> = T;`
    : name === "DsList"
      ? `  type DsList<T = unknown> = Brand<\"DsList\"> & { readonly __itemType?: T };`
    : name === "DsMap"
      ? `  type DsMap<K extends string | number = string | number, V = unknown> = Brand<\"DsMap\"> & { readonly __keyType?: K; readonly __valueType?: V };`
    : name === "DsGrid"
      ? `  type DsGrid<T = unknown> = Brand<\"DsGrid\"> & { readonly __itemType?: T };`
    : ["DsPriority", "DsQueue", "DsStack"].includes(name)
      ? `  type ${name}<T = unknown> = Brand<\"${name}\"> & { readonly __itemType?: T };`
    : `  type ${name} = Brand<\"${name}\">;`);
  const constantLines = [...namespaceNames.Constant].sort().map((name) => `  type ${name} = Brand<\"${name}\">;`);
  const pointerLines = [...namespaceNames.Pointer].sort().map((name) => `  type ${name} = Brand<\"${name}\">;`);
  const bareLines = [...bareNames].filter((name) => name !== "colspace").sort().map((name) => `  type ${identifier(name, "Unknown")} = unknown;`);

  return `// Generated support model for GameMaker LTS ${PACK_VERSION}.\n` +
`interface Object {}\ninterface Function {}\ninterface CallableFunction extends Function {}\ninterface NewableFunction extends Function {}\ninterface IArguments { readonly length: number; [index: number]: unknown; }\ninterface String {}\ninterface Number {}\ninterface Boolean {}\ninterface RegExp {}\ninterface Array<T> { length: number; [index: number]: T; }\ninterface ReadonlyArray<T> { readonly length: number; readonly [index: number]: T; }\n\n` +
`type Partial<T> = { [P in keyof T]?: T[P] };\ntype Record<K extends keyof any, T> = { [P in K]: T };\ntype GMLFunction = (...args: unknown[]) => unknown;\n\ndeclare const __gmtsBrand: unique symbol;\ninterface NoOne { readonly [__gmtsBrand]: \"NoOne\"; }\n\ndeclare namespace Asset {\n  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly asset: Name } }\n${assetLines.join("\n")}\n  type Any = ${[...namespaceNames.Asset].sort().map((name) => name === "GMObject" ? "GMObject" : name).join(" | ") || "never"};\n}\n\ndeclare namespace Id {\n  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly id: Name } }\n${idLines.join("\n")}\n}\n\ndeclare namespace Constant {\n  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly constant: Name } }\n${constantLines.join("\n")}\n}\n\ndeclare namespace Pointer {\n  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly pointer: Name } }\n${pointerLines.join("\n")}\n  type Any = Brand<\"Pointer\">;\n}\n\ndeclare namespace GML {\n${bareLines.join("\n")}\n}\n\ndeclare class GMObject {\n  readonly [__gmtsBrand]: { readonly id: \"Instance\" };\n  x: number;\n  y: number;\n  id: this;\n  onCreate(): void;\n  onDestroy(): void;\n  onCleanUp(): void;\n}\n\ndeclare namespace Gml {\n  function with<T extends GMObject>(target: Asset.GMObject<T> | T | Constant.All | Constant.Other, body: (target: T) => void): void;\n  function repeat(count: number, body: (iteration: number) => void): void;\n  function dsListGet<T>(list: Id.DsList<T>, index: number): T;\n  function dsListSet<T>(list: Id.DsList<T>, index: number, value: T): T;\n  function dsMapGet<K extends string | number, V>(map: Id.DsMap<K, V>, key: K): V | undefined;\n  function dsMapSet<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): V;\n  function dsGridGet<T>(grid: Id.DsGrid<T>, x: number, y: number): T;\n  function dsGridSet<T>(grid: Id.DsGrid<T>, x: number, y: number, value: T): T;\n  function structGet<T extends Record<string, unknown>, K extends keyof T>(value: T, key: K): T[K];\n  function structSet<T extends Record<string, unknown>, K extends keyof T>(value: T, key: K, member: T[K]): T[K];\n}\n\ntype CollisionTarget = Asset.GMObject | GMObject | Id.TileMapElement;\ntype CollisionObject<T> = T extends Asset.GMObject<infer O> ? O : T extends GMObject ? T : never;\ntype CollisionResult<T> =\n  | ([CollisionObject<T>] extends [never] ? never : CollisionObject<T>)\n  | (T extends Id.TileMapElement ? Id.TileMapElement : never)\n  | NoOne;\ntype CollisionInputResult<T> = T extends ReadonlyArray<infer U> ? CollisionResult<U> : CollisionResult<T>;\n`;
}

function emitGenerated(manifest) {
  const lines = [`// Generated from GmlSpec.xml for GameMaker LTS ${PACK_VERSION}.`, "", "type Exclude<T, U> = T extends U ? never : T;", ""];

  lines.push("declare namespace Struct {");
  const declaredStructures = new Set(manifest.structures.map((structure) => structure.name));
  const referencedStructures = new Set();
  const collectStructs = (value) => {
    for (const match of value.matchAll(/Struct\.([A-Za-z_$][\w$]*)/g)) referencedStructures.add(match[1]);
  };
  manifest.functions.forEach((fn) => { collectStructs(fn.returnType); fn.parameters.forEach((parameter) => collectStructs(parameter.type)); });
  manifest.variables.forEach((variable) => collectStructs(variable.type));
  manifest.structures.flatMap((structure) => structure.fields).forEach((field) => collectStructs(field.type));
  for (const name of [...referencedStructures].filter((name) => !declaredStructures.has(name)).sort()) {
    lines.push(`  interface ${identifier(name, "Unknown")} { [key: string]: unknown; }`);
  }
  for (const structure of manifest.structures) {
    lines.push(`  interface ${identifier(structure.name, "Unknown")} {`);
    for (const field of structure.fields) {
      const name = identifier(field.name, "field");
      lines.push(emitDoc(field.description, false, "    ").trimEnd());
      lines.push(`    ${field.set ? "" : "readonly "}${name}: ${mapType(field.type)};`);
    }
    lines.push("  }");
  }
  lines.push("}", "");

  lines.push("declare namespace Enum {");
  for (const enumeration of manifest.enumerations) {
    lines.push(`  enum ${identifier(enumeration.name, "Unknown")} {`);
    for (const member of enumeration.members) {
      lines.push(emitDoc(member.description, member.deprecated, "    ").trimEnd());
      lines.push(`    ${identifier(member.name, "member")} = ${Number.isFinite(member.value) ? member.value : 0},`);
    }
    lines.push("  }");
  }
  lines.push("}", "");

  lines.push("interface GMObject {");
  for (const variable of manifest.variables.filter((variable) => variable.instance && !["id", "x", "y"].includes(variable.name))) {
    const variableType = curatedOverrides.globals[variable.name] ?? mapType(variable.type);
    lines.push(`  ${variable.set ? "" : "readonly "}${identifier(variable.name, "instanceValue")}: ${variableType};`);
  }
  for (const handler of objectEventHandlers) lines.push(`  ${handler}(): void;`);
  lines.push("}", "");

  for (const constant of manifest.constants) {
    if (["noone", "self", "other", "all", "undefined", "true", "false"].includes(constant.name) || reserved.has(constant.name)) continue;
    lines.push(emitDoc(constant.description, constant.deprecated).trimEnd());
    lines.push(`declare const ${identifier(constant.name, "constant")}: ${constant.class ? `Constant.${identifier(constant.class, "Unknown")}` : mapType(constant.type)};`);
  }
  lines.push("declare const self: Id.Instance<GMObject>;", "declare const other: Id.Instance<GMObject>;", "declare const all: Constant.All;", "");

  for (const variable of manifest.variables) {
    lines.push(emitDoc(variable.description, variable.deprecated).trimEnd());
    const variableType = curatedOverrides.globals[variable.name] ?? mapType(variable.type);
    lines.push(`declare ${variable.set ? "let" : "const"} ${identifier(variable.name, "globalValue")}: ${variableType};`);
  }
  lines.push("");

  for (const fn of manifest.functions) {
    if (overrides.has(fn.name)) continue;
    const usedNames = new Set();
    const parameters = fn.parameters.map((parameter, index) => {
      const candidate = identifier(parameter.name || `arg${index}`, `arg${index}`);
      const baseName = reserved.has(candidate) ? `${candidate}_` : candidate;
      let name = baseName;
      while (usedNames.has(name)) name = `${baseName}_${index + 1}`;
      usedNames.add(name);
      return `${name}${parameter.optional ? "?" : ""}: ${mapType(parameter.type)}`;
    });
    lines.push(emitDoc(fn.description, fn.deprecated).trimEnd());
    const functionName = reserved.has(fn.name) ? `gml_${fn.name}` : identifier(fn.name, "gml_function");
    lines.push(`declare function ${functionName}(${parameters.join(", ")}): ${mapType(fn.returnType)};`);
  }

  for (const [name, type] of Object.entries(curatedOverrides.additionalConstants)) lines.push(`declare const ${name}: ${type};`);
  lines.push("");
  lines.push("declare function array_create(size: number): undefined[];");
  lines.push("declare function array_create<T>(size: number, value: T): T[];");
  lines.push("declare function instance_id_get(index: number): GMObject | typeof noone;", "");
  lines.push("declare function ds_list_create<T = unknown>(): Id.DsList<T>;");
  lines.push("declare function ds_list_add<T>(list: Id.DsList<T>, ...values: T[]): undefined;");
  lines.push("declare function ds_list_set<T>(list: Id.DsList<T>, index: number, value: T): undefined;");
  lines.push("declare function ds_list_find_value<T>(list: Id.DsList<T>, index: number): T | undefined;");
  lines.push("declare function ds_map_create<K extends string | number = string | number, V = unknown>(): Id.DsMap<K, V>;");
  lines.push("declare function ds_map_add<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): boolean;");
  lines.push("declare function ds_map_set<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): undefined;");
  lines.push("declare function ds_map_find_value<K extends string | number, V>(map: Id.DsMap<K, V>, key: K): V | undefined;");
  lines.push("declare function ds_map_keys_to_array<K extends string | number>(map: Id.DsMap<K, unknown>): K[];");
  lines.push("declare function ds_map_values_to_array<V>(map: Id.DsMap<string | number, V>): V[];");
  lines.push("declare function ds_grid_create<T = unknown>(width: number, height: number): Id.DsGrid<T>;");
  lines.push("declare function ds_grid_get<T>(grid: Id.DsGrid<T>, x: number, y: number): T | undefined;");
  lines.push("declare function ds_grid_set<T>(grid: Id.DsGrid<T>, x: number, y: number, value: T): undefined;");
  lines.push("declare function ds_queue_create<T = unknown>(): Id.DsQueue<T>;");
  lines.push("declare function ds_queue_enqueue<T>(queue: Id.DsQueue<T>, ...values: T[]): undefined;");
  lines.push("declare function ds_queue_dequeue<T>(queue: Id.DsQueue<T>): T | undefined;");
  lines.push("declare function ds_queue_head<T>(queue: Id.DsQueue<T>): T | undefined;");
  lines.push("declare function ds_queue_tail<T>(queue: Id.DsQueue<T>): T | undefined;");
  lines.push("declare function ds_stack_create<T = unknown>(): Id.DsStack<T>;");
  lines.push("declare function ds_stack_push<T>(stack: Id.DsStack<T>, ...values: T[]): undefined;");
  lines.push("declare function ds_stack_pop<T>(stack: Id.DsStack<T>): T | undefined;");
  lines.push("declare function ds_stack_top<T>(stack: Id.DsStack<T>): T | undefined;");
  lines.push("declare function ds_priority_create<T = unknown>(): Id.DsPriority<T>;");
  lines.push("declare function ds_priority_add<T>(priority: Id.DsPriority<T>, value: T, score: number): undefined;");
  lines.push("declare function ds_priority_find_min<T>(priority: Id.DsPriority<T>): T | undefined;");
  lines.push("declare function ds_priority_find_max<T>(priority: Id.DsPriority<T>): T | undefined;");
  lines.push("declare function ds_priority_delete_min<T>(priority: Id.DsPriority<T>): T | undefined;");
  lines.push("declare function ds_priority_delete_max<T>(priority: Id.DsPriority<T>): T | undefined;", "");
  lines.push(`type CollisionTargets = CollisionTarget | Constant.All | Constant.Other | ReadonlyArray<CollisionTarget | Constant.All | Constant.Other>;`);
  lines.push("type NarrowCollisionTargetResult<T> = T extends Constant.All | Constant.Other ? Id.Instance<GMObject> | typeof noone : Exclude<CollisionResult<T>, NoOne> | typeof noone;");
  lines.push("type NarrowCollisionResult<T> = T extends ReadonlyArray<infer U> ? NarrowCollisionTargetResult<U> : NarrowCollisionTargetResult<T>;");
  const collision = (name, coordinates, tail = "precise: boolean, notme: boolean") =>
    `declare function ${name}<T extends CollisionTargets>(${coordinates}, target: T, ${tail}): NarrowCollisionResult<T>;`;
  lines.push(collision("collision_circle", "x1: number, y1: number, radius: number"));
  lines.push(collision("collision_ellipse", "x1: number, y1: number, x2: number, y2: number"));
  lines.push(collision("collision_line", "x1: number, y1: number, x2: number, y2: number"));
  lines.push(collision("collision_point", "x: number, y: number"));
  lines.push(collision("collision_rectangle", "x1: number, y1: number, x2: number, y2: number"));
  const collisionList = (name, coordinates) =>
    `declare function ${name}<T extends CollisionTargets>(${coordinates}, target: T, precise: boolean, notme: boolean, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;`;
  lines.push(collisionList("collision_circle_list", "x1: number, y1: number, radius: number"));
  lines.push(collisionList("collision_ellipse_list", "x1: number, y1: number, x2: number, y2: number"));
  lines.push(collisionList("collision_line_list", "x1: number, y1: number, x2: number, y2: number"));
  lines.push(collisionList("collision_point_list", "x: number, y: number"));
  lines.push(collisionList("collision_rectangle_list", "x1: number, y1: number, x2: number, y2: number"));
  lines.push("declare function instance_create_layer<T extends GMObject>(x: number, y: number, layer: string | Id.Layer, object: Asset.GMObject<T>, initial?: Partial<T>): T;");
  lines.push("declare function instance_create_depth<T extends GMObject>(x: number, y: number, depth: number, object: Asset.GMObject<T>, initial?: Partial<T>): T;");
  lines.push("declare function instance_find<T extends GMObject>(object: Asset.GMObject<T>, index: number): Id.Instance<T> | typeof noone;");
  lines.push("declare function instance_find(object: Constant.All, index: number): Id.Instance<GMObject> | typeof noone;");
  lines.push("declare function instance_nearest<T extends GMObject>(x: number, y: number, object: Asset.GMObject<T>): Id.Instance<T> | typeof noone;");
  lines.push("declare function instance_nearest(x: number, y: number, object: Constant.All): Id.Instance<GMObject> | typeof noone;");
  lines.push("declare function instance_furthest<T extends GMObject>(x: number, y: number, object: Asset.GMObject<T>): Id.Instance<T> | typeof noone;");
  lines.push("declare function instance_furthest(x: number, y: number, object: Constant.All): Id.Instance<GMObject> | typeof noone;");
  lines.push("declare function instance_place<T extends CollisionTargets>(x: number, y: number, target: T): NarrowCollisionResult<T>;");
  lines.push("declare function instance_position<T extends CollisionTargets>(x: number, y: number, target: T): NarrowCollisionResult<T>;");
  lines.push("declare function instance_place_list<T extends CollisionTargets>(x: number, y: number, target: T, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;");
  lines.push("declare function instance_position_list<T extends CollisionTargets>(x: number, y: number, target: T, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;");
  lines.push("declare function move_and_collide<T extends CollisionTargets>(x: number, y: number, target: T, num_iterations?: number, x_offset?: number, y_offset?: number, max_x_move?: number, max_y_move?: number): Array<Exclude<NarrowCollisionResult<T>, typeof noone>>;");
  return lines.filter((line) => line !== undefined).join("\n") + "\n";
}

function outputFor(manifest) {
  const core = emitCore(manifest).replace(
    'interface NoOne { readonly [__gmtsBrand]: "NoOne"; }',
    'declare const noone: unique symbol;\ntype NoOne = typeof noone;',
  ).replace(
    "type Record<K extends keyof any, T>",
    "type Record<K extends string | number | symbol, T>",
  ).replace(
    /declare namespace Gml \{[\s\S]*?\n\}\n\ntype CollisionTarget/,
    `interface GmlCompilerIntrinsics {
  with<T extends GMObject>(target: Asset.GMObject<T> | T | Constant.All | Constant.Other, body: (target: T) => void): void;
  repeat(count: number, body: (iteration: number) => void): void;
  dsListGet<T>(list: Id.DsList<T>, index: number): T;
  dsListSet<T>(list: Id.DsList<T>, index: number, value: T): T;
  dsMapGet<K extends string | number, V>(map: Id.DsMap<K, V>, key: K): V | undefined;
  dsMapSet<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): V;
  dsGridGet<T>(grid: Id.DsGrid<T>, x: number, y: number): T;
  dsGridSet<T>(grid: Id.DsGrid<T>, x: number, y: number, value: T): T;
  structGet<T extends object, K extends keyof T>(value: T, key: K): T[K];
  structSet<T extends object, K extends keyof T>(value: T, key: K, member: T[K]): T[K];
}
declare const Gml: GmlCompilerIntrinsics;

type CollisionTarget`,
  );
  return {
    [CORE_PATH]: core,
    [GENERATED_PATH]: emitGenerated(manifest),
    [INDEX_PATH]: `/// <reference path=\"./core.d.ts\" />\n/// <reference path=\"./generated.d.ts\" />\n`,
  };
}

const specPath = process.env.GMTS_GML_SPEC || defaultSpec;
let manifest;
if (fs.existsSync(specPath)) {
  const xml = fs.readFileSync(specPath, "utf8");
  manifest = parseSpec(xml);
} else if (fs.existsSync(MANIFEST_PATH)) {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
} else {
  throw new Error(`GmlSpec.xml not found at ${specPath} and no checked manifest exists.`);
}

const expectedCounts = { functions: 2357, constants: 886, globals: 210, enumerations: 13, structures: 33 };
for (const [kind, expected] of Object.entries(expectedCounts)) {
  if (manifest.counts[kind] !== expected) throw new Error(`Expected ${expected} ${kind}, found ${manifest.counts[kind]}.`);
}
for (const [kind, entries] of Object.entries({
  functions: manifest.functions,
  constants: manifest.constants,
  globals: manifest.variables,
  enumerations: manifest.enumerations,
  structures: manifest.structures,
})) {
  const names = entries.map((entry) => entry.name);
  if (names.some((name) => !name)) throw new Error(`The ${kind} manifest contains a missing name.`);
  if (new Set(names).size !== names.length) throw new Error(`The ${kind} manifest contains duplicate names.`);
}
for (const name of overrides) {
  if (!manifest.functions.some((fn) => fn.name === name)) throw new Error(`Curated override ${name} is not present in GmlSpec.xml.`);
}

const output = outputFor(manifest);
for (const name of overrides) {
  if (!new RegExp(`declare function ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(output[GENERATED_PATH])) {
    throw new Error(`Curated override ${name} did not emit a declaration.`);
  }
}
const manifestText = JSON.stringify(manifest, null, 2) + "\n";
if (CHECK) {
  const stale = [];
  if (!fs.existsSync(MANIFEST_PATH) || fs.readFileSync(MANIFEST_PATH, "utf8") !== manifestText) stale.push(path.relative(ROOT, MANIFEST_PATH));
  for (const [filename, content] of Object.entries(output)) {
    if (!fs.existsSync(filename) || fs.readFileSync(filename, "utf8") !== content) stale.push(path.relative(ROOT, filename));
  }
  if (stale.length) throw new Error(`Generated LTS type pack is stale:\n${stale.join("\n")}`);
  console.log(`Verified GameMaker LTS ${PACK_VERSION} type pack (${manifest.counts.functions} functions).`);
} else {
  fs.mkdirSync(PACK_DIR, { recursive: true });
  fs.mkdirSync(TYPES_DIR, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, manifestText);
  for (const [filename, content] of Object.entries(output)) fs.writeFileSync(filename, content);
  console.log(`Generated GameMaker LTS ${PACK_VERSION} type pack from ${specPath}.`);
}
