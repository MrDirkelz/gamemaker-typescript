import fs from "fs-extra";
import os from "node:os";
import path from "node:path";
import {afterEach, describe, expect, test, vi} from "vitest";
import {analyzeProject, applyCompilationPlan, recoverInterruptedCompilation} from "../../src/compiler/project";
import {GMTSCompilationError} from "../../src/compiler/diagnostics";
import {createObject} from "../../src/entities/object";
import {createObjectEvent} from "../../src/entities/objectEvent";

const workspaces: string[] = [];
const libraryRoot = path.resolve(__dirname, "../..");

const createFixture = () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "gmts-project-"));
  workspaces.push(root);
  const resources = [
    { id: { name: "obj_enemy", path: "objects/obj_enemy/obj_enemy.yy" } },
    { id: { name: "obj_player", path: "objects/obj_player/obj_player.yy" } },
    { id: { name: "obj_wall", path: "objects/obj_wall/obj_wall.yy" } },
  ];
  fs.outputJsonSync(path.join(root, "game.yyp"), {
    $GMProject: "v1", "%Name": "game", defaultScriptType: 1, Folders: [], ForcedPrefabProjectReferences: [],
    IncludedFiles: [], isEcma: false, LibraryEmitters: [], MetaData: { IDEVersion: "2026.0.0.0" },
    name: "game", resources, resourceType: "GMProject", resourceVersion: "2.0", RoomOrderNodes: [], templateType: "game",
  });
  const enemy = createObject({ name: "obj_enemy", folder: "Objects", eventList: [] });
  const manualDraw = createObjectEvent({ eventNum: 0, eventType: 8 });
  const player = createObject({ name: "obj_player", folder: "Objects", eventList: [manualDraw] });
  fs.outputJsonSync(path.join(root, resources[0].id.path), enemy);
  fs.outputJsonSync(path.join(root, resources[1].id.path), player);
  fs.outputJsonSync(path.join(root, resources[2].id.path), createObject({ name: "obj_wall", folder: "Objects", eventList: [] }));
  fs.outputFileSync(path.join(root, "objects/obj_enemy/obj_enemy.ts"), `
    class Enemy extends GMObject {
      hp = 3;
      override onCreate(): void { this.hp = 5; }
    }
  `);
  fs.outputFileSync(path.join(root, "objects/obj_player/obj_player.ts"), `
    import type { Damage as HitDamage } from "./model";
    class Player extends Enemy {
      lastDamage: HitDamage = { amount: 0 };
      override onCollision_obj_enemy(other: Enemy): void { other.hp -= 1; instance_destroy(other); }
      override onCollision_obj_wall(other: GMObject): void { other.x += 1; }
    }
  `);
  fs.outputFileSync(path.join(root, "objects/obj_player/model.d.ts"), "export interface Damage { amount: number; }\n");
  fs.outputFileSync(path.join(root, "objects/obj_player/Draw_0.gml"), "// manual draw\n");
  return root;
};

afterEach(() => {
  for (const workspace of workspaces.splice(0)) fs.removeSync(workspace);
});

