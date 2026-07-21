// Generated support model for GameMaker LTS 2026.0.0.23.
interface Object {}
interface Function {}
interface CallableFunction extends Function {}
interface NewableFunction extends Function {}
interface IArguments { readonly length: number; [index: number]: unknown; }
interface String {}
interface Number {}
interface Boolean {}
interface RegExp {}
interface Array<T> { length: number; [index: number]: T; }
interface ReadonlyArray<T> { readonly length: number; readonly [index: number]: T; }

type Partial<T> = { [P in keyof T]?: T[P] };
type Record<K extends string | number | symbol, T> = { [P in K]: T };
type GMLFunction = (...args: unknown[]) => unknown;

declare const __gmtsBrand: unique symbol;
declare const noone: unique symbol;
type NoOne = typeof noone;

declare namespace Asset {
  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly asset: Name } }
  type GMAnimCurve = Brand<"GMAnimCurve">;
  type GMAudioGroup = Brand<"GMAudioGroup">;
  type GMFont = Brand<"GMFont">;
  type GMObject<T extends globalThis.GMObject = globalThis.GMObject> = Brand<"GMObject"> & { readonly __instanceType?: T };
  type GMParticleSystem = Brand<"GMParticleSystem">;
  type GMPath = Brand<"GMPath">;
  type GMRoom = Brand<"GMRoom">;
  type GMScript = Brand<"GMScript">;
  type GMSequence = Brand<"GMSequence">;
  type GMShader = Brand<"GMShader">;
  type GMSound = Brand<"GMSound">;
  type GMSprite = Brand<"GMSprite">;
  type GMTexturePage = Brand<"GMTexturePage">;
  type GMTileSet = Brand<"GMTileSet">;
  type GMTimeline = Brand<"GMTimeline">;
  type Script = Brand<"Script">;
  type Any = GMAnimCurve | GMAudioGroup | GMFont | GMObject | GMParticleSystem | GMPath | GMRoom | GMScript | GMSequence | GMShader | GMSound | GMSprite | GMTexturePage | GMTileSet | GMTimeline | Script;
}

declare namespace Id {
  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly id: Name } }
  type AudioEmitter = Brand<"AudioEmitter">;
  type AudioListener = Brand<"AudioListener">;
  type AudioSyncGroup = Brand<"AudioSyncGroup">;
  type BackgroundElement = Brand<"BackgroundElement">;
  type BinaryFile = Brand<"BinaryFile">;
  type Buffer = Brand<"Buffer">;
  type Camera = Brand<"Camera">;
  type DbgRef = Brand<"DbgRef">;
  type DsGrid<T = unknown> = Brand<"DsGrid"> & { readonly __itemType?: T };
  type DsList<T = unknown> = Brand<"DsList"> & { readonly __itemType?: T };
  type DsMap<K extends string | number = string | number, V = unknown> = Brand<"DsMap"> & { readonly __keyType?: K; readonly __valueType?: V };
  type DsPriority<T = unknown> = Brand<"DsPriority"> & { readonly __itemType?: T };
  type DsQueue<T = unknown> = Brand<"DsQueue"> & { readonly __itemType?: T };
  type DsStack<T = unknown> = Brand<"DsStack"> & { readonly __itemType?: T };
  type EmitterIndex = Brand<"EmitterIndex">;
  type ExternalCall = Brand<"ExternalCall">;
  type Gif = Brand<"Gif">;
  type Instance<T extends globalThis.GMObject = globalThis.GMObject> = T;
  type Layer = Brand<"Layer">;
  type MpGrid = Brand<"MpGrid">;
  type ParticleElement = Brand<"ParticleElement">;
  type ParticleEmitter = Brand<"ParticleEmitter">;
  type ParticleSystem = Brand<"ParticleSystem">;
  type ParticleType = Brand<"ParticleType">;
  type PhysicsFixture = Brand<"PhysicsFixture">;
  type PhysicsFixtureBound = Brand<"PhysicsFixtureBound">;
  type PhysicsJoint = Brand<"PhysicsJoint">;
  type PhysicsParticle = Brand<"PhysicsParticle">;
  type PhysicsParticleGroup = Brand<"PhysicsParticleGroup">;
  type Sampler = Brand<"Sampler">;
  type Script = Brand<"Script">;
  type SequenceElement = Brand<"SequenceElement">;
  type Socket = Brand<"Socket">;
  type Sound = Brand<"Sound">;
  type SpriteElement = Brand<"SpriteElement">;
  type Surface = Brand<"Surface">;
  type TextElement = Brand<"TextElement">;
  type TextFile = Brand<"TextFile">;
  type Texture = Brand<"Texture">;
  type TileElementId = Brand<"TileElementId">;
  type TileMapElement = Brand<"TileMapElement">;
  type TimeSource = Brand<"TimeSource">;
  type Uniform = Brand<"Uniform">;
  type VertexBuffer = Brand<"VertexBuffer">;
  type VertexFormat = Brand<"VertexFormat">;
}

