import fs from "fs-extra";
import path from "node:path";
import {createExtension, createExtensionFile} from "../entities/extension";
import {DEFAULT_EXTENSIONS_FOLDER, MIN_REQUIRED_IDE_VERSION, TARGET_RUNTIME_VERSION} from "../const";
import {createProjectHandler} from "../handler/project";
import {logColors} from "../utils/logColors";

export interface ISetupProjectProps {
  currentFolder: string;
  librarySourceRoot: string;
  forceSetup: boolean;
}

const extName = "GameMaker_Typescript";

const setupExtension = (props: ISetupProjectProps) => {
  const projectHandler = createProjectHandler();

  const extension = createExtension({
    name: extName,
    folder: DEFAULT_EXTENSIONS_FOLDER,
    files: [
      createExtensionFile({
        filename: "pre_project_step.bat", // windows
      }),
    ],
  });

  const metaRelativePath = path.join("extensions", extName, extName + ".yy");
  const metaFilePath = path.join(props.currentFolder, metaRelativePath);

  // copy compilation trigger script
  fs.outputFileSync(
    metaFilePath,
    JSON.stringify(extension, null, 2),
    {
      encoding: "utf8",
    }
  );
  fs.copyFileSync(
    path.join(props.librarySourceRoot, "gamemaker-config", "extensions", "files", "pre_project_step.bat"),
    path.join(props.currentFolder, "extensions", extName, "pre_project_step.bat")
  );
  fs.copyFileSync(
    path.join(props.librarySourceRoot, "gamemaker-config", "extensions", "files", "pre_project_step.sh"),
    path.join(props.currentFolder, "extensions", extName, "pre_project_step.sh")
  );

  projectHandler.addFolder(DEFAULT_EXTENSIONS_FOLDER);
  projectHandler.addResource(extName, metaRelativePath.split(path.sep).join("/"));
  projectHandler.flush();
};

export const setupTsProject = (props: ISetupProjectProps) => {
  const projectHandler = createProjectHandler();

  if (!projectHandler.isCompatible()) {
    console.error(`
    ---- ${logColors.red`Error`} -------
    This project uses incompatible IDE version. Minimum required IDE version is ${MIN_REQUIRED_IDE_VERSION} (current project uses ${projectHandler.version()}).
    ------------------`);
    return;
  }

  const newTsConfig = fs.readJsonSync(path.join(props.librarySourceRoot, "gamemaker-config", "tsconfig.json"), "utf8");
  const gmtsConfigPath = path.join(props.currentFolder, "tsconfig.gmts.json");
  if (props.forceSetup || !fs.existsSync(gmtsConfigPath)) fs.outputJsonSync(gmtsConfigPath, newTsConfig, {
    encoding: "utf8",
    spaces: 2,
  });

  const projectTypes = path.join(props.currentFolder, ".gmts", "types", `lts-${TARGET_RUNTIME_VERSION}`);
  fs.emptyDirSync(projectTypes);
  fs.copySync(path.join(props.librarySourceRoot, "gamemaker-config", ".ts", "static"), projectTypes, { overwrite: true });

  const rootConfigPath = path.join(props.currentFolder, "tsconfig.json");
  if (!fs.existsSync(rootConfigPath)) {
    fs.outputJsonSync(rootConfigPath, { extends: "./tsconfig.gmts.json" }, { encoding: "utf8", spaces: 2 });
  } else {
    console.log("Preserved existing tsconfig.json; use tsconfig.gmts.json for GameMaker TypeScript.");
  }

  setupExtension(props);
  console.log("GameMaker TypeScript LTS 2026 setup complete.");
};
