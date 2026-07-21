import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import {spawnSync} from "node:child_process";

const TARGET_RUNTIME = "2026.0.0.23";
const repository = path.resolve(import.meta.dirname, "..");
const cli = process.env.GMTS_GAMEMAKER_CLI;
const fixtureSource = process.env.GMTS_GAMEMAKER_PROJECT;
const runtime = process.env.GMTS_GAMEMAKER_RUNTIME_VERSION;
if (!cli || !fixtureSource) throw new Error("GMTS_GAMEMAKER_CLI and GMTS_GAMEMAKER_PROJECT are required on the licensed release runner.");
if (runtime !== TARGET_RUNTIME) throw new Error(`Licensed runner reports ${runtime ?? "no runtime"}; expected ${TARGET_RUNTIME}.`);
if (!fs.existsSync(cli)) throw new Error(`GameMaker compiler executable does not exist: ${cli}`);
if (!fs.existsSync(fixtureSource)) throw new Error(`GameMaker integration project does not exist: ${fixtureSource}`);

let configuredArgs;
try { configuredArgs = JSON.parse(process.env.GMTS_GAMEMAKER_ARGS_JSON ?? "[]"); }
catch { throw new Error("GMTS_GAMEMAKER_ARGS_JSON must be a JSON array of compiler arguments."); }
if (!Array.isArray(configuredArgs) || configuredArgs.some((argument) => typeof argument !== "string")) {
  throw new Error("GMTS_GAMEMAKER_ARGS_JSON must contain only strings.");
}
if (!configuredArgs.some((argument) => argument.includes("{project}"))) {
  throw new Error("GMTS_GAMEMAKER_ARGS_JSON must contain a {project} placeholder.");
}

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "gmts-lts-integration-"));
try {
  const fixture = path.join(temporary, "project");
  fs.cpSync(fixtureSource, fixture, {recursive: true});
  const compiler = path.join(repository, "bin", "lib.js");
  for (const command of ["check", "compile"]) {
    const result = spawnSync(process.execPath, [compiler, command], {cwd: fixture, stdio: "inherit"});
    if (result.status !== 0) throw new Error(`gmts ${command} failed for the licensed integration fixture.`);
  }
  const projectFile = fs.readdirSync(fixture).find((filename) => filename.endsWith(".yyp"));
  if (!projectFile) throw new Error("Licensed integration fixture contains no .yyp project.");
  const projectPath = path.join(fixture, projectFile);
  const args = configuredArgs.map((argument) => argument.replaceAll("{project}", projectPath).replaceAll("{projectDir}", fixture));
  const result = spawnSync(cli, args, {cwd: fixture, stdio: "inherit"});
  if (result.status !== 0) throw new Error(`GameMaker LTS integration compile failed with exit code ${String(result.status)}.`);
  console.log(`GameMaker LTS ${TARGET_RUNTIME} integration compile passed.`);
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
