import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "gmts-package-"));
try {
  const result = spawnSync("npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: path.join(temp, "npm-cache") },
  });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  const report = JSON.parse(result.stdout)[0];
  const files = new Set(report.files.map((file) => file.path));
  for (const required of ["bin/lib.js", "MIGRATION.md", "gamemaker-config/.ts/static/index.d.ts", `gamemaker-config/lts/2026.0.0.23/manifest.json`, `gamemaker-config/lts/2026.0.0.23/overrides.json`]) {
    if (!files.has(required)) throw new Error(`Package is missing ${required}.`);
  }
  console.log(`Package smoke test passed (${report.entryCount} entries).`);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
