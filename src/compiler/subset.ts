import ts from "typescript";
import {GMTSDiagnostic, nodeDiagnostic} from "./diagnostics";

export type SyntaxDisposition = "native" | "lowered" | "intrinsic" | "erased" | "rejected";

/**
 * The public syntax contract. The emitter is deliberately closed: constructs
 * outside these families produce GMTS1900 rather than falling through to the
 * JavaScript emitter. Keep this registry and the rejection fixtures in sync.
 */
export const GML_SYNTAX_POLICY = Object.freeze({
  "functions, calls, new, arrays, structs and indexing": "native",
  "blocks, conditionals, switch, loops, try, throw and return": "native",
  "this, null, strict equality, typeof, templates and do-while": "lowered",
  "constructor classes, parameter properties and numeric enums": "lowered",
  "safe arrow functions and block-safe let/const": "lowered",
  "Gml.with, Gml.repeat and typed Gml accessors": "intrinsic",
  "interfaces, types, generics, assertions and type-only modules": "erased",
  "runtime modules, async, generators, decorators, namespaces and JSX": "rejected",
  "destructuring, spread, rest, for-in, for-of and tagged templates": "rejected",
  "accessors, private fields, computed members and static class members": "rejected",
  "optional chaining, nullish operators, logical assignment and chained assignment": "rejected",
  "regular expressions, BigInt, JavaScript prototype APIs and unsafe arrows": "rejected",
} satisfies Record<string, SyntaxDisposition>);

const prototypeMethods = new Set([
  "at", "concat", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex",
  "flat", "flatMap", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf", "map",
  "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice",
  "unshift", "values", "charAt", "charCodeAt", "endsWith", "match", "replace", "search",
  "split", "startsWith", "substring", "substr", "toLowerCase", "toUpperCase", "trim",
  "then", "catch", "finally",
]);

const assignmentOperators = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.EqualsToken,
  ts.SyntaxKind.PlusEqualsToken,
  ts.SyntaxKind.MinusEqualsToken,
  ts.SyntaxKind.AsteriskEqualsToken,
  ts.SyntaxKind.SlashEqualsToken,
  ts.SyntaxKind.PercentEqualsToken,
  ts.SyntaxKind.AmpersandEqualsToken,
  ts.SyntaxKind.BarEqualsToken,
  ts.SyntaxKind.CaretEqualsToken,
  ts.SyntaxKind.LessThanLessThanEqualsToken,
  ts.SyntaxKind.GreaterThanGreaterThanEqualsToken,
]);

const logicalAssignmentOperators = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.AmpersandAmpersandEqualsToken,
  ts.SyntaxKind.BarBarEqualsToken,
  ts.SyntaxKind.QuestionQuestionEqualsToken,
]);

const hasRuntimeImport = (node: ts.ImportDeclaration): boolean => {
  if (!node.importClause) return true;
  if (node.importClause.isTypeOnly) return false;
  if (node.importClause.name) return true;
  const bindings = node.importClause.namedBindings;
  return !bindings || ts.isNamespaceImport(bindings) || bindings.elements.some((element) => !element.isTypeOnly);
};

const isTypeOnlyDeclaration = (node: ts.Node): boolean =>
  ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) ||
  (ts.isFunctionDeclaration(node) && !node.body) ||
  (ts.isClassDeclaration(node) && hasModifier(node, ts.SyntaxKind.DeclareKeyword));

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind): boolean =>
  Boolean(ts.canHaveModifiers(node) && ts.getModifiers(node)?.some((modifier) => modifier.kind === kind));

const isAssignmentTarget = (node: ts.Expression): boolean =>
  ts.isIdentifier(node) || ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node);

const containsUnsafeArrowCapture = (node: ts.ArrowFunction): ts.Node | undefined => {
  let unsafe: ts.Node | undefined;
  const visit = (child: ts.Node) => {
    if (unsafe || child !== node && ts.isFunctionLike(child)) return;
    if (child.kind === ts.SyntaxKind.ThisKeyword || child.kind === ts.SyntaxKind.SuperKeyword) unsafe = child;
    else if (ts.isIdentifier(child) && child.text === "arguments") unsafe = child;
    else if (ts.isMetaProperty(child) && child.keywordToken === ts.SyntaxKind.NewKeyword) unsafe = child;
    else ts.forEachChild(child, visit);
  };
  ts.forEachChild(node.body, visit);
  return unsafe;
};

