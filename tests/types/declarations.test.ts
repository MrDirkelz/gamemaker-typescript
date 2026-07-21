import path from "node:path";
import ts from "typescript";
import {describe, expect, test} from "vitest";

const compile = (source: string): readonly ts.Diagnostic[] => {
  const root = path.resolve(__dirname, "../..");
  const declarations = path.join(root, "gamemaker-config/.ts/static/index.d.ts");
  const fixture = path.join(root, "tests/types/virtual-fixture.ts");
  const options: ts.CompilerOptions = {
    exactOptionalPropertyTypes: true,
    noImplicitOverride: true,
    noLib: true,
    skipLibCheck: false,
    strict: true,
    target: ts.ScriptTarget.ES2022,
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const readFile = host.readFile.bind(host);
  host.fileExists = (filename) => filename === fixture || fileExists(filename);
  host.readFile = (filename) => filename === fixture ? source : readFile(filename);
  host.getSourceFile = (filename, languageVersion, onError, shouldCreateNewSourceFile) =>
    filename === fixture ? ts.createSourceFile(filename, source, languageVersion, true) : getSourceFile(filename, languageVersion, onError, shouldCreateNewSourceFile);
  return ts.getPreEmitDiagnostics(ts.createProgram({ rootNames: [declarations, fixture], options, host }));
};

describe("LTS 2026 declarations", () => {
  test("infer correlated collision and creation results", () => {
    const diagnostics = compile(`
      class Enemy extends GMObject { hp = 3; clearSprite() { this.sprite_index = -1; } }
      declare const obj_enemy: Asset.GMObject<Enemy>;

      const created = instance_create_layer(0, 0, "Instances", obj_enemy, { hp: 5 });
      created.hp -= 1;

      const hit = collision_rectangle(0, 0, 16, 16, obj_enemy, false, true);
      if (hit !== noone) hit.hp -= 1;

      // @ts-expect-error required arguments are checked
      collision_rectangle(0, 0, 16, 16, obj_enemy);
      // @ts-expect-error initial values must belong to Enemy
      instance_create_layer(0, 0, "Instances", obj_enemy, { missing: true });
    `);
    expect(diagnostics.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n"))).toEqual([]);
  });

  test("keeps object, instance, tile-map, and noone handles distinct", () => {
    const diagnostics = compile(`
      class Enemy extends GMObject { hp = 3; }
      declare const obj_enemy: Asset.GMObject<Enemy>;
      declare const tilemap: Id.TileMapElement;
      const enemy = instance_find(obj_enemy, 0);
      const mixed = collision_rectangle(0, 0, 1, 1, [obj_enemy, tilemap], false, false);
      if (mixed !== noone) {
        const expected: Id.Instance<Enemy> | Id.TileMapElement = mixed;
        expected;
      }
      if (enemy !== noone) {
        const secondHit = collision_point(0, 0, enemy, false, false);
        if (secondHit !== noone) secondHit.hp -= 1;
      }
      // @ts-expect-error an object asset is not an instance handle
      const wrong: Id.Instance<Enemy> = obj_enemy;
      // @ts-expect-error noone is a sentinel, not an instance
      const alsoWrong: Id.Instance<Enemy> = noone;
      enemy;
    `);
    expect(diagnostics.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n"))).toEqual([]);
  });

  test("types live instances, DS handles, intrinsics, arrays, and sentinels", () => {
    const diagnostics = compile(`
      class Enemy extends GMObject { hp = 3; }
      declare const obj_enemy: Asset.GMObject<Enemy>;
      declare const scores: Id.DsMap<string, number>;
      declare const enemies: Id.DsList<Enemy>;

      const created = instance_create_layer(0, 0, "Instances", obj_enemy);
      instance_destroy(created);
      Gml.with(obj_enemy, enemy => { enemy.hp -= 1; });
      Gml.dsListSet(enemies, 0, created);
      const playerScore: number | undefined = Gml.dsMapGet(scores, "player");
      const values = array_create(4, 0);
      const first: number = values[0];
      const typedList = ds_list_create<number>();
      ds_list_add(typedList, 1, 2);
      const typedMap = ds_map_create<string, number>();
      ds_map_set(typedMap, "score", 10);
      sprite_index = -1;
      const group: Asset.GMAudioGroup = audiogroup_default;
      playerScore; first; group;

      // @ts-expect-error map values remain correlated with the handle
      Gml.dsMapSet(scores, "player", "wrong");
      // @ts-expect-error DS creation generics are preserved by mutation APIs
      ds_list_add(typedList, "wrong");
    `);
    expect(diagnostics.map((item) => ts.flattenDiagnosticMessageText(item.messageText, "\n"))).toEqual([]);
  });
});
