import fs from "fs-extra";
import os from "node:os";
import path from "node:path";
import {describe, expect, test} from "vitest";
import {setupTsProject} from "../src/setup";

describe("setup migration", () => {
  test("installs pinned types and hooks without replacing an existing root config", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "gmts-setup-"));
    const previousCwd = process.cwd();
    try {
      fs.outputJsonSync(path.join(root, "game.yyp"), {
        $GMProject: "v1", "%Name": "game", defaultScriptType: 1, Folders: [], ForcedPrefabProjectReferences: [],
        IncludedFiles: [], isEcma: false, LibraryEmitters: [], MetaData: { IDEVersion: "2026.0.0.0" }, name: "game",
        resources: [{ id: { name: "GameMaker_Typescript", path: path.join(root, "extensions/GameMaker_Typescript/GameMaker_Typescript.yy") } }],
        resourceType: "GMProject", resourceVersion: "2.0", RoomOrderNodes: [], templateType: "game",
      });
      fs.writeFileSync(path.join(root, "tsconfig.json"), "{\"compilerOptions\":{\"strict\":false}}\n");
      process.chdir(root);
      setupTsProject({ currentFolder: root, librarySourceRoot: path.resolve(__dirname, ".."), forceSetup: false });

      expect(fs.readFileSync(path.join(root, "tsconfig.json"), "utf8")).toBe("{\"compilerOptions\":{\"strict\":false}}\n");
      expect(fs.readJsonSync(path.join(root, "tsconfig.gmts.json")).compilerOptions.strict).toBe(true);
      expect(fs.existsSync(path.join(root, ".gmts/types/lts-2026.0.0.23/index.d.ts"))).toBe(true);
      expect(fs.existsSync(path.join(root, "extensions/GameMaker_Typescript/pre_project_step.bat"))).toBe(true);
      expect(fs.existsSync(path.join(root, "extensions/GameMaker_Typescript/pre_project_step.sh"))).toBe(true);
      const windowsHook = fs.readFileSync(path.join(root, "extensions/GameMaker_Typescript/pre_project_step.bat"), "utf8");
      expect(windowsHook).toContain("if errorlevel 1 exit /b 1");
      expect(windowsHook).not.toContain("if %errorlevel% neq 0 exit /b 1");
      const posixHook = fs.readFileSync(path.join(root, "extensions/GameMaker_Typescript/pre_project_step.sh"), "utf8");
      expect(posixHook).toContain('"$YYprojectDir/node_modules/.bin/gmts"');
      const project = fs.readJsonSync(path.join(root, "game.yyp"));
      expect(project.resources[0].id.path).toBe("extensions/GameMaker_Typescript/GameMaker_Typescript.yy");
    } finally {
      process.chdir(previousCwd);
      fs.removeSync(root);
    }
  });
});
