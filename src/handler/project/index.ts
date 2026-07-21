import fs from "fs-extra";
import {createProjectFolder, IProject, IProjectResource} from "../../entities/project";
import js5 from "json5";
import {MIN_REQUIRED_IDE_VERSION} from "../../const";
import {isVersionHigher} from "../../utils/version";

const findProjectFile = (): string => {
  // find .yyp file
  const files = fs.readdirSync(".");
  for (const file of files) {
    if (file.endsWith(".yyp")) {
      // project file
      return file;
    }
  }

  throw new Error("Project file not found");
}

const readProjectFile = (path: string): IProject => {
  const file = fs.readFileSync(path, "utf8");
  return js5.parse(file) as IProject;
};

export interface IProjectHandler {
  flush (reload?: boolean): void;
  addResource (name: string, path: string): IProjectResource;
  addFolder (name: string): void;
  iterateResources (cb: (res: IProjectResource) => void): void;
  isCompatible(): boolean;
  version(): string;
}

export const createProjectHandler = (): IProjectHandler => {
  const projectFilePath = findProjectFile();
  let project = readProjectFile(projectFilePath);

  const flush = (reload = true) => {
    fs.writeFileSync(projectFilePath, JSON.stringify(project, null, 2), {
      encoding: "utf8"
    });

    if (reload) {
      project = readProjectFile(projectFilePath);
    }
  };

  return {
    flush,

    version() {
      return project.MetaData.IDEVersion;
    },

    iterateResources (cb: (res: IProjectResource) => void) {
      project.resources.forEach(cb);
    },

    addResource (name: string, path: string): IProjectResource {
      // check if resource exists
      const res = project.resources.find(resource => {
        return resource.id.name === name;
      });

      if (res) {
        // Setup may be migrating an older absolute extension path.
        res.id.path = path;
        return res;
      }

      const resource: IProjectResource = {
        id: {
          name,
          path,
        }
      };
      project.resources.push(resource);
      return resource;
    },

    addFolder (name: string) {
      // check if resource exists
      const exists = project.Folders.some(folder => {
        return folder.name === name;
      });

      if (!exists) {
        project.Folders.push(createProjectFolder(name));
        return true;
      }

      return false;
    },

    isCompatible() {
      return isVersionHigher(project.MetaData.IDEVersion, MIN_REQUIRED_IDE_VERSION);
    }
  };
};
