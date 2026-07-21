import ts from "typescript";

export type GmlEmitMode = "script" | "object";

export interface GmlEmitOptions {
  filename?: string;
  mode?: GmlEmitMode;
  className?: string;
  currentMethod?: string;
  indent?: string;
}

/** A source-located failure from the purpose-built GML emitter. */
export class GmlEmitError extends Error {
  readonly code = "GMTS1900";
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly detail: string;

  constructor(sourceFile: ts.SourceFile, node: ts.Node, message: string) {
    const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    super(`${sourceFile.fileName}:${position.line + 1}:${position.character + 1} - ${message}`);
    this.name = "GmlEmitError";
    this.file = sourceFile.fileName;
    this.line = position.line + 1;
    this.column = position.character + 1;
    this.detail = message;
  }
}

const enum Precedence {
  Lowest,
  Assignment,
  Conditional,
  LogicalOr,
  LogicalAnd,
  BitwiseOr,
  BitwiseXor,
  BitwiseAnd,
  Equality,
  Relational,
  Shift,
  Additive,
  Multiplicative,
  Exponent,
  Unary,
  Postfix,
  Primary,
}

const binaryPrecedence = (kind: ts.SyntaxKind): Precedence => {
  switch (kind) {
    case ts.SyntaxKind.EqualsToken:
    case ts.SyntaxKind.PlusEqualsToken:
    case ts.SyntaxKind.MinusEqualsToken:
    case ts.SyntaxKind.AsteriskEqualsToken:
    case ts.SyntaxKind.SlashEqualsToken:
    case ts.SyntaxKind.PercentEqualsToken:
    case ts.SyntaxKind.AmpersandEqualsToken:
    case ts.SyntaxKind.BarEqualsToken:
    case ts.SyntaxKind.CaretEqualsToken:
    case ts.SyntaxKind.LessThanLessThanEqualsToken:
    case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
      return Precedence.Assignment;
    case ts.SyntaxKind.BarBarToken: return Precedence.LogicalOr;
    case ts.SyntaxKind.AmpersandAmpersandToken: return Precedence.LogicalAnd;
    case ts.SyntaxKind.BarToken: return Precedence.BitwiseOr;
    case ts.SyntaxKind.CaretToken: return Precedence.BitwiseXor;
    case ts.SyntaxKind.AmpersandToken: return Precedence.BitwiseAnd;
    case ts.SyntaxKind.EqualsEqualsToken:
    case ts.SyntaxKind.EqualsEqualsEqualsToken:
    case ts.SyntaxKind.ExclamationEqualsToken:
    case ts.SyntaxKind.ExclamationEqualsEqualsToken:
      return Precedence.Equality;
    case ts.SyntaxKind.LessThanToken:
    case ts.SyntaxKind.LessThanEqualsToken:
    case ts.SyntaxKind.GreaterThanToken:
    case ts.SyntaxKind.GreaterThanEqualsToken:
      return Precedence.Relational;
    case ts.SyntaxKind.LessThanLessThanToken:
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      return Precedence.Shift;
    case ts.SyntaxKind.PlusToken:
    case ts.SyntaxKind.MinusToken:
      return Precedence.Additive;
    case ts.SyntaxKind.AsteriskToken:
    case ts.SyntaxKind.SlashToken:
    case ts.SyntaxKind.PercentToken:
      return Precedence.Multiplicative;
    case ts.SyntaxKind.AsteriskAsteriskToken:
      return Precedence.Exponent;
    default:
      return Precedence.Lowest;
  }
};

const operatorText = (kind: ts.SyntaxKind): string => {
  if (kind === ts.SyntaxKind.EqualsEqualsEqualsToken) return "==";
  if (kind === ts.SyntaxKind.ExclamationEqualsEqualsToken) return "!=";
  return ts.tokenToString(kind) ?? "";
};

const hasModifier = (node: ts.Node, kind: ts.SyntaxKind): boolean =>
  Boolean(ts.canHaveModifiers(node) && ts.getModifiers(node)?.some((modifier) => modifier.kind === kind));

class GmlEmitter {
  private readonly sourceFile: ts.SourceFile;
  private readonly options: Required<Pick<GmlEmitOptions, "mode" | "indent">> & GmlEmitOptions;
  private substitutions = new Map<string, string>();
  private repeatCounter = 0;

