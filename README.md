# GameMaker TypeScript

GameMaker TypeScript is a strict, project-wide TypeScript compiler for the GML-compatible subset of TypeScript. Version 1 targets GameMaker LTS runtime `2026.0.0.23`.

![Gamemaker with typescript and VS Code](https://raw.githubusercontent.com/OleksandrDemian/gamemaker-typescript/refs/heads/master/assets/example_1.png)

The compiler validates the complete project before changing any GML or resource metadata. It protects hand-written GML through `.gmts/manifest.json` ownership records.

## Features

- **Compile TypeScript files**: Emits GML directly from TypeScript files (`.ts`) found in scripts and objects. No JavaScript/CommonJS output is used. It follows [resource hoisting](#resource-hoisting).
- **Authoritative LTS declarations**: Generates 2,357 functions, 886 constants, 210 globals, 13 enums, and 33 structures from `GmlSpec.xml`.
- **Automatic Asset Scanning**: Types objects, sprites, sounds, rooms, tilesets, paths, fonts, shaders, timelines, sequences, animation curves, particle systems, and extension APIs.
- **Correlated object typing**: Object assets, instance handles, tile maps, `noone`, collision results, and instance creation retain their related types.
- **Transactional compilation**: Type errors, unsupported syntax, resource conflicts, or inheritance errors prevent all writes.
- **Code editors compatible**: Works seamlessly with any code editors, including VS Code, WebStorm, and others.

## Example code

Before writing code, run `gmts setup` to configure strict LTS 2026 types and automatic compilation.

### Game object creation

TS classes are bound to the GameMaker objects, so you first need to create GM object in IDE, and then place `.ts` script in the same folder as `.yy`.

Here is an example of how to create an object which can be moved on the map using keyboard (filename: `objects/obj_player/code.ts`):

```typescript
class Player extends GMObject {
  _movement_speed: number;

  // inside of the defineObject you can declare all of your events, like onCreate, onStep, onDraw etc...
  override onCreate() {
    // use "this." keyword to access object properties in a safe fully typed way
    this._movement_speed = 2;
  }

  override onStep() {
    var _hspd = keyboard_check(vk_right) - keyboard_check(vk_left);
    var _vspd = keyboard_check(vk_down) - keyboard_check(vk_up);

    if (_hspd != 0 || _vspd != 0) {
        var _dir = point_direction(0, 0, _hspd, _vspd);
        this.x = this.x + lengthdir_x(this._movement_speed, _dir);
        this.y = this.y + lengthdir_y(this._movement_speed, _dir);
    }
  }
}
```

You can also extend other object and use inheritance:

```typescript
// obj_base/code.ts
class Base extends GMObject {
  _movement_speed: number;

  move (in_h: number, in_v: number) {
    // in_h and in_v are compued by obj_base, here we receive result and make player move using movement_speed
    if (in_h != 0 || in_v != 0) {
      this.sprite_index = spr_player_move;
      this.x += this._movement_speed * in_h;
      this.y += this._movement_speed * in_v;

      if (in_h > 0) {
        this.image_xscale = 1;
      } else {
        this.image_xscale = -1;
      }
    } else {
      this.sprite_index = spr_player_idle;
    }
  }
}

// obj_player/code.ts
class Player extends Base {
  override onCreate(): void {
    this._movement_speed = 2;
  }

  override onStep (): void {
    var h = keyboard_check(ord("D")) - keyboard_check(ord("A"));
    var v = keyboard_check(ord("S")) - keyboard_check(ord("W"));

    // this.move is inherited from obj_base
    this.move(h, v);
  }
}
```

TypeScript `extends` is the source of truth. A successful compile synchronizes the GameMaker object's `parentObjectId`; missing, ambiguous, and circular parents are errors.

### Typed collision events

The collision suffix is the GameMaker object resource name. The single `other` parameter is checked against that resource's TypeScript class and is omitted from emitted GML because `other` is a GameMaker built-in.

```typescript
class Player extends GMObject {
  override onCollision_obj_enemy(other: Enemy): void {
    other.hp -= 1;
  }
}
```

Collision queries preserve the same relationship:

```typescript
const hit = collision_rectangle(0, 0, 32, 32, obj_enemy, false, true);
if (hit !== noone) {
  hit.hp -= 1;
}
```

### Script

It is also possible to create a script (filename: `scripts/scr_player/code.ts`):

```typescript

// you can fully type arguments, in this case we tell that obj is IPlayer, so only IPlayer can be passed here
function increase_player_speed (obj: Player) {
  // here you have full autocomplete for player object, plus, if you try to pass something that is not IPlayer, the code editor will tell you about your mistake
  obj._movement_speed += 2;
}

```

## Resource hoisting

⚠️ To make this library stable and fully compatible with GameMaker's inner workings this project uses resource hoisting.
The hoisting requires the `.ts` file to be part of the GM resource such as `Object` or `Script`.
So for example, if I create an object `obj_player`, the relative `.ts` should be placed in `/objects/obj_player/code.ts` (you can use any name for .ts file).

The compiler updates only validated object metadata and generated files recorded in `.gmts/manifest.json`. Existing unowned events and GML survive compilation. A manually changed owned file or conflicting unowned output blocks the compile.

## Installation

Install the package in the GameMaker project so build hooks use a pinned compiler version:

```bash
npm install --save-dev @odemian/gamemaker-typescript
npx gmts setup
```

A global installation remains supported as a fallback.

## Usage

## Setup

Before using the tool, you need to set it up. Run the following command to initialize the project:

```bash
gmts setup
```

This creates `tsconfig.gmts.json`, copies the pinned LTS declarations to `.gmts/types`, and configures the official cross-platform `pre_project_step` extension hook. An unrelated existing root `tsconfig.json` is preserved.

### Automatic compilation

GameMaker LTS 2026 supports the `pre_project_step` extension hook. After `gmts setup`, GameMaker runs the project-local compiler before collecting assets and stops the build when validation fails.

### Compile Once

It is also possible to manually compile from command line:

```bash
gmts compile
```

Other commands:

```bash
gmts check                 # strict validation, no writes
gmts compile --dry-run     # show the validated output plan
gmts doctor                # diagnose setup, hooks, versions, types, and manifest
gmts doctor --repair-lock  # remove a provably stale same-host compile lock
```

Hand-written GML remains supported. The compiler infers conservative declarations for its top-level functions, constructors, macros, and enums; an adjacent `.d.ts` file can refine those signatures without giving the compiler ownership of the GML.

### GML-only operations

The typed `Gml` intrinsic object provides syntax that TypeScript cannot spell directly. These calls are erased and lowered by the compiler; no runtime `Gml` object is generated.

```typescript
Gml.with(obj_enemy, enemy => {
  enemy.hp -= 1;
});

const score = Gml.dsMapGet(scores, "player");
Gml.dsMapSet(scores, "player", score + 1);
```

## Supported TypeScript subset

The compiler supports typed functions and variables, interfaces, type aliases, generics, overloads, object and constructor classes, numeric enums, standard control flow, arrays, structs, calls, `new`, safe arrows, and erased type-only syntax. It emits GML-specific transforms such as `this` to `self`, strict equality to GML equality, `null` to `pointer_null`, direct numeric enums, templates, and inherited event calls. Arrows are accepted only when they do not capture lexical `this`, `arguments`, `super`, or `new.target`.

It rejects constructs whose JavaScript semantics cannot be preserved in GML, including runtime modules, async/generators, promises, decorators, namespaces, JSX, regex and BigInt literals, prototype APIs, private fields, accessors, computed methods, unsafe arrows, destructuring, spread/rest, `for...of`, `for...in`, tagged templates, optional chaining, nullish operators, and chained assignment. See [MIGRATION.md](./MIGRATION.md).

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Examples

### Autocomplete GML

![gamemaker-typescript](https://raw.githubusercontent.com/OleksandrDemian/gamemaker-typescript/refs/heads/master/assets/example_2.png)

![gamemaker-typescript](https://raw.githubusercontent.com/OleksandrDemian/gamemaker-typescript/refs/heads/master/assets/example_4.png)

### Type safe

![gamemaker-typescript](https://raw.githubusercontent.com/OleksandrDemian/gamemaker-typescript/refs/heads/master/assets/example_3.png)

![gamemaker-typescript](https://raw.githubusercontent.com/OleksandrDemian/gamemaker-typescript/refs/heads/master/assets/example_6.png)

![gamemaker-typescript](https://raw.githubusercontent.com/OleksandrDemian/gamemaker-typescript/refs/heads/master/assets/example_7.png)