declare namespace Constant {
  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly constant: Name } }
  type All = Brand<"All">;
  type AnimCurveInterpolationType = Brand<"AnimCurveInterpolationType">;
  type AssetType = Brand<"AssetType">;
  type AsyncEventType = Brand<"AsyncEventType">;
  type AudioChannelType = Brand<"AudioChannelType">;
  type AudioFalloff = Brand<"AudioFalloff">;
  type BBoxMode = Brand<"BBoxMode">;
  type BlendMode = Brand<"BlendMode">;
  type BlendModeEquation = Brand<"BlendModeEquation">;
  type BlendModeFactor = Brand<"BlendModeFactor">;
  type Browser = Brand<"Browser">;
  type BrowserType = Brand<"BrowserType">;
  type BufferDataType = Brand<"BufferDataType">;
  type BufferErrorType = Brand<"BufferErrorType">;
  type BufferType = Brand<"BufferType">;
  type CollisionMask = Brand<"CollisionMask">;
  type Color = Brand<"Color">;
  type CullMode = Brand<"CullMode">;
  type Cursor = Brand<"Cursor">;
  type DebugInputFilter = Brand<"DebugInputFilter">;
  type DeviceType = Brand<"DeviceType">;
  type DsType = Brand<"DsType">;
  type EffectType = Brand<"EffectType">;
  type EventNumber = Brand<"EventNumber">;
  type EventType = Brand<"EventType">;
  type ExternalArgumentType = Brand<"ExternalArgumentType">;
  type ExternalCallType = Brand<"ExternalCallType">;
  type FileAttribute = Brand<"FileAttribute">;
  type GameSpeed = Brand<"GameSpeed">;
  type GamepadAxis = Brand<"GamepadAxis">;
  type GamepadButton = Brand<"GamepadButton">;
  type HAlign = Brand<"HAlign">;
  type LayerElementType = Brand<"LayerElementType">;
  type LayerType = Brand<"LayerType">;
  type LightType = Brand<"LightType">;
  type MatrixType = Brand<"MatrixType">;
  type MouseButton = Brand<"MouseButton">;
  type NetworkConfig = Brand<"NetworkConfig">;
  type NetworkConnectType = Brand<"NetworkConnectType">;
  type NetworkType = Brand<"NetworkType">;
  type NineSlice = Brand<"NineSlice">;
  type OperatingSystem = Brand<"OperatingSystem">;
  type Other = Brand<"Other">;
  type ParticleDistribution = Brand<"ParticleDistribution">;
  type ParticleEmitterMode = Brand<"ParticleEmitterMode">;
  type ParticleRegionShape = Brand<"ParticleRegionShape">;
  type ParticleShape = Brand<"ParticleShape">;
  type PathAction = Brand<"PathAction">;
  type PhysicsDebugFlag = Brand<"PhysicsDebugFlag">;
  type PhysicsJointProperty = Brand<"PhysicsJointProperty">;
  type PhysicsParticleDataFlag = Brand<"PhysicsParticleDataFlag">;
  type PhysicsParticleFlag = Brand<"PhysicsParticleFlag">;
  type PhysicsParticleGroupFlag = Brand<"PhysicsParticleGroupFlag">;
  type PrimitiveType = Brand<"PrimitiveType">;
  type SeekOffset = Brand<"SeekOffset">;
  type SendOption = Brand<"SendOption">;
  type SeqPlay = Brand<"SeqPlay">;
  type SequenceAudioKey = Brand<"SequenceAudioKey">;
  type SequenceDirection = Brand<"SequenceDirection">;
  type SequencePlay = Brand<"SequencePlay">;
  type SequenceTextKey = Brand<"SequenceTextKey">;
  type SequenceTrackType = Brand<"SequenceTrackType">;
  type SocketType = Brand<"SocketType">;
  type SpriteSpeed = Brand<"SpriteSpeed">;
  type StencilOp = Brand<"StencilOp">;
  type SurfaceFormatType = Brand<"SurfaceFormatType">;
  type TextAlign = Brand<"TextAlign">;
  type TextOrigin = Brand<"TextOrigin">;
  type TextWrap = Brand<"TextWrap">;
  type TileMask = Brand<"TileMask">;
  type TimeSource = Brand<"TimeSource">;
  type TimeSourceExpiryType = Brand<"TimeSourceExpiryType">;
  type TimeSourceState = Brand<"TimeSourceState">;
  type TimeSourceUnits = Brand<"TimeSourceUnits">;
  type TimingMethod = Brand<"TimingMethod">;
  type VAlign = Brand<"VAlign">;
  type VertexType = Brand<"VertexType">;
  type VertexUsage = Brand<"VertexUsage">;
  type VideoFormat = Brand<"VideoFormat">;
  type VideoStatus = Brand<"VideoStatus">;
  type VirtualKey = Brand<"VirtualKey">;
  type VirtualKeyboardAutoCapitalizeType = Brand<"VirtualKeyboardAutoCapitalizeType">;
  type VirtualKeyboardReturnType = Brand<"VirtualKeyboardReturnType">;
  type VirtualKeyboardType = Brand<"VirtualKeyboardType">;
  type ZFunction = Brand<"ZFunction">;
}