  constructor(source: string, options: GmlEmitOptions) {
    this.options = {
      ...options,
      mode: options.mode ?? "script",
      indent: options.indent ?? "    ",
    };
    this.sourceFile = ts.createSourceFile(
      options.filename ?? "__gmts_emit.ts",
      source,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const parseDiagnostics = (this.sourceFile as ts.SourceFile & { parseDiagnostics: readonly ts.Diagnostic[] }).parseDiagnostics;
    if (parseDiagnostics.length) {
      const diagnostic = parseDiagnostics[0];
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      throw new Error(`${this.sourceFile.fileName} - ${message}`);
    }
  }

  emit(): string {
    return this.sourceFile.statements
      .map((statement) => this.statement(statement, 0))
      .filter(Boolean)
      .join("\n");
  }

  private fail(node: ts.Node, detail?: string): never {
    const name = ts.SyntaxKind[node.kind];
    throw new GmlEmitError(
      this.sourceFile,
      node,
      detail ?? `Unsupported TypeScript syntax ${name}; rewrite it using the documented GML-safe subset.`,
    );
  }

  private pad(level: number): string {
    return this.options.indent.repeat(level);
  }

  private block(block: ts.Block, level: number): string {
    if (!block.statements.length) return "{}";
    const body = block.statements.map((statement) => this.statement(statement, level + 1)).filter(Boolean).join("\n");
    return `{\n${body}\n${this.pad(level)}}`;
  }

  private statement(node: ts.Statement, level: number): string {
    const pad = this.pad(level);
    const declarationOnlyExport = ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node) ||
      ts.isFunctionDeclaration(node) && !node.body || hasModifier(node, ts.SyntaxKind.DeclareKeyword);
    if (hasModifier(node, ts.SyntaxKind.ExportKeyword) && !declarationOnlyExport) {
      return this.fail(node, "Runtime exports are not supported; GameMaker script declarations are project-global.");
    }
    if (ts.isEmptyStatement(node)) return "";
    if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) return "";
    if (ts.isImportDeclaration(node)) {
      const typeOnly = node.importClause?.isTypeOnly || Boolean(
        node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings) &&
        node.importClause.namedBindings.elements.every((element) => element.isTypeOnly),
      );
      if (!typeOnly) return this.fail(node, "Runtime imports are not supported; use import type.");
      return "";
    }
    if (ts.isExportDeclaration(node)) {
      const typeOnly = node.isTypeOnly || Boolean(
        node.exportClause && ts.isNamedExports(node.exportClause) && node.exportClause.elements.every((element) => element.isTypeOnly),
      );
      if (!typeOnly) return this.fail(node, "Runtime exports are not supported by GML.");
      return "";
    }
    if (ts.isFunctionDeclaration(node)) {
      if (!node.body || !node.name) return "";
      return `${pad}function ${node.name.text}(${this.parameters(node.parameters)}) ${this.block(node.body, level)}`;
    }
    if (ts.isEnumDeclaration(node)) return this.enumDeclaration(node, level);
    if (ts.isClassDeclaration(node)) return this.classDeclaration(node, level);
    if (ts.isVariableStatement(node)) {
      const declarations = node.declarationList.declarations.map((declaration) => {
        if (!ts.isIdentifier(declaration.name)) this.fail(declaration.name, "Destructuring declarations cannot be represented in GML.");
        return `${declaration.name.text}${declaration.initializer ? ` = ${this.expression(declaration.initializer)}` : ""}`;
      });
      return `${pad}var ${declarations.join(", ")};`;
    }
    if (ts.isExpressionStatement(node)) {
      const intrinsic = this.intrinsicStatement(node.expression, level);
      if (intrinsic !== undefined) return intrinsic;
      return `${pad}${this.expression(node.expression)};`;
    }
    if (ts.isReturnStatement(node)) return `${pad}return${node.expression ? ` ${this.expression(node.expression)}` : ""};`;
    if (ts.isThrowStatement(node)) return `${pad}throw ${this.expression(node.expression)};`;
    if (ts.isBreakStatement(node)) return `${pad}break;`;
    if (ts.isContinueStatement(node)) return `${pad}continue;`;
    if (ts.isBlock(node)) return `${pad}${this.block(node, level)}`;
    if (ts.isIfStatement(node)) {
      const thenPart = this.controlBody(node.thenStatement, level);
      const elsePart = node.elseStatement
        ? ` else ${ts.isIfStatement(node.elseStatement) ? this.statement(node.elseStatement, level).trimStart() : this.controlBody(node.elseStatement, level)}`
        : "";
      return `${pad}if (${this.expression(node.expression)}) ${thenPart}${elsePart}`;
    }
    if (ts.isWhileStatement(node)) return `${pad}while (${this.expression(node.expression)}) ${this.controlBody(node.statement, level)}`;
    if (ts.isDoStatement(node)) {
      return `${pad}do ${this.controlBody(node.statement, level)} until (!(${this.expression(node.expression)}));`;
    }
    if (ts.isForStatement(node)) {
      const initializer = node.initializer
        ? ts.isVariableDeclarationList(node.initializer)
          ? `var ${node.initializer.declarations.map((item) => {
            if (!ts.isIdentifier(item.name)) this.fail(item.name);
            return `${item.name.text}${item.initializer ? ` = ${this.expression(item.initializer)}` : ""}`;
          }).join(", ")}`
          : this.expression(node.initializer)
        : "";
      return `${pad}for (${initializer}; ${node.condition ? this.expression(node.condition) : ""}; ${node.incrementor ? this.expression(node.incrementor) : ""}) ${this.controlBody(node.statement, level)}`;
    }
    if (ts.isSwitchStatement(node)) {
      const clauses = node.caseBlock.clauses.map((clause) => {
        const head = ts.isCaseClause(clause) ? `case ${this.expression(clause.expression)}:` : "default:";
        const statements = clause.statements.map((statement) => this.statement(statement, level + 2)).filter(Boolean).join("\n");
        return `${this.pad(level + 1)}${head}${statements ? `\n${statements}` : ""}`;
      }).join("\n");
      return `${pad}switch (${this.expression(node.expression)}) {\n${clauses}\n${pad}}`;
    }
    if (ts.isTryStatement(node)) {
      let result = `${pad}try ${this.block(node.tryBlock, level)}`;
      if (node.catchClause) {
        const variable = node.catchClause.variableDeclaration;
        if (variable && !ts.isIdentifier(variable.name)) this.fail(variable.name);
        result += ` catch${variable ? ` (${variable.name.getText(this.sourceFile)})` : ""} ${this.block(node.catchClause.block, level)}`;
      }
      if (node.finallyBlock) result += ` finally ${this.block(node.finallyBlock, level)}`;
      return result;
    }
    return this.fail(node);
  }

  private controlBody(node: ts.Statement, level: number): string {
    if (ts.isBlock(node)) return this.block(node, level);
    return `{\n${this.statement(node, level + 1)}\n${this.pad(level)}}`;
  }

  private enumDeclaration(node: ts.EnumDeclaration, level: number): string {
    let nextValue = 0;
    const members = node.members.map((member) => {
      if (!ts.isIdentifier(member.name)) this.fail(member.name);
      if (member.initializer) {
        if (ts.isNumericLiteral(member.initializer)) nextValue = Number(member.initializer.text);
        else if (ts.isPrefixUnaryExpression(member.initializer) && ts.isNumericLiteral(member.initializer.operand)) {
          const value = Number(member.initializer.operand.text);
          nextValue = member.initializer.operator === ts.SyntaxKind.MinusToken ? -value : value;
        } else this.fail(member.initializer, "Only numeric enum initializers can be emitted as native GML enums.");
      }
      const line = `${this.pad(level + 1)}${member.name.text} = ${nextValue}`;
      nextValue += 1;
      return line;
    });
    return `${this.pad(level)}enum ${node.name.text} {\n${members.join(",\n")}\n${this.pad(level)}}`;
  }

  private classDeclaration(node: ts.ClassDeclaration, level: number): string {
    if (!node.name) return this.fail(node, "Anonymous classes are not supported.");
    const className = node.name.text;
    const parentExpression = node.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)?.types[0]?.expression;
    if (parentExpression && !ts.isIdentifier(parentExpression)) return this.fail(parentExpression, "Constructor inheritance must name a top-level constructor class.");
    const parentName = parentExpression?.text;
    const constructors = node.members.filter(ts.isConstructorDeclaration);
    if (constructors.length > 1) return this.fail(constructors[1], "A constructor class may declare only one implementation constructor.");
    const constructor = constructors[0];
    let superArguments: readonly ts.Expression[] = [];
    let superSeen = false;
    const constructorStatements: ts.Statement[] = [];
    for (const [statementIndex, statement] of [...(constructor?.body?.statements ?? [])].entries()) {
      if (
        ts.isExpressionStatement(statement) && ts.isCallExpression(statement.expression) &&
        statement.expression.expression.kind === ts.SyntaxKind.SuperKeyword
      ) {
        if (statementIndex !== 0) this.fail(statement, "super() must be the first executable statement so constructor field ordering is preserved in GML.");
        if (superSeen) this.fail(statement, "A derived constructor may call super() exactly once.");
        superSeen = true;
        superArguments = statement.expression.arguments;
      } else constructorStatements.push(statement);
    }
    if (parentName && constructor && !superSeen) this.fail(constructor, `Derived constructor ${className} must contain one direct super() call.`);

    const params = this.parameters(constructor?.parameters ?? []);
    const inheritance = parentName ? ` : ${parentName}(${superArguments.map((argument) => this.expression(argument)).join(", ")})` : "";
    const body: string[] = [];

    // GML constructor statics model TypeScript prototype methods and must exist
    // before field initializers or constructor statements can call them.
    for (const member of node.members) {
      if (!ts.isMethodDeclaration(member) || !member.body || !ts.isIdentifier(member.name)) continue;
      if (hasModifier(member, ts.SyntaxKind.StaticKeyword)) this.fail(member, "Static TypeScript class methods are not supported by the GML constructor model.");
      if (parentName) body.push(`${this.pad(level + 1)}static __super_${className}_${member.name.text} = ${member.name.text};`);
      const previousClass = this.options.className;
      this.options.className = className;
      body.push(`${this.pad(level + 1)}static ${member.name.text} = function (${this.parameters(member.parameters)}) ${this.block(member.body, level + 1)};`);
      this.options.className = previousClass;
    }

    for (const parameter of constructor?.parameters ?? []) {
      if (!ts.isIdentifier(parameter.name)) this.fail(parameter.name);
      const parameterProperty = parameter.modifiers?.some((modifier) => [
        ts.SyntaxKind.PublicKeyword,
        ts.SyntaxKind.ProtectedKeyword,
        ts.SyntaxKind.PrivateKeyword,
        ts.SyntaxKind.ReadonlyKeyword,
      ].includes(modifier.kind));
      if (parameterProperty) body.push(`${this.pad(level + 1)}self.${parameter.name.text} = ${parameter.name.text};`);
    }
    for (const member of node.members) {
      if (!ts.isPropertyDeclaration(member)) continue;
      if (hasModifier(member, ts.SyntaxKind.StaticKeyword)) this.fail(member, "Static TypeScript class fields are not supported.");
      if (!member.initializer) continue;
      if (!ts.isIdentifier(member.name)) this.fail(member.name);
      body.push(`${this.pad(level + 1)}self.${member.name.text} = ${this.expression(member.initializer)};`);
    }
    for (const statement of constructorStatements) body.push(this.statement(statement, level + 1));

    return `${this.pad(level)}function ${className}(${params})${inheritance} constructor {${body.length ? `\n${body.join("\n")}\n${this.pad(level)}` : ""}}`;
  }

  private parameters(parameters: readonly ts.ParameterDeclaration[]): string {
    return parameters.map((parameter) => {
      if (!ts.isIdentifier(parameter.name)) return this.fail(parameter.name);
      if (parameter.dotDotDotToken) return this.fail(parameter, "Rest parameters are not supported by GML.");
      return `${parameter.name.text}${parameter.initializer ? ` = ${this.expression(parameter.initializer)}` : ""}`;
    }).join(", ");
  }

  private intrinsicStatement(expression: ts.Expression, level: number): string | undefined {
    if (!ts.isCallExpression(expression) || !ts.isPropertyAccessExpression(expression.expression)) return undefined;
    const owner = expression.expression.expression;
    if (!ts.isIdentifier(owner) || owner.text !== "Gml") return undefined;
    const name = expression.expression.name.text;
    if (name !== "with" && name !== "repeat") return undefined;
    if (expression.arguments.length !== 2 || !ts.isArrowFunction(expression.arguments[1])) {
      return this.fail(expression, `Gml.${name} requires a value and an inline arrow callback.`);
    }
    const callback = expression.arguments[1];
    if (!ts.isBlock(callback.body)) return this.fail(callback.body, `Gml.${name} requires a block-bodied callback.`);
    if (callback.parameters.length > 1 || callback.parameters.some((parameter) => !ts.isIdentifier(parameter.name))) {
      return this.fail(callback, `Gml.${name} accepts at most one identifier callback parameter.`);
    }
    const previous = this.substitutions;
    this.substitutions = new Map(previous);
    const argument = this.expression(expression.arguments[0]);
    let prefix: string;
    let suffix = "";
    if (name === "with") {
      if (callback.parameters[0]) this.substitutions.set(callback.parameters[0].name.getText(this.sourceFile), "self");
      prefix = `with (${argument})`;
    } else {
      prefix = `repeat (${argument})`;
      if (callback.parameters[0]) {
        const iteration = `__gmts_repeat_${this.repeatCounter++}`;
        this.substitutions.set(callback.parameters[0].name.getText(this.sourceFile), iteration);
        suffix = `${this.pad(level + 1)}${iteration} += 1;\n`;
        const body = callback.body.statements.map((statement) => this.statement(statement, level + 1)).filter(Boolean).join("\n");
        this.substitutions = previous;
        return `${this.pad(level)}var ${iteration} = 0;\n${this.pad(level)}${prefix} {\n${body}${body ? "\n" : ""}${suffix}${this.pad(level)}}`;
      }
    }
    const body = callback.body.statements.map((statement) => this.statement(statement, level + 1)).filter(Boolean).join("\n");
    this.substitutions = previous;
    return `${this.pad(level)}${prefix} {${body ? `\n${body}\n${this.pad(level)}` : ""}}`;
  }

  private intrinsicExpression(node: ts.CallExpression): { text: string; precedence: Precedence } | undefined {
    if (!ts.isPropertyAccessExpression(node.expression) || !ts.isIdentifier(node.expression.expression) || node.expression.expression.text !== "Gml") return undefined;
    const name = node.expression.name.text;
    const args = node.arguments;
    const expect = (count: number) => {
      if (args.length !== count) this.fail(node, `Gml.${name} expects ${count} arguments; received ${args.length}.`);
    };
    const accessor = (open: string, close: string, count: number) => {
      expect(count);
      const target = this.expression(args[0], Precedence.Primary);
      const indices = args.slice(1).map((argument) => this.expression(argument)).join(", ");
      return `${target}${open}${indices}${close}`;
    };
    switch (name) {
      case "dsListGet": return { text: accessor("[| ", "]", 2), precedence: Precedence.Primary };
      case "dsMapGet": return { text: accessor("[? ", "]", 2), precedence: Precedence.Primary };
      case "dsGridGet": return { text: accessor("[# ", "]", 3), precedence: Precedence.Primary };
      case "structGet": return { text: accessor("[$ ", "]", 2), precedence: Precedence.Primary };
      case "dsListSet":
      case "dsMapSet":
      case "dsGridSet":
      case "structSet": {
        const getName = name.replace(/Set$/, "Get");
        const count = name === "dsGridSet" ? 4 : 3;
        expect(count);
        const fake = ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier("Gml"), getName),
          undefined,
          args.slice(0, -1),
        );
        const left = this.intrinsicExpression(fake)?.text;
        return { text: `${left} = ${this.expression(args[args.length - 1], Precedence.Assignment)}`, precedence: Precedence.Assignment };
      }
      default:
        this.fail(node, `Unknown compiler intrinsic Gml.${name}.`);
    }
  }

  private expression(node: ts.Expression, parentPrecedence = Precedence.Lowest): string {
    let text: string;
    let precedence = Precedence.Primary;
    if (ts.isIdentifier(node)) text = this.substitutions.get(node.text) ?? node.text;
    else if (node.kind === ts.SyntaxKind.ThisKeyword) text = "self";
    else if (node.kind === ts.SyntaxKind.SuperKeyword) text = "super";
    else if (node.kind === ts.SyntaxKind.NullKeyword) text = "pointer_null";
    else if (node.kind === ts.SyntaxKind.TrueKeyword) text = "true";
    else if (node.kind === ts.SyntaxKind.FalseKeyword) text = "false";
    else if (ts.isNumericLiteral(node)) text = node.text;
    else if (ts.isStringLiteralLike(node)) text = JSON.stringify(node.text);
    else if (ts.isParenthesizedExpression(node)) return `(${this.expression(node.expression)})`;
    else if (ts.isPropertyAccessExpression(node)) {
      if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
        if (this.options.mode === "object" && this.options.currentMethod === node.name.text) text = "event_inherited";
        else text = `__super_${this.options.className ?? "Unknown"}_${node.name.text}`;
      } else text = `${this.expression(node.expression, Precedence.Primary)}.${node.name.text}`;
    } else if (ts.isElementAccessExpression(node)) {
      text = `${this.expression(node.expression, Precedence.Primary)}[${node.argumentExpression ? this.expression(node.argumentExpression) : ""}]`;
    } else if (ts.isCallExpression(node)) {
      const intrinsic = this.intrinsicExpression(node);
      if (intrinsic) ({ text, precedence } = intrinsic);
      else if (
        ts.isPropertyAccessExpression(node.expression) && node.expression.expression.kind === ts.SyntaxKind.SuperKeyword &&
        this.options.mode === "object" && this.options.currentMethod === node.expression.name.text
      ) {
        text = "event_inherited()";
      } else {
        text = `${this.expression(node.expression, Precedence.Primary)}(${node.arguments.map((argument) => this.expression(argument)).join(", ")})`;
      }
    } else if (ts.isNewExpression(node)) {
      text = `new ${this.expression(node.expression, Precedence.Primary)}(${(node.arguments ?? []).map((argument) => this.expression(argument)).join(", ")})`;
    } else if (ts.isArrayLiteralExpression(node)) {
      text = `[${node.elements.map((element) => this.expression(element)).join(", ")}]`;
    } else if (ts.isObjectLiteralExpression(node)) {
      const members = node.properties.map((property) => {
        if (ts.isPropertyAssignment(property)) {
          if (!ts.isIdentifier(property.name) && !ts.isStringLiteral(property.name) && !ts.isNumericLiteral(property.name)) this.fail(property.name);
          return `${property.name.getText(this.sourceFile)}: ${this.expression(property.initializer)}`;
        }
        if (ts.isShorthandPropertyAssignment(property)) return `${property.name.text}: ${property.name.text}`;
        return this.fail(property, "Only data properties are supported in GML struct literals.");
      });
      text = `{ ${members.join(", ")} }`;
    } else if (ts.isBinaryExpression(node)) {
      precedence = binaryPrecedence(node.operatorToken.kind);
      if (precedence === Precedence.Lowest) return this.fail(node.operatorToken, `Operator ${node.operatorToken.getText(this.sourceFile)} is not supported by GML.`);
      const rightPrecedence = precedence === Precedence.Assignment || precedence === Precedence.Exponent ? precedence : precedence + 1;
      text = `${this.expression(node.left, precedence)} ${operatorText(node.operatorToken.kind)} ${this.expression(node.right, rightPrecedence)}`;
    } else if (ts.isConditionalExpression(node)) {
      precedence = Precedence.Conditional;
      text = `${this.expression(node.condition, precedence + 1)} ? ${this.expression(node.whenTrue, precedence)} : ${this.expression(node.whenFalse, precedence)}`;
    } else if (ts.isPrefixUnaryExpression(node)) {
      precedence = Precedence.Unary;
      text = `${operatorText(node.operator)}${this.expression(node.operand, precedence)}`;
    } else if (ts.isPostfixUnaryExpression(node)) {
      precedence = Precedence.Postfix;
      text = `${this.expression(node.operand, precedence)}${operatorText(node.operator)}`;
    } else if (ts.isTypeOfExpression(node)) {
      precedence = Precedence.Unary;
      text = `typeof(${this.expression(node.expression)})`;
    } else if (ts.isVoidExpression(node)) {
      precedence = Precedence.Unary;
      text = `undefined`;
    } else if (ts.isTemplateExpression(node)) {
      precedence = Precedence.Additive;
      const parts = [JSON.stringify(node.head.text)];
      for (const span of node.templateSpans) {
        parts.push(this.expression(span.expression, Precedence.Additive + 1));
        if (span.literal.text) parts.push(JSON.stringify(span.literal.text));
      }
      text = parts.join(" + ");
    } else if (ts.isNoSubstitutionTemplateLiteral(node)) text = JSON.stringify(node.text);
    else if (ts.isAsExpression(node) || ts.isTypeAssertionExpression(node) || ts.isNonNullExpression(node) || ts.isSatisfiesExpression(node)) {
      return this.expression(node.expression, parentPrecedence);
    } else if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      const body = ts.isBlock(node.body)
        ? this.block(node.body, 0)
        : `{\n${this.pad(1)}return ${this.expression(node.body)};\n}`;
      text = `function (${this.parameters(node.parameters)}) ${body}`;
    } else {
      return this.fail(node);
    }
    return precedence < parentPrecedence ? `(${text})` : text;
  }
}

/** Emit TypeScript directly as GML. No JavaScript emitter or runtime helper is involved. */
export const emitTypeScriptFragment = (source: string, options: GmlEmitOptions = {}): string =>
  new GmlEmitter(source, options).emit();
