import ts from "typescript";
import crypto from "node:crypto";
import {describe, expect, test} from "vitest";
import {emitTypeScriptFragment, GmlEmitError} from "../../src/compiler/emitter";
import {GML_SYNTAX_POLICY, validateGmlSubset} from "../../src/compiler/subset";

const validate = (source: string) => validateGmlSubset(
  ts.createSourceFile("fixture.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS),
);

describe("purpose-built GML emitter", () => {
  test("prints GML directly with explicit semantic transforms", () => {
    const output = emitTypeScriptFragment(`
      function describe(value: unknown) {
        const missing = null;
        do { value = typeof value; } while (value !== missing);
        return \`\${value}:\${missing}\`;
      }
    `);
    expect(output).toContain("var missing = pointer_null;");
    expect(output).toContain("typeof(value)");
    expect(output).toContain("until (!(value != missing));");
    expect(output).not.toMatch(/use strict|exports\.|Object\.defineProperty|__awaiter/);
  });

  test("preserves constructor parameter and field initialization before the body", () => {
    const output = emitTypeScriptFragment(`
      class Actor extends Entity {
        ready = this.configure();
        constructor(public name: string) {
          super(name);
          show_debug_message(this.ready);
        }
        configure(): boolean { return true; }
      }
    `);
    expect(output).toContain("function Actor(name) : Entity(name) constructor");
    expect(output.indexOf("self.name = name;")).toBeLessThan(output.indexOf("self.ready = self.configure();"));
    expect(output.indexOf("self.ready = self.configure();")).toBeLessThan(output.indexOf("show_debug_message(self.ready);"));
  });

  test("lowers typed GML intrinsics without a runtime Gml object", () => {
    const output = emitTypeScriptFragment(`
      Gml.with(obj_enemy, enemy => { enemy.hp -= 1; });
      Gml.repeat(3, index => { show_debug_message(index); });
      Gml.dsMapSet(scores, "player", Gml.dsMapGet(scores, "player"));
    `);
    expect(output).toContain("with (obj_enemy)");
    expect(output).toContain("self.hp -= 1;");
    expect(output).toContain("repeat (3)");
    expect(output).toContain('scores[? "player"] = scores[? "player"]');
    expect(output).not.toContain("Gml.");
  });

  test("has a closed emitter instead of a JavaScript fallback", () => {
    expect(() => emitTypeScriptFragment("debugger;")).toThrow(GmlEmitError);
    expect(() => emitTypeScriptFragment("export function run() {}"))
      .toThrow(/Runtime exports are not supported/);
  });
});

describe("GML syntax policy", () => {
  test("accepts safe arrows and rejects lexical captures", () => {
    expect(validate("const callback = (value: number) => value + 1;")).toEqual([]);
    expect(validate("const callback = () => this.x;").map((item) => item.code)).toContain("GMTS1004");
  });

  test.each([
    ["export function run() {}", "GMTS1002"],
    ["const lib = require(\"lib\");", "GMTS1001"],
    ["module.exports = value;", "GMTS1002"],
    ["async function run() {}", "GMTS1016"],
    ["function* run() { yield 1; }", "GMTS1017"],
    ["namespace Runtime { export const value = 1; }", "GMTS1003"],
    ["@sealed class Decorated {}", "GMTS1020"],
    ["const value = /x/;", "GMTS1007"],
    ["const value = 1n;", "GMTS1031"],
    ["const value = new Promise(resolve => resolve(1));", "GMTS1046"],
    ["const value = item?.x;", "GMTS1013"],
    ["const value = item ?? fallback;", "GMTS1033"],
    ["left = right = 1;", "GMTS1036"],
    ["for (const value of values) value;", "GMTS1005"],
    ["const { value } = item;", "GMTS1010"],
    ["const values = [...other];", "GMTS1011"],
    ["function run(...values: number[]) {}", "GMTS1012"],
    ["const value = tag`text`;", "GMTS1006"],
    ["const values = items.map(item => item);", "GMTS1015"],
    ["class Test { static value = 1; }", "GMTS1038"],
    ["class Test { get value() { return 1; } }", "GMTS1008"],
    ["class Test { #value = 1; }", "GMTS1009"],
    ["class Test { [name]() {} }", "GMTS1014"],
    ["const Runtime = class {};", "GMTS1030"],
    ["function run() { let value = 1; { let value = 2; } }", "GMTS1040"],
    ["const unsafe$name = 1;", "GMTS1037"],
    ["debugger;", "GMTS1039"],
  ])("rejects %s", (source, code) => {
    expect(validate(source).map((item) => item.code)).toContain(code);
  });

  test("keeps a centralized disposition for every documented syntax family", () => {
    expect(new Set(Object.values(GML_SYNTAX_POLICY))).toEqual(new Set(["native", "lowered", "intrinsic", "erased", "rejected"]));
  });

  test("pins the TypeScript syntax inventory for reviewed compiler upgrades", () => {
    const names = Object.keys(ts.SyntaxKind).filter((name) => Number.isNaN(Number(name))).sort();
    expect(names).toHaveLength(396);
    expect(crypto.createHash("sha256").update(JSON.stringify(names)).digest("hex"))
      .toBe("5eacd3b740c7fc716fc39aca738fb46e963357ea1c95e9a47ef2912aeb7ff4fb");
  });
});
