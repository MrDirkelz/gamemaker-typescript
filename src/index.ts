import crypto from "node:crypto";
import fs from "fs-extra";
import os from "node:os";
import path from "node:path";
import json5 from "json5";
import {setupTsProject} from "./setup";
import {analyzeProject, applyCompilationPlan, recoverInterruptedCompilation} from "./compiler/project";
import {formatDiagnostic, GMTSCompilationError} from "./compiler/diagnostics";
import {MIN_REQUIRED_IDE_VERSION, TARGET_RUNTIME_VERSION} from "./const";
import {isVersionHigher} from "./utils/version";

const root = process.cwd();
const libraryRoot = path.join(__dirname, "..");

const printPlan = (plan: { changes: Array<{ kind: "write" | "delete" | "adopt"; path: string }>; metadataChanges: string[] }) => {
  if (!plan.changes.length) {
    console.log("No changes.");
    return;
  }
  for (const change of plan.changes) {
    const label = change.kind === "write" ? "WRITE " : change.kind === "delete" ? "DELETE" : "ADOPT ";
    console.log(`${label} ${change.path}`);
  }
  for (const metadata of plan.metadataChanges) console.log(`META   ${metadata}`);
};

const check = () => {
  const plan = analyzeProject({ root, libraryRoot });
  for (const diagnostic of plan.diagnostics) console.log(formatDiagnostic(diagnostic));
  console.log(`Project is valid for GameMaker LTS 2026 (${plan.changes.length} pending change${plan.changes.length === 1 ? "" : "s"}).`);
  return plan;
};

const compile = (dryRun: boolean) => {
  console.log(`Checking TypeScript project ${root}`);
  if (!dryRun) recoverInterruptedCompilation(root);
  const plan = check();
  if (dryRun) {
    printPlan(plan);
    return;
  }
  applyCompilationPlan(plan);
  console.log(`Compiled ${plan.changes.filter((change) => change.kind === "write").length} file(s); removed ${plan.changes.filter((change) => change.kind === "delete").length} stale owned file(s); adopted ${plan.changes.filter((change) => change.kind === "adopt").length} identical file(s).`);
};

const repairCompileLock = (force: boolean): void => {
  const lockPath = path.join(root, ".gmts", "compile.lock");
  if (!fs.existsSync(lockPath)) {
    console.log("No compile lock needs repair.");
    return;
  }
  let lock: { pid?: number; host?: string };
  try { lock = JSON.parse(fs.readFileSync(lockPath, "utf8")) as { pid?: number; host?: string }; }
  catch {
    if (!force) throw new Error("The compile lock is invalid. Re-run with gmts doctor --repair-lock --force after confirming no compiler is active.");
    fs.removeSync(lockPath);
    console.log("Removed invalid compile lock.");
    return;
  }
  const sameHost = lock.host === os.hostname();
  let processActive = false;
  if (sameHost && typeof lock.pid === "number") {
    try { process.kill(lock.pid, 0); processActive = true; }
    catch (error) {
      const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
      processActive = code !== "ESRCH";
    }
  }
  if ((processActive || !sameHost) && !force) {
    throw new Error(processActive
      ? `Compile process ${lock.pid} is still active; refusing to remove its lock.`
      : `The lock belongs to host ${lock.host ?? "unknown"}; use --force only after confirming that compiler is inactive.`);
  }
  fs.removeSync(lockPath);
  console.log("Removed stale compile lock. The next compile will recover any interrupted journal before writing.");
};

