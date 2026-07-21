import ts from "typescript";
import {
  resolveObjectEvent,
  getCollisionTargetName,
  isCollisionHandler,
  OnCreateHandler,
} from "../../events";
import {readFileSync} from "../../utils/files";
import {emitTypeScriptFragment} from "../../compiler/emitter";

interface ICollectedObject {
  scripts: { scriptName: string; code: string }[];
  collisionScripts: { scriptName: string; targetObjectName: string; code: string }[];
  className: string;
  extendedClassName?: string;
}

type ObjectResourceId = { name: string; path: string };

const getExtendedClass = (statement: ts.ClassDeclaration) => {
  if (statement.heritageClauses) {
    for (const clause of statement.heritageClauses) {
      // 2. We only care about the 'extends' keyword
      if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
        // 3. 'extends' can only have one type in TS, so we take the first expression
        const parentType = clause.types[0];

        // 4. Get the text of the identifier (e.g., "Player" or "GMObject")
        if (ts.isIdentifier(parentType.expression)) {
          return parentType.expression.text;
        }
      }
    }
  }

  return undefined;
}

export function processObjectFile(
  filePath: string,
  resolveObjectResource?: (name: string) => ObjectResourceId | undefined,
): ICollectedObject | null {
  const sourceCode = readFileSync(filePath);
  const sourceFile = ts.createSourceFile(
    "temp.ts",
    sourceCode,
    ts.ScriptTarget.ES5,
    true
  );

  const result: ICollectedObject = {
    scripts: [],
    collisionScripts: [],
    className: '',
    extendedClassName: '',
  };

  const preCreateScripts: string[] = [];
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: false });

  for (const statement of sourceFile.statements) {
    if (!ts.isClassDeclaration(statement) || !statement.name) continue;

    result.extendedClassName = getExtendedClass(statement);
    result.className = statement.name.text;

    for (const member of statement.members) {
      if (ts.isPropertyDeclaration(member) && ts.isIdentifier(member.name) && member.initializer) {
        const initializer = printer.printNode(ts.EmitHint.Expression, member.initializer, sourceFile);
        preCreateScripts.push(emitTypeScriptFragment(
          `self.${member.name.text} = ${initializer};`,
          { filename: filePath, mode: "object", className: result.className },
        ));
        continue;
      }
      if (!ts.isMethodDeclaration(member) || !ts.isIdentifier(member.name) || !member.body) continue;

      const methodName = member.name.text;
      const emitOptions = {
        filename: filePath,
        mode: "object" as const,
        className: result.className,
        currentMethod: methodName,
      };

      const bodyStatements = member.body?.statements ?? [];
      const bodyCode = bodyStatements
        .map((s) => printer.printNode(ts.EmitHint.Unspecified, s, sourceFile))
        .join("\n");

      if (isCollisionHandler(methodName)) {
        const targetObjectName = getCollisionTargetName(methodName);
        if (resolveObjectResource && !resolveObjectResource(targetObjectName)) {
          throw new Error(
            `Unable to resolve collision target object "${targetObjectName}" for handler "${methodName}".`,
          );
        }

        result.collisionScripts.push({
          scriptName: methodName,
          targetObjectName,
          code: `${emitTypeScriptFragment(bodyCode, emitOptions)}\n`,
        });
      } else if (resolveObjectEvent(methodName)) {
        result.scripts.push({
          scriptName: methodName,
          code: `${emitTypeScriptFragment(bodyCode, emitOptions)}\n`,
        });
      } else {
        const params = member.parameters
          .map((p) => {
            // Create a synthetic version of the parameter that HAS an initializer
            // but NO type annotation.
            const cleanParam = ts.factory.createParameterDeclaration(
              undefined,
              p.dotDotDotToken,
              p.name,
              undefined, // This removes the '?' optional marker
              undefined, // This removes the ': type' annotation
              p.initializer // This KEEPS the '= 3'
            );

            // Print this "clean" node using ESNext target
            return printer.printNode(ts.EmitHint.Unspecified, cleanParam, sourceFile);
          })
          .join(", ");

        const methodDefinition = [
          result.extendedClassName === "GMObject" ? "" : `__super_${result.className}_${methodName} = ${methodName};`,
          `${methodName} = function(${params}) {\n${bodyCode}}`,
        ].join("\n");
        preCreateScripts.push(emitTypeScriptFragment(methodDefinition, {
          filename: filePath,
          mode: "object",
          className: result.className,
        }));
      }
    }

    break; // only compile first class
  }

  const onCreateScript = result.scripts.find((scr) => scr.scriptName === OnCreateHandler);
  const prelude = preCreateScripts.join("\n\n");
  const hasGameMakerParent = Boolean(result.extendedClassName && result.extendedClassName !== "GMObject");
  if (onCreateScript) {
    // An explicit onCreate is a real override. Parent behavior occurs only at
    // the source-level super.onCreate() call, which the emitter lowers once.
    onCreateScript.code = [prelude, onCreateScript.code].filter(Boolean).join("\n\n");
  } else if (prelude) {
    // Generating Create solely for fields/helpers would otherwise hide the
    // parent event. Preserve GameMaker's natural inherited behavior.
    result.scripts.push({
      scriptName: OnCreateHandler,
      code: [hasGameMakerParent ? "event_inherited();" : "", prelude].filter(Boolean).join("\n\n"),
    });
  }

  return result;
}