const intrinsicName = (node: ts.CallExpression): string | undefined =>
  ts.isPropertyAccessExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === "Gml"
    ? node.expression.name.text
    : undefined;

const validateIntrinsicCallback = (
  sourceFile: ts.SourceFile,
  call: ts.CallExpression,
  diagnostics: GMTSDiagnostic[],
) => {
  const name = intrinsicName(call);
  if (name !== "with" && name !== "repeat") return;
  const callback = call.arguments[1];
  if (call.arguments.length !== 2 || !callback || !ts.isArrowFunction(callback) || !ts.isBlock(callback.body)) {
    diagnostics.push(nodeDiagnostic(sourceFile, call, "GMTS1041", `Gml.${name} requires a value and one inline block-bodied arrow callback.`));
    return;
  }
  if (callback.parameters.length > 1 || callback.parameters.some((parameter) => !ts.isIdentifier(parameter.name))) {
    diagnostics.push(nodeDiagnostic(sourceFile, callback, "GMTS1042", `Gml.${name} accepts at most one identifier callback parameter.`));
  }
  const visit = (node: ts.Node) => {
    if (node !== callback && ts.isFunctionLike(node)) {
      diagnostics.push(nodeDiagnostic(sourceFile, node, "GMTS1043", `Nested functions cannot be lowered inside the inlined Gml.${name} callback.`));
      return;
    }
    if (ts.isReturnStatement(node) || ts.isBreakStatement(node) || ts.isContinueStatement(node) || ts.isYieldExpression(node) || ts.isAwaitExpression(node)) {
      diagnostics.push(nodeDiagnostic(sourceFile, node, "GMTS1043", `Control flow cannot cross the inlined Gml.${name} callback boundary.`));
      return;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(callback.body, visit);
};

const validateBlockScopedNames = (sourceFile: ts.SourceFile, diagnostics: GMTSDiagnostic[]) => {
  const validateScope = (scope: ts.SourceFile | ts.SignatureDeclaration) => {
    const declarations = new Map<string, ts.Identifier>();
    const register = (name: ts.BindingName) => {
      if (!ts.isIdentifier(name)) return;
      const previous = declarations.get(name.text);
      if (previous) {
        diagnostics.push(nodeDiagnostic(
          sourceFile,
          name,
          "GMTS1040",
          `Block-scoped name ${name.text} would collide after let/const is lowered to GML var; use a unique name in this function.`,
        ));
      } else declarations.set(name.text, name);
    };
    if ("parameters" in scope) for (const parameter of scope.parameters) register(parameter.name);
    const visit = (node: ts.Node) => {
      if (node !== scope && ts.isFunctionLike(node)) return;
      if (ts.isVariableDeclaration(node)) register(node.name);
      if (ts.isClassDeclaration(node) && node.name) register(node.name);
      ts.forEachChild(node, visit);
    };
    ts.forEachChild(scope, visit);
  };
  validateScope(sourceFile);
  const visitFunctions = (node: ts.Node) => {
    if (ts.isFunctionLike(node)) validateScope(node);
    ts.forEachChild(node, visitFunctions);
  };
  ts.forEachChild(sourceFile, visitFunctions);
};

export const validateGmlSubset = (sourceFile: ts.SourceFile): GMTSDiagnostic[] => {
  const diagnostics: GMTSDiagnostic[] = [];
  const rejected = new Set<string>();
  const reject = (node: ts.Node, code: string, message: string) => {
    const key = `${code}:${node.pos}:${node.end}`;
    if (!rejected.has(key)) diagnostics.push(nodeDiagnostic(sourceFile, node, code, message));
    rejected.add(key);
  };

  const visit = (node: ts.Node) => {
    if (ts.isImportEqualsDeclaration(node)) {
      reject(node, "GMTS1001", "TypeScript import-equals and CommonJS modules are not supported by GML.");
    } else if (ts.isImportDeclaration(node) && hasRuntimeImport(node)) {
      reject(node, "GMTS1001", "Runtime imports are not supported; use import type or global project declarations.");
    } else if (ts.isExportAssignment(node) || ts.isExportDeclaration(node) && !node.isTypeOnly && !(
      node.exportClause && ts.isNamedExports(node.exportClause) && node.exportClause.elements.every((element) => element.isTypeOnly)
    )) {
      reject(node, "GMTS1002", "Runtime exports are not supported by GML.");
    } else if (hasModifier(node, ts.SyntaxKind.ExportKeyword) && !isTypeOnlyDeclaration(node)) {
      reject(node, "GMTS1002", "Runtime export modifiers are not supported; GameMaker script functions are project-global.");
    } else if (ts.isModuleDeclaration(node)) {
      reject(node, "GMTS1003", "Namespaces and ambient modules cannot be emitted to GML; place declaration-only modules in a .d.ts file.");
    } else if (ts.isClassStaticBlockDeclaration(node)) {
      reject(node, "GMTS1021", "Class static blocks are not supported by GML.");
    } else if (ts.isClassExpression(node)) {
      reject(node, "GMTS1030", "Class expressions are not supported; declare a named constructor class in a script resource.");
    } else if (ts.isClassDeclaration(node)) {
      const base = node.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)?.types[0]?.expression;
      if (base && !ts.isIdentifier(base)) reject(base, "GMTS1044", "Constructor inheritance must name one top-level constructor class.");
    } else if (ts.isArrowFunction(node)) {
      const unsafe = containsUnsafeArrowCapture(node);
      if (unsafe) reject(unsafe, "GMTS1004", "This arrow captures lexical this, arguments, super, or new.target; use a function or capture an explicit local value.");
    } else if (ts.isForOfStatement(node) || ts.isForInStatement(node)) {
      reject(node, "GMTS1005", "for...of and for...in are not supported; use an indexed for loop or Gml.repeat.");
    } else if (ts.isTaggedTemplateExpression(node)) {
      reject(node, "GMTS1006", "Tagged templates are not supported by GML.");
    } else if (ts.isRegularExpressionLiteral(node)) {
      reject(node, "GMTS1007", "JavaScript regular-expression literals are not supported by GML.");
    } else if (ts.isBigIntLiteral(node)) {
      reject(node, "GMTS1031", "BigInt literals have no equivalent GML runtime type.");
    } else if (ts.isGetAccessorDeclaration(node) || ts.isSetAccessorDeclaration(node)) {
      reject(node, "GMTS1008", "Getters and setters cannot be emitted with equivalent GML semantics.");
    } else if (ts.isPrivateIdentifier(node)) {
      reject(node, "GMTS1009", "JavaScript private # fields are not supported by GML.");
    } else if (ts.isArrayBindingPattern(node) || ts.isObjectBindingPattern(node)) {
      reject(node, "GMTS1010", "Destructuring is not supported by the GML emitter.");
    } else if (ts.isSpreadElement(node) || ts.isSpreadAssignment(node)) {
      reject(node, "GMTS1011", "Spread syntax is not supported by the GML emitter.");
    } else if (ts.isParameter(node) && node.dotDotDotToken) {
      reject(node, "GMTS1012", "Rest parameters are not supported by the GML emitter.");
    } else if (
      ts.isPropertyAccessExpression(node) && node.questionDotToken ||
      ts.isElementAccessExpression(node) && node.questionDotToken ||
      ts.isCallExpression(node) && node.questionDotToken
    ) {
      reject(node, "GMTS1013", "Optional chaining is not supported; test the value explicitly.");
    } else if ((ts.isMethodDeclaration(node) || ts.isPropertyDeclaration(node)) && ts.isComputedPropertyName(node.name)) {
      reject(node, "GMTS1014", "Computed class member names are not supported by GML.");
    } else if (ts.isComputedPropertyName(node)) {
      reject(node, "GMTS1032", "Computed property names are not supported in emitted GML structs or classes.");
    } else if (ts.isPropertyAccessExpression(node) && prototypeMethods.has(node.name.text)) {
      reject(node, "GMTS1015", `JavaScript prototype method .${node.name.text}() is unavailable in GML; use a GameMaker function.`);
    } else if (ts.isAwaitExpression(node)) {
      reject(node, "GMTS1022", "await is not supported by GML.");
    } else if (ts.isYieldExpression(node)) {
      reject(node, "GMTS1017", "Generators and yield are not supported by GML.");
    } else if (ts.isDeleteExpression(node)) {
      reject(node, "GMTS1023", "The JavaScript delete operator is not supported by GML.");
    } else if (ts.isDebuggerStatement(node) || ts.isLabeledStatement(node) || ts.isWithStatement(node)) {
      reject(node, "GMTS1039", "Debugger, label, and JavaScript with statements are outside the GML-safe subset.");
    } else if (ts.isMethodDeclaration(node) && ts.isObjectLiteralExpression(node.parent)) {
      reject(node, "GMTS1045", "Object-literal methods are not supported; assign an explicit function-valued property.");
    } else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === "require") {
      reject(node, "GMTS1001", "CommonJS require() is not supported by GameMaker resources.");
    } else if (ts.isPropertyAccessExpression(node) && (
      ts.isIdentifier(node.expression) && ["exports", "module"].includes(node.expression.text)
    )) {
      reject(node, "GMTS1002", "CommonJS exports are not supported by GameMaker resources.");
    } else if (ts.isIdentifier(node) && node.text === "Promise") {
      reject(node, "GMTS1046", "JavaScript Promise runtime semantics are not available in GML.");
    } else if (ts.isMetaProperty(node)) {
      reject(node, "GMTS1047", "new.target and import.meta have no GML equivalent.");
    } else if (ts.isBinaryExpression(node)) {
      const operator = node.operatorToken.kind;
      if (operator === ts.SyntaxKind.InstanceOfKeyword || operator === ts.SyntaxKind.InKeyword) {
        reject(node, "GMTS1024", `The JavaScript ${node.operatorToken.getText(sourceFile)} operator is not supported by the GML subset.`);
      } else if (operator === ts.SyntaxKind.QuestionQuestionToken || logicalAssignmentOperators.has(operator)) {
        reject(node, "GMTS1033", "Nullish and logical assignment operators are not supported; write an explicit conditional.");
      } else if (operator === ts.SyntaxKind.CommaToken) {
        reject(node, "GMTS1034", "The JavaScript comma operator is not supported by GML.");
      } else if (assignmentOperators.has(operator)) {
        if (!isAssignmentTarget(node.left)) reject(node.left, "GMTS1035", "This assignment target cannot be represented in GML.");
        if (ts.isBinaryExpression(node.right) && assignmentOperators.has(node.right.operatorToken.kind)) {
          reject(node, "GMTS1036", "Chained assignment is rejected because GameMaker assignment expressions do not preserve JavaScript semantics.");
        }
      }
    } else if (ts.isFunctionLike(node)) {
      if (hasModifier(node, ts.SyntaxKind.AsyncKeyword)) reject(node, "GMTS1016", "Async functions are not supported by GML.");
      if ("asteriskToken" in node && node.asteriskToken) reject(node, "GMTS1017", "Generator functions are not supported by GML.");
    } else if (ts.isEnumDeclaration(node)) {
      for (const member of node.members) {
        if (!ts.isIdentifier(member.name)) reject(member, "GMTS1018", "Enum member names must be identifiers in GML.");
        if (member.initializer && !ts.isNumericLiteral(member.initializer) && !(
          ts.isPrefixUnaryExpression(member.initializer) && ts.isNumericLiteral(member.initializer.operand)
        )) reject(member, "GMTS1018", "Only numeric enum members are supported by the GML emitter.");
      }
    } else if (ts.isIdentifier(node) && node.text.includes("$")) {
      reject(node, "GMTS1037", `Identifier ${node.text} contains '$', which is not portable GML source syntax.`);
    } else if (node.kind >= ts.SyntaxKind.JsxElement && node.kind <= ts.SyntaxKind.JsxNamespacedName) {
      reject(node, "GMTS1019", "JSX is not supported by GML.");
    }

    if (ts.isClassElement(node) && hasModifier(node, ts.SyntaxKind.StaticKeyword)) {
      reject(node, "GMTS1038", "Static TypeScript class members are not supported by the GML constructor model.");
    }
    if (ts.canHaveDecorators(node) && ts.getDecorators(node)?.length) reject(node, "GMTS1020", "Decorators are not supported by GML.");
    if (hasModifier(node, ts.SyntaxKind.AbstractKeyword)) reject(node, "GMTS1025", "Abstract runtime declarations cannot be represented in GML.");
    if (ts.isCallExpression(node)) validateIntrinsicCallback(sourceFile, node, diagnostics);
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  validateBlockScopedNames(sourceFile, diagnostics);
  return diagnostics;
};
