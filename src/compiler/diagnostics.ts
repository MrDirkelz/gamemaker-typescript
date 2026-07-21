import path from "node:path";
import ts from "typescript";

export type DiagnosticSeverity = "error" | "warning";

export interface GMTSDiagnostic {
  code: string;
  message: string;
  severity: DiagnosticSeverity;
  file?: string;
  line?: number;
  column?: number;
}

export const nodeDiagnostic = (
  sourceFile: ts.SourceFile,
  node: ts.Node,
  code: string,
  message: string,
): GMTSDiagnostic => {
  const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
  return {
    code,
    message,
    severity: "error",
    file: sourceFile.fileName,
    line: position.line + 1,
    column: position.character + 1,
  };
};

export const fromTypeScriptDiagnostic = (diagnostic: ts.Diagnostic, root: string): GMTSDiagnostic => {
  const result: GMTSDiagnostic = {
    code: `TS${diagnostic.code}`,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    severity: diagnostic.category === ts.DiagnosticCategory.Warning ? "warning" : "error",
  };
  if (diagnostic.file && diagnostic.start !== undefined) {
    const location = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    result.file = path.relative(root, diagnostic.file.fileName);
    result.line = location.line + 1;
    result.column = location.character + 1;
  }
  return result;
};

export const formatDiagnostic = (diagnostic: GMTSDiagnostic): string => {
  const location = diagnostic.file
    ? `${diagnostic.file}${diagnostic.line ? `:${diagnostic.line}:${diagnostic.column}` : ""}`
    : "gmts";
  return `${location} - ${diagnostic.severity} ${diagnostic.code}: ${diagnostic.message}`;
};

export class GMTSCompilationError extends Error {
  constructor(public readonly diagnostics: GMTSDiagnostic[]) {
    super(diagnostics.map(formatDiagnostic).join("\n"));
    this.name = "GMTSCompilationError";
  }
}