describe("whole-project compiler", () => {
  test("plans before writing, synchronizes parents, and preserves manual events", () => {
    const root = createFixture();
    const plan = analyzeProject({ root, libraryRoot });
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(false);
    expect(plan.changes.some((change) => change.path.endsWith("Collision_obj_enemy.gml"))).toBe(true);
    applyCompilationPlan(plan);

    const player = fs.readJsonSync(path.join(root, "objects/obj_player/obj_player.yy"));
    expect(player.parentObjectId).toEqual({ name: "obj_enemy", path: "objects/obj_enemy/obj_enemy.yy" });
    expect(player.eventList).toHaveLength(4);
    expect(fs.readFileSync(path.join(root, "objects/obj_player/Draw_0.gml"), "utf8")).toBe("// manual draw\n");
    expect(fs.readFileSync(path.join(root, "objects/obj_player/Create_0.gml"), "utf8")).toContain("self.lastDamage");
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(true);
    expect(analyzeProject({ root, libraryRoot }).changes).toEqual([]);
  });

  test("builds declarations from tsconfig, manual GML, room instances, and audio groups", () => {
    const root = createFixture();
    const projectPath = path.join(root, "game.yyp");
    const project = fs.readJsonSync(projectPath);
    project.resources.push(
      { id: { name: "scr_manual", path: "scripts/scr_manual/scr_manual.yy" } },
      { id: { name: "rm_game", path: "rooms/rm_game/rm_game.yy" } },
      { id: { name: "music", path: "audiogroups/music/music.yy" } },
    );
    fs.writeJsonSync(projectPath, project);
    fs.outputJsonSync(path.join(root, "scripts/scr_manual/scr_manual.yy"), { name: "scr_manual" });
    fs.outputFileSync(path.join(root, "scripts/scr_manual/scr_manual.gml"), `
      #macro STARTING_HP 10
      enum ManualState { Idle, Active = 4 }
      function manual_add(a, b = 1) { return a + b; }
      function ManualActor(name) constructor { self.name = name; }
    `);
    fs.outputFileSync(path.join(root, "scripts/scr_manual/scr_manual.d.ts"), "declare function manual_add(a: number, b?: number): number;\n");
    fs.outputJsonSync(path.join(root, "rooms/rm_game/rm_game.yy"), {
      name: "rm_game",
      layers: [{ instances: [{ name: "inst_enemy", objectId: { name: "obj_enemy", path: "objects/obj_enemy/obj_enemy.yy" } }] }],
    });
    fs.outputJsonSync(path.join(root, "audiogroups/music/music.yy"), { name: "music" });
    fs.outputFileSync(path.join(root, "global.d.ts"), "declare const projectDifficulty: number;\n");
    fs.outputJsonSync(path.join(root, "tsconfig.gmts.json"), {
      compilerOptions: { noLib: true, strict: true },
      include: ["global.d.ts", "objects/**/*.ts", "scripts/**/*.d.ts"],
    });
    const playerPath = path.join(root, "objects/obj_player/obj_player.ts");
    fs.writeFileSync(playerPath, fs.readFileSync(playerPath, "utf8").replace(
      "class Player extends Enemy {",
      "class Player extends Enemy { difficulty: number = projectDifficulty;",
    ));
    const plan = analyzeProject({ root, libraryRoot });
    const declarations = plan.writes.find((write) => write.path === ".gmts/generated/project.d.ts")?.content ?? "";
    expect(declarations).toContain("declare const inst_enemy: Enemy;");
    expect(declarations).toContain("declare const music: Asset.GMAudioGroup;");
    expect(declarations).toContain("declare const STARTING_HP: 10;");
    expect(declarations).toContain("declare enum ManualState");
    expect(declarations).toContain("declare class ManualActor");
    expect(declarations).not.toContain("declare function manual_add(a: unknown");
  });

  test("uses explicit event inheritance only for an onCreate override", () => {
    const root = createFixture();
    const playerPath = path.join(root, "objects/obj_player/obj_player.ts");
    const original = fs.readFileSync(playerPath, "utf8");
    fs.writeFileSync(playerPath, original.replace(
      "class Player extends Enemy {",
      "class Player extends Enemy { override onCreate(): void { this.x = 1; }",
    ));
    let plan = analyzeProject({ root, libraryRoot });
    let create = plan.writes.find((write) => write.path === "objects/obj_player/Create_0.gml")?.content ?? "";
    expect(create).not.toContain("event_inherited()");

    fs.writeFileSync(playerPath, original.replace(
      "class Player extends Enemy {",
      "class Player extends Enemy { override onCreate(): void { super.onCreate(); this.x = 1; }",
    ));
    plan = analyzeProject({ root, libraryRoot });
    create = plan.writes.find((write) => write.path === "objects/obj_player/Create_0.gml")?.content ?? "";
    expect(create.match(/event_inherited\(\)/g)).toHaveLength(1);
  });

  test("blocks modified generated output instead of overwriting it", () => {
    const root = createFixture();
    applyCompilationPlan(analyzeProject({ root, libraryRoot }));
    fs.writeFileSync(path.join(root, "objects/obj_player/Collision_obj_enemy.gml"), "// manual edit\n");
    expect(() => analyzeProject({ root, libraryRoot })).toThrowError(GMTSCompilationError);
  });

  test("adopts identical pre-existing generated GML without rewriting it", () => {
    const root = createFixture();
    const initial = analyzeProject({ root, libraryRoot });
    const collision = initial.writes.find((write) => write.path === "objects/obj_player/Collision_obj_enemy.gml");
    expect(collision).toBeDefined();
    fs.outputFileSync(path.join(root, collision!.path), collision!.content);
    const adoption = analyzeProject({ root, libraryRoot });
    expect(adoption.changes).toContainEqual({ kind: "adopt", path: collision!.path });
    applyCompilationPlan(adoption);
    expect(analyzeProject({ root, libraryRoot }).changes).toEqual([]);
  });

  test("releases owned events and restores the prior parent when TypeScript ownership is removed", () => {
    const root = createFixture();
    applyCompilationPlan(analyzeProject({ root, libraryRoot }));
    fs.removeSync(path.join(root, "objects/obj_player/obj_player.ts"));
    applyCompilationPlan(analyzeProject({ root, libraryRoot }));
    const player = fs.readJsonSync(path.join(root, "objects/obj_player/obj_player.yy"));
    expect(player.parentObjectId).toBeNull();
    expect(player.eventList).toHaveLength(1);
    expect(fs.existsSync(path.join(root, "objects/obj_player/Create_0.gml"))).toBe(false);
    expect(fs.existsSync(path.join(root, "objects/obj_player/Collision_obj_enemy.gml"))).toBe(false);
    expect(fs.readFileSync(path.join(root, "objects/obj_player/Draw_0.gml"), "utf8")).toBe("// manual draw\n");
  });

  test("rolls back already-applied renames when a commit operation fails", () => {
    const root = createFixture();
    const plan = analyzeProject({ root, libraryRoot });
    const playerPath = path.join(root, "objects/obj_player/obj_player.yy");
    const originalPlayer = fs.readFileSync(playerPath, "utf8");
    const rename = fs.renameSync.bind(fs);
    let temporaryRenames = 0;
    const spy = vi.spyOn(fs, "renameSync").mockImplementation(((from: fs.PathLike, to: fs.PathLike) => {
      if (path.basename(String(from)).startsWith("stage-") && ++temporaryRenames === 2) throw new Error("simulated rename failure");
      return rename(from, to);
    }) as typeof fs.renameSync);
    try {
      expect(() => applyCompilationPlan(plan)).toThrowError(/simulated rename failure/);
    } finally {
      spy.mockRestore();
    }
    expect(fs.readFileSync(playerPath, "utf8")).toBe(originalPlayer);
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(false);
    expect(fs.existsSync(path.join(root, "objects/obj_player/Collision_obj_enemy.gml"))).toBe(false);
    recoverInterruptedCompilation(root);
    applyCompilationPlan(analyzeProject({ root, libraryRoot }));
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(true);
  });

  test("aborts if an observed input changes after validation", () => {
    const root = createFixture();
    const plan = analyzeProject({ root, libraryRoot });
    fs.appendFileSync(path.join(root, "objects/obj_enemy/obj_enemy.ts"), "\n// concurrent edit\n");
    expect(() => applyCompilationPlan(plan)).toThrowError(/changed after validation/);
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(false);
    expect(fs.existsSync(path.join(root, ".gmts/compile.lock"))).toBe(false);
  });

  test("never removes an existing compile lock implicitly", () => {
    const root = createFixture();
    const plan = analyzeProject({ root, libraryRoot });
    const lock = path.join(root, ".gmts/compile.lock");
    fs.outputJsonSync(lock, { pid: 999999, host: "another-host" });
    expect(() => applyCompilationPlan(plan)).toThrowError(/compile.lock/);
    expect(fs.existsSync(lock)).toBe(true);
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(false);
  });

  test("treats an invalid ownership manifest as a blocking error", () => {
    const root = createFixture();
    fs.outputFileSync(path.join(root, ".gmts/manifest.json"), "{ invalid");
    expect(() => analyzeProject({ root, libraryRoot })).toThrowError(/Ownership manifest is invalid/);
  });

  test("rejects project inputs that escape through symbolic links", () => {
    const root = createFixture();
    const outside = fs.mkdtempSync(path.join(os.tmpdir(), "gmts-outside-"));
    workspaces.push(outside);
    const resource = path.join(root, "objects/obj_wall/obj_wall.yy");
    fs.writeJsonSync(path.join(outside, "obj_wall.yy"), createObject({ name: "obj_wall", folder: "Objects", eventList: [] }));
    fs.removeSync(resource);
    fs.symlinkSync(path.join(outside, "obj_wall.yy"), resource);
    expect(() => analyzeProject({ root, libraryRoot })).toThrowError(/resolves outside the real GameMaker project/);
  });

  test("reports collision contract and unsupported syntax before emitting", () => {
    const root = createFixture();
    fs.writeFileSync(path.join(root, "objects/obj_player/obj_player.ts"), `
      class Player extends GMObject {
        onCollision_obj_missing(hit: GMObject): void { [1, 2].map((value) => value); }
      }
    `);
    try {
      analyzeProject({ root, libraryRoot });
      throw new Error("Expected compilation to fail");
    } catch (error) {
      expect(error).toBeInstanceOf(GMTSCompilationError);
      const codes = (error as GMTSCompilationError).diagnostics.map((diagnostic) => diagnostic.code);
      expect(codes).toContain("GMTS1015");
      expect(codes).toContain("GMTS2102");
      expect(codes).toContain("GMTS2103");
    }
    expect(fs.existsSync(path.join(root, ".gmts/manifest.json"))).toBe(false);
  });
});