const doctor = (repairLock = false, force = false) => {
  if (repairLock) repairCompileLock(force);
  const checks: Array<{ label: string; ok: boolean; detail: string }> = [];
  const yyp = fs.readdirSync(root).filter((filename) => filename.endsWith(".yyp"));
  checks.push({ label: "project", ok: yyp.length === 1, detail: yyp.length === 1 ? yyp[0] : `expected one .yyp, found ${yyp.length}` });
  if (yyp.length === 1) {
    try {
      const project = json5.parse(fs.readFileSync(path.join(root, yyp[0]), "utf8")) as { MetaData?: { IDEVersion?: string } };
      const version = project.MetaData?.IDEVersion ?? "unknown";
      checks.push({ label: "IDE version", ok: version !== "unknown" && isVersionHigher(version, MIN_REQUIRED_IDE_VERSION), detail: `${version} (minimum ${MIN_REQUIRED_IDE_VERSION})` });
    } catch {
      checks.push({ label: "IDE version", ok: false, detail: "project metadata could not be read" });
    }
  }
  const typePack = path.join(libraryRoot, "gamemaker-config", "lts", TARGET_RUNTIME_VERSION, "manifest.json");
  checks.push({ label: "LTS type pack", ok: fs.existsSync(typePack), detail: fs.existsSync(typePack) ? TARGET_RUNTIME_VERSION : "missing" });
  const declarations = path.join(libraryRoot, "gamemaker-config", ".ts", "static", "index.d.ts");
  checks.push({ label: "compiler declarations", ok: fs.existsSync(declarations), detail: declarations });
  const projectDeclarations = path.join(root, ".gmts", "types", `lts-${TARGET_RUNTIME_VERSION}`, "index.d.ts");
  checks.push({ label: "project declarations", ok: fs.existsSync(projectDeclarations), detail: fs.existsSync(projectDeclarations) ? projectDeclarations : "run gmts setup" });
  const config = fs.existsSync(path.join(root, "tsconfig.gmts.json")) ? "tsconfig.gmts.json" : undefined;
  checks.push({ label: "configuration", ok: Boolean(config), detail: config ?? "missing; run gmts setup" });
  const hookRoot = path.join(root, "extensions", "GameMaker_Typescript");
  const hooks = ["pre_project_step.bat", "pre_project_step.sh"].every((filename) => fs.existsSync(path.join(hookRoot, filename)));
  checks.push({ label: "build hooks", ok: hooks, detail: hooks ? "Windows and POSIX hooks installed" : "missing or incomplete" });
  const localCli = path.join(root, "node_modules", ".bin", process.platform === "win32" ? "gmts.cmd" : "gmts");
  checks.push({ label: "local CLI", ok: fs.existsSync(localCli), detail: fs.existsSync(localCli) ? localCli : "not project-local (global/package invocation may still work)" });
  const manifest = path.join(root, ".gmts", "manifest.json");
  let manifestHealthy = true;
  let manifestDetail = "not adopted yet";
  if (fs.existsSync(manifest)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(manifest, "utf8")) as { files?: Record<string, { sha256?: string }> };
      for (const [filename, owned] of Object.entries(parsed.files ?? {})) {
        const target = path.join(root, filename);
        if (!fs.existsSync(target) || crypto.createHash("sha256").update(fs.readFileSync(target)).digest("hex") !== owned.sha256) manifestHealthy = false;
      }
      manifestDetail = manifestHealthy ? "valid; owned hashes match" : "owned files are missing or modified";
    } catch {
      manifestHealthy = false;
      manifestDetail = "invalid JSON";
    }
  }
  checks.push({ label: "ownership manifest", ok: manifestHealthy, detail: manifestDetail });
  for (const item of checks) console.log(`${item.ok ? "OK  " : "FAIL"} ${item.label}: ${item.detail}`);
  if (checks.some((item) => !item.ok && item.label !== "local CLI")) process.exitCode = 1;
};

const setup = (force = false) => setupTsProject({ currentFolder: root, librarySourceRoot: libraryRoot, forceSetup: force });

const usage = () => console.log(`gmts 1.0.0\n\nCommands:\n  gmts check\n  gmts compile [--dry-run]\n  gmts doctor [--repair-lock] [--force]\n  gmts setup [--force]`);

const [command = "compile", ...rest] = process.argv.slice(2);

try {
  switch (command) {
    case "check": check(); break;
    case "compile": compile(rest.includes("--dry-run")); break;
    case "doctor": doctor(rest.includes("--repair-lock"), rest.includes("--force")); break;
    case "health":
      console.warn("gmts health is deprecated; use gmts doctor.");
      doctor();
      break;
    case "setup": setup(rest.includes("--force") || rest[0] === "true"); break;
    case "help": case "--help": case "-h": usage(); break;
    default:
      usage();
      process.exitCode = 1;
  }
} catch (error) {
  if (error instanceof GMTSCompilationError) {
    for (const diagnostic of error.diagnostics) console.error(formatDiagnostic(diagnostic));
  } else console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
