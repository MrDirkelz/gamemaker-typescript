# Migrating to GameMaker TypeScript 1.0

Version 1.0 is a strict release for GameMaker LTS runtime `2026.0.0.23`. It no longer emits GML from a file that has TypeScript errors or unsupported JavaScript semantics.

## Upgrade

1. Install the compiler locally: `npm install --save-dev @odemian/gamemaker-typescript@^1`.
2. Run `npx gmts setup`. This creates `tsconfig.gmts.json`, installs the pinned type pack, and refreshes both build hooks. Existing root TypeScript configuration is preserved.
3. Run `npx gmts check` and resolve every diagnostic.
4. Inspect `npx gmts compile --dry-run`.
5. Commit the first successful compile together with `.gmts/manifest.json` and `.gmts/generated/project.d.ts`.

## Required source changes

- Add `override` to event methods.
- Collision handlers use `override onCollision_<object>(other: TargetClass): void`.
- Keep exactly one implementation `.ts` file in each TypeScript-owned object or script resource. Adjacent `.d.ts` helpers are allowed.
- Make every object class extend `GMObject` or another object class. TypeScript inheritance now updates `parentObjectId`.
- Supply required GameMaker function arguments. The old type pack incorrectly marked most arguments optional.
- Narrow collision and lookup results with `result !== noone` before accessing instance fields.
- Replace JavaScript prototype calls and unsupported syntax with GameMaker functions and explicit control flow.
- Replace GML-only accessor syntax and `with` blocks with typed `Gml.*` intrinsics.
- Add `super.onCreate()` only when an explicit child Create override should execute the parent event. Compiler-generated Create events used solely for fields/helpers preserve parent behavior automatically.

## Adopting existing GML

The first compile enters adoption mode. A generated output path is claimed only when it does not exist or its current contents exactly match the new output. Different hand-written GML is never overwritten: move or rename it, then rerun the check.

After adoption, changing an owned generated file causes a conflict. Move custom behavior into TypeScript or an unowned event/file rather than editing generated GML.

The ownership manifest upgrades to schema 2 after a successful read-only validation. Compilation uses `.gmts/compile.lock` and recoverable journals under `.gmts/transactions`; use `gmts doctor --repair-lock` only after confirming an interrupted compiler is no longer active.

## CI

Use `npm run verify` to run strict source typechecking, deterministic LTS type-pack verification, tests, the CLI build, and a package-content smoke test.

Publishing additionally requires a self-hosted runner labelled `gamemaker-lts-2026`. Configure `GMTS_GAMEMAKER_CLI`, `GMTS_GAMEMAKER_PROJECT`, and `GMTS_GAMEMAKER_ARGS_JSON`; the argument array must contain `{project}` and may contain `{projectDir}`. The release job copies the maintained game fixture, runs `gmts check` and `gmts compile`, then requires the licensed LTS compiler to accept the generated project.
