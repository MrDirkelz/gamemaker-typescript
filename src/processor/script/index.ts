import ts from "typescript";
import fs from "fs-extra";
import {emitTypeScriptFragment} from "../../compiler/emitter";

export interface IProcessedScriptFile {
  code: string;
}

export const processScriptFile = (filePath: string): IProcessedScriptFile => {
  const source = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const runtimeSource = sourceFile.statements
    .filter((statement) =>
      !ts.isEnumDeclaration(statement) &&
      !ts.isImportDeclaration(statement) &&
      !ts.isExportDeclaration(statement) &&
      !ts.isInterfaceDeclaration(statement) &&
      !ts.isTypeAliasDeclaration(statement),
    )
    .map((statement) => printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile))
    .join("\n");
  const enums = sourceFile.statements
    .filter(ts.isEnumDeclaration)
    .map((declaration) => printer.printNode(ts.EmitHint.Unspecified, declaration, sourceFile));
  const code = emitTypeScriptFragment([...enums, runtimeSource].filter(Boolean).join("\n\n"), {
    filename: filePath,
    mode: "script",
  });

  return {
    code: code ? `${code}\n` : "",
  };
};