declare namespace Pointer {
  interface Brand<Name extends string> { readonly [__gmtsBrand]: { readonly pointer: Name } }
  type DbgControl = Brand<"DbgControl">;
  type FlexpanelNode = Brand<"FlexpanelNode">;
  type Section = Brand<"Section">;
  type Texture = Brand<"Texture">;
  type View = Brand<"View">;
  type Any = Brand<"Pointer">;
}

declare namespace GML {
  type ArgumentIdentity = unknown;
  type Rela = unknown;
  type array = unknown;
}

declare class GMObject {
  readonly [__gmtsBrand]: { readonly id: "Instance" };
  x: number;
  y: number;
  id: this;
  onCreate(): void;
  onDestroy(): void;
  onCleanUp(): void;
}

interface GmlCompilerIntrinsics {
  with<T extends GMObject>(target: Asset.GMObject<T> | T | Constant.All | Constant.Other, body: (target: T) => void): void;
  repeat(count: number, body: (iteration: number) => void): void;
  dsListGet<T>(list: Id.DsList<T>, index: number): T;
  dsListSet<T>(list: Id.DsList<T>, index: number, value: T): T;
  dsMapGet<K extends string | number, V>(map: Id.DsMap<K, V>, key: K): V | undefined;
  dsMapSet<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): V;
  dsGridGet<T>(grid: Id.DsGrid<T>, x: number, y: number): T;
  dsGridSet<T>(grid: Id.DsGrid<T>, x: number, y: number, value: T): T;
  structGet<T extends object, K extends keyof T>(value: T, key: K): T[K];
  structSet<T extends object, K extends keyof T>(value: T, key: K, member: T[K]): T[K];
}
declare const Gml: GmlCompilerIntrinsics;

type CollisionTarget = Asset.GMObject | GMObject | Id.TileMapElement;
type CollisionObject<T> = T extends Asset.GMObject<infer O> ? O : T extends GMObject ? T : never;
type CollisionResult<T> =
  | ([CollisionObject<T>] extends [never] ? never : CollisionObject<T>)
  | (T extends Id.TileMapElement ? Id.TileMapElement : never)
  | NoOne;
type CollisionInputResult<T> = T extends ReadonlyArray<infer U> ? CollisionResult<U> : CollisionResult<T>;
