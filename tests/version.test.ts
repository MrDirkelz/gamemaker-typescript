import {describe, expect, test} from "vitest";
import {isVersionHigher} from "../src/utils/version";

describe("minimum version comparison", () => {
  test("accepts the exact minimum and later versions", () => {
    expect(isVersionHigher("2026.0.0.23", "2026.0.0.23")).toBe(true);
    expect(isVersionHigher("2026.0.1", "2026.0.0.23")).toBe(true);
  });

  test("rejects older versions", () => {
    expect(isVersionHigher("2025.11", "2026.0.0.23")).toBe(false);
  });
});
