// Generated from GmlSpec.xml for GameMaker LTS 2026.0.0.23.

type Exclude<T, U> = T extends U ? never : T;

declare namespace Struct {
  interface Fx { [key: string]: unknown; }
  interface NineSlice { [key: string]: unknown; }
  interface SkeletonSkin { [key: string]: unknown; }
  interface SpriteInfo { [key: string]: unknown; }
  interface Zip { [key: string]: unknown; }
  interface Sequence {
    /**
     * This is the name of the sequence as a string and you can get or set this value as required. Note that sequences created using the function sequence_create() will not have a name and this will simply be an empty string "".
     */
    name: string;
    /**
     * This is the playback mode of the sequence object and can be get or set.
     */
    loopmode: Constant.SeqPlay;
    /**
     * This specifies the playback speed of the sequence, which is interpreted as either frames-per-second or frames-per-game-frame depending on the playbackSpeedType. You can get or set this value.
     */
    playbackSpeed: number;
    /**
     * This specifies how the playbackSpeed should be interpreted and you can get or set this value.
     */
    playbackSpeedType: Constant.SpriteSpeed;
    /**
     * The length of the sequence in frames. You can get or set this value, but note that making a sequence shorter may cause issues if a sequence instance referencing this sequence has its playhead set to past the new length.
     */
    length: number;
    /**
     * This is a scalar value from 0 to 1 that is used to scale the volume of all audio tracks in the sequence. You can get or set this value and it will modify the global audio output for all tracks - for example, if you have an audio track with a volume of 0.8 and then set the sequence volume property to 0.5, the audio track will have a final volume of 0.4.
     */
    volume: number;
    /**
     * This is the origin of the sequence along the X axis.
     */
    xorigin: number;
    /**
     * This is the origin of the sequence along the Y axis.
     */
    yorigin: number;
    /**
     * This allows access to the message event keyframes for the sequence. You can get or set these message events, and when getting this property an array of keyframe structs is returned, and for setting the property you should supply an array of keyframe structs. For more information, please see the page on Sequence Events and Moments.
     */
    messageEventKeyframes: unknown[];
    /**
     * This allows access to the moment event keyframes for the sequence. You can get or set these moment events, and when getting this property an array of keyframe structs is returned, and for setting the property you should supply an array of keyframe structs. For more information, please see the page on Sequence Events and Moments.
     */
    momentKeyframes: unknown[];
    /**
     * This allows access to the list of asset tracks on the top level of the sequence. You can get or set this property, and when getting this property an array of track structs is returned, and for setting the property you should supply an array of track structs. For more information, please see the section on Track Structs.
     */
    tracks: unknown[];
  }
  interface SequenceInstance {
    /**
     * This is the ID of the sequence object struct that the sequence instance has been created from.
     */
    sequence: Struct.Sequence;
    /**
     * This is the current playhead position (in frames) for the sequence instance.
     */
    headPosition: number;
    /**
     * This is the current playback direction for the sequence instance.
     */
    headDirection: Constant.SequenceDirection;
    /**
     * This property can be used to get or set the playback speed scale.
     */
    speedScale: number;
    /**
     * This is a scalar value from 0 to 1 that is used to scale the volume of all audio tracks in the sequence. You can get or set this value and it will modify the global audio output for all tracks - for example, if you have an audio track with a volume of 0.8 and then set the sequence volume property to 0.5, the audio track will have a final volume of 0.4.
     */
    volume: number;
    /**
     * You can check this read-only property to see if a sequence has been paused or not, and it will be true if it has, or false otherwise.
     */
    paused: boolean;
    /**
     * You can check this read-only property to see if a sequence has finished playing or not, returning true if it is finished playing, and false otherwise.
     */
    finished: boolean;
    /**
     * This read-only property will hold an array of "evaluation" structs containing information on the current state of each asset track in the sequence (graphics, sequence, audio, etc.).
     */
    activeTracks: Array<Struct.ActiveTrack>;
    /**
     * This property holds the ID of the sequence element.
     */
    elementID: Id.SequenceElement;
  }
  interface Track {
    /**
     * When creating a "top-level" asset track, the name you give here can be any string that you require to identify the track. However, for parameter tracks, you need to specify specific strings to tell GameMaker what kind of parameter track you are creating.
     */
    name: string;
    /**
     * This contains a Sequence Track Type Constant that describes the type of track.
     */
    type: Constant.SequenceTrackType;
    /**
     * The list of tracks which are children of this track. When getting this property an array of Sequence Track Structs is returned, and when setting this property an array of Sequence Track Structs should be specified.
     */
    tracks: Array<Struct.Track>;
    /**
     * This indicates whether this track is visible (the value is true) or not (the value is false). You can get or set this value and if a track not visible then none of its child tracks will be drawn either.
     */
    visible: boolean;
    /**
     * This property allows access to the list of keyframe structs for the track. When getting this property an array of keyframe structs is returned, and when setting this property an array of keyframe structs should be specified.
     */
    keyframes: Array<Struct.Keyframe>;
  }
  interface Keyframe {
    /**
     * The position (in frames) along the timeline for the keyframe. Default value is 0.
     */
    frame: number;
    /**
     * The length of the keyframe. Default value is 1, and when set to larger values then the track property that the keyframe refers to will be maintained at the initial value for the duration of the length given. Note that the stretch property will override this if set to true.
     */
    length: number;
    /**
     * If this property is set to true then the keyframe stretches to either the next keyframe for the track or to the end of the track if it's the last keyframe. You can get or set this value, and the default value is false.
     */
    stretch: boolean;
    /**
     * Whether this keyframe is disabled
     */
    disabled: boolean;
    /**
     * This property allows access to the list of keyframe data structs for the channels of the track. When getting this property an array of keyframe data structs is returned, and when setting this property an array of keyframe data structs should be specified.
     */
    channels: unknown[];
  }
  interface KeyChannel {
    /**
     * The key's channel
     */
    channel: number;
  }
  interface GraphicTrack {
    /**
     * The sprite asset used by the graphic track
     */
    spriteIndex: Asset.GMSprite;
  }
  interface SequenceTrack {
    /**
     * The sequence used by the sequence track
     */
    sequence: undefined;
  }
  interface AudioTrack {
    /**
     * READ-ONLY The ID of the sound instance that's playing on this track's emitter.
     */
    soundIndex: Asset.GMSound;
    /**
     * READ-ONLY The index of the audio emitter used by this track.
     */
    emitterIndex: Id.EmitterIndex;

    playbackMode: number;
  }
  interface SpriteTrack {
    /**
     * The image index
     */
    imageIndex: number;
  }
  interface BoolTrack {
    /**
     * The value of the boolean
     */
    value: boolean;
  }
  interface StringTrack {
    /**
     * The string
     */
    value: string;
  }
  interface ColourTrack {
    /**
     * The colour
     */
    colour: Constant.Color;
  }
  interface ColorTrack {
    /**
     * The color
     */
    color: Constant.Color;
  }
  interface RealTrack {
    /**
     * The value to use
     */
    value: number;

    curve: number;
  }
  interface InstanceTrack {
    /**
     * The object index of the instance
     */
    objectIndex: Asset.GMObject;
  }
  interface TextTrack {
    /**
     * The text shown on the text track
     */
    text: string;
    /**
     * Whether to wrap the text
     */
    wrap: boolean;
    /**
     * The horizontal text alignment
     */
    alignmentV: number;
    /**
     * The vertical text alignment
     */
    alignmentH: number;
    /**
     * The index of the font asset
     */
    fontIndex: Asset.GMFont;
    /**
     * Whether SDF text effects are enabled or not
     */
    effectsEnabled: boolean;
    /**
     * Whether the glow effect is enabled
     */
    glowEnabled: boolean;
    /**
     * Whether the outline effect is enabled
     */
    outlineEnabled: boolean;
    /**
     * Whether the drop shadow effect is enabled
     */
    dropShadowEnabled: boolean;
  }
  interface MessageEvent {

    events: unknown[];
  }
  interface Moment {

    event: number;
  }
  interface AnimCurve {

    name: string;

    channels: unknown[];
  }
  interface AnimCurveChannel {

    name: string;

    type: Constant.AnimCurveInterpolationType;

    iterations: number;

    points: number;
  }
  interface AnimCurvePoint {
    /**
     * The x position of the point
     */
    posx: number;
    /**
     * The value at the x position
     */
    value: number;
  }
  interface ActiveTrack {
    /**
     * READ-ONLY This is an array of evaluation structs for each parameter track that the asset track contains. The contents of each struct in the array are listed on the manual's Track Struct page.
     */
    readonly activeTracks: Array<Struct.Track>;
    /**
     * The transformation matrix of the track within the parent track's frame of reference (all asset track types).
     */
    matrix: unknown[];
    /**
     * The position of the asset in the sequence along the X axis for the track (all asset track types).
     */
    posx: number;
    /**
     * The position of the asset in the sequence along the Y axis for the track (all asset track types).
     */
    posy: number;
    /**
     * The scale of the asset in the sequence along the X axis for the track (group, particle system, instance, sequence, text and sprite asset track types).
     */
    scalex: number;
    /**
     * The scale of the asset in the sequence along the Y axis for the track (group, particle system, instance, sequence, text and sprite asset track types).
     */
    scaley: number;
    /**
     * The X origin of the asset for the track (group, particle system, instance, sequence, text and sprite asset track types).
     */
    xorigin: number;
    /**
     * The Y origin of the asset for the track (group, particle system, instance, sequence, text and sprite asset track types).
     */
    yorigin: number;
    /**
     * The gain of the track, which is the emitter gain.
     */
    gain: number;
    /**
     * The pitch of the track, which is the emitter pitch.
     */
    pitch: number;
    /**
     * The audio emitter's falloff reference distance.
     */
    falloffRef: number;
    /**
     * The audio emitter's falloff maximum distance.
     */
    falloffMax: number;
    /**
     * The audio emitter's falloff factor.
     */
    falloffFactor: number;

    width: number;

    height: number;
    /**
     * The image index for the asset on the track in the sequence.
     */
    imageindex: number;
    /**
     * The image speed for the asset on the track in the sequence.
     */
    imagespeed: number;
    /**
     * The color multiply value for the asset on the track in the sequence at the current playhead position (sprite, instance and sequence tracks). This value will be an array of four ARGB values with the format [A, R, G, B].
     */
    colorMultiply: unknown[];
    /**
     * The colour multiply value for the asset on the track in the sequence at the current playhead position (sprite, instance and sequence tracks). This value will be an array of four ARGB values with the format [A, R, G, B].
     */
    colourMultiply: unknown[];
    /**
     * READ-ONLY The index of the audio emitter used by this track.
     */
    emitterIndex: Id.AudioEmitter;
    /**
     * READ-ONLY The Track Struct that this track is based on.
     */
    track: Struct.Track;
    /**
     * READ-ONLY The parent sequence instance ID for the track.
     */
    parent: Struct.SequenceInstance;
    /**
     * The horizontal size of the text frame.
     */
    frameSizeX: number;
    /**
     * The vertical size of the text frame.
     */
    frameSizeY: number;
    /**
     * The character spacing value.
     */
    characterSpacing: number;
    /**
     * The line spacing value.
     */
    lineSpacing: number;
    /**
     * The paragraph spacing value.
     */
    paragraphSpacing: number;
    /**
     * The thickness of the SDF effect.
     */
    thickness: number;
    /**
     * An array of 4 values, each from 0 to 1, corresponding to ARGB values of the 'core' part of the glyph.
     */
    coreColor: unknown[];
    /**
     * An array of 4 values, each from 0 to 1, corresponding to ARGB values of the 'core' part of the glyph.
     */
    coreColour: unknown[];
    /**
     * The distance in pixels at which the glow effect starts.
     */
    glowStart: number;
    /**
     * The distance in pixels at which the glow effect ends.
     */
    glowEnd: number;
    /**
     * An array of 4 values, each from 0 to 1, corresponding to ARGB values of the glow color.
     */
    glowColor: unknown[];
    /**
     * An array of 4 values, each from 0 to 1, corresponding to ARGB values of the glow colour.
     */
    glowColour: unknown[];
    /**
     * The distance of the outline.
     */
    outlineDist: number;
    /**
     * An array of 4 values, each from 0 to 1, corresponding to ARGB values of the outline color.
     */
    outlineColor: unknown[];
    /**
     * An array of 4 values, each from 0 to 1, corresponding to ARGB values of the outline colour.
     */
    outlineColour: unknown[];
    /**
     * The width of the drop shadow penumbra.
     */
    shadowSoftness: number;
    /**
     * The offset in pixels on the x axis of the drop shadow.
     */
    shadowOffsetX: number;
    /**
     * The offset in pixels on the y axis of the drop shadow.
     */
    shadowOffsetY: number;
    /**
     * An array of 4 values, each from 0 to 1, holding the ARGB components of the drop shadow.
     */
    shadowColor: unknown[];
    /**
     * An array of 4 values, each from 0 to 1, holding the ARGB components of the drop shadow.
     */
    shadowColour: unknown[];
    /**
     * Whether SDF Effects are enabled on this track.
     */
    effectsEnabled: boolean;
    /**
     * Whether the glow effect is enabled.
     */
    glowEnabled: boolean;
    /**
     * Whether the outline effect is enabled.
     */
    outlineEnabled: boolean;
    /**
     * Whether the drop shadow effect is enabled.
     */
    dropShadowEnabled: boolean;
  }
  interface GCStats {
    /**
     * This is the number of active objects the garbage collector found in the previous frame. This will vary depending on which generation was collected.
     */
    objects_touched: number;
    /**
     * The number of objects which the garbage collector determined weren't active in the previous frame, and which could therefore be deleted.
     */
    objects_collected: number;
    /**
     * This is the time in microseconds (on the main thread) which the garbage collector took to figure out which objects were active.
     */
    traversal_time: number;
    /**
     * This is the time in microseconds (on a separate thread) which the garbage collector took to clean up the objects deemed inactive.
     */
    collection_time: number;
    /**
     * This is a counter which is incremented every time a garbage collection pass occurs. If garbage collection is disabled this will not increase.
     */
    gc_frame: number;
    /**
     * This is the index of the generation that was collected last. 0 is the youngest generation and 3 is currently the oldest.
     */
    generation_collected: number;
    /**
     * This is the total number of garbage collection generations.
     */
    num_generations: number;
    /**
     * This is an array (of size num_generations) containing the number of objects in each generation.
     */
    num_objects_in_generation: unknown[];
  }
  interface WeakRef {
    /**
     * The strong reference to the struct in question, or undefined if it has been garbage collected.
     */
    ref: GML.ArgumentIdentity;
  }
  interface FontInfo {
    /**
     * The maximum offset from the baseline to the top of the font (in pixels)
     */
    readonly ascenderOffset: number;
    /**
     * The height of the font's ascender (in pixels)
     */
    readonly ascender: number;
    /**
     * The SDF spread value set for this font
     */
    readonly sdfSpread: number;
    /**
     * Whether SDF is enabled or disabled for this font
     */
    readonly sdfEnabled: boolean;

    readonly freetype: boolean;
    /**
     * The approximate size of the font (in pixels)
     */
    readonly size: number;
    /**
     * The sprite index for the font if it was created from a sprite, otherwise an invalid sprite handle (-1)
     */
    readonly spriteIndex: Asset.GMSprite;
    /**
     * -1 if the font was created from a sprite, otherwise the texture ID of the font
     */
    readonly texture: Asset.GMTexturePage;
    /**
     * The name of the font
     */
    readonly name: string;
    /**
     * true if the font is bold, otherwise false
     */
    readonly bold: boolean;
    /**
     * true if the font is italic, otherwise false
     */
    readonly italic: boolean;
    /**
     * Whether effects are enabled for this font
     */
    readonly effectsEnabled: boolean;
    /**
     * The effects struct for this font, which can be changed with font_enable_effects
     */
    readonly effectParams: Record<string, unknown>;
    /**
     * A struct containing information for each glyph in the font
     */
    readonly glyphs: Record<string, unknown>;
  }
  interface FontInfoGlyph {
    /**
     * If the font was created from a sprite, this will be the image index of the glyph from that sprite, otherwise it will be its Unicode character number. Note: All other variables will not be present in the struct if the font was created from a sprite.
     */
    readonly char: number;
    /**
     * The X position of the glyph on the texture page (in texels)
     */
    readonly x: number;
    /**
     * The Y position of the glyph on the texture page (in texels)
     */
    readonly y: number;
    /**
     * The width of the glyph on the texture page (in texels)
     */
    readonly w: number;
    /**
     * The height of the glyph on the texture page (in texels)
     */
    readonly h: number;
    /**
     * The number of pixels to shift right when advancing to the next character (can be negative for shifting left)
     */
    readonly shift: number;
    /**
     * The number of pixels to horizontally offset the rendering of this glyph without affecting the shift position (can be positive or negative)
     */
    readonly offset: number;
    /**
     * An array of integers containing kerning information in pairs (or groups of 2). The first integer in a pair is the Unicode value for a character, and the second integer is the amount to add to that character's shift value (can be positive or negative) if it is preceded by this glyph's character.
     */
    readonly kerning: unknown[];
  }
  interface FontEffectParams {
    /**
     * Adds or removes thickness from the font. Minimum: -32, Maximum: 32.
     */
    thickness: number;
    /**
     * The colour of the core part of the font (excluding any outlines, glows, etc.).
     */
    coreColour: number;
    /**
     * The alpha of the core part of the font.
     */
    coreAlpha: number;
    /**
     * Whether to enable or disable the Glow effect. Disabled by default.
     */
    glowEnable: boolean;
    /**
     * The colour of the glow.
     */
    glowColour: number;
    /**
     * The alpha of the glow.
     */
    glowAlpha: number;
    /**
     * Whether to enable or disable the Outline effect. Disabled by default.
     */
    outlineEnable: boolean;
    /**
     * The thickness of the outline from the edge of each glyph. Minimum: 0, Maximum: 64.
     */
    outlineDistance: number;
    /**
     * The colour of the outline.
     */
    outlineColour: number;
    /**
     * The alpha of the outline.
     */
    outlineAlpha: number;
    /**
     * Enable or disable the Drop Shadow effect. Disabled by default.
     */
    dropShadowEnable: boolean;
    /**
     * Softness or blur level of the shadow. Minimum: 0, Maximum: 64.
     */
    dropShadowSoftness: number;
    /**
     * How much the shadow is moved on the X axis, 0 is the same as the text. E.g. a value of 4 moves it right by 4 pixels.
     */
    dropShadowOffsetX: number;
    /**
     * How much the shadow is moved on the Y axis, 0 is the same as the text. E.g. a value of 4 moves it down by 4 pixels.
     */
    dropShadowOffsetY: number;
    /**
     * The colour of the shadow.
     */
    dropShadowColour: number;
    /**
     * The alpha of the shadow.
     */
    dropShadowAlpha: number;
  }
  interface Exception {
    /**
     * Short message for this exception.
     */
    message: string;
    /**
     * Long message for this exception.
     */
    longMessage: string;
    /**
     * Describes the script where this exception came from.
     */
    script: string;
    /**
     * The stack frame that the exception was generated from.
     */
    stacktrace: Array<string>;
  }
  interface AudioBus {
    /**
     * Whether to bypass all effects and gain scaling of the bus.
     */
    bypass: boolean;
    /**
     * The output gain of the bus.
     */
    gain: number;
    /**
     * The chain of audio effects on the bus.
     */
    effects: Array<Struct.AudioEffect>;
  }
  interface AudioEffect {
    /**
     * The response time to apply the effect.
     */
    attack: number;
    /**
     * Whether to bypass the effect.
     */
    bypass: boolean;
    /**
     * The cutoff frequency of the filter.
     */
    cutoff: number;
    /**
     * The amount of higher frequency damping.
     */
    damp: number;
    /**
     * A peak EQ filter.
     */
    readonly eq1: Struct.AudioEffect;
    /**
     * A peak EQ filter.
     */
    readonly eq2: Struct.AudioEffect;
    /**
     * A peak EQ filter.
     */
    readonly eq3: Struct.AudioEffect;
    /**
     * A peak EQ filter.
     */
    readonly eq4: Struct.AudioEffect;
    /**
     * The factor by which the signal is downsampled.
     */
    factor: number;
    /**
     * The proportion of the signal which is fed back into the delay line.
     */
    feedback: number;
    /**
     * The center frequency of the filter.
     */
    freq: number;
    /**
     * The gain applied to the input signal.
     */
    gain: number;
    /**
     * A low-pass filter.
     */
    readonly hicut: Struct.AudioEffect;
    /**
     * A high-shelf filter.
     */
    readonly hishelf: Struct.AudioEffect;
    /**
     * The input gain scalar.
     */
    ingain: number;
    /**
     * The propertion of the signal which is affected by the LFO.
     */
    intensity: number;
    /**
     * A high-pass filter.
     */
    readonly locut: Struct.AudioEffect;
    /**
     * A low-shelf filter.
     */
    readonly loshelf: Struct.AudioEffect;
    /**
     * The proportion of the affected signal to output.
     */
    mix: number;
    /**
     * The proportion of the LFO period that the LFOs should be desynced by.
     */
    offset: number;
    /**
     * The output gain scalar.
     */
    outgain: number;
    /**
     * The quality factor of the filter.
     */
    q: number;
    /**
     * The frequency of the modulating LFO.
     */
    rate: number;
    /**
     * The compression ratio.
     */
    ratio: number;
    /**
     * The response time to stop applying the effect.
     */
    release: number;
    /**
     * The bit depth at which the signal is resampled.
     */
    resolution: number;
    /**
     * The waveshape of the LFO.
     */
    shape: Enum.AudioLFOType;
    /**
     * The size of the space.
     */
    size: number;
    /**
     * The gain threshold over which the effect is applied.
     */
    threshold: number;
    /**
     * The duration of the delay.
     */
    time: number;
    /**
     * The type of the effect.
     */
    readonly type: Enum.AudioEffectType;
  }
  interface VertexFormatInfo {
    /**
     * The total size in bytes of a single vertex
     */
    readonly stride: number;
    /**
     * The number of elements (vertex attributes) in a single vertex
     */
    readonly num_elements: number;
    /**
     * An array of elements.
     */
    readonly elements: Array<Struct.VertexElementInfo>;
  }
  interface VertexElementInfo {
    /**
     * The usage of the vertex attribute
     */
    readonly usage: Constant.VertexUsage;
    /**
     * The type of the vertex attribute
     */
    readonly type: Constant.VertexType;
    /**
     * The size of the vertex attribute
     */
    readonly size: number;
    /**
     * The offset of the vertex attribute
     */
    readonly offset: number;
  }
  interface TileSetInfo {
    /**
     * The width of the whole tile set texture (in pixels).
     */
    readonly width: number;
    /**
     * The height of the whole tile set texture (in pixels).
     */
    readonly height: number;
    /**
     * The texture ID.
     */
    readonly texture: number;
    /**
     * The width of a single tile (in pixels).
     */
    readonly tile_width: number;
    /**
     * The height of a single tile (in pixels).
     */
    readonly tile_height: number;
    /**
     * The number of pixels horizontally on each side of each tile (making the space between two tiles 2 * tile_horizontal_separator).
     */
    readonly tile_horizontal_separator: number;
    /**
     * The number of pixels vertically on each side of each tile (making the space between two tiles 2 * tile_vertical_separator)
     */
    readonly tile_vertical_separator: number;
    /**
     * The number of columns on each row of the tile set.
     */
    readonly tile_columns: number;
    /**
     * The number of tiles.
     */
    readonly tile_count: number;
    /**
     * The number of frames of animation per animation.
     */
    readonly frame_count: number;
    /**
     * The number of milliseconds for frame animation.
     */
    readonly frame_length_ms: number;
    /**
     * A struct containing all the animation frames. Each tile number has a key in the struct, each entry is an array of the frames to use (each array should be frame_count long).
     */
    readonly frames: Record<string, unknown>;
  }
}

declare namespace Enum {
  enum AudioEffectType {
    /**
     * Distorts sound by reducing bandwidth.
     */
    Bitcrusher = 0,
    /**
     * A delay/echo effect.
     */
    Delay = 1,
    /**
     * A smoothed gain scalar effect.
     */
    Gain = 2,
    /**
     * A high-pass filter effect.
     */
    HPF2 = 3,
    /**
     * A low-pass filter effect.
     */
    LPF2 = 4,
    /**
     * A reverberation effect.
     */
    Reverb1 = 5,
    /**
     * A gain modulator effect.
     */
    Tremolo = 6,
    /**
     * A peak EQ filter effect.
     */
    PeakEQ = 7,
    /**
     * A high-shelf filter effect
     */
    HiShelf = 8,
    /**
     * A low-shelf filter effect.
     */
    LoShelf = 9,
    /**
     * A parametric EQ effect.
     */
    EQ = 10,
    /**
     * A dynamic range compressor effect.
     */
    Compressor = 11,
  }
  enum AudioLFOType {
    /**
     * An inverted sawtooth waveshape.
     */
    InvSawtooth = 0,
    /**
     * A sawtooth waveshape.
     */
    Sawtooth = 1,
    /**
     * A sine waveshape.
     */
    Sine = 2,
    /**
     * A square waveshape.
     */
    Square = 3,
    /**
     * A triangle waveshape.
     */
    Triangle = 4,
  }
  enum flexpanel_unit {
    /**
     * Number of pixels.
     */
    point = 1,
    /**
     * A Percentage value.
     */
    percent = 2,
    /**
     * auto
     */
    auto = 3,
  }
  enum flexpanel_position_type {
    /**
     * Static position type
     */
    static = 0,
    /**
     * Relative position type
     */
    relative = 1,
    /**
     * Absolute position type
     */
    absolute = 2,
  }
  enum flexpanel_justify {
    /**
     * flex_start
     */
    start = 0,
    /**
     * center
     */
    center = 1,
    /**
     * flex_end
     */
    flex_end = 2,
    /**
     * space_between
     */
    space_between = 3,
    /**
     * space_around
     */
    space_around = 4,
    /**
     * space_evenly
     */
    space_evenly = 5,
  }
  enum flexpanel_direction {
    /**
     * Inherit layout direction from parent
     */
    inherit = 0,
    /**
     * Layout calculated from left to right
     */
    LTR = 1,
    /**
     * Layout calculated from right to left
     */
    RTL = 2,
  }
  enum flexpanel_gutter {
    /**
     * gapColumn
     */
    column = 0,
    /**
     * gapRow
     */
    row = 1,
    /**
     * gap
     */
    all_gutters = 2,
  }
  enum flexpanel_display {
    /**
     * Normal display
     */
    flex = 0,
    /**
     * No display
     */
    none = 1,
  }
  enum flexpanel_flex_direction {
    /**
     * Vertical layout
     */
    column = 0,
    /**
     * Reverse vertical layout
     */
    column_reverse = 1,
    /**
     * Horizontal layout
     */
    row = 2,
    /**
     * Reverse horizontal layout
     */
    row_reverse = 3,
  }
  enum flexpanel_align {
    /**
     * Auto align
     */
    auto = 0,
    /**
     * flex_start
     */
    flex_start = 1,
    /**
     * center
     */
    center = 2,
    /**
     * flex_end
     */
    flex_end = 3,
    /**
     * stretch
     */
    stretch = 4,
    /**
     * baseline
     */
    baseline = 5,
    /**
     * space_between
     */
    space_between = 6,
    /**
     * space_around
     */
    space_around = 7,
    /**
     * space_evenly
     */
    space_evenly = 8,
  }
  enum flexpanel_wrap {
    /**
     * Disable wrapping
     */
    no_wrap = 0,
    /**
     * Enable wrapping
     */
    wrap = 1,
    /**
     * Enable reverse wrapping
     */
    reverse = 2,
  }
  enum flexpanel_edge {
    /**
     * the left edge
     */
    left = 0,
    /**
     * the top edge
     */
    top = 1,
    /**
     * The right edge
     */
    right = 2,
    /**
     * The bottom edge
     */
    bottom = 3,
    /**
     * Start of the node
     */
    start = 4,
    /**
     * End of the node
     */
    _end = 5,
    /**
     * Horizontal edges
     */
    horizontal = 6,
    /**
     * Vertical edges
     */
    vertical = 7,
    /**
     * All edges
     */
    all_edges = 8,
  }
  enum colspace {
    /**
     * Room Space
     */
    room = 0,
    /**
     * View space UI Layers
     */
    ui_view = 1,
    /**
     * Display space UI Layers
     */
    ui_display = 2,
    /**
     * All collision spaces
     */
    colspace_all = 3,
  }
}

interface GMObject {
  alarm: Array<number>;
  depth: number;
  direction: number;
  friction: number;
  gravity: number;
  gravity_direction: number;
  hspeed: number;
  layer: Id.Layer;
  readonly on_ui_layer: boolean;
  persistent: boolean;
  solid: boolean;
  speed: number;
  vspeed: number;
  xprevious: number;
  xstart: number;
  yprevious: number;
  ystart: number;
  readonly object_index: Asset.GMObject;
  readonly event_number: Constant.EventNumber;
  readonly event_object: Asset.GMObject;
  readonly event_type: Constant.EventType;
  path_endaction: Constant.PathAction;
  path_orientation: number;
  path_position: number;
  path_positionprevious: number;
  path_scale: number;
  path_speed: number;
  in_sequence: boolean;
  readonly sequence_instance: Struct.SequenceInstance;
  drawn_by_sequence: boolean;
  readonly bbox_bottom: number;
  readonly bbox_left: number;
  readonly bbox_right: number;
  readonly bbox_top: number;
  readonly collision_space: Enum.colspace;
  image_alpha: number;
  image_angle: number;
  image_blend: Constant.Color;
  image_index: number;
  readonly image_number: number;
  image_speed: number;
  image_xscale: number;
  image_yscale: number;
  mask_index: Asset.GMSprite;
  readonly sprite_height: number;
  sprite_index: Asset.GMSprite | -1;
  readonly sprite_width: number;
  readonly sprite_xoffset: number;
  readonly sprite_yoffset: number;
  timeline_index: Asset.GMTimeline;
  timeline_loop: boolean;
  timeline_position: number;
  timeline_running: boolean;
  timeline_speed: number;
  phy_active: boolean;
  phy_angular_damping: number;
  phy_angular_velocity: number;
  phy_bullet: boolean;
  readonly phy_collision_points: number;
  readonly phy_collision_x: Array<number>;
  readonly phy_collision_y: Array<number>;
  readonly phy_col_normal_x: number;
  readonly phy_col_normal_y: number;
  readonly phy_com_x: number;
  readonly phy_com_y: number;
  readonly phy_dynamic: boolean;
  phy_fixed_rotation: boolean;
  readonly phy_inertia: number;
  readonly phy_kinematic: boolean;
  phy_linear_damping: number;
  phy_linear_velocity_x: number;
  phy_linear_velocity_y: number;
  readonly phy_mass: number;
  phy_position_x: number;
  readonly phy_position_xprevious: number;
  phy_position_y: number;
  readonly phy_position_yprevious: number;
  phy_rotation: number;
  readonly phy_sleeping: boolean;
  readonly phy_speed: number;
  phy_speed_x: number;
  phy_speed_y: number;
  readonly in_collision_tree: boolean;
  readonly player_id: number;
  readonly player_local: boolean;
  readonly player_avatar_url: string;
  readonly player_avatar_sprite: Asset.GMSprite;
  readonly player_type: string;
  readonly player_user_id: string;
  onCreate(): void;
  onDestroy(): void;
  onCleanUp(): void;
  onOutsideRoom(): void;
  onIntersectBoundary(): void;
  onGameStart(): void;
  onGameEnd(): void;
  onRoomStart(): void;
  onRoomEnd(): void;
  onBeginStep(): void;
  onStep(): void;
  onEndStep(): void;
  onPreDraw(): void;
  onDrawBegin(): void;
  onDraw(): void;
  onDrawEnd(): void;
  onPostDraw(): void;
  onDrawGuiBegin(): void;
  onDrawGui(): void;
  onDrawGuiEnd(): void;
  onDrawResize(): void;
  onAnimationEnd(): void;
  onAnimationUpdate(): void;
  onAnimationEvent(): void;
  onEndOfPath(): void;
  onCloseButton(): void;
  onMouseLeft(): void;
  onMouseRight(): void;
  onMouseMiddle(): void;
  onMouseNone(): void;
  onMouseLeftPressed(): void;
  onMouseRightPressed(): void;
  onMouseMiddlePressed(): void;
  onMouseLeftReleased(): void;
  onMouseRightReleased(): void;
  onMouseMiddleReleased(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onMouseWheelUp(): void;
  onMouseWheelDown(): void;
  onGlobalLeft(): void;
  onGlobalRight(): void;
  onGlobalMiddle(): void;
  onGlobalLeftPressed(): void;
  onGlobalRightPressed(): void;
  onGlobalMiddlePressed(): void;
  onGlobalLeftReleased(): void;
  onGlobalRightReleased(): void;
  onGlobalMiddleReleased(): void;
  onAsyncImageLoaded(): void;
  onAsyncHttp(): void;
  onAsyncSystem(): void;
  onAsyncSocial(): void;
  onAsyncSaveLoad(): void;
  onAsyncSteam(): void;
  onAsyncDialog(): void;
  onAsyncNetworking(): void;
  onAsyncSoundLoaded(): void;
  onAsyncIAP(): void;
  onAsyncCloud(): void;
  onAsyncPushNotification(): void;
  onAsyncAudioRecording(): void;
  onAsyncAudioPlayback(): void;
  onAsyncAudioPlaybackEnded(): void;
  onBroadcastMessage(): void;
  onRollbackStart(): void;
  onRollbackEvent(): void;
  onWallpaperConfig(): void;
  onWallpaperSubscriptionData(): void;
  onGestureTap(): void;
  onGlobalGestureTap(): void;
  onGestureDoubleTap(): void;
  onGlobalGestureDoubleTap(): void;
  onGestureDragStart(): void;
  onGlobalGestureDragStart(): void;
  onGestureDragging(): void;
  onGlobalGestureDragging(): void;
  onGestureDragEnd(): void;
  onGlobalGestureDragEnd(): void;
  onGestureFlick(): void;
  onGlobalGestureFlick(): void;
  onGesturePinchStart(): void;
  onGlobalGesturePinchStart(): void;
  onGesturePinchIn(): void;
  onGlobalGesturePinchIn(): void;
  onGesturePinchOut(): void;
  onGlobalGesturePinchOut(): void;
  onGesturePinchEnd(): void;
  onGlobalGesturePinchEnd(): void;
  onGestureRotateStart(): void;
  onGlobalGestureRotateStart(): void;
  onGestureRotating(): void;
  onGlobalGestureRotating(): void;
  onGestureRotateEnd(): void;
  onGlobalGestureRotateEnd(): void;
  onAlarm_0(): void;
  onAlarm_1(): void;
  onAlarm_2(): void;
  onAlarm_3(): void;
  onAlarm_4(): void;
  onAlarm_5(): void;
  onAlarm_6(): void;
  onAlarm_7(): void;
  onAlarm_8(): void;
  onAlarm_9(): void;
  onAlarm_10(): void;
  onAlarm_11(): void;
  onUserEvent_0(): void;
  onUserEvent_1(): void;
  onUserEvent_2(): void;
  onUserEvent_3(): void;
  onUserEvent_4(): void;
  onUserEvent_5(): void;
  onUserEvent_6(): void;
  onUserEvent_7(): void;
  onUserEvent_8(): void;
  onUserEvent_9(): void;
  onUserEvent_10(): void;
  onUserEvent_11(): void;
  onUserEvent_12(): void;
  onUserEvent_13(): void;
  onUserEvent_14(): void;
  onUserEvent_15(): void;
  onOutsideView_0(): void;
  onOutsideView_1(): void;
  onOutsideView_2(): void;
  onOutsideView_3(): void;
  onOutsideView_4(): void;
  onOutsideView_5(): void;
  onOutsideView_6(): void;
  onOutsideView_7(): void;
  onIntersectViewBoundary_0(): void;
  onIntersectViewBoundary_1(): void;
  onIntersectViewBoundary_2(): void;
  onIntersectViewBoundary_3(): void;
  onIntersectViewBoundary_4(): void;
  onIntersectViewBoundary_5(): void;
  onIntersectViewBoundary_6(): void;
  onIntersectViewBoundary_7(): void;
}


declare const $$implicit_argument$$: undefined;
/**
 * The given name refers to an object.
 */
declare const asset_object: Constant.AssetType;
/**
 * The given name refers to a sprite.
 */
declare const asset_sprite: Constant.AssetType;
/**
 * The given name refers to a sound.
 */
declare const asset_sound: Constant.AssetType;
/**
 * The given name refers to a room.
 */
declare const asset_room: Constant.AssetType;
/**
 * The given name refers to a tile set.
 */
declare const asset_tiles: Constant.AssetType;
/**
 * The given name refers to a path.
 */
declare const asset_path: Constant.AssetType;
/**
 * The given name refers to a script.
 */
declare const asset_script: Constant.AssetType;
/**
 * The given name refers to a font.
 */
declare const asset_font: Constant.AssetType;
/**
 * The given name refers to a time line.
 */
declare const asset_timeline: Constant.AssetType;
/**
 * The given name refers to a shader.
 */
declare const asset_shader: Constant.AssetType;
/**
 * The given name refers to an Animation Curve.
 */
declare const asset_animationcurve: Constant.AssetType;
/**
 * The given name refers to a Particle System.
 */
declare const asset_particlesystem: Constant.AssetType;
/**
 * The given name refers to a Sequence.
 */
declare const asset_sequence: Constant.AssetType;
/**
 * The given name refers to an asset that either does not exist, or is not one of the above listed.
 */
declare const asset_unknown: Constant.AssetType;
/**
 * Unknown layer type.
 */
declare const layer_type_unknown: Constant.LayerType;
/**
 * A layer of room type.
 */
declare const layer_type_room: Constant.LayerType;
/**
 * A ui layer using viewports space.
 */
declare const layer_type_ui_viewports: Constant.LayerType;
/**
 * A ui layer using display space.
 */
declare const layer_type_ui_display: Constant.LayerType;
/**
 * gain = (listener_distance / reference_distance) ^ (-falloff_factor)
 */
declare const audio_falloff_exponent_distance: Constant.AudioFalloff;
/**
 * distance = clamp(listener_distance, reference_distance, maximum_distance) gain = (distance / reference_distance) ^ (-falloff_factor)
 */
declare const audio_falloff_exponent_distance_clamped: Constant.AudioFalloff;
/**
 * distance = clamp(listener_distance, reference_distance, maximum_distance) gain = ((distance / reference_distance) ^ (-falloff_factor)) * (((maximum_distance - distance) / (maximum_distance - reference_distance)) ^ (distance / maximum_distance))
 */
declare const audio_falloff_exponent_distance_scaled: Constant.AudioFalloff;
/**
 * gain = reference_distance / (reference_distance + falloff_factor * (listener_distance - reference_distance))
 */
declare const audio_falloff_inverse_distance: Constant.AudioFalloff;
/**
 * distance = clamp(listener_distance, reference_distance, maximum_distance) gain = reference_distance / (reference_distance + falloff_factor * (distance - reference_distance))
 */
declare const audio_falloff_inverse_distance_clamped: Constant.AudioFalloff;
/**
 * distance = clamp(listener_distance, reference_distance, maximum_distance) gain = (reference_distance / (reference_distance + falloff_factor * (distance - reference_distance))) * (((maximum_distance - distance) / (maximum_distance - reference_distance)) ^ (distance / maximum_distance))
 */
declare const audio_falloff_inverse_distance_scaled: Constant.AudioFalloff;
/**
 * distance = min(distance, maximum_distance) gain = (1 - falloff_factor * (distance - reference_distance) / (maximum_distance - reference_distance))
 */
declare const audio_falloff_linear_distance: Constant.AudioFalloff;
/**
 * distance = clamp(listener_distance, reference_distance, maximum_distance) gain = (1 - falloff_factor * (distance - reference_distance) / (maximum_distance - reference_distance))
 */
declare const audio_falloff_linear_distance_clamped: Constant.AudioFalloff;
/**
 * gain = 1
 */
declare const audio_falloff_none: Constant.AudioFalloff;
/**
 * Mono (single channel) audio.
 */
declare const audio_mono: Constant.AudioChannelType;
/**
 * Stereo (dual channel) audio.
 */
declare const audio_stereo: Constant.AudioChannelType;
/**
 * 3D (5.1) audio.
 */
declare const audio_3d: Constant.AudioChannelType;
/**
 * Create event
 */
declare const ev_create: Constant.EventType;
/**
 * Destroy event
 */
declare const ev_destroy: Constant.EventType;
/**
 * Clean Up Event
 */
declare const ev_cleanup: Constant.EventType;
/**
 * Step event
 */
declare const ev_step: Constant.EventType;
/**
 * Step
 */
declare const ev_step_normal: Constant.EventNumber;
/**
 * Begin Step
 */
declare const ev_step_begin: Constant.EventNumber;
/**
 * End Step
 */
declare const ev_step_end: Constant.EventNumber;
/**
 * Alarm event
 */
declare const ev_alarm: Constant.EventType;
/**
 * Keyboard/Keyboard Pressed/Keyboard Released
 */
declare const ev_keyboard: Constant.EventType;
/**
 * Mouse event
 */
declare const ev_mouse: Constant.EventType;
/**
 * Left button held down on object
 */
declare const ev_left_button: Constant.EventNumber;
/**
 * Right button held down on object
 */
declare const ev_right_button: Constant.EventNumber;
/**
 * Middle button (or clickable wheel) held down on object
 */
declare const ev_middle_button: Constant.EventNumber;
/**
 * No buttons held down
 */
declare const ev_no_button: Constant.EventNumber;
/**
 * Left button just pressed on object
 */
declare const ev_left_press: Constant.EventNumber;
/**
 * Right button just pressed on object
 */
declare const ev_right_press: Constant.EventNumber;
/**
 * Middle button (or clickable wheel) just pressed on object
 */
declare const ev_middle_press: Constant.EventNumber;
/**
 * Left button just released on object
 */
declare const ev_left_release: Constant.EventNumber;
/**
 * Right button just released on object
 */
declare const ev_right_release: Constant.EventNumber;
/**
 * Middle button just released on object
 */
declare const ev_middle_release: Constant.EventNumber;
/**
 * Mouse just entered object's bounding box
 */
declare const ev_mouse_enter: Constant.EventNumber;
/**
 * Mouse just left object's bounding box
 */
declare const ev_mouse_leave: Constant.EventNumber;
/**
 * Mouse wheel scrolled upwards
 */
declare const ev_mouse_wheel_up: Constant.EventNumber;
/**
 * Mouse wheel scrolled downwards
 */
declare const ev_mouse_wheel_down: Constant.EventNumber;
/**
 * Left button held down anywhere
 */
declare const ev_global_left_button: Constant.EventNumber;
/**
 * Right button held down anywhere
 */
declare const ev_global_right_button: Constant.EventNumber;
/**
 * Middle button (or clickable wheel) held down anywhere
 */
declare const ev_global_middle_button: Constant.EventNumber;
/**
 * Left button just pressed anywhere
 */
declare const ev_global_left_press: Constant.EventNumber;
/**
 * Right button just pressed anywhere
 */
declare const ev_global_right_press: Constant.EventNumber;
/**
 * Middle button (or clickable wheel) just pressed anywhere
 */
declare const ev_global_middle_press: Constant.EventNumber;
/**
 * Left button just released anywhere
 */
declare const ev_global_left_release: Constant.EventNumber;
/**
 * Right button just released anywhere
 */
declare const ev_global_right_release: Constant.EventNumber;
/**
 * Middle button just released anywhere
 */
declare const ev_global_middle_release: Constant.EventNumber;
/**
 * A gesture event (Tap, Drag, Flick, Pinch or Rotate)
 */
declare const ev_gesture: Constant.EventType;
/**
 * A single click/touch and release has been detected for an instance
 */
declare const ev_gesture_tap: Constant.EventNumber;
/**
 * Two quick touches/clicks and releases have been detected for an instance
 */
declare const ev_gesture_double_tap: Constant.EventNumber;
/**
 * The beginning of a drag gesture has been detected for an instance
 */
declare const ev_gesture_drag_start: Constant.EventNumber;
/**
 * A touch/click has been held and moved for an instance
 */
declare const ev_gesture_dragging: Constant.EventNumber;
/**
 * The release of the touch/click from a drag has been detected for an instance
 */
declare const ev_gesture_drag_end: Constant.EventNumber;
/**
 * The release of a touch/click from a drag had enough movement for a flick event to be detected for the instance
 */
declare const ev_gesture_flick: Constant.EventNumber;
/**
 * Two touches and a straight movement have been detected for an instance
 */
declare const ev_gesture_pinch_start: Constant.EventNumber;
/**
 * The movement between two touches for an instance has been detected as inwards
 */
declare const ev_gesture_pinch_in: Constant.EventNumber;
/**
 * The movement between two touches for an instance has been detected as outwards
 */
declare const ev_gesture_pinch_out: Constant.EventNumber;
/**
 * The release of one (or both) touches for a pinch has been detected for an instance
 */
declare const ev_gesture_pinch_end: Constant.EventNumber;
/**
 * The movement between two touches for an instance has been detected as a rotation
 */
declare const ev_gesture_rotate_start: Constant.EventNumber;
/**
 * The movement between two touches for an instance has been detected as rotating
 */
declare const ev_gesture_rotating: Constant.EventNumber;
/**
 * The release of one (or both) touches for a rotation has been detected for an instance
 */
declare const ev_gesture_rotate_end: Constant.EventNumber;
/**
 * A single click/touch and release has been detected anywhere in the room
 */
declare const ev_global_gesture_tap: Constant.EventNumber;
/**
 * Two quick touches/clicks and releases have been detected anywhere in the room
 */
declare const ev_global_gesture_double_tap: Constant.EventNumber;
/**
 * The beginning of a drag gesture has been detected anywhere in the room
 */
declare const ev_global_gesture_drag_start: Constant.EventNumber;
/**
 * A touch/click has been held and moved anywhere in the room
 */
declare const ev_global_gesture_dragging: Constant.EventNumber;
/**
 * The release of the touch/click from a drag has been detected anywhere in the room
 */
declare const ev_global_gesture_drag_end: Constant.EventNumber;
/**
 * The release of a touch/click from a drag had enough movement for a flick event to be detected anywhere in the room
 */
declare const ev_global_gesture_flick: Constant.EventNumber;
/**
 * Two touches and a straight movement have been detected anywhere in the room
 */
declare const ev_global_gesture_pinch_start: Constant.EventNumber;
/**
 * The movement between two touches anywhere in the room has been detected as inwards
 */
declare const ev_global_gesture_pinch_in: Constant.EventNumber;
/**
 * The movement between two touches anywhere in the room has been detected as outwards
 */
declare const ev_global_gesture_pinch_out: Constant.EventNumber;
/**
 * The release of one (or both) touches for a pinch has been detected anywhere in the room
 */
declare const ev_global_gesture_pinch_end: Constant.EventNumber;
/**
 * The movement between two touches anywhere in the room has been detected as a rotation
 */
declare const ev_global_gesture_rotate_start: Constant.EventNumber;
/**
 * The movement between two touches anywhere in the room has been detected as rotating
 */
declare const ev_global_gesture_rotating: Constant.EventNumber;
/**
 * The release of one (or both) touches for a rotation has been detected anywhere in the room
 */
declare const ev_global_gesture_rotate_end: Constant.EventNumber;
/**
 * Collision with an object
 */
declare const ev_collision: Constant.EventType;
/**
 * One of the actions listed under "Other"
 */
declare const ev_other: Constant.EventType;
/**
 * Whether the instance is outside of the room
 */
declare const ev_outside: Constant.EventNumber;
/**
 * Whether the instance is intersecting the boundary
 */
declare const ev_boundary: Constant.EventNumber;
/**
 * Whether the instance is outside the given view (0 to 7)
 */
declare const ev_outside_view0: Constant.EventNumber;
/**
 * Whether the instance is interesecting with the boundary of the given view (0 to 7)
 */
declare const ev_boundary_view0: Constant.EventNumber;
/**
 * Only triggered at the start of the game
 */
declare const ev_game_start: Constant.EventNumber;
/**
 * Only triggered at the end of the game
 */
declare const ev_game_end: Constant.EventNumber;
/**
 * Only triggered at the start of a room
 */
declare const ev_room_start: Constant.EventNumber;
/**
 * Only triggered at the end of a room
 */
declare const ev_room_end: Constant.EventNumber;
/**
 * If the object's sprite has reached the end of its animation
 */
declare const ev_animation_end: Constant.EventNumber;
/**
 * Animation event that runs every step for objects that use skeletal animations
 */
declare const ev_animation_update: Constant.EventNumber;
/**
 * Animation event that runs for skeletal animations as assigned in the skeletal animation tool
 */
declare const ev_animation_event: Constant.EventNumber;
/**
 * If the object has reached the end of the path it is following
 */
declare const ev_end_of_path: Constant.EventNumber;
/**
 * One of the 16 available user events.
 */
declare const ev_user0: Constant.EventNumber;
/**
 * Broadcast Message event used for sprites and sequences
 */
declare const ev_broadcast_message: Constant.EventNumber;
/**
 * Draw event. NOTE: This event cannot be forced outside of a draw event and the constants and the constants are only for identifying the event when performed in these cases.
 */
declare const ev_draw: Constant.EventType;
/**
 * The draw begin event.
 */
declare const ev_draw_begin: Constant.EventNumber;
/**
 * The draw end event.
 */
declare const ev_draw_end: Constant.EventNumber;
/**
 * The pre draw event.
 */
declare const ev_draw_pre: Constant.EventNumber;
/**
 * The normal draw event.
 */
declare const ev_draw_normal: Constant.EventNumber;
/**
 * The post draw event.
 */
declare const ev_draw_post: Constant.EventNumber;
/**
 * The draw gui event.
 */
declare const ev_gui: Constant.EventNumber;
/**
 * The draw gui begin event.
 */
declare const ev_gui_begin: Constant.EventNumber;
/**
 * The draw gui end event.
 */
declare const ev_gui_end: Constant.EventNumber;
/**
 * Image Loaded event
 */
declare const ev_async_web_image_load: Constant.AsyncEventType;
/**
 * In-App Purchase event
 */
declare const ev_async_web_iap: Constant.AsyncEventType;
/**
 * Cloud event
 */
declare const ev_async_web_cloud: Constant.AsyncEventType;
/**
 * Networking event
 */
declare const ev_async_web_networking: Constant.AsyncEventType;
/**
 * Steam event
 */
declare const ev_async_web_steam: Constant.AsyncEventType;
/**
 * Social event
 */
declare const ev_async_social: Constant.AsyncEventType;
/**
 * Push Notification event
 */
declare const ev_async_push_notification: Constant.AsyncEventType;
/**
 * Save/Load Event
 */
declare const ev_async_save_load: Constant.AsyncEventType;
/**
 * Audio Recording event
 */
declare const ev_async_audio_recording: Constant.AsyncEventType;
/**
 * Audio Playback event
 */
declare const ev_async_audio_playback: Constant.AsyncEventType;
/**
 * Audio Playback Ended event
 */
declare const ev_async_audio_playback_ended: Constant.AsyncEventType;
/**
 * System event
 */
declare const ev_async_system_event: Constant.AsyncEventType;
/**
 * Dialog event
 */
declare const ev_async_dialog: Constant.AsyncEventType;
/**
 * Web event
 */
declare const ev_async_web: Constant.AsyncEventType;
/**
 * End the path
 */
declare const path_action_stop: Constant.PathAction;
/**
 * Continue the path from the start, jumping to the start position again if the path is not closed
 */
declare const path_action_restart: Constant.PathAction;
/**
 * Continue from the current position
 */
declare const path_action_continue: Constant.PathAction;
/**
 * Go backwards along the path again (achieved by reversing the path movement speed)
 */
declare const path_action_reverse: Constant.PathAction;
/**
 * The element is a background.
 */
declare const layerelementtype_background: Constant.LayerElementType;
/**
 * The element is an instance.
 */
declare const layerelementtype_instance: Constant.LayerElementType;
/**
 * The element is a sprite asset.
 */
declare const layerelementtype_sprite: Constant.LayerElementType;
/**
 * The element is a tilemap.
 */
declare const layerelementtype_tilemap: Constant.LayerElementType;
/**
 * The element is a particle system.
 */
declare const layerelementtype_particlesystem: Constant.LayerElementType;
/**
 * The element is a legacy background tile (this is only valid for projects that have been imported from previous versions of GameMaker).
 */
declare const layerelementtype_tile: Constant.LayerElementType;
/**
 * The element is a sequence asset.
 */
declare const layerelementtype_sequence: Constant.LayerElementType;
/**
 * The element is a text element.
 */
declare const layerelementtype_text: Constant.LayerElementType;
/**
 * Used to set/get the rotate bit of a tile data blob.
 */
declare const tile_rotate: Constant.TileMask;
/**
 * Used to set/get the mirror bit of a tile data blob.
 */
declare const tile_mirror: Constant.TileMask;
/**
 * Used to set/get the flip bit of a tile data blob.
 */
declare const tile_flip: Constant.TileMask;
/**
 * A special constant that is for "and"-ing with the tile data blob to extract the tile index.
 */
declare const tile_index_mask: Constant.TileMask;
/**
 * Indicates that text should be aligned to the left of the frame.
 */
declare const textalign_left: Constant.TextAlign;
/**
 * Indicates that text should be aligned to the right of the frame.
 */
declare const textalign_right: Constant.TextAlign;
/**
 * Indicates that text should be centred horizontally within the frame.
 */
declare const textalign_center: Constant.TextAlign;
/**
 * Indicates that text should be justified within the frame.
 */
declare const textalign_justify: Constant.TextAlign;
/**
 * Indicates that text should be aligned to the top of the frame.
 */
declare const textalign_top: Constant.TextAlign;
/**
 * Indicates that text should be aligned to the bottom of the frame.
 */
declare const textalign_bottom: Constant.TextAlign;
/**
 * Indicates that text should be centered vertically within the frame.
 */
declare const textalign_middle: Constant.TextAlign;
/**
 * Default text wrapping mode.
 */
declare const textwrap_default: Constant.TextWrap;
/**
 * Text wrapping split words to the next line when too long to fit the frame width
 */
declare const textwrap_splitwords: Constant.TextWrap;
/**
 * Top left of the text frame
 */
declare const origin_topleft: Constant.TextOrigin;
/**
 * Top centre of the text frame
 */
declare const origin_topcentre: Constant.TextOrigin;
/**
 * Top right of the text frame
 */
declare const origin_topright: Constant.TextOrigin;
/**
 * Middle left of the text frame
 */
declare const origin_middleleft: Constant.TextOrigin;
/**
 * Middle centre of the text frame
 */
declare const origin_middlecentre: Constant.TextOrigin;
/**
 * Middle right of the text frame
 */
declare const origin_middleright: Constant.TextOrigin;
/**
 * Bottom left of the text frame
 */
declare const origin_bottomleft: Constant.TextOrigin;
/**
 * Bottom centre of the text frame
 */
declare const origin_bottomcentre: Constant.TextOrigin;
/**
 * Bottom right of the text frame
 */
declare const origin_bottomright: Constant.TextOrigin;
/**
 * This is a graphics (sprite) asset track.
 */
declare const seqtracktype_graphic: Constant.SequenceTrackType;
/**
 * This is an audio asset track.
 */
declare const seqtracktype_audio: Constant.SequenceTrackType;
/**
 * This is an audio effect parameter track.
 */
declare const seqtracktype_audioeffect: Constant.SequenceTrackType;
/**
 * This is an instance asset track.
 */
declare const seqtracktype_instance: Constant.SequenceTrackType;
/**
 * This is a sequence asset track.
 */
declare const seqtracktype_sequence: Constant.SequenceTrackType;
/**
 * This is a clip mask group asset track.
 */
declare const seqtracktype_clipmask: Constant.SequenceTrackType;
/**
 * This is a clip mask sprite asset track used for generating the clip mask.
 */
declare const seqtracktype_clipmask_mask: Constant.SequenceTrackType;
/**
 * This is a clip mask sprite asset track that is being masked.
 */
declare const seqtracktype_clipmask_subject: Constant.SequenceTrackType;
/**
 * This is a group folder asset track.
 */
declare const seqtracktype_group: Constant.SequenceTrackType;
/**
 * This is a colour data parameter track.
 */
declare const seqtracktype_colour: Constant.SequenceTrackType;
/**
 * This is a real number value parameter track.
 */
declare const seqtracktype_real: Constant.SequenceTrackType;
/**
 * This is a broadcast message track.
 */
declare const seqtracktype_message: Constant.SequenceTrackType;
/**
 * This is an event/moment track.
 */
declare const seqtracktype_moment: Constant.SequenceTrackType;
/**
 * This is a text track.
 */
declare const seqtracktype_text: Constant.SequenceTrackType;
/**
 * This is a particle system asset track.
 */
declare const seqtracktype_particlesystem: Constant.SequenceTrackType;
/**
 * Not used currently.
 */
declare const seqtracktype_bool: Constant.SequenceTrackType;
/**
 * Not used currently.
 */
declare const seqtracktype_string: Constant.SequenceTrackType;
/**
 * Not used currently.
 */
declare const seqtracktype_spriteframes: Constant.SequenceTrackType;
/**
 * Not used currently.
 */
declare const seqtracktype_empty: Constant.SequenceTrackType;
/**
 * The sound will loop when played.
 */
declare const seqaudiokey_loop: Constant.SequenceAudioKey;
/**
 * The sound will only play once then stop.
 */
declare const seqaudiokey_oneshot: Constant.SequenceAudioKey;
/**
 * The text will be left-aligned.
 */
declare const seqtextkey_left: Constant.SequenceTextKey;
/**
 * The text will be center-aligned.
 */
declare const seqtextkey_center: Constant.SequenceTextKey;
/**
 * The text will be right-aligned.
 */
declare const seqtextkey_right: Constant.SequenceTextKey;
/**
 * The text will be justified.
 */
declare const seqtextkey_justify: Constant.SequenceTextKey;
/**
 * The text will be vertically aligned to the top of the frame.
 */
declare const seqtextkey_top: Constant.SequenceTextKey;
/**
 * The text will be vertically aligned to the middle of the frame.
 */
declare const seqtextkey_middle: Constant.SequenceTextKey;
/**
 * The text will be vertically aligned to the bottom of the frame.
 */
declare const seqtextkey_bottom: Constant.SequenceTextKey;
/**
 * The sequence will play frames in an incremental order from left to right
 */
declare const seqdir_right: Constant.SequenceDirection;
/**
 * The sequence will play frames in a decremental order from right to left
 */
declare const seqdir_left: Constant.SequenceDirection;
/**
 * The sequence will play once then stop when finished.
 */
declare const seqplay_oneshot: Constant.SequencePlay;
/**
 * The sequence will loop, with the playhead going back to the start when it reaches the end of the playback region.
 */
declare const seqplay_loop: Constant.SequencePlay;
/**
 * The sequence will loop, with the playhead reversing direction when it reaches the end of the playback region.
 */
declare const seqplay_pingpong: Constant.SequencePlay;
/**
 * Specifies that playbackSpeed should be interpreted as frames-per-second
 */
declare const spritespeed_framespersecond: Constant.SpriteSpeed;
/**
 * Specifies that playbackSpeed should be interpreted as frames-per-game-frame.
 */
declare const spritespeed_framespergameframe: Constant.SpriteSpeed;
/**
 * The left edge slice
 */
declare const nineslice_left: Constant.NineSlice;
/**
 * The top edge slice
 */
declare const nineslice_top: Constant.NineSlice;
/**
 * The right edge slice
 */
declare const nineslice_right: Constant.NineSlice;
/**
 * The bottom edge slice
 */
declare const nineslice_bottom: Constant.NineSlice;
/**
 * The centre slice
 */
declare const nineslice_centre: Constant.NineSlice;
/**
 * The slice will be stretched
 */
declare const nineslice_stretch: Constant.NineSlice;
/**
 * The slice will be repeated
 */
declare const nineslice_repeat: Constant.NineSlice;
/**
 * The slice will be repeated by mirroring
 */
declare const nineslice_mirror: Constant.NineSlice;
/**
 * The slice will not be stretched or repeated, resulting in a blank area after it
 */
declare const nineslice_blank: Constant.NineSlice;
/**
 * The slice will not appear at all
 */
declare const nineslice_hide: Constant.NineSlice;
/**
 * The texture group is unloaded
 */
declare const texturegroup_status_unloaded: Constant.NineSlice;
/**
 * The texture group is loading
 */
declare const texturegroup_status_loading: Constant.NineSlice;
/**
 * The texture group is loaded
 */
declare const texturegroup_status_loaded: Constant.NineSlice;
/**
 * The texture group is decompressed and ready to be used
 */
declare const texturegroup_status_fetched: Constant.NineSlice;
/**
 * 8 bit integer per channel (normalised) RGBA surface format
 */
declare const surface_rgba8unorm: Constant.SurfaceFormatType;
/**
 * 16 bit float single channel surface format
 */
declare const surface_r16float: Constant.SurfaceFormatType;
/**
 * 32 bit float single channel surface format
 */
declare const surface_r32float: Constant.SurfaceFormatType;
/**
 * 4 bit integer per channel (normalised) RGBA surface format
 */
declare const surface_rgba4unorm: Constant.SurfaceFormatType;
/**
 * 8 bit integer single channel (normalised) surface format
 */
declare const surface_r8unorm: Constant.SurfaceFormatType;
/**
 * 8 bit integer two channel (normalised) surface format
 */
declare const surface_rg8unorm: Constant.SurfaceFormatType;
/**
 * 16 bit float per channel RGBA surface format
 */
declare const surface_rgba16float: Constant.SurfaceFormatType;
/**
 * 32 bit float per channel RGBA surface format
 */
declare const surface_rgba32float: Constant.SurfaceFormatType;
/**
 * Automatic - The bounding box will be calculated automatically, based on the tolerance setting for the sprite
 */
declare const bboxmode_automatic: Constant.BBoxMode;
/**
 * Full Image - The bounding box will be set to use the full width and height of the sprite, regardless of the tolerance and "empty" pixels
 */
declare const bboxmode_fullimage: Constant.BBoxMode;
/**
 * Manual - The bounding box has been set manually to user-defined values (either in the sprite editor, or using the function sprite_set_bbox())
 */
declare const bboxmode_manual: Constant.BBoxMode;
/**
 * A rectangular (non-rotating) rectangle collision mask shape
 */
declare const bboxkind_rectangular: Constant.CollisionMask;
/**
 * An elliptical collision mask shape
 */
declare const bboxkind_ellipse: Constant.CollisionMask;
/**
 * A diamond collision mask shape
 */
declare const bboxkind_diamond: Constant.CollisionMask;
/**
 * A precise collision mask, where the mask will conform to the non-transparent pixels of the sprite, based on the tolerance value given
 */
declare const bboxkind_precise: Constant.CollisionMask;
/**
 * Collision mesh from Spine sprite
 */
declare const bboxkind_spine: Constant.CollisionMask;
/**
 * A buffer of fixed size.
 */
declare const buffer_fixed: Constant.BufferType;
/**
 * A buffer that will "grow" dynamically as data is added
 */
declare const buffer_grow: Constant.BufferType;
/**
 * A buffer where the data will "wrap". When the data being added reaches the limit of the buffer size, the overwrite will be placed back at the start of the buffer, and further writing will continue from that point.
 */
declare const buffer_wrap: Constant.BufferType;
/**
 * Special "stripped" buffer that is extremely fast to read/write to. Can only be used with buffer_u8 data types, and must be 1 byte aligned.
 */
declare const buffer_fast: Constant.BufferType;
/**
 * This type of buffer is to be used as a vertex buffer only.
 */
declare const buffer_vbuffer: Constant.BufferType;
/**
 * An unsigned, 8bit integer. This is a positive value from 0 to 255.
 */
declare const buffer_u8: Constant.BufferDataType;
/**
 * A signed, 8bit integer. This can be a positive or negative value from -128 to 127 (0 is classed as positive).
 */
declare const buffer_s8: Constant.BufferDataType;
/**
 * An unsigned, 16bit integer. This is a positive value from 0 - 65,535.
 */
declare const buffer_u16: Constant.BufferDataType;
/**
 * A signed, 16bit integer. This can be a positive or negative value from -32,768 to 32,767 (0 is classed as positive).
 */
declare const buffer_s16: Constant.BufferDataType;
/**
 * An unsigned, 32bit integer. This is a positive value from 0 to 4,294,967,295.
 */
declare const buffer_u32: Constant.BufferDataType;
/**
 * A signed, 32bit integer. This can be a positive or negative value from -2,147,483,648 to 2,147,483,647 (0 is classed as positive).
 */
declare const buffer_s32: Constant.BufferDataType;
/**
 * An unsigned 64bit integer.
 */
declare const buffer_u64: Constant.BufferDataType;
/**
 * A 16bit float. This can be a positive or negative value within the range of +/- 65504. (Not currently supported!)
 */
declare const buffer_f16: Constant.BufferDataType;
/**
 * A 32bit float. This can be a positive or negative value within the range of +/-16777216.
 */
declare const buffer_f32: Constant.BufferDataType;
/**
 * A 64bit float.
 */
declare const buffer_f64: Constant.BufferDataType;
/**
 * A boolean value. Can only be either 1 or 0 (true or false)
 */
declare const buffer_bool: Constant.BufferDataType;
/**
 * A string of any size.
 */
declare const buffer_string: Constant.BufferDataType;
/**
 * A string of any size, without the final null terminating character.
 */
declare const buffer_text: Constant.BufferDataType;
/**
 * The start of the buffer
 */
declare const buffer_seek_start: Constant.SeekOffset;
/**
 * A position relative to the current read/write position
 */
declare const buffer_seek_relative: Constant.SeekOffset;
/**
 * The end of the buffer
 */
declare const buffer_seek_end: Constant.SeekOffset;
/**
 * General buffer error.
 */
declare const buffer_error_general: Constant.BufferErrorType;
/**
 * Attempting to write to a buffer that doesn't have enough space for the size of the type being written.
 */
declare const buffer_error_out_of_space: Constant.BufferErrorType;
/**
 * Attempting to write an invalid type to a buffer.
 */
declare const buffer_error_invalid_type: Constant.BufferErrorType;
/**
 * The device is being held horizontally i.e.: The longest edge is from left to right, and the menu button is on the right.
 */
declare const display_landscape: number;
/**
 * As above, only now the menu button is on the left.
 */
declare const display_landscape_flipped: number;
/**
 * The device is being held vertically i.e.: The longest edge is from top to bottom, and the menu button is at the bottom.
 */
declare const display_portrait: number;
/**
 * As above, only now the menu button is at the top.
 */
declare const display_portrait_flipped: number;
/**
 * The sleep margin value is the main timing method
 */
declare const tm_sleep: Constant.TimingMethod;
/**
 * Vsync timing is the main timing method (default for all supported platforms)
 */
declare const tm_countvsyncs: Constant.TimingMethod;
/**
 * Ignore gamespeed and allow the system to control framerate
 */
declare const tm_systemtiming: Constant.TimingMethod;
/**
 * This is a windows-specific timing method which may improve consistency
 */
declare const tm_countvsyncs_winalt: Constant.TimingMethod;

declare const cr_none: Constant.Cursor;

declare const cr_default: Constant.Cursor;

declare const cr_arrow: Constant.Cursor;

declare const cr_cross: Constant.Cursor;

declare const cr_beam: Constant.Cursor;

declare const cr_size_nesw: Constant.Cursor;

declare const cr_size_ns: Constant.Cursor;

declare const cr_size_nwse: Constant.Cursor;

declare const cr_size_we: Constant.Cursor;

declare const cr_uparrow: Constant.Cursor;

declare const cr_hourglass: Constant.Cursor;

declare const cr_drag: Constant.Cursor;

declare const cr_appstart: Constant.Cursor;

declare const cr_handpoint: Constant.Cursor;

declare const cr_size_all: Constant.Cursor;
/**
 * A map data structure
 */
declare const ds_type_map: Constant.DsType;
/**
 * A list data structure
 */
declare const ds_type_list: Constant.DsType;
/**
 * A stack data structure
 */
declare const ds_type_stack: Constant.DsType;
/**
 * A grid data structure
 */
declare const ds_type_grid: Constant.DsType;
/**
 * A queue data structure
 */
declare const ds_type_queue: Constant.DsType;
/**
 * A priority data structure
 */
declare const ds_type_priority: Constant.DsType;
/**
 * #00ffff
 */
declare const c_aqua: Constant.Color;
/**
 * #000000
 */
declare const c_black: Constant.Color;
/**
 * #0000ff
 */
declare const c_blue: Constant.Color;
/**
 * #404040
 */
declare const c_dkgray: Constant.Color;
/**
 * #ff00ff
 */
declare const c_fuchsia: Constant.Color;
/**
 * #808080
 */
declare const c_gray: Constant.Color;
/**
 * #008000
 */
declare const c_green: Constant.Color;
/**
 * #00ff00
 */
declare const c_lime: Constant.Color;
/**
 * #c0c0c0
 */
declare const c_ltgray: Constant.Color;
/**
 * #800000
 */
declare const c_maroon: Constant.Color;
/**
 * #000080
 */
declare const c_navy: Constant.Color;
/**
 * #808000
 */
declare const c_olive: Constant.Color;
/**
 * #ffa040
 */
declare const c_orange: Constant.Color;
/**
 * #800080
 */
declare const c_purple: Constant.Color;
/**
 * #ff0000
 */
declare const c_red: Constant.Color;
/**
 * #c0c0c0
 */
declare const c_silver: Constant.Color;
/**
 * #008080
 */
declare const c_teal: Constant.Color;
/**
 * #ffffff
 */
declare const c_white: Constant.Color;
/**
 * #ffff00
 */
declare const c_yellow: Constant.Color;
/**
 * #404040
 */
declare const c_dkgrey: Constant.Color;
/**
 * #808080
 */
declare const c_grey: Constant.Color;
/**
 * #c0c0c0
 */
declare const c_ltgrey: Constant.Color;
/**
 * Normal blending (the default blend mode).
 */
declare const bm_normal: Constant.BlendMode;
/**
 * Additive blending. Luminosity values of light areas are added.
 */
declare const bm_add: Constant.BlendMode;
/**
 * Subtractive blending where the source colour is subtracted from the destination colour.
 */
declare const bm_subtract: Constant.BlendMode;
/**
 * Max blending. Similar to additive blending.
 */
declare const bm_max: Constant.BlendMode;
/**
 * Min blending (Takes the minimum value for each colour component).
 */
declare const bm_min: Constant.BlendMode;
/**
 * Subtractive blending where the destination colour is subtracted from the source colour.
 */
declare const bm_reverse_subtract: Constant.BlendMode;
/**
 * (0, 0, 0, 0)
 */
declare const bm_zero: Constant.BlendModeFactor;
/**
 * (1, 1, 1, 1)
 */
declare const bm_one: Constant.BlendModeFactor;
/**
 * (Rs, Gs, Bs, As)
 */
declare const bm_src_colour: Constant.BlendModeFactor;
/**
 * (Rs, Gs, Bs, As)
 */
declare const bm_src_color: Constant.BlendModeFactor;
/**
 * (1-Rs, 1-Gs, 1-Bs, 1-As)
 */
declare const bm_inv_src_colour: Constant.BlendModeFactor;
/**
 * (1-Rs, 1-Gs, 1-Bs, 1-As)
 */
declare const bm_inv_src_color: Constant.BlendModeFactor;
/**
 * (As, As, As, As)
 */
declare const bm_src_alpha: Constant.BlendModeFactor;
/**
 * (1-As, 1-As, 1-As, 1-As)
 */
declare const bm_inv_src_alpha: Constant.BlendModeFactor;
/**
 * (Ad, Ad, Ad, Ad)
 */
declare const bm_dest_alpha: Constant.BlendModeFactor;
/**
 * (1-Ad, 1-Ad, 1-Ad, 1-Ad)
 */
declare const bm_inv_dest_alpha: Constant.BlendModeFactor;
/**
 * (Rd, Gd, Bd, Ad)
 */
declare const bm_dest_colour: Constant.BlendModeFactor;
/**
 * (Rd, Gd, Bd, Ad)
 */
declare const bm_dest_color: Constant.BlendModeFactor;
/**
 * (1-Rd, 1-Gd, 1-Bd, 1-Ad)
 */
declare const bm_inv_dest_colour: Constant.BlendModeFactor;
/**
 * (1-Rd, 1-Gd, 1-Bd, 1-Ad)
 */
declare const bm_inv_dest_color: Constant.BlendModeFactor;
/**
 * (f, f, f, 1) where f = min(As, 1-Ad)
 */
declare const bm_src_alpha_sat: Constant.BlendModeFactor;
/**
 * Additive blending. Luminosity values of light areas are added.
 */
declare const bm_eq_add: Constant.BlendModeEquation;
/**
 * Subtractive blending where the source colour is subtracted from the destination colour.
 */
declare const bm_eq_subtract: Constant.BlendModeEquation;
/**
 * Max blending (Takes the maximum value for each colour component).
 */
declare const bm_eq_max: Constant.BlendModeEquation;
/**
 * Min blending (Takes the minimum value for each colour component).
 */
declare const bm_eq_min: Constant.BlendModeEquation;
/**
 * Subtractive blending where the destination colour is subtracted from the source colour.
 */
declare const bm_eq_reverse_subtract: Constant.BlendModeEquation;
/**
 * No culling will be done
 */
declare const cull_noculling: Constant.CullMode;
/**
 * All clockwise triangles will be culled
 */
declare const cull_clockwise: Constant.CullMode;
/**
 * All counter-clockwise triangles will be culled
 */
declare const cull_counterclockwise: Constant.CullMode;
/**
 * The light is a directional light
 */
declare const lighttype_dir: Constant.LightType;
/**
 * The light is a point light
 */
declare const lighttype_point: Constant.LightType;
/**
 * Mipmapping is disabled.
 */
declare const mip_off: number;
/**
 * Mipmapping for all textures is enabled.
 */
declare const mip_on: number;
/**
 * Mipmapping is enabled for textures that have it enabled in the Texture Group options (default).
 */
declare const mip_markedonly: number;
/**
 * This means that blending between mipmap levels is disabled, which can cause visible texture transitions, but gives the best performance.
 */
declare const tf_point: number;
/**
 * This means that blending between mipmap levels is enabled (this is also known as trilinear filtering), which smooths the texture transitions, but it will give a minor hit to performance.
 */
declare const tf_linear: number;
/**
 * This means that anisotropic filtering is enabled, which greatly improves texture transition quality and can reduce the blurring visible with other filtering modes, but it has the highest hit on performance.
 */
declare const tf_anisotropic: number;
/**
 * Random cloud particles of varying sizes
 */
declare const ef_cloud: Constant.EffectType;
/**
 * An effect that creates expanding ellipses
 */
declare const ef_ellipse: Constant.EffectType;
/**
 * An effect that creates expanding fading explosions
 */
declare const ef_explosion: Constant.EffectType;
/**
 * An effect that creates multiple small particles to generate a firework explosion
 */
declare const ef_firework: Constant.EffectType;
/**
 * An effect that generates a brilliant point that flares up and fades out
 */
declare const ef_flare: Constant.EffectType;
/**
 * An effect that generates rain particles coming down from the top of the screen
 */
declare const ef_rain: Constant.EffectType;
/**
 * An effect that generates expanding and fading circles
 */
declare const ef_ring: Constant.EffectType;
/**
 * An effect that generates little puffs of smoke
 */
declare const ef_smoke: Constant.EffectType;
/**
 * An effect that creates a smoke plume that rises up the screen
 */
declare const ef_smokeup: Constant.EffectType;
/**
 * An effect that generates multiple snow particles falling down the screen
 */
declare const ef_snow: Constant.EffectType;
/**
 * An effect that generates a small spark
 */
declare const ef_spark: Constant.EffectType;
/**
 * An effect that generates star particles
 */
declare const ef_star: Constant.EffectType;
/**
 * Emitter streams new particles each frame.
 */
declare const ps_mode_stream: Constant.ParticleEmitterMode;
/**
 * Emitter burst particles just once.
 */
declare const ps_mode_burst: Constant.ParticleEmitterMode;
/**
 * A rectangular shape that fills the given area.
 */
declare const ps_shape_rectangle: Constant.ParticleRegionShape;
/**
 * An ellipse, with the width and height defined by the area.
 */
declare const ps_shape_ellipse: Constant.ParticleRegionShape;
/**
 * A diamond shape with the points at half width and half height.
 */
declare const ps_shape_diamond: Constant.ParticleRegionShape;
/**
 * A single line, where the start point is the left and top and the end point is the right and bottom.
 */
declare const ps_shape_line: Constant.ParticleRegionShape;
/**
 * A Linear distribution where all particles have an equal chance of appearing anywhere in the area.
 */
declare const ps_distr_linear: Constant.ParticleDistribution;
/**
 * A gaussian distribution where more particles are generated in the center rather than the edges.
 */
declare const ps_distr_gaussian: Constant.ParticleDistribution;
/**
 * An inverse gaussian distribution where more particles are generated at the edges than center.
 */
declare const ps_distr_invgaussian: Constant.ParticleDistribution;
/**
 * A 1x1 pixel. (This is the default setting.)
 */
declare const pt_shape_pixel: Constant.ParticleShape;
/**
 * A filled circle.
 */
declare const pt_shape_disk: Constant.ParticleShape;
/**
 * A filled square.
 */
declare const pt_shape_square: Constant.ParticleShape;
/**
 * An 8px wide horizontal line.
 */
declare const pt_shape_line: Constant.ParticleShape;
/**
 * A five-point filled star.
 */
declare const pt_shape_star: Constant.ParticleShape;
/**
 * A 3px outlined circle.
 */
declare const pt_shape_circle: Constant.ParticleShape;
/**
 * A circle with an inward glow (looks like a bubble).
 */
declare const pt_shape_ring: Constant.ParticleShape;
/**
 * A circle with an outward glow, solid in the middle, glowing outwards.
 */
declare const pt_shape_sphere: Constant.ParticleShape;
/**
 * A harshly glowing point (looks like an actual star in the night).
 */
declare const pt_shape_flare: Constant.ParticleShape;
/**
 * A spark effect, like a star with multiple points fading out.
 */
declare const pt_shape_spark: Constant.ParticleShape;
/**
 * A squarish cloud of smoke. requires multiple colours to resemble an explosion.
 */
declare const pt_shape_explosion: Constant.ParticleShape;
/**
 * A thin cloud, requires up scaling and multiple particles to resemble a cloud.
 */
declare const pt_shape_cloud: Constant.ParticleShape;
/**
 * A smooth version of the explosion effect. Use multiple to create a smoke cloud.
 */
declare const pt_shape_smoke: Constant.ParticleShape;
/**
 * A generic snowflake shape.
 */
declare const pt_shape_snow: Constant.ParticleShape;
/**
 * A single floating point value
 */
declare const vertex_type_float1: Constant.VertexType;
/**
 * Two floating point values
 */
declare const vertex_type_float2: Constant.VertexType;
/**
 * Three floating point values
 */
declare const vertex_type_float3: Constant.VertexType;
/**
 * Four floating point values
 */
declare const vertex_type_float4: Constant.VertexType;
/**
 * Four component values (r, g, b, a)
 */
declare const vertex_type_colour: Constant.VertexType;
/**
 * Four component unsigned byte values (from 0 to 255)
 */
declare const vertex_type_ubyte4: Constant.VertexType;
/**
 * position values (x, y, z)
 */
declare const vertex_usage_position: Constant.VertexUsage;
/**
 * colour values (r, g, b, a)
 */
declare const vertex_usage_colour: Constant.VertexUsage;
/**
 * vertex normal values (nx, ny, nz)
 */
declare const vertex_usage_normal: Constant.VertexUsage;
/**
 * UV coordinates (u, v)
 * @deprecated
 */
declare const vertex_usage_textcoord: Constant.VertexUsage;
/**
 * the blendweight of the input matrix (for skeletal animation, for example)
 */
declare const vertex_usage_blendweight: Constant.VertexUsage;
/**
 * the indices of the matrices to use (for skeletal animation, for example)
 */
declare const vertex_usage_blendindices: Constant.VertexUsage;
/**
 * vertex depth buffer value
 */
declare const vertex_usage_depth: Constant.VertexUsage;
/**
 * tangent values
 */
declare const vertex_usage_tangent: Constant.VertexUsage;
/**
 * binormal values
 */
declare const vertex_usage_binormal: Constant.VertexUsage;
/**
 * fog values
 */
declare const vertex_usage_fog: Constant.VertexUsage;
/**
 * sampler index
 */
declare const vertex_usage_sample: Constant.VertexUsage;
/**
 * A point list - A point is drawn for every vertex.
 */
declare const pr_pointlist: Constant.PrimitiveType;
/**
 * A line list - A line is drawn between the first and the second vertex, between the third and fourth vertex, etc.
 */
declare const pr_linelist: Constant.PrimitiveType;
/**
 * A line strip - A line is drawn between the first and the second vertex, between the second and the third vertex, the third and the fourth vertex, etc.
 */
declare const pr_linestrip: Constant.PrimitiveType;
/**
 * A triangle list - A triangle is drawn for the first, second and third vertex, then for the fourth, fifth and sixth vertex, etc.
 */
declare const pr_trianglelist: Constant.PrimitiveType;
/**
 * A triangle strip - A triangle is drawn for the first, second and third vertex, then for the second, third and fourth vertex, etc.
 */
declare const pr_trianglestrip: Constant.PrimitiveType;
/**
 * A triangle fan - Every two vertices connect to the first vertex to make a triangle.
 */
declare const pr_trianglefan: Constant.PrimitiveType;

declare const fa_left: Constant.HAlign;

declare const fa_center: Constant.HAlign;

declare const fa_right: Constant.HAlign;

declare const fa_top: Constant.VAlign;

declare const fa_middle: Constant.VAlign;

declare const fa_bottom: Constant.VAlign;
/**
 * No file filter
 */
declare const fa_none: Constant.FileAttribute;
/**
 * Read-only files
 */
declare const fa_readonly: Constant.FileAttribute;
/**
 * Hidden files
 */
declare const fa_hidden: Constant.FileAttribute;
/**
 * System files
 */
declare const fa_sysfile: Constant.FileAttribute;
/**
 * Volume-id files
 */
declare const fa_volumeid: Constant.FileAttribute;
/**
 * Directories
 */
declare const fa_directory: Constant.FileAttribute;
/**
 * Archived files
 */
declare const fa_archive: Constant.FileAttribute;
/**
 * The left mouse button
 */
declare const mb_left: Constant.MouseButton;
/**
 * The middle mouse button (this may not be valid for all target platforms)
 */
declare const mb_middle: Constant.MouseButton;
/**
 * The right mouse button
 */
declare const mb_right: Constant.MouseButton;
/**
 * Mouse side button 1
 */
declare const mb_side1: Constant.MouseButton;
/**
 * Mouse side button 2
 */
declare const mb_side2: Constant.MouseButton;
/**
 * Any of the mouse buttons
 */
declare const mb_any: Constant.MouseButton;
/**
 * No mouse button
 */
declare const mb_none: Constant.MouseButton;
/**
 * Mouse x-axis position in room coordinates
 */
declare const m_axisx: Constant.MouseButton;
/**
 * Mouse y-axis position in room coordinates
 */
declare const m_axisy: Constant.MouseButton;
/**
 * Mouse x-axis position in GUI coordinates
 */
declare const m_axisx_gui: Constant.MouseButton;
/**
 * Mouse y-axis position in GUI coordinates
 */
declare const m_axisy_gui: Constant.MouseButton;
/**
 * Mouse scroll direction up
 */
declare const m_scroll_up: Constant.MouseButton;
/**
 * Mouse scroll direction down
 */
declare const m_scroll_down: Constant.MouseButton;
/**
 * Top button 1 (this maps to the A" on an Xbox 360 controller and the cross on a PS controller)
 */
declare const gp_face1: Constant.GamepadButton;
/**
 * Top button 2 (this maps to the B" on an Xbox 360 controller and the circle on a PS controller)
 */
declare const gp_face2: Constant.GamepadButton;
/**
 * Top button 3 (this maps to the X" on an Xbox 360 controller and the square on a PS controller)
 */
declare const gp_face3: Constant.GamepadButton;
/**
 * Top button 4 (this maps to the Y" on an Xbox 360 controller and the triangle on a PS controller)
 */
declare const gp_face4: Constant.GamepadButton;
/**
 * Left shoulder button
 */
declare const gp_shoulderl: Constant.GamepadButton;
/**
 * Left shoulder trigger
 */
declare const gp_shoulderlb: Constant.GamepadButton;
/**
 * Right shoulder button
 */
declare const gp_shoulderr: Constant.GamepadButton;
/**
 * Right shoulder trigger
 */
declare const gp_shoulderrb: Constant.GamepadButton;
/**
 * The select button (on a DS4 controller, this triggers when you press the touchpad down)
 */
declare const gp_select: Constant.GamepadButton;
/**
 * The start button (this is the "options" button on a PS4 controller)
 */
declare const gp_start: Constant.GamepadButton;
/**
 * The left stick pressed (as a button)
 */
declare const gp_stickl: Constant.GamepadButton;
/**
 * The right stick pressed (as a button)
 */
declare const gp_stickr: Constant.GamepadButton;
/**
 * D-pad up
 */
declare const gp_padu: Constant.GamepadButton;
/**
 * D-pad down
 */
declare const gp_padd: Constant.GamepadButton;
/**
 * D-pad left
 */
declare const gp_padl: Constant.GamepadButton;
/**
 * D-pad right
 */
declare const gp_padr: Constant.GamepadButton;
/**
 * Left stick horizontal axis (analog)
 */
declare const gp_axislh: Constant.GamepadAxis;
/**
 * Left stick vertical axis (analog)
 */
declare const gp_axislv: Constant.GamepadAxis;
/**
 * Right stick horizontal axis (analog)
 */
declare const gp_axisrh: Constant.GamepadAxis;
/**
 * Right stick vertical axis (analog)
 */
declare const gp_axisrv: Constant.GamepadAxis;
/**
 * The gamepad's acceleration on the X axis
 */
declare const gp_axis_acceleration_x: Constant.GamepadAxis;
/**
 * The gamepad's acceleration on the Y axis
 */
declare const gp_axis_acceleration_y: Constant.GamepadAxis;
/**
 * The gamepad's acceleration on the Z axis
 */
declare const gp_axis_acceleration_z: Constant.GamepadAxis;
/**
 * The gamepad's angular velocity on the X axis
 */
declare const gp_axis_angular_velocity_x: Constant.GamepadAxis;
/**
 * The gamepad's angular velocity on the Y axis
 */
declare const gp_axis_angular_velocity_y: Constant.GamepadAxis;
/**
 * The gamepad's angular velocity on the Z axis
 */
declare const gp_axis_angular_velocity_z: Constant.GamepadAxis;
/**
 * The gamepad's X orientation
 */
declare const gp_axis_orientation_x: Constant.GamepadAxis;
/**
 * The gamepad's Y orientation
 */
declare const gp_axis_orientation_y: Constant.GamepadAxis;
/**
 * The gamepad's Z orientation
 */
declare const gp_axis_orientation_z: Constant.GamepadAxis;
/**
 * The gamepad's W orientation
 */
declare const gp_axis_orientation_w: Constant.GamepadAxis;
/**
 * The gamepad's Home button
 */
declare const gp_home: Constant.GamepadButton;
/**
 * A gamepad button used for mapping extra buttons on a device
 */
declare const gp_extra1: Constant.GamepadButton;
/**
 * A gamepad button used for mapping extra buttons on a device
 */
declare const gp_extra2: Constant.GamepadButton;
/**
 * A gamepad button used for mapping extra buttons on a device
 */
declare const gp_extra3: Constant.GamepadButton;
/**
 * A gamepad button used for mapping extra buttons on a device
 */
declare const gp_extra4: Constant.GamepadButton;
/**
 * A gamepad button used for mapping extra buttons on a device
 */
declare const gp_extra5: Constant.GamepadButton;
/**
 * A gamepad button used for mapping extra buttons on a device
 */
declare const gp_extra6: Constant.GamepadButton;
/**
 * A gamepad button used for mapping paddle right button on a device
 */
declare const gp_paddler: Constant.GamepadButton;
/**
 * A gamepad button used for mapping paddle left button on a device
 */
declare const gp_paddlel: Constant.GamepadButton;
/**
 * A gamepad button used for mapping paddle right bottom button on a device
 */
declare const gp_paddlerb: Constant.GamepadButton;
/**
 * A gamepad button used for mapping paddle left bottom button on a device
 */
declare const gp_paddlelb: Constant.GamepadButton;
/**
 * A gamepad button used for mapping the touchpad button on a device (i.e. PS4 and PS5)
 */
declare const gp_touchpadbutton: Constant.GamepadButton;
/**
 * keycode representing that no key is pressed
 */
declare const vk_nokey: Constant.VirtualKey;
/**
 * keycode representing that any key is pressed
 */
declare const vk_anykey: Constant.VirtualKey;
/**
 * keycode for the left arrow key
 */
declare const vk_left: Constant.VirtualKey;
/**
 * keycode for the right arrow key
 */
declare const vk_right: Constant.VirtualKey;
/**
 * keycode for the up arrow key
 */
declare const vk_up: Constant.VirtualKey;
/**
 * keycode for the down arrow key
 */
declare const vk_down: Constant.VirtualKey;
/**
 * enter key
 */
declare const vk_enter: Constant.VirtualKey;
/**
 * escape key
 */
declare const vk_escape: Constant.VirtualKey;
/**
 * space key
 */
declare const vk_space: Constant.VirtualKey;
/**
 * either of the shift keys
 */
declare const vk_shift: Constant.VirtualKey;
/**
 * either of the control keys
 */
declare const vk_control: Constant.VirtualKey;
/**
 * alt key
 */
declare const vk_alt: Constant.VirtualKey;
/**
 * backspace key
 */
declare const vk_backspace: Constant.VirtualKey;
/**
 * tab key
 */
declare const vk_tab: Constant.VirtualKey;
/**
 * home key
 */
declare const vk_home: Constant.VirtualKey;
/**
 * end key
 */
declare const vk_end: Constant.VirtualKey;
/**
 * delete key
 */
declare const vk_delete: Constant.VirtualKey;
/**
 * insert key
 */
declare const vk_insert: Constant.VirtualKey;
/**
 * pageup key
 */
declare const vk_pageup: Constant.VirtualKey;
/**
 * pagedown key
 */
declare const vk_pagedown: Constant.VirtualKey;
/**
 * pause/break key
 */
declare const vk_pause: Constant.VirtualKey;
/**
 * printscreen/sysrq key
 */
declare const vk_printscreen: Constant.VirtualKey;
/**
 * keycode for the function keys F1 to F12
 */
declare const vk_f1: Constant.VirtualKey;
/**
 * number keys on the numeric keypad
 */
declare const vk_numpad0: Constant.VirtualKey;
/**
 * multiply key on the numeric keypad
 */
declare const vk_multiply: Constant.VirtualKey;
/**
 * divide key on the numeric keypad
 */
declare const vk_divide: Constant.VirtualKey;
/**
 * add key on the numeric keypad
 */
declare const vk_add: Constant.VirtualKey;
/**
 * subtract key on the numeric keypad
 */
declare const vk_subtract: Constant.VirtualKey;
/**
 * decimal dot keys on the numeric keypad
 */
declare const vk_decimal: Constant.VirtualKey;
/**
 * left shift key
 */
declare const vk_lshift: Constant.VirtualKey;
/**
 * left control key
 */
declare const vk_lcontrol: Constant.VirtualKey;
/**
 * left alt key
 */
declare const vk_lalt: Constant.VirtualKey;
/**
 * right shift key
 */
declare const vk_rshift: Constant.VirtualKey;
/**
 * right control key
 */
declare const vk_rcontrol: Constant.VirtualKey;
/**
 * right alt key
 */
declare const vk_ralt: Constant.VirtualKey;
/**
 * Gets the game speed using frames per second.
 */
declare const gamespeed_fps: Constant.GameSpeed;
/**
 * Gets the game speed using microseconds per frame.
 */
declare const gamespeed_microseconds: Constant.GameSpeed;
/**
 * 3.141592653589793280... (the exact value will depend on various factors like the platform being targeted)
 */
declare const pi: number;
/**
 * use the local time zone as set by the system
 */
declare const timezone_local: number;
/**
 * use Coordinated Universal Time
 */
declare const timezone_utc: number;
/**
 * The current view matrix
 */
declare const matrix_view: Constant.MatrixType;
/**
 * The current projection matrix
 */
declare const matrix_projection: Constant.MatrixType;
/**
 * The current world matrix
 */
declare const matrix_world: Constant.MatrixType;
/**
 * Create a socket using TCP.
 */
declare const network_socket_tcp: Constant.SocketType;
/**
 * Create a socket using UDP.
 */
declare const network_socket_udp: Constant.SocketType;
/**
 * Create a socket using Secure Websockets.
 */
declare const network_socket_wss: Constant.SocketType;
/**
 * Create a web socket (only for connecting to HTML5 projects), using TCP.
 */
declare const network_socket_ws: Constant.SocketType;
/**
 * Create a Bluetooth socket (currently unavailable!).
 */
declare const network_socket_bluetooth: Constant.SocketType;
/**
 * Set a connection timeout value
 */
declare const network_config_connect_timeout: Constant.NetworkConfig;
/**
 * Tell GameMaker not to block on connect.
 */
declare const network_config_use_non_blocking_socket: Constant.NetworkConfig;
/**
 * Enables the "reliable UDP" protocol for an existing UDP socket
 */
declare const network_config_enable_reliable_udp: Constant.NetworkConfig;
/**
 * Disables the "reliable UDP" protocol for an existing UDP socked.
 */
declare const network_config_disable_reliable_udp: Constant.NetworkConfig;
/**
 * Sets the SO_LINGER timeout value to 0 for an exisiting TCP socket
 */
declare const network_config_avoid_time_wait: Constant.NetworkConfig;
/**
 * Set the protocol to use on websocket upgrade message, protocol is a string as 3rd parameter
 */
declare const network_config_websocket_protocol: Constant.NetworkConfig;
/**
 * Enables use of IPv6 multicast for broadcast discovery on a UDP socket.
 */
declare const network_config_enable_multicast: Constant.NetworkConfig;
/**
 * Disables use of IPv6 multicast for broadcast discovery on a UDP socket.
 */
declare const network_config_disable_multicast: Constant.NetworkConfig;
/**
 * Set the size limit for buffered incoming messages, size is an integer number of bytes as 3rd parameter
 */
declare const network_config_message_size_limit: Constant.NetworkConfig;
/**
 * Send a BINARY message over WeSocket
 */
declare const network_send_binary: Constant.SendOption;
/**
 * Send a TEXT message over WebSocket
 */
declare const network_send_text: Constant.SendOption;
/**
 * This is the default C, C++ call
 */
declare const dll_cdecl: Constant.ExternalCallType;
/**
 * This is the standard WinAPI call (Windows dll only)
 */
declare const dll_stdcall: Constant.ExternalCallType;
/**
 * A real number argument
 */
declare const ty_real: Constant.ExternalArgumentType;
/**
 * a null-terminated string argument
 */
declare const ty_string: Constant.ExternalArgumentType;
/**
 * Game is not being played in a browser
 */
declare const browser_not_a_browser: Constant.BrowserType;
/**
 * Unknown browser
 */
declare const browser_unknown: Constant.BrowserType;
/**
 * Internet Explorer
 */
declare const browser_ie: Constant.BrowserType;
/**
 * Internet Explorer on a mobile device
 */
declare const browser_ie_mobile: Constant.BrowserType;
/**
 * Mozilla Firefox
 */
declare const browser_firefox: Constant.BrowserType;
/**
 * Google Chrome
 */
declare const browser_chrome: Constant.BrowserType;
/**
 * Safari
 */
declare const browser_safari: Constant.BrowserType;
/**
 * Safari on a mobile device
 */
declare const browser_safari_mobile: Constant.BrowserType;
/**
 * Opera
 */
declare const browser_opera: Constant.BrowserType;
/**
 * Tizen mobile device browser
 */
declare const browser_tizen: Constant.BrowserType;
/**
 * Windows App
 */
declare const browser_windows_store: Constant.BrowserType;
/**
 * This indicates that the permission has been granted
 */
declare const os_permission_granted: number;
/**
 * This indicates that the permission has not been granted
 */
declare const os_permission_denied: number;
/**
 * This indicates that the permission has either been blocked by the phone settings, or that the user has previously denied the request and selected "Don't ask again".
 */
declare const os_permission_denied_dont_request: number;
/**
 * iPad
 */
declare const device_ios_ipad: Constant.DeviceType;
/**
 * Newer iPad with Retina display size of 2048 x 1536
 */
declare const device_ios_ipad_retina: Constant.DeviceType;
/**
 * iPhone6 with display size 1334 x 750
 */
declare const device_ios_iphone6: Constant.DeviceType;
/**
 * Larger iPhone 6 with display 1920 x 1080
 */
declare const device_ios_iphone6plus: Constant.DeviceType;
/**
 * iPhone5 with display size 640 x 1136)
 */
declare const device_ios_iphone5: Constant.DeviceType;
/**
 * Older iPhone/iPod Touch (480 x 320 screen) or Android phone
 */
declare const device_ios_iphone: Constant.DeviceType;
/**
 * Newer iPhone/iPod Touch with Retina display of 960 x 640
 */
declare const device_ios_iphone_retina: Constant.DeviceType;
/**
 * The device is actually an emulator (Windows Phone or Android)
 */
declare const device_emulator: Constant.DeviceType;
/**
 * Android tablet
 */
declare const device_tablet: Constant.DeviceType;
/**
 * Unknown or not iOS
 */
declare const device_ios_unknown: Constant.DeviceType;
/**
 * Windows OS
 */
declare const os_windows: Constant.OperatingSystem;
/**
 * Windows 10 Universal Windows Platform
 * @deprecated
 */
declare const os_uwp: Constant.OperatingSystem;
/**
 * Linux
 */
declare const os_linux: Constant.OperatingSystem;
/**
 * macOS X
 */
declare const os_macosx: Constant.OperatingSystem;
/**
 * iOS (iPhone, iPad, iPod Touch)
 */
declare const os_ios: Constant.OperatingSystem;
/**
 * Apple tvOS
 */
declare const os_tvos: Constant.OperatingSystem;
/**
 * Android
 */
declare const os_android: Constant.OperatingSystem;
/**
 * Sony PlayStation 4
 */
declare const os_ps4: Constant.OperatingSystem;
/**
 * Sony PlayStation 5
 */
declare const os_ps5: Constant.OperatingSystem;
/**
 * Microsoft Xbox One
 * @deprecated
 */
declare const os_xboxone: Constant.OperatingSystem;
/**
 * Microsoft Xbox Series X/S
 */
declare const os_xboxseriesxs: Constant.OperatingSystem;
/**
 * Microsoft GDK platform (Xbox One and Series X/S)
 */
declare const os_gdk: Constant.OperatingSystem;
/**
 * Nintendo Switch
 */
declare const os_switch: Constant.OperatingSystem;
/**
 * Nintendo Switch 2
 */
declare const os_switch2: Constant.OperatingSystem;
/**
 * Opera GX
 */
declare const os_operagx: Constant.OperatingSystem;
/**
 * GX.games
 */
declare const os_gxgames: Constant.OperatingSystem;
/**
 * Unknown OS
 */
declare const os_unknown: Constant.OperatingSystem;
/**
 * The x coordinate of the first anchor point of the joint in the room
 */
declare const phy_joint_anchor_1_x: Constant.PhysicsJointProperty;
/**
 * The y coordinate of the first anchor point of the joint in the room
 */
declare const phy_joint_anchor_1_y: Constant.PhysicsJointProperty;
/**
 * The x coordinate of the second anchor point of the joint in the room
 */
declare const phy_joint_anchor_2_x: Constant.PhysicsJointProperty;
/**
 * The y coordinate of the second anchor point of the joint in the room
 */
declare const phy_joint_anchor_2_y: Constant.PhysicsJointProperty;
/**
 * This is the reaction force being applied to the second instance in a joint at the x anchor position
 */
declare const phy_joint_reaction_force_x: Constant.PhysicsJointProperty;
/**
 * This is the reaction force being applied to the second instance in a joint at the y anchor position
 */
declare const phy_joint_reaction_force_y: Constant.PhysicsJointProperty;
/**
 * This is the torque being applied to the second instance in a joint at the anchor position
 */
declare const phy_joint_reaction_torque: Constant.PhysicsJointProperty;
/**
 * The value specified when the joint was created for the maximum motor force
 */
declare const phy_joint_max_motor_force: Constant.PhysicsJointProperty;
/**
 * The value specified when the joint was created for the maximum motor torque
 */
declare const phy_joint_max_motor_torque: Constant.PhysicsJointProperty;
/**
 * The current motor force
 */
declare const phy_joint_motor_force: Constant.PhysicsJointProperty;
/**
 * The current motor speed
 */
declare const phy_joint_motor_speed: Constant.PhysicsJointProperty;
/**
 * The current motor torque
 */
declare const phy_joint_motor_torque: Constant.PhysicsJointProperty;
/**
 * The angle that a line between the two anchor points of the joint makes. This is calculated using the physics world coordinates (not the GameMaker room coordinates) in radians.
 */
declare const phy_joint_angle: Constant.PhysicsJointProperty;
/**
 * Enable or disable angle limiting for the joint. Set the value to true to enable or false to disable.
 */
declare const phy_joint_angle_limits: Constant.PhysicsJointProperty;
/**
 * The upper angle limit for the joint in degrees.
 */
declare const phy_joint_upper_angle_limit: Constant.PhysicsJointProperty;
/**
 * The lower angle limit for the joint in degrees.
 */
declare const phy_joint_lower_angle_limit: Constant.PhysicsJointProperty;
/**
 * Gets the distance between the anchor x/y coordinates and the local x/y coordinates.
 */
declare const phy_joint_translation: Constant.PhysicsJointProperty;
/**
 * The current joint movement speed.
 */
declare const phy_joint_speed: Constant.PhysicsJointProperty;
/**
 * The damping ratio is non-dimensional and defines the "springiness" of the joint. The value for this constant is typically between 0 and 1, but can be larger, and at 1, the damping is critical meaning that all oscillations should vanish.
 */
declare const phy_joint_damping_ratio: Constant.PhysicsJointProperty;
/**
 * This will return (or set) the oscillation frequency for the joint, in hertz, and typically the frequency should be less than a half the frequency of the time step, as set by the function physics_world_update_speed().
 */
declare const phy_joint_frequency: Constant.PhysicsJointProperty;
/**
 * This will return the length of the joint from the first local x/y coordinates to the first anchor x/y coordinates (Distance joints only, can only be read from)
 */
declare const phy_joint_length_1: Constant.PhysicsJointProperty;
/**
 * This will return the length of the joint from the second local x/y coordinates to the second anchor x/y coordinates (Distance joints only, can only be written to)
 */
declare const phy_joint_length_2: Constant.PhysicsJointProperty;
/**
 * The maximum torque value for the joint.
 */
declare const phy_joint_max_torque: Constant.PhysicsJointProperty;
/**
 * The maximum force value for the joint.
 */
declare const phy_joint_max_force: Constant.PhysicsJointProperty;
/**
 * The maximum extension for the connection between the two anchor points.
 */
declare const phy_joint_max_length: Constant.PhysicsJointProperty;
/**
 * The default properties for a soft body particle.
 */
declare const phy_particle_flag_water: Constant.PhysicsParticleFlag;
/**
 * A zombie particle is one that will be destroyed after a single step with all others flagged in this way.
 */
declare const phy_particle_flag_zombie: Constant.PhysicsParticleFlag;
/**
 * This defines the particle as static, essentially creating it as an immovable object in the physics simulation, as they will remain in a fixed position no matter what collides with them. You should use this flag rather than set the density to 0.
 */
declare const phy_particle_flag_wall: Constant.PhysicsParticleFlag;
/**
 * Spring particles produce the effect of being attached to one another, as if by a spring. Particles created with this flag are "connected" in pairs, with each particle being connected to the one that was closest to it at the time of creation. Once paired, particles do not change "partners", and the farther an external force pulls them from one another, the greater the power with which they will collide when that external force is removed.
 */
declare const phy_particle_flag_spring: Constant.PhysicsParticleFlag;
/**
 * Elastic particles deform and may also bounce when they collide with other rigid bodies in the physics simulation.
 */
declare const phy_particle_flag_elastic: Constant.PhysicsParticleFlag;
/**
 * A viscous particle is one that exhibits "clinginess" or "stickiness", like oil. Viscous particles will clump and stick together more.
 */
declare const phy_particle_flag_viscous: Constant.PhysicsParticleFlag;
/**
 * Powder particles produce a scattering effect such as you might see with sand or dust.
 */
declare const phy_particle_flag_powder: Constant.PhysicsParticleFlag;
/**
 * Tensile particles are used to produce the effect of surface tension, or the taut curvature on the surface of a body of liquid. They might be used, for example, to create the surface tension you would see on a drop of water. Once the tension is broken, the particles bounce as if they were elastic, but also continue to attract each other. As a result, particles tend to form clusters as they bounce.
 */
declare const phy_particle_flag_tensile: Constant.PhysicsParticleFlag;
/**
 * Colour-mixing particles take on some of the colour of other particles with which they collide. Note that if only one of the two colliding particles is a colour-mixing one, the other particle retains its pre-collision colour.
 */
declare const phy_particle_flag_colourmixing: Constant.PhysicsParticleFlag;
/**
 * The flags value for the particle.
 */
declare const phy_particle_data_flag_typeflags: Constant.PhysicsParticleDataFlag;
/**
 * The x and y position of the particle.
 */
declare const phy_particle_data_flag_position: Constant.PhysicsParticleDataFlag;
/**
 * The horizontal and vertical speed.
 */
declare const phy_particle_data_flag_velocity: Constant.PhysicsParticleDataFlag;
/**
 * The colour and alpha value (hexadecimal).
 */
declare const phy_particle_data_flag_colour: Constant.PhysicsParticleDataFlag;
/**
 * The particle category (as defined when you created the particle or group to which it belongs).
 */
declare const phy_particle_data_flag_category: Constant.PhysicsParticleDataFlag;
/**
 * A solid particle group prevents other fixtures from lodging inside of it. Should anything penetrate it, the solid particle group pushes the offending fixture back out to its surface, making a a solid particle group possess an especially strong repulsive force.
 */
declare const phy_particle_group_flag_solid: Constant.PhysicsParticleGroupFlag;
/**
 * Rigid particle groups are ones whose shape does not change, even when they collide with other fixtures.
 */
declare const phy_particle_group_flag_rigid: Constant.PhysicsParticleGroupFlag;
/**
 * The global keyword
 */
declare const global: number;
/**
 * This constant means that the value is not a valid pointer
 */
declare const pointer_invalid: Pointer.Any;
/**
 * This constant indicates that the pointer is not pointing to anything meaningful (the same as NULL in C++ or null in C#). This value is falsy.
 */
declare const pointer_null: Pointer.Any;
/**
 * NaN stands for "not a number", and is a constant that can be returned when the compiler cannot evaluate the results of an operation as a number.
 */
declare const NaN: number;
/**
 * The constant infinity refers to a number that is considered infinite, such as the result you would get when dividing any floating point value by zero.
 */
declare const infinity: number;
/**
 * This constant holds the date and time on which the executable being run was built by GameMaker.
 */
declare const GM_build_date: number;
/**
 * This constant hold the version number as defined in the Game Options for each target platform.
 */
declare const GM_version: string;
/**
 * This built-in constant holds the type of the runtime: "gms2" for the current runtime or "gmrt" for the new runtime.
 */
declare const GM_runtime_type: string;
/**
 * This constant hold the runtime version number as defined in the Runtime Feeds Preferences as the runtime being used to build the project.
 */
declare const GM_runtime_version: string;
/**
 * full path and filename of the YYP project
 */
declare const GM_project_filename: string;
/**
 * compile time constant of current build type either "exe" (for create executable) or "run" (for a run)
 */
declare const GM_build_type: string;
/**
 * compile time constant of whether game is sandboxed or not (true - sandbox is on, false - sandbox is off)
 */
declare const GM_is_sandboxed: boolean;
/**
 * compile time constant that returns the current line number
 */
declare const _GMLINE_: number;
/**
 * compile time constant that returns the current function name
 */
declare const _GMFUNCTION_: string;
/**
 * compile time constant that returns the current filename
 */
declare const _GMFILE_: string;

declare const ev_keypress: Constant.EventType;

declare const ev_keyrelease: Constant.EventType;
/**
 * @deprecated
 */
declare const ev_trigger: Constant.EventType;
/**
 * @deprecated
 */
declare const ev_joystick1_left: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_right: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_up: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_down: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button1: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button2: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button3: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button4: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button5: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button6: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button7: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick1_button8: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_left: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_right: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_up: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_down: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button1: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button2: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button3: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button4: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button5: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button6: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button7: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_joystick2_button8: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_no_more_lives: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_no_more_health: Constant.EventNumber;

declare const ev_user1: Constant.EventNumber;

declare const ev_user2: Constant.EventNumber;

declare const ev_user3: Constant.EventNumber;

declare const ev_user4: Constant.EventNumber;

declare const ev_user5: Constant.EventNumber;

declare const ev_user6: Constant.EventNumber;

declare const ev_user7: Constant.EventNumber;

declare const ev_user8: Constant.EventNumber;

declare const ev_user9: Constant.EventNumber;

declare const ev_user10: Constant.EventNumber;

declare const ev_user11: Constant.EventNumber;

declare const ev_user12: Constant.EventNumber;

declare const ev_user13: Constant.EventNumber;

declare const ev_user14: Constant.EventNumber;

declare const ev_user15: Constant.EventNumber;

declare const ev_outside_view1: Constant.EventNumber;

declare const ev_outside_view2: Constant.EventNumber;

declare const ev_outside_view3: Constant.EventNumber;

declare const ev_outside_view4: Constant.EventNumber;

declare const ev_outside_view5: Constant.EventNumber;

declare const ev_outside_view6: Constant.EventNumber;

declare const ev_outside_view7: Constant.EventNumber;

declare const ev_boundary_view1: Constant.EventNumber;

declare const ev_boundary_view2: Constant.EventNumber;

declare const ev_boundary_view3: Constant.EventNumber;

declare const ev_boundary_view4: Constant.EventNumber;

declare const ev_boundary_view5: Constant.EventNumber;

declare const ev_boundary_view6: Constant.EventNumber;

declare const ev_boundary_view7: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_image_load: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_sound_load: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_async: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_dialog_async: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_iap: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_cloud: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_networking: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_web_steam: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_social: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_push_notification: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_audio_recording: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_audio_playback: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_audio_playback_ended: Constant.EventNumber;
/**
 * @deprecated
 */
declare const ev_system_event: Constant.EventNumber;

declare const vk_return: Constant.VirtualKey;

declare const vk_f2: Constant.VirtualKey;

declare const vk_f3: Constant.VirtualKey;

declare const vk_f4: Constant.VirtualKey;

declare const vk_f5: Constant.VirtualKey;

declare const vk_f6: Constant.VirtualKey;

declare const vk_f7: Constant.VirtualKey;

declare const vk_f8: Constant.VirtualKey;

declare const vk_f9: Constant.VirtualKey;

declare const vk_f10: Constant.VirtualKey;

declare const vk_f11: Constant.VirtualKey;

declare const vk_f12: Constant.VirtualKey;

declare const vk_numpad1: Constant.VirtualKey;

declare const vk_numpad2: Constant.VirtualKey;

declare const vk_numpad3: Constant.VirtualKey;

declare const vk_numpad4: Constant.VirtualKey;

declare const vk_numpad5: Constant.VirtualKey;

declare const vk_numpad6: Constant.VirtualKey;

declare const vk_numpad7: Constant.VirtualKey;

declare const vk_numpad8: Constant.VirtualKey;

declare const vk_numpad9: Constant.VirtualKey;
/**
 * @deprecated
 */
declare const audio_old_system: number;
/**
 * @deprecated
 */
declare const audio_new_system: number;
/**
 * @deprecated
 */
declare const os_win32: Constant.OperatingSystem;
/**
 * @deprecated
 */
declare const os_winphone: Constant.OperatingSystem;
/**
 * @deprecated
 */
declare const os_win8native: Constant.OperatingSystem;
/**
 * @deprecated
 */
declare const os_psvita: Constant.OperatingSystem;
/**
 * @deprecated
 */
declare const os_ps3: Constant.OperatingSystem;
/**
 * Edge browser
 */
declare const browser_edge: Constant.Browser;
/**
 * @deprecated
 */
declare const of_challenge_win: number;
/**
 * @deprecated
 */
declare const of_challenge_lose: number;
/**
 * @deprecated
 */
declare const of_challenge_tie: number;
/**
 * @deprecated
 */
declare const leaderboard_type_number: number;
/**
 * @deprecated
 */
declare const leaderboard_type_time_mins_secs: number;
/**
 * Never
 */
declare const cmpfunc_never: Constant.ZFunction;
/**
 * Less
 */
declare const cmpfunc_less: Constant.ZFunction;
/**
 * Equal
 */
declare const cmpfunc_equal: Constant.ZFunction;
/**
 * Less or Equal
 */
declare const cmpfunc_lessequal: Constant.ZFunction;
/**
 * Greater
 */
declare const cmpfunc_greater: Constant.ZFunction;
/**
 * Not Equal
 */
declare const cmpfunc_notequal: Constant.ZFunction;
/**
 * Greater or Equal
 */
declare const cmpfunc_greaterequal: Constant.ZFunction;
/**
 * Always
 */
declare const cmpfunc_always: Constant.ZFunction;
/**
 * Keeps the current value in the stencil buffer.
 */
declare const stencilop_keep: Constant.StencilOp;
/**
 * Sets the stencil buffer value to 0.
 */
declare const stencilop_zero: Constant.StencilOp;
/**
 * Sets the stencil buffer value to the stencil reference value.
 */
declare const stencilop_replace: Constant.StencilOp;
/**
 * Increments the stencil buffer value, wrapping to 0 at the maximum value.
 */
declare const stencilop_incr_wrap: Constant.StencilOp;
/**
 * Decrements the stencil buffer value, wrapping to the maximum value at 0.
 */
declare const stencilop_decr_wrap: Constant.StencilOp;
/**
 * Performs a bitwise inversion on the current stencil buffer value.
 */
declare const stencilop_invert: Constant.StencilOp;
/**
 * Increments the stencil buffer value, clamping at the maximum value.
 */
declare const stencilop_incr: Constant.StencilOp;
/**
 * Decrements the stencil buffer value, clamping at 0.
 */
declare const stencilop_decr: Constant.StencilOp;

declare const iap_ev_storeload: number;

declare const iap_ev_product: number;

declare const iap_ev_purchase: number;

declare const iap_ev_consume: number;

declare const iap_ev_restore: number;

declare const iap_storeload_ok: number;

declare const iap_storeload_failed: number;

declare const iap_status_uninitialised: number;

declare const iap_status_unavailable: number;

declare const iap_status_loading: number;

declare const iap_status_available: number;

declare const iap_status_processing: number;

declare const iap_status_restoring: number;

declare const iap_failed: number;

declare const iap_unavailable: number;

declare const iap_available: number;

declare const iap_purchased: number;

declare const iap_canceled: number;

declare const iap_refunded: number;
/**
 * This shows the absolute bounding box of each fixture in relation to the room axis.
 */
declare const phy_debug_render_aabb: Constant.PhysicsDebugFlag;
/**
 * This will show any fixtures that are currently in collision.
 */
declare const phy_debug_render_collision_pairs: Constant.PhysicsDebugFlag;
/**
 * This marks the center of mass of each fixture in the room.
 */
declare const phy_debug_render_coms: Constant.PhysicsDebugFlag;
/**
 * Shows the basic shapes that make up the fixtures in the room.
 */
declare const phy_debug_render_core_shapes: Constant.PhysicsDebugFlag;
/**
 * This will draw each of the joints of all fixtures in the room.
 */
declare const phy_debug_render_joints: Constant.PhysicsDebugFlag;
/**
 * This shows the relative bounding box for the fixtures in the room.
 */
declare const phy_debug_render_obb: Constant.PhysicsDebugFlag;
/**
 * This shows the actual shapes that make up fixtures within the room.
 */
declare const phy_debug_render_shapes: Constant.PhysicsDebugFlag;
/**
 * Color-mixing particles take on some of the color of other particles with which they collide. Note that if only one of the two colliding particles is a color-mixing one, the other particle retains its pre-collision color.
 */
declare const phy_particle_flag_colormixing: Constant.PhysicsParticleFlag;
/**
 * The color and alpha value (hexadecimal).
 */
declare const phy_particle_data_flag_color: Constant.PhysicsParticleFlag;
/**
 * @deprecated
 */
declare const achievement_our_info: number;
/**
 * @deprecated
 */
declare const achievement_friends_info: number;
/**
 * @deprecated
 */
declare const achievement_leaderboard_info: number;
/**
 * @deprecated
 */
declare const achievement_achievement_info: number;
/**
 * @deprecated
 */
declare const achievement_pic_loaded: number;
/**
 * @deprecated
 */
declare const achievement_show_ui: number;
/**
 * @deprecated
 */
declare const achievement_show_profile: number;
/**
 * @deprecated
 */
declare const achievement_show_leaderboard: number;
/**
 * @deprecated
 */
declare const achievement_show_achievement: number;
/**
 * @deprecated
 */
declare const achievement_show_bank: number;
/**
 * @deprecated
 */
declare const achievement_show_friend_picker: number;
/**
 * @deprecated
 */
declare const achievement_show_purchase_prompt: number;
/**
 * The event was triggered by a connection.
 */
declare const network_type_connect: Constant.NetworkType;
/**
 * The event was triggered by a disconnection.
 */
declare const network_type_disconnect: Constant.NetworkType;
/**
 * The event was triggered by incoming data.
 */
declare const network_type_data: Constant.NetworkType;
/**
 * The event was triggered by a connection configured as non-blocking.
 */
declare const network_type_non_blocking_connect: Constant.NetworkType;
/**
 * The connection succeeded.
 */
declare const network_type_up: Constant.NetworkType;
/**
 * The connection failed.
 */
declare const network_type_up_failed: Constant.NetworkType;
/**
 * The network went down.
 */
declare const network_type_down: Constant.NetworkType;
/**
 * This does not attempt to connect.
 */
declare const network_connect_none: Constant.NetworkConnectType;
/**
 * This attempts to connect and blocks execution while trying.
 */
declare const network_connect_blocking: Constant.NetworkConnectType;
/**
 * This will actively prompt the user to fix the connection, if it failed.
 */
declare const network_connect_nonblocking: Constant.NetworkConnectType;
/**
 * This will actively prompt the user to fix the connection, if it failed.
 */
declare const network_connect_active: Constant.NetworkConnectType;
/**
 * This will try to connect and silently fail if no successful connection could be established.
 */
declare const network_connect_passive: Constant.NetworkConnectType;
/**
 * color values (r, g, b, a)
 */
declare const vertex_usage_color: Constant.VertexUsage;
/**
 * UV coordinates (u, v)
 */
declare const vertex_usage_texcoord: Constant.VertexUsage;

declare const vertex_usage_psize: Constant.VertexUsage;
/**
 * Four component values (r, g, b, a)
 */
declare const vertex_type_color: Constant.VertexType;
/**
 * The element does not exist or the ID value is erroneous.
 */
declare const layerelementtype_undefined: Constant.LayerElementType;
/**
 * The element is an old type tilemap.
 */
declare const layerelementtype_oldtilemap: Constant.LayerElementType;

declare const kbv_type_default: Constant.VirtualKeyboardType;

declare const kbv_type_ascii: Constant.VirtualKeyboardType;

declare const kbv_type_url: Constant.VirtualKeyboardType;

declare const kbv_type_email: Constant.VirtualKeyboardType;

declare const kbv_type_numbers: Constant.VirtualKeyboardType;

declare const kbv_type_phone: Constant.VirtualKeyboardType;

declare const kbv_type_phone_name: Constant.VirtualKeyboardType;

declare const kbv_returnkey_default: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_go: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_google: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_join: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_next: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_route: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_search: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_send: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_yahoo: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_done: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_continue: Constant.VirtualKeyboardReturnType;

declare const kbv_returnkey_emergency: Constant.VirtualKeyboardReturnType;

declare const kbv_autocapitalize_none: Constant.VirtualKeyboardAutoCapitalizeType;

declare const kbv_autocapitalize_words: Constant.VirtualKeyboardAutoCapitalizeType;

declare const kbv_autocapitalize_sentences: Constant.VirtualKeyboardAutoCapitalizeType;

declare const kbv_autocapitalize_characters: Constant.VirtualKeyboardAutoCapitalizeType;
/**
 * The center slice
 */
declare const nineslice_center: Constant.NineSlice;
/**
 * This is a color data parameter track.
 */
declare const seqtracktype_color: Constant.SequenceTrackType;
/**
 * Don't use interpolation for this track
 */
declare const seqinterpolation_assign: number;
/**
 * Use linear interpolation for this track
 */
declare const seqinterpolation_lerp: number;
/**
 * Used for linear interpolation between points.
 */
declare const animcurvetype_linear: Constant.AnimCurveInterpolationType;
/**
 * Used for smooth interpolation between points using Catmull-Rom interpolation.
 */
declare const animcurvetype_catmullrom: Constant.AnimCurveInterpolationType;
/**
 * Used for Bezier interpolation between points.
 */
declare const animcurvetype_bezier: Constant.AnimCurveInterpolationType;
/**
 * The video surface uses the RGBA color model
 */
declare const video_format_rgba: Constant.VideoFormat;
/**
 * The video surface uses the YUV color model
 */
declare const video_format_yuv: Constant.VideoFormat;
/**
 * No video is currently loaded, or the video was closed with video_close()
 */
declare const video_status_closed: Constant.VideoStatus;
/**
 * The video is currently preparing and has not started playing yet
 */
declare const video_status_preparing: Constant.VideoStatus;
/**
 * The video is currently playing
 */
declare const video_status_playing: Constant.VideoStatus;
/**
 * The video is paused
 */
declare const video_status_paused: Constant.VideoStatus;
/**
 * The global time source
 */
declare const time_source_global: Constant.TimeSource;
/**
 * The game time source
 */
declare const time_source_game: Constant.TimeSource;
/**
 * Use seconds for the time source period (frame-independent)
 */
declare const time_source_units_seconds: Constant.TimeSourceUnits;
/**
 * Use frames for the time source period (frame-dependent)
 */
declare const time_source_units_frames: Constant.TimeSourceUnits;
/**
 * The time source will expire on the frame nearest to its expiry time
 */
declare const time_source_expire_nearest: Constant.TimeSourceExpiryType;
/**
 * The time source will expire on the first frame after its expiry time
 */
declare const time_source_expire_after: Constant.TimeSourceExpiryType;
/**
 * The time source has not been started yet
 */
declare const time_source_state_initial: Constant.TimeSourceState;
/**
 * The time source has been started and is counting down
 */
declare const time_source_state_active: Constant.TimeSourceState;
/**
 * The time source is paused
 */
declare const time_source_state_paused: Constant.TimeSourceState;
/**
 * The time source was stopped or it completely expired
 */
declare const time_source_state_stopped: Constant.TimeSourceState;
/**
 * Include keyboard input
 */
declare const debug_input_filter_keyboard: Constant.DebugInputFilter;
/**
 * Include mouse input
 */
declare const debug_input_filter_mouse: Constant.DebugInputFilter;
/**
 * Include touch input
 */
declare const debug_input_filter_touch: Constant.DebugInputFilter;
/**
 * Fired when the (in rollback_event_param) player_id is connected
 */
declare const rollback_connected_to_peer: number;
/**
 * Fired when the (in rollback_event_param) player_id is synchonizing
 */
declare const rollback_synchronizing_with_peer: number;
/**
 * Fired when the (in rollback_event_param) player_id is done synchonizing
 */
declare const rollback_synchronized_with_peer: number;
/**
 * Fired when the (in rollback_event_param) player_id is disconnected
 */
declare const rollback_disconnected_from_peer: number;
/**
 * Fired when the game is interrupted by a (in rollback_event_param) player_id
 */
declare const rollback_game_interrupted: number;
/**
 * Fired when the game resumes after being interrupted by (in rollback_event_param) player_id
 */
declare const rollback_game_resumed: number;
/**
 * Fired when the game you're trying to join is already full
 */
declare const rollback_game_full: number;
/**
 * Fired when you receive back info about the game (in rollback_event_param) player_id and num_players
 */
declare const rollback_game_info: number;
/**
 * Fired when connection attempt was rejected. The error can be caused by invalid token, mismatch in client versions, mismatch in protocol versions. Multiplayer session is closed automatically before event is fired.
 */
declare const rollback_connection_rejected: number;
/**
 * Fired when connection attempt was rejected. The error means that client uses obsolete version of the protocol. Before this event is fired GM will show an error message in the UI. Multiplayer session is closed automatically before event is fired.
 */
declare const rollback_protocol_rejected: number;
/**
 * Fired when server wants clients to stop the game. Usually this event means that clients are in inconsistent state. Multiplayer session is closed automatically before event is fired
 */
declare const rollback_end_game: number;
/**
 * Fired when you receive a chat message, including those sent by the local player (in rollback_event_param) message, from and to
 */
declare const rollback_chat_message: number;
/**
 * Fired when you receive new preferences set by any of the players in the game, including those set by the local player (in rollback_event_param) preferences, and player_id
 */
declare const rollback_player_prefs: number;
/**
 * Fired when the latency to the server is too high and it's impossible to run the game. Multiplayer session is closed automatically before event is fired
 */
declare const rollback_high_latency: number;
/**
 * Fired when you get info of where players should connect (in rollback_event_param) share_url
 */
declare const rollback_connect_info: number;
/**
 * Fired when you fail to connect to the backend
 */
declare const rollback_connect_error: number;
/**
 * The main audio bus
 */
declare const audio_bus_main: Struct.AudioBus;
/**
 * This is a generic error code when none of the others apply (the HTML5 runner only returns this constant in case of failure).
 */
declare const sprite_add_ext_error_unknown: number;
/**
 * This constant indicates that the request was cancelled while it was in progress.
 */
declare const sprite_add_ext_error_cancelled: number;
/**
 * This constant indicates that a sprite was removed somehow partway through the loading process.
 */
declare const sprite_add_ext_error_spritenotfound: number;
/**
 * This constant indicates that a file loading operation failed.
 */
declare const sprite_add_ext_error_loadfailed: number;
/**
 * This constant indicates that image decompression failed (which could be due to e.g. a corrupted file or unsupported image format).
 */
declare const sprite_add_ext_error_decompressfailed: number;
/**
 * Indicates that, even though all data was loaded and decompressed, sprite resource creation itself failed.
 */
declare const sprite_add_ext_error_setupfailed: number;
declare const self: Id.Instance<GMObject>;
declare const other: Id.Instance<GMObject>;
declare const all: Constant.All;

/**
 * This built-in variable can be used to either get or set the texture page size when using the function font_add(). On adding a font using that function, GameMaker will create a texture page cache of the required glyphs up to the size defined by this variable.
 */
declare let font_texture_page_size: number;
/**
 * With this read-only variable you can get a count of all active instances that are in the room. This will include the instance running the code, but does not include those instances that have been deactivated using the instance deactivate functions. Note that this variable will only give you the number of instances at the start of the step, so any changes to the instances in the room made after the step has started will not be taken into consideration.
 */
declare const instance_count: number;
/**
 * This read-only array holds all the ids of every active instance within the room. This means that if you have used any of the Instance Deactivate functions those instances that have been deactivated will not be included in this array (if you have used a value from this array previously, it will now return the keyword noone).
 */
declare const instance_id: Array<Id.Instance>;
/**
 * This 1 dimensional array is used to get the current value for any alarms that the instance may have, or it can be used to set those alarms. There are twelve alarms built into each instance of an object, and each one has its own event that will run when this variable reaches 0.
 */
declare let alarm: Array<number>;
/**
 * This built-in variable stores the depth of the instance.
 */
declare let depth: number;
/**
 * This built-in variable stores the direction of the instance.
 */
declare let direction: number;
/**
 * This built-in variable stores the friction of the instance.
 */
declare let friction: number;
/**
 * gravity is one of the built-in variables all instances have and, when set, will apply a constant force in the gravity_direction of the instance, influencing both the instance speed and direction. Note that gravity is a cumulative force and will accelerate the object if you choose not to cap the final speed, and it's usual that you'd set this variable to small decimal values like 0.01. If you set the gravity to 0, then no gravity will be applied to the instance (this is the default value).
 */
declare let gravity: number;
/**
 * gravity_direction is one of the built-in properties all instances have and can be used to set the direction of movement when the instance's gravity is greater than 0. Note that directions in GameMaker are usually calculated as 0° being right, 90° being up, 180° being left and 270° being down.
 */
declare let gravity_direction: number;
/**
 * hspeed is one of the built-in properties that all instances have and defines the horizontal movement speed (along the x-axis) of the instance in pixels per step. So, an hspeed of 3 means 3 pixels of movement to the right (+x) every step, and an hspeed of -3 would mean 3 pixels of movement to the left (-x) every step.
 */
declare let hspeed: number;
/**
 * This read-only variable holds the unique identifying number for the instance. Every instance that you create - whether through code or by adding them to a room in the Room Editor - is given a number that is used internally to identify this instance and the variable id is what you can use to reference it.
 */
declare const id: Id.Instance;
/**
 * This built-in variable is created for every instance in a room and contains the layer ID value of the layer that the instance is assigned to.
 */
declare let layer: Id.Layer;
/**
 * This built-in variable can be read to find out if the instance is currently on a UI layer or not.
 */
declare const on_ui_layer: boolean;
/**
 * This variable can be read to find out if the instance is flagged as persistent or not, or it can used to set persistence to true (persistent) or false (not persistent) for the instance. A persistent instance is one that will be "carried over" from room to room, meaning (for example) that it only has to be created once at the start of the game and it will be present in all further rooms. Care should be taken with persistence as it is easy to lose track of persistent instances which can lead to problems later in the development of the game.
 */
declare let persistent: boolean;
/**
 * An instance can be flagged as solid through the object properties in the Object Editor, or by changing the value of this built-in variable. If solid is set to true then, when a collision is detected, the colliding instance is returned automatically to the position it was at in the step previous to the collision (and then any code or actions are run in the collision event). If it is set to false, all positioning must be dealt with through the collision event.
 */
declare let solid: boolean;
/**
 * This built-in variable stores the speed of the instance in pixels per step.
 */
declare let speed: number;
/**
 * An instance can be flagged as visible or not by setting this variable to true (visible) or false (invisible).
 */
declare let visible: boolean;
/**
 * This read-only variable indicates whether the object is managed by the rollback multiplayer system or not.
 */
declare const managed: boolean;
/**
 * vspeed is one of the built-in properties that all instances have and defines the vertical movement speed (along the y-axis) of the instance in pixels per step. So, a vspeed of 3 means 3 pixels of movement to the bottom (+y) every step, and a vspeed of -3 would mean 3 pixels of movement to the top (-y) every step.
 */
declare let vspeed: number;
/**
 * The x value of an instance is the horizontal position in the current room, measured in pixels. This value can be either 0, positive or negative, where 0 is the left-hand side of the room and moving right increases x, moving left decreases x (a negative value for x means that the instance has gone outside the left side of the room).
 */
declare let x: number;
/**
 * This built-in variable returns the previous x position for the instance. This variable will be set just before the start of the begin step event but it can also be set through code at any time, meaning you can give it your own custom value should that be necessary.
 */
declare let xprevious: number;
/**
 * This variable stores the initial x position of the instance when it is first created in the room. This is not a read-only variable and can be set as well as read.
 */
declare let xstart: number;
/**
 * The y value of an instance is the vertical position in the current room, measured in pixels. This value can be either 0, positive or minus, where 0 is the top of the room and moving down increases y, moving up decreases y (a negative value for y means that the instance has gone outside the top of the room).
 */
declare let y: number;
/**
 * This built-in variable returns the previous y position for the instance. This variable will be set to the current x position just before the start of the begin step event but it can also be set through code at any time, meaning you can give it your own custom value should that be necessary.
 */
declare let yprevious: number;
/**
 * This variable stores the initial y position of the instance when it is first created in the room. This is not a read-only variable and can be set as well as read.
 */
declare let ystart: number;
/**
 * This read-only variable returns the index of the object that the instance has been created from. This is not the same as the object name, which is a string and can be found using object_get_name(), as this function returns the index number, which is a unique value that GameMaker assigns to every object at the time of creation.
 */
declare const object_index: Asset.GMObject;
/**
 * This read-only variable returns the number of the event currently being called, where the number is actually referring to the "sub event" of the event, i.e.: for the step event the event number could be any one of the constants ev_step_normal, ev_step_begin, or ev_step_end. For a full list of constants that are available for the specific sub-events see event_perform().
 */
declare const event_number: Constant.EventNumber;
/**
 * This read-only variable returns the object index of the instance which is running the event being checked.
 */
declare const event_object: Asset.GMObject;
/**
 * This read-only variable returns the type of event currently being executed.
 */
declare const event_type: Constant.EventType;
/**
 * This variable can be used to get or to change the reaction of an instance when it reaches the end of the current path. Normally you would set this when you start the path using path_start() but you may wish to change this behaviour depending on any number of events in your game.
 */
declare let path_endaction: Constant.PathAction;
/**
 * The variable path_index is a read-only variable that holds the handle for a given path asset that has been assigned to an instance using the path_start() function.
 */
declare const path_index: Asset.GMPath;
/**
 * This variable holds the current orientation of the path that has been assigned to the instance when the function path_start() was called. When a path is created, its orientation is the default 0 degrees, but you can set this value to anything you wish using this. Remember that in GameMaker (unless you are using physics) the angles are calculated counter-clockwise, so setting the path orientation to 90° would rotate the path to the left.
 */
declare let path_orientation: number;
/**
 * This function can be used to get or set the position of an instance along a path. The value is normalised from 0 - 1, so if you set it to, for example, 0.5, the instance will be moved to exactly the middle of the path.
 */
declare let path_position: number;
/**
 * This variable can be used to get or to set the position of an instance along its current path in the previous step, and is a normalised value between 0 and 1 i.e.: 0 is the start position of the path and 1 would be the end position. It is similar to the xprevious and yprevious variables in how it works, only it is specific for paths. It can be useful for things like temporarily stopping a path follower if something is in the way.
 */
declare let path_positionprevious: number;
/**
 * This value can be used to get or to set the scale of the currently assigned path for the instance (as set by the function path_start()) with a default value of 1. This is a scalar value, so 1 is a scale of 1:1, while setting it to 2, for example, will be double the scale and setting it to 0.5 would be halving the scale.
 */
declare let path_scale: number;
/**
 * You can use this function to get or to set the speed of a path after it has been started using the function path_start(). You can use negative values to signify that the instance should follow the path in reverse.
 */
declare let path_speed: number;
/**
 * This variable holds the room index for the current room that your game is running.
 */
declare let room: Asset.GMRoom;
/**
 * This read-only variable returns the index of the very first room in the game (this is defined by the order in which the rooms appear in the Room Manager and not by the order in which they were created).
 */
declare const room_first: Asset.GMRoom;
/**
 * This variable holds the height of the current room in pixels. You can change this variable to change the height of the room at any time, and changes will be applied to the bottom of the room, as the origin is considered to be the top-left corner. So, for example, if the room is 480px in height and you set it to 640px, the room will be expanded downwards with an extra 180px added to the bottom.
 */
declare let room_height: number;
/**
 * This read-only variable returns the index of the very last room in the game (this is defined by the order in which the rooms appear in the Room Manager and not by the order in which they were created). Note that this variable will not recognise or take into consideration rooms that have been added dynamically using room_add() or room_duplicate().
 */
declare const room_last: Asset.GMRoom;
/**
 * This variable can be used to get and to set the persistent flag for the current room. If set to true the room is considered persistent, in which case each time you leave the room and come back again the state of the instances within that room will have been maintained. However if it is flagged as false, each time you return to the room it will be reset to its initial state.
 */
declare let room_persistent: boolean;
/**
 * This variable holds the width of the current room in pixels. You can change this variable to change the width of the room at any time.
 */
declare let room_width: number;
/**
 * This is a built-in variable that is part of the instance variables created for every object instance in your game. If the instance is being controlled by a sequence, this variable will return true, otherwise it will return false. This is a read-only variable and cannot be changed.
 */
declare let in_sequence: boolean;
/**
 * This is a built-in variable that is part of the instance variables created for every object instance in your game. If the instance is being controlled by a sequence, this variable will hold the sequence instance struct for the Sequence controlling the instance, otherwise it will be undefined. This is a read-only variable and cannot be changed.
 */
declare const sequence_instance: Struct.SequenceInstance;
/**
 * This is a built-in variable that is part of the instance variables created for every object instance in your game. This can be changed at any time but will only affect behaviour when the instance is being controlled by a sequence. In this case if this variable is set to true then the sequence will handle the drawing order of the instance, otherwise normal instance drawing will occur.
 */
declare let drawn_by_sequence: boolean;
/**
 * This read-only variable returns the y position (within the room) of the bottom of the bounding box for the instance, where the bounding box is defined by the maximum width and height of the mask for the instance (as set by the sprite_index or by the mask_index).
 */
declare const bbox_bottom: number;
/**
 * This read-only variable returns the position (along the x-axis) within the room of the left hand bounding box for the instance, where the bounding box is defined by the maximum width and height of the mask for the instance (as set by the sprite_index or by the mask_index).
 */
declare const bbox_left: number;
/**
 * This read-only variable returns the position within the room (along the x-axis) of the right hand side of the bounding box for the instance, where the bounding box is defined by the maximum width and height of the mask for the instance (as set by the sprite_index or by the mask_index).
 */
declare const bbox_right: number;
/**
 * This read-only variable returns the position within the room (along the y-axis) of the top of the bounding box for the instance, where the bounding box is defined by the maximum width and height of the mask for the instance (as set by the sprite_index or by the mask_index).
 */
declare const bbox_top: number;
/**
 * This read-only variable returns the collision space the instance is in.
 */
declare const collision_space: Enum.colspace;
/**
 * This variable is used to get or to set the alpha value for the sprite. Alpha is always calculated as a value between 0 and 1 where 0 is completely transparent and 1 is completely opaque.
 */
declare let image_alpha: number;
/**
 * This value sets the angle (rotation) of the sprite and is measured in degrees, with the right being 0º, up being 90º, left being 180º and down being 270º. Set this variable to 0 to reset the sprite to be drawn as was defined in the Sprite Editor.
 */
declare let image_angle: number;
/**
 * This variable controls the "tinting" of the instance sprite and the default value is -1 (but can also be c_white). Any other value (including internal colour constants like c_red, or c_aqua) will blend the specified colour with the original sprite.
 */
declare let image_blend: Constant.Color;
/**
 * This built-in variable holds the current frame of the instance's animation.
 */
declare let image_index: number;
/**
 * This read-only variable can be used to get the number of sub-images in a sprite that has been assigned to an instance (if you need the number of sub-images for a sprite other than the one assigned to the instance you should use sprite_get_number()). Please note that when there is (for example) 1 sub-image this variable will return 1 but the image_index of that sub-image is 0.
 */
declare const image_number: number;
/**
 * This variable determines the speed in which GameMaker will cycle through the sub-images for the current instance sprite. The speed value given is a multiplier, with 1 being the default value, and setting it to 0.5 will half the animation speed - as set in the Sprite Editor or Image Editor - while setting it to 2 will double it. If the sprite used has no sub-images, this variable will have no effect.
 */
declare let image_speed: number;
/**
 * This value sets the horizontal scaling applied to the sprite that has been assigned to the current instance. A scale of 1 indicates no scaling (1:1), smaller values will scale down (0.5, for example, will half the width of the sprite), larger values will scale up and negative values will flip the sprite and scale it unless the value used is exactly -1 (in which case the sprite is just flipped about its origin with no scaling).
 */
declare let image_xscale: number;
/**
 * This value sets the vertical scaling (along the y-axis) applied to the sprite that has been assigned to the current instance. A scale of 1 indicates no scaling (1:1), smaller values will scale down (0.5, for example, will half the height of the sprite), larger values will scale up and negative values will mirror the sprite and scale it unless the value used is exactly -1 (in which case the sprite is just mirrored along the y-axis with no scaling).
 */
declare let image_yscale: number;
/**
 * This variable holds the sprite_index used as the instance's collision mask, or -1 if no mask has been assigned and its actual sprite_index is used for collision checks. Setting the mask index means that you can have, for example, a sprite for the instance with an irregular shape, yet give it a circular collision mask that is gotten from a different sprite.
 */
declare let mask_index: Asset.GMSprite;
/**
 * This read-only variable returns the height of the sprite that has been assigned to the instance. This height is returned in pixels and will be dependent on the image_yscale. If you need the un-scaled height you should use sprite_get_height().
 */
declare const sprite_height: number;
/**
 * This variable holds the index of the current sprite for the instance, or -1 if the instance has no sprite associated with it.
 */
declare let sprite_index: Asset.GMSprite | -1;
/**
 * This read-only variable returns the width of the sprite that has been assigned to the instance. This width is returned in pixels and will be dependent on the image_xscale. If you need the un-scaled width you should use sprite_get_width().
 */
declare const sprite_width: number;
/**
 * This read-only variable returns the local xoffset (the x component of the origin as defined in the sprite editor) of the sprite that has been assigned to the instance. This xoffset is returned in pixels and will be dependent on the image_xscale. If you need the un-scaled xoffset you should use sprite_get_xoffset().
 */
declare const sprite_xoffset: number;
/**
 * This read-only variable returns the local yoffset (the y component of the origin as defined in the sprite editor) of the sprite that has been assigned to the instance. This yoffset is returned in pixels and will be dependent on the image_yscale. If you need the un-scaled yoffset you should use sprite_get_yoffset().
 */
declare const sprite_yoffset: number;
/**
 * This variable holds the index of the time line currently associated with the instance. You can set this to a particular time line to use that one, or set it to -1 to stop using a time line for the instance (if no time line is defined for the instance, -1 is returned too). Note that this does not start the time line - for that use the variable timeline_running.
 */
declare let timeline_index: Asset.GMTimeline;
/**
 * This variable will return whether the time line is looping (true) or not (false). You can change this variable to switch looping on or off and it works with a negative time line speed (if the time line position goes below 0 it will start again at the last defined moment).
 */
declare let timeline_loop: boolean;
/**
 * This variable holds the current position (moment) a time line is currently at. You can change this value to skip parts of the time line, or to repeat parts or to start the time line again from the beginning.
 */
declare let timeline_position: number;
/**
 * This variable holds current state of the assigned time line and will return true if it is running and false if it is not. You can also set this variable to either true or false to start and stop the time line at any time. it should be noted that a stopped time line is not reset, and so starting it again at a later time will start it from the exact moment that it was stopped at.
 */
declare let timeline_running: boolean;
/**
 * This built-in variable holds the speed of the timeline currently assigned to the instance.
 */
declare let timeline_speed: number;
/**
 * This array holds the unique camera ID assigned to the given viewport, and can be set to a new camera or read to get the current camera, returning -1 if no camera is assigned. You can have up to 8 viewports active in a room (array values 0 through 7), and can assign a camera to any of them by simply setting this variable to the camera ID value (as returned by the functions camera_create() or camera_create_view()). If you have set the camera to a viewport through the Room Editor, this variable will hold the camera ID for that port.
 */
declare let view_camera: Array<Id.Camera>;
/**
 * This read-only variable is only valid in the Draw Event and returns the current viewport being rendered. The return value will change during the draw event when you have various views as the draw event is called once for each viewport in succession.
 */
declare const view_current: number;
/**
 * This variable controls whether any viewports that are visible within the room are enabled or not. If you have viewports set to visible and then disable this option, the whole room will be drawn to the screen scaled to the window size instead of the different cameras being drawn through the viewports.
 */
declare let view_enabled: boolean;
/**
 * This variable can be used to get or to set the height of the specified viewport. The height of the viewport (or combined viewports if more than one are active) define the height of the game window or background canvas at the start of the game, so changing this value after the game has started will have no visible effect on the game window size unless called along with the function window_set_size(). If you have a larger or smaller port size than that assigned to the camera, then the camera view will be scaled down - or up - to fit.
 */
declare let view_hport: Array<number>;
/**
 * With this variable you can set the contents of a given viewport to draw to a surface, or get the current surface if one has been assigned to a viewport.
 */
declare let view_surface_id: Array<Id.Surface>;
/**
 * This variable can be used to find out if a particular viewport is currently visible or not. You can also set this variable to effectively turn "on" or "off" a view by setting the value to true (visible) or false (invisible). Note that even if you have a viewport set to visible, if viewports are not enabled (using the built-in variable view_enabled or enabling them in the Room Editor) then they will not be drawn to the screen.
 */
declare let view_visible: Array<boolean>;
/**
 * This variable can be used to get or to set the width of the specified viewport. The width of the viewport (or combined viewports if more than one are active) define the width of the game window or background canvas at the start of the game, so changing this value after the game has started will have no visible effect on the game window size unless called along with the function window_set_size(). If you have a larger or smaller port size than that assigned to the camera, then the camera view will be scaled down - or up - to fit.
 */
declare let view_wport: Array<number>;
/**
 * With this built-in array you can get or set the x position of the given viewport. The viewport is the area on the screen where the view is drawn, and you can have up to 8 active at any one time (the array is values from 0 to 7 inclusive to give 8 ports). Now, the default for GameMaker is that the game window (or background canvas) is the same size as the room, however when you activate viewports and cameras, this behaviour changes and the total size of the bounding box for all viewports is used. So, if you have two different viewports at two different positions, the total area that they cover defines the size of the game window.
 */
declare let view_xport: Array<number>;
/**
 * With this built-in array you can get or set the y position of the given viewport. The viewport is the area on the screen where the view is drawn, and you can have up to 8 active at any one time (the array is values from 0 to 7 inclusive to give 8 ports). Now, the default for GameMaker is that the game window (or background canvas) is the same size as the room, however when you activate viewports and cameras, this behaviour changes and the total size of the bounding box for all viewports is used. So, if you have two different viewports at two different positions, the total area that they cover defines the size of the game window.
 */
declare let view_yport: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_angle: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_xview: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_yview: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_wview: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_hview: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_hborder: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_vborder: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_hspeed: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_vspeed: Array<number>;
/**
 * Reserved, obsolete variable (won't behave correctly, do not use).
 * @deprecated
 */
declare const view_object: Array<number>;
/**
 * This read-only variable returns true when the game is being played in debug mode and false when being played as normal.
 */
declare const debug_mode: boolean;
/**
 * This read-only variable holds the current fps as an integer value.
 */
declare const fps: number;
/**
 * This read-only variable holds the current real fps as an integer value.
 */
declare const fps_real: number;
/**
 * This global scope, built-in variable can be used to access the application surface using any of the surface functions. This surface is permanently available and is where the bulk of drawing is done by GameMaker.
 */
declare const application_surface: Id.Surface;
/**
 * This will return the directory where the game executable is stored. However this may not always be useful, particularly as some devices run the exe from a *.zip file, so this would return the same no matter where the game is actually running from.
 */
declare const program_directory: string;
/**
 * This can be used to return the temporary directory created for your game each time it is run (including trailing "\""). This directory will hold files and can be accessed while the game is running, but it will be removed (along with all files that it contains) when the game is closed.
 */
declare const temp_directory: string;
/**
 * This can be used to return the cache directory created for your game (including trailing "\"). This directory will hold files and can be accessed while the game is running, but it may be removed by the system later.
 */
declare const cache_directory: string;
/**
 * working_directory can actually return two different values depending on what you are using it for. If you are writing a file to disk, working_directory points to the area of local storage that is reserved for your game on the target device (in windows this is "%LOCALAPPDATA%/gamedir/" where the "gamedir" is the directory with the name of your game). However, when reading from disk, working_directory can be either the local storage or the area where the included files are stored.
 */
declare const working_directory: string;
/**
 * This variable is global in scope and is used to hold a DS Map when used in the Gesture Events, and -1 at all other times. The actual contents of the DS map will depend on the type of gesture event that triggered it, so refer to the individual sections for those events.
 */
declare const event_data: Id.DsMap;
/**
 * With this variable you can get the keycode of the key that is currently being pressed and it will return 0 if no key is being pressed when the check is done.
 */
declare let keyboard_key: Constant.VirtualKey;
/**
 * This variable stores a string of the last key pressed. This variable is not read-only and you can change it, for example to set it to "" (an empty string) if you handled it already.
 */
declare let keyboard_lastchar: string;
/**
 * This variable refers to the value that keyboard_key was in the previous frame, returning the keycode of that key (all standard keycode constants are returned). This variable is not read-only and you can change it, for example to set it to -1 if you handled it already.
 */
declare let keyboard_lastkey: Constant.VirtualKey;
/**
 * This variable holds a string containing the last (at most) 1024 characters typed on the keyboard. This string will only contain printable characters typed, but it will correctly respond to pressing the backspace key by erasing the last character. This variable is not read-only and you can change it, for example to set it to "" (an empty string) if you handled it already, and you can use the String Functions to manipulate it. Note that when using the on-screen Virtual Keyboard, only this variable will be updated with the keyboard input.
 */
declare let keyboard_string: string;
/**
 * This read-only variable returns the mouse button that is currently being pressed (currently, as in, this step) and can return any of the special mouse constants except mb_any.
 */
declare let mouse_button: Constant.MouseButton;
/**
 * This variable returns the last mouse button that was pressed and can return any of the special mouse constants except mb_any (you may also set this variable to one of the constants).
 */
declare let mouse_lastbutton: Constant.MouseButton;
/**
 * This read-only variable returns the current x axis position of the mouse within the room.
 */
declare const mouse_x: number;
/**
 * This read-only variable returns the current y axis position of the mouse within the room.
 */
declare const mouse_y: number;
/**
 * Setting this variable will instruct GameMaker to use the designated sprite as a cursor (basically setting it to the current mouse x/y position every step). The default value is -1 which is no sprite for the cursor, but you can assign any sprite index from the game assets or that has been imported from an external resource. Please note that there is no way to control the animation speed or image_index, so if the sprite has sub-images, these will be cycled at the same speed as the room speed. To remove the cursor sprite, you can set this variable to -1 again.
 */
declare let cursor_sprite: Asset.GMSprite;
/**
 * This read-only variable returns the display name of your game for the target platform, as set in the Game Options.
 */
declare const game_display_name: string;
/**
 * This read-only variable returns the unique identifier for the game you have created. You can use this if you need a unique file name, or anything else that needs something to identify your game only. This can be set in the Game Options.
 * @deprecated
 */
declare const game_id: number;
/**
 * This read-only variable returns the display name of your game for the target platform in a "save-friendly" format for the target platform. If the display name contains any characters that are not permitted for a file name, they will be replaced automatically with "_". The display name can be set in the Game Options. Note that since there are no restrictions on file names for HTML5, this string will probably be the same as that returned by game_display_name.
 */
declare const game_project_name: string;
/**
 * This read-only variable will return the full path ID of the directory that is used by your game to save files to. This directory may or may not be visible to other applications, depending on the platform, and on the HTML5 target it will return an empty string.
 */
declare const game_save_id: string;
/**
 * This read-only variable will return the day as a value from 1 to 31, depending on the month.
 */
declare const current_day: number;
/**
 * This read-only variable will return the hour that corresponds to the current moment based on the default time zone for the system (i.e.: local time). You can change the base time zone to use with the function date_set_timezone().
 */
declare const current_hour: number;
/**
 * This read-only variable will return the minutes that correspond to the current moment.
 */
declare const current_minute: number;
/**
 * This read-only variable returns the current month as a numeric value where 1 is January and 12 is December.
 */
declare const current_month: number;
/**
 * This read-only variable will return the seconds that correspond to the current moment.
 */
declare const current_second: number;
/**
 * This read-only variable will return the number of milliseconds that have passed since the game was started.
 */
declare const current_time: number;
/**
 * This read-only variable will return the weekday as a value, where Sunday is 0 and Saturday is 6.
 */
declare const current_weekday: number;
/**
 * This read-only variable will return the current year.
 */
declare const current_year: number;
/**
 * This variable returns the frame delta time, which is the time difference between the previous frame and the current frame. This value is in microseconds, where 1 microsecond is 1,000,000th of a second.
 */
declare const delta_time: number;
/**
 * This read-only variable holds one of various constants that GameMaker has to tell you which browser you are currently running the game in (if any).
 */
declare const os_browser: Constant.BrowserType;
/**
 * This read-only variable holds one of various constant values to tell you which device you are currently running the game on. Note this variable is deprecated in favour of the function os_get_info() which returns more accurate information on the device running the game.
 * @deprecated
 */
declare const os_device: Constant.DeviceType;
/**
 * This read-only variable holds one of various constant GameMaker has to tell you which operating system the game has been created for. Note that this is not necessarily the same as the OS of the device running it, since - for example - your game could be running on an Amazon Fire OS, but will have been built for the Android platform (in which case os_type will be os_android).
 */
declare const os_type: Constant.OperatingSystem;
/**
 * This variable will tell you the version number for the OS that is running your game. For example, if you are running it on Windows 10, os_version will be equal to 655360.
 */
declare const os_version: number;
/**
 * This variable controls whether or not the instance is currently "active". Setting it to false will prevent the instance from participating in the physics world, and setting it to true will have it participating again. Please note that this is not the same as deactivating the instance, as the instance is still visible on the screen and can still be changed through code, rather this function just prevents it from participating in the physics simulation
 */
declare let phy_active: boolean;
/**
 * This variable can be used to set the angular damping of the instance, or it can be used to get the current angular damping. The damping is the amount of "resistance" to angular rotation that the physics-enabled instance has, with a lower value permitting the instance to rotate faster after a collision (for example) and a higher value making it require a more forceful push and rotate slower.
 */
declare let phy_angular_damping: number;
/**
 * This variable can be used to set the angular velocity of the instance, or it can be used to get the current angular velocity, in degrees per second and the value used can be either positive (for clockwise rotation) or negative (for anticlockwise rotation). If you set this on an instance that was previously static (i.e.: it has a density of 0) it will become a kinematic object and begin rotating.
 */
declare let phy_angular_velocity: number;
/**
 * This variable defines whether or not the instance is extremely fast moving (for example a bullet). The default value is false but if set to true this tells GameMaker that the instance will be moving at such high speeds that it will require more expensive collision detection to ensure it doesn't pass through other instances undetected
 */
declare let phy_bullet: boolean;
/**
 * This read-only variable returns the number of points of collision detected between the two objects in the collision.
 */
declare const phy_collision_points: number;
/**
 * This read-only array returns the x position of all points detected in a collision between two physics-enabled instances.
 */
declare const phy_collision_x: Array<number>;
/**
 * This read-only array returns the y position of all points detected in a collision between two physics-enabled instances.
 */
declare const phy_collision_y: Array<number>;
/**
 * This read-only variable returns the x component of the collision normal corresponding to the phy_collision_x array value. For each contact point there is an associated contact normal (which is usually the same normal for all points of contact in the collision). This contact normal is a unit vector that points from one instance in the collision to the other.
 */
declare const phy_col_normal_x: number;
/**
 * This read-only variable returns the y component of the collision normal corresponding to the phy_collision_y array value. For each contact point there is an associated contact normal (which is usually the same normal for all points of contact in the collision). This contact normal is a unit vector that points from one instance in the collision to the other.
 */
declare const phy_col_normal_y: number;
/**
 * This read-only variable will return the x position of the instance's center of mass. This is calculated automatically based on the density, inertia and mass of the instance as defined by the appropriate functions.
 */
declare const phy_com_x: number;
/**
 * This read-only variable will return the y position of the instance's center of mass. This is calculated automatically based on the density, inertia and mass of the instance as defined by the appropriate functions.
 */
declare const phy_com_y: number;
/**
 * A dynamic instance is one that is fully simulated within the physics world and this read-only variable will return true if the instance being checked is fully simulated or false if it is not.
 */
declare const phy_dynamic: boolean;
/**
 * This variable can be used to set whether or not the instance can be affected by rotational forces (default is false). If this is set to true, no external force (either from coded impulses or forces, or from collisions) will affect the rotation value of the instance and this would have to be set manually using the phy_rotation variable.
 */
declare let phy_fixed_rotation: boolean;
/**
 * This variable holds the inertia for a physics-enabled instance. Inertia is the measure of how hard it is to make something start or stop moving, so the lower the value for this read-only variable and the easier it will be to set the instance in motion, while higher values will require more force to start it moving.
 */
declare const phy_inertia: number;
/**
 * This read-only variable will return true if the instance is classed as being a kinematic object, or false if it is not. A kinematic instance is one that has infinite mass (a density of 0) but can move. So, to make an instance kinematic, you would first create a static instance and then set one or more of the instance variables related to movement (i.e.: phy_speed_x, phy_speed_y, or phy_angular_velocity)
 */
declare const phy_kinematic: boolean;
/**
 * This variable can be used to set the linear damping of the instance, or it can be used to get the current linear damping. The damping is the amount of "resistance" to forward movement that the physics-enabled instance has, with a lower value permitting the instance to move and accelerate faster and a higher value making it require a more forceful push.
 */
declare let phy_linear_damping: number;
/**
 * This variable can be used to get or change the x component of the instance's linear velocity vector and is defined in pixels per second (for pixels per step, see phy_speed_x). Altering this for a static instance (i.e.: an instance with 0 density) will turn it into a kinematic instance.
 */
declare let phy_linear_velocity_x: number;
/**
 * This variable can be used to get or change the y component of the instance's linear velocity vector and is defined in pixels per second (for pixels per step, see phy_speed_y). Altering this for a static instance (i.e.: an instance with 0 density) will turn it into a kinematic instance.
 */
declare let phy_linear_velocity_y: number;
/**
 * This read-only variable returns the mass of the instance in kilograms. This value is calculated automatically based on the surface area of the assigned fixtures and their density values, but it can be changed using the function physics_mass_properties().
 */
declare const phy_mass: number;
/**
 * This variable can be used to get (or to set) the x position of the instance within the game room physics world. Please note that the physics world may present errors when instances are moved by directly setting this variable as it will interrupt the continuous simulation. This variable is the physics equivalent of the instance variable x.
 */
declare let phy_position_x: number;
/**
 * This variable can be used to get (or to set) the previous x position of the instance within the game room physics world. This is the position of the instance within the physics world in the previous step to the current one.
 */
declare const phy_position_xprevious: number;
/**
 * This variable can be used to get (or to set) the y position of the instance within the game room physics world. Please note that the physics world may present errors when instances are moved by directly setting this variable as it will interrupt the continuous simulation. This variable is the physics equivalent of the instance variable y.
 */
declare let phy_position_y: number;
/**
 * This variable can be used to get (or to set) the previous y position of the instance within the game room physics world. This is the position of the instance within the physics world in the previous step to the current one.
 */
declare const phy_position_yprevious: number;
/**
 * This variable can be used to get (or to set) the angle of the instance's fixture in degrees, similar to setting or getting the image_angle. However, note that in the physics world rotations are calculated in the opposite way to the normal GameMaker game world, meaning that vector functions like point_direction()should have their return values modified (simply making positive to negative should resolve this).
 */
declare let phy_rotation: number;
/**
 * This read-only variable returns whether or not the instance is currently "sleeping" (true) or not (false), A "sleeping" instance is one that is not actively engaged in any physical simulation. GameMaker will put objects to sleep to save simulation cycles when an instance is at rest and not in collision with another instance.
 */
declare const phy_sleeping: boolean;
/**
 * This read-only variable returns the current speed of the physics-enabled instance, defined in pixels per step. Should you need to change this value, you must do so by changing the x and y vectors using the variables phy_speed_x and phy_speed_y.
 */
declare const phy_speed: number;
/**
 * This variable can be used to get or change the x component of the instance's linear speed vector and is defined in pixels per step (for pixels per second, see phy_linear_velocity_x). Altering this for a static instance (i.e.: an instance with 0 density) will turn it into a kinematic instance.
 */
declare let phy_speed_x: number;
/**
 * This variable can be used to get or change the y component of the instance's linear speed vector and is defined in pixels per step (for pixels per second, see phy_linear_velocity_y). Altering this for a static instance (i.e.: an instance with 0 density) will turn it into a kinematic instance.
 */
declare let phy_speed_y: number;
/**
 * This variable holds the height (in pixels) of the browser the game is being run in. If no browser is present then the window size is returned.
 */
declare const browser_height: number;
/**
 * This variable holds the width (in pixels) of the browser the game is being run in. If no browser is present then the window size is returned.
 */
declare const browser_width: number;
/**
 * This read-only variable will return whether WebGL is enabled (true) or not (false) for your game. It will only work for those games running through a browser (i.e.: HTML5), and for all other platforms it will return true.
 */
declare const webgl_enabled: boolean;
/**
 * @deprecated
 */
declare const argument_relative: number;

declare let argument: GML.ArgumentIdentity;

declare let argument0: GML.ArgumentIdentity;

declare let argument1: GML.ArgumentIdentity;

declare let argument2: GML.ArgumentIdentity;

declare let argument3: GML.ArgumentIdentity;

declare let argument4: GML.ArgumentIdentity;

declare let argument5: GML.ArgumentIdentity;

declare let argument6: GML.ArgumentIdentity;

declare let argument7: GML.ArgumentIdentity;

declare let argument8: GML.ArgumentIdentity;

declare let argument9: GML.ArgumentIdentity;

declare let argument10: GML.ArgumentIdentity;

declare let argument11: GML.ArgumentIdentity;

declare let argument12: GML.ArgumentIdentity;

declare let argument13: GML.ArgumentIdentity;

declare let argument14: GML.ArgumentIdentity;

declare let argument15: GML.ArgumentIdentity;
/**
 * This read-only variable holds the number of "arguments" that are passed through to a script function or a method.
 */
declare const argument_count: number;

declare const in_collision_tree: boolean;
/**
 * @deprecated
 */
declare let room_speed: number;
/**
 * @deprecated
 */
declare let room_caption: string;
/**
 * @deprecated
 */
declare let score: number;
/**
 * @deprecated
 */
declare let lives: number;
/**
 * @deprecated
 */
declare let health: number;
/**
 * @deprecated
 */
declare let show_score: boolean;
/**
 * @deprecated
 */
declare let show_lives: boolean;
/**
 * @deprecated
 */
declare let show_health: boolean;
/**
 * @deprecated
 */
declare let caption_score: string;
/**
 * @deprecated
 */
declare let caption_lives: string;
/**
 * @deprecated
 */
declare let caption_health: string;
/**
 * @deprecated
 */
declare const event_action: number;
/**
 * @deprecated
 */
declare const gamemaker_pro: boolean;
/**
 * @deprecated
 */
declare const gamemaker_registered: boolean;
/**
 * @deprecated
 */
declare let error_occurred: boolean;
/**
 * @deprecated
 */
declare let error_last: boolean;
/**
 * @deprecated
 */
declare let background_colour: Constant.Color;
/**
 * @deprecated
 */
declare let background_showcolour: number;
/**
 * @deprecated
 */
declare let background_color: Constant.Color;
/**
 * @deprecated
 */
declare let background_showcolor: boolean;
/**
 * This read-only variable holds the different levels of AA that the device running the game can display.
 */
declare const display_aa: number;
/**
 * This global variable holds a DS Map when used in the Asynchronous Events, and an invalid DS Map handle (-1) at all other times.
 */
declare const async_load: Id.DsMap;
/**
 * @deprecated
 */
declare const iap_data: undefined;
/**
 * This global variable contains the network tick and can be used in rollback networking instead of wall clock time
 */
declare const rollback_current_frame: number;
/**
 * This global variable contains the frame number for which we have confirmed input for all players
 */
declare const rollback_confirmed_frame: number;
/**
 * This global variable contains the last event id that was fired
 */
declare const rollback_event_id: number;
/**
 * This global variable contains a struct with parameters for the last event that was fired
 */
declare const rollback_event_param: Asset.GMObject;
/**
 * This global variable contains the flag if the game is currently running
 */
declare const rollback_game_running: boolean;
/**
 * This global variable contains the gx games API url
 */
declare const rollback_api_server: string;
/**
 * This identifies which player the instance belongs to in the rollback networking system.
 */
declare const player_id: number;
/**
 * This identifies if this instance belongs to the local player in the rollback networking system.
 */
declare const player_local: boolean;
/**
 * The URL to the avatar associated with this player in Opera GX, for rollback networking.
 */
declare const player_avatar_url: string;
/**
 * A sprite of the avatar associated with this player in Opera GX, for rollback networking.
 */
declare const player_avatar_sprite: Asset.GMSprite;
/**
 * This identifies if this instance belongs a Guest or User account in the rollback networking system.
 */
declare const player_type: string;
/**
 * This is the user id in Opera GX in the rollback networking system.
 */
declare const player_user_id: string;
/**
 * This global variable contains a struct with parameters for the last Wallpaper Config event that was fired.
 */
declare const wallpaper_config: Asset.GMObject;

/**
 * This function gets the value at a specific point in time from a channel struct.
 */
declare function animcurve_channel_evaluate(channel_struct: Struct.AnimCurveChannel, posx: number): number;
/**
 * This function creates a new animation curve channel struct.
 */
declare function animcurve_channel_new(): Struct.AnimCurveChannel;
/**
 * This function creates an empty animation curve struct, ready for you to populate with channel data.
 */
declare function animcurve_create(): Struct.AnimCurve;
/**
 * This function destroys an animation curve previously created with the function animcurve_create().
 */
declare function animcurve_destroy(curve_struct: Struct.AnimCurve): undefined;
/**
 * This function returns a struct containing all the data for the given animation curve.
 */
declare function animcurve_get(curve_id: Asset.GMAnimCurve): Struct.AnimCurve;
/**
 * This function returns the struct containing the channel data for the channel specified in an animation curve asset or struct (as returned by animcurve_get()).
 */
declare function animcurve_get_channel(curve_struct_or_id: Asset.GMAnimCurve | Struct.AnimCurve, channel_name_or_index: string | number): Struct.AnimCurveChannel;
/**
 * This function returns the index value for any given animation curve channel. Note that if the curve or channel does not exist then you will get an error.
 */
declare function animcurve_get_channel_index(curve_struct_or_id: Struct.AnimCurve, channel_name: string): number;
/**
 * This function creates a new points struct (posx, value) to be added to an animation curve channel.
 */
declare function animcurve_point_new(): Struct.AnimCurvePoint;
/**
 * This function adds one or more tag strings to any asset from the Asset Browser. You supply either the asset name (as a string) or its asset index, as well as either a single tag string or an array where each item is a single tag string.
 */
declare function asset_add_tags(name_or_index: string | Asset.Any, tags: string | Array<string>, asset_type?: Constant.AssetType): boolean;
/**
 * This function clears all tags present on the given asset from the Asset Browser and returns whether any tags were removed. You supply either the asset name (as a string) or its asset index, and if you supply an asset index value, then you will need to supply the optional asset type argument (a constant), as assets of different types can have the same index, even though they cannot have the same name.
 */
declare function asset_clear_tags(name_or_index: string | Asset.Any, asset_type?: Constant.AssetType): boolean;
/**
 * This function gets the handle for a game asset from its name. If the asset is not found, the function will return a value of -1, otherwise it will return the handle for the asset being checked.
 */
declare function asset_get_index(name: string | Asset.Any): Asset.Any;
/**
 * This function retrieves all tags assigned to an asset from the Asset Browser. You supply either the asset name (as a string) or its asset index, and the function will return an array of tags for that asset. If no tags are found or there is an error (i.e.: the name string given doesn't exist) then the returned array will be empty.
 */
declare function asset_get_tags(name_or_index: string | Asset.Any, asset_type?: Constant.AssetType): Array<string>;
/**
 * This function gets the type of asset being referenced from its name.
 */
declare function asset_get_type(name_or_ref: string | Asset.Any): Constant.AssetType;
/**
 * This function returns an array containing IDs of all existing assets of given type.
 */
declare function asset_get_ids(asset_type: Constant.AssetType): Array<Asset.Any>;
/**
 * This function checks if one or more tag strings is assigned to the given asset from the Asset Browser. You supply either the asset name (as a string) or its asset index, as well as either a single tag string or an array where each item is a single tag string.
 */
declare function asset_has_tags(name_or_index: string | Asset.Any, tags: string | Array<string>, asset_type?: Constant.AssetType): boolean;
/**
 * This function removes one or more tag strings to any asset from the Asset Browser. You supply either the asset name (as a string) or its asset index, as well as either a single tag string or an array where each item is a single tag string.
 */
declare function asset_remove_tags(name_or_index: string | Asset.Any, tags: string | Array<string>, asset_type?: Constant.AssetType): boolean;
/**
 * This function retrieves the names of all assets that have been assigned the given tag or tags. You supply either a single tag string or an array, where each item in the array is a tag string.
 */
declare function tag_get_assets(tags: string | Array<string>): Array<string>;
/**
 * This function gets all the assets of a given type that have the given tags assigned to them. You supply either a single tag (as a string) or an array, where each item in the array is a tag (as a string), as well as the type of asset to check.
 */
declare function tag_get_asset_ids(tags: string | Array<string>, asset_type: Constant.AssetType): Array<Asset.Any>;
/**
 * With this function you can set how many audio channels are available for playing audio in GameMaker.
 */
declare function audio_channel_num(num: number): undefined;
/**
 * With this function you can create a new sound index which can then be used in the regular audio functions to stream audio directly from an external OGG file source.
 */
declare function audio_create_stream(filename: string): Asset.GMSound;
/**
 * This function can be used to display debug information about the audio system, with true switching it on and false to switch it off. Enabling this will display the Audio window of The Debug Overlay.
 */
declare function audio_debug(enable: boolean): undefined;
/**
 * This function can be used to toggle whether errors returned from the audio engine should throw runtime errors which abort the game.
 */
declare function audio_throw_on_error(enable: boolean): undefined;
/**
 * This function destroys a previously created audio stream from memory. Any further calls to the sound after it has been destroyed will give an error.
 */
declare function audio_destroy_stream(sound: Asset.GMSound): number;
/**
 * This function returns whether a Sound Asset exists. The sound to check can either be a single instance of a sound (the index for individual sounds being played can be stored in a variable when using the audio_play_sound or audio_play_sound_at functions) or a sound asset.
 */
declare function audio_exists(index: Asset.GMSound | Id.Sound): boolean;
/**
 * This function sets the audio falloff model used in your game.
 */
declare function audio_falloff_set_model(model: Constant.AudioFalloff): undefined;
/**
 * With this function you can get the absolute value for the global volume of all sounds and music for a specific listener.
 */
declare function audio_get_master_gain(listenerindex: number | Id.AudioListener): number;
/**
 * This function will return the name of a given audio asset as a string.
 */
declare function audio_get_name(index: Id.Sound | Asset.GMSound): string;
/**
 * This function returns the type of the given sound asset, which can be either streamed (1) or in memory (0).
 */
declare function audio_get_type(index: Id.Sound | Asset.GMSound): number;
/**
 * This function will check the given sound to see if it is currently paused.
 */
declare function audio_is_paused(index: Id.Sound | Asset.GMSound): boolean;
/**
 * This function will check the given sound to see if it is currently playing.
 */
declare function audio_is_playing(index: Id.Sound | Asset.GMSound): boolean;
/**
 * With this function you can set the absolute value for the global volume of all sounds and music.
 */
declare function audio_master_gain(gain: number): undefined;
/**
 * With this function you can pause all sounds that are currently playing.
 */
declare function audio_pause_all(): undefined;
/**
 * With this function you can pause any sound that is currently playing.
 */
declare function audio_pause_sound(index: Id.Sound | Asset.GMSound): undefined;
/**
 * This function plays any Sound Asset in your game.
 */
declare function audio_play_sound(index: Asset.GMSound, priority: number, loop: boolean, gain?: number, offset?: number | undefined, pitch?: number, listener_mask?: number): Id.Sound;
/**
 * With this function you can play any sound asset at a given position within the audio space.
 */
declare function audio_play_sound_at(index: Asset.GMSound, x: number, y: number, z: number, falloff_ref: number, falloff_max: number, falloff_factor: number, loop: boolean, priority: number, gain?: number, offset?: number | undefined, pitch?: number, listener_mask?: number): Id.Sound;
/**
 * This function plays any sound asset in your game using any combination of parameters.
 */
declare function audio_play_sound_ext(params: Record<string, unknown>): Id.Sound;
/**
 * This function returns the Sound Asset that was used to play the given Sound Instance ID. The sound must be active (i.e. currently playing) for this function to return the correct value, otherwise it will throw a fatal error.
 */
declare function audio_sound_get_asset(index: Id.Sound): Asset.GMSound;
/**
 * With this function you can resume all sounds that have been paused previously.
 */
declare function audio_resume_all(): undefined;
/**
 * With this function you can resume any sound that is currently paused (after using the function audio_pause_sound()).
 */
declare function audio_resume_sound(index: Asset.GMSound | Id.Sound): undefined;
/**
 * With this function you can set the absolute value for the global volume of all sounds and music for a specific listener. The default listener index is 0, but you can use the function audio_get_listener_info() to get the different indices available for the target platform.
 */
declare function audio_set_master_gain(listenerindex: number | Id.AudioListener, gain: number): undefined;
/**
 * With this function you can fade a sound in or out over a given length of time, or it can be used to set the sound gain instantly.
 */
declare function audio_sound_gain(index: Asset.GMSound | Id.Sound, volume: number, time?: number): undefined;
/**
 * This function will return the current gain value for the given sound.
 */
declare function audio_sound_get_gain(index: Asset.GMSound | Id.Sound): number;
/**
 * This function will return the bit-mask data that defines which audio listeners a sound should be played from.
 */
declare function audio_sound_get_listener_mask(soundid: Asset.GMSound | Id.Sound): number;
/**
 * This function can be used to get the pitch of a given sound.
 */
declare function audio_sound_get_pitch(index: Asset.GMSound | Id.Sound): number;
/**
 * This function will get the position (in seconds) within the sound file for the sound to play from.
 */
declare function audio_sound_get_track_position(index: Asset.GMSound | Id.Sound): number;
/**
 * This function can be used to check if the given sound index can be played currently.
 */
declare function audio_sound_is_playable(index: Asset.GMSound | Id.Sound): boolean;
/**
 * This function returns the length of the given sound in seconds.
 */
declare function audio_sound_length(index: Asset.GMSound | Id.Sound): number;
/**
 * This function changes the pitch of the given sound asset or instance.
 */
declare function audio_sound_pitch(index: Asset.GMSound | Id.Sound, pitch: number): undefined;
/**
 * This function can be used to set the the bit-mask for a sound so that it will play only from those listeners specified.
 */
declare function audio_sound_set_listener_mask(soundid: Asset.GMSound | Id.Sound, mask: number): undefined;
/**
 * This function will set the position (in seconds) for the given sound ID or asset.
 */
declare function audio_sound_set_track_position(index: Asset.GMSound | Id.Sound, time: number): undefined;
/**
 * This function will set the state of a playing sound's loop section.
 */
declare function audio_sound_loop(index: Id.Sound, state: boolean): undefined;
/**
 * This function will return the state of a playing sound's loop section.
 */
declare function audio_sound_get_loop(index: Id.Sound): boolean;
/**
 * This function will set the offset (in seconds) of the start of a sound's loop section.
 */
declare function audio_sound_loop_start(index: Asset.GMSound | Id.Sound, time: number): undefined;
/**
 * This function will return the offset (in seconds) of the start of a sound's loop section.
 */
declare function audio_sound_get_loop_start(index: Asset.GMSound | Id.Sound): number;
/**
 * This function will set the offset (in seconds) of the end of a sound's loop section.
 */
declare function audio_sound_loop_end(index: Asset.GMSound | Id.Sound, time: number): undefined;
/**
 * This function will return the offset (in seconds) of the end of a sound's loop section.
 */
declare function audio_sound_get_loop_end(index: Asset.GMSound | Id.Sound): number;
/**
 * This function will stop all sounds that are currently playing.
 */
declare function audio_stop_all(): undefined;
/**
 * This function will stop the given sound if it is currently playing. This includes all sounds that have been paused using audio_pause_sound or audio_pause_all.
 */
declare function audio_stop_sound(index: Asset.GMSound | Id.Sound): undefined;
/**
 * This function can be used to check and see if the audio system has been initialised, or if the audio context is running.
 */
declare function audio_system_is_available(): boolean;
/**
 * This function can be used to check if the audio engine has been initialised, after which all audio functions can be called normally.
 */
declare function audio_system_is_initialised(): boolean;
/**
 * With this function you can create a new sound from the contents of a buffer.
 */
declare function audio_create_buffer_sound(bufferId: Id.Buffer, bufferFormat: Constant.BufferDataType, bufferRate: number, bufferOffset: number, bufferLength: number, bufferChannels: Constant.AudioChannelType): Asset.GMSound;
/**
 * This function prepares a buffer queue for audio.
 */
declare function audio_create_play_queue(queueformat: Constant.BufferDataType, queuerate: number, queuechannels: number): number;
/**
 * With this function you can free up the pointer index value associated with the sound ID.
 */
declare function audio_free_buffer_sound(index: number | Asset.GMSound): undefined;
/**
 * This function is used to free up the memory associated with the given audio queue.
 */
declare function audio_free_play_queue(queueindex: number): undefined;
/**
 * This function will return the number of audio recording sources (like microphones, etc.) currently available to your game.
 */
declare function audio_get_recorder_count(): number;
/**
 * This function will return a DS Map with information about the given recorder source index.
 */
declare function audio_get_recorder_info(recorder_index: number): number;
/**
 * This function will add the data from a buffer into the audio queue that you previously created using the function audio_create_play_queue().
 */
declare function audio_queue_sound(queueindex: number, bufferid: Id.Buffer, bufferoffset: number, bufferlength: number): undefined;
/**
 * This function will start recording audio from the recorder source indexed.
 */
declare function audio_start_recording(recorder_index: number): number;
/**
 * This function will stop recording on the given recorder channel (the channel index is returned when you call the function audio_start_recording()).
 */
declare function audio_stop_recording(channel_index: number): undefined;
/**
 * This function creates a new audio emitter and returns the index for it.
 */
declare function audio_emitter_create(): Id.AudioEmitter;
/**
 * This function returns whether an audio emitter exists (true) or not (false).
 */
declare function audio_emitter_exists(index: Id.AudioEmitter): boolean;
/**
 * With this function you can set the fall-off distance for an emitter.
 */
declare function audio_emitter_falloff(emitter: Id.AudioEmitter, falloff_ref: number, falloff_max: number, falloff_factor: number): undefined;
/**
 * With this function you can remove the given emitter from memory.
 */
declare function audio_emitter_free(emitter: Id.AudioEmitter): undefined;
/**
 * This function sets the maximum gain (volume) for the sound.
 */
declare function audio_emitter_gain(emitter: Id.AudioEmitter, gain: number, time?: number): undefined;
/**
 * This function returns the current gain (volume) set for the given audio emitter, normally between 0 and 1, where 0 is silent and 1 is full volume.
 */
declare function audio_emitter_get_gain(emitter: Id.AudioEmitter): number;
/**
 * This function will return the bit-mask data that defines which audio listeners an emitter should play sounds from.
 */
declare function audio_emitter_get_listener_mask(emitterid: Id.AudioEmitter): number;
/**
 * This function returns the current pitch value set for the given audio emitter.
 */
declare function audio_emitter_get_pitch(emitter: Id.AudioEmitter): number;
/**
 * This function returns the current velocity along the x axis for the given audio emitter.
 */
declare function audio_emitter_get_vx(emitter: Id.AudioEmitter): number;
/**
 * This function returns the current velocity along the y axis for the given audio emitter.
 */
declare function audio_emitter_get_vy(emitter: Id.AudioEmitter): number;
/**
 * This function returns the current velocity along the z axis for the given audio emitter.
 */
declare function audio_emitter_get_vz(emitter: Id.AudioEmitter): number;
/**
 * This function returns the current x position of the given audio emitter.
 */
declare function audio_emitter_get_x(emitter: Id.AudioEmitter): number;
/**
 * This function returns the current y position of the given audio emitter.
 */
declare function audio_emitter_get_y(emitter: Id.AudioEmitter): number;
/**
 * This function returns the current z position of the given audio emitter.
 */
declare function audio_emitter_get_z(emitter: Id.AudioEmitter): number;
/**
 * This function can be used to change the pitch of all sounds emitted from the given emitter. It is a pitch multiplier, in that the input value multiplies the current pitch by that amount, so the default value of 1 is no pitch change, while a value of less than 1 will lower the pitch and greater than 1 will raise the pitch.
 */
declare function audio_emitter_pitch(emitter: Id.AudioEmitter, pitch: number): undefined;
/**
 * With this function you can change the position of an audio emitter within the 3D audio space. The position will affect the sound in different ways depending on where the listener is positioned within the audio space too (the default position is (0, 0, 0)).
 */
declare function audio_emitter_position(emitter: Id.AudioEmitter, x: number, y: number, z: number): undefined;
/**
 * This function can be used to set the the bit-mask for an emitter so that all sounds played through the emitter will play only from those listeners specified.
 */
declare function audio_emitter_set_listener_mask(emitterid: Id.AudioEmitter, mask: number): undefined;
/**
 * This function can be used to give an emitter Doppler effects and simulate audio motion based on the vector that is resolved from the given relative x, y and z positions.
 */
declare function audio_emitter_velocity(emitter: Id.AudioEmitter, vx: number, vy: number, vz: number): undefined;
/**
 * With this function you can play any sound asset through an emitter, with any changes to the emitter gain, position, pitch or velocity affecting how the user hears the final sound being played.
 */
declare function audio_play_sound_on(emitter: Id.AudioEmitter, sound: Asset.GMSound, loop: boolean, priority: number, gain?: number, offset?: number | undefined, pitch?: number, listener_mask?: number): Id.Sound;
/**
 * This function will check a specific audio group to see if it has been loaded into memory, ready for use.
 */
declare function audio_group_is_loaded(groupid: Asset.GMAudioGroup): boolean;
/**
 * This function will load all the sounds that are flagged as belonging to the given Audio Group into memory.
 */
declare function audio_group_load(groupid: Asset.GMAudioGroup): boolean;
/**
 * This function will check the loading progress for an audio group and return an (approximate) value between 0 and 100.
 */
declare function audio_group_load_progress(groupid: Asset.GMAudioGroup): number;
/**
 * This function will return a string containing the name of the given audio group for displaying or checking.
 */
declare function audio_group_name(groupid: Asset.GMAudioGroup): string;
/**
 * With this function you can fade a group of sounds in or out over a given length of time, or it can be used to set the group gain instantly. The time is measured in milliseconds, and the function requires that you input a final level of gain for the group to have reached by the end of that time. This gain can be between 0 (silent) and 1 (full volume) and the scale is linear.
 */
declare function audio_group_set_gain(groupid: Asset.GMAudioGroup, volume: number, time?: number): undefined;
/**
 * This function will return the group gain of a given audio group.
 */
declare function audio_group_get_gain(groupid: Asset.GMAudioGroup): number;
/**
 * This function will stop all sounds from the given audio group that are currently playing.
 */
declare function audio_group_stop_all(groupid: Asset.GMAudioGroup): undefined;
/**
 * This function will unload all the sounds that are flagged as belonging to the given Audio Group into memory. Note that any audio currently being played when this function is called will be stopped.
 */
declare function audio_group_unload(groupid: Asset.GMAudioGroup): boolean;
/**
 * This function will return an array containing the asset index of each audio asset in the given audio group.
 */
declare function audio_group_get_assets(group_index: Asset.GMAudioGroup): Array<Asset.GMSound>;
/**
 * This function will return the index of the audio group that is associated with the given sound index.
 */
declare function audio_sound_get_audio_group(sound_index: Asset.GMSound | Id.Sound): Asset.GMAudioGroup;
/**
 * Certain target platforms permit more than one listener, so it is important that you know how many the target has before changing or using different listeners. This function will return the number of listeners available.
 */
declare function audio_get_listener_count(): number;
/**
 * This function will create a DS map and populate it with information for the given listener.
 */
declare function audio_get_listener_info(num: number): Id.DsMap;
/**
 * This function will return the bit-mask data that defines the current default (global) mask for the audio listeners.
 */
declare function audio_get_listener_mask(): number;
/**
 * This function will create a DS map and populate it with the position, velocity and orientation values for the given listener. The default listener index is 0, but you can use the function audio_get_listener_info() to get the different indices available for the target platform. If you provide an incorrect listener index then the function will return -1.
 */
declare function audio_listener_get_data(index: number): Id.DsMap;
/**
 * With this function you can change the orientation of the listener within the 3D audio space. The look at direction and up direction are based on the vectors that are resolved from the given relative x, y and z positions, and default to (0, 0, 1000) for the look at direction and (0, 1, 0) for the up direction.
 */
declare function audio_listener_orientation(lookat_x: number, lookat_y: number, lookat_z: number, up_x: number, up_y: number, up_z: number): undefined;
/**
 * With this function you can change the position of the listener within the 3D audio space.
 */
declare function audio_listener_position(x: number, y: number, z: number): undefined;
/**
 * With this function you can change the orientation of the given listener within the 3D audio space. The default listener index is 0, but you can use the function audio_get_listener_info() to get the different indices available for the target platform.
 */
declare function audio_listener_set_orientation(index: number, lookat_x: number, lookat_y: number, lookat_z: number, up_x: number, up_y: number, up_z: number): undefined;
/**
 * With this function you can change the position of a given listener within the 3D audio space. The default listener index is 0, but you can use the function audio_get_listener_info() to get the different indices available for the target platform.
 */
declare function audio_listener_set_position(index: number, x: number, y: number, z: number): undefined;
/**
 * This function can be used to give the given listener Doppler effects and simulate audio motion based on the vector that is resolved from the given relative x, y and z positions. The default listener index is 0, but you can use the function audio_get_listener_info() to get the different indices available for the target platform.
 */
declare function audio_listener_set_velocity(index: number, x: number, y: number, z: number): undefined;
/**
 * This function can be used to give the listener Doppler effects and simulate audio motion based on the vector that is resolved from the given relative x, y and z positions.
 */
declare function audio_listener_velocity(vx: number, vy: number, vz: number): undefined;
/**
 * When using multiple listeners on a system, you can set the bit-mask for a sound and have it heard from the flagged listener only.
 */
declare function audio_set_listener_mask(mask: string): undefined;
/**
 * This function creates a sync group and returns a unique ID value for it which should then be used in all further audio function calls for this group.
 */
declare function audio_create_sync_group(loop: boolean): Id.AudioSyncGroup;
/**
 * Audio sync groups need to be destroyed when not in use to free up the memory and sound resources associated with them using this function.
 */
declare function audio_destroy_sync_group(group_index: Id.AudioSyncGroup): undefined;
/**
 * This function will pause the given sync group if it is playing, with the group index being the value returned when you created the group using the function audio_create_sync_group(). This does not stop the sound, and calling audio_resume_sync_group(), will start it playing from the same position it was paused at again.
 */
declare function audio_pause_sync_group(group_index: Id.AudioSyncGroup): undefined;
/**
 * With this function you can assign a sound to a previously created sync group.
 */
declare function audio_play_in_sync_group(group_index: Id.AudioSyncGroup, sound_index: Asset.GMSound): Id.Buffer;
/**
 * This function will resume the given sync group if it is playing and has previously been paused (using the function audio_pause_sync_group). The group index is the value returned when you created the group using the function audio_create_sync_group().
 */
declare function audio_resume_sync_group(group_index: Id.AudioSyncGroup): undefined;
/**
 * With this function you can start playing a previously created sync group. An audio sync group can be created with the function audio_create_sync_group().
 */
declare function audio_start_sync_group(group_index: Id.AudioSyncGroup): undefined;
/**
 * This function will stop the given sync group if it is playing, with the group index being the value returned when you created the group using the function audio_create_sync_group().
 */
declare function audio_stop_sync_group(group_index: Id.AudioSyncGroup): undefined;
/**
 * This function can be used to display debug information about any given sync group (the group index is the value returned when the group was created using the function audio_create_sync_group()). You can call the function with a value of -1 to switch off the overlay.
 */
declare function audio_sync_group_debug(group_index: Id.AudioSyncGroup): undefined;
/**
 * This function returns the current play position of the given sync group. The group index is the value returned when you created the group using the function audio_create_sync_group(), and the return value is the time in seconds that the tracks have been playing.
 */
declare function audio_sync_group_get_track_pos(group_index: Id.AudioSyncGroup): number;
/**
 * This function can be used to check if any audio in a synchronised group is playing. You are required to supply the sync group ID as returned by the function audio_create_sync_group().
 */
declare function audio_sync_group_is_playing(group_index: Id.AudioSyncGroup): boolean;
/**
 * This function can be used to check if any audio in a synchronised group is paused. You are required to supply the sync group ID as returned by the function audio_create_sync_group().
 */
declare function audio_sync_group_is_paused(group_index: Id.AudioSyncGroup): boolean;
/**
 * This function creates and returns a new audio bus struct, which can be modified to configure the bus' properties and to add audio effects to it.
 */
declare function audio_bus_create(): Struct.AudioBus;
/**
 * This function creates and returns a new audio effect struct, which can be modified to configure the effect's properties.
 */
declare function audio_effect_create(type: Enum.AudioEffectType, params?: Record<string, unknown>): Struct.AudioEffect;
/**
 * This function links an emitter to an audio bus. Any sounds played on this emitter will be processed by the audio bus.
 */
declare function audio_emitter_bus(emitter: Id.AudioEmitter, bus: Struct.AudioBus): undefined;
/**
 * This function returns the audio bus that an emitter is linked to.
 */
declare function audio_emitter_get_bus(emitter: Id.AudioEmitter): Struct.AudioBus;
/**
 * This function returns an array of all of the audio emitters linked to a given audio bus.
 */
declare function audio_bus_get_emitters(bus: Struct.AudioBus): Array<Id.AudioEmitter>;
/**
 * This function relinks all of the emitters linked to the given bus back to the main bus.
 */
declare function audio_bus_clear_emitters(bus: Struct.AudioBus): undefined;
/**
 * Converts a linear gain to a gain in decibels (dB).
 */
declare function lin_to_db(x: number): number;
/**
 * Converts a gain in decibels (dB) to a linear gain.
 */
declare function db_to_lin(x: number): number;
/**
 * Creates a Flexpanel node.
 */
declare function flexpanel_create_node(struct_or_json?: string | Record<string, unknown>): Pointer.FlexpanelNode;
/**
 * Deletes a Flexpanel node.
 */
declare function flexpanel_delete_node(node: Pointer.FlexpanelNode, recursive?: boolean): undefined;
/**
 * Inserts the node as a child of the passed parent node.
 */
declare function flexpanel_node_insert_child(root: Pointer.FlexpanelNode, node: Pointer.FlexpanelNode, index: number): undefined;
/**
 * Removes a child from the passed parent node.
 */
declare function flexpanel_node_remove_child(root: Pointer.FlexpanelNode, node: Pointer.FlexpanelNode): undefined;
/**
 * Removes all the children of the node. NOTE: Children are not deleted.
 */
declare function flexpanel_node_remove_all_children(root: Pointer.FlexpanelNode): undefined;
/**
 * Returns the number of child nodes of the given node.
 */
declare function flexpanel_node_get_num_children(root: Pointer.FlexpanelNode): number;
/**
 * Returns the child node of the given node either by index or name, undefined if out of range. If name is used then the search is done recursively through all the child nodes and the first matching node in a depth first traversal is returned.
 */
declare function flexpanel_node_get_child(root: Pointer.FlexpanelNode, indexOrName: number | string): Pointer.FlexpanelNode;
/**
 * Returns the child node of the given node by its name or the hash of its name.
 */
declare function flexpanel_node_get_child_hash(root: Pointer.FlexpanelNode, hashOrName: number | string): Pointer.FlexpanelNode;
/**
 * Returns the parent of the given node, undefined if no parent.
 */
declare function flexpanel_node_get_parent(root: Pointer.FlexpanelNode): Pointer.FlexpanelNode;
/**
 * Returns the name of the given node, undefined if no name is set.
 */
declare function flexpanel_node_get_name(root: Pointer.FlexpanelNode): string;
/**
 * Sets the name of the node.
 */
declare function flexpanel_node_set_name(root: Pointer.FlexpanelNode, name: string): undefined;
/**
 * Returns the data struct of the given node.
 */
declare function flexpanel_node_get_data(root: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * Sets the measure function of the node. When a layout is calculated and a measurement is required (there are various reasons why this may or may not happen, i.e. if parents have absolute widths and heights) then the given GML function will be called and it should return a struct with members `width` with the calculated width and/or `height` with the calculated height.
 */
declare function flexpanel_node_set_measure_function(root: Pointer.FlexpanelNode, function_: GMLFunction): undefined;
/**
 * Returns the measure function of the given node. `undefined` means that measure function is not set on this node.
 */
declare function flexpanel_node_get_measure_function(root: Pointer.FlexpanelNode): GMLFunction;
/**
 * Returns the layout data of the given node as a struct. This is the same data that can be passed into flexpanel_create_node().
 */
declare function flexpanel_node_get_struct(root: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * Calculates the layout for the selected node and its children.
 */
declare function flexpanel_calculate_layout(node: Pointer.FlexpanelNode, width?: Array<number | undefined>, height?: Array<number | undefined>, direction?: Enum.flexpanel_direction, dirty?: boolean): undefined;
/**
 * Returns the calculated node layout position as a struct: {left, top, width, height, bottom, right, hadOverflow, direction, paddingLeft, paddingRight, paddingTop, paddingBottom, marginLeft, marginRight, marginToip, marginBottom}.
 */
declare function flexpanel_node_layout_get_position(node: Pointer.FlexpanelNode, relative?: boolean): Record<string, unknown>;
/**
 * Sets the scale factor used when rounding layout values. A value of 0 disables rounding.
 */
declare function flexpanel_set_rounding_scale(scaleFactor: number): undefined;
/**
 * Gets the current scale factor used when rounding layout values.
 */
declare function flexpanel_get_rounding_scale(): number;
/**
 * This function sets the alignment of the content of the node. If wrapping is set to `flexpanel_wrap.wrap` or `flexpanel_wrap.reverse`, any items overflowing along the main axis will be laid out across new lines on the cross axis. The "align content" property controls how those wrapped lines are distributed along the cross axis. You can choose from the following values: * `flexpanel_align.flex_start` (default): Align wrapped lines to the start of the container's cross axis. * `flexpanel_align.flex_end`: Align wrapped lines to the end of the container's cross axis. * `flexpanel_align.stretch`: Stretch wrapped lines to match the height of the container's cross axis. * `flexpanel_align.center`: Align wrapped lines in the center of the container's cross axis. * `flexpanel_align.space_between`: Evenly space wrapped lines across the container's cross axis, distributing remaining space between the lines. * `flexpanel_align.space_around`: Similar to `flexpanel_align.space_between` but distributes the space before the first child and after the last child as well. * `flexpanel_align.space_evenly`: Similar to `flexpanel_align.space_around` but the spacing between the edges and the children, and between each child node, is exactly the same.
 */
declare function flexpanel_node_style_set_align_content(node: Pointer.FlexpanelNode, align: Enum.flexpanel_align): undefined;
/**
 * This function sets the alignment of the items of the node. This controls how the non-absolute children of a flex container are aligned along its cross axis (i.e. the direction perpendicular to the "flex direction"). You can choose from the following values: * `flexpanel_align.stretch` (default): Stretch children to fit the size of the cross axis. * `flexpanel_align.flex_start`: Align children to the start of the cross axis. * `flexpanel_align.flex_end`: Align children to the end of the cross axis. * `flexpanel_align.center`: Align children to the centre of the cross axis. * `flexpanel_align.baseline`: Align children along a common baseline. Individual children can be set to be the reference baseline for their parents.
 */
declare function flexpanel_node_style_set_align_items(node: Pointer.FlexpanelNode, align: Enum.flexpanel_align): undefined;
/**
 * This function sets the alignment of the selected node. This is the same as "align items". However, instead of being applied to a container, this is applied directly to a child node, and affects its cross-axis alignment within its container. This property overrides the "align items" value set for its parent container.
 */
declare function flexpanel_node_style_set_align_self(node: Pointer.FlexpanelNode, align: Enum.flexpanel_align): undefined;
/**
 * This function sets the node's aspect ratio. This is the aspect ratio that the node must maintain and corresponds to the horizontal axis. For example, an aspect ratio of `1` will result in a square node, `2` will be a 2:1 rectangle where its width is twice as much as its height, `0.5` will make the width half the size of the height.
 */
declare function flexpanel_node_style_set_aspect_ratio(node: Pointer.FlexpanelNode, value: number): undefined;
/**
 * This function sets the display setting of the selected node. The display setting controls which layout mode the node follows. You can choose from the following values: * `flexpanel_display.flex` (default): The default layout behaviour. * `flexpanel_display.none`: Disables the node. This effectively functions as the node being removed from the tree, as it's not included in any calculations.
 */
declare function flexpanel_node_style_set_display(node: Pointer.FlexpanelNode, display: Enum.flexpanel_display): undefined;
/**
 * This function sets the flex value of the selected node. Flex is shorthand for the "flex grow" and "flex shrink" properties. It will act as "flex grow" when the value is positive, and "flex shrink" when it's negative.
 */
declare function flexpanel_node_style_set_flex(node: Pointer.FlexpanelNode, flex: number): undefined;
/**
 * This function sets the flex wrap of the selected node. Flex wrap controls what happens when children in the container have overflown on the main axis. By default, they will overflow or shrink depending on their properties. You can choose from the following values: * `flexpanel_wrap.no_wrap` (default): Default behaviour, no wrapping * `flexpanel_wrap.wrap`: Child nodes are wrapped on overflow, with each new line being placed on the cross axis * `flexpanel_wrap.wrap_reverse`: Child nodes are wrapped but the order of the lines is reversed
 */
declare function flexpanel_node_style_set_flex_wrap(node: Pointer.FlexpanelNode, align: Enum.flexpanel_wrap): undefined;
/**
 * This function sets the flex grow of the selected node. Flex grow controls how the node grows within its flex container depending on the remaining space in the container. It's a positive weight value with a default of 1. For example, having a 400px container with a 40px node and then a node with a "flex grow" value of `1` will give the second node any remaining space within the container. Any values other than 1 determine how a node is sized against other growing nodes in the same container, e.g. the node with a larger value will be given more size.
 */
declare function flexpanel_node_style_set_flex_grow(node: Pointer.FlexpanelNode, grow: number): undefined;
/**
 * This function sets the flex shrink of the selected node. Flex shrink controls how the node shrinks within its flex container when there is overflow. It's a positive weight value with a default of 1. Any values other than 1 determine how a node is shrinked against other growing nodes in the same container.
 */
declare function flexpanel_node_style_set_flex_shrink(node: Pointer.FlexpanelNode, shrink: number): undefined;
/**
 * This function sets the flex basis of the selected node. Flex basis is the default size of an item within its flex container before any flex grow or shrink is applied. For a row container this affects the width, and for a column container this affects the height.
 */
declare function flexpanel_node_style_set_flex_basis(node: Pointer.FlexpanelNode, value: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the flex direction of the selected node. Flex direction is the direction in which non-absolute children of the node are laid out. This direction is known as the main axis, and the direction perpendicular to this is known as the cross axis. You can choose from the following values: * `flexpanel_flex_direction.column` (default): Align children from top to bottom. * `flexpanel_flex_direction.row`: Align children from left to right. * `flexpanel_flex_direction.column_reverse`: Align children from bottom to top. * `flexpanel_flex_direction.row_reverse`: Align children from right to left.
 */
declare function flexpanel_node_style_set_flex_direction(node: Pointer.FlexpanelNode, direction: Enum.flexpanel_flex_direction): undefined;
/**
 * This function sets the gap of the selected node for the selected gutters. Gap is the added distance between each row and column of the flex container and affects distances between child nodes. You can apply to both axes or apply only to rows or columns.
 */
declare function flexpanel_node_style_set_gap(node: Pointer.FlexpanelNode, gutter: Enum.flexpanel_gutter, size: number): undefined;
/**
 * This function sets an inset position on the node. Inset position defines the distance between an edge of the node and the same edge of its parent's node, with positive values moving the node toward the centre, and negative values moving it away from the centre. For example, a `left` value of `20` will place the node's left edge 20 pixels to the right of the parent's left edge. A `right` value of `40` will move the node so its right edge is 40 pixels to the left of its parent's, without resizing the node.
 */
declare function flexpanel_node_style_set_position(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge, value: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the node's contents justification. Justification controls how the non-absolute children of a flex container are aligned along its main axis (i.e. the direction of the flex direction). You can choose from the following values: * `flexpanel_justify.start` (default): Align children to the start of the main axis, as set in "flex direction". * `flexpanel_justify.flex_end`: Align children to the end of the main axis, acting as the opposite of "flex direction". * `flexpanel_justify.center`: Align children to the centre of the main axis. * `flexpanel_justify.space_between`: Align children from the start of the container to the end, inserting space between each child to fill the container. * `flexpanel_justify.space_around`: Similar to `flexpanel_justify.space_between` but distributes the space before the first child and after the last child as well. * `flexpanel_justify.space_evenly`: Similar to `flexpanel_justify.space_around` but the spacing between the edges and the children, and between each child node, is exactly the same.
 */
declare function flexpanel_node_style_set_justify_content(node: Pointer.FlexpanelNode, justify: Enum.flexpanel_justify): undefined;
/**
 * This function sets the layout direction of the selected node. This is the layout direction of the node and its children.
 */
declare function flexpanel_node_style_set_direction(node: Pointer.FlexpanelNode, direction: Enum.flexpanel_direction): undefined;
/**
 * This function sets the margin of the selected node. Margin is the space around the outside of the node. You can define it for all edges or for a specific edge.
 */
declare function flexpanel_node_style_set_margin(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge, size: number, unit?: Enum.flexpanel_unit): undefined;
/**
 * This function sets the padding of the selected node. Padding is the spacing between the inner edges of the node and its children. You can define it for all edges or for a specific edge. For nodes that don't have a defined width/height, this will increase the width/height.
 */
declare function flexpanel_node_style_set_padding(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge, size: number, unit?: Enum.flexpanel_unit): undefined;
/**
 * This function sets the border of the selected node. Border acts the same as padding.
 */
declare function flexpanel_node_style_set_border(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge, size: number): undefined;
/**
 * This function sets the node's position type. Position type of a node can be any one of the following strings: * `flexpanel_position_type.relative` (default): This node will participate in the flow of its parent container and will take up space in it. Inset positions (`flexpanel_edge.left`, `flexpanel_edge.top`, etc.) will be relative to the node's position within the flow. * `flexpanel_position_type.absolute`: This node is removed from the flow of its parent and will not take up space. Inset positions will be relative to the Containing Block which may not be its direct parent. * `flexpanel_position_type.static`: The node will behave like `flexpanel_position_type.relative` except it will ignore insets and will not form a Containing Block for its children.
 */
declare function flexpanel_node_style_set_position_type(node: Pointer.FlexpanelNode, value: Enum.flexpanel_position_type): undefined;
/**
 * This function sets the minimum width the node must maintain.
 */
declare function flexpanel_node_style_set_min_width(node: Pointer.FlexpanelNode, value: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the maximum width the node must maintain.
 */
declare function flexpanel_node_style_set_max_width(node: Pointer.FlexpanelNode, value: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the minimum height the node must maintain.
 */
declare function flexpanel_node_style_set_min_height(node: Pointer.FlexpanelNode, value: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the maximum height the node must maintain.
 */
declare function flexpanel_node_style_set_max_height(node: Pointer.FlexpanelNode, value: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the width of the selected node. Width refers to the width of the "border box" of the node, which is the collective size of the node's content, padding and border.
 */
declare function flexpanel_node_style_set_width(node: Pointer.FlexpanelNode, width: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function sets the height of the selected node. Height refers to the height of the "border box" of the node, which is the collective size of the node's content, padding and border.
 */
declare function flexpanel_node_style_set_height(node: Pointer.FlexpanelNode, height: number, unit: Enum.flexpanel_unit): undefined;
/**
 * This function gets the alignment of the content of the node. If "flex wrap" is set to `flexpanel_wrap.wrap` or `flexpanel_wrap.reverse`, any items overflowing along the main axis will be laid out across new lines on the cross axis. The "align content" property controls how those wrapped lines are distributed along the cross axis.
 */
declare function flexpanel_node_style_get_align_content(node: Pointer.FlexpanelNode): Enum.flexpanel_align;
/**
 * This function gets the alignment of the items of the node. This controls how the non-absolute children of a flex container are aligned along its cross axis (i.e. the direction perpendicular to the flex direction)
 */
declare function flexpanel_node_style_get_align_items(node: Pointer.FlexpanelNode): Enum.flexpanel_align;
/**
 * This function gets the alignment of the selected node. This is the same as "align items". However, instead of being applied to a container, this is applied directly to a child node, and affects its cross-axis alignment within its container. This property overrides the "align items" value set for its parent container.
 */
declare function flexpanel_node_style_get_align_self(node: Pointer.FlexpanelNode): Enum.flexpanel_align;
/**
 * This function gets the node's aspect ratio. This is the aspect ratio that the node must maintain and corresponds to the horizontal axis. For example, an aspect ratio of `1` will result in a square node, `2` will be a 2:1 rectangle where its width is twice as much as its height, `0.5` will make the width half the size of the height.
 */
declare function flexpanel_node_style_get_aspect_ratio(node: Pointer.FlexpanelNode): number;
/**
 * This function gets the display setting of the selected node. The display setting controls which layout mode the node follows. It can be one of the following values: * `flexpanel_display.flex` (default): The default layout behaviour. * `flexpanel_display.none`: Disables the node. This effectively functions as the node being removed from the tree, as it's not included in any calculations.
 */
declare function flexpanel_node_style_get_display(node: Pointer.FlexpanelNode): Enum.flexpanel_display;
/**
 * This function gets the flex value of the selected node. Flex is shorthand for the "flex grow" and "flex shrink" properties. It will act as "flex grow" when the value is positive, and "flex shrink" when it's negative.
 */
declare function flexpanel_node_style_get_flex(node: Pointer.FlexpanelNode): number;
/**
 * This function gets the flex wrap of the selected node. Flex wrap controls what happens when children in the container have overflown on the main axis. By default, they will overflow or shrink depending on their properties.
 */
declare function flexpanel_node_style_get_flex_wrap(node: Pointer.FlexpanelNode): Enum.flexpanel_wrap;
/**
 * This function gets the flex grow of the selected node. Flex grow controls how the node grows within its flex container depending on the remaining space in the container. It's a positive weight value with a default of 1. For example, having a 400px container with a 40px node and then a node with a "flex grow" value of `1` will give the second node any remaining space within the container.
 */
declare function flexpanel_node_style_get_flex_grow(node: Pointer.FlexpanelNode): number;
/**
 * This function gets the flex shrink of the selected node. Flex shrink controls how the node shrinks within its flex container when there is overflow. It's a positive weight value with a default of 1.
 */
declare function flexpanel_node_style_get_flex_shrink(node: Pointer.FlexpanelNode): number;
/**
 * This function gets the flex basis of the selected node. Flex basis is the default size of an item within its flex container before any flex grow or shrink is applied. For a row container this affects the width, and for a column container this affects the height.
 */
declare function flexpanel_node_style_get_flex_basis(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function gets the flex direction of the selected node. Flex direction is the direction in which non-absolute children of the node are laid out. This direction is known as the main axis, and the direction perpendicular to this is known as the cross axis.
 */
declare function flexpanel_node_style_get_flex_direction(node: Pointer.FlexpanelNode): Enum.flexpanel_flex_direction;
/**
 * This function gets the gap of the selected node on the selected side. Gap is the added distance between each row and column of the flex container and affects distances between child nodes. You can apply to both axes or apply only to rows or columns.
 */
declare function flexpanel_node_style_get_gap(node: Pointer.FlexpanelNode, gutter: Enum.flexpanel_gutter): number;
/**
 * This function gets the node's style position. Inset position define the distance between an edge of the node and the same edge of its parent's node, with positive values moving the node toward the centre, and negative values moving it away from the centre. For example, a `left` value of `20` will place the node's left edge 20 pixels to the right of the parent's left edge. A `right` value of `40` will move the node so its right edge is 40 pixels to the left of its parent's, without resizing the node.
 */
declare function flexpanel_node_style_get_position(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge): Record<string, unknown>;
/**
 * This function gets the node's contents justification. Justification controls how the non-absolute children of a flex container are aligned along its main axis (i.e. the direction of the "flex direction").
 */
declare function flexpanel_node_style_get_justify_content(node: Pointer.FlexpanelNode): Enum.flexpanel_justify;
/**
 * This function gets the direction of the selected node. This is the layout direction of the node and its children.
 */
declare function flexpanel_node_style_get_direction(node: Pointer.FlexpanelNode): Enum.flexpanel_direction;
/**
 * This function gets the margin of the selected node. Margin is the space around the outside of the node. You can define it for all edges or for a specific edge.
 */
declare function flexpanel_node_style_get_margin(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge): Record<string, unknown>;
/**
 * This function gets the padding of the selected node. Padding is the spacing between the inner edges of the node and its children. You can define it for all edges or for a specific edge.
 */
declare function flexpanel_node_style_get_padding(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge): Record<string, unknown>;
/**
 * This function gets the border of the selected node. Border acts the same as padding.
 */
declare function flexpanel_node_style_get_border(node: Pointer.FlexpanelNode, edge: Enum.flexpanel_edge): number;
/**
 * This function gets the node's position type. Position type of a node can be any one of the following strings: * `flexpanel_position_type.relative` (default): This node will participate in the flow of its parent container and will take up space in it. Inset positions (`flexpanel_edge.left`, `flexpanel_edge.top`, etc.) will be relative to the node's position within the flow. * `flexpanel_position_type.absolute`: This node is removed from the flow of its parent and will not take up space. Inset positions will be relative to the Containing Block which may not be its direct parent. * `flexpanel_position_type.static`: The node will behave like `flexpanel_position_type.relative` except it will ignore insets and will not form a Containing Block for its children.
 */
declare function flexpanel_node_style_get_position_type(node: Pointer.FlexpanelNode): Enum.flexpanel_position_type;
/**
 * This function gets the minimum width the node must maintain.
 */
declare function flexpanel_node_style_get_min_width(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function gets the maximum width the node must maintain.
 */
declare function flexpanel_node_style_get_max_width(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function gets the minimum height the node must maintain.
 */
declare function flexpanel_node_style_get_min_height(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function gets the maximum height the node must maintain.
 */
declare function flexpanel_node_style_get_max_height(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function gets the width of the selected node. Width refers to the width of the "border box" of the node, which is the collective size of the node's content, padding and border.
 */
declare function flexpanel_node_style_get_width(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function gets the height of the selected node. Height refers to the height of the "border box" of the node, which is the collective size of the node's content, padding and border.
 */
declare function flexpanel_node_style_get_height(node: Pointer.FlexpanelNode): Record<string, unknown>;
/**
 * This function can be used to add a font to your game from a font file present in the Included Files. -1 is returned if the function fails for any reason.
 */
declare function font_add(name: string, size: number, bold: boolean, italic: boolean, first: number, last: number): Asset.GMFont;
/**
 * This function can be used to enable or disable anti-aliasing (AA) for fonts added using font_add(). This function needs to be called before you add any fonts.
 */
declare function font_add_enable_aa(enable: boolean): undefined;
/**
 * This function can be used to check whether anti-aliasing (AA) is enabled for fonts added using font_add(). Note that AA is enabled by default, but you can change the AA state for added fonts using the function font_add_enable_aa(), as long as it is called before adding the font.
 */
declare function font_add_get_enable_aa(): boolean;
/**
 * With this function you can use a "sprite strip" to create a new font asset, where each sub-image would be an individual symbol or letter.
 */
declare function font_add_sprite(spr: Asset.GMSprite, first: number, prop: boolean, sep: number): Asset.GMFont;
/**
 * With this function you can use a "sprite strip" to create a new font asset, where each sub-image would be an individual symbol or letter.
 */
declare function font_add_sprite_ext(spr: Asset.GMSprite, string_map: string, prop: boolean, sep: number): Asset.GMFont;
/**
 * With this function you can delete a font asset from the game.
 */
declare function font_delete(ind: Asset.GMFont): undefined;
/**
 * With this function you can enable or disable SDF rendering for the specified font. This only works on fonts added using font_add().
 */
declare function font_enable_sdf(ind: Asset.GMFont, enable: boolean): undefined;
/**
 * With this function you can determine whether SDF rendering is enabled or disabled for the specified font
 */
declare function font_get_sdf_enabled(ind: Asset.GMFont): boolean;
/**
 * With this function you can set the SDF spread value for the specified font. This only works on fonts added using font_add(), and its effect is only visible if the font is using SDF rendering.
 */
declare function font_sdf_spread(ind: Asset.GMFont, spread: number): undefined;
/**
 * With this function you can query the SDF spread value for the specified font
 */
declare function font_get_sdf_spread(ind: Asset.GMFont): number;
/**
 * With this function you can enable or disable built-in effects rendering for the specified font. Built-in effects will only have an effect with SDF-enabled fonts.
 */
declare function font_enable_effects(ind: Asset.GMFont, enable: boolean, params?: Struct.FontEffectParams): undefined;
/**
 * This function returns whether a font with the specified index exists or not. You can check font indices as defined from the Asset Browser, or fonts that have been added using functions like font_add().
 */
declare function font_exists(ind: Asset.GMFont): boolean;
/**
 * With this function you can check any font asset to see if it has the bold flag or not.
 */
declare function font_get_bold(ind: Asset.GMFont): boolean;
/**
 * With this function you can get the actual system name of the selected font asset. This function returns a string and not an index, and the name returned will depend on the font being used.
 */
declare function font_get_fontname(ind: Asset.GMFont): string;
/**
 * This function is used to retrieve information for the given font.
 */
declare function font_get_info(font: Asset.GMFont): Struct.FontInfo;
/**
 * With this function you can check any font asset to see if it has the italic flag or not.
 */
declare function font_get_italic(ind: Asset.GMFont): boolean;
/**
 * This function can be used to find the last character (as an UTF-8 value) that was used when your font asset was added to your game.
 */
declare function font_get_last(ind: Asset.GMFont): number;
/**
 * This function can be used to get the name (as a string) that was given to the font when it was added as an asset to the GameMaker Asset Browser.
 */
declare function font_get_name(ind: Asset.GMFont): string;
/**
 * With this function you can get the size of any font asset, which is the point value shown by the font asset dialogue.
 */
declare function font_get_size(ind: Asset.GMFont): number;
/**
 * This function returns a special pointer for the font texture page.
 */
declare function font_get_texture(font: Asset.GMFont): Pointer.Texture;
/**
 * This function returns an array with the UV coordinates for the font texture on the texture page, filling in the array with the following values: [0] = left [1] = top [2] = right [3] = bottom
 */
declare function font_get_uvs(font: Asset.GMFont): Array<number>;
/**
 * With this function you can use a "sprite strip" to replace a previously created sprite font asset, where each sub-image would be an individual symbol or letter.
 */
declare function font_replace_sprite(ind: Asset.GMFont, spr: Asset.GMSprite, first: number, prop: boolean, sep: number): undefined;
/**
 * This function will replace a sprite font that you created previously using the function font_add_sprite_ext(). It uses a "sprite strip", where each sub-image is an individual symbol or letter, and the images are mapped to letters based on the argument "string_map" of the function.
 */
declare function font_replace_sprite_ext(font: Asset.GMFont, spr: Asset.GMSprite, string_map: string, prop: boolean, sep: number): undefined;
/**
 * This function sets how many blended copies of the given font can be cached before old ones are overwritten.
 */
declare function font_set_cache_size(ind: Asset.GMFont, max: number): undefined;
/**
 * This function can be used to get the current value of the given alarm. This is an alternative method to getting the alarm array value directly.
 */
declare function alarm_get(index: number): number;
/**
 * This function can be used to set an alarm. This is an alternative method to setting the alarm array directly.
 */
declare function alarm_set(index: number, value: number): undefined;
/**
 * You can use this function to change one instance of an object into another instance of a different object, and while doing so decide whether to perform the initial instance's Destroy and Clean Up Events and the new instance's Create Event.
 * @deprecated
 */
declare function instance_change(obj: Asset.GMObject, perf: boolean): undefined;
/**
 * With this function you can "clone" an instance as this will create a new version of the instance running the code at its same position.
 */
declare function instance_copy(perf: boolean): Id.Instance;
/**
 * You call this function whenever you wish to destroy an instance, normally triggering a Destroy Event and also a Clean Up Event.
 */
declare function instance_destroy(id?: Asset.GMObject | Id.Instance | Constant.All, execute_event_flag?: boolean): undefined;
/**
 * This function checks if any instance of the given Object handle exists in the room, or whether the given specific Instance handle exists in the room.
 */
declare function instance_exists(obj: Id.Instance | Asset.GMObject | undefined): boolean;
/**
 * With this function you can find out how many active instances of the specified object exists in the room.
 */
declare function instance_number(obj: Asset.GMObject | Constant.All): number;
/**
 * With this function you can tell GameMaker to activate all instances that have been previously deactivated in a room. Note that activation is not instantaneous, and an instance that has been activated in this way will not be considered to be active until the end of the event in which the function was called.
 */
declare function instance_activate_all(collision_space?: Enum.colspace): undefined;
/**
 * With this function you can activate a layer that has been deactivated previously. Note that activation is not instantaneous, and an instance that has been activated in this way will not be considered to be active until the end of the event in which the function was called.
 */
declare function instance_activate_layer(layer_id: string | Id.Layer): undefined;
/**
 * With this function you can activate a single instance or all instances of a specific object from all those that have been deactivated previously. Note that if you have deactivated an instance or object that has been flagged as Persistent, then you will need to reactivate it again with this function before changing room, otherwise it will not be carried over and will be discarded instead. Note too that activation is not instantaneous, and an instance that has been activated in this way will not be considered to be active until the end of the event in which the function was called.
 */
declare function instance_activate_object(obj: Asset.GMObject | Id.Instance | Constant.All, collision_space?: Enum.colspace): undefined;
/**
 * With this function you can define a region within the room to activate instances that have previously been deactivated. The region can either be flagged as "inside" or "outside".
 */
declare function instance_activate_region(left: number, top: number, width: number, height: number, inside: boolean, collision_space?: Enum.colspace): undefined;
/**
 * This function will deactivate all instances that are in the room at the moment that the code is run. Note that deactivation is not instantaneous, and an instance that has been deactivated in this way will not be considered to be inactive until the end of the event in which the function was called.
 */
declare function instance_deactivate_all(notme: boolean, collision_space?: Enum.colspace): undefined;
/**
 * With this function you can deactivate all instances assigned to a specific layer. Note that deactivation is not instantaneous, and an instance that has been deactivated in this way will not be considered to be inactive until the end of the event in which the function was called.
 */
declare function instance_deactivate_layer(layer: Id.Layer | string): undefined;
/**
 * With this function you can deactivate a single instance or all instances of a specific object from all those that have been activated previously. Note that deactivation is not instantaneous, and an instance that has been deactivated in this way will not be considered to be inactive until the end of the event in which the function was called.
 */
declare function instance_deactivate_object(obj: Asset.GMObject | Id.Instance | Constant.All, collision_space?: Enum.colspace): undefined;
/**
 * With this function you can define a region within the room to deactivate instances that have previously been activated. The region can either be flagged as "inside" or "outside".
 */
declare function instance_deactivate_region(left: number, top: number, width: number, height: number, inside: boolean, notme: boolean, collision_space?: Enum.colspace): undefined;
/**
 * This function returns whether an object with the specified index exists or not.
 */
declare function object_exists(obj: Asset.GMObject): boolean;
/**
 * This function will tell you whether the object you are checking has a mask index or not, and if it does then it will return the index of that mask, or -1 if it does not.
 */
declare function object_get_mask(obj: Asset.GMObject): Asset.GMSprite;
/**
 * This function will return the name as a string of the specified object.
 */
declare function object_get_name(obj: Asset.GMObject): string;
/**
 * This function will get you the object_index of any parent that has been assigned to the specified object, or else return -100 to show that the object has no parent assigned to it, or -1 if the object being checked does not exist.
 */
declare function object_get_parent(obj: Asset.GMObject): Asset.GMObject;
/**
 * This function will tell you whether the object you are checking has been flagged as "persistent" or not. A persistent object is one that will cause any instances of it to be carried through from room to room unless they are explicitly destroyed.
 */
declare function object_get_persistent(obj: Asset.GMObject): boolean;
/**
 * This function will tell you whether the object you are checking has been flagged as "physics-enabled".
 */
declare function object_get_physics(obj: Asset.GMObject): boolean;
/**
 * This function will tell you whether the object you are checking has been flagged as "solid" or not. A solid object generates a special collision event when using the traditional collision system (i.e.: the physics world is off).
 */
declare function object_get_solid(obj: Asset.GMObject): boolean;
/**
 * This function will tell you whether the object you are checking has a sprite or not, and if it does then it will return the index of that sprite, or -1 if it does not.
 */
declare function object_get_sprite(obj: Asset.GMObject): Asset.GMSprite;
/**
 * This function will tell you whether the object you are checking has been flagged as "visible" (runs its draw event) or not (does not run its draw event).
 */
declare function object_get_visible(obj: Asset.GMObject): boolean;
/**
 * This function can be used to check an object and see if it is an ancestor or not of another object.
 */
declare function object_is_ancestor(obj: Asset.GMObject, par: Asset.GMObject): boolean;
/**
 * With this function you can set the mask_index of a specific object. You can set this to -1 to remove a mask sprite and so default to the mask defined for the sprite of the object (or no masks if no sprite has been chosen).
 */
declare function object_set_mask(index: Asset.GMObject, spr: Asset.GMSprite): undefined;
/**
 * With this function you can set the persistence of a specific object. A persistent object is "carried over" from room to room and maintains its properties at all times.
 */
declare function object_set_persistent(index: Asset.GMObject, pers: boolean): undefined;
/**
 * With this function you can flag a specific object as being solid or not. This means that all instances of this object that are created after solid has been changed will be created with this new state, while instances that are already in the room may not be affected.
 */
declare function object_set_solid(index: Asset.GMObject, solid: boolean): undefined;
/**
 * With this function you can set the sprite index of a specific object. This means that all instances of this object that are created after the sprite_index has been changed will be created with this new sprite_index, while instances that are already in the room may not be affected.
 */
declare function object_set_sprite(index: Asset.GMObject, spr: Asset.GMSprite): undefined;
/**
 * With this function you can flag a specific object as being visible or not. This means that all instances of this object that are created after visible has been changed will be created with this new state, while instances that are already in the room may not be affected.
 */
declare function object_set_visible(index: Asset.GMObject, vis: boolean): undefined;
/**
 * This function will call the current event of the parent object of the instance.
 */
declare function event_inherited(): undefined;
/**
 * This function will perform the specified event, with the designated argument, for the instance running the code.
 */
declare function event_perform(type: Constant.EventType, numb: Constant.EventNumber | number | Constant.VirtualKey | Asset.GMObject): undefined;
/**
 * This function is used to perform any one of the Asynchronous Events provided in GameMaker.
 */
declare function event_perform_async(type: Constant.AsyncEventType, ds_map: Id.DsMap): undefined;
/**
 * This function works the same as event_perform() except that this time you can specify events from another object.
 */
declare function event_perform_object(obj: unknown, type: Constant.EventType, numb: Constant.EventNumber | number | Constant.VirtualKey | Asset.GMObject): undefined;
/**
 * With this function you tell the instance to run the actions or code that has been placed within one of the 16 user-defined events. These events can only be called in this way, or using the event_perform function.
 */
declare function event_user(numb: number): undefined;
/**
 * This function ends the current path that the instance is following, as set when the function path_start was called.
 */
declare function path_end(): undefined;
/**
 * This function can be used to return whether the path is flagged as closed (true) or open (false), i.e. whether the path loops or if it has a definitive beginning and end.
 */
declare function path_get_closed(index: Asset.GMPath): boolean;
/**
 * This function can be used to find out whether the given path is smooth (true) or not (false).
 */
declare function path_get_kind(index: Asset.GMPath): boolean;
/**
 * You can use this function to get the exact length of a path in pixels. this is not an approximate length from point to point, but rather an exact length along the shape of the path, even when the path is smooth with a high curved precision.
 */
declare function path_get_length(index: Asset.GMPath): number;
/**
 * This function will return the name of the path that is referenced as a string.
 */
declare function path_get_name(index: Asset.GMPath): string;
/**
 * This function can be used to return the number of points on a path.
 */
declare function path_get_number(index: Asset.GMPath): number;
/**
 * With this function you can get the speed of the point (as defined in the Path Editor or when you dynamically add a path point using path_add_point()) expressed as a percentage.
 */
declare function path_get_point_speed(index: Asset.GMPath, n: number): number;
/**
 * This function will return the x position (in room coordinates) of the point that you input for the path that you index. If the point is outside of the range of the path (i.e.: a path has 8 points and you ask for the x position of point 10) then a value of 0 will be returned.
 */
declare function path_get_point_x(index: Asset.GMPath, n: number): number;
/**
 * This function will return the y position (in room coordinates) of the point that you input for the path that you index. If the point is outside of the range of the path (i.e.: a path has 8 points and you ask for the y position of point 10) then a value of 0 will be returned.
 */
declare function path_get_point_y(index: Asset.GMPath, n: number): number;
/**
 * This function returns precision with which the given path has been "smoothed", and will be an integer value from 1 to 8. Although you can get (and set) this value for a straight-line path it will have no influence over how an instance uses the path as it is only relevant when the path kind is set to "smooth".
 */
declare function path_get_precision(index: Asset.GMPath): number;
/**
 * This function returns the speed factor of any given position on a path. The position should be a value between 0 and 1 (you can use path_position if you need the current position of the instance).
 */
declare function path_get_speed(index: Asset.GMPath, pos: number): number;
/**
 * With this function you can get the x coordinate of a position on any given path.
 */
declare function path_get_x(index: Asset.GMPath, pos: number): number;
/**
 * With this function you can get the y coordinate of a position on any given path.
 */
declare function path_get_y(index: Asset.GMPath, pos: number): number;
/**
 * This function tells the calling instance to start the given path. The path started by the instance is stored in the variable path_index.
 */
declare function path_start(path: Asset.GMPath, speed: number, endaction: Constant.PathAction, absolute: boolean): undefined;
/**
 * With this function you can create a path in GameMaker without using the path editor.
 */
declare function path_add(): Asset.GMPath;
/**
 * With this function you can add a point to the specified path and set its speed factor.
 */
declare function path_add_point(index: Asset.GMPath, x: number, y: number, speed: number): undefined;
/**
 * With this function you can append one path onto another one, effectively joining them together.
 */
declare function path_append(index: Asset.GMPath, path: Asset.GMPath): undefined;
/**
 * With this function you can copy the path data from one path to another. The path being copied to will be cleared first (should it have any path points) and be completely overwritten by the path being copied from.
 */
declare function path_assign(index: Asset.GMPath, path: Asset.GMPath): undefined;
/**
 * With this function you can change the position and/or the speed factor of any point previously defined for a path).
 */
declare function path_change_point(index: Asset.GMPath, n: number, x: number, y: number, speed: number): undefined;
/**
 * With this function you can remove all point definitions from a path, effectively making an "empty" path.
 */
declare function path_clear_points(index: Asset.GMPath): undefined;
/**
 * You can use this code to remove a path from memory.
 */
declare function path_delete(index: Asset.GMPath): undefined;
/**
 * With this function you can remove a point from the specified path.
 */
declare function path_delete_point(index: Asset.GMPath, n: Asset.GMPath): undefined;
/**
 * This function takes a path and copies it into a new path.
 */
declare function path_duplicate(index: Asset.GMPath): Asset.GMPath;
/**
 * This function returns whether a path with the given index exists or not.
 */
declare function path_exists(index: Asset.GMPath): boolean;
/**
 * This function takes all the path points and flips them along the horizontal axis, changing the actual path asset.
 */
declare function path_flip(index: Asset.GMPath): undefined;
/**
 * With this function you can insert a new point into a path. The point will be added into the path before the point "n" that is specified in the function.
 */
declare function path_insert_point(index: Asset.GMPath, n: number, x: number, y: number, speed: number): undefined;
/**
 * This function takes all the path points and mirrors them along the vertical axis, changing the actual path asset.
 */
declare function path_mirror(index: Asset.GMPath): undefined;
/**
 * This function can be used to re-scale the given path along both (or either) the vertical and horizontal axis, basically moving each of the path points to a new position corresponding to this scale around the centre of the path.
 */
declare function path_rescale(index: Asset.GMPath, xscale: number, yscale: number): undefined;
/**
 * With this function you can reverse the order in which the individual path points are numbered, so, for example, if the path has 5 points, point 0 would become point 4, point 1 would be point 3 and point 2 would not be changed. The actual position of the points remains the same, only the order in which they are processed is changed.
 */
declare function path_reverse(index: Asset.GMPath): undefined;
/**
 * You can use this function to rotate a given path around its center.
 */
declare function path_rotate(index: Asset.GMPath, angle: number): undefined;
/**
 * This function can be used to flag a given path as being open (false) or closed (true). A closed path has its start point connected to its end point, forming a loop, and an open path has a definitive, unconnected start and finish.
 */
declare function path_set_closed(index: Asset.GMPath, closed: boolean): undefined;
/**
 * This function can be used to set the kind of path that you wish the specified asset to be. This can be either a straight line path (set to 0) or a smoothed path (set to 1) which takes into account the path precision.
 */
declare function path_set_kind(index: Asset.GMPath, val: number): undefined;
/**
 * With this function you can change the "smoothness" of a path. This value must be between 1 and 8, with a low value creating straighter edges with sharper curves between points, while a higher value will round the points and make the path a lot more "curvy".
 */
declare function path_set_precision(index: Asset.GMPath, prec: number): undefined;
/**
 * With this function you can shift a path along the horizontal and vertical axis.
 */
declare function path_shift(index: Asset.GMPath, xshift: number, yshift: number): undefined;
/**
 * This function will create a new, empty, room and add it to your game, returning its index to be stored in a variable for all further codes that deal with this room. Note that each room is permanently added to the game until the executable is closed, i.e.: rooms added through code cannot be deleted again.
 */
declare function room_add(): Asset.GMRoom;
/**
 * This function copies one room to another, removing all instances, tiles, etc., from the room that is being copied to and replaces them completely with the new room's contents.
 */
declare function room_assign(ind: Asset.GMRoom, source: Asset.GMRoom): undefined;
/**
 * This will duplicate a given room and return the duplicate's index to be used in all further calls to reference the new room.
 */
declare function room_duplicate(index: Asset.GMRoom): Asset.GMRoom;
/**
 * With this function you can check and see whether the room you specify exists or not.
 */
declare function room_exists(index: Asset.GMRoom): boolean;
/**
 * With this function you can get the unique index ID of the camera assigned to a specific view in a room other than the current one.
 */
declare function room_get_camera(rm: Asset.GMRoom, vind: number): Id.Camera;
/**
 * This function can be used to return the name of the specified room as a string.
 */
declare function room_get_name(index: Asset.GMRoom): string;
/**
 * This function can be used to get all the information on a room. It returns a struct that contains data that has been requested, a room can be very large so this can take a long time to complete, and optionally some data can be omitted to speed it up. NOTE: Tilemap data is an array of all the tilemap indices stored as a one dimensional array of width * height, where an x, y entry is indexed as (y*width)+x
 */
declare function room_get_info(index: Asset.GMRoom, views?: boolean, instances?: boolean, layers?: boolean, layer_elements?: boolean, tilemap_data?: boolean, live?: boolean): Record<string, unknown>;
/**
 * With this function you can retrieve the details of a viewport in a room other than the current one.
 */
declare function room_get_viewport(rm: Asset.GMRoom, vind: number): Array<number>;
/**
 * This function permits you to go to any room in your game project, whether created using code or in the Asset Browser. This function will also trigger the Room End event.
 */
declare function room_goto(index: Asset.GMRoom): undefined;
/**
 * With this function you can make your game go to the next room as listed in the Room Manager at the time the game was compiled. If this room does not exist, an error will be thrown and the game will be forced to close.
 */
declare function room_goto_next(): undefined;
/**
 * With this function you can make your game go to the previous room as listed in the Room Manager at the time the game was compiled. If this room does not exist, an error will be thrown and the game will be forced to close. This function will also trigger the Room End event.
 */
declare function room_goto_previous(): undefined;
/**
 * With this function you can add an instance to any room other than the current one and at any position within that room.
 */
declare function room_instance_add(index: Asset.GMRoom, x: number, y: number, obj: Asset.GMObject): Id.Instance;
/**
 * This function will clear a room of all instances (no destroy events shall be called for the instances that are being removed). Note that calling this function on a room asset created in the Asset Browser will permanently clear the room of instances, and even calling game_restart() will not return the room to its original state (only ending the game and opening it again will start with the room in its original state again).
 */
declare function room_instance_clear(index: Asset.GMRoom): undefined;
/**
 * With this function you can retrieve the index of the room after the room input into the function.
 */
declare function room_next(numb: Asset.GMRoom): Asset.GMRoom;
/**
 * With this function you can retrieve the index of the room before the room input into the function.
 */
declare function room_previous(numb: Asset.GMRoom): Asset.GMRoom;
/**
 * This function will restart the current room, as if it had just been entered. Note that the room will not restart until the end of the event where the function was called, so any code after this has been called will still run if in the same event. This function will also trigger the Room End event.
 */
declare function room_restart(): undefined;
/**
 * With this function you can assign a camera to a specific viewport in a room other than the current one.
 */
declare function room_set_camera(rm: Asset.GMRoom, vind: number, camera: Id.Camera): undefined;
/**
 * With this function you can change (or set) the height of any room in your game except the current one.
 */
declare function room_set_height(index: Asset.GMRoom, h: number): undefined;
/**
 * With this function you can change (or set) the persistence of any room in your game except the current one. A persistent room will maintain the state of all instances within that room if the player leaves and then returns, a non-persistent room will be reset to the initial state every time.
 */
declare function room_set_persistent(index: Asset.GMRoom, val: boolean): undefined;
/**
 * With this function you can set the viewport properties for any room in your game except the current one.
 */
declare function room_set_viewport(rm: Asset.GMRoom, vind: number, vis: boolean, xport: number, yport: number, wport: number, hport: number): undefined;
/**
 * With this function you can enable (true) or disable (false) the view of any room within your game except the current one.
 */
declare function room_set_view_enabled(index: Asset.GMRoom, val: boolean): undefined;
/**
 * With this function you can change (or set) the width of any room in your game except the current one.
 */
declare function room_set_width(index: Asset.GMRoom, w: number): undefined;
/**
 * This function controls the alpha (transparency) of the background sprite.
 */
declare function layer_background_alpha(background_element_id: Id.BackgroundElement, alpha: number): undefined;
/**
 * This function controls the blending (or "tinting") of the background sprite and the default value is -1 (which represents the constant c_white, which can also be used). Any other value (including internal colour constants like c_red, or c_aqua) will blend the specified colour with the original sprite.
 */
declare function layer_background_blend(background_element_id: Id.BackgroundElement, blend: Constant.Color): undefined;
/**
 * With this function you can assign a sprite asset to a layer to be used as a background in your project.
 */
declare function layer_background_create(layer_id: string | Id.Layer, sprite: Asset.GMSprite): Id.BackgroundElement;
/**
 * This function will destroy the given background element.
 */
declare function layer_background_destroy(background_element_id: Id.BackgroundElement): undefined;
/**
 * You can use this function to check and see if a background element exists on any given layer.
 */
declare function layer_background_exists(layer_id: string | Id.Layer, background_element_id: Id.BackgroundElement): boolean;
/**
 * This function can be used to get the alpha value of the background element.
 */
declare function layer_background_get_alpha(background_element_id: Id.BackgroundElement): number;
/**
 * This function can be used to get the blend colour of the background element.
 */
declare function layer_background_get_blend(background_element_id: Id.BackgroundElement): Constant.Color;
/**
 * This function can be used to find out if the background element is tiled horizontally or not.
 */
declare function layer_background_get_htiled(background_element_id: Id.BackgroundElement): boolean;
/**
 * This function can be used to retrieve the unique ID value of the background element on a layer.
 */
declare function layer_background_get_id(layer_id: string | Id.Layer): Id.BackgroundElement;
/**
 * This function can be used to get the current image index value of the background element.
 */
declare function layer_background_get_index(background_element_id: Id.BackgroundElement): number;
/**
 * This function can be used to get the current speed multiplier value of the background element. Default value is 1.
 */
declare function layer_background_get_speed(background_element_id: Id.BackgroundElement): number;
/**
 * This function can be used to get the current sprite index value of the background element. If the element has no sprite assigned, the function will return -1.
 */
declare function layer_background_get_sprite(background_element_id: Id.BackgroundElement): Asset.GMSprite;
/**
 * This function can be used to get the stretched state of the background element sprite. The function will return either true if the element sprite is currently stretched to fit the room, or false if it is not.
 */
declare function layer_background_get_stretch(background_element_id: Id.BackgroundElement): boolean;
/**
 * This function can be used to get the visible state of the background element. Note that this return value is not affected by whether the layer the element is on is visible or not.
 */
declare function layer_background_get_visible(background_element_id: Id.BackgroundElement): boolean;
/**
 * This function can be used to find out if the background element is tiled vertically or not.
 */
declare function layer_background_get_vtiled(background_element_id: Id.BackgroundElement): boolean;
/**
 * This function can be used to get the current scale multiplier value of the background element. Default value is 1.
 */
declare function layer_background_get_xscale(background_element_id: Id.BackgroundElement): number;
/**
 * This function can be used to get the current scale multiplier value of the background element. Default value is 1.
 */
declare function layer_background_get_yscale(background_element_id: Id.BackgroundElement): number;
/**
 * Using this function you can change whether the given background element on a layer should be tiled horizontally or not.
 */
declare function layer_background_htiled(background_element_id: Id.BackgroundElement, htile: boolean): undefined;
/**
 * This function can be used to set the image index of the background sprite which has multiple sub-images. If you set a value outside of the range of sub-images, then the image index will loop around.
 */
declare function layer_background_index(background_element_id: Id.BackgroundElement, index: number): undefined;
/**
 * This function can be used to set the speed of an animating sprite that has been assigned to a background element. If the background element has no sprite attached or the sprite used has no sub-images, this function will have no effect.
 */
declare function layer_background_speed(background_element_id: Id.BackgroundElement, speed: number): undefined;
/**
 * Using this function you can set the sprite index of the background element. If you give a value of -1, the element will have no sprite assigned (but will still exist and can have a sprite assigned again later).
 */
declare function layer_background_sprite(background_element_id: Id.BackgroundElement, sprite_index: Asset.GMSprite): undefined;
/**
 * Using this function you can toggle a background element sprite to stretch to fit the room or remain at 1:1 with the resolution.
 */
declare function layer_background_stretch(background_element_id: Id.BackgroundElement, stretch: boolean): undefined;
/**
 * Using this function you can toggle a background element's visibility. Note that this is dependent on the layer visibility, and even if the background element is flagged as visible, it will not be drawn if the layer it is on is flagged as not visible.
 */
declare function layer_background_visible(background_element_id: Id.BackgroundElement, visible: boolean): undefined;
/**
 * Using this function you can change whether the given background element on a layer should be tiled vertically or not. This function is for 2D projects only, and will not work correctly when a 3D camera projection is used.
 */
declare function layer_background_vtiled(background_element_id: Id.BackgroundElement, vtile: boolean): undefined;
/**
 * This function can be used to set the scale along the x-axis of a background element. Note that negative values are valid, and will "flip" the element around the (0, 0) position, so an x scale of -1 would show the image reversed.
 */
declare function layer_background_xscale(background_element_id: Id.BackgroundElement, xscale: number): undefined;
/**
 * This function can be used to set the scale along the y-axis of a background element. Note that negative values are valid, and will "flip" the element around the (0, 0) position, so an x scale of -1 would show the image reversed.
 */
declare function layer_background_yscale(background_element_id: Id.BackgroundElement, speed: number): undefined;
/**
 * This function can be used to move a given instance from the layer it is currently on to another layer.
 */
declare function layer_add_instance(layer_id: string | Id.Layer, instance_id: Id.Instance): undefined;
/**
 * This function is used to create a new layer within the current room. If you do not specify the name of the layer, then the created layer will be assigned a name with the format "_layer_XXX", where "XXX" is a hex value used to give the layer a unique name.
 */
declare function layer_create(depth: number, name?: string): Id.Layer;
/**
 * This function can be used to change the depth of the given layer, changing the order in which its contents will be rendered to the screen.
 */
declare function layer_depth(layer_id: string | Id.Layer, depth: number): undefined;
/**
 * This function will destroy the given layer.
 */
declare function layer_destroy(layer_id: string | Id.Layer): undefined;
/**
 * This function can be used to destroy all the instances assigned to the given layer.
 */
declare function layer_destroy_instances(layer_id: string | Id.Layer): undefined;
/**
 * You can use this function to move an element from one layer to another.
 */
declare function layer_element_move(element_id: unknown, layer_id: string | Id.Layer): undefined;
/**
 * This function can be used to check if the given layer exists.
 */
declare function layer_exists(layer_name: string | Id.Layer): boolean;
/**
 * This function forces all layers to be drawn at the specified z depth. Note that this is generally only for use with legacy projects from previous version of GameMaker where you could have draw depths higher or lower than the permitted layer range.
 */
declare function layer_force_draw_depth(force: boolean, depth: number): undefined;
/**
 * This function will return an array populated with the unique ID values of each layer in the room.
 */
declare function layer_get_all(): Array<Id.Layer>;
/**
 * You can use this function to get the element IDs of the given layer.
 */
declare function layer_get_all_elements(layer_id: string | Id.Layer): Array<unknown>;
/**
 * You can use this function to get the depth value associated with a given layer.
 */
declare function layer_get_depth(layer_id: string | Id.Layer): number;
/**
 * You can use this function to get the type of a given layer.
 */
declare function layer_get_type(layer_id: string | Id.Layer): Constant.LayerType;
/**
 * You can use this function to get the Layer ID that the given element is on. If the element ID given is not a valid one, then the function will return -1.
 */
declare function layer_get_element_layer(element_id: unknown): Id.Layer;
/**
 * You can use this function to get the element type for the given element.
 */
declare function layer_get_element_type(element_id: unknown): Constant.LayerElementType;
/**
 * This function retrieves the root-level flexpanel node on a UI layer.
 */
declare function layer_get_flexpanel_node(layer_name: string): Pointer.FlexpanelNode;
/**
 * This function can be used to retrieve the Z depth set for rendering layers within the room.
 */
declare function layer_is_draw_depth_forced(): number;
/**
 * You can use this function to retrieve the horizontal speed (in pixels per game frame) of the layer within the currently scoped room. Default is 0 (unless set in the room editor).
 */
declare function layer_get_hspeed(layer_id: string | Id.Layer): number;
/**
 * This function can be used to get the unique ID value for a given layer. Note that if you give the name of a layer that does not exist in the current room, then you will get an error and the project will crash.
 */
declare function layer_get_id(layer_name: string): Id.Layer;
/**
 * You can use this function to get the IDs of all layers assigned a specific depth.
 */
declare function layer_get_id_at_depth(depth: number): Array<Id.Layer>;
/**
 * You can use this function to get the name of the given layer. If the layer is not one of the room editor ones (i.e.: it was created using layer_create()) then an empty string will be returned.
 */
declare function layer_get_name(layer_id: Id.Layer): string;
/**
 * This function returns the function assigned to run at the start of rendering the given layer, or it will return an invalid handle (-1) if no function is assigned.
 */
declare function layer_get_script_begin(layer_id: string | Id.Layer): GMLFunction;
/**
 * This function returns the script function index of the function assigned to run at the end of rendering the given layer, or it will return -1 if no function is assigned. You can assign script functions to a layer with layer_script_begin() and layer_script_end().
 */
declare function layer_get_script_end(layer_id: string | Id.Layer): GMLFunction;
/**
 * This function can be used to check if the given layer has a shader assigned to it. The function will return either the shader index of the shader assigned, or -1 if no shader is assigned.
 */
declare function layer_get_shader(layer_id: string | Id.Layer): Asset.GMShader;
/**
 * This function will return the current room being targeted by the layer functions.
 */
declare function layer_get_target_room(): Asset.GMRoom;
/**
 * With this function you can check whether a layer is visible or not.
 */
declare function layer_get_visible(layer_id: string | Id.Layer): boolean;
/**
 * You can use this function to retrieve the vertical speed (in pixels per game frame) of the layer within the currently scoped room. Default is 0 (unless set in the room editor).
 */
declare function layer_get_vspeed(layer_id: string | Id.Layer): number;
/**
 * You can use this function to retrieve the x position of the layer within the currently scoped room. Default is 0.
 */
declare function layer_get_x(layer_id: string | Id.Layer): number;
/**
 * You can use this function to retrieve the y position of the layer within the currently scoped room. Default is 0.
 */
declare function layer_get_y(layer_id: string | Id.Layer): number;
/**
 * This function can be used to check if a given instance is currently assigned to the given layer.
 */
declare function layer_has_instance(layer_id: string | Id.Layer, instance_id: Id.Instance): boolean;
/**
 * You can use this function to set the horizontal speed (in pixels per game frame) of the layer within the currently scoped room.
 */
declare function layer_hspeed(layer_id: string | Id.Layer, hspd: number): undefined;
/**
 * This function can be used to get the unique instance ID of the given instance element. If the element is not an instance, the function will return -1.
 */
declare function layer_instance_get_instance(element_id: unknown): Id.Instance;
/**
 * This function is used to reset the layer target to the current room.
 */
declare function layer_reset_target_room(): undefined;
/**
 * With this function you can assign a script function to a layer and it will be called before the layer is rendered.
 */
declare function layer_script_begin(layer_id: string | Id.Layer, script: Asset.GMScript | GMLFunction | number): undefined;
/**
 * With this function you can assign a script function to a layer and it will be called after the layer is rendered. Note that the function is not meant to be called in any draw events or step events, but rather only needs to be called at the start of the room in the Room Creation Code or in the Create Event / Room Start Event of an instance.
 */
declare function layer_script_end(layer_id: string | Id.Layer, script: Asset.GMScript | GMLFunction | number): undefined;
/**
 * When you call this function you are telling GameMaker that all further layer functions should be applied to the given room. Note that this function can only be used on rooms other than the current room, and is designed so that you can add/remove layers and layer elements to rooms other than the room that is currently running.
 */
declare function layer_set_target_room(room: Asset.GMRoom): undefined;
/**
 * With this function you can toggle the visibility of a layer.
 */
declare function layer_set_visible(layer_id: string | Id.Layer, visible: boolean): undefined;
/**
 * With this function you can assign a shader asset to any given layer and the layer will then be rendered using that shader. The shader will also affect any other graphic elements drawn on that layer, like sprite assets or tile maps.
 */
declare function layer_shader(layer_id: string | Id.Layer, shader: Asset.GMShader): undefined;
/**
 * You can use this function to set the vertical speed (in pixels per game frame) of the layer within the currently scoped room.
 */
declare function layer_vspeed(layer_id: string | Id.Layer, vspd: number): undefined;
/**
 * You can use this function to set the x position of the layer within the currently scoped room.
 */
declare function layer_x(layer_id: string | Id.Layer, x: number): undefined;
/**
 * You can use this function to set the y position of the layer within the currently scoped room.
 */
declare function layer_y(layer_id: string | Id.Layer, y: number): undefined;
/**
 * This function can be used to change scaling on the x axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the new scale value to use (based on the room coordinates).
 */
declare function layer_particle_xscale(particle_element_id: Id.ParticleElement, xscale: number): undefined;
/**
 * This function can be used to change scaling on the y axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the new scale value to use (based on the room coordinates).
 */
declare function layer_particle_yscale(particle_element_id: Id.ParticleElement, yscale: number): undefined;
/**
 * This function can be used to change angle of rotation of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the new angle to use (in degrees).
 */
declare function layer_particle_angle(particle_element_id: Id.ParticleElement, angle: number): undefined;
/**
 * This function can be used to change blend colour of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the new blend colour to use.
 */
declare function layer_particle_blend(particle_element_id: Id.ParticleElement, color: Constant.Color): undefined;
/**
 * This function can be used to change alpha value of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the new alpha value in range from 0 (transparent) to 1 (opaque).
 */
declare function layer_particle_alpha(particle_element_id: Id.ParticleElement, alpha: number): undefined;
/**
 * This function can be used to change position on the x axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the x value to use (based on the room coordinates).
 */
declare function layer_particle_x(particle_element_id: Id.ParticleElement, x: number): undefined;
/**
 * This function can be used to change position on the y axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()), and then set the y value to use (based on the room coordinates).
 */
declare function layer_particle_y(particle_element_id: Id.ParticleElement, y: number): undefined;
/**
 * This function can be used to retrieve the unique ID value of a particle system element on a layer. You supply the layer ID (which you get when you create the layer using layer_create() or when you use the layer name along with layer_get_id()) and the name of the particle system element as defined in the Room Editor. The function will return the ID value associated with that particle system element on the layer.
 */
declare function layer_particle_get_id(layer_id: string | Id.Layer, particle_element_name: string): Id.ParticleElement;
/**
 * This function can be used to retrieve the unique ID of a particle system instance associated with a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the particle system instance ID associated with the layer element.
 */
declare function layer_particle_get_instance(particle_element_id: Id.ParticleElement): Id.ParticleSystem;
/**
 * This function can be used to retrieve the particle system asset associated with a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the particle system asset associated with the layer element.
 */
declare function layer_particle_get_system(particle_element_id: Id.ParticleElement): Asset.GMParticleSystem;
/**
 * This function can be used to retrieve scaling on the x axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the layer element's scale on the x axis.
 */
declare function layer_particle_get_xscale(particle_element_id: Id.ParticleElement): number;
/**
 * This function can be used to retrieve scaling on the y axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the layer element's scale on the y axis.
 */
declare function layer_particle_get_yscale(particle_element_id: Id.ParticleElement): GML.Rela;
/**
 * This function can be used to retrieve rotation of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the layer element's rotation in degrees.
 */
declare function layer_particle_get_angle(particle_element_id: Id.ParticleElement): number;
/**
 * This function can be used to retrieve blend colour of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the layer element's blend colour.
 */
declare function layer_particle_get_blend(particle_element_id: Id.ParticleElement): Constant.Color;
/**
 * This function can be used to retrieve alpha value of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns a value in range from 0 (transparent) to 1 (opaque).
 */
declare function layer_particle_get_alpha(particle_element_id: Id.ParticleElement): number;
/**
 * This function can be used to retrieve position on the x axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the layer element's position on the x axis.
 */
declare function layer_particle_get_x(particle_element_id: Id.ParticleElement): number;
/**
 * This function can be used to retrieve position on the y axis of a particle system element. You supply the particle system element ID (which you can get using layer_particle_get_id()) and the function returns the layer element's position on the y axis.
 */
declare function layer_particle_get_y(particle_element_id: Id.ParticleElement): number;
/**
 * With this function you can set the angle of rotation for the given sequence element.
 */
declare function layer_sequence_angle(sequence_element_id: Id.SequenceElement, angle: number): undefined;
/**
 * With this function you can create an instance of a sequence asset on the given layer.
 */
declare function layer_sequence_create(layer_id: string | Id.Layer, x: number, y: number, sequence_id: Asset.GMSequence): Id.SequenceElement;
/**
 * With this function you can destroy (remove from the room) a sequence element.
 */
declare function layer_sequence_destroy(sequence_element_id: Id.SequenceElement): undefined;
/**
 * With this function you can check to see if a sequence element exists on the given layer.
 */
declare function layer_sequence_exists(layer_id: string | Id.Layer, sequence_element_id: Id.SequenceElement): boolean;
/**
 * This function returns the current angle of the given sequence element in the game room.
 */
declare function layer_sequence_get_angle(sequence_element_id: Id.SequenceElement): number;
/**
 * This function returns the current playhead direction of the given sequence element.
 */
declare function layer_sequence_get_headdir(sequence_element_id: Id.SequenceElement): Constant.SequenceDirection;
/**
 * This function returns the current playhead position (the current frame the playhead is on) of the given sequence element.
 */
declare function layer_sequence_get_headpos(sequence_element_id: Id.SequenceElement): number;
/**
 * This function returns the sequence instance struct for the given sequence element.
 */
declare function layer_sequence_get_instance(sequence_element_id: Id.SequenceElement): Struct.SequenceInstance;
/**
 * This function returns the length of the sequence referenced by the given sequence element.
 */
declare function layer_sequence_get_length(sequence_element_id: Id.SequenceElement): number;
/**
 * This function gets the sequence object referenced by the given sequence element.
 */
declare function layer_sequence_get_sequence(sequence_element_id: Id.SequenceElement): Struct.Sequence;
/**
 * This function returns the current playback speed scale of the given sequence element.
 */
declare function layer_sequence_get_speedscale(sequence_element_id: Id.SequenceElement): number;
/**
 * This function returns the current x position in the game room for the given sequence element.
 */
declare function layer_sequence_get_x(sequence_element_id: Id.SequenceElement): number;
/**
 * This function returns the current scale along the x axis of the given sequence element in the game room.
 */
declare function layer_sequence_get_xscale(sequence_element_id: Id.SequenceElement): number;
/**
 * This function returns the current y position in the game room for the given sequence element.
 */
declare function layer_sequence_get_y(sequence_element_id: Id.SequenceElement): number;
/**
 * This function returns the current scale along the y axis of the given sequence element in the game room.
 */
declare function layer_sequence_get_yscale(sequence_element_id: Id.SequenceElement): number;
/**
 * With this function you can set the direction for the given sequence playhead.
 */
declare function layer_sequence_headdir(sequence_element_id: Id.SequenceElement, direction: Constant.SequenceDirection): undefined;
/**
 * With this function you can set the playhead position of a sequence element to a specific frame.
 */
declare function layer_sequence_headpos(sequence_element_id: Id.SequenceElement, position: number): undefined;
/**
 * This function returns whether the given sequence has finished playing.
 */
declare function layer_sequence_is_finished(sequence_element_id: Id.SequenceElement): boolean;
/**
 * This function returns whether the given sequence is currently paused.
 */
declare function layer_sequence_is_paused(sequence_element_id: Id.SequenceElement): boolean;
/**
 * With this function you can pause the playback of the given sequence. The function will pause the sequence until you begin playback again using the function layer_sequence_play().
 */
declare function layer_sequence_pause(sequence_element_id: Id.SequenceElement): undefined;
/**
 * With this function you can start the playback of the given sequence. The function will play the sequence, which you can then pause if required using the function layer_sequence_pause().
 */
declare function layer_sequence_play(sequence_element_id: Id.SequenceElement): undefined;
/**
 * With this function you can change the playback speed of the given sequence.
 */
declare function layer_sequence_speedscale(sequence_element_id: Id.SequenceElement, speedscale: number): undefined;
/**
 * With this function you can set the position along the X (horizontal) axis of the room for the given sequence element.
 */
declare function layer_sequence_x(sequence_element_id: Id.SequenceElement, pos_x: number): undefined;
/**
 * With this function you can set the X scale for the given sequence element.
 */
declare function layer_sequence_xscale(sequence_element_id: Id.SequenceElement, xscale: number): undefined;
/**
 * With this function you can set the position along the Y (vertical) axis of the room for the given sequence element.
 */
declare function layer_sequence_y(sequence_element_id: Id.SequenceElement, pos_y: number): undefined;
/**
 * With this function you can set the Y scale for the given sequence element.
 */
declare function layer_sequence_yscale(sequence_element_id: Id.SequenceElement, yscale: number): undefined;
/**
 * With this function you can set the image alpha for the given sequence element.
 */
declare function layer_sequence_alpha(sequence_element_id: Id.SequenceElement, alpha: number): undefined;
/**
 * With this function you can set the image blend for the given sequence element.
 */
declare function layer_sequence_blend(sequence_element_id: Id.SequenceElement, blend: Constant.Color): undefined;
/**
 * This function controls the alpha (transparency) of the sprite on the asset layer.
 */
declare function layer_sprite_alpha(sprite_element_id: Id.SpriteElement, alpha: number): undefined;
/**
 * Using this function you can change the angle for the given sprite element on a layer. If you set a value greater than 360 this will be looped to bring it within the 0 - 359 range.
 */
declare function layer_sprite_angle(sprite_element_id: Id.SpriteElement, angle: number): undefined;
/**
 * This function sets the blend colour (or "tint") of the given sprite element.
 */
declare function layer_sprite_blend(sprite_element_id: Id.SpriteElement, blend: Constant.Color): undefined;
/**
 * Using this function you can change the sprite asset assigned to a given sprite element on a layer. Note that you can assign a value of -1 as the new sprite index and no sprite will be shown, although the element will still exist and can still be changed again later.
 */
declare function layer_sprite_change(sprite_element_id: Id.SpriteElement, sprite_index: Asset.GMSprite): undefined;
/**
 * With this function you can assign a sprite asset to a layer to be used in your project.
 */
declare function layer_sprite_create(layer_id: string | Id.Layer, x: number, y: number, sprite: Asset.GMSprite): Id.SpriteElement;
/**
 * This function will destroy the given sprite element.
 */
declare function layer_sprite_destroy(sprite_element_id: Id.SpriteElement): undefined;
/**
 * You can use this function to check and see if a sprite element exists on any given layer.
 */
declare function layer_sprite_exists(layer_id: string | Id.Layer, sprite_element_id: Id.SpriteElement): boolean;
/**
 * This function can be used to get the alpha value of the sprite element.
 */
declare function layer_sprite_get_alpha(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the current angle for the sprite element.
 */
declare function layer_sprite_get_angle(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the blend colour of the sprite element.
 */
declare function layer_sprite_get_blend(sprite_element_id: Id.SpriteElement): Constant.Color;
/**
 * This function can be used to retrieve the unique ID value of a sprite element on a layer.
 */
declare function layer_sprite_get_id(layer_id: string | Id.Layer, sprite_element_name: string): Id.SpriteElement;
/**
 * This function can be used to get the current image index value of the sprite element. The function will return -1 if either the sprite element doesn't exist or the element doesn't have a valid sprite assigned to it.
 */
declare function layer_sprite_get_index(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the current speed multiplier value of the sprite element. Default value is 1.
 */
declare function layer_sprite_get_speed(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the current sprite index of the sprite element. If the element has no sprite assigned, the function will return -1.
 */
declare function layer_sprite_get_sprite(sprite_element_id: Id.SpriteElement): Asset.GMSprite;
/**
 * This function can be used to get the x position of the sprite element in the room.
 */
declare function layer_sprite_get_x(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the current scale multiplier along the x axis for the sprite element.
 */
declare function layer_sprite_get_xscale(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the y position of the sprite element in the room.
 */
declare function layer_sprite_get_y(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to get the current scale multiplier along the y axis for the sprite element. The function will return a real value for the y scale, where 1 is no scaling.
 */
declare function layer_sprite_get_yscale(sprite_element_id: Id.SpriteElement): number;
/**
 * This function can be used to set the image index of a sprite asset which has multiple sub-images on a layer. If you set a value outside of the range of sub-images, then the image index will loop around.
 */
declare function layer_sprite_index(sprite_element_id: Id.SpriteElement, index: number): undefined;
/**
 * This function can be used to set the speed of an animating image that has been assigned to a sprite element. If the sprite used has no sub-images, this function will have no effect.
 */
declare function layer_sprite_speed(sprite_element_id: Id.SpriteElement, speed: number): undefined;
/**
 * This function controls the position along the x-axis of the room of the asset sprite element on the layer.
 */
declare function layer_sprite_x(sprite_element_id: Id.SpriteElement, x: number): undefined;
/**
 * Using this function you can change whether the given sprite element on a layer should be scaled along the x axis or not.
 */
declare function layer_sprite_xscale(sprite_element_id: Id.SpriteElement, xscale: number): undefined;
/**
 * This function controls the position along the y-axis of the room of the asset sprite element on the layer.
 */
declare function layer_sprite_y(sprite_element_id: Id.SpriteElement, y: number): undefined;
/**
 * Using this function you can change whether the given sprite element on a layer should be scaled along the y axis or not.
 */
declare function layer_sprite_yscale(sprite_element_id: Id.SpriteElement, yscale: number): undefined;
/**
 * This function can be used to retrieve the unique ID value of a text element on a layer.
 */
declare function layer_text_get_id(layer_id: string | Id.Layer, text_element_name: string): Id.TextElement;
/**
 * You can use this function to check and see if a text element exists on any given layer.
 */
declare function layer_text_exists(layer_id: string | Id.Layer, text_element_id: Id.TextElement): boolean;
/**
 * With this function you can create a new text element on the specified layer.
 */
declare function layer_text_create(layer_id: string | Id.Layer, x: number, y: number, font: Asset.GMFont, text: string): Id.TextElement;
/**
 * This function will destroy the given text element.
 */
declare function layer_text_destroy(text_element_id: Id.TextElement): undefined;
/**
 * This function controls the position along the x-axis of the room of the text element on the layer.
 */
declare function layer_text_x(text_element_id: Id.TextElement, x: number): undefined;
/**
 * This function controls the position along the y-axis of the room of the text element on the layer.
 */
declare function layer_text_y(text_element_id: Id.TextElement, y: number): undefined;
/**
 * Using this function you can change the angle for the given text element on a layer. If you set a value greater than 360 this will be looped to bring it within the 0 - 359 range.
 */
declare function layer_text_angle(text_element_id: Id.TextElement, angle: number): undefined;
/**
 * Using this function you can change whether the given text element on a layer should be scaled along the x axis or not.
 */
declare function layer_text_xscale(text_element_id: Id.TextElement, xscale: number): undefined;
/**
 * Using this function you can change whether the given text element on a layer should be scaled along the y axis or not.
 */
declare function layer_text_yscale(text_element_id: Id.TextElement, yscale: number): undefined;
/**
 * This function changes the blend colour of the given text element, similar to image_blend for an Object Instance.
 */
declare function layer_text_blend(text_element_id: Id.TextElement, blend: Constant.Color): undefined;
/**
 * This function controls the alpha (transparency) of the text element on the asset layer.
 */
declare function layer_text_alpha(text_element_id: Id.TextElement, alpha: number): undefined;
/**
 * Using this function you can change the font asset assigned to a given text element on a layer.
 */
declare function layer_text_font(text_element_id: Id.TextElement, font: Asset.GMFont): undefined;
/**
 * Using this function you can change the x position of the origin of the given text element.
 */
declare function layer_text_xorigin(text_element_id: Id.TextElement, xorigin: number): undefined;
/**
 * Using this function you can change the y position of the origin of the given text element.
 */
declare function layer_text_yorigin(text_element_id: Id.TextElement, yorigin: number): undefined;
/**
 * Using this function you can set the frame origin for the given text element. You give the text element ID (which you get when you create a text element using layer_text_create() or when you use the function layer_text_get_id()), and then set the origin value.
 */
declare function layer_text_origin(text_element_id: Id.TextElement, origin: Constant.TextOrigin): undefined;
/**
 * Using this function you can change the text string assigned to a given text element on a layer.
 */
declare function layer_text_text(text_element_id: Id.TextElement, text: string): undefined;
/**
 * Using this function you can change the horizontal alignment of the given text element.
 */
declare function layer_text_halign(text_element_id: Id.TextElement, alignment: Constant.TextAlign): undefined;
/**
 * Using this function you can change the vertical alignment of the given text element.
 */
declare function layer_text_valign(text_element_id: Id.TextElement, alignment: Constant.TextAlign): undefined;
/**
 * Using this function you can change the character spacing of the given text element.
 */
declare function layer_text_charspacing(text_element_id: Id.TextElement, charspacing: number): undefined;
/**
 * Using this function you can change the line spacing of the given text element.
 */
declare function layer_text_linespacing(text_element_id: Id.TextElement, linespacing: number): undefined;
/**
 * Using this function you can change the paragraph spacing of the given text element.
 */
declare function layer_text_paragraphspacing(text_element_id: Id.TextElement, paragraphspacing: number): undefined;
/**
 * Using this function you can change the width of the frame of the given text element. This only affects rendering when wrapping is enabled.
 */
declare function layer_text_framew(text_element_id: Id.TextElement, width: number): undefined;
/**
 * Using this function you can change the height of the frame of the given text element. This affects vertical alignment of the text.
 */
declare function layer_text_frameh(text_element_id: Id.TextElement, height: number): undefined;
/**
 * Using this function you can change whether wrapping is enabled for the given text element.
 */
declare function layer_text_wrap(text_element_id: Id.TextElement, wrap: boolean): undefined;
/**
 * Using this function you can set the wrapping mode for the given text element. You give the text element ID (which you get when you create a text element using layer_text_create() or when you use the function layer_text_get_id()), and then set the wrapping mode.
 */
declare function layer_text_wrapmode(text_element_id: Id.TextElement, wrapmode: Constant.TextWrap): undefined;
/**
 * This function can be used to get the x position of the text element in the room.
 */
declare function layer_text_get_x(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the y position of the text element in the room.
 */
declare function layer_text_get_y(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the x scale of the text element in the room.
 */
declare function layer_text_get_xscale(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the y scale of the text element in the room.
 */
declare function layer_text_get_yscale(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the rotation angle of the text element in the room.
 */
declare function layer_text_get_angle(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the blend colour of the text element.
 */
declare function layer_text_get_blend(text_element_id: Id.TextElement): Constant.Color;
/**
 * This function can be used to get the alpha value of the text element.
 */
declare function layer_text_get_alpha(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the font asset reference of the text element.
 */
declare function layer_text_get_font(text_element_id: Id.TextElement): Asset.GMFont;
/**
 * This function can be used to get the x origin of the text element in the room.
 */
declare function layer_text_get_xorigin(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the y origin of the text element in the room.
 */
declare function layer_text_get_yorigin(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the frame origin value of the text element in the room. You give the text element ID (which you get when you create a text element using layer_text_create() or when you use the function layer_text_get_id()), and the function will return the origin value.
 */
declare function layer_text_get_origin(text_element_id: Id.TextElement): Constant.TextOrigin;
/**
 * This function can be used to get the text string of the text element.
 */
declare function layer_text_get_text(text_element_id: Id.TextElement): string;
/**
 * This function can be used to get the horizontal alignment of the text element in the room.
 */
declare function layer_text_get_halign(text_element_id: Id.TextElement): Constant.TextAlign;
/**
 * This function can be used to get the vertical alignment of the text element in the room.
 */
declare function layer_text_get_valign(text_element_id: Id.TextElement): Constant.TextAlign;
/**
 * This function can be used to get the character spacing of the text element in the room.
 */
declare function layer_text_get_charspacing(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the line spacing of the text element in the room.
 */
declare function layer_text_get_linespacing(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the paragraph spacing of the text element in the room.
 */
declare function layer_text_get_paragraphspacing(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the width of the frame of the text element in the room.
 */
declare function layer_text_get_framew(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the height of the frame of the text element in the room.
 */
declare function layer_text_get_frameh(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get whether wrapping is enabled for the text element in the room.
 */
declare function layer_text_get_wrap(text_element_id: Id.TextElement): number;
/**
 * This function can be used to get the wrapping mode for the text element in the room. You give the text element ID (which you get when you create a text element using layer_text_create() or when you use the function layer_text_get_id()), and the function will return the wrapping mode status.
 */
declare function layer_text_get_wrapmode(text_element_id: Id.TextElement): Constant.TextWrap;
/**
 * With this function you can assign a tile-set asset to a layer to be used as a tile map in your project. It is worth noting that you cannot place tiles at negative positions within the tile map, so all tiles must be placed within the cell spaces 0 to width - 1, 0 to height - 1.
 */
declare function layer_tilemap_create(layer_id: string | Id.Layer, x: number, y: number, tileset: Asset.GMTileSet, width: number, height: number): Id.TileMapElement;
/**
 * This function will destroy the given tile map element. Note that this does not remove the layer, only the tile map from it, and if the tile map is one that has been added in the room editor, then the next time you leave the room and then return, the tile map will be recreated again. However if the room is persistent, the tile map will be removed unless room persistence is switched off again.
 */
declare function layer_tilemap_destroy(tilemap_element_id: Id.TileMapElement): undefined;
/**
 * You can use this function to check and see if a tile map element exists on any given layer.
 */
declare function layer_tilemap_exists(layer_id: string | Id.Layer, tilemap_element_id: Id.TileMapElement): boolean;
/**
 * This function can be used to retrieve the unique ID value of the tile map element on a layer. Note that this function is specifically designed for use with tile maps that have been added in the IDE, as if you add a tile map to a layer through code using the function layer_tilemap_create(), then it will return the unique ID for the tile map element added. If the given tilemap ID is incorrect or the tilemap doesn't exist, the function will return -1.
 */
declare function layer_tilemap_get_id(layer_id: string | Id.Layer): Id.TileMapElement;
/**
 * This function can be used to retrieve the sprite that is being used as the collision mask for this tilemap.
 */
declare function layer_tilemap_get_colmask(tilemap_element_id: Id.TileMapElement): Asset.GMSprite;
/**
 * This function can be used to set the sprite that is being used as the collision mask for this tilemap. The dimensions of the sprite must match the dimensions of the sprite being used for the tileset. If the function succeeds it will return 0, if it fails it will return -1
 */
declare function layer_tilemap_set_colmask(tilemap_element_id: Id.TileMapElement, index: Asset.GMSprite): number;
/**
 * Using this function you can clear/set all the tiles on a given tile map. A default value of 0 will clear all the tiles from the layer (essentially making all tiles "empty"), while you can use the dedicated tile_* functions to create your own tile data to clear the tile map with.
 */
declare function tilemap_clear(tilemap_element_id: Id.TileMapElement, tiledata: Constant.TileMask): undefined;
/**
 * Using this function you can retrieve the tile data from a cell of the tile map element. Note that we are using x/y cell positions based on the size of the tile map grid and not as a position in the room, so "cell_x" is a value from 0 to tile map width, and "cell_y" is a value from 0 to tile map height. If you need to get the data for a tile at a specific room position then you need to use the function tilemap_get_at_pixel().
 */
declare function tilemap_get(tilemap_element_id: Id.TileMapElement, x_cell: number, y_cell: number): number;
/**
 * Using this function you can retrieve the tile data from a position (within the room) of the tile map element. If you need to get the tile data from a specific tile cell you should be using the function tilemap_get() instead.
 */
declare function tilemap_get_at_pixel(tilemap_element_id: Id.TileMapElement, x: number, y: number): number;
/**
 * Using this function you can retrieve the x-axis position of an individual tile map cell by giving the relative x-axis position within the room. Note that if the value is outside of the tile map area, and no cell is available, it will return -1.
 */
declare function tilemap_get_cell_x_at_pixel(tilemap_element_id: Id.TileMapElement, x: number, y: number): number;
/**
 * Using this function you can retrieve the y-axis position of an individual tile map cell by giving the relative y-axis position within the room. Note that if the value is outside of the tile map area, and no cell is available, it will return -1.
 */
declare function tilemap_get_cell_y_at_pixel(tilemap_element_id: Id.TileMapElement, x: number, y: number): number;
/**
 * Since tiles can be animated, it can sometimes be useful to know which frame is currently being drawn and react accordingly, so with this function you can retrieve the current frame index for a given tile map.
 */
declare function tilemap_get_frame(tilemap_element_id: Id.TileMapElement): number;
/**
 * This function can be used to retrieve the bit mask value for all tile maps, returning the current mask value or -1 if there is an error or 0 if no mask is specified. For further information on global tile map bit masks, see the function tilemap_set_global_mask().
 */
declare function tilemap_get_global_mask(): number;
/**
 * Using this function you can retrieve the height (in cells) of the tile map element.
 */
declare function tilemap_get_height(tilemap_element_id: Id.TileMapElement): number;
/**
 * This function can be used to retrieve the bit mask value for the given tile map. For further information on tile map bit masks, see the function tilemap_set_mask().
 */
declare function tilemap_get_mask(tilemap_element_id: Id.TileMapElement): number;
/**
 * Using this function you can retrieve the index value of the tile set asset assigned to a given tile map element on a layer.
 */
declare function tilemap_get_tileset(tilemap_element_id: Id.TileMapElement): Asset.GMTileSet;
/**
 * Using this function you can retrieve the height (in pixels) of each tile cell of the tile map element.
 */
declare function tilemap_get_tile_height(tilemap_element_id: Id.TileMapElement): number;
/**
 * Using this function you can retrieve the width (in pixels) of each tile cell of the tile map element.
 */
declare function tilemap_get_tile_width(tilemap_element_id: Id.TileMapElement): number;
/**
 * Using this function you can retrieve the width (in cells) of the tile map element.
 */
declare function tilemap_get_width(tilemap_element_id: Id.TileMapElement): number;
/**
 * Using this function you can retrieve the x position (within the room) of the tile map element.
 */
declare function tilemap_get_x(tilemap_element_id: Id.TileMapElement): number;
/**
 * Using this function you can retrieve the y position (within the room) of the tile map element.
 */
declare function tilemap_get_y(tilemap_element_id: Id.TileMapElement): number;
/**
 * This function can be used to set any cell (grid square) within the tile map element on the layer to a new tile. The function will return true if the tile was successfully set and false if there was an issue and it wasn't set.
 */
declare function tilemap_set(tilemap_element_id: Id.TileMapElement, tiledata: Constant.TileMask, xcell: number, ycell: number): boolean;
/**
 * This function can be used to set a cell within the tile map element on the layer to a new tile using the actual position of the tile to change within the room. The function will return true if the tile was successfully set and false if there was an issue and it wasn't set.
 */
declare function tilemap_set_at_pixel(tilemap_element_id: Id.TileMapElement, tiledata: Constant.TileMask, xcell: number, ycell: number): boolean;
/**
 * This function can be used to set the tile bit mask for all tile maps in the game.
 */
declare function tilemap_set_global_mask(mask: Constant.TileMask): undefined;
/**
 * This function can be used to resize a tile map element.
 */
declare function tilemap_set_height(tilemap_element_id: Id.TileMapElement, height: number): undefined;
/**
 * This function can be used to set the tile bit mask for a single tile map.
 */
declare function tilemap_set_mask(tilemap_element_id: Id.TileMapElement, mask: Constant.TileMask): undefined;
/**
 * This function can be used to resize a tile map element.
 */
declare function tilemap_set_width(tilemap_element_id: Id.TileMapElement, width: number): undefined;
/**
 * Using this function you can change the tile set asset assigned to a given tile map element on a layer.
 */
declare function tilemap_tileset(tilemap_element_id: Id.TileMapElement, tileset_index: Asset.GMTileSet): undefined;
/**
 * This function controls the position along the x-axis of the room of the asset tile map element on the layer.
 */
declare function tilemap_x(tilemap_element_id: Id.TileMapElement, x: number): undefined;
/**
 * This function controls the position along the y-axis of the room of the asset tile map element on the layer.
 */
declare function tilemap_y(tilemap_element_id: Id.TileMapElement, y: number): undefined;
/**
 * This function can be used to check whether a given set of tile-data is for an empty tile or not.
 */
declare function tile_get_empty(tiledata: number): boolean;
/**
 * This function can be used to check whether in a given set of tile-data the tile has been flipped or not.
 */
declare function tile_get_flip(tiledata: number): boolean;
/**
 * This function can be used to get the tile index (the position of the tile within the tile set image) from a set of tile-data.
 */
declare function tile_get_index(tiledata: number): number;
/**
 * This function can be used to check whether in a given set of tile-data the tile has been mirrored or not.
 */
declare function tile_get_mirror(tiledata: number): boolean;
/**
 * This function can be used to check whether in a given set of tile-data the tile has been rotated 90 degrees or not.
 */
declare function tile_get_rotate(tiledata: number): boolean;
/**
 * This function can be used to set a given set of tile-data to be an empty tile. The function will return a modified tile-data set which can then be applied using the tilemap_set() function.
 */
declare function tile_set_empty(tiledata: number): number;
/**
 * This function can be used to set a given set of tile-data to flip the tile or not. The function will return a modified tile-data set which can then be applied using the tilemap_set() function.
 */
declare function tile_set_flip(tiledata: number, flip: boolean): number;
/**
 * This function can be used to set the tile index (the position of the tile within the tile set image) for a set of tile-data. The function will return a modified tile-data set which can then be applied using the tilemap_set() function.
 */
declare function tile_set_index(tiledata: number, index: number): number;
/**
 * This function can be used to set a given set of tile-data to mirror the tile or not. The function will return a modified tile-data set which can then be applied using the tilemap_set() function.
 */
declare function tile_set_mirror(tiledata: number, mirror: boolean): number;
/**
 * This function can be used to set a given set of tile-data to rotate the tile 90 degrees or not. The function will return a modified tile-data set which can then be applied using the tilemap_set() function.
 */
declare function tile_set_rotate(tiledata: number, rotate: boolean): number;
/**
 * This function calls a Script Function or Method with the given arguments.
 */
declare function script_execute(scr: GMLFunction | Asset.GMScript, ___?: GML.ArgumentIdentity): unknown;
/**
 * This function calls a Script Function or Method, with the given arguments passed as an Array.
 */
declare function script_execute_ext(scr: GMLFunction | Asset.GMScript, array_args?: unknown[], offset?: number, num_args?: number): unknown;
/**
 * This function calls a method in its bound context, with the arguments taken from an array or a range in an array.
 */
declare function method_call(method: GMLFunction, array_args?: unknown[], offset?: number, num_args?: number): unknown;
/**
 * This function will return true or false depending on whether the script or script function with the given index exists. Note that this is not a string, but rather the asset name which holds the unique index for each script (as it would appear in the IDE) or the script function name variable, as defined within the script asset (note that this will not work for method variables).
 */
declare function script_exists(scr: Asset.GMScript): boolean;
/**
 * This function will return the name as a string of the specified script. This name is the one that has been specified for the script in the Asset Browser of the main GameMaker window. For more information about scripts, see The Script Editor.
 */
declare function script_get_name(scr: Asset.GMScript | GMLFunction): string;
/**
 * With this function you can create a new sequence object which you can then add tracks to. The function returns a struct which you can then access to set up the new sequence you have created. The sequence object struct can then be used to create instances of the sequence on a room layer using the function layer_sequence_create().
 */
declare function sequence_create(): Struct.Sequence;
/**
 * With this function you can destroy a sequence object that has been created dynamically. This function should be used whenever a dynamically created sequence is no longer required to free up the memory associated with it.
 */
declare function sequence_destroy(sequence_struct_or_id: Struct.Sequence): undefined;
/**
 * With this function you can check to see if a sequence object exists or not.
 */
declare function sequence_exists(sequence_struct_or_id: Asset.GMSequence | Struct.Sequence): boolean;
/**
 * With this function you can retrieve the sequence object struct from a sequence asset index.
 */
declare function sequence_get(sequence_index: Asset.GMSequence): Struct.Sequence;
/**
 * With this function you can retrieve an array of all the object indices that have instances being created within the given sequence.
 */
declare function sequence_get_objects(sequence_struct_or_id: Asset.GMSequence | Struct.Sequence): Array<Asset.GMObject>;
/**
 * With this function you can override (replace) all instances of an object used in a sequence with another one. Note that this can only be done on sequence instances (not sequence objects) and must be done before the sequence starts to play, otherwise it won't work.
 */
declare function sequence_instance_override_object(sequence_instance_struct: Struct.Sequence, object_id: Asset.GMObject, instance_or_object_id: Id.Instance | Asset.GMObject): undefined;
/**
 * With this function you can create a new keyframe data struct, supplying the type of track that the keyframe data will be applied to.
 */
declare function sequence_keyframedata_new(type: Constant.SequenceTrackType): Record<string, unknown>;
/**
 * With this function you can create a new track keyframe struct, supplying the type of track that the keyframe will be applied to.
 */
declare function sequence_keyframe_new(type: Constant.SequenceTrackType): Struct.Keyframe;
/**
 * With this function you can create a new sequence track struct, supplying the type of track that you wish to make.
 */
declare function sequence_track_new(type: Constant.SequenceTrackType): Struct.Track;
/**
 * This function will do a check to see if the chosen target platform supports shaders, returning true if they do, and false if they do not. It is important to note that on Android, if the project does not have any shader resources defined, then the function will always return false, regardless of whether the device supports shaders or not.
 */
declare function shaders_are_supported(): boolean;
/**
 * This function will return the index ID value of the shader currently being used for rendering, or it will return -1 if no shader is being used.
 */
declare function shader_current(): Asset.GMShader;
/**
 * This function enables the use of corner IDs in shaders.
 */
declare function shader_enable_corner_id(enable: boolean): undefined;
/**
 * With this function you can retrieve the name of a shader asset.
 */
declare function shader_get_name(shader: Asset.GMShader): string;
/**
 * This function gets the handle of the shader sampler with the given name.
 */
declare function shader_get_sampler_index(shader: Asset.GMShader, uniform: string): Id.Sampler;
/**
 * This function gets the handle of the shader constant with the given name.
 */
declare function shader_get_uniform(shader: Asset.GMShader, uniform: string): Id.Uniform;
/**
 * This function will check a shader at runtime to make sure that it has been successfully compiled. This function should be used at the start of the game to make sure that the platform running your game has successfully compiled any shaders used.
 */
declare function shader_is_compiled(shader: Asset.GMShader): boolean;
/**
 * This function sets a shader constant to hold an array of matrix values.
 */
declare function shader_set_uniform_matrix_array(handle: Id.Uniform, array: unknown[]): undefined;
/**
 * With this function you can set the drawing target to the given shader and all further drawing will be done using that. You can end shader use with function shader_reset().
 */
declare function shader_set(shader: Asset.GMShader): undefined;
/**
 * With this function you can set the value (or values) of a shader constant. You must previously have gotten the "handle" of the constant using the function shader_get_uniform(), and you will have to know what type of constant it is to pass the correct number of floating point values through to it, i.e.: if you have a vec2 you will need to pass two values to the function.
 */
declare function shader_set_uniform_f(handle: Id.Uniform, value1: number, value2?: number, value3?: number, value4?: number): undefined;
/**
 * With this function you can set a shader constant to hold an array of values. You must previously have gotten the "handle" of the constant using the function shader_get_uniform(), and you will have to have previously initialised the array.
 */
declare function shader_set_uniform_f_array(handle: Id.Uniform, array: unknown[]): undefined;
/**
 * With this function you can set values of a shader constant from a buffer. You must previously have gotten the "handle" of the constant using the function shader_get_uniform(), and you will have to have previously initialised the buffer and filled it with buffer_f32 data.
 */
declare function shader_set_uniform_f_buffer(handle: Id.Uniform, buffer: Id.Buffer, offset: number, count: number): undefined;
/**
 * With this function you can set the value (or values) of a shader constant. You must previously have gotten the "handle" of the constant using the function shader_get_uniform(), and you will have to know what type of constant it is to pass the correct number of integer values through to it, i.e.: if you have a vec2 you will need to pass two values to the function.
 */
declare function shader_set_uniform_i(handle: Id.Uniform, value1: number, value2?: number, value3?: number, value4?: number): undefined;
/**
 * With this function you can set the value (or values) of a shader constant to the current transform matrix. You must previously have gotten the "handle" of the constant using the function shader_get_uniform().
 */
declare function shader_set_uniform_matrix(handle: Id.Uniform): undefined;
/**
 * This function will clear the specified animation track of all animations, ready to be reassigned.
 */
declare function skeleton_animation_clear(track: number, reset?: boolean, duration?: number): undefined;
/**
 * With this function you can get the current animation set being used by your skeletal animation sprite. The return value is a string, which will be the name of the set as you defined it in your skeletal animation program.
 */
declare function skeleton_animation_get(): string;
/**
 * This function will return the time required for the given animation set to run before looping back to the beginning. The return value is in seconds.
 */
declare function skeleton_animation_get_duration(animname: string): number;
/**
 * This function will return the name of the animation set currently used by the given track number (as set by the function skeleton_animation_set_ext).
 */
declare function skeleton_animation_get_ext(track: number): string;
/**
 * This function will return the frame number of the animation on the specified animation track. The function will return -1 if no animation is assigned to the specific track given.
 */
declare function skeleton_animation_get_frame(track: number): number;
/**
 * This function will return the current position of the specified animation track in the range (0.0 to 1.0). The function will return -1 if no animation is assigned to the specific track given.
 */
declare function skeleton_animation_get_position(track: number): number;
/**
 * This function can be used to retrieve the number of frames that any given skeleton animation has. The function will return 0 if the specified animation does not exist.
 */
declare function skeleton_animation_get_frames(anim_name: string): number;
/**
 * This function will return true if the animation on the given track has finished.
 */
declare function skeleton_animation_is_finished(track: number): boolean;
/**
 * This function will return true if the animation on the given track is looping.
 */
declare function skeleton_animation_is_looping(track: number): boolean;
/**
 * With this function you can populate a (pre-created) DS list with all the names of the animations included as part of the skeletal animation sprite. The names will be strings and can then be used in the other animation functions for these types of sprite.
 */
declare function skeleton_animation_list(sprite: Asset.GMSprite, list: Id.DsList): undefined;
/**
 * This function sets the mix value between two animation sets that the instance's skeletal animation sprite will interpolate between.
 */
declare function skeleton_animation_mix(animfrom: string, animto: string, duration: number): undefined;
/**
 * This function defines the animation set to be used by the skeletal animation sprite assigned to the instance.
 */
declare function skeleton_animation_set(animname: string, loop?: boolean): undefined;
/**
 * This function assigns the given animation set of the instance's skeletal animation sprite to the given track number.
 */
declare function skeleton_animation_set_ext(animname: string, track: number, loop?: boolean): undefined;
/**
 * This function will set the animation assigned to the given track to the frame you supply. The frame index should be an real value between 0 and the number of frames for the animation (which you can get using the function skeleton_animation_get_frames). If you supply a value outside of this range, the animation will be looped to make up the difference, for example if the animation has 5 frames and you set the frame to 8, the actual frame shown will be 3.
 */
declare function skeleton_animation_set_frame(track: number, index: number): undefined;
/**
 * This function will set the animation assigned to the given track to the proportional position you supply. The position should be a real value between 0.0 and 1.0. If you supply a value outside of this range, the animation will be looped to make up the difference, for example if the given position is 1.5 the actual position will be 0.5.
 */
declare function skeleton_animation_set_position(track: number, position: number): undefined;
/**
 * This function creates an attachment for the instance's skeletal animation sprite at runtime using a sprite asset from your game.
 */
declare function skeleton_attachment_create(name: string, sprite: Asset.GMSprite, ind: number, xorigin: number, yorigin: number, xscale: number, yscale: number, rot: number): unknown;
/**
 * This function creates an attachment for the instance's skeletal animation sprite at runtime using a sprite asset from your game, blended with the given colour and alpha value.
 */
declare function skeleton_attachment_create_colour(name: string, sprite: Asset.GMSprite, ind: number, xorigin: number, yorigin: number, xscale: number, yscale: number, rot: number, colour: Constant.Color, alpha: number): unknown;
/**
 * This function checks if a custom attachment has been created using the skeleton_attachment_create() or skeleton_attachment_replace() functions.
 */
declare function skeleton_attachment_exists(name: string): boolean;
/**
 * This function replaces an existing custom attachment on the current instance's skeletal animation sprite with another one.
 */
declare function skeleton_attachment_replace(name: string, sprite: Asset.GMSprite, ind: number, xorigin: number, yorigin: number, xscale: number, yscale: number, rot: number): unknown;
/**
 * This function replaces an existing custom attachment on the current instance's skeletal animation sprite with another one and also sets the blend colour to use when drawing this attachment.
 */
declare function skeleton_attachment_replace_colour(name: string, sprite: Asset.GMSprite, ind: number, xorigin: number, yorigin: number, xscale: number, yscale: number, rot: number, colour: Constant.Color, alpha: number): unknown;
/**
 * This function replaces an existing custom attachment on the current instance's skeletal animation sprite with another one and also sets the blend color to use when drawing this attachment.
 */
declare function skeleton_attachment_replace_color(name: string, sprite: Asset.GMSprite, ind: number, xorigin: number, yorigin: number, xscale: number, yscale: number, rot: number, color: Constant.Color, alpha: number): unknown;
/**
 * This function destroys a custom attachment previously created using the skeleton_attachment_create() or skeleton_attachment_replace() functions. Any slots using the attachment will be cleared.
 */
declare function skeleton_attachment_destroy(name: string): unknown;
/**
 * Using this function you can get the name (as a string) of the attachment for the given slot of the currently assigned skeletal animation sprite.
 */
declare function skeleton_attachment_get(slot: string): string;
/**
 * With this function you can set an attachment to a given slot, where you are required to give the names (as strings) of the slot and the attachment.
 */
declare function skeleton_attachment_set(slot: string, attachment: Asset.GMSprite | string): string;
/**
 * This function gets information on the transform of a named bone of the instance's skeletal animation sprite.
 */
declare function skeleton_bone_data_get(bone: string, map: Id.DsMap): undefined;
/**
 * This function sets transform data for a named bone of the instance's skeletal animation sprite.
 */
declare function skeleton_bone_data_set(bone: string, map: Id.DsMap): undefined;
/**
 * With this function you can populate a (pre-created) DS list with all the names of the bones used as part of the skeletal animation sprite. The names will be strings and can then be used in the other skeleton animation bone functions for these types of sprite.
 */
declare function skeleton_bone_list(sprite: Asset.GMSprite, list: Id.DsMap): undefined;
/**
 * This function sets data related to the transform of a named bone of the instance's skeletal animation sprite.
 */
declare function skeleton_bone_state_get(bone: string, map: Id.DsMap): undefined;
/**
 * This function sets data related to the transform of a named bone of the instance's skeletal animation sprite.
 */
declare function skeleton_bone_state_set(bone: string, map: Id.DsMap): undefined;
/**
 * This function draws a skeletal animation sprite.
 */
declare function draw_skeleton(sprite: Asset.GMSprite, animname: string, skinname: string, frame: number, x: number, y: number, xscale: number, yscale: number, rot: number, colour: Constant.Color, alpha: number): undefined;
/**
 * This function will draw the collision masks associated with the given skeletal animation.
 */
declare function draw_skeleton_collision(sprite: Asset.GMSprite, animname: string, frame: number, x: number, y: number, xscale: number, yscale: number, rot: number, colour: Constant.Color): undefined;
/**
 * This function draws the skeletal animation sprite assigned to a particular instance.
 */
declare function draw_skeleton_instance(instance: Id.Instance, animname: string, skinname: string, frame: number, x: number, y: number, xscale: number, yscale: number, rot: number, colour: Constant.Color, alpha: number): undefined;
/**
 * This function will draw the given animation using the given skin at a specific time in the animation. The time value should be between 0 (the beginning) and the end duration of the animation, which you can find using the function skeleton_animation_get_duration().
 */
declare function draw_skeleton_time(sprite: Asset.GMSprite, animname: string, skinname: string, time: number, x: number, y: number, xscale: number, yscale: number, rot: number, colour: Constant.Color, alpha: number): undefined;
/**
 * With this function, you can toggle on (true) or off (false) drawing the collision data for the current skeletal animation sprite being used by the instance. If this is switched on, the bounding box and the precise collision mask will be drawn as outlines around the sprite.
 */
declare function skeleton_collision_draw_set(flag: boolean): undefined;
/**
 * This function will return an array of values associated with any given bounding box for the currently assigned skeleton animation sprite.
 */
declare function skeleton_get_bounds(index: number): Array<number>;
/**
 * This function will return an array with the total bounding box value for all the individual bounding boxes assigned to a skeleton animation sprite. The returned array will have 4 elements: [0] - the minimum x position for all bounding boxes [1] - the minimum y position for all bounding boxes [2] - the maximum x position for all bounding boxes [3] - the maximum y position for all bounding boxes
 */
declare function skeleton_get_minmax(): Array<number>;
/**
 * This function will return the number of bounding boxes associated with the skeleton animation sprite assigned to the instance running the code. This can then be used along with the function skeleton_get_bounds() to retrieve data about each of the bounding boxes.
 */
declare function skeleton_get_num_bounds(): number;
/**
 * Creates a new skin by combining one or more skins defined in the sprite. This can be used (for example) to combine multiple skins defining different pieces of clothing or accessories on a character sprite.
 */
declare function skeleton_skin_create(skin_name: string, base_skins: Array<string>): Struct.SkeletonSkin;
/**
 * With skeletal animation sprites, you can assign separate textures (called "skins") to the animation, thereby using one animation for multiple different things. This function will return the name of the skin (as a string) that is currently assigned to the skeletal animation sprite your instance is using.
 */
declare function skeleton_skin_get(): string;
/**
 * With this function you can populate a (pre-created) DS list with all the names of the skins included as part of the skeletal animation sprite. The names will be strings and can then be used in the other skeleton animation skin functions for these types of sprite.
 */
declare function skeleton_skin_list(sprite: Asset.GMSprite, list: Id.DsList): undefined;
/**
 * This function sets the skin used to draw a skeletal animation sprite.
 */
declare function skeleton_skin_set(skinname: unknown): undefined;
/**
 * With this function you can find which slots are at a specified room-space position in the Spine sprite associated with the current instance. Note that the list is always sorted in descending order starting from the top-most slot.
 */
declare function skeleton_find_slot(x: number, y: number, list: Id.DsList): undefined;
/**
 * With this function you can get an attachment slot alpha value.
 */
declare function skeleton_slot_alpha_get(slot: string): number;
/**
 * With this function you can get an attachment slot colour.
 */
declare function skeleton_slot_colour_get(slot: string): number;
/**
 * With this function you can set an attachment slot colour and alpha so all sprites attached to it will be drawn with these blend values. Keep in mind that the instance's sprite can have a blend colour and alpha setting (image_blend and image_alpha), as can the attachment (see the function skeleton_attachment_create_colour()), and so the final colour and alpha that the assigned attachment sprite for the slot will have will be a composite of all these values.
 */
declare function skeleton_slot_colour_set(slot: string, colour: Constant.Color, alpha: number): undefined;
/**
 * With this function you can populate a (pre-created) DS list with data for each of the available attachment slots that an animation contains. This data is returned in the forum of a DS map.
 */
declare function skeleton_slot_data(sprite: Asset.GMSprite, list: Id.DsList): undefined;
/**
 * With this function you can populate a (pre-created) DS list with data for each of the available attachment slots for the Spine sprite associated with the current instance (including any attachment modifications). This data is returned in the forum of a DS map.
 */
declare function skeleton_slot_data_instance(list: Id.DsList): undefined;
/**
 * With this function you can populate a (pre-created) DS list with all the names of the slots created as part of the skeletal animation sprite. The names will be strings and can then be used in the other skeleton animation slot functions for these types of sprite.
 */
declare function skeleton_slot_list(sprite: Asset.GMSprite, list: Id.DsList): undefined;
/**
 * This function returns the relative position of the bottom of the sprite bounding box. This value is given as a relative value based on the upper left corner of the base sprite asset being (0, 0). it is the same value as can be found in the sprite editor for the collision mask properties.
 */
declare function sprite_get_bbox_bottom(ind: Asset.GMSprite): number;
/**
 * This function returns the relative position of the left of the sprite bounding box. This value is given as a relative value based on the upper left corner of the base sprite asset being (0, 0). it is the same value as can be found in the sprite editor for the collision mask properties.
 */
declare function sprite_get_bbox_left(ind: Asset.GMSprite): number;
/**
 * This function will return the current "mode" for the bounding box calculations.
 */
declare function sprite_get_bbox_mode(ind: Asset.GMSprite): Constant.BBoxMode;
/**
 * This function returns the relative position of the right of the sprite bounding box. This value is given as a relative value based on the upper left corner of the base sprite asset being (0, 0). it is the same value as can be found in the sprite editor for the collision mask properties.
 */
declare function sprite_get_bbox_right(ind: Asset.GMSprite): number;
/**
 * This function returns the relative position of the top of the sprite bounding box. This value is given as a relative value based on the upper left corner of the base sprite asset being (0, 0). it is the same value as can be found in the sprite editor for the collision mask properties.
 */
declare function sprite_get_bbox_top(ind: Asset.GMSprite): number;
/**
 * With this function you can find the height of the base sprite asset, with no transforms, in pixels.
 */
declare function sprite_get_height(index: Asset.GMSprite): number;
/**
 * This function is used to retrieve information for the given sprite.
 */
declare function sprite_get_info(index: Asset.GMSprite): Struct.SpriteInfo;
/**
 * This function is used to generate the points of a convex hull for the given sprite. The function returns an array of reals defining the points of the convex hull.
 */
declare function sprite_get_convex_hull(index: Asset.GMSprite, max_pts?: number, subimg?: number): Array<number>;
/**
 * This function will return the name as a string of the specified sprite.
 */
declare function sprite_get_name(index: Asset.GMSprite): string;
/**
 * This function returns the Nine Slice struct for a sprite, containing all its Nine Slice properties as set in the Sprite Editor or using sprite_set_nineslice().
 */
declare function sprite_get_nineslice(ind: Asset.GMSprite): Record<string, unknown>;
/**
 * A sprite has to have at least one sub-image and this function will return just how many it has.
 */
declare function sprite_get_number(index: Asset.GMSprite): number;
/**
 * This function can be used to retrieve the sprite speed as defined for the sprite asset in the Sprite Editor. Note that the return value will be different depending on the type of speed that was applied in the Sprite Editor, either Frames Per Second, or Frames Per Game Frame.
 */
declare function sprite_get_speed(index: Asset.GMSprite): number;
/**
 * This function can be used to retrieve the sprite animation type as defined for the sprite asset in the Sprite Editor.
 */
declare function sprite_get_speed_type(index: Asset.GMSprite): Constant.SpriteSpeed;
/**
 * This function returns a special pointer for the sprite texture page. This value can then be used in other draw functions, particularly in the 2D primitive functions, as well as the Shader functions.
 */
declare function sprite_get_texture(spr: Asset.GMSprite, subimg: number): Pointer.Texture;
/**
 * This function will return a special value that relates to the position of the given sprite and sub-image on the texture page used by your game.
 */
declare function sprite_get_tpe(sprite: Asset.GMSprite, index: number): number;
/**
 * This function returns an array with the UV coordinates and other data for the texture of the sprite sub-image on the texture page. The function returns an array with the following 8 elements: [0] = left [1] = top [2] = right [3] = bottom [4] = amount of pixels the asset compiler has trimmed from the sprite's left side [5] = amount of pixels the asset compiler has trimmed from the sprite's top side [6] = normalised percentage of pixel data from the original sprite's width that has been saved to the texture page [7] = normalised percentage of pixel data from the original sprite's height that has been saved to the texture page
 */
declare function sprite_get_uvs(sprite: Asset.GMSprite, subimage: number): Array<number>;
/**
 * With this function you can find the width of the base asset sprite, with no transforms, in pixels.
 */
declare function sprite_get_width(index: Asset.GMSprite): number;
/**
 * This function returns the x offset of the origin of the given sprite.
 */
declare function sprite_get_xoffset(index: Asset.GMSprite): number;
/**
 * This function returns the y offset of the origin of the given sprite.
 */
declare function sprite_get_yoffset(index: Asset.GMSprite): number;
/**
 * With this function you can add an image as a sprite, loading it from an external source where the image file to be loaded should always be in either *.png, *.gif, *.jpg/jpeg or *.json format (*json files are used for loading skeleton animation sprites made with Spine). If you use this function with HTML5 or are getting an image from a URL, this function will also generate an Image Loaded asynchronous event.
 */
declare function sprite_add(fname: string, imgnum: number, removeback: boolean, smooth: boolean, xorig: number, yorig: number): Asset.GMSprite;
/**
 * With this function you can asynchronously add an image as a sprite, loading it from an external source where the image file to be loaded should always be in either *.png, *.gif, *.jpg/jpeg or *.json format (*json files are used for loading skeleton animation sprites made with Spine). This function will generate an Image Loaded asynchronous event when the sprite has been loaded.
 */
declare function sprite_add_ext(fname: string, imgnum: number, xorig: number, yorig: number, prefetch: boolean): Asset.GMSprite;
/**
 * This function works in exactly the same way as sprite_create_from_surface() only instead of creating a new sprite from the area of the indexed surface that you select, it adds the defined area of the surface as a new sub-image to a previously created sprite.
 */
declare function sprite_add_from_surface(index: Asset.GMSprite, surface: Id.Surface, x: number, y: number, w: number, h: number, removeback: boolean, smooth: boolean): undefined;
/**
 * This function takes two previously created (or included) sprite indexes, and copies the image from one to the other. In this way you can copy (or "clone") one sprite into another index. Note that you cannot copy to a game asset. You have to have created the sprite to be copied to previously using the sprite_add() or sprite_duplicate() functions.
 */
declare function sprite_assign(index: Asset.GMSprite, sprite: Asset.GMSprite): undefined;
/**
 * With this function you can set the properties of the collision mask that a sprite should have. If you select either automatic (0) or full image (1) as the bounding box mode then the individual bounding box values can be set to 0. However, for a user-defined mask (2) you will have to set these values.
 */
declare function sprite_collision_mask(ind: Asset.GMSprite, sepmasks: boolean, bboxmode: number, bbleft: number, bbtop: number, bbright: number, bbbottom: number, kind: Constant.CollisionMask, tolerance: number): undefined;
/**
 * With this function you can create a sprite from a previously initialised surface (the surface index ID value is returned when you create the surface using surface_create()).
 */
declare function sprite_create_from_surface(index: Id.Surface, x: number, y: number, w: number, h: number, removeback: boolean, smooth: boolean, xorig: number, yorig: number): Asset.GMSprite;
/**
 * This function will delete a sprite from the game, freeing any memory that was reserved for it. This cannot be used to delete sprites that are included in the game as part of the assets in the Asset Browser.
 */
declare function sprite_delete(index: Asset.GMSprite): boolean;
/**
 * This function will return the index of a newly created sprite that is a duplicate (copy) of the one input as the "index" argument. If the function fails, -1 is returned.
 */
declare function sprite_duplicate(index: Asset.GMSprite): Asset.GMSprite;
/**
 * This function returns whether a sprite with the specified index exists or not in the project being run.
 */
declare function sprite_exists(index: Asset.GMSprite): boolean;
/**
 * With this function you can remove the given texture page for the given sprite from texture memory. Note that the function will return -1 if flush is not supported for the chosen asset, or it will return 0 if all worked correctly.
 */
declare function sprite_flush(ind: Asset.GMSprite): number;
/**
 * This function removes any number of texture pages for the given sprites from texture memory. Note that the function will return -1 if flush is not supported for the chosen resources, or it will return 0 if all worked correctly.
 */
declare function sprite_flush_multi(array: Array<Asset.GMSprite>): number;
/**
 * This function will merge the sprite indexed in argument 1 ("ind2") with that which is indexed in argument 0 ("ind1"). The images themselves are NOT merged together, but rather the image indices are merged, with the sub images from sprite "ind2" appended onto those of sprite "ind1", i.e.: they are added on at the end. Note that if the sprites are different sizes, then the appended sprites are stretched to fit the image size for "ind1".
 */
declare function sprite_merge(ind1: Asset.GMSprite, ind2: Asset.GMSprite): undefined;
/**
 * This function is used to create a Nine Slice struct which can be modified and then applied to a sprite.
 */
declare function sprite_nineslice_create(): Record<string, unknown>;
/**
 * This function can be used to prefetch (place into texture memory) a texture page with the given sprite. Note that the function will return -1 if prefetch is not supported for the chosen asset or the target platform is HTML5, or it will return 0 if all worked correctly.
 */
declare function sprite_prefetch(ind: Asset.GMSprite): number;
/**
 * This function can be used to prefetch (place into texture memory) a number of texture pages that contain the sprites given. Note that the function will return -1 if prefetch is not supported for the chosen asset or the target platform is HTML5, or it will return 0 if all worked correctly.
 */
declare function sprite_prefetch_multi(array: Array<Asset.GMSprite>): number;
/**
 * This function works in almost the exact same manner as sprite_add(), only instead of returning the index of the sprite you are importing, it overwrites a previously created sprite index.
 */
declare function sprite_replace(ind: Asset.GMSprite, fname: string, imgnumb: number, removeback: boolean, smooth: boolean, xorig: number, yorig: number): undefined;
/**
 * This function can be used to save any sub-image of a sprite to disc, giving it the specified filename. The sprite must have been added at runtime (you cannot save sprites added through the IDE) and the file must be saved with a *.png extension.
 */
declare function sprite_save(ind: Asset.GMSprite, subimg: number, fname: string): undefined;
/**
 * This function will create a strip image from all the sub-images in a sprite, saving it to disc with the specified filename. The sprite must have been added at runtime (you cannot save sprites added through the IDE) and the file must be saved with a *.png extension.
 */
declare function sprite_save_strip(ind: Asset.GMSprite, filename: string): undefined;
/**
 * This function uses the value/saturation of one sprite and multiplies it with the alpha of the target sprite. Ideally the sprite being used to generate the new alpha map should be grey-scale, with the white areas having an equivalent alpha value of 1 (opaque), the black areas being equivalent to alpha 0 (transparent), and the grey areas being an alpha in between 0 and 1.
 */
declare function sprite_set_alpha_from_sprite(ind: Asset.GMSprite, spr: Asset.GMSprite): undefined;
/**
 * This function can be used to set the bounding box values for a sprite. The positions are absolute values, where the (0, 0) position corresponds to the top-left corner of the sprite, regardless of the offset for the sprite, any "empty" pixels the sprite may have, or where it is being drawn in the room.
 */
declare function sprite_set_bbox(ind: Asset.GMSprite, left: number, top: number, right: number, bottom: number): undefined;
/**
 * This function can be used to set the bounding box mode for a sprite.
 */
declare function sprite_set_bbox_mode(ind: Asset.GMSprite, mode: Constant.BBoxMode): undefined;
/**
 * This function is used on HTML5 to set how many blended copies of the given sprite to cache before old ones are overwritten (default is 4). This is applied to all sub-images of the sprite.
 */
declare function sprite_set_cache_size(ind: Asset.GMSprite, max: number): undefined;
/**
 * This function is used on HTML5 to set how many blended copies of the given sprite can be cached before old ones are overwritten (default is 4). This is applied to the given sub-image of the sprite.
 */
declare function sprite_set_cache_size_ext(ind: Asset.GMSprite, index: number, max: number): undefined;
/**
 * This function is used to apply a Nine Slice struct to a sprite.
 */
declare function sprite_set_nineslice(ind: Asset.GMSprite, nineslice: Struct.NineSlice): undefined;
/**
 * This function can be used to set the x and y origin of a sprite, and takes relative values based on the (0, 0) position being the upper left corner of the sprite.
 */
declare function sprite_set_offset(ind: Asset.GMSprite, xoff: number, yoff: number): undefined;
/**
 * This function can be used to set the base animation speed and type for the sprite asset. This is normally set in the Sprite Editor, but there may be moments when you are required to set this manually for a given sprite.
 */
declare function sprite_set_speed(index: Asset.GMSprite, speed: number, type: Constant.SpriteSpeed): undefined;
/**
 * This function will return the name as a string of the specified tile set. This name is the one that has been specified for the tile set in the Asset Browser of the main GameMaker window.
 */
declare function tileset_get_name(index: Asset.GMTileSet): string;
/**
 * This function returns a special pointer for the tile set texture page. This value can then be used in other draw functions, particularly in the 2D primitive functions, as well as the Shader functions.
 */
declare function tileset_get_texture(tileset: Asset.GMTileSet): Pointer.Texture;
/**
 * This function returns an array with the UV coordinates and other data for the texture of the given tile set on the texture page. The function returns an array with the following 8 elements: [0] = left [1] = top [2] = right [3] = bottom [4] = amount of pixels the asset compiler has trimmed from the tile set left side [5] = amount of pixels the asset compiler has trimmed from the tile set top side [6] = normalised percentage of pixel data from the original tile set width that has been saved to the texture page [7] = normalised percentage of pixel data from the original tile set height that has been saved to the texture page
 */
declare function tileset_get_uvs(tileset: Asset.GMTileSet): Array<number>;
/**
 * This function is used to retrieve information about the given tileset.
 */
declare function tileset_get_info(index: Asset.GMTileSet): Struct.TileSetInfo;
/**
 * With this function you can add a new (empty) time line into your game. You should make sure to use the function timeline_delete() whenever you no longer wish it to prevent any possible memory leaks. To add moments to a timeline created in this way, see the function timeline_moment_add_script().
 */
declare function timeline_add(): Asset.GMTimeline;
/**
 * With this function you can clear a specific time line of "moments", removing all codes and actions for that time line and leaving it empty.
 */
declare function timeline_clear(ind: Asset.GMTimeline): undefined;
/**
 * This function delete the given time line from your game.
 */
declare function timeline_delete(ind: Asset.GMTimeline): undefined;
/**
 * With this function you can check and see whether a time line exists (returns true) or not (returns false).
 */
declare function timeline_exists(ind: Asset.GMTimeline): boolean;
/**
 * This function can be used to get the name of a time line as a string.
 */
declare function timeline_get_name(ind: Asset.GMTimeline): string;
/**
 * This function will return the value of the moment in which the timeline performs its final action.
 */
declare function timeline_max_moment(ind: Asset.GMTimeline): number;
/**
 * With this function you can dynamically add a script function to Timelines at any given "moment" within that time line, where a "moment" is the equivalent of one game tick (or step).
 */
declare function timeline_moment_add_script(ind: Asset.GMTimeline, step: number, script: Asset.GMScript | GMLFunction): undefined;
/**
 * With this function you can clear a specific moment of any previously defined time line of all codes and actions.
 */
declare function timeline_moment_clear(ind: Asset.GMTimeline, step: number): undefined;
/**
 * With this function you can get the total number of active moments for a timeline (an "active" moment is one which has GML Code or GML Visual added to it).
 */
declare function timeline_size(ind: Asset.GMTimeline): number;
/**
 * This function will return true if the user is currently connected to the internet and the chosen leaderboard and achievement system is available, otherwise it will return false.
 * @deprecated
 */
declare function achievement_available(): boolean;
/**
 * This function will send a request to the server for information on all current challenges and will trigger a callback Social Asynchronous Event which contains the async_load map populated with the relevant key/value pairs. The id key of this DS Map is used to identify the correct callback (there can be more than one trigger function for any given asynchronous event), and will be paired with the constant achievement_challenge_list_received as well as a number of other key/value pairs for each challenge.
 * @deprecated
 */
declare function achievement_get_challenges(): undefined;
/**
 * This function will send a request to the server for the image of a player or a friend and will trigger a callback Social Asynchronous Event which contains the async_load map populated with the relevant key/value pairs. The id key of this DS Map is used to identify the correct callback (there can be more than one trigger function for any given asynchronous event), and will be paired with the constant achievement_pic_loaded as well as a number of other key/value pairs.
 * @deprecated
 */
declare function achievement_get_pic(char: number): undefined;
/**
 * Games can have achievements with no completion value and so you can use this function to increment those achievement by a given amount. On Android, you send the ID of the achievement as a string (this is the unique achievement ID that got assigned when you set up the achievement), while on all other platforms you supply the defined achievement name as a string, and then you give the actual achievement value to increment by.
 * @deprecated
 */
declare function achievement_increment(name: string, value: unknown): undefined;
/**
 * This function will send a request to the server for information on all the logged in users friends and will trigger a callback Social Asynchronous Event which contains the async_load map populated with the relevant key/value pairs. The id key of this DS Map is used to identify the correct callback (there can be more than one trigger function for any given asynchronous event), and will be paired with the constant achievement_friends_info as well as a number of other key/value pairs for each friend.
 * @deprecated
 */
declare function achievement_load_friends(): undefined;
/**
 * below)
 * @deprecated
 */
declare function achievement_load_leaderboard(ident: string, minindex: number, maxindex: number, filter: string): undefined;
/**
 * This function will send a request to the server for information on all available achievements. It will trigger a callback Social Asynchronous Event which contains the async_load map populated with the relevant key/value pairs. The id key of this DS Map is used to identify the correct callback (there can be more than one trigger function for any given asynchronous event), and will be paired with the constant achievement_achievement_info as well as a number of other key/value pairs for each player.
 * @deprecated
 */
declare function achievement_load_progress(): undefined;
/**
 * This function logs the user into appropriate leaderboard and achievement service. If the service is not available, the user is logged into a "pretend" game centre and all achievements and scores are stored on the device so that when the actual service is available, these details can be uploaded. The function will trigger a callback Social Asynchronous Event which contains the async_load map populated with the relevant key/value pairs. The id key of this DS Map is used to identify the correct callback (there can be more than one trigger function for any given asynchronous event), and will be paired with the constant achievement_our_info as well as a number of other key/value pairs for each challenge.
 * @deprecated
 */
declare function achievement_login(): undefined;
/**
 * This function is currently only useful for Google Play on the Android platform. It will check to see if the user is already logged into Google services, in which case it will return true, or not, returning false. If it returns true there is no need to call the achievement_login() function.
 * @deprecated
 */
declare function achievement_login_status(): boolean;
/**
 * This function logs the user out of the chosen leaderboard and achievement service. This will stop all further achievements and scores from being recorded.
 * @deprecated
 */
declare function achievement_logout(): undefined;
/**
 * You can use this function to send your achievements to the chosen leaderboard and achievement service. On Android you will need the the ID of the achievement as a string (this is the unique achievement ID that got assigned when you set up the achievement), while on all other platforms you supply the achievement name as a string, and then you give the percentage that you have completed towards getting the achievement (0 - None, 100 - Completed). The function will trigger a Social Asynchronous Event where the returned async_load DS map will have the following key/value pairs:
 * @deprecated
 */
declare function achievement_post(achievement: string, percent: number): undefined;
/**
 * You can use this function to send your score to the chosen leaderboard and achievement service. On Android, you send the ID of the score table as a string (this is the unique leaderboard ID that got assigned when you set up the leaderboard), while on all other platforms you supply the defined leaderboard name as a string, and then you give the actual score value. The function will trigger a Social Asynchronous Event where the returned async_load DS map will have the following key/value pairs:
 * @deprecated
 */
declare function achievement_post_score(leaderboard: string, score: number): undefined;
/**
 * This function will reset all achievements back to their initial values for the game. This function is provided as a debug function and it is not recommended that you permit the end-user to do this in your games.
 * @deprecated
 */
declare function achievement_reset(): undefined;
/**
 * This function will send a challenge across the network to the chosen player. You can get the playerid using the achievement_load_friends() or the achievement_load_leaderboard() functions and you must also supply the challengeid which is the unique value given the challenge when you created it on your iTunes Connect or Google Play dashboard. You must also supply a score, and a short text message as well as set the challenge type. This can be one of the following constants:
 * @deprecated
 */
declare function achievement_send_challenge(playerid: number, challengeid: number, score: number, type: number, message: string): undefined;
/**
 * This function will open the achievements page for the chosen platform. Please note that this is an asynchronous function, i.e.: your game will continue to run in the background while the achievements page is being shown. As such, you should be careful where you use this and make sure to pause the game or only permit it to be shown in areas of your game where it will not interfere with the game-play.
 * @deprecated
 */
declare function achievement_show_achievements(): undefined;
/**
 * With this function you can show, or suppress, the various different "toast" pop-up notifications relating to challenges. When the arguments are set to true these messages will appear, informing the player of any local or remote challenges received as well as those challenges that have been completed, while setting them to false will suppress these notifications.
 * @deprecated
 */
declare function achievement_show_challenge_notifications(receive: boolean, local: boolean, remote: boolean): undefined;
/**
 * This function will open the leaderboards page for the chosen platform. Please note that this is an asynchronous function, i.e.: your game will continue to run in the background while the leaderboards page is being shown. As such, you should be careful where you use this and make sure to pause the game or only permit it to be shown in areas of your game where it will not interfere with the game-play.
 * @deprecated
 */
declare function achievement_show_leaderboards(): undefined;
/**
 * This function will commit a file to the chosen cloud service for storage. The function will return a unique id value that should then be used in the appropriate asynchronous event to identify the DS map that is returned as a "call back" from the cloud service. The file should contain all the information that you need to save for your game as you can only store one single "data blob" to the cloud, and running this function again will overwrite any previously stored values (as will using the cloud_string_save() function). The description should be a short string of information that describes the save, e.g.: "Level2, Stage2".
 * @deprecated
 */
declare function cloud_file_save(string: string, description: string): number;
/**
 * This function will commit a string to the chosen cloud service for storage. The function will return a unique id value that should then be used in the appropriate asynchronous event to identify the DS map that is returned as a "call back" from the cloud service. The string should contain all the information that you need to save for your game as you can only store one single "data blob" to the cloud, and running this function again will overwrite any previously stored values (as will using the cloud_file_save() function). The description should be a short string of information that describes the save, e.g.: "Level2, Stage2".
 * @deprecated
 */
declare function cloud_string_save(string: string, description: string): number;
/**
 * This function would normally be called at the start of a new game and is used to retrieve the current status of the cloud service at game start up. The function returns a unique id value which would then be used in the Asynchronous Cloud Event to retrieve the relevant information from the DS map that is created.
 * @deprecated
 */
declare function cloud_synchronise(): number;
/**
 * This function opens a window and displays a message as well as a space for the user to input a value. This is an asynchronous function that triggers an asynchronous Dialog event with the event's information held in the variable async_load.
 */
declare function get_integer_async(string: string, default_: number): number;
/**
 * This function opens a window that asks the user to input a username and password. This is an asynchronous function that triggers an asynchronous Dialog event with the event's information held in the variable async_load.
 */
declare function get_login_async(username: string, password: string): number;
/**
 * This function opens a window and displays a message as well as a space for the user to input a string. This is an asynchronous function that triggers an asynchronous Dialog event with the event's information held in the variable async_load.
 */
declare function get_string_async(string: string, default_: string): number;
/**
 * This function opens up an OS dependent dialog where you can ask the user to post a rating or comment to a particular page. You can define the text that is to appear in the dialogue, as well as the text you wish to appear on the two buttons and the URL where the comment has to be posted.
 */
declare function shop_leave_rating(text: string, yes_string: string, no_string: string, url: string): undefined;
/**
 * This function opens a window and displays the message you define in the function to the user.This is an asynchronous function that triggers an asynchronous Dialog event with the event's information held in the variable async_load.
 */
declare function show_message_async(string: unknown): number;
/**
 * This function opens a window and displays the question you define in the function to the user.This is an asynchronous function that triggers an asynchronous Dialog event with the event's information held in the variable async_load.
 */
declare function show_question_async(string: string): number;
/**
 * This function sends a GET request to the specified URL in order to retrieve information.
 */
declare function http_get(url: string): number;
/**
 * This function returns the connection timeout value in milliseconds used for HTTP requests.
 */
declare function http_get_connect_timeout(): string;
/**
 * This function connects to the specified URL in order to retrieve information in the form of a file.
 */
declare function http_get_file(url: string, local_target: string): number;
/**
 * This function can be used to get the cross-origin type set for HTML5 games and will return a string (on all other platforms an empty string "" will be returned).
 */
declare function http_get_request_crossorigin(): string;
/**
 * This function posts a string using the HTTP POST method.
 */
declare function http_post_string(url: string, string: string): number;
/**
 * This function creates a generic HTTP request and sends it.
 */
declare function http_request(url: string, method: string, header_map: Id.DsMap, body: number | string | Id.Buffer): number;
/**
 * This function sets the connection timeout used for HTTP requests. Any requests made after a call to this function will use this timeout.
 */
declare function http_set_connect_timeout(connect_timeout_ms: number): undefined;
/**
 * With this function you can set the cross-origin type to use when loading images from a file (using sprite_add()), or sending custom HTTP requests to servers (e.g. using http_post_string()). The function is exclusively for the HTML5 platform.
 */
declare function http_set_request_crossorigin(origin_type: string): undefined;
/**
 * This function cancels the given push notification. You can get the ID for the notification to cancel using the functions push_get_first_local_notification() and push_get_next_local_notification() and the function will return true on success or false otherwise (for example if the notification does not exist or has already been triggered).
 * @deprecated
 */
declare function push_cancel_local_notification(id: number): number;
/**
 * This function will populate a pre-made DS map with a series of key/value pairs for the first local push notification in the queue to be shown. It returns -1 if there are no notifications queued, or a real value otherwise representing the ID for the notification. This ID can then be used to cancel the notification using the function push_cancel_local_notification().
 * @deprecated
 */
declare function push_get_first_local_notification(map: number): number;
/**
 * This function will populate a pre-made DS map with a series of key/value pairs for the next local push notification in the queue to be shown. It returns -1 if there are no further notifications queued, or a real value otherwise representing the ID for the notification. This ID can then be used to cancel the notification using the function push_cancel_local_notification(). You should call the function push_get_first_local_notification() to get the first notification in the queue and then use this function to continue through it.
 * @deprecated
 */
declare function push_get_next_local_notification(map: number): number;
/**
 * This function can be used to set a local notification to be shown on a given date at a given time. The "fire_time" is the date/time that the notification should be pushed to the user device (you can use the GameMaker Date and Time Functions to get this), and you can give the notification a title and a message text as well as a payload string which will be passed to your game when the users taps the notification.
 * @deprecated
 */
declare function push_local_notification(fire_time: number, title: unknown, message: unknown, data: unknown): undefined;
/**
 * This function is called when you want to begin the saving out of multiple buffers to multiple files.
 */
declare function buffer_async_group_begin(groupname: string): undefined;
/**
 * This function finishes the definition of a buffer async group and starts the saving of the files.
 */
declare function buffer_async_group_end(): number;
/**
 * This function sets some platform-specific options for the buffer group being saved/loaded.
 */
declare function buffer_async_group_option(option: string, value: unknown): undefined;
/**
 * This function decodes a base64 encoded string (created using the buffer_base64_encode function) into a new buffer.
 */
declare function buffer_base64_decode(string: string): Id.Buffer;
/**
 * This function decodes a base64 encoded string (created using the buffer_base64_encode function) into a buffer.
 */
declare function buffer_base64_decode_ext(buffer: Id.Buffer, string: string, offset: number): undefined;
/**
 * This function converts the data in the given buffer into a base64 encoded string.
 */
declare function buffer_base64_encode(buffer: Id.Buffer, offset: number, size: number): string;
/**
 * With this function you can compress part (or all) of a buffer using zlib compression. The function will return a new buffer ID value for the compressed buffer, or a value less than 0 if it has failed for any reason. This function will not alter the original buffer.
 */
declare function buffer_compress(buffer: Id.Buffer, offset: number, size: number): number;
/**
 * This function can be used to copy a segment (or all) of the data stored in one buffer to another.
 */
declare function buffer_copy(src_buffer: Id.Buffer, src_offset: number, size: number, dest_buffer: Id.Buffer, dest_offset: number): undefined;
/**
 * This function can be used to copy multiple data entries from one buffer to another, with the ability to specify different strides between individual entries in both the source and the destination buffers. The function takes into account the types of both buffers. If a buffer has a fixed size or is not a wrap buffer, the copying process will stop when the read or write position exceeds the buffer's range. Initial read and write positions can be negative, in which case they are computed from the end of given buffer.
 */
declare function buffer_copy_stride(src_buffer: Id.Buffer, src_offset: number, src_size: number, src_stride: number, src_count: number, dest_buffer: Id.Buffer, dest_offset: number, dest_stride: number): undefined;
/**
 * This function can be used to copy some (or all) of the vertex data stored in one vertex buffer into a previously created regular buffer. When copying from a vertex buffer into a regular buffer with this function, both buffers must have previously been created (using the vertex_create_buffer() and buffer_create() functions, for example). You can specify the range of vertex data that you wish to copy into the buffer, where the start vertex can be anywhere between 0 and the number of vertices -1, and you can give the number of vertices from that point on to copy. You can use the function vertex_get_number() on the vertex buffer to get the total number of vertices stored. Finally you give the buffer index to copy the vertex data into, as well as a data offset to define the position to copy the vertex data to in the destination buffer.
 */
declare function buffer_copy_from_vertex_buffer(vertex_buffer: Id.VertexBuffer, start_vertex: number, num_vertices: number, dest_buffer: Id.Buffer, dest_offset: number): undefined;
/**
 * This function will take input data from a buffer and returns a CRC32 checksum hash, which is a 32 bit integer value for the given region.
 */
declare function buffer_crc32(buffer: Id.Buffer, offset: number, size: number): number;
/**
 * You use this function to allocate a portion of memory as a buffer in your game, with the function returning the unique buffer id that should be stored in a variable and used for all further function calls to the buffer.
 */
declare function buffer_create(size: number, type: Constant.BufferType, alignment: number): Id.Buffer;
/**
 * You use this function to allocate a portion of memory as a buffer in your game filled with the data from a previously created vertex buffer.
 */
declare function buffer_create_from_vertex_buffer(vertex_buffer: Id.VertexBuffer, type: Constant.BufferType, alignment: number): Id.Buffer;
/**
 * You use this function to allocate a portion of memory as a buffer in your game filled with the data from a previously created vertex buffer.
 */
declare function buffer_create_from_vertex_buffer_ext(vertex_buffer: Id.VertexBuffer, type: Constant.BufferType, alignment: number, start_vertex: number, num_vertices: number): Id.Buffer;
/**
 * With this function you can decompress a previously compressed buffer using zlib compression. If the decompression has failed (for example, you are supplying a buffer that hasn't been compressed) then the function will instead return a value less than 0.
 */
declare function buffer_decompress(buffer: Id.Buffer): Id.Buffer;
/**
 * This function deletes a buffer previously created using buffer_create from memory, releasing the resources used to create it and removing any data that it may currently contain.
 */
declare function buffer_delete(buffer: Id.Buffer): undefined;
/**
 * This function checks whether the given buffer exists in memory or not. If it does, the function will return true, otherwise it will return false.
 */
declare function buffer_exists(buffer: Id.Buffer): boolean;
/**
 * This function fills a previously created buffer with a given data type and value.
 */
declare function buffer_fill(buffer: Id.Buffer, offset: number, type: Constant.BufferDataType, value: unknown, size: unknown): undefined;
/**
 * With this function you can get a pointer to the raw, aligned buffer address. This is primarily for use with extensions as you can pass this value through to them, allowing them to access the buffer data.
 */
declare function buffer_get_address(buffer: Id.Buffer): Pointer.Any;
/**
 * This function gets the byte alignment of the given buffer.
 */
declare function buffer_get_alignment(buffer: Id.Buffer): number;
/**
 * This function gets the size in bytes of the given buffer.
 */
declare function buffer_get_size(index: Id.Buffer): number;
/**
 * With this function you can write information from a surface to a given buffer. The buffer must have been created previously and should be a 1-byte aligned buffer large enough to store data for the surface you are going to write.
 */
declare function buffer_get_surface(buffer: Id.Buffer, surface: Id.Surface, offset: number): undefined;
/**
 * With this function you can write information from a surface's depth buffer to a given buffer. The buffer must have been created previously and should be a 1-byte aligned buffer large enough to store data for the surface you are going to write.
 */
declare function buffer_get_surface_depth(buffer: Id.Buffer, surface: Id.Surface, offset: number): boolean;
/**
 * This function returns the type of the given buffer.
 */
declare function buffer_get_type(buffer: Id.Buffer): Constant.BufferType;
/**
 * This function is used to load a buffer that was previously saved using the buffer_save() functions, as well as any Included Files or files loaded externally.
 */
declare function buffer_load(filename: string): Id.Buffer;
/**
 * With this function you can load a file that you have created previously using the buffer_save() function (or any of the other functions for saving buffers) into a buffer.
 */
declare function buffer_load_async(buffer: Id.Buffer, filename: string, offset: number, size: number): number;
/**
 * This function will load the buffer data that was previously saved using the buffer_save() functions into an already created buffer.
 */
declare function buffer_load_ext(buffer: Id.Buffer, filename: string, offset: number): undefined;
/**
 * This function will load some of the buffer data that was previously saved using the buffer_save() functions into an already created buffer.
 */
declare function buffer_load_partial(buffer: Id.Buffer, filename: string, offset: number, src_len: number, dest_offset: number): number;
/**
 * This function takes the input data from a given buffer (or part of the buffer) and returns the 32-character hexadecimal MD5 hash that is unique to that data. In this way you can generate a secure key which can be stored and used to check the integrity of the information being sent to (or received from) an external server (for example).
 */
declare function buffer_md5(buffer: Id.Buffer, offset: number, size: number): string;
/**
 * The buffer_peek function reads a piece of data of a certain type from the given buffer at an arbitrary offset position (in bytes). Contrary to buffer_read(), however, this function doesn't use or change the buffer's current "seek" position.
 */
declare function buffer_peek(buffer: Id.Buffer, offset: number, type: Constant.BufferDataType): GML.ArgumentIdentity;
/**
 * With this function you can write data into a buffer at the specified offset, without changing the seek position. This is different from buffer_write(), which uses the current seek position as the offset and advances that with the amount of bytes written.
 */
declare function buffer_poke(buffer: Id.Buffer, offset: number, type: Constant.BufferDataType, value: unknown): undefined;
/**
 * This function can be used to read data from a previously created buffer. The return value will depend on the type of data that you are reading, which in itself is defined by one of the BufferDataType constants.
 */
declare function buffer_read(buffer: Id.Buffer, type: Constant.BufferDataType): GML.ArgumentIdentity;
/**
 * With this function you can resize a given buffer to be the size (in bytes) that you specify.
 */
declare function buffer_resize(buffer: Id.Buffer, newsize: number): undefined;
/**
 * With this function you can save the contents of a buffer to a file, ready to be read back into memory using the buffer_load() function.
 */
declare function buffer_save(buffer: Id.Buffer, filename: string): undefined;
/**
 * This function saves (part of) the contents of a buffer to a file asynchronously, ready to be read back into memory using any of the buffer_load_* functions.
 */
declare function buffer_save_async(buffer: Id.Buffer, filename: string, offset: number, size: number): number;
/**
 * This function saves (part of) the contents of a buffer to a file, ready to be read back into memory using the buffer_load() function.
 */
declare function buffer_save_ext(buffer: Id.Buffer, filename: string, offset: number, size: number): undefined;
/**
 * This function shares a buffer or a url using the Web Share API (Emscripten only). The buffer contents will be shared as an image file. Returns 0 on success, -1 on error. A share_complete social async event will be triggered when the share completes or fails.
 */
declare function gx_share(content: Id.Buffer | string, title?: string, text?: string, filename?: string): number;
/**
 * This function moves the seek position of a buffer, setting it relative to the start, end or current seek position (that which was last used when reading or writing data). The seek position is the offset (in bytes) from the start of the buffer where new values are written, and from where values are read. It also moves automatically when you read from or write to a buffer.
 */
declare function buffer_seek(buffer: Id.Buffer, base: Constant.SeekOffset, offset: number): number;
/**
 * This function writes information from a buffer to a given surface.
 */
declare function buffer_set_surface(buffer: Id.Buffer, surface: Id.Surface, offset: number): undefined;
/**
 * This function copies data from a buffer into a surface's depth buffer.
 */
declare function buffer_set_surface_depth(buffer: Id.Buffer, surface: Id.Surface, offset: number): boolean;
/**
 * This function returns the used size of the given buffer. The used size is the number of bytes that have been written to the buffer.
 */
declare function buffer_get_used_size(buffer: Id.Buffer): number;
/**
 * This function sets the "used" size of the given buffer, which is the number of bytes that have been written to it. It is primarily for use within extensions.
 */
declare function buffer_set_used_size(buffer: Id.Buffer, size: number): undefined;
/**
 * This function takes input data from a buffer and returns a 160 bit message digest in ASCII format. In this way you can generate a secure key which can be stored and used to check the integrity of the information being sent to (or received from) an external server (for example).
 */
declare function buffer_sha1(buffer: Id.Buffer, offset: number, size: number): string;
/**
 * This function returns the size (in bytes) of the given buffer data type.
 */
declare function buffer_sizeof(type: Constant.BufferDataType): number;
/**
 * This function gets the current "seek" position for use in other buffer functions.
 */
declare function buffer_tell(buffer: Id.Buffer): number;
/**
 * This function can be used to write data to a previously created buffer.
 */
declare function buffer_write(buffer: Id.Buffer, type: Constant.BufferDataType, value: unknown): Constant.BufferErrorType;
/**
 * This function gets the DPI of the device display along the x axis (this value is also dependent on the orientation of the device).
 */
declare function display_get_dpi_x(): number;
/**
 * This function gets the DPI of the device display along the y axis (this value is also dependent on the orientation of the device).
 */
declare function display_get_dpi_y(): number;
/**
 * With this function you can get the width (in pixels) of the GUI as used in the Draw GUI Event.
 */
declare function display_get_gui_width(): number;
/**
 * This function will return the height of the display (in pixels). Note that on the HTML5 target, this value is the height of the browser window, rather than the physical display size.
 */
declare function display_get_height(): number;
/**
 * This function will return one of two constants GameMaker has to tell you whether the device running the game is being held in landscape or portrait mode. Note that this function may not correctly detect the orientation of the device when used in the HTML5 target module.
 */
declare function display_get_orientation(): number;
/**
 * This function can be used to get the current sleep margin value used for the render timing of your game, and will return a millisecond value. For more information on display timing, please see display_set_timing_method().
 */
declare function display_get_sleep_margin(): number;
/**
 * This function can be used to retrieve the timing method to be used for rendering your game.
 */
declare function display_get_timing_method(): Constant.TimingMethod;
/**
 * This function will return the width of the display (in pixels). Note that on the HTML5 target, this value is the width of the browser window, rather than the physical display size.
 */
declare function display_get_width(): number;
/**
 * This function will return the mouse x position within the screen. It should be noted that this function only works properly when used on the Windows target. It can be used for HTML5 too, but will only return a value relative to the (0, 0) of the canvas itself, and will not return any value while the mouse is outside of the canvas. For other devices it will return 0, and you should use the device_mouse_raw_x()and device_mouse_raw_y() functions instead.
 */
declare function display_mouse_get_x(): number;
/**
 * This function will return the mouse y position within the screen. It should be noted that this function only works properly when used on the Windows target. It can be used for HTML5 too, but will only return a value relative to the (0, 0) of the canvas itself, and will not return any value while the mouse is outside of the canvas. For other devices it will return 0, and you should use the device_mouse_raw_x() and device_mouse_raw_y() functions instead.
 */
declare function display_mouse_get_y(): number;
/**
 * With this function you can change or set the position of the mouse within the game display.
 */
declare function display_mouse_set(x: number, y: number): undefined;
/**
 * This function resets the display settings to those that were set when the game was started and also allows you to change the current level of fullscreen anti-aliasing being used and whether to use vertical synchronisation.
 */
declare function display_reset(aa: number, vsync: boolean): number;
/**
 * This function will only affect things drawn in the Draw GUI Event and can be used to set a specific width and height for all GUI components in that event, and no matter what size of display or window is used to display the GUI, it will be scaled to fit correctly.
 */
declare function display_set_gui_size(width: number, height: number): undefined;
/**
 * This function can be used to set the sleep margin value used for the render timing of your game, and requires a millisecond value.
 */
declare function display_set_sleep_margin(milliseconds: number): undefined;
/**
 * This function can be used to set the timing method to be used for rendering your game.
 */
declare function display_set_timing_method(method: Constant.TimingMethod): undefined;
/**
 * This function can be used to show or hide the system UI on Android and iOS only.
 */
declare function display_set_ui_visibility(flags: number): undefined;
/**
 * With this function you can save a frame to a GIF file from a surface. The delay time is calculated in 1/100ths of a second, but note that once the GIF has been created different browsers may interpret the frame delay slightly differently.
 */
declare function gif_add_surface(gif_index: Id.Gif, surface: Id.Surface, delay_time: number, xoffset?: number, yoffset?: number, quantization?: number): number;
/**
 * With this function you can create an empty GIF format image, ready to have data added to it. The function will return the unique ID value used to identify the GIF in subsequent functions, or it will return -1 if the GIF could not be initialized (for example, if the width/height are too big for the memory available).
 */
declare function gif_open(width: number, height: number, clear_colour?: Constant.Color): Id.Gif;
/**
 * With this function you can save out a GIF animation. Note that GameMaker does not automatically append the .gif file extension, so you should include this as part of the filename string if you wish the saved file to be identified as a GIF. The created GIF will be palletised using the Universal 884 Palette.
 */
declare function gif_save(gif_index: Id.Gif, fname: string): number;
/**
 * With this function you can save out a GIF animation. Note that the final GIF data will be palletised using the Universal 884 Palette.
 */
declare function gif_save_buffer(gif_index: Id.Gif): number;
/**
 * With this function you can save a screenshot of the game as it currently appears in the game window. The file will be saved to the working directory of the game, which in windows is located at <drive>:/Users/YOURUSERNAME/AppData/Local/[Game Name]/ and on Mac it would be ~/Library/Application Support/[Game Name]/. The image captured will be the final render of the application surface of the game, or (if the app surface has been disabled) it will be an image of the whole display or window. It is important to note that the function is designed to be called in the Draw GUI End Event, which should give consistent results across all platforms.
 */
declare function screen_save(fname: string): undefined;
/**
 * With this function you can save a screenshot of a part of the game as it currently appears in the game display. The selection coordinates are based on the absolute size of the display (or window if not fullscreen), so (0, 0) is always the top-left hand corner of the screen (or window).
 */
declare function screen_save_part(fname: string, x: number, y: number, w: number, h: number): undefined;
/**
 * This function immediately applies the given camera's settings to the current camera view being rendered and sets it as the active camera.
 */
declare function camera_apply(camera_id: Id.Camera): undefined;
/**
 * This function will copy the transforms from one camera to another.
 */
declare function camera_copy_transforms(dest_camera_id: Id.Camera, src_camera_id: Id.Camera): undefined;
/**
 * This function will create an "empty" camera, i.e.: a camera with no view or projection settings defined. Once you have created the camera you can then use the different matrix functions to set the view and projection matrices.
 */
declare function camera_create(): Id.Camera;
/**
 * This function will create a new camera and then set its view into the room, before returning the unique ID value to identify the camera in future function calls. The camera will be created using the values that you set in this function for position, size and other details which correlate to the values you set in the Room Editor. Note that this function can take a variable number of arguments and any arguments not supplied will use their default values.
 */
declare function camera_create_view(room_x: number, room_y: number, width: number, height: number, angle?: number, object?: Id.Instance | Asset.GMObject, x_speed?: number, y_speed?: number, x_border?: number, y_border?: number): Id.Camera;
/**
 * This function destroys the given camera.
 */
declare function camera_destroy(camera_id: Id.Camera): undefined;
/**
 * This function can be used to retrieve the unique camera ID value of the currently active camera.
 */
declare function camera_get_active(): Id.Camera;
/**
 * This function can be used to retrieve the ID of the script function assigned as the begin script for the given camera. If no script function is assigned then the function will return an invalid handle (-1).
 */
declare function camera_get_begin_script(camera_id: Id.Camera): GMLFunction;
/**
 * This function can be used to retrieve the unique camera ID value of the default camera (the camera that GameMaker uses when no camera views or ports are active in a game room).
 */
declare function camera_get_default(): Id.Camera;
/**
 * This function can be used to retrieve the ID of the script function assigned as the end function for the given camera. If no script function is assigned then the function will return -1.
 */
declare function camera_get_end_script(camera_id: Id.Camera): GMLFunction;
/**
 * This function returns the projection matrix of the given camera.
 */
declare function camera_get_proj_mat(camera_id: Id.Camera): Array<number>;
/**
 * This function can be used to retrieve the ID of the script function assigned as the update script for the given camera. If no script is assigned then the function will return -1.
 */
declare function camera_get_update_script(camera_id: Id.Camera): GMLFunction;
/**
 * This function can be used to retrieve the angle of the given camera.
 */
declare function camera_get_view_angle(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the border value for object/instance following of the given camera along the x axis (horizontal border). The return value will be in pixels.
 */
declare function camera_get_view_border_x(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the border value for object/instance following of the given camera along the y axis (vertical border). The return value will be in pixels.
 */
declare function camera_get_view_border_y(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the height (in pixels) of the given camera view. Note that this function is only valid for cameras created using camera_create_view() or for those added in the Room Editor.
 */
declare function camera_get_view_height(camera_id: Id.Camera): number;
/**
 * This function returns the view matrix of the given camera.
 */
declare function camera_get_view_mat(camera_id: Id.Camera): Array<number>;
/**
 * This function can be used to retrieve the movement speed of the given camera along the x axis (horizontal movement). The return value will be in pixels per game frame.
 */
declare function camera_get_view_speed_x(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the movement speed of the given camera along the y axis (vertical movement). The return value will be in pixels per game frame.
 */
declare function camera_get_view_speed_y(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the follow target of the given camera, which can be set in the room properties or with camera_set_view_target().
 */
declare function camera_get_view_target(camera_id: Id.Camera): Id.Instance;
/**
 * This function can be used to retrieve the width (in pixels) of the given camera view. Note that this function is only valid for cameras created using camera_create_view() or for those added in the Room Editor.
 */
declare function camera_get_view_width(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the x position of the view for a given camera. Note that this function is only valid for cameras created using camera_create_view() or for those added in the Room Editor.
 */
declare function camera_get_view_x(camera_id: Id.Camera): number;
/**
 * This function can be used to retrieve the y position of the view for a given camera. Note that this function is only valid for cameras created using camera_create_view() or for those added in the Room Editor.
 */
declare function camera_get_view_y(camera_id: Id.Camera): number;
/**
 * This function can be used to set a script function that will be called at the beginning of every game frame that the camera is assigned to a visible and active viewport.
 */
declare function camera_set_begin_script(camera_id: Id.Camera, script: GMLFunction | number): undefined;
/**
 * This function can be used to set the default camera to use a custom camera that you have previously created using one of the camera_create() functions. When you create a room with no active viewports or view cameras, GameMaker still uses a camera to show the action in the game. This camera is called the default camera and can be set and manipulated (and even destroyed) just like any other camera.
 */
declare function camera_set_default(camera_id: Id.Camera): undefined;
/**
 * This function can be used to set a script function that will be called at the end of every game frame that the camera is assigned to a visible and active viewport, after everything for that view camera has been rendered.
 */
declare function camera_set_end_script(camera_id: Id.Camera, script: GMLFunction | number): undefined;
/**
 * This function will set the projection matrix for a given camera. You can find out more about creating projection matrices from the section Matrix Functions, specifically matrix_build_projection_perspective() and matrix_build_projection_ortho().
 */
declare function camera_set_proj_mat(camera_id: Id.Camera, matrix: unknown[]): undefined;
/**
 * This function can be used to set a script function that will be called every game frame that the camera is assigned to a visible and active viewport.
 */
declare function camera_set_update_script(camera_id: Id.Camera, script: GMLFunction | number): undefined;
/**
 * You can use this function to update the angle of the view camera within the room. The default value is 0 degrees with positive values rotating the camera counter-clockwise, i.e.: setting the value to 90 will rotate the camera 90 degrees to the left.
 */
declare function camera_set_view_angle(camera_id: Id.Camera, angle: number): undefined;
/**
 * You can use this function to set the border size of the camera within the room.
 */
declare function camera_set_view_border(camera_id: Id.Camera, x_border: number, y_border: number): undefined;
/**
 * This function sets the view matrix for a given camera.
 */
declare function camera_set_view_mat(camera_id: Id.Camera, matrix: unknown[]): undefined;
/**
 * You can use this function to update the position of the camera view within the room.
 */
declare function camera_set_view_pos(camera_id: Id.Camera, x: number, y: number): undefined;
/**
 * You can use this function to update the size of the view camera within the room.
 */
declare function camera_set_view_size(camera_id: Id.Camera, width: number, height: number): undefined;
/**
 * You can use this function to update the speed of the view camera within the room. The speed is calculated as pixels per step and can be set to -1 to make the camera move instantly, but if the camera is not set to follow any instance then the values set here will have no visible effect.
 */
declare function camera_set_view_speed(camera_id: Id.Camera, xspeed: number, yspeed: number): undefined;
/**
 * You can use this function to set the follow target of the view camera within the room. Note that if you set an object ID and there is more than one instance of that object in the room, there is no way for GameMaker to know which instance you wish to follow and so it could be any of them.
 */
declare function camera_set_view_target(camera_id: Id.Camera, id: Id.Instance | Asset.GMObject): undefined;
/**
 * This function can be used to retrieve the unique camera ID value for the camera assigned to the given viewport (from 0 - 7). If no camera is assigned, the function will return -1.
 */
declare function view_get_camera(viewport: number): number;
/**
 * This function can be used to retrieve the height of the given viewport.
 */
declare function view_get_hport(viewport: number): number;
/**
 * This function can be used to retrieve the unique ID value for the surface assigned to the given viewport (will return -1 if no surface has been assigned).
 */
declare function view_get_surface_id(viewport: number): Id.Surface;
/**
 * This function can be used to check the visibility of the given viewport.
 */
declare function view_get_visible(viewport: number): boolean;
/**
 * This function can be used to retrieve the width of the given viewport.
 */
declare function view_get_wport(viewport: number): number;
/**
 * This function can be used to retrieve the x position of the given viewport.
 */
declare function view_get_xport(viewport: number): number;
/**
 * This function can be used to retrieve the y position of the given viewport.
 */
declare function view_get_yport(viewport: number): number;
/**
 * This function assigns the given camera to the given viewport.
 */
declare function view_set_camera(viewport: number, camera_id: Id.Camera): undefined;
/**
 * This function can be used to set the height of the given viewport.
 */
declare function view_set_hport(viewport: number, h: number): number;
/**
 * This function sets the surface to draw the contents of the given viewport to.
 */
declare function view_set_surface_id(viewport: number, surface_id: Id.Surface): undefined;
/**
 * This function can be used to set the visibility of the given viewport.
 */
declare function view_set_visible(viewport: number, visible: boolean): undefined;
/**
 * This function can be used to set the width of the given viewport.
 */
declare function view_set_wport(viewport: number, w: number): number;
/**
 * This function can be used to set the x position of the given viewport.
 */
declare function view_set_xport(viewport: number, x: number): undefined;
/**
 * This function can be used to set the y position of the given viewport.
 */
declare function view_set_yport(viewport: number, y: number): undefined;
/**
 * With this function you can centre the game window in the display when the target module is Windows, Ubuntu (Linux) or macOS, or you can centre it in the browser if the target module is HTML5.
 */
declare function window_center(): undefined;
/**
 * This function will return the current D3D device pointer, which you can then (for example) pass through to a DLL or Dylib on Windows and macOS.
 * @deprecated
 */
declare function window_device(): Pointer.Any;
/**
 * This function is for the GX.games target and is used to send a message to the host window containing the game. It takes a string which is sent to the host iframe.
 */
declare function window_post_message(message: string): undefined;
/**
 * Returns whether the border around the window is shown in windowed mode.
 */
declare function window_get_showborder(): boolean;
/**
 * This function returns the caption of the window (this is the text that appears on the top of the window, next to its icon).
 */
declare function window_get_caption(): string;
/**
 * This function returns the background colour of the game window. This colour represents that which will be used for those areas of the game window that are not occupied by any views.
 */
declare function window_get_colour(): Constant.Color;
/**
 * With this function you can get the current cursor being used in the game window.
 */
declare function window_get_cursor(): Constant.Cursor;
/**
 * This function returns whether the game window is in fullscreen mode (true) or not (false).
 */
declare function window_get_fullscreen(): boolean;
/**
 * With this function you can get the current height (in pixels) of the game window.
 */
declare function window_get_height(): number;
/**
 * With this function you can find the overlapping region of the rectangle defined by (x1, y1) to (x2, y2) on each of the attached displays. The function will return an array with 8 values per display, where the values [0 ... 3] correspond to the overlapx1, overlapy1, overlapx2, overlapy2 - defining the region of overlap on this display and will be set to 0,0,0,0 if no overlap - and the values [4 ... 7] corresponds to the monitorx1, monitory1, monitorx2, monitory2 - the coordinates of the display in the virtual display space.
 */
declare function window_get_visible_rects(x1: number, y1: number, x2: number, y2: number): Array<number>;
/**
 * With this function you can get the current width (in pixels) of the game window.
 */
declare function window_get_width(): number;
/**
 * With this function you can get the x position (in pixels) within the browser if it is an HTML5 game or within the display if it is a Windows, Ubuntu (Linux) or macOS game.
 */
declare function window_get_x(): number;
/**
 * With this function you can get the y position (in pixels) within the browser if it is an HTML5 game or within the display if it is a Windows, Ubuntu (Linux) or macOS game.
 */
declare function window_get_y(): number;
/**
 * With this function you can get the internal Windows ID value (the HWND, a pointer).
 */
declare function window_handle(): Pointer.Any;
/**
 * With this function you can poll the window (or tab) state and if it loses focus the function will return false, otherwise it will return true.
 */
declare function window_has_focus(): boolean;
/**
 * This function minimises the game window. You can restore it with window_restore().
 */
declare function window_minimise(): undefined;
/**
 * This function minimizes the game window. You can restore it with window_restore().
 */
declare function window_minimize(): undefined;
/**
 * With this function you can get the x position of the mouse cursor (in pixels) within the browser if it is an HTML5 game or within the display if it is a Windows, Ubuntu (Linux) or macOS game.
 */
declare function window_mouse_get_x(): number;
/**
 * With this function you can get the y position of the mouse cursor (in pixels) within the browser if it is an HTML5 game or within the display if it is a Windows, Ubuntu (Linux) or macOS game.
 */
declare function window_mouse_get_y(): number;
/**
 * With this function you can change or set the position of the mouse within the game window.
 */
declare function window_mouse_set(x: number, y: number): undefined;
/**
 * With this function you can enable or disable mouse lock. When enabled, the mouse cursor is hidden and locked at the center of the window. When disabled, the mouse cursor is shown and unlocked. While the cursor is locked, you can still use functions window_mouse_get_delta_x() and window_mouse_get_delta_y() to retrieve how much has it moved since the last frame.
 */
declare function window_mouse_set_locked(enable: boolean): undefined;
/**
 * Returns whether the mouse cursor was locked using function window_mouse_set_locked.
 */
declare function window_mouse_get_locked(): boolean;
/**
 * Returns how many pixels the mouse cursor has moved on the x axis since the last frame.
 */
declare function window_mouse_get_delta_x(): number;
/**
 * Returns how many pixels the mouse cursor has moved on the y axis since the last frame.
 */
declare function window_mouse_get_delta_y(): number;
/**
 * This function restores the game window which may have been minimised by the user or using the function window_minimise().
 */
declare function window_restore(): undefined;
/**
 * Sets whether the border around the window is shown in windowed mode.
 */
declare function window_set_showborder(show: boolean): undefined;
/**
 * With this function you can change or set the windows caption for the room that you are currently in. This caption appears at the top of the window, beside the game icon, when the game is not in full screen mode.
 */
declare function window_set_caption(caption: string): undefined;
/**
 * This function sets the background colour of the game window.
 */
declare function window_set_colour(colour: Constant.Color): undefined;
/**
 * With this function you can set the cursor for the game window to any one of the built-in constants.
 */
declare function window_set_cursor(cursor: Constant.Cursor): undefined;
/**
 * With this function you can set the game window to be full screen (true) or not (false).
 */
declare function window_set_fullscreen(full: boolean): undefined;
/**
 * This function can be used to set a maximum window height for your game. If you enable the window resize option in the Game Options for the target platform, then the player can resize the game window to any size they wish, however by using this function you can limit the maximum height to the size you specify. If you wish to go back to the default behaviour (i.e.: no minimum), then use a value of -1.
 */
declare function window_set_max_height(height: number): undefined;
/**
 * This function can be used to set a maximum window width for your game. If you enable the window resize option in the Game Options for the target platform, then the player can resize the game window to any size they wish, however by using this function you can limit the maximum width to the size you specify. If you wish to go back to the default behaviour (i.e.: no minimum), then use a value of -1.
 */
declare function window_set_max_width(width: number): undefined;
/**
 * This function can be used to set a minimum window height for your game. If you enable the window resize option in the Game Options for the target platform, then the player can resize the game window to any size they wish, however by using this function you can limit the minimum height to the size you specify. If you wish to go back to the default behaviour (i.e.: no minimum), then use a value of -1.
 */
declare function window_set_min_height(height: number): undefined;
/**
 * This function can be used to set a minimum window width for your game. If you enable the window resize option in the Game Options for the target platform, then the player can resize the game window to any size they wish, however by using this function you can limit the minimum width to the size you specify. If you wish to go back to the default behaviour (i.e.: no minimum), then use a value of -1.
 */
declare function window_set_min_width(width: number): undefined;
/**
 * With this function you can set the game window to a specific position within the display (on macOS, Linux(Ubuntu) and Windows) or within the browser (HTML5).
 */
declare function window_set_position(x: number, y: number): undefined;
/**
 * With this function you can set the position of the game window within the browser (HTML5) or display (Windows, Ubuntu (Linux) or macOS) and set the scale of the window too.
 */
declare function window_set_rectangle(x: number, y: number, w: number, h: number): undefined;
/**
 * With this function you can change the size of the game window. If you use this function to change the size of the game window, the contents of the window will be scaled to fit with a 1:1 ratio to the background canvas which will keep the image crisp and clear (although scaled if the window is other than the room or view size).
 */
declare function window_set_size(w: number, h: number): undefined;
/**
 * With this function you can enable borderless fullscreen mode which uses a borderless window when switching to fullscreen rather than making the game take over exclusive use of the display. Note that this will only take effect on the next switch to fullscreen (so if the game is currently running in fullscreen then nothing will immediately change).
 */
declare function window_enable_borderless_fullscreen(enable: boolean): undefined;
/**
 * This function returns whether fullscreen mode uses a borderless window or whether the game takes exclusive control of the display.
 */
declare function window_get_borderless_fullscreen(): undefined;
/**
 * This function returns the x coordinate of the mouse with respect to all the active views and returns the same value mouse_x.
 */
declare function window_views_mouse_get_x(): number;
/**
 * This function returns the y coordinate of the mouse with respect to all the active views and returns the same value mouse_y.
 */
declare function window_views_mouse_get_y(): number;
/**
 * This function will return the mouse x position relative to the view selected.
 */
declare function window_view_mouse_get_x(id: unknown): number;
/**
 * This function will return the mouse y position relative to the view selected.
 */
declare function window_view_mouse_get_y(id: unknown): number;
/**
 * This function checks if a data structure of the given type with the given index exists.
 */
declare function ds_exists(ind: unknown, type: Constant.DsType): boolean;
/**
 * This function sets the precision value to be used by the data structure functions for comparing values.
 */
declare function ds_set_precision(prec: number): undefined;
/**
 * This function can be used to add a given value (real or string) to the value of the given cell within the grid. The value to be added must be the same type as that held within the grid cell.
 */
declare function ds_grid_add(index: Id.DsGrid, x: number, y: number, val: GML.ArgumentIdentity): undefined;
/**
 * This function can be used to add a given value (real or string) to all the values of the cells found within the defined disk area of a grid. The value to be added must be of the same type as that held within the grid cells.
 */
declare function ds_grid_add_disk(index: Id.DsGrid, xm: number, ym: number, r: number, val: GML.ArgumentIdentity): undefined;
/**
 * This function can be used to add all the values of all the cells found within the source area of a grid to the values within the destination grid.
 */
declare function ds_grid_add_grid_region(index: Id.DsGrid, source: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, xpos: number, ypos: number): undefined;
/**
 * This function can be used to add a given value (real or string) to all the values of the cells found within the defined area of a grid. The value to be added must be of the same type as that held within the grid cells.
 */
declare function ds_grid_add_region(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, val: GML.ArgumentIdentity): undefined;
/**
 * This function can be used to clear a given DS grid to a specific value. All cells within the grid will then contain this value, which can be a real number or a string.
 */
declare function ds_grid_clear(index: Id.DsGrid, val: GML.ArgumentIdentity): undefined;
/**
 * With this function you can copy the contents of one grid into another one. Both grids must have been created previously using the ds_grid_create() function.
 */
declare function ds_grid_copy(destination: Id.DsGrid, source: Id.DsGrid): undefined;
/**
 * This function will remove the given grid data structure from memory, freeing up the resources it was using and removing all values that it contained. This function should always be used when you are finished using the DS grid to prevent memory leaks that can slow down and crash your game.
 */
declare function ds_grid_destroy(index: Id.DsGrid): undefined;
/**
 * This function can be used to find the maximum value for all the cells found within the defined disk area of a grid.
 */
declare function ds_grid_get_disk_max(index: Id.DsGrid, xm: number, ym: number, r: number): GML.ArgumentIdentity;
/**
 * This function can be used to find the mean value for all the cells found within the defined disk area of a grid (all cell values are added together and then divided by the total number of cells that make up the disk).
 */
declare function ds_grid_get_disk_mean(index: Id.DsGrid, xm: number, ym: number, r: number): GML.ArgumentIdentity;
/**
 * This function can be used to find the minimum value for all the cells found within the defined disk area of a grid.
 */
declare function ds_grid_get_disk_min(index: Id.DsGrid, xm: number, ym: number, r: number): GML.ArgumentIdentity;
/**
 * This function can be used to add all the values all the cells found within the defined disk area of a grid together.
 */
declare function ds_grid_get_disk_sum(index: Id.DsGrid, xm: number, ym: number, r: number): GML.ArgumentIdentity;
/**
 * This function can be used to find the maximum value for all the cells found within the defined region of a grid.
 */
declare function ds_grid_get_max(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number): GML.ArgumentIdentity;
/**
 * This function can be used to find the mean value for all the cells found within the defined region of a grid (all cell values are added together and then divided by the total number of cells that make the region).
 */
declare function ds_grid_get_mean(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number): GML.ArgumentIdentity;
/**
 * This function can be used to find the minimum value for all the cells found within the defined region of a grid.
 */
declare function ds_grid_get_min(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number): GML.ArgumentIdentity;
/**
 * This function can be used to add all the values all the cells found within the defined region of a grid together.
 */
declare function ds_grid_get_sum(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number): number;
/**
 * This function will return the height of the given grid, which is the number of cells the grid has along the y-axis (an integer).
 */
declare function ds_grid_height(index: Id.DsGrid): number;
/**
 * This function will multiply the value of a the given grid cell by the specified amount.
 */
declare function ds_grid_multiply(index: Id.DsGrid, x: number, y: number, val: unknown): undefined;
/**
 * This function will take all the values in a given disc-shaped region of the DS grid, and multiply each one by the given amount.
 */
declare function ds_grid_multiply_disk(index: Id.DsGrid, xm: number, ym: number, r: number, val: unknown): undefined;
/**
 * With this function you can define an area within a given DS grid, then take those values and multiply them with those found in a separate region of either the same DS grid, or another one (which has been previously created). The original region will remain unchanged, while the region that they have been multiplied with will now store the new values for each cell.
 */
declare function ds_grid_multiply_grid_region(index: Id.DsGrid, source: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, xpos: number, ypos: number): undefined;
/**
 * With this function you can specify a region of the grid in which to multiply each cell value by a given amount.
 */
declare function ds_grid_multiply_region(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, val: unknown): undefined;
/**
 * This function can be used to convert a string which has been created previously by the function ds_grid_write() back into a DS grid.
 */
declare function ds_grid_read(index: Id.DsGrid, string: string, legacy__optional_?: boolean): undefined;
/**
 * With this function you can resize the given DS grid to have a different width and/or height. If the grid size is larger than the current grid, the new cells will have a base value of 0, and if the size is smaller then the values held in the cells that are no longer within the new size will be lost. All other cells will be left untouched.
 */
declare function ds_grid_resize(index: Id.DsGrid, w: number, h: number): undefined;
/**
 * With this function you can set a circular region of a grid to a certain value.
 */
declare function ds_grid_set_disk(index: Id.DsGrid, xm: number, ym: number, r: number, val: GML.ArgumentIdentity): undefined;
/**
 * This function can be used to copy the contents of a rectangular area of grid cells from one (previously defined) DS grid to another, or it can be used to copy a region from within the same grid.
 */
declare function ds_grid_set_grid_region(index: Id.DsGrid, source: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, xpos: number, ypos: number): undefined;
/**
 * This function can be used to set a rectangular region of a given grid to a specified value (which can be either a real or a string).
 */
declare function ds_grid_set_region(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, val: GML.ArgumentIdentity): undefined;
/**
 * This function can be used to randomise the positions of all values in all cells within a grid.
 */
declare function ds_grid_shuffle(index: Id.DsGrid): undefined;
/**
 * This function can be used to sort a DS grid based on the values from a given column (much as you would sort files by date, size, etc., in the OS file explorer).
 */
declare function ds_grid_sort(index: Id.DsGrid, column: number, ascending: boolean): undefined;
/**
 * This function can be used to convert a DS grid into an MP grid. You can also provide an optional predicate function argument to map the DS grid value to the corresponding MP grid value. If you don't provide a predicate function, the function will treat zero values as empty and non-zero values as occupied.
 */
declare function ds_grid_to_mp_grid(src: Id.DsGrid, dest: Id.MpGrid, func?: GMLFunction): undefined;
/**
 * With this function you can check to see if a specific value (real or string) is present within a circular area of a given DS grid.
 */
declare function ds_grid_value_disk_exists(index: Id.DsGrid, xm: number, ym: number, r: number, val: unknown): boolean;
/**
 * With this function you can get the x coordinate (within the given grid disc-shaped region) of the value being searched for.
 */
declare function ds_grid_value_disk_x(index: Id.DsGrid, xm: number, ym: number, r: number, val: unknown): number;
/**
 * With this function you can get the y coordinate (within the given grid disc-shaped region) of the value being searched for.
 */
declare function ds_grid_value_disk_y(index: Id.DsGrid, xm: number, ym: number, r: number, val: unknown): number;
/**
 * With this function you can check to see if a specific value (real or string) is present within a rectangular area of a given DS grid.
 */
declare function ds_grid_value_exists(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, val: unknown): boolean;
/**
 * With this function you can get the x coordinate (within the given rectangular grid region) of the value being searched for. If the value being searched for does not exist, the function will return -1.
 */
declare function ds_grid_value_x(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, val: unknown): number;
/**
 * With this function you can get the y coordinate (within the given rectangular grid region) of the value being searched for. If the value being searched for does not exist, the function will return -1.
 */
declare function ds_grid_value_y(index: Id.DsGrid, x1: number, y1: number, x2: number, y2: number, val: unknown): number;
/**
 * This function will return the width of the given grid, which is the number of cells the grid has along the x-axis (an integer).
 */
declare function ds_grid_width(index: Id.DsGrid): number;
/**
 * This function can be used to convert the given DS grid into a string, which can then be stored in an external file (for example). You can read the returned string from this function back into a DS grid using the function ds_grid_read().
 */
declare function ds_grid_write(index: Id.DsGrid): string;
/**
 * With this function you can clear all data from the given list data structure.
 */
declare function ds_list_clear(id: Id.DsList): undefined;
/**
 * With this function you can copy the contents of one list into another. Both lists must have been created previously and if the list being copied to already has information within it, this list will be cleared first. The end result is two independent lists which contain the same information.
 */
declare function ds_list_copy(destination: Id.DsList, source: Id.DsList): undefined;
/**
 * With this function you can remove the value stored at a specific position within the list.
 */
declare function ds_list_delete(id: Id.DsList, pos: number): undefined;
/**
 * This function will remove the given list data structure from memory, freeing up the resources it was using and removing all values that it contained.
 */
declare function ds_list_destroy(id: Id.DsList): undefined;
/**
 * With this function you can check the given DS list to see if it is empty (returns true) or not (returns false).
 */
declare function ds_list_empty(id: Id.DsList): boolean;
/**
 * With this function you can check the given list for a value and the position within the list for that value will be returned. Note that if there are multiple entries in the list with the same value, the position of any one of them may be returned, and if the value doesn't exist, -1 will be returned.
 */
declare function ds_list_find_index(id: Id.DsList, val: unknown): number;
/**
 * This function will add the given value into the list at the given position. if the list contains more values after the given position, their position will be shifted up one to make room making the list larger by one.
 */
declare function ds_list_insert(id: Id.DsList, pos: number, val: GML.ArgumentIdentity): undefined;
/**
 * With this function you can check to see if another DS list is stored at the given position within a DS list.
 */
declare function ds_list_is_list(id: Id.DsList, pos: number): boolean;
/**
 * With this function you can check to see if a DS map is stored at the given position within a DS list.
 */
declare function ds_list_is_map(id: Id.DsList, pos: number): boolean;
/**
 * This function will "mark" (or "flag") a given position within a previously created DS list as holding another DS list, allowing for the correct encoding of the list containing the list into a JSON string with json_encode().
 */
declare function ds_list_mark_as_list(id: Id.DsList, pos: number): number;
/**
 * This function will "mark" (or "flag") a given position within a previously created DS list as holding a DS map, allowing for the correct encoding of the list containing the map into a JSON string with json_encode().
 */
declare function ds_list_mark_as_map(id: Id.DsList, pos: number): number;
/**
 * With this function you can recreate a saved DS list (one that has previously been written as a string using ds_list_write()).
 */
declare function ds_list_read(id: Id.DsList, str: string, legacy__optional_?: boolean): undefined;
/**
 * This function will replace the value at the given position by another one.
 */
declare function ds_list_replace(id: Id.DsList, pos: number, val: GML.ArgumentIdentity): undefined;
/**
 * With this function you can shuffle a list, which will re-order all the component values into random positions from those in which they were originally added to the list.
 */
declare function ds_list_shuffle(id: Id.DsList): undefined;
/**
 * This function will return the "size" of the list, i.e.: the number of items that have been added into it.
 */
declare function ds_list_size(id: Id.DsList): number;
/**
 * With this function you can sort all the values within a list, either in ascending or descending order. If the list contains strings, these will be sorted alphabetically, based on the English 26 letter alphabet.
 */
declare function ds_list_sort(id: Id.DsList, ascend: boolean): undefined;
/**
 * This function returns a string which can then be stored or transferred to another data structure using the ds_list_read() function.
 */
declare function ds_list_write(id: Id.DsList): string;
/**
 * With this function you can assign a (previously created) DS list to a key within the given DS map, allowing for the correct encoding of the map containing the list into a JSON string with json_encode().
 */
declare function ds_map_add_list(id: Id.DsMap, key: unknown, value: Id.DsList): undefined;
/**
 * With this function you can assign a (previously created) DS map to a key within the given DS map, allowing for the correct encoding of the map containing the map into a JSON string with json_encode().
 */
declare function ds_map_add_map(id: Id.DsMap, key: unknown, value: Id.DsMap): undefined;
/**
 * This function will clear the given DS map of all key/value pairs.
 */
declare function ds_map_clear(id: Id.DsMap): undefined;
/**
 * You can use this function to copy the contents of one map into another one that you have previously created using ds_map_create(). If the DS map that is being copied to is not empty, then this function will clear it first before copying. The original DS map remains unchanged by this process.
 */
declare function ds_map_copy(destination: Id.DsMap, source: Id.DsMap): undefined;
/**
 * With this function you can remove any given key (and its corresponding value) from the given DS map.
 */
declare function ds_map_delete(id: Id.DsMap, key: unknown): undefined;
/**
 * This function destroys the given DS map, freeing the memory it is using.
 */
declare function ds_map_destroy(id: Id.DsMap): undefined;
/**
 * This function will return false if the specified (previously created) DS map contains any key/value pairs, or true if it does not.
 */
declare function ds_map_empty(id: Id.DsMap): boolean;
/**
 * This function will return true if the specified key exists in the (previously created) DS map, or false if it doesn't.
 */
declare function ds_map_exists(id: Id.DsMap, key: unknown): boolean;
/**
 * This function returns the first key stored in the given DS map.
 */
declare function ds_map_find_first(id: Id.DsMap): unknown;
/**
 * This function returns the last key stored in the given DS map.
 */
declare function ds_map_find_last(id: Id.DsMap): unknown;
/**
 * This function returns the next key stored in the DS map after the one specified in the function.
 */
declare function ds_map_find_next(id: Id.DsMap, key: unknown): unknown;
/**
 * This function returns the previous key stored in the DS map before the one specified in the function.
 */
declare function ds_map_find_previous(id: Id.DsMap, key: unknown): unknown;
/**
 * With this function you can check to see if a DS list is stored in the given map key.
 */
declare function ds_map_is_list(id: Id.DsMap, key: unknown): boolean;
/**
 * With this function you can check to see if a DS map is stored in the given map key.
 */
declare function ds_map_is_map(id: Id.DsMap, key: unknown): boolean;
/**
 * This function will take a string that has previously been created by the function ds_map_write() and then read it into a previously created DS map. If the map that the string is being read into contains any key/value pairs, these will be cleared first before the saved map is reconstructed.
 */
declare function ds_map_read(id: Id.DsMap, str: string, legacy__optional_?: boolean): undefined;
/**
 * With this function you can change the value for the given key in the given DS map. If the given key does not exist then it will be created for you, and if it does then the current value will be replaced with the new value.
 */
declare function ds_map_replace(id: Id.DsMap, key: unknown, val: GML.ArgumentIdentity): boolean;
/**
 * With this function you can replace a DS list that has been stored in the given "key" with another list that has been created previously. This function is designed for creating JSON-compatible maps which you would then encode using json_encode() and should only be used in conjunction with that functionality.
 */
declare function ds_map_replace_list(id: Id.DsMap, key: unknown, value: Id.DsList): undefined;
/**
 * With this function you can replace a DS Map that has been stored in the given "key" with another map that has been created previously. This function is designed for creating JSON-compatible maps which you would then encode using json_encode() and should only be used in conjunction with that functionality.
 */
declare function ds_map_replace_map(id: Id.DsMap, key: unknown, value: Id.DsMap): undefined;
/**
 * This function will load a DS map, saved previously using DS map_secure_save(), from the given file.
 */
declare function ds_map_secure_load(filename: string): Id.DsMap;
/**
 * This function will load a secure saved DS map, written previously using DS map_secure_save_buffer(), from the given buffer.
 */
declare function ds_map_secure_load_buffer(buffer: Id.Buffer): Id.DsMap;
/**
 * This function will save the contents of the given DS map to a file that is linked to the device it was created on (meaning it can't be read if transferred to any other device).
 */
declare function ds_map_secure_save(map: Id.DsMap, filename: string): boolean;
/**
 * This function will save a previously created DS map to a buffer.
 */
declare function ds_map_secure_save_buffer(id: Id.DsMap, buffer: Id.Buffer): number;
/**
 * With this function you can find how many key/value pairs the given DS map contains.
 */
declare function ds_map_size(id: Id.DsMap): number;
/**
 * This function will turn the DS map data of the specified map into string format which can then be written to an *.ini or a *.txt file for easy storage. This string can then be later read back into a new DS map using ds_map_read().
 */
declare function ds_map_write(id: Id.DsMap): string;
/**
 * This function will take a given value and change its priority within the referenced priority queue.
 */
declare function ds_priority_change_priority(id: Id.DsPriority, val: unknown, priority: number): undefined;
/**
 * With this function you can clear all data from the given priority queue data structure. This does NOT destroy the data structure (for that you should use ds_priority_destroy()) it only wipes all data from it and returns an empty priority queue.
 */
declare function ds_priority_clear(id: Id.DsPriority): undefined;
/**
 * This function can be used to copy the contents of one priority queue into another. Note that this does NOT remove the contents from the original priority queue, nor does it destroy the original priority queue.
 */
declare function ds_priority_copy(destination: Id.DsPriority, source: Id.DsPriority): undefined;
/**
 * This function will simply delete the given value, along with its priority, from the indexed priority queue.
 */
declare function ds_priority_delete_value(id: Id.DsPriority, val: unknown): undefined;
/**
 * This function will remove the given priority queue data structure from memory, freeing up the resources it was using and removing all values that it contained. This function should always be used when you are finished using the DS priority queue to prevent memory leaks that can slow down and crash your game.
 */
declare function ds_priority_destroy(id: Id.DsPriority): undefined;
/**
 * With this function you can check the given DS priority queue to see if it is empty (returns true) or not (returns false).
 */
declare function ds_priority_empty(id: Id.DsPriority): boolean;
/**
 * With this function you can retrieve the priority of any given value. If the value does not exist in the priority queue then undefined will be returned.
 */
declare function ds_priority_find_priority(id: Id.DsPriority, val: unknown): number;
/**
 * With this function you can recreate a saved DS priority queue (one that has previously been written as a string using ds_priority_write()). You must first create a new DS priority to read the string into, and if the DS priority already exists and has information stored in it, then this will be cleared before reading.
 */
declare function ds_priority_read(id: Id.DsPriority, str: string, legacy__optional_?: boolean): undefined;
/**
 * This function will return the "size" of the priority queue, i.e.: the number of items that have been prioritized in it.
 */
declare function ds_priority_size(id: Id.DsPriority): number;
/**
 * This function returns a string which can then be stored or transferred to another data structure using the ds_priority_read() function.
 */
declare function ds_priority_write(id: Id.DsPriority): string;
/**
 * With this function you can clear all data from the given queue data structure. This does NOT destroy the data structure (for that you should use ds_queue_destroy()), it only wipes all data from it and returns an empty queue.
 */
declare function ds_queue_clear(id: Id.DsQueue): undefined;
/**
 * This function can be used to copy the contents of one queue into another. Note that this does NOT remove the contents from the original queue, nor does it destroy the original queue. When using this function the queue being copied to must have been previously created and if it contained any items before the copy, then these will be cleared first (meaning this information will be lost).
 */
declare function ds_queue_copy(destination: Id.DsQueue, source: Id.DsQueue): undefined;
/**
 * This function will remove the given queue data structure from memory, freeing up the resources it was using and removing all values that it contained. This function should always be used when you are finished using the DS queue to prevent memory leaks that can slow down and crash your game.
 */
declare function ds_queue_destroy(id: Id.DsQueue): undefined;
/**
 * With this function you can check the given DS queue to see if it is empty (returns true) or not (returns false).
 */
declare function ds_queue_empty(id: Id.DsQueue): boolean;
/**
 * With this function you can recreate a saved DS queue (one that has previously been written as a string using ds_queue_write()). You must first create a new DS queue to read the string into, and if the DS queue already exists and has information stored in it, then this will be cleared before reading.
 */
declare function ds_queue_read(id: Id.DsQueue, str: string, legacy__optional_?: boolean): undefined;
/**
 * This function will return the "size" of the queue, i.e.: the number of items that have been queued onto it.
 */
declare function ds_queue_size(id: Id.DsQueue): number;
/**
 * This function returns a string which can then be stored or transferred to another data structure using the ds_queue_read() function.
 */
declare function ds_queue_write(id: Id.DsQueue): string;
/**
 * With this function you can clear all data from the given stack data structure. This does NOT destroy the data structure (for that you should use ds_stack_destroy()) it only wipes all data from it and returns an empty stack.
 */
declare function ds_stack_clear(id: Id.DsStack): undefined;
/**
 * This function can be used to copy the contents of one stack into another. Note that this does NOT remove the contents from the original stack, nor does it destroy the original stack. When using this function the stack being copied to must have been previously created and if it contained any items before the copy, then these will be cleared first (meaning this information will be lost).
 */
declare function ds_stack_copy(destination: Id.DsStack, source: Id.DsStack): undefined;
/**
 * This function will remove the given stack data structure from memory, freeing up the resources it was using and removing all values that it contained. This function should always be used when you are finished using the DS stack to prevent memory leaks that can slow down and crash your game.
 */
declare function ds_stack_destroy(id: Id.DsStack): undefined;
/**
 * With this function you can check the given DS stack to see if it is empty (returns true) or not (returns false).
 */
declare function ds_stack_empty(id: Id.DsStack): boolean;
/**
 * With this function you can recreate a saved DS stack (one that has previously been written as a string using ds_stack_write()). You must first create a new DS stack to read the string into, and if the DS stack already exists and has information stored in it, then this will be cleared before reading.
 */
declare function ds_stack_read(id: Id.DsStack, str: string, legacy__optional_?: boolean): undefined;
/**
 * This function will return the "size" of the stack, i.e.: the number of items that have been pushed onto it.
 */
declare function ds_stack_size(id: Id.DsStack): number;
/**
 * This function returns a string which can then be stored or transferred to another data structure using the ds_stack_read() function.
 */
declare function ds_stack_write(id: Id.DsStack): string;
/**
 * This function will return true if the platform compiles outside of the virtual machine, such as for the YYC and JS platforms.
 */
declare function code_is_compiled(): boolean;
/**
 * This function generates a custom debug event that will be shown in the Graph View of the debugger when a game is being run in Debug Mode. If you require messages to be displayed when not in debug mode, then you should be using show_debug_message(). It is worth noting that the function will also take two reserved strings to help perform debugging using external applications like Visual Studio.
 */
declare function debug_event(string: string, param?: unknown): Record<string, unknown>;
/**
 * This function generates an array of strings as the "callstack" where the current script is listed first, and then all the other scripts that were run in order for the current script to be executed.
 */
declare function debug_get_callstack(maxdepth?: number): Array<string>;
/**
 * This runtime function can be used to "take over" the default GameMaker error message when a runtime exception occurs. You supply a method or function which is called when the exception occurs, and its first argument will be a struct containing information about the exception.
 */
declare function exception_unhandled_handler(user_handler: GMLFunction): GMLFunction;
/**
 * This function has been deprecated and is now obsolete (use get_integer_async instead). Calls to this function will produce a warning message.
 * @deprecated
 */
declare function get_integer(str: string, def: number): number;
/**
 * This function has been deprecated and is now obsolete (use get_string_async instead). Calls to this function will produce a warning message.
 * @deprecated
 */
declare function get_string(str: string, def: string): string;
/**
 * This function will create a custom debug message that is shown in the compiler window at runtime.
 */
declare function show_debug_message(string_or_format: unknown, ___?: GML.ArgumentIdentity): undefined;
/**
 * This function will create a custom debug message that is shown in the compiler window at runtime.
 */
declare function show_debug_message_ext(str_format: string, ___: unknown[]): undefined;
/**
 * This function can be used to switch on and off the standard debug overlay when testing your game and is disabled by default. The debug overlay shows a graphic CPU/GPU usage bar in the actual game window itself along with the current real fps value, number of texture swaps and the number of vertex batches. Note that texture swaps and vertex batches will never be zero and will normally show values of 2 or 3, since even with an empty room an no objects GameMaker still has to draw and batch things.
 */
declare function show_debug_overlay(enable: boolean, minimised?: boolean, scale?: number, alpha?: number, gamepad_enable?: boolean, gamepad_index?: number): undefined;
/**
 * Gets the status of gamepad input in the debug overlay a return of -1 indicates gamepad is disabled a return of `all` (-3) indicates gamepad input is enabled for all gamepads or any other number indicates that a specific gamepad is being used for debug overlay input
 */
declare function dbg_get_gamepad_input(): number;
/**
 * Returns true if the debug overlay is open and false otherwise
 */
declare function is_debug_overlay_open(): boolean;
/**
 * Returns true if the mouse is over a debug overlay window or gadget, or is being used by the debug sub-systems (i.e. for dragging)
 */
declare function is_mouse_over_debug_overlay(): boolean;
/**
 * Returns true if the keyboard is being used by the debug overlay system
 */
declare function is_keyboard_used_debug_overlay(): boolean;
/**
 * This function can be used to switch on and off the standard debug log and console when testing your game and is disabled by default.
 */
declare function show_debug_log(enable: boolean): undefined;
/**
 * Declare a new debug view that can be accessed from the debug overlay.
 */
declare function dbg_view(name: string, visible: boolean, x?: number, y?: number, width?: number, height?: number): Pointer.View;
/**
 * Declare a new debug section this will be added to the current debug view that is active. NOTE: if no debug view is active then a "Default" view is created for you.
 */
declare function dbg_section(name: string, open?: boolean): Pointer.Section;
/**
 * Delete a dbg_view that has been previously been created. Returns true if section is deleted, false otherwise.
 */
declare function dbg_view_delete(view: Pointer.View): boolean;
/**
 * Check to see if a dbg_view still exists.
 */
declare function dbg_view_exists(view: Pointer.View): boolean;
/**
 * Delete a dbg_section that has previously been created. Returns true if section is deleted, false otherwise.
 */
declare function dbg_section_delete(section: Pointer.Section): boolean;
/**
 * Delete a dbg_* control (slider, button, checkbox etc.) that has previously been created. Returns true if control is deleted, false otherwise.
 */
declare function dbg_control_delete(section: Pointer.DbgControl): boolean;
/**
 * Checks if a dbg_* control (slider, button, checkbox etc.) exists. Returns true if control exists, false otherwise.
 */
declare function dbg_control_exists(section: Pointer.DbgControl): undefined;
/**
 * Sets the current active section to be the one given, any new controls will be added to this section.
 */
declare function dbg_set_section(section: Pointer.Section): boolean;
/**
 * Sets the current active view to be the one given, any new controls will be added to this view and the active section within that view.
 */
declare function dbg_set_view(view: Pointer.View): boolean;
/**
 * Check to see if a dbg_section still exists
 */
declare function dbg_section_exists(section: Pointer.Section): boolean;
/**
 * Creates a slider for a real value within the current debug section, minimum and maximum values can be specified. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_slider(dbgref: Id.DbgRef | Array<Id.DbgRef>, minimum?: number, maximum?: number, label?: string, step?: number): Pointer.DbgControl;
/**
 * Creates a slider for an integer value within the current debug section, minimum and maximum values can be specified. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_slider_int(dbgref: Id.DbgRef | Array<Id.DbgRef>, minimum?: number, maximum?: number, label?: string, step?: number): Pointer.DbgControl;
/**
 * Adds a TTF font to be used in the debug rendering. The font should be added to the included files, the size of the font can be specified in pixels, and a font range can be selected (glyphs must be present in the given TTF font): * -1 - Default Latin range * 0 - Greek * 1 - Korean * 2 - Japanese * 3 - Chinese Full * 4 - Chinese Simplified Common * 5 - Cyrillic * 6 - Thai * 7 - Vietnamese
 */
declare function dbg_add_font_glyphs(filename: string, size?: number, fontRange?: number): undefined;
/**
 * Creates a drop down for a value within the current debug section, Either use an array of values (with an optional array of labels for those names) OR the values and names are declared as a comma delimited string - where integer values can be specified after a colon symbol so "Zero,One:10,Two:20" will create a 3 entry drop down that will set the variable to the value 0, 10 or 20 depending on which is selected. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_drop_down(dbgref: Id.DbgRef | Array<Id.DbgRef>, specifierOrArrayOfValues: string | Array<string>, labelOrArrayOfLabels?: string | Array<string>, label?: string): Pointer.DbgControl;
/**
 * Creates a watch for any value within the current debug section, each value is converted to a string and displayed. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_watch(dbgref: Id.DbgRef | Array<Id.DbgRef>, label?: string): Pointer.DbgControl;
/**
 * Creates a text entry (from a variable) within the current debug section, this text can be multiline and is not split into 2 columns but shown in a single column. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_text(dbgref: Id.DbgRef | Array<Id.DbgRef> | string): Pointer.DbgControl;
/**
 * Creates a text separator entry (from a variable) within the current debug section, this text can be multiline and is not split into 2 columns but shown in a single column. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_text_separator(dbgref: Id.DbgRef | Array<Id.DbgRef> | string, align?: number): Pointer.DbgControl;
/**
 * Creates a sprite view of the specified sprite with the specified index within the current debug section. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_sprite(dbgrefSprite: Id.DbgRef | Array<Id.DbgRef>, dbgrefSpriteIndex: Id.DbgRef | Array<Id.DbgRef>, label?: string, width?: number, height?: number): Pointer.DbgControl;
/**
 * Creates a text input entry within the current debug section. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_text_input(dbgref: Id.DbgRef | Array<Id.DbgRef>, label?: string, type?: string): Pointer.DbgControl;
/**
 * Creates a check box entry within the current debug section, variable will be a boolean value true or false. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_checkbox(dbgref: Id.DbgRef | Array<Id.DbgRef>, label?: string): Pointer.DbgControl;
/**
 * Creates a colour entry within the current debug section, variable will be a colour RGB value, no alpha. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_colour(dbgref: Id.DbgRef | Array<Id.DbgRef>, label?: string): Pointer.DbgControl;
/**
 * Creates a color entry within the current debug section, variable will be a color RGB value, no alpha. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_color(dbgref: Id.DbgRef | Array<Id.DbgRef>, label?: string): Pointer.DbgControl;
/**
 * Creates a button within the current debug section, the given method will be called when the button is pressed; it is not split into 2 columns but shown in a single column. NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_button(label: string, dbgref: Id.DbgRef | Id.Script | GMLFunction, width?: number, height?: number): Pointer.DbgControl;
/**
 * Creates a button within the current debug section, the given method will be called when the button is pressed; it is not split into 2 columns but shown in a single column. The sprite is specified with the given reference, the width and height of the button specified in pixels (width and height of the sprite is used if not specified). Bits of the sprite can be displayed by specifying the x and y offset along with width and height (if none given then the whole sprite is used). NOTE: if no section is declared a "Default" section will be created.
 */
declare function dbg_sprite_button(dbgref: Id.DbgRef | Id.Script | GMLFunction, dbgrefSprite: Id.DbgRef | Array<Id.DbgRef>, dbgrefSpriteIndex: Id.DbgRef | Array<Id.DbgRef>, width?: number, height?: number, xoffset?: number, yoffset?: number, widthSprite?: number, heightSprite?: number): Pointer.DbgControl;
/**
 * Causes the next debug control to be placed on the same line as the current debug control (if they are single column controls)
 */
declare function dbg_same_line(): Pointer.DbgControl;
/**
 * Create a debug reference to a live variable
 */
declare function ref_create(dbgrefOrStruct: Id.DbgRef | Id.Instance | Record<string, unknown>, dbgrefOrName: Id.DbgRef | string, index?: number): Id.DbgRef;
/**
 * This function will show a custom string as an error message. You can also specify whether the game should be aborted after the error, however please note that this only exists for compatibility reasons and showing errors will require the game to be aborted regardless of the value specified in this argument.
 */
declare function show_error(str: string, abort: boolean): undefined;
/**
 * This function creates a pop-up message box which displays the given string and a button marked "Ok" to close it.
 */
declare function show_message(str: unknown): undefined;
/**
 * This function creates a pop-up message box with two buttons for "Yes" and "No". It returns true or false depending on which one of the two buttons the user presses.
 */
declare function show_question(str: string): boolean;
/**
 * With this function you can choose to enable (true) or disable (false) the draw event for all instances in the game, thus giving you control over how and when things are drawn. This can be, for example, useful if you wish to implement a "frame skip" technique.
 */
declare function draw_enable_drawevent(enable: boolean): undefined;
/**
 * This function flushes the entire draw pipeline.
 */
declare function draw_flush(): undefined;
/**
 * This function will draw an arrow from point (x1, y1) to point (x2, y2). The stem of the arrow is drawn along these points with the actual arrow head being drawn at the end, where the size of the arrowhead is defined by the argument "size" and is calculated as being part of the stem so that the end point is always aligned with the position defined by (x2, y2). The width of the arrow head is calculated automatically in proportion to the length.
 */
declare function draw_arrow(x1: number, y1: number, x2: number, y2: number, size: number): undefined;
/**
 * This function will draw a very simple, rectangular "button" using the currently selected draw colour and alpha where the up argument defines how the beveled edge effect looks.
 */
declare function draw_button(x1: number, y1: number, x2: number, y2: number, up: boolean): undefined;
/**
 * With this function you can draw either an outline of a circle or a filled circle. You can define how precise the drawing is with the function draw_set_circle_precision().
 */
declare function draw_circle(x: number, y: number, r: number, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a circle or a filled circle, and if it is filled you can define the interior and exterior fill colours.
 */
declare function draw_circle_colour(x: number, y: number, r: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of an ellipse or a filled ellipse by defining a rectangular area that will then have the ellipse created to fit.
 */
declare function draw_ellipse(x1: number, y1: number, x2: number, y2: number, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of an ellipse or a filled ellipse by defining a rectangular area that will then have the ellipse created to fit.
 */
declare function draw_ellipse_colour(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw a coloured bar to show a constant value. Although the function uses the word "healthbar" you can use this to display anything you wish as long as the amount to be displayed is a percentage value between 0 and 100 (a percentage of any value can be calculated with the formula (CURRENT_Value / MAXIMUM_value) * 100).
 */
declare function draw_healthbar(x1: number, y1: number, x2: number, y2: number, amount: number, backcol: Constant.Color, mincol: Constant.Color, maxcol: Constant.Color, direction: number, showback: boolean, showborder: boolean): undefined;
/**
 * With this function you can draw a 1 pixel wide line between any two points in the game room. Please note that the line being drawn may need different values (+/-1 on the x, y) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_line(x1: number, y1: number, x2: number, y2: number): undefined;
/**
 * With this function you can draw a 1 pixel wide line with the colour blended between colour 1 at the first point and colour 2 at the second point. The colour settings will override the base colour set with the function draw_set_colour(). Please note that the line being drawn may need different values (+/-1 on the x, y) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_line_colour(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color): undefined;
/**
 * With this function you can draw a line of a specified width between any two points in the game room. Please note that the line being drawn may need different values (+/-1 on the x, y) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_line_width(x1: number, y1: number, x2: number, y2: number, w: number): undefined;
/**
 * With this function you can draw a line of a specific width with the colour blended between colour 1 at the first point and colour 2 at the second point. The colour settings will override the base colour set with the function draw_set_colour(). Please note that the line being drawn may need different values (+/-1 on the x, y) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_line_width_colour(x1: number, y1: number, x2: number, y2: number, w: number, col1: Constant.Color, col2: Constant.Color): undefined;
/**
 * With this function you can get GameMaker to draw a path to the screen. The path will be drawn as a simple line, and can be either relative to the calling instance or at the absolute position it was created at in the path editor or through code.
 */
declare function draw_path(path: unknown, x: unknown, y: unknown, absolute: boolean): undefined;
/**
 * With this function you can draw a single pixel anywhere on the screen, using the currently set draw colour and alpha.
 */
declare function draw_point(x: number, y: number): undefined;
/**
 * With this function you can draw a single pixel anywhere on the screen with a colour that you define. The colour settings will override the base colour set with the function draw_set_colour().
 */
declare function draw_point_colour(x: number, y: number, col1: Constant.Color): undefined;
/**
 * With this function you can draw either an outline of a rectangle or a filled rectangle where the (x1, y1) position is the top left corner and the (x2, y2) position is the bottom right corner. Please note that the rectangle being drawn may need different values (+/-1 on the x, y, or width or height) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_rectangle(x1: number, y1: number, x2: number, y2: number, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rectangle or a filled rectangle by defining an area where the (x1, y1) position is the top-left corner and the (x2, y2) position is the bottom-right corner. If it is filled you can define the individual colours for each corner point and if these colours are not the same, you will get a gradient effect from one to the other (the colour settings will override the base colour set with the function draw_set_colour()). Please note that the rectangle being drawn may need different values (+/-1 on the x, y, or width or height) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_rectangle_colour(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color, col3: Constant.Color, col4: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rounded rectangle or a filled rounded rectangle where the (x1, y1) position is the top-left corner and the (x2, y2) position is the bottom-right corner. You can define how precise the drawing of the corners is with the function draw_set_circle_precision(), but this function uses a fixed radius for them (should you need to change the corner radius, use the function draw_roundrect_ext()). Please note that the rectangle being drawn may need different values (+/-1 on the x, y, or width or height) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_roundrect(x1: number, y1: number, x2: number, y2: number, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rounded rectangle or a filled rounded rectangle where the (x1, y1) position is the top-left corner and the (x2, y2) position is the bottom-right corner. If it is filled, you can define the individual colours for the centre and the edges, and if these colours are not the same, you will get a gradient effect from one to the other (the colour settings will override the base colour set with the function draw_set_colour()).You can define how precise the drawing of the corners is with the function draw_set_circle_precision(), but the corners are always drawn with a fixed radius. Should you need to change the corner radius you should use the function draw_roundrect_colour_ext(). Please note that the rectangle being drawn may need different values (+/-1 on the x, y, or width or height) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_roundrect_colour(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rounded rectangle or a filled rounded rectangle where the (x1, y1) position is the top left corner and the (x2, y2) position is the bottom right corner. If the rectangle is filled, then the colour arguments will be used to generate a colour gradient from the centre to the edges, where colour 1 is the centre colour and colour 2 the edge colour. You must also supply radius values for the x and y axis (in pixels) and the corners will be rounded by these amounts. You can define how precise the drawing of the corners is with the function draw_set_circle_precision(). Please note that the rectangle being drawn may need different values (+/-1 on the x, y, or width or height) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_roundrect_colour_ext(x1: number, y1: number, x2: number, y2: number, xrad: number, yrad: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rounded rectangle or a filled rounded rectangle where the (x1, y1) position is the top left corner and the (x2, y2) position is the bottom right corner. You must also supply radius values for the x and y axis (in pixels) and the corners will be rounded by these amounts. You can define how precise the drawing of the corners is with the function draw_set_circle_precision(). Please note that the rectangle being drawn may need different values (+/-1 on the x, y, or width or height) to be drawn with the desired dimensions due to differences across the various supported platforms.
 */
declare function draw_roundrect_ext(x1: number, y1: number, x2: number, y2: number, xrad: number, yrad: number, outline: boolean): undefined;
/**
 * This function sets the precision GameMaker uses when drawing circles.
 */
declare function draw_set_circle_precision(precision: number): undefined;
/**
 * This function gets the precision GameMaker uses when drawing circles.
 */
declare function draw_get_circle_precision(): number;
/**
 * With this function you can draw either an outline of a triangle or a filled triangle.
 */
declare function draw_triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a triangle or a filled triangle. If it is filled you can define the individual colours for each corner point and if these colours are not the same, you will get a gradient effect from one to the other (the colour settings will override the base colour set with the function draw_set_colour()).
 */
declare function draw_triangle_colour(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, col1: Constant.Color, col2: Constant.Color, col3: Constant.Color, outline: boolean): undefined;
/**
 * This function returns the amount of blue used to make the given colour, with the value being between 0 and 255, where 0 is no blue and 255 is all blue.
 */
declare function colour_get_blue(col: Constant.Color): number;
/**
 * This function returns the amount of green used to make the given colour, with the value being between 0 and 255, where 0 is no green and 255 is all green.
 */
declare function colour_get_green(col: Constant.Color): number;
/**
 * This function will return the hue of the given colour. This is the "pure" colour tone which is part of the hue, saturation and value (luminosity) method for defining a colour.
 */
declare function colour_get_hue(col: Constant.Color): number;
/**
 * This function returns the amount of red used to make the given colour, with the value being between 0 and 255, where 0 is no red and 255 is all red.
 */
declare function colour_get_red(col: Constant.Color): number;
/**
 * This function will return the saturation of the given colour. This is the amount of the colour tone that is mixed into the final colour and is part of the hue, saturation and value (luminosity) method for defining a colour.
 */
declare function colour_get_saturation(col: Constant.Color): number;
/**
 * This function will return the value (luminosity) of the given colour. This is the amount of the "light" that is mixed into the final colour and is part of the hue, saturation and value method for defining a colour.
 */
declare function colour_get_value(col: Constant.Color): number;
/**
 * This function can be used to clear the entire screen (with no alpha blend) to the given colour, and is only for use in the draw event of an instance (it will not show if used in any other event). It can also be useful for clearing surfaces when they are newly created.
 */
declare function draw_clear(col: Constant.Color): undefined;
/**
 * This function can be used to clear the entire screen or a surface with the given colour and the alpha component of the destination is set to the value you have set.
 */
declare function draw_clear_alpha(col: Constant.Color, alpha: number): undefined;
/**
 * This function can be used to clear the depth buffer of the current render target.
 */
declare function draw_clear_depth(depth: number): undefined;
/**
 * This function can be used to clear colour, depth and stencil of the current render target.
 */
declare function draw_clear_ext(col?: Constant.Color | undefined, alpha?: number | undefined, depth?: number | undefined, stencil?: number | undefined): undefined;
/**
 * This function can be used to clear the stencil buffer of the current render target.
 */
declare function draw_clear_stencil(stencil: number): undefined;
/**
 * With this function you can get the colour value of any pixel that is being drawn to the current render target. This means that the results will depend on the event in which the function is called, and also on the target surface being used. Note that this will not return any alpha values, for that you should use draw_getpixel_ext().
 */
declare function draw_getpixel(x: number, y: number): number;
/**
 * With this function you can get the full abgr 32bit value of any pixel that is being drawn to the current render target. This means that the results will depend on the event in which the function is called, and also on the target surface being used.
 */
declare function draw_getpixel_ext(x: number, y: number): number;
/**
 * This function returns the current value of the draw alpha, which will range between 0 (fully transparent) and 1 (fully opaque). The draw alpha affects the transparency of all draw functions, and can be set with the draw_set_alpha() function.
 */
declare function draw_get_alpha(): number;
/**
 * This function returns the current draw colour which is used for drawing forms, text, primitives and untextured 3D models. This can be set with the draw_set_colour() function.
 */
declare function draw_get_colour(): number;
/**
 * With this function you can set the base draw alpha for the game. This value can be set from 0 to 1 with 0 being fully transparent and 1 being fully opaque (the default value), and will affect all further drawing, including backgrounds, sprites, fonts, primitives and 3D.
 */
declare function draw_set_alpha(alpha: number): undefined;
/**
 * With this function you can set the base draw colour for the game. This value will affect all further drawing where appropriate, including fonts, forms, primitives and 3D. If any of those assets are drawn with their own colour value changed, this value will be ignored.
 */
declare function draw_set_colour(col: Constant.Color): undefined;
/**
 * This function creates a colour based on the hue, saturation and value components.
 */
declare function make_colour_hsv(hue: number, sat: number, val: number): number;
/**
 * This function creates a colour based on the red, green and blue components.
 */
declare function make_colour_rgb(red: number, green: number, blue: number): number;
/**
 * With this function you can take two colours and then merge them together to make a new colour. The amount of each of the component colours can be defined by changing the "amount" argument, where a value of 0 will return the first colour (col1), a value of 1 will return the second colour (col2) and a value in between will return the corresponding mix. For example, a value of 0.5 will mix the two colours equally.
 */
declare function merge_colour(col1: Constant.Color, col2: Constant.Color, amount: number): number;
/**
 * With this function you can check to see whether sprite culling is enabled (returns true) or not (returns false).
 */
declare function gpu_get_sprite_cull(): boolean;
/**
 * With this function you can check to see whether alpha testing is enabled (returns true) or not (returns false).
 */
declare function gpu_get_alphatestenable(): boolean;
/**
 * You can use this function to find the current value for the alpha test reference (default is 0, but you can use gpu_set_alphatestref() to set this value to something other than this).
 */
declare function gpu_get_alphatestref(): number;
/**
 * This function can be used to retrieve the alpha blending state. If it returns true then alpha blending is enabled, and if it returns false it is disabled. By default this is on and so the function will return true.
 */
declare function gpu_get_blendenable(): boolean;
/**
 * This function can be used to retrieve the current blend mode being used for drawing.
 */
declare function gpu_get_blendmode(): Constant.BlendMode;
/**
 * This function can be used to retrieve the current destination extended blend mode factor being used for drawing.
 */
declare function gpu_get_blendmode_dest(): Constant.BlendModeFactor;
/**
 * This function can be used to retrieve the current destination extended blend mode alpha factor.
 */
declare function gpu_get_blendmode_destalpha(): Constant.BlendModeFactor;
/**
 * This function can be used to retrieve the current extended blend mode being used for drawing.
 */
declare function gpu_get_blendmode_ext(): Array<Constant.BlendModeFactor>;
/**
 * This function can be used to retrieve the current extended blend mode being used for drawing, separating out the blend modes into two parts - the RGB component and the alpha component.
 */
declare function gpu_get_blendmode_ext_sepalpha(): Array<Constant.BlendModeFactor>;
/**
 * This function can be used to retrieve the current source extended blend mode factor being used for drawing.
 */
declare function gpu_get_blendmode_src(): Constant.BlendModeFactor;
/**
 * This function can be used to retrieve the current source extended blend mode alpha factor.
 */
declare function gpu_get_blendmode_srcalpha(): Constant.BlendModeFactor;
/**
 * This function can be used to retrieve the current blend equation being used for drawing.
 */
declare function gpu_get_blendequation(): Constant.BlendModeEquation;
/**
 * This function can be used to retrieve the current blend and alpha blend equations being used for drawing.
 */
declare function gpu_get_blendequation_sepalpha(): Array<Constant.BlendModeEquation>;
/**
 * This function can be used to retrieve the current colour write-enable values.
 */
declare function gpu_get_colourwriteenable(): Array<boolean>;
/**
 * This function can be used to retrieve the backface culling mode.
 */
declare function gpu_get_cullmode(): Constant.CullMode;
/**
 * This function can be used to retrieve the fog settings.
 */
declare function gpu_get_fog(): Array<number>;
/**
 * This function will get the current GPU state, returning it as a DS Map. This can then be manipulated or even saved, and you can return this map to the GPU using the function gpu_set_state().
 */
declare function gpu_get_state(): Id.DsMap;
/**
 * This function can be used to retrieve the stencil operation executed when the stencil test passes but the depth test fails.
 */
declare function gpu_get_stencil_depth_fail(): Constant.StencilOp;
/**
 * This function can be used to retrieve whether the stencil test is currently enabled (returns true) or not (returns false).
 */
declare function gpu_get_stencil_enable(): boolean;
/**
 * This function can be used to retrieve the stencil operation executed when the stencil test fails.
 */
declare function gpu_get_stencil_fail(): Constant.StencilOp;
/**
 * This function can be used to retrieve the current stencil test function.
 */
declare function gpu_get_stencil_func(): Constant.ZFunction;
/**
 * This function can be used to retrieve the stencil operation executed when both stencil and depth test pass.
 */
declare function gpu_get_stencil_pass(): Constant.StencilOp;
/**
 * This function can be used to retrieve the current stencil test read mask value.
 */
declare function gpu_get_stencil_read_mask(): number;
/**
 * This function can be used to retrieve the current stencil test reference value.
 */
declare function gpu_get_stencil_ref(): number;
/**
 * This function can be used to retrieve the current stencil test write mask value.
 */
declare function gpu_get_stencil_write_mask(): number;
/**
 * With this function you can check to see whether texture filtering (linear interpolation) is enabled (returns true) or not (returns false).
 */
declare function gpu_get_texfilter(): boolean;
/**
 * With this function you can check to see whether texture interpolation (linear interpolation) is enabled (returns true) or not (returns false) for a given shader sampler texture.
 */
declare function gpu_get_texfilter_ext(sampler_id: Id.Sampler): boolean;
/**
 * With this function you can check to see whether texture repeating is enabled (returns true) or not (returns false).
 */
declare function gpu_get_texrepeat(): boolean;
/**
 * With this function you can check to see whether texture repeating is enabled (returns true) or not (returns false) for a given shader sampler texture.
 */
declare function gpu_get_texrepeat_ext(sampler_id: Id.Sampler): boolean;
/**
 * This function can be used to retrieve the z comparison mode.
 */
declare function gpu_get_zfunc(): Constant.ZFunction;
/**
 * This function can be used to retrieve whether z-testing is enabled (the function returns true) or not (the function returns false). The default value is that z-testing is disabled, so the function will return false.
 */
declare function gpu_get_ztestenable(): boolean;
/**
 * This function returns the current depth (z coordinate) for 2D drawing functions. By default, it will be equal to the current layer's depth, but can be changed using gpu_set_depth.
 */
declare function gpu_get_depth(): number;
/**
 * This function can be used to retrieve whether z-writing is enabled (the function returns true) or not (the function returns false). The default value is that z-writing is enabled, so the function will return true.
 */
declare function gpu_get_zwriteenable(): boolean;
/**
 * This function pops the previous GPU state from the stack and applies it. See gpu_push_state() for more information.
 */
declare function gpu_pop_state(): undefined;
/**
 * With this function you can push the current GPU state onto a stack to be used later. You would generally use this if you want to "save" the current GPU state (things like blend mode, alpha writing, culling, etc., will all be pushed to the stack), then draw something with different settings, and then reset the GPU stack to what it was before (by calling gpu_pop_state()).
 */
declare function gpu_push_state(): undefined;
/**
 * This function will enable or disable sprite culling for your game (by default this is enabled). By switching sprite culling off you can avoid any problems with for example sprites not being drawn when using custom shaders that alter the position the sprite is drawn at.
 */
declare function gpu_set_sprite_cull(enable: boolean): undefined;
/**
 * This function will enable or disable alpha testing for your game (by default this is disabled). By switching alpha testing on you can then use the companion function gpu_set_alphatestref() to set the "cut-off" value at which all alpha values will be set to 0.
 */
declare function gpu_set_alphatestenable(enable: boolean): undefined;
/**
 * This function will set the reference value for the alpha testing (when it has been enabled using the gpu_set_alphatestenable()). This is the "cut-off" threshold at which pixels with alpha will not be drawn.
 */
declare function gpu_set_alphatestref(val: number): undefined;
/**
 * This function can be used to toggle alpha blending on and off.
 */
declare function gpu_set_blendenable(enable: boolean): undefined;
/**
 * This function permits you to set the blend mode to one of the basic blend modes in GameMaker.
 */
declare function gpu_set_blendmode(mode: Constant.BlendMode): undefined;
/**
 * This function permits you to create a custom blend mode by setting the different component parts that should be factored together.
 */
declare function gpu_set_blendmode_ext(src: Constant.BlendModeFactor, dest: Constant.BlendModeFactor): undefined;
/**
 * This function permits you to set the different component parts that should be factored together to create a custom blend mode, selecting different blend mode factors for the RGB components and the alpha component.
 */
declare function gpu_set_blendmode_ext_sepalpha(src: Constant.BlendModeFactor, dest: Constant.BlendModeFactor, alphasrc: Constant.BlendModeFactor, alphadest: Constant.BlendModeFactor): undefined;
/**
 * With this function you can change how the final pixel is calculated from the source and destination.
 */
declare function gpu_set_blendequation(equation: Constant.BlendModeEquation): undefined;
/**
 * This function is the same as gpu_set_blendequation(), however it allows you to set two separate equations: the first one is used for the RGB components of the source and destination, and the second one is used for the alpha component.
 */
declare function gpu_set_blendequation_sepalpha(equation: Constant.BlendModeEquation, equation_alpha: Constant.BlendModeEquation): undefined;
/**
 * With this function you can switch on or off the colour channels and the alpha channel for all further drawing.
 */
declare function gpu_set_colourwriteenable(red: boolean | Array<boolean>, green?: boolean, blue?: boolean, alpha?: boolean): undefined;
/**
 * This function can be used to set the backface culling mode.
 */
declare function gpu_set_cullmode(cullmode: Constant.CullMode): undefined;
/**
 * This function can be used to enable or disable fog drawing.
 */
declare function gpu_set_fog(enableOrArray: boolean | unknown[], colour?: Constant.Color, start?: number, end?: number): undefined;
/**
 * This function can be used to set a scissor region that will clip all rendering to the current render target, all coordinates are in render target coordinate system. NOTE: All values are used as integers. NOTE: Each surface and viewport will reset the current scissor region (they are not stacked).
 */
declare function gpu_set_scissor(xOrStruct: number | Record<string, unknown>, y?: number, w?: number, h?: number): undefined;
/**
 * This function can be used to get the current scissor region, returns a struct that contains {x, y, w, h}.
 */
declare function gpu_get_scissor(): Record<string, unknown>;
/**
 * This function will set the current GPU state using the passed-in DS Map.
 */
declare function gpu_set_state(ds_map: Id.DsMap): undefined;
/**
 * This function can be used to set the stencil operation taken when the stencil test passes but the depth test fails.
 */
declare function gpu_set_stencil_depth_fail(stencil_op: Constant.StencilOp): undefined;
/**
 * This function can be used to disable or enable the stencil test.
 */
declare function gpu_set_stencil_enable(enable: boolean): undefined;
/**
 * This function can be used to set the stencil operation taken when the stencil test fails.
 */
declare function gpu_set_stencil_fail(stencil_op: Constant.StencilOp): undefined;
/**
 * This function can be used to set the stencil test function.
 */
declare function gpu_set_stencil_func(cmp_func: Constant.ZFunction): undefined;
/**
 * This function can be used to set the stencil operation taken when both the stencil and the depth test pass.
 */
declare function gpu_set_stencil_pass(stencil_op: Constant.StencilOp): undefined;
/**
 * This function can be used to set the stencil test read mask.
 */
declare function gpu_set_stencil_read_mask(read_mask: number): undefined;
/**
 * This function can be used to set the stencil test reference value.
 */
declare function gpu_set_stencil_ref(ref: number): undefined;
/**
 * This function can be used to set the stencil test write mask.
 */
declare function gpu_set_stencil_write_mask(write_mask: number): undefined;
/**
 * This function can be used to set the texture filtering (linear interpolation) of all images drawn on the game screen. When enabled (true) all textures (includes sprites) will be smoothed when drawn, meaning that when scaled or moved if there is not a 1:1 pixel ratio then there will be a "smudging" across various pixels which may make images appear blurry. If this is disabled (false) then images will be drawn based on the nearest pixel when scaled or moving which may lead to "blocky" images.
 */
declare function gpu_set_texfilter(enable: boolean): undefined;
/**
 * This function can be used to set the linear interpolation for a single sampler "slot" when using Shaders in GameMaker. When this is enabled (true) the sampler texture will be smoothed and if this is disabled (false) then images will be drawn based on the nearest pixel. The default value is that set by the Global Game Options for your game, or that set using the function gpu_set_texfilter().
 */
declare function gpu_set_texfilter_ext(sampler_id: Id.Sampler, enable: boolean): undefined;
/**
 * This function can be used to indicate to GameMaker whether textures should repeat (true) or not (false) when used with models and primitives. When enabled the GPU will treat UV coordinates outside of the 0 to 1 range as inside this range (e.g. 1.2, 2.2, 3.2, etc., all become 0.2) which causes texture images to repeat, instead of clamping them between 0 and 1 (no repetition).
 */
declare function gpu_set_texrepeat(enable: boolean): undefined;
/**
 * This function can be used to set whether a single sampler "slot" repeats the given texture when using Shaders in GameMaker. Setting it to true will repeat the texture if the uv coordinates are outside of the 0-1 range, while a setting of false will mean no repeating. Note that for this to work on a single sprite the sprite will need to be marked as being on a "Separate Texture Page" in the Sprite Editor.
 */
declare function gpu_set_texrepeat_ext(sampler_id: Id.Sampler, enable: boolean): undefined;
/**
 * This function can be used to set the z-buffer testing comparison mode (see gpu_set_ztestenable() for more information).
 */
declare function gpu_set_zfunc(cmp_func: Constant.ZFunction): undefined;
/**
 * This function can be used to toggle z-buffer testing on or off. When enabled the GPU tests on a per-pixel basis if the source pixel is closer than the destination pixel, which determines whether it is drawn. Note that the default comparison checks if the z value of a pixel is less or equal (cmpfunc_lessequal) than that of the pixel drawn to, but this can be changed using function gpu_set_zfunc().
 */
declare function gpu_set_ztestenable(enable: boolean): undefined;
/**
 * This function can be used to change the depth (z coordinate) for 2D drawing functions. By default, the layer's depth will be used. Note that GameMaker will only change the depth when it starts drawing a new layer, so you may want to restore the original value (from gpu_get_depth()) after you're done drawing.
 */
declare function gpu_set_depth(depth: number): undefined;
/**
 * This function can be used to toggle on (true) and off (false) depth ordering using the z-buffer.
 */
declare function gpu_set_zwriteenable(enable: boolean): undefined;
/**
 * This function will return whether lighting is enabled (true) or not (false) for the whole scene.
 */
declare function draw_get_lighting(): boolean;
/**
 * This function is used to control the ambient light of a scene, which is the light that you have in a scene even without having defined any point or directional light sources.
 */
declare function draw_light_define_ambient(col: Constant.Color): undefined;
/**
 * This function is for defining a directional light, where the direction and intensity are set by the values input for the x, y and z unit vector (meaning that they must be between -1 and 1, where 1 or -1 is full intensity, and 0 is no intensity).
 */
declare function draw_light_define_direction(ind: number, x: number, y: number, z: number, col: Constant.Color): undefined;
/**
 * This function is for defining a positional light, where you can define the x, y and z position of the light, the light range and its colour (which will also affect the perceived intensity of the light as certain colours appear "darker" than others).
 */
declare function draw_light_define_point(ind: number, x: number, y: number, z: number, range: number, col: Constant.Color): undefined;
/**
 * This function is used to enable a defined light. When you define a positional or a directional light you must assign it an index number which is then used by this function to switch the light on or off. Default is disabled (false).
 */
declare function draw_light_enable(ind: number, enable: boolean): undefined;
/**
 * This function will get the specified light parameters as an array with the following 6 elements: * [0] = enabled / disabled (true / false) * [1] = Light Type Constant * [2] = x position * [3] = y position * [4] = z position * [5] = light radius (only for point lights, will be 0 for directional) * [6] = light colour (a real)
 */
declare function draw_light_get(ind: number): unknown[];
/**
 * This function will return the current colour used for ambient lighting.
 */
declare function draw_light_get_ambient(): number;
/**
 * This function is used to enable all lighting effects. Default is disabled (false).
 */
declare function draw_set_lighting(enable: boolean): undefined;
/**
 * With this function you can get the current maximum level of anisotropy when using the tf_anisotropic filter mode. The returned value will range between 1 and 16.
 */
declare function gpu_get_tex_max_aniso(): number;
/**
 * With this function you can get the current maximum level of anisotropy when using the tf_anisotropic filter mode on a shader sampler.
 */
declare function gpu_get_tex_max_aniso_ext(sampler_index: Id.Uniform): number;
/**
 * With this function you can get the currently set maximum mipmap level which is to be used, where a value of 0 is the highest resolution, 1 is to use the first mipmap, 2 is the second, etc.
 */
declare function gpu_get_tex_max_mip(): number;
/**
 * With this function you can get the currently set maximum mipmap level which is to be used for a given shader sampler. Note that this can be quite useful for avoiding bleeding artifacts when rendering textures, for example, setting the texture page border to 8px and then setting the max mipmap level to 3 will ensure you don't get any bleeding problems at greater render distances.
 */
declare function gpu_get_tex_max_mip_ext(sampler_index: Id.Uniform): number;
/**
 * With this function you can get the minimum mipmap level which is currently used, where a value of 0 is the highest resolution, 1 is to use the first mipmap, 2 is the second, etc.
 */
declare function gpu_get_tex_min_mip(): number;
/**
 * With this function you can get the minimum mipmap level which is currently used for a given shader sampler.
 */
declare function gpu_get_tex_min_mip_ext(sampler_index: Id.Uniform): number;
/**
 * With this function you can retrieve the mipmap bias value, where a value of 0 equals no bias, 1 equals the first mipmap, 2 equals the second mipmap, etc. This controls the rate at which the mip map is swapped and will generally make rendered textures blurrier the higher the value and the greater the "distance" being viewed. Note that this can return negative values too, in which case rendered textures will be sharper over a greater distance the lower the value.
 */
declare function gpu_get_tex_mip_bias(): number;
/**
 * With this function you can retrieve the mipmap bias value for a given shader sampler. Note that this can return negative values too, in which case shader textures will be sharper over a greater distance the lower the value.
 */
declare function gpu_get_tex_mip_bias_ext(sampler_index: Id.Uniform): number;
/**
 * With this function you can get whether mipmapping is switched off, switched on for everything or switched on only for texture groups selected in the Texture Group Manager.
 */
declare function gpu_get_tex_mip_enable(): number;
/**
 * With this function you can get whether mipmapping is switched off, switched on for everything or switched on only for texture groups selected in the Texture Group Manager on a shader sampler.
 */
declare function gpu_get_tex_mip_enable_ext(sampler_index: Id.Uniform): number;
/**
 * With this function you can get the current mip filter mode.
 */
declare function gpu_get_tex_mip_filter(): number;
/**
 * With this function you can get the current mip filter mode for a given shader sampler.
 */
declare function gpu_get_tex_mip_filter_ext(sampler_index: Id.Uniform): number;
/**
 * With this function you can set the current maximum level of anisotropy when using the tf_anisotropic filter mode (see gpu_get_tex_mip_filter() for more information). The input value must range between 1 and 16.
 */
declare function gpu_set_tex_max_aniso(maxaniso: number): undefined;
/**
 * With this function you can set the maximum level of anisotropy when using the tf_anisotropic filter mode (see gpu_get_tex_mip_filter() for more information) on a shader sampler.
 */
declare function gpu_set_tex_max_aniso_ext(sampler_index: Id.Uniform, maxaniso: number): undefined;
/**
 * With this function you can set the currently set maximum mipmap level which is to be used, where a value of 0 is the highest resolution, 1 is to use the first mipmap, 2 is the second, etc.
 */
declare function gpu_set_tex_max_mip(maxmip: number): undefined;
/**
 * With this function you can get the currently set maximum mipmap level which is to be used for a given shader sampler.
 */
declare function gpu_set_tex_max_mip_ext(sampler_index: Id.Uniform, maxmip: number): undefined;
/**
 * With this function you can set the minimum mipmap level which is currently used, where a value of 0 is the highest resolution, 1 is to use the first mipmap, 2 is the second, etc.
 */
declare function gpu_set_tex_min_mip(minmip: number): undefined;
/**
 * With this function you can set the minimum mipmap level which is currently used for a given shader sampler.
 */
declare function gpu_set_tex_min_mip_ext(sampler_index: Id.Uniform, minmip: number): undefined;
/**
 * With this function you can set the mipmap bias value, where a value of 0 equals no bias, 1 equals the first mipmap, 2 equals the second mipmap, etc.
 */
declare function gpu_set_tex_mip_bias(bias: number): undefined;
/**
 * With this function you can set the mipmap bias value for a given shader sampler.
 */
declare function gpu_set_tex_mip_bias_ext(sampler_index: Id.Uniform, bias: number): undefined;
/**
 * With this function you can change whether mipmapping is switched off, switched on for everything, or switched on only for texture groups selected in the Texture Group Manager.
 */
declare function gpu_set_tex_mip_enable(setting: number): undefined;
/**
 * With this function you can set whether mipmapping is switched off, switched on for everything or switched on only for texture groups selected in the Texture Group Manager on a shader sampler.
 */
declare function gpu_set_tex_mip_enable_ext(sampler_index: Id.Uniform, setting: number): undefined;
/**
 * With this function you can set the current mip filter mode to one of the three types supported.
 */
declare function gpu_set_tex_mip_filter(filter: number): undefined;
/**
 * With this function you can set the mip filter mode for a given shader sampler.
 */
declare function gpu_set_tex_mip_filter_ext(sampler_index: Id.Uniform, filter: number): undefined;
/**
 * This will clear all particles that are currently visible in the room which have been made using the effect_create_* functions.
 */
declare function effect_clear(): undefined;
/**
 * With this function you can create a simple effect above all instances of your room (it is actually created at a depth of -15000). If the effect is anything other than ef_rain or ef_snow then you can define an x/y position to create the effect, and the size can be a value of 0, 1, or 2, where 0 is small, 1 is medium and 2 is large.
 * @deprecated
 */
declare function effect_create_above(kind: Constant.EffectType, x: number, y: number, size: number, colour: Constant.Color): undefined;
/**
 * With this function you can create a simple effect below all instances of your room (it is actually created at a depth of 50). If the effect is anything other than ef_rain or ef_snow then you can define an x/y position to create the effect, and the size can be a value of 0, 1, or 2, where 0 is small, 1 is medium and 2 is large.
 * @deprecated
 */
declare function effect_create_below(kind: Constant.EffectType, x: number, y: number, size: number, colour: Constant.Color): undefined;
/**
 * With this function you can create a simple effect on a specified layer. If the effect is anything other than ef_rain or ef_snow then you can define an x/y position to create the effect, and the size can be a value of 0, 1, or 2, where 0 is small, 1 is medium and 2 is large.
 */
declare function effect_create_layer(layer_id: string | Id.Layer, kind: Constant.EffectType, x: number, y: number, size: number, colour: Constant.Color): undefined;
/**
 * With this function you can create a simple effect at a specified depth. If the effect is anything other than ef_rain or ef_snow then you can define an x/y position to create the effect, and the size can be a value of 0, 1, or 2, where 0 is small, 1 is medium and 2 is large.
 */
declare function effect_create_depth(depth: number, kind: Constant.EffectType, x: number, y: number, size: number, colour: Constant.Color): undefined;
/**
 * This function allows you to set an emitter to burst a specific type of particle and is typically used in alarms and destroy events as it is a one off code that creates the number of particles specified all at once following the distribution, shape and position set by the function part_emitter_region(). Should you need the particles to appear every step, you should be using the function part_emitter_stream() instead.
 */
declare function part_emitter_burst(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, parttype: Id.ParticleType, number: number): undefined;
/**
 * With this function you can clear the given emitter from the specified particle system back to its default state. This will also stop any particles that are being streamed from the emitter at the time, and if you wish to use the emitter again you will need to set the region position and particle type using the part_emitter_region() function.
 */
declare function part_emitter_clear(ps: Id.ParticleSystem, ind: Id.ParticleEmitter): undefined;
/**
 * This function must be used to create a new emitter and assign it to a given particle system. The emitter must be destroyed when no longer being used to prevent memory leaks
 */
declare function part_emitter_create(ps: Id.ParticleSystem): Id.ParticleEmitter;
/**
 * This function will remove the specified emitter from the given system and clear it from memory (this will also stop any particles from being produced by the given emitter, but does NOT remove existing ones from the room). This function should always be called when the given emitter is no longer needed for the system to prevent memory leaks and errors.
 */
declare function part_emitter_destroy(ps: Id.ParticleSystem, ind: Id.ParticleEmitter): undefined;
/**
 * This function will remove all defined emitters from the given system and clear them from memory (this will also stop any particles from being produced by the given emitter, but does NOT remove existing ones from the room). This function should always be called when the emitters are no longer needed for the system to prevent memory leaks and errors.
 */
declare function part_emitter_destroy_all(ps: Id.ParticleSystem): undefined;
/**
 * With this function you can enable or disable a particle emitter. Disabled particle emitters are not updated nor rendered and they do not spawn new particles.
 */
declare function part_emitter_enable(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, enable: boolean): undefined;
/**
 * With this function you can check to see if the given particle emitter indexed exists in the given system or not. Note that if the variable being checked is an uninitialised variable (that a particle emitter would otherwise have its index assigned to) this will throw an error.
 */
declare function part_emitter_exists(ps: Id.ParticleSystem, ind: Id.ParticleEmitter): boolean;
/**
 * This function is used to set the position of a particle emitter within the current room.
 */
declare function part_emitter_region(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, xmin: number, xmax: number, ymin: number, ymax: number, shape: Constant.ParticleRegionShape, distribution: Constant.ParticleDistribution): undefined;
/**
 * This function allows you to set an emitter to stream a specific type of particle and is typically used in the create event as it is a one-off code that sets the emitter to generate the number of particles specified every step of the game thereafter.
 */
declare function part_emitter_stream(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, parttype: Id.ParticleType, number: number): undefined;
/**
 * With this function you can configure an emitter's delay before it bursts first particles when it is in a stream mode.
 */
declare function part_emitter_delay(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, delay_min: number, delay_max: number, delay_unit: Constant.TimeSourceUnits): undefined;
/**
 * With this function you can configure the interval between individual particle bursts when an emitter is in a stream mode.
 */
declare function part_emitter_interval(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, interval_min: number, interval_max: number, interval_unit: Constant.TimeSourceUnits): undefined;
/**
 * With this function you can enable relative mode for an emitter, which means that the number of particles it burst or streams becomes relative to its area.
 */
declare function part_emitter_relative(ps: Id.ParticleSystem, ind: Id.ParticleEmitter, enable: boolean): undefined;
/**
 * With this function you can clear all the particles currently created by the system from the room. It does not reset or remove the particle types themselves, just their visual representation, and if you have any object streaming particles from an emitter, these particles disappear but will begin to appear again the next step after calling this code.
 */
declare function part_particles_clear(ind: Id.ParticleSystem): undefined;
/**
 * With this function you can check to see if a particle system currently has any particles created in the room, and it will return the number of them too.
 */
declare function part_particles_count(ind: Id.ParticleSystem): number;
/**
 * This function is ideal for those effects that do not require any of the functionality offered by particle emitters (for example, to create smoke from a missile, or a simple explosion effect) as it permits you to quickly and easily create particles at any position in the game room. Note that you must have created the particle system and the particle type previously for this function to be used.
 */
declare function part_particles_create(ind: Id.ParticleSystem, x: number, y: number, parttype: Id.ParticleType, number: number): undefined;
/**
 * This function is ideal for those effects that do not require any of the functionality offered by particle emitters (for example, to create smoke from a missile, or a simple explosion effect) as it permits you to quickly and easily create particles at any position in the game room.
 */
declare function part_particles_create_colour(ind: Id.ParticleSystem, x: number, y: number, parttype: Id.ParticleType, colour: Constant.Color, number: number): undefined;
/**
 * This function allows you to burst all particles defined in a particle system asset at any position in the room.
 */
declare function part_particles_burst(ind: Id.ParticleSystem, x: number, y: number, partsys: Asset.GMParticleSystem): undefined;
/**
 * This function can be used to switch off the drawing of a particle system so that any updates done to the system (automatic or otherwise) will not be seen.
 */
declare function part_system_automatic_draw(ind: Id.ParticleSystem, automatic: boolean): undefined;
/**
 * This function controls whether GameMaker should update the particle system automatically or not, and normally you would not need to use this function as the default value of true (automatic update is on) is what you wish to happen.
 */
declare function part_system_automatic_update(ind: Id.ParticleSystem, automatic: boolean): undefined;
/**
 * With this function you can clear the indexed system to its default state, removing all emitters and resetting the depth and position (if they had been changed).
 */
declare function part_system_clear(ind: Id.ParticleSystem): undefined;
/**
 * With this function you can create a new particle system assset from an info struct.
 */
declare function particle_add(info: Record<string, unknown>): Asset.GMParticleSystem;
/**
 * With this function you can delete a particle system asset.
 */
declare function particle_delete(ind: Asset.GMParticleSystem): undefined;
/**
 * With this function you can check to see if a particle system asset with the given index exists or not.
 */
declare function particle_exists(ind: Asset.GMParticleSystem): boolean;
/**
 * This function is used to retrieve information for the given particle system asset or instance.
 */
declare function particle_get_info(partsys: Asset.GMParticleSystem | Id.ParticleSystem): Record<string, unknown>;
/**
 * This function is used to create a new particle system and will return a unique index number that should be stored and used in all further functions relating to that system. The system will be assigned a managed layer and will be set to have a depth of 0. Managed layers are not accessible to the user and used only for internal management when depth is used instead of layers. Normally you would use the function part_system_create_layer() instead of this one.
 */
declare function part_system_create(partsys?: Asset.GMParticleSystem): Id.ParticleSystem;
/**
 * This function will create a new particle system on a given layer.
 */
declare function part_system_create_layer(layer: unknown, persistent: boolean, partsys?: Asset.GMParticleSystem): Id.ParticleSystem;
/**
 * With this function you can set the draw depth for the particle system, much the same as you can set the render depth of different layers within the room, where a low draw depth means that it will appear on top of all things drawn with a higher depth, and a high draw depth placing it below everything with a lower draw depth.
 */
declare function part_system_depth(ind: Id.ParticleSystem, depth: number): undefined;
/**
 * With this function you can destroy a given particle system and remove it from memory.
 */
declare function part_system_destroy(ind: Id.ParticleSystem): undefined;
/**
 * This function will advance the given particle system one step in game time and can be used to simulate the particle system behaviour when automatic updating is off, or it can be used to advance a particle system to a specific point all in one step.
 */
declare function part_system_update(ind: Id.ParticleSystem): undefined;
/**
 * With this function you can set the order in which particles in the given particle system are drawn when created on the screen, either old to new or new to old.
 */
declare function part_system_draw_order(ind: Id.ParticleSystem, oldtonew: boolean): undefined;
/**
 * With this function you can check to see if the given particle system indexed exists in the game or not.
 */
declare function part_system_exists(ind: Id.ParticleSystem): boolean;
/**
 * This function retrieves the layer handle for the given particle system.
 */
declare function part_system_get_layer(ind: Id.ParticleSystem): Id.Layer;
/**
 * This function can be used to switch a particle system from its current layer to a new one.
 */
declare function part_system_layer(ps: Id.ParticleSystem, layer: Id.Layer | string): undefined;
/**
 * This function can be used to enable global space particles. When enabled, particles keep their position and direction when the particle system is moved or rotated. This is by default disabled.
 */
declare function part_system_global_space(ind: Id.ParticleSystem, enable: boolean): undefined;
/**
 * This function is used to retrieve information for the given particle system instance.
 */
declare function part_system_get_info(partsys: Id.ParticleSystem): Record<string, unknown>;
/**
 * This function can be used to change color and alpha with which the particle system is blended.
 */
declare function part_system_color(ind: Id.ParticleSystem, color: Constant.Color, alpha: number): undefined;
/**
 * This function can be used to change colour and alpha with which the particle system is blended.
 */
declare function part_system_colour(ind: Id.ParticleSystem, colour: Constant.Color, alpha: number): undefined;
/**
 * With this function you can set the base position for the particle system relative to the (0, 0) position of the room, meaning that all further particle functions relating to this system will now be drawn relative to the new position.
 */
declare function part_system_position(ind: Id.ParticleSystem, x: number, y: number): undefined;
/**
 * This function can be used to change the rotation of the particle system.
 */
declare function part_system_angle(ind: Id.ParticleSystem, angle: number): undefined;
/**
 * This function is used to set a particle type to have a single alpha value (transparency) for the total duration of the lifetime of each individual particle, and this can be from 0 (transparent) to 1 (opaque).
 */
declare function part_type_alpha1(ind: Id.ParticleType, alpha1: number): undefined;
/**
 * This function can be used to set an alpha value (transparency) gradient for each particle created of the given type. The first alpha is that which all particles will start with, and the second alpha is the one on with which the particle will end with, and a smooth gradient change will occur to the alpha over the particle's lifetime from one to the other. This can be from 0 (transparent) to 1 (opaque).
 */
declare function part_type_alpha2(ind: Id.ParticleType, alpha1: number, alpha2: number): undefined;
/**
 * This function can be used to set a three alpha (transparency) value gradient for each particle created of the given type. The first alpha is that which all particles will start with, and the second alpha is the one that will be blended to half way through its lifetime and the third alpha is the one with which the particle will end with. A smooth gradient change will occur through the alphas over the particle's lifetime from one to the other.
 */
declare function part_type_alpha3(ind: Id.ParticleType, alpha1: number, alpha2: number, alpha3: number): undefined;
/**
 * With this function you can make your particles be drawn with an additive blend mode (true) or not (false). Additive blending is a special blend mode that adds the luminosity values of each particle as they overlap, so that light colours will gradually get brighter (until they appear white) as they overlap, and dark colours become more and more transparent with black being almost invisible.
 */
declare function part_type_blend(ind: Id.ParticleType, additive: boolean): undefined;
/**
 * With this function you can "reset" a particle, returning all the values for each of the functions relating to the particle (life, colour, alpha, orientation, etc.) to their default values. Note that this function does not remove any particles currently visible in the room from the screen, for that you should be using part_particles_clear().
 */
declare function part_type_clear(ind: Id.ParticleType): undefined;
/**
 * This function is used to set a particle type to be a single colour for the total duration of the lifetime of each individual particle.
 */
declare function part_type_colour1(ind: Id.ParticleType, colour1: Constant.Color): undefined;
/**
 * This function can be used to set a two colour gradient for each particle created of the given type. The first colour is that which all particles will start with, and the second colour is the one on which the particle will end with, and a smooth gradient change will occur to the colour over the particle's lifetime from one colour to the other.
 */
declare function part_type_colour2(ind: Id.ParticleType, colour1: Constant.Color, colour2: Constant.Color): undefined;
/**
 * This function can be used to set a three colour gradient for each particle created of the given type. The first colour is that which all particles will start with, and the second colour is the one that will be blended to half way through its lifetime and the third colour is the one with which the particle will end with. A smooth gradient change will occur through the colours over the particle's lifetime from one colour to the other.
 */
declare function part_type_colour3(ind: Id.ParticleType, colour1: Constant.Color, colour2: Constant.Color, colour3: Constant.Color): undefined;
/**
 * With this function you can set a hue, saturation and value range for all particles of the given type. In this way you can create particles of the same hue but different saturations, or of different hues but the same value (luminosity), etc. All values must be between 0 and 255.
 */
declare function part_type_colour_hsv(ind: Id.ParticleType, hmin: number, hmax: number, smin: number, smax: number, vmin: number, vmax: number): undefined;
/**
 * With this function you can set the given particle type to be a random blend of two colours.
 */
declare function part_type_colour_mix(ind: Id.ParticleType, colour1: Constant.Color, colour2: Constant.Color): undefined;
/**
 * With this function you can set the mix of red, green and blue colours for all particles created of the given type. All values must be between 0 and 255.
 */
declare function part_type_colour_rgb(ind: Id.ParticleType, rmin: number, rmax: number, gmin: number, gmax: number, bmin: number, bmax: number): undefined;
/**
 * With this function you can create a new particle type and the return value should be stored in a variable for use in all subsequent particle functions.
 */
declare function part_type_create(): Id.ParticleType;
/**
 * This function can be used to make your particle burst another type of particle at the end of its lifetime.
 */
declare function part_type_death(ind: Id.ParticleType, death_number: number, death_type: Id.ParticleType): undefined;
/**
 * With this function you can remove the specified particle type from the game. When you use this function, all particles of the given type will disappear from the room and the particle itself is removed form memory, so this function should be used only when you no longer need the particle.
 */
declare function part_type_destroy(ind: Id.ParticleType): undefined;
/**
 * This function is used to determine the direction of the particle when it is created and can also be used to make the particle increase or decrease its direction over its lifetime.
 */
declare function part_type_direction(ind: Id.ParticleType, dir_min: number, dir_max: number, dir_incr: number, dir_wiggle: number): undefined;
/**
 * With this function you can check to see if the given particle type indexed exists in the game or not. Note that if the variable being checked is an uninitialised variable (that a particle type would otherwise have its index assigned to) this will throw an error.
 */
declare function part_type_exists(ind: Id.ParticleType): boolean;
/**
 * This function will set the gravity that is to affect each particle of the given type that is created.
 */
declare function part_type_gravity(ind: Id.ParticleType, grav_amount: number, grav_direction: number): undefined;
/**
 * This is the function that governs how long each individual particle of the indicated type remains on the screen. You provide a minimum and a maximum value (in steps)and each particle lifespan will be a random number of steps from within the specified range. To have all particles with the same lifetime, set the two values to be the same.
 */
declare function part_type_life(ind: Id.ParticleType, life_min: number, life_max: number): undefined;
/**
 * This function is used to determine the orientation of the particle sprite when it is created and can also be used to make the particle orientation increase or decrease over its lifetime. The minimum and maximum orientation values default at 0 but these values can be changed to randomise the orientation following the standard GameMaker directions of 0 degrees being right, 90 degrees being up, 180 degrees being left and 270 degrees being down. If you set them to the same value the particles will all be created with the same orientation.
 */
declare function part_type_orientation(ind: Id.ParticleType, ang_min: number, ang_max: number, ang_incr: number, ang_wiggle: number, ang_relative: boolean): undefined;
/**
 * This function will set the horizontal and vertical scale of the particle before any other size changes are made. This function works on the ratio of the sprite size, so a value of 1 (the default value) is a 1:1 ratio, meaning that 0.5 would be half and 2 double.
 */
declare function part_type_scale(ind: Id.ParticleType, xscale: number, yscale: number): undefined;
/**
 * With this function you can set the sprite shape to use for the particle type.
 */
declare function part_type_shape(ind: Id.ParticleType, shape: Constant.ParticleShape): undefined;
/**
 * This function is used to determine the size of the particle when it is created and can also be used to make the particle increase or decrease in size over its lifetime.
 */
declare function part_type_size(ind: Id.ParticleType, size_min: number, size_max: number, size_incr: number, size_wiggle: number): undefined;
/**
 * This function is used to configure particle size similarly to part_type_size(), except only for the x axis. You can use function part_type_size_y() to configure the size on the y axis separately as well.
 */
declare function part_type_size_x(ind: Id.ParticleType, size_min: number, size_max: number, size_incr: number, size_wiggle: number): undefined;
/**
 * This function is used to configure particle size similarly to part_type_size(), except only for the y axis. You can use function part_type_size_x() to configure the size on the x axis separately as well.
 */
declare function part_type_size_y(ind: Id.ParticleType, size_min: number, size_max: number, size_incr: number, size_wiggle: number): undefined;
/**
 * This function is used to set the movement speed of the particle when it is created and can also be used to make the particle increase or decrease its speed over its lifetime.
 */
declare function part_type_speed(ind: Id.ParticleType, speed_min: number, speed_max: number, speed_incr: number, speed_wiggle: number): undefined;
/**
 * This function can be used to set a particle type to use a custom sprite from the game assets. You can choose a random sub-image so that if the sprite is not animated, a different image will be chosen at random to create the sprite, or if the particle is animated it will start the animation at a random point.
 */
declare function part_type_sprite(ind: Id.ParticleType, sprite: Asset.GMSprite, animate: boolean, stretch: boolean, random: boolean): undefined;
/**
 * This function can be used to set a particle type to use a custom sub-image (frame) of a sprite. If the particle's sprite is animated, then this sub-image will be used as the starting frame of the animation.
 */
declare function part_type_subimage(ind: Id.ParticleType, subimg: number): undefined;
/**
 * This function can be used to make your particle type stream another type each step until the end of its lifetime. A negative value for the step number will emit a particle with a one in "value" chance. For example, a value of -3 will have a 1:3 chance of emitting a particle each step.
 */
declare function part_type_step(ind: Id.ParticleType, step_number: number, step_type: Id.ParticleType): undefined;
/**
 * This function starts drawing a primitive of the given type (this must be called before you can define any primitives).
 */
declare function draw_primitive_begin(kind: Constant.PrimitiveType): undefined;
/**
 * This function starts drawing a textured primitive of the given type (this must be called before you define the vertices of the textured primitive).
 */
declare function draw_primitive_begin_texture(kind: Constant.PrimitiveType, tex: Pointer.Texture | number): undefined;
/**
 * This function ends the definition of a primitive and effectively draws it.
 */
declare function draw_primitive_end(): undefined;
/**
 * This function defines the position of a vertex for a primitive.
 */
declare function draw_vertex(x: number, y: number): undefined;
/**
 * This function defines the position of a vertex for a primitive, with its own colour and alpha setting.
 */
declare function draw_vertex_colour(x: number, y: number, col: Constant.Color, alpha: number): undefined;
/**
 * This function defines the position of a textured vertex for a primitive.
 */
declare function draw_vertex_texture(x: number, y: number, xtex: number, ytex: number): undefined;
/**
 * This function defines the position of a textured vertex for a primitive.
 */
declare function draw_vertex_texture_colour(x: number, y: number, xtex: number, ytex: number, col: Constant.Color, alpha: number): undefined;
/**
 * This function will set the ARGB values for the vertex currently being defined for the custom primitive.
 */
declare function vertex_argb(buffer: Id.VertexBuffer, argb: number): undefined;
/**
 * This function starts the definition of a custom primitive.
 */
declare function vertex_begin(buffer: Id.VertexBuffer, format: Id.VertexFormat): undefined;
/**
 * If your defined vertex format takes a colour value you can use this function to add that data to the vertex being defined for the current primitive.
 */
declare function vertex_colour(buffer: Id.VertexBuffer, colour: Constant.Color, alpha: number): undefined;
/**
 * This function creates a new vertex buffer. This is a special grow buffer created by GameMaker which is pre-formatted for use when building primitives (for use with shaders, for example).
 */
declare function vertex_create_buffer(): Id.VertexBuffer;
/**
 * This function creates a new vertex buffer and sets its initial size in bytes.
 */
declare function vertex_create_buffer_ext(size: number): Id.VertexBuffer;
/**
 * As with the function vertex_create_buffer(), this function will create a new vertex buffer, only now the vertex data it stores is copied from the regular buffer that is specified as the source.
 */
declare function vertex_create_buffer_from_buffer(buffer: Id.Buffer, format: Id.VertexFormat): Id.VertexBuffer;
/**
 * As with the function vertex_create_buffer(), this function will create a new vertex buffer, only now the vertex data it stores is copied from the regular buffer that is specified as the source. Note that if the number of vertices does not match those being copied you may get corrupted vertex data.
 */
declare function vertex_create_buffer_from_buffer_ext(buffer: Id.Buffer, format: Id.VertexFormat, src_offset: number, vert_num: number): Id.VertexBuffer;
/**
 * This function updates contents of a vertex buffer using data from a regular buffer. The vertex buffer must not be frozen!
 */
declare function vertex_update_buffer_from_buffer(dest_vbuff: Id.VertexBuffer, dest_offset: number, src_buffer: Id.Buffer, src_offset?: number, src_size?: number): undefined;
/**
 * This function updates contents of a vertex buffer using contents of another vertex buffer. The vertex buffers must not be frozen!
 */
declare function vertex_update_buffer_from_vertex(dest_vbuff: Id.VertexBuffer, dest_vert: number, src_vbuff: Id.VertexBuffer, src_vert?: number, src_vert_num?: number): undefined;
/**
 * This function can be used to remove a previously created vertex buffer (see vertex_create_buffer()) from system memory.
 */
declare function vertex_delete_buffer(buffer: Id.VertexBuffer): undefined;
/**
 * With this function you end the building of the custom primitive.
 */
declare function vertex_end(buffer: Id.VertexBuffer): undefined;
/**
 * This function will add a floating point value to the vertex data. The vertex must have been formatted correctly to accept this using the vertex_format_add_custom() function.
 */
declare function vertex_float1(buffer: Id.VertexBuffer, float: number): undefined;
/**
 * This function will add two floating point values to the vertex data. The vertex must have been formatted correctly to accept this using the vertex_format_add_custom() function.
 */
declare function vertex_float2(buffer: Id.VertexBuffer, float: number, float_3: number): undefined;
/**
 * This function will add three floating point values to the vertex data. The vertex must have been formatted correctly to accept this using the vertex_format_add_custom() function.
 */
declare function vertex_float3(buffer: Id.VertexBuffer, float: number, float_3: number, float_4: number): undefined;
/**
 * This function will add four floating point values to the vertex data. The vertex must have been formatted correctly to accept this using the vertex_format_add_custom() function.
 */
declare function vertex_float4(buffer: Id.VertexBuffer, float: number, float_3: number, float_4: number, float_5: number): undefined;
/**
 * Tell GameMaker to accept colour data as part of the new vertex format being created.
 */
declare function vertex_format_add_colour(): undefined;
/**
 * This function permits you to use a custom data type for specific vertex format attributes as part of the new vertex format being created.
 */
declare function vertex_format_add_custom(type: Constant.VertexType, usage: Constant.VertexUsage): undefined;
/**
 * Tell GameMaker to accept surface normal data (nx, ny and nz) as part of the new vertex format being created.
 */
declare function vertex_format_add_normal(): undefined;
/**
 * Tell GameMaker to accept 2D positional data (x and y) as part of the new vertex format being created.
 */
declare function vertex_format_add_position(): undefined;
/**
 * Tell GameMaker to accept 3D positional data (x, y and z) as part of the new vertex format being created.
 */
declare function vertex_format_add_position_3d(): undefined;
/**
 * Tell GameMaker to accept texture position data (u and v) as part of the new vertex format being created.
 */
declare function vertex_format_add_texcoord(): undefined;
/**
 * This function starts the definition of a new vertex format.
 */
declare function vertex_format_begin(): undefined;
/**
 * This function deletes the given vertex format and must be called whenever you are finished using any created vertex formats.
 */
declare function vertex_format_delete(format_id: Id.VertexFormat): undefined;
/**
 * This function ends the vertex format that was started with vertex_format_begin() and returns it.
 */
declare function vertex_format_end(): Id.VertexFormat;
/**
 * This function is used to retrieve information for the given vertex format.
 */
declare function vertex_format_get_info(format_id: Id.VertexFormat): Struct.VertexFormatInfo;
/**
 * This function will check whether the given vertex format exists in memory or not. If it does, the function will return true, otherwise it will return false.
 */
declare function vertex_format_exists(format_id: Id.VertexFormat): boolean;
/**
 * This function can be used to "freeze" a vertex buffer. This buffer becomes read-only, meaning that if you need to change it, you would have to delete the whole buffer and re-create it. A frozen buffer can be submitted to the shader faster than a normal, dynamic buffer and is recommended for those effects that require an unchanging custom primitive for the duration of a level or the game.
 */
declare function vertex_freeze(buffer: Id.VertexBuffer): undefined;
/**
 * This function gets the size of the given vertex buffer in bytes.
 */
declare function vertex_get_buffer_size(buffer: Id.VertexBuffer): number;
/**
 * This function returns the number of vertices defined in the given vertex buffer.
 */
declare function vertex_get_number(buffer: Id.VertexBuffer): number;
/**
 * This function will add surface normal data to the vertex currently being defined for the custom primitive.
 */
declare function vertex_normal(buffer: Id.VertexBuffer, nx: number, ny: number, nz: number): undefined;
/**
 * This function will add 2D position data to the vertex currently being defined for the custom primitive.
 */
declare function vertex_position(buffer: Id.VertexBuffer, x: number, y: number): undefined;
/**
 * This function will add 3D position data to the vertex currently being defined for the custom primitive.
 */
declare function vertex_position_3d(buffer: Id.VertexBuffer, x: number, y: number, z: number): undefined;
/**
 * You can use this function to submit the contents of a vertex buffer to the graphics pipeline.
 */
declare function vertex_submit(buffer: Id.VertexBuffer, primitive: Constant.PrimitiveType, texture: Pointer.Texture | number): undefined;
/**
 * This function submits a range of vertices in the given vertex buffer to the graphics pipeline for drawing.
 */
declare function vertex_submit_ext(buffer: Id.VertexBuffer, primitive: Constant.PrimitiveType, texture: Pointer.Texture | number, offset: number, number: number): undefined;
/**
 * This function will set the texture coordinates to use for the vertex currently being defined for the custom primitive.
 */
declare function vertex_texcoord(buffer: Id.VertexBuffer, u: number, v: number): undefined;
/**
 * This function will add four unsigned byte values (0 - 255) to the vertex data.
 */
declare function vertex_ubyte4(buffer: Id.VertexBuffer, byte: number, byte_3: number, byte_4: number, byte_5: number): undefined;
/**
 * This function will check whether the given buffer exists in memory or not. If it does, the function will return true, otherwise it will return false.
 */
declare function vertex_buffer_exists(buffer: Id.VertexBuffer): boolean;
/**
 * With this function you can enable or disable anti-aliasing (AA) for SWF format vector sprites.
 */
declare function draw_enable_swf_aa(enable: boolean): undefined;
/**
 * This function can be used to get the anti-aliasing (AA) level for SWF format vector sprites.
 */
declare function draw_get_swf_aa_level(): number;
/**
 * This function draws the sprite assigned to the instance exactly as it would be drawn if the draw event held no code or actions, and will reflect and changes that have been made to the sprite variables in other events.
 */
declare function draw_self(): undefined;
/**
 * This function can be used to set the anti-aliasing (AA) level for SWF format vector sprites. This can be a real value from 0 to 1 and will "smooth" the edges of these sprites. Note that to see this effect, you must first have enabled AA using the function draw_enable_swf_aa().
 */
declare function draw_set_swf_aa_level(aa: number): undefined;
/**
 * With this function you can enable or disable anti-aliasing (AA) for SVG format vector sprites. AA simply smooths the edges of vector images to give them a nicer look. The amount of AA used will depend on the value set using the function draw_set_svg_aa_level(). By default this is disabled.
 */
declare function draw_enable_svg_aa(enable: boolean): undefined;
/**
 * This function can be used to get the anti-aliasing (AA) level for SVG format vector sprites. The return value will between 0 and 1 and shows how "smooth" the edges of these sprites will be drawn. You can set the AA level using the function draw_set_svg_aa_level().
 */
declare function draw_get_svg_aa_level(): number;
/**
 * This function can be used to set the anti-aliasing (AA) level for SVG format vector sprites. This can be a real value from 0 to 1 and will "smooth" the edges of these sprites. Note that to see this effect, you must first have enabled AA using the function draw_enable_svg_aa().
 */
declare function draw_set_svg_aa_level(aa: number): undefined;
/**
 * This function can be used to set the maximum size of the cache used to accelerate the drawing of SWF and SVG format vector sprites. This can be a value of 0 or greater. A value of 0 will disable the cache. Changing this value will reset the return value of vector_sprite_get_cache_max_used().
 */
declare function vector_sprite_cache_limit(limit: number): undefined;
/**
 * This function sets what fraction of the SWF and SVG vector sprite cache is attempted to be cleared each frame. This can be a value between 0.0 and 1.0 (a value of 0.0 will disabled automatic pruning). This will only attempt to clear cache entries that are older than the number of frames specified by vector_sprite_cache_prune_age().
 */
declare function vector_sprite_cache_prune_fraction(fraction: number): undefined;
/**
 * This function sets how long entries in the SWF and SVG vector sprite cache must not have been used for before being deleted by the automatic pruning logic. This value is measured in frames and should be 0 or greater.
 */
declare function vector_sprite_cache_prune_age(frames: number): undefined;
/**
 * This function returns the current maximum size of the SWF and SVG vector sprite cache.
 */
declare function vector_sprite_cache_get_limit(): number;
/**
 * This function returns the fraction of the SWF and SVG vector sprite cache that is attempted to be cleared each frame.
 */
declare function vector_sprite_cache_get_prune_fraction(): number;
/**
 * This function returns the number of frames an entry in the SWF and SVG vector sprite cache can exist without being used before it is considered for deletion.
 */
declare function vector_sprite_cache_get_prune_age(): number;
/**
 * This function returns the current amount of memory used by the SWF and SVG vector sprite cache.
 */
declare function vector_sprite_cache_get_used(): number;
/**
 * This function returns the maximum amount of memory which has been used by the SWF and SVG vector sprite cache. This value is reset if the cache size is changed by vector_sprite_get_cache_limit().
 */
declare function vector_sprite_cache_get_max_used(): number;
/**
 * This function returns how long ago the oldest entry in the SWF and SVG vector sprite cache was last used. This can be useful for determining if the cache is set to an appropriate size.
 */
declare function vector_sprite_cache_get_oldest_entry_age(): number;
/**
 * This function draws the given sprite and sub-image at a position within the game room.
 */
declare function draw_sprite(sprite: Asset.GMSprite, subimg: number, x: number, y: number): undefined;
/**
 * This function will draw the given sprite as in the function draw_sprite() but with additional options to change the scale, blending, rotation and alpha of the sprite being drawn.
 */
declare function draw_sprite_ext(sprite: Asset.GMSprite, subimg: number, x: number, y: number, xscale: number, yscale: number, rot: number, colour: Constant.Color, alpha: number): undefined;
/**
 * This function combines the function draw_sprite_ext() with the function draw_sprite_part(), adding in some additional blending options so that each corner of the final sprite part can be blended with an individual colour.
 */
declare function draw_sprite_general(sprite: Asset.GMSprite, subimg: number, left: number, top: number, width: number, height: number, x: number, y: number, xscale: number, yscale: number, rot: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * With this function you can draw part of any sprite at a given position within the room.
 */
declare function draw_sprite_part(sprite: Asset.GMSprite, subimg: number, left: number, top: number, width: number, height: number, x: number, y: number): undefined;
/**
 * This function will draw a part of the chosen sprite at the given position following the same rules as per draw_sprite_part(), only now you can scale the part, blend a colour with it, or change its alpha when drawing it to the screen (the same as when drawing a sprite with draw_sprite_ext()).
 */
declare function draw_sprite_part_ext(sprite: Asset.GMSprite, subimg: number, left: number, top: number, width: number, height: number, x: number, y: number, xscale: number, yscale: number, colour: Constant.Color, alpha: number): undefined;
/**
 * With this function you can draw a sprite distorted over the area defined by the four corner coordinates.
 */
declare function draw_sprite_pos(sprite: Asset.GMSprite, subimg: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, alpha: number): undefined;
/**
 * This function takes a sprite asset and stretches it over the given width and height so that it occupies that area.
 */
declare function draw_sprite_stretched(sprite: Asset.GMSprite, subimg: number, x: number, y: number, w: number, h: number): undefined;
/**
 * This function does exactly the same as the draw_sprite_stretched() function with the added ability to set the colour blending and alpha value for the sprite when it is drawn (similar to the function draw_sprite_ext()).
 */
declare function draw_sprite_stretched_ext(sprite: Asset.GMSprite, subimg: number, x: number, y: number, w: number, h: number, colour: Constant.Color, alpha: number): undefined;
/**
 * This function will take a sprite and then repeatedly tile it across the whole view (or room if no view is defined), starting from the coordinates that you give in the function. Tiling is based on the width and height of the sprite as defined by the sprite variables of the instance running the code. This function is for 2D (orthographic) projections only, and will not work correctly when a 3D camera projection is used.
 */
declare function draw_sprite_tiled(sprite: Asset.GMSprite, subimg: number, x: number, y: number): undefined;
/**
 * This function will take a sprite and then repeatedly tile it across the whole view (or room if no view is defined), starting from the coordinates that you give in the function and with each tile scaled, colour blended and with the alpha that you define (these properties are the same as those used in draw_sprite_ext()). This function is for 2D (orthographic) projections only, and will not work correctly when a 3D camera projection is used.
 */
declare function draw_sprite_tiled_ext(sprite: Asset.GMSprite, subimg: number, x: number, y: number, xscale: number, yscale: number, colour: Constant.Color, alpha: number): undefined;
/**
 * With this function you can draw any given tile from a tile set - complete with rotations, flips and mirrors - setting the frame (if animated) and the position within the room.
 */
declare function draw_tile(tileset: Asset.GMTileSet, tiledata: number, frame: number, x: number, y: number): number;
/**
 * This function can be used to draw a given tilemap anywhere in the room.
 */
declare function draw_tilemap(tilemap_element_id: Id.TileMapElement, x: number, y: number): undefined;
/**
 * This function returns the position of the application surface in an array with four elements, where elements 0 and 1 are the (x, y) position of the top left-hand corner of the surface, and elements 2 and 3 are the x and y of the bottom right-hand corner of the surface, all relative to the size of the display or window.
 */
declare function application_get_position(): Array<number>;
/**
 * This function enables or disables the automatic drawing of the application surface.
 */
declare function application_surface_draw_enable(flag: boolean): undefined;
/**
 * This function enables or disables the application surface.
 */
declare function application_surface_enable(enable: boolean): undefined;
/**
 * This function will return true if the application surface is being used for drawing, or false if the screen buffer is being used.
 */
declare function application_surface_is_enabled(): boolean;
/**
 * This function will return true if the automatic draw of the application surface is enabled.
 */
declare function application_surface_is_draw_enabled(): boolean;
/**
 * With this function you can open a video from the specified path or url.
 */
declare function video_open(path: string): undefined;
/**
 * This function is used to close the video file and free up any memory associated with it.
 */
declare function video_close(): undefined;
/**
 * This function will set the volume for any video that you play.
 */
declare function video_set_volume(volume: number): undefined;
/**
 * This function will draw the currently selected video to surfaces which will then be used to draw the video.
 */
declare function video_draw(): Array<number>;
/**
 * This function will pause the video.
 */
declare function video_pause(): undefined;
/**
 * This function will resume the video.
 */
declare function video_resume(): undefined;
/**
 * This function will enable or disable the loop.
 */
declare function video_enable_loop(enable: boolean): undefined;
/**
 * This function will move the position of the video in milliseconds.
 */
declare function video_seek_to(milliseconds: number): undefined;
/**
 * This function will return the duration of video in milliseconds.
 */
declare function video_get_duration(): number;
/**
 * This function will return the position of video in milliseconds.
 */
declare function video_get_position(): number;
/**
 * This function will return the status of the video.
 */
declare function video_get_status(): Constant.VideoStatus;
/**
 * This function will return the format of the surface.
 */
declare function video_get_format(): Constant.VideoFormat;
/**
 * This function will return true if loop is enabled.
 */
declare function video_is_looping(): boolean;
/**
 * This function will return the volume of the video as a value between 0 and 1.
 */
declare function video_get_volume(): number;
/**
 * With this function you can draw a surface at a given position within the room, with the top-left corner of the image being drawn at the specified x/y position.
 */
declare function draw_surface(id: Id.Surface, x: number, y: number): undefined;
/**
 * This function will draw the given surface as in the function draw_surface() but with additional options to change the scale, blending, rotation and alpha of the surface being drawn.
 */
declare function draw_surface_ext(id: Id.Surface, x: number, y: number, xscale: number, yscale: number, rot: number, col: Constant.Color, alpha: number): undefined;
/**
 * This function combines the function draw_surface_ext() with the function draw_surface_part(), adding in some additional blending options so that each corner of the final surface part can be blended with an individual colour.
 */
declare function draw_surface_general(id: Id.Surface, left: number, top: number, w: number, h: number, x: number, y: number, xscale: number, yscale: number, rot: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * With this function you can draw part of any surface at a given position within the room. As with draw_surface() you can specify a surface, but you then need to specify the relative coordinates within the surface of an area to select for drawing. This means that a left position of 0 and a top position of 0 would be the top left corner of the surface and all further coordinates should be taken from that position.
 */
declare function draw_surface_part(id: Id.Surface, left: number, top: number, w: number, h: number, x: number, y: number): undefined;
/**
 * This function will draw a part of the chosen surface at the given position following the same rules as per draw_surface_part(), only now you can scale the part, blend a colour with it, or change its alpha when drawing it to the screen (the same as when drawing a surface with draw_surface_ext()).
 */
declare function draw_surface_part_ext(id: Id.Surface, left: number, top: number, w: number, h: number, x: number, y: number, xscale: number, yscale: number, colour: Constant.Color, alpha: number): undefined;
/**
 * This function simply takes a surface and stretches it over the given width and height so that it occupies the area. As with draw_surface() you can specify a surface and then the x / y position in the room for the surface to be drawn at and finally a width and a height (which must be pixel values).
 */
declare function draw_surface_stretched(id: Id.Surface, x: number, y: number, w: number, h: number): undefined;
/**
 * This function does exactly the same as the draw_surface_stretched() function with the added ability to set the colour blending and alpha value for the surface when it is drawn (similar to the function draw_surface_ext()).
 */
declare function draw_surface_stretched_ext(id: Id.Surface, x: number, y: number, w: number, h: number, colour: Constant.Color, alpha: number): undefined;
/**
 * This function will take a surface and then repeatedly tile it across the whole room, starting from the coordinates that you give in the function.
 */
declare function draw_surface_tiled(id: Id.Surface, x: number, y: number): undefined;
/**
 * This function will take a surface and then repeatedly tile it across the whole room, starting from the coordinates that you give in the function and with each tile scaled, colour blended and with the alpha that you define (these properties are the same as those used in draw_surface_ext()).
 */
declare function draw_surface_tiled_ext(id: Id.Surface, x: number, y: number, xscale: number, yscale: number, col: Constant.Color, alpha: number): undefined;
/**
 * This function takes the image from one surface and copies it onto another one at the specified local position within that surface (where the (0, 0) position is the top left corner of the destination surface). If the destination surface already has information this will be overwritten by the copy, and the function does not change the source surface in any way.
 */
declare function surface_copy(destination: Id.Surface, x: number, y: number, source: Id.Surface): undefined;
/**
 * This function takes the image from one surface and copies part of it onto another one at the specified local position within that surface (where the (0, 0) position is the top left corner of the destination surface). You can specify a local x and y position to copy from as well as the width and height of the section. Please note that these are coordinates based on the surface size and not on the position at which the surface is being drawn in the room. If the destination surface already has information this will be overwritten by the copy, and the function does not change the source surface in any way.
 */
declare function surface_copy_part(destination: Id.Surface, x: number, y: number, source: Id.Surface, xs: number, ys: number, ws: number, hs: number): undefined;
/**
 * This function creates a new surface and returns it.
 */
declare function surface_create(w: number, h: number, format?: Constant.SurfaceFormatType): Id.Surface;
/**
 * This function allows you to attach a surface to a canvas element that already exists in your web page, meaning that you can effectively split up portions of your game to be drawn at various different places within the page.
 */
declare function surface_create_ext(name: string, w: number, h: number): Id.Surface;
/**
 * This function is used to test whether the specified surface format is supported on the current platform.
 */
declare function surface_format_is_supported(format?: Constant.SurfaceFormatType): boolean;
/**
 * This function disables the automatic depth buffer generation for all surfaces that are created after it has been disabled. Normally all surfaces have depth buffers so if you draw 3D objects to them then it'll sort them properly by depth in order to maintain functional parity between rendering to surfaces and rendering to the back buffer. Note that for 2D games they aren't generally required.
 */
declare function surface_depth_disable(disable: boolean): undefined;
/**
 * This function checks if a surface exists.
 */
declare function surface_exists(surface_id: Id.Surface): boolean;
/**
 * When you are working with surfaces, you should always use this function whenever you are finished using them.
 */
declare function surface_free(surface_id: Id.Surface): undefined;
/**
 * This function can be used to get the colour of a specific pixel from a surface, using the local coordinates of the surface where (0, 0) is the top-left corner.
 */
declare function surface_getpixel(surface_id: Id.Surface, x: number, y: number): number;
/**
 * With this function you can get the full ABGR 32bit value of any pixel of a (previously created) surface.
 */
declare function surface_getpixel_ext(surface_id: Id.Surface, x: number, y: number): number;
/**
 * This function checks to see if the automatic depth buffer generation for surfaces is enabled.
 */
declare function surface_get_depth_disable(): boolean;
/**
 * This function simply returns the height, in pixels, of the given surface.
 */
declare function surface_get_height(surface_id: Id.Surface): number;
/**
 * This function gets the surface that's currently set as the drawing target.
 */
declare function surface_get_target(): Id.Surface;
/**
 * This function can be used to retrieve the ID of the surface whose depth buffer is set as the current one.
 */
declare function surface_get_target_depth(): Id.Surface;
/**
 * This function will retrieve the surface ID assigned to one of the 4 render targets available to surfaces.
 */
declare function surface_get_target_ext(index: number): Id.Surface;
/**
 * This function returns the texture for the surface's texture page. This value can then be used in other draw functions, particularly in general 3D and some of the 2D primitive functions.
 */
declare function surface_get_texture(surface_id: Id.Surface): Pointer.Texture;
/**
 * This function returns the depth texture of the given surface or -1 if no depth texture exists.
 */
declare function surface_get_texture_depth(surface_id: Id.Surface): Pointer.Texture;
/**
 * This function returns the width, in pixels, of the indexed surface.
 */
declare function surface_get_width(surface_id: Id.Surface): number;
/**
 * This function returns whether the given surface has a depth buffer (and by relation, a stencil buffer, as depth buffer creation needs to be enabled for stencil buffers to also be created).
 */
declare function surface_has_depth(surface_id: Id.Surface): boolean;
/**
 * This function resets all further drawing from the current surface back to the previous draw target.
 */
declare function surface_reset_target(): undefined;
/**
 * This function will resize a surface to the given dimensions (in pixels).
 */
declare function surface_resize(surface_id: Id.Surface, w: number, h: number): undefined;
/**
 * This function will save a surface to disc using the given filename, or to a buffer. The surface must be saved as a *.png format file.
 */
declare function surface_save(surface_id: Id.Surface, fname: string | Id.Buffer): undefined;
/**
 * This function will save a part of a surface to disc using the given filename, or to a buffer. The surface must be saved as a *.png format file, and the (x, y) position must be given as local coordinates to the surface, bearing in mind that the top-left corner of the surface is always (0, 0).
 */
declare function surface_save_part(surface_id: Id.Surface, fname: string | Id.Buffer, x: number, y: number, width: number, height: number): undefined;
/**
 * This function sets all further drawing to the target surface rather than the screen. In this way you can tell GameMaker to only draw specific things to the specified surface.
 */
declare function surface_set_target(surface_id: Id.Surface, depth_id?: Id.Surface): boolean;
/**
 * This function is for use with the Shader Functions and sets the MRT (0 - 3) for native level shaders (DX9, DX11, OpenGL).
 */
declare function surface_set_target_ext(index: number, surface_id: Id.Surface): boolean;
/**
 * This function will get the font currently assigned for drawing text, or an invalid handle (-1) if no font is set.
 */
declare function draw_get_font(): Asset.GMFont;
/**
 * This function is used to get the text alignment setting along the horizontal axis.
 */
declare function draw_get_halign(): Constant.HAlign;
/**
 * This function is used to get the text alignment setting along the vertical axis.
 */
declare function draw_get_valign(): Constant.VAlign;
/**
 * This simple function will draw the current list of internally stored high scores using the currently set font, colour and alpha values within the specified rectangle.
 */
declare function draw_highscore(x1: number, y1: number, x2: number, y2: number): undefined;
/**
 * This function will set the font to be used for all further text drawing.
 */
declare function draw_set_font(font: Asset.GMFont): undefined;
/**
 * This function is used to align text along the horizontal axis and changing the horizontal alignment will change the position and direction in which all further text is drawn with the default value being fa_left.
 */
declare function draw_set_halign(halign: Constant.HAlign): undefined;
/**
 * This function is used to align text along the vertical axis and changing the vertical alignment will change the position and direction in which all further text is drawn, with the default value being fa_top.
 */
declare function draw_set_valign(valign: Constant.VAlign): undefined;
/**
 * With this function you can draw any string at any position within the room (for drawing real numbers you should use the string() function to convert them into text).
 */
declare function draw_text(x: number, y: number, string: unknown): undefined;
/**
 * This function will draw text in a similar way to draw_text(), only now you can choose the colours to use for colouring the text as well as the alpha value, and these new values will be used instead of the base drawing colour and alpha.
 */
declare function draw_text_colour(x: number, y: number, string: unknown, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * This function will draw text in a similar way to draw_text(), only now you can set the space between each line of text - should the text occupy more than one line - and limit the width (in pixels) of the string per line so that should any line exceed this value, GameMaker will automatically split the text to the next line at the nearest available white-space (if the text has no white-spaces then it will overrun this maximum width value).
 */
declare function draw_text_ext(x: number, y: number, string: unknown, sep: number, w: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_ext() and draw_text_colour() functions, permitting you to define gradient colours for text as well as the line spacing and maximum width per line all together.
 */
declare function draw_text_ext_colour(x: number, y: number, string: unknown, sep: number, w: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_ext() and draw_text_transformed() functions, permitting you to scale and rotate text while maintaining a specific line spacing and maximum width per line.
 */
declare function draw_text_ext_transformed(x: number, y: number, string: unknown, sep: number, w: number, xscale: number, yscale: number, angle: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_ext(), draw_text_transformed() and draw_text_colour() functions.
 */
declare function draw_text_ext_transformed_colour(x: number, y: number, string: unknown, sep: number, w: number, xscale: number, yscale: number, angle: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * This function will draw text in a similar way to draw_text(), only now you can choose to scale the text along the horizontal or vertical axis (effectively stretching or shrinking it) and also have GameMaker draw it at an angle (where 0 is normal and every degree over 0 rotates the text anti-clockwise).
 */
declare function draw_text_transformed(x: number, y: number, string: unknown, xscale: number, yscale: number, angle: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_transformed() and draw_text_colour() functions, permitting you to scale and rotate text as well as colour it with a gradient fill and change its alpha value, ignoring the base alpha and colour settings for drawing.
 */
declare function draw_text_transformed_colour(x: number, y: number, string: unknown, xscale: number, yscale: number, angle: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * With this function you can remove all textures from video memory, and they will then be reloaded on first use.
 */
declare function draw_texture_flush(): undefined;
/**
 * With this function you can retrieve the font index of each of the fonts assigned to texture pages within the given texture group.
 */
declare function texturegroup_get_fonts(tex: string): Array<Asset.GMFont>;
/**
 * With this function you can retrieve the sprite index of each of the sprites assigned to texture pages within the given texture group.
 */
declare function texturegroup_get_sprites(tex: string): Array<Asset.GMSprite>;
/**
 * This function can be used to retrieve the texture page IDs of the individual pages that make up a texture group.
 */
declare function texturegroup_get_textures(tex_id: string): Array<Id.Texture>;
/**
 * With this function you can retrieve the tileset index of each of the tilesets assigned to texture pages within the given texture group.
 */
declare function texturegroup_get_tilesets(tex: string): Array<Asset.GMTileSet>;
/**
 * With this function you can retrieve the names of all the texturegroups contained in the game.
 */
declare function texturegroup_get_names(): Array<string>;
/**
 * With this function you can load all the pages for the specified texture group.
 */
declare function texturegroup_load(groupname: string, prefetch?: boolean): undefined;
/**
 * Add a new texturegroup with name `groupname` that contains either single image file or an array of image files (the image files are any of the formats that `sprite_add` can accept). Assets will be created based on the description in the struct (or json string) in the last parameter. Buffers can be used in place of filenames, any buffer used should NOT be deleted until the texturegroup is deleted, the user is responsibile for deleting them after that.
 */
declare function texturegroup_add(groupname: string, filename_or_buffer_or_array: string | unknown[], struct_or_json: string | Record<string, unknown>): undefined;
/**
 * Deletes a texturegroup with name `groupname`, only texturegroups created with texturegroup_add can be deleted.
 */
declare function texturegroup_delete(groupname: string): boolean;
/**
 * With this function you can unload all pages in the specified texture group.
 */
declare function texturegroup_unload(groupname: string): undefined;
/**
 * With this function you can retrieve the load status of the specified texture group.
 */
declare function texturegroup_get_status(groupname: string): number;
/**
 * With this function you can configure how texture group loading is handled as well as set debug options
 */
declare function texturegroup_set_mode(explicit: boolean, debug?: boolean, default_sprite?: Asset.GMSprite): undefined;
/**
 * With this function you can see whether a texture group with the specified name exists.
 */
declare function texturegroup_exists(groupname: string): boolean;
/**
 * This function can be used to enable or disable texture debug messages.
 */
declare function texture_debug_messages(enable: boolean): undefined;
/**
 * This function can be used to "flush" a texture page or a group of texture pages, i.e.: remove them from VRAM when no longer required.
 */
declare function texture_flush(tex_id: unknown): undefined;
/**
 * Returns the height of the texture with the given id, which is always a value within the range 0 - 1.
 */
declare function texture_get_height(tex: Pointer.Texture | number): number;
/**
 * This function returns the height of a single texel from the texture page of the image asset used.
 */
declare function texture_get_texel_height(tex: Pointer.Texture | number): number;
/**
 * This function returns the width of a single texel from the texture page of the image asset used.
 */
declare function texture_get_texel_width(tex: Pointer.Texture | number): number;
/**
 * This function returns a 1D array with 4 elements representing the UV coordinates for the image on the texture page.
 */
declare function texture_get_uvs(texid: Pointer.Texture | number): Array<number>;
/**
 * Returns the width of the texture with the given id, which is always a value within the range 0 - 1.
 */
declare function texture_get_width(tex: Pointer.Texture | number): number;
/**
 * This function allows you to control the scaling of the texture pages on load from the WAD file that is part of your final game executable.
 */
declare function texture_global_scale(pow2integer: number): undefined;
/**
 * This function can be used to check if a specific texture page has been unpacked and is ready for use, or if a group of texture pages have been unpacked and are ready for use.
 */
declare function texture_is_ready(tex_id: unknown): boolean;
/**
 * This function can be used to "prefetch" a texture page or a group of texture pages, i.e.: load them into VRAM when required.
 */
declare function texture_prefetch(tex_id: unknown): undefined;
/**
 * This function will set the given stage "slot" a texture to be used.
 */
declare function texture_set_stage(stage: Id.Sampler, tex: Pointer.Texture | number): undefined;
/**
 * Closes a previously opened binary file.
 */
declare function file_bin_close(binfile: Id.BinaryFile): undefined;
/**
 * This function will open the binary file with the indicated name.
 */
declare function file_bin_open(fname: string, mode: number): Id.BinaryFile;
/**
 * This function will return the current position in bytes of the file with the given file id, where 0 is the first position..
 */
declare function file_bin_position(binfile: Id.BinaryFile): number;
/**
 * This function will return a byte of data from the current position within the file with the given file ID.
 */
declare function file_bin_read_byte(binfile: Id.BinaryFile): number;
/**
 * This function takes the filename handle as returned by the function file_bin_open() and then rewrites the file, clearing it of all previous data to start writing from the beginning of the file.
 */
declare function file_bin_rewrite(binfile: Id.BinaryFile): undefined;
/**
 * This function moves the current read position within the file to the indicated position.
 */
declare function file_bin_seek(binfile: Id.BinaryFile, pos: number): undefined;
/**
 * This function will return the size (in bytes) of a file that has been opened for reading and/or writing.
 */
declare function file_bin_size(binfile: Id.BinaryFile): number;
/**
 * This function will write a byte of data to the file identified by the file ID at the current write position.
 */
declare function file_bin_write_byte(binfile: Id.BinaryFile, byte: number): number;
/**
 * This function will convert a string encoded previously using base64 format into standard text.
 */
declare function base64_decode(string: string): string;
/**
 * This function will convert a string into a base64 format encoded string.
 */
declare function base64_encode(string: string): string;
/**
 * This function decodes a JSON string and converts it into a DS Map, ready for use in GameMaker.
 */
declare function json_decode(string: string): unknown;
/**
 * This function takes an existing DS Map and encodes its contents as a JSON string.
 */
declare function json_encode(map: Id.DsMap, prettify?: boolean): string;
/**
 * This function can be used to parse a JSON string (either previously created using json_stringify() or from any other valid source), and convert it into a collection of arrays or structs, where an array is the equivalent of a JSON array and a struct is the equivalent of a JSON object.
 */
declare function json_parse(json: string, filter?: GMLFunction, inhibit_string_convert?: boolean): unknown;
/**
 * With this function you can convert single or nested structs and arrays into a valid JSON string.
 */
declare function json_stringify(val: unknown, prettify?: boolean, filter?: GMLFunction): string;
/**
 * This function will load a CSV format file and convert it into a DS grid, returning the unique ID value for the grid created.
 */
declare function load_csv(filename: string): Id.DsGrid;
/**
 * This function generates a unique MD5 hash for the given file which can be stored for later use.
 */
declare function md5_file(filename: string): string;
/**
 * This function will take an input Unicode string (which is 16bits for each character) and return the 32-character hexadecimal MD5 hash that is unique to that string.
 */
declare function md5_string_unicode(string: string): string;
/**
 * This function will take an input UTF-8 string (which has a variable number of bytes per character) and return the 32-character hexadecimal MD5 hash that is unique to that string.
 */
declare function md5_string_utf8(string: string): string;
/**
 * This function will take an input file and return a 160 bit hash value in ASCII format unique to that file to be used for integrity verification at any later date.
 */
declare function sha1_file(filename: string): string;
/**
 * This function will take an input Unicode string and returns a 160 bit hash value in ASCII format.
 */
declare function sha1_string_unicode(string: string): string;
/**
 * This function will take an input UTF-8 string (which has a variable number of bytes per character) and returns a 160 bit hash value in ASCII format.
 */
declare function sha1_string_utf8(string: string): string;
/**
 * This function will open a stored zip file and extract its contents to the given directory.
 */
declare function zip_unzip(zip_file: string, target_directory: string): number;
/**
 * This function will open a stored zip file and extract its contents to the given directory asynchronously.
 */
declare function zip_unzip_async(zip_file: string, target_directory: string): number;
/**
 * This function will create a new zip object which files can be added to.
 */
declare function zip_create(): Struct.Zip;
/**
 * This function will add a reference to the specified source file with the desired destination path in the specified zip file.
 */
declare function zip_add_file(zip_object: Struct.Zip, dest: string, src: string): number;
/**
 * This function will save a zip object to the specified path.
 */
declare function zip_save(zip_object?: Struct.Zip, path?: string): number;
/**
 * This function will create a directory with the given name in the save area.
 */
declare function directory_create(dname: string): boolean;
/**
 * This function will remove a directory with the given name in the save area.
 */
declare function directory_destroy(dname: string): undefined;
/**
 * This function will return true if the indicated directory exists or false if it does not.
 */
declare function directory_exists(dname: string): boolean;
/**
 * This function returns the indicated file name with the extension (including the dot) changed to the new extension.
 */
declare function filename_change_ext(fname: string, newext: string): string;
/**
 * This function returns the directory part of the indicated file name, which normally is the same as the path except for the final backslash.
 */
declare function filename_dir(fname: string): string;
/**
 * This function returns the drive information of the filename.
 */
declare function filename_drive(fname: string): string;
/**
 * This function returns the extension part of the indicated file name, including the leading dot.
 */
declare function filename_ext(fname: string): string;
/**
 * This function returns the name part of the indicated file, with the extension but without the path.
 */
declare function filename_name(fname: string): string;
/**
 * This function returns the path part of the indicated file path, including the final backslash.
 */
declare function filename_path(fname: unknown): string;
/**
 * You can use this function to check if the given file has all the attributes that you specify.
 */
declare function file_attributes(fname: string, attr: Constant.FileAttribute): boolean;
/**
 * This function will copy the specified file, giving it the new name that you choose.
 */
declare function file_copy(fname: string, newname: string): number;
/**
 * This function will delete the specified file from the system.
 */
declare function file_delete(fname: string): boolean;
/**
 * This function will return true if the specified file exists and false if it does not.
 */
declare function file_exists(fname: string): boolean;
/**
 * This function must be called after handling files opened using file_find_first() and file_find_next() functions to free memory.
 */
declare function file_find_close(): undefined;
/**
 * This function returns the name of the first file that satisfies the mask and attributes, or an empty string if no such file exists.
 */
declare function file_find_first(mask: string, attr: Constant.FileAttribute): string;
/**
 * This function returns the name of the next file that satisfies the previously given mask and the attributes (defined by file_find_first), or an empty string if no such file exists.
 */
declare function file_find_next(): string;
/**
 * This function will rename the specified file with the specified name.
 */
declare function file_rename(oldname: string, newname: string): boolean;
/**
 * This function opens a dialogue and asks the player for a filename to open with the given filter.
 */
declare function get_open_filename(filter: string, fname: string): string;
/**
 * This function opens a dialogue and asks the player for a filename to open with the given filter.
 */
declare function get_open_filename_ext(filter: string, fname: string, directory: string, caption: string): string;
/**
 * This function opens a dialogue and asks the player for a filename to save to with the given filter.
 */
declare function get_save_filename(filter: string, fname: string): string;
/**
 * This function opens a dialogue and asks the player for a filename to save to with the given filter.
 */
declare function get_save_filename_ext(filter: string, fname: string, directory: string, caption: string): string;
/**
 * This function should be called the moment you are finished reading or writing to any open ini file.
 */
declare function ini_close(): string;
/**
 * With this function you can remove the selected key (and its corresponding value) from an ini file.
 */
declare function ini_key_delete(section: string, key: string): undefined;
/**
 * This function checks to see if a key exists in the currently open ini and will return true if it does or false otherwise.
 */
declare function ini_key_exists(section: string, key: string): boolean;
/**
 * This function opens a new INI file for reading/writing, closing the currently open INI file if there is any.
 */
declare function ini_open(name: string): undefined;
/**
 * This function will create an ini file from a string and open it for reading/writing.
 */
declare function ini_open_from_string(string: string): undefined;
/**
 * You can use this function to read a number from an ini data file.
 */
declare function ini_read_real(section: string, key: string, default_: number): number;
/**
 * You can use this function to read a string (text) from an ini data file.
 */
declare function ini_read_string(section: string, key: string, default_: string): string;
/**
 * With this function you can delete a whole section of an ini file, which will also remove all key-value pairs that are associated with it.
 */
declare function ini_section_delete(section: string): undefined;
/**
 * This function checks to see if a section exists in the currently open ini and will return true if it does or false otherwise.
 */
declare function ini_section_exists(section: string): boolean;
/**
 * You can use this function to write a value (numeric) to an ini data file.
 */
declare function ini_write_real(section: string, key: string, value: number): undefined;
/**
 * You can use this function to write a string (text) to an ini data file.
 */
declare function ini_write_string(section: string, key: string, value: string): undefined;
/**
 * Once you have finished working with a given file (whether reading from it or writing to it), you must close the file again using this function, or else you risk losing the information contained within.
 */
declare function file_text_close(fileid: Id.TextFile): undefined;
/**
 * This function returns true when the end of a given opened text file has been reached or false if not.
 */
declare function file_text_eof(fileid: Id.TextFile): boolean;
/**
 * With this function you can get GameMaker to check the currently opened file to see if the line being read has finished.
 */
declare function file_text_eoln(fileid: Id.TextFile): boolean;
/**
 * This function opens the text file with the indicated filename for writing (if the file does not exist, it is created), returning the unique id of the file that which should be stored in a variable as it will be used for all further actions to do with that file.
 */
declare function file_text_open_append(fname: string): Id.TextFile;
/**
 * This function will create a text file from a string and open it for reading, returning the file "handle" that should be used in all further file function calls to read from this file.
 */
declare function file_text_open_from_string(string: string): Id.TextFile;
/**
 * This function opens the text file with the indicated filename for reading only, returning the unique id of the file that which should be stored in a variable as it will be used for all further actions to do with that file. If the file does not exists then the function will return the value -1.
 */
declare function file_text_open_read(fname: string): Id.TextFile;
/**
 * This function opens the text file with the indicated filename for writing only (if the file does not exist, it is created), returning the unique id of the file that which should be stored in a variable as it will be used for all further actions to do with that file. Note that if the file can't be created (because of an illegal filename, for example) the function will return -1.
 */
declare function file_text_open_write(fname: string): Id.TextFile;
/**
 * With this function you can skip the remainder of the current line from a given opened text file and move to the start of the next one. The function will also return the full line as a string, making it an easy way to read complete "chunks" of data for parsing later.
 */
declare function file_text_readln(fileid: Id.TextFile): string;
/**
 * With this function you can read a real number value from a text file and the function returns that value to be used or stored in a variable.
 */
declare function file_text_read_real(fileid: Id.TextFile): number;
/**
 * With this function you can read a string from a text file and the function returns that value to be used or stored in a variable.
 */
declare function file_text_read_string(fileid: Id.TextFile): string;
/**
 * With this function you can write a new line to an opened text file. In this way you can skip lines or write information on a line by line basis.
 */
declare function file_text_writeln(fileid: Id.TextFile): number;
/**
 * With this function you can write a number to the previously opened text file. Note that as the value to be written can be a real number, all decimals will be written with a "." point as separator.
 */
declare function file_text_write_real(fileid: Id.TextFile, val: number): number;
/**
 * With this function you can write a string to a previously opened text file.
 */
declare function file_text_write_string(fileid: Id.TextFile, str: string): number;
/**
 * This function returns a value between -1 and 1 depending upon the angle of "tilt" of the device. The actual correlation between degrees of tilt and the value returned depends on the device and OS that it uses, but generally a value of 1 or -1 is the same as +/-90°.
 */
declare function device_get_tilt_x(): number;
/**
 * This function returns a value between -1 and 1 depending upon the angle of "tilt" of the device. The actual correlation between degrees of tilt and the value returned depends on the device and OS that it uses, but generally a value of 1 or -1 is the same as +/-90°.
 */
declare function device_get_tilt_y(): number;
/**
 * This function returns a value between -1 and 1 depending upon the angle of "tilt" of the device. The actual correlation between degrees of tilt and the value returned depends on the device and OS that it uses, but generally a value of 1 or -1 is the same as +/-90°.
 */
declare function device_get_tilt_z(): number;
/**
 * This does a check of the device for a keypad and if one is available it returns true, otherwise it returns false. Please note that this function is mainly for use with Android devices
 */
declare function device_is_keypad_open(): boolean;
/**
 * This function returns true or false depending on whether the given mouse button is being held down on the given device.
 */
declare function device_mouse_check_button(device: number, button: Constant.MouseButton): boolean;
/**
 * This function returns true or false depending on whether the device that you specify has been "touched" (clicked) or not.
 */
declare function device_mouse_check_button_pressed(device: number, button: Constant.MouseButton): boolean;
/**
 * This function returns true or false depending on whether the device touch that you specify has been released or not.
 */
declare function device_mouse_check_button_released(device: number, button: Constant.MouseButton): boolean;
/**
 * This function can be used to set the device to detect a double tap of the mb_left (left mouse button) as an mb_right (right mouse button) tap or not. By default this is set to true, meaning that every time the user taps the device screen twice quickly and consecutively, the return value is the same as if the right mouse button had been clicked. When this is on, the first tap will be detected as mb_left, and the second as mb_right, so make sure that any code you use takes this into account.
 */
declare function device_mouse_dbclick_enable(bool: boolean): boolean;
/**
 * This function returns the raw x position of a touch on the device. What this means is that it returns the actual device definition of the x position that is being touched, not the GameMaker one, and as such will ignore things like view position and scaling. Note that the maximum number of touches that can be detected will depend very much on the device being used and the OS it runs.
 */
declare function device_mouse_raw_x(device: number): number;
/**
 * This function returns raw y position of the touch on a device. What this means is that it returns the actual device definition of the y position that is being touched, not the GameMaker one, and as such will ignore things like view position and scaling. Note that the maximum number of device touches that can be detected will depend very much on the device being used and the OS it runs.
 */
declare function device_mouse_raw_y(device: number): number;
/**
 * This function returns the x position of a touch on the device. If you are running this on a the HTML5 or PC and Mac modules then this value is updated constantly, as long as the device (usually a mouse) is plugged in, however for mobile devices, this will only be updated while the screen is being touched.
 */
declare function device_mouse_x(device: number): number;
/**
 * This function returns the x position of the touch on the device in relation to the GUI layer. If you are running this on a the HTML5 or PC and Mac modules then this value is updated constantly, as long as the device (usually a mouse) is plugged in, however for mobile devices, this will only be updated while the screen is being touched. Note that the maximum number of touches that can be detected will depend very much on the device being used and the OS it runs. Also note that on HTML5 only "device 0" will function correctly and other devices may give wrong values.
 */
declare function device_mouse_x_to_gui(device: number): number;
/**
 * This function returns the y position of a touch on the device. If you are running this on a the HTML5 or PC and Mac modules then this value is updated constantly, as long as the device (usually a mouse) is plugged in, however for mobile devices, this will only be updated while the screen is being touched. Note that the maximum number of touches that can be detected will depend very much on the device being used and the OS it runs. Also note that on HTML5 only "device 0" will function correctly and other devices may give wrong values.
 */
declare function device_mouse_y(device: number): number;
/**
 * This function returns the y position of the touch on the device in relation to the GUI layer.
 */
declare function device_mouse_y_to_gui(device: number): number;
/**
 * This function will return the number of "axis" controls on the device being checked. These controls are the analogue direction "thumbsticks" on most controllers.
 */
declare function gamepad_axis_count(device: number): number;
/**
 * Currently only functional on Android, this function will enumerate gamepads to detect any newly added gamepads and remove any recently removed ones without the need for BLUETOOTH_CONNECT permission.
 */
declare function gamepad_enumerate(): undefined;
/**
 * You can use this function to get the value of the different axes from a given gamepad slot. The returned value will be between -1 and 1 for each of the available horizontal and vertical axes.
 */
declare function gamepad_axis_value(device: number, axisindex: Constant.GamepadAxis): number;
/**
 * This function will return true or false depending on whether the given gamepad button is detected as being held down or not.
 */
declare function gamepad_button_check(device: number, button: Constant.GamepadButton): boolean;
/**
 * This function will return true or false depending on whether the given gamepad button is detected as having been pressed or not.
 */
declare function gamepad_button_check_pressed(device: number, button: Constant.GamepadButton): boolean;
/**
 * This function will return true or false depending on whether the given gamepad button is detected as having been released or not.
 */
declare function gamepad_button_check_released(device: number, button: Constant.GamepadButton): boolean;
/**
 * This function will return the total number of buttons available for the gamepad connected to the given device "slot".
 */
declare function gamepad_button_count(device: number): number;
/**
 * With this function you can get the current value of an analogue button, from 0 to 1, where 0 is no pressure and 1 is full pressure.
 */
declare function gamepad_button_value(device: number, button: Constant.GamepadButton): number;
/**
 * This function can be used to get the "dead zone" value of the joystick axis. The function will return a value between 0 to 1, where value reflects the threshold under which the joystick axis is considered to be at 0.
 */
declare function gamepad_get_axis_deadzone(device: number): number;
/**
 * This function can be used to detect the current threshold setting of the analogue buttons for a given device. The default threshold for all analogue buttons is 0.5, with the range being from 0 to 1. The threshold defines at what point the button is considered as being "pressed" for games that require them to act as a digital button.
 */
declare function gamepad_get_button_threshold(device: number): number;
/**
 * This function will return a string with the description of the given gamepad. This string is hardware dependent and the returned value will depend on the gamepad plugged into the device "slot" that is being checked.
 */
declare function gamepad_get_description(device: number): string;
/**
 * This function will tell you one of two things; either the number of game pads connected, or the number of available "slots" for game pads to be connected to.
 */
declare function gamepad_get_device_count(): number;
/**
 * With this function you can retrieve the GUID for the gamepad connected to the given slot index.
 */
declare function gamepad_get_guid(index: number): string;
/**
 * This function can be used to retrieve the mapping string for the gamepad.
 */
declare function gamepad_get_mapping(index: number): string;
/**
 * This function can be used to retrieve the given option value. The available option string will depend on the platform that the project is being run on.
 */
declare function gamepad_get_option(device: number, option_name: string): number;
/**
 * This function will return the total number of hats available for the gamepad connected to the given device "slot". Hats generally refer to up/down/left/right buttons. Note that on the Windows target, hats are only available on DirectInput controllers (so, from slot 4 upwards).
 */
declare function gamepad_hat_count(device: number): number;
/**
 * With this function you can get the current value of a gamepad "hat".
 */
declare function gamepad_hat_value(device: number, hatindex: number): number;
/**
 * This function will return whether a gamepad is connected to the given "slot" (returns true) or not (returns false). Note that there may be a slight delay between the user connecting the gamepad and GameMaker detecting it as being connected (this is especially the case when dealing with Bluetooth connected controllers).
 */
declare function gamepad_is_connected(device: number): boolean;
/**
 * With this function you can find out whether the target platform supports game pads (returns true) or not (returns false).
 */
declare function gamepad_is_supported(): boolean;
/**
 * This function can be used to remove the current device mapping from the given gamepad slot index. Once called, the slot index will need to be remapped using the gamepad_test_mapping() function if you want to be able to be able to use the gamepad constants to detect input correctly (direct input can always be retrieved using the gamepad_axis/button/hat_count() and gamepad_axis/button/hat_value() functions together).
 */
declare function gamepad_remove_mapping(index: number): undefined;
/**
 * This function can be used to set the "dead zone" of the joystick axis. You specify the device slot to set, and then set a value from 0 to 1 and if the input amount is lower than the given value, the joystick axis is considered to be at 0. Note that this is a global setting that will affect all axes of all joysticks connected to the device slot specified.
 */
declare function gamepad_set_axis_deadzone(device: number, deadzone: number): undefined;
/**
 * This function can be used to set the current threshold setting of the analogue buttons for a given device. The default threshold for all analogue buttons is 0.5, with the range being from 0 to 1. The threshold defines at what point the button is considered as being "pressed" for games that require them to act as a digital button. Note that this function will affect the check, pressed and released states for analogue buttons, but will not affect the value returned by the function gamepad_button_check(), which will always return the raw value for the button.
 */
declare function gamepad_set_button_threshold(device: number, threshold: number): undefined;
/**
 * This function can be used to set the colour of the LEDs within a PlayStation controller. You specify the device slot to set, and then give a colour, which can be any of the colour constants, a colour value created using the specific colour functions or a HEX value(like $FFFFFFF).
 */
declare function gamepad_set_colour(device: number, colour: Constant.Color): undefined;
/**
 * This function can be used to set any of the available gamepad options. The available option string will depend on the platform that the project is being run on.
 */
declare function gamepad_set_option(device: number, option_name: string, value: unknown): undefined;
/**
 * With this function you can set the vibration of the gamepad motors, with either motor using a value from 0 (no vibration) to 1 (full vibration). Note that there is no time limit on this function, so you will need to use a variable or an alarm to switch off the vibration (set motors to 0) after a given time has passed, otherwise the gamepad will continue to vibrate indefinitely.
 */
declare function gamepad_set_vibration(device: number, left_motor: number, right_motor: number): undefined;
/**
 * This function can be used to set the gamepad mapping on those targets that permit it.
 */
declare function gamepad_test_mapping(index: number, value: string): undefined;
/**
 * This function is used to set the distance within which you have to touch/click the screen again after a single tap in order to trigger a Double Tap Gesture. The distance is measured in inches and has a default value of 0.1.
 */
declare function gesture_double_tap_distance(distance: number): undefined;
/**
 * This function is used to set the time it takes between two touches/clicks to trigger a Double Tap Gesture event. The time is measured in seconds and has a default value of 0.16.
 */
declare function gesture_double_tap_time(time: number): undefined;
/**
 * This function is used to set the distance it takes for a Dragging Gesture event to be triggered by the movement of a touch or click. The distance is measured in inches and has a default value of 0.1.
 */
declare function gesture_drag_distance(distance: number): undefined;
/**
 * This function is used to set the time it takes for a Drag Gesture event to be triggered by a touch or click. This time will also affect how the Tap Event is triggered as a touch/click and release before this time is up will be considered a Tap. The time is measured in seconds and has a default value of 0.16.
 */
declare function gesture_drag_time(time: number): undefined;
/**
 * This function is used to set the speed required for a Flick Gesture event to be triggered when a touch or click is released. The speed is measured in inches per second and has a default value of 2.0.
 */
declare function gesture_flick_speed(speed: number): undefined;
/**
 * This function is used to get the distance within which you have to touch/click the screen again after a single tap in order to trigger a Double Tap Gesture. The distance is measured in inches and has a default value of 0.1.
 */
declare function gesture_get_double_tap_distance(): number;
/**
 * This function is used to get the time it takes between two touches/clicks to trigger a Double Tap Gesture event. The time is measured in seconds and has a default value of 0.16.
 */
declare function gesture_get_double_tap_time(): number;
/**
 * This function is used to get the distance it takes for a Dragging Gesture event to be triggered by the movement of a touch or click. The distance is measured in inches and has a default value of 0.1.
 */
declare function gesture_get_drag_distance(): number;
/**
 * This function is used to get the time it takes for a Drag Start Gesture event to be triggered by a touch or click. This time will also affect how the Tap Event is triggered as a touch/click and release before this time is up will be considered a Tap. The time is measured in seconds and has a default value of 0.16.
 */
declare function gesture_get_drag_time(): number;
/**
 * This function is used to get the speed required for a Flick Gesture event to be triggered when a touch or click is released. The speed is measured in inches per second and has a default value of 2.0.
 */
declare function gesture_get_flick_speed(): number;
/**
 * This function is used to get the angle within which a touch must be moving away from another touch before a Pinch Out Gesture may potentially be started. The angle is measured in degrees and has a default value of 45°.
 */
declare function gesture_get_pinch_angle_away(): number;
/**
 * This function is used to get the angle within which a touch must be moving towards another touch before a Pinch In Gesture may potentially be started. The angle is measured in degrees and has a default value of 45°.
 */
declare function gesture_get_pinch_angle_towards(): number;
/**
 * This function is used to get the distance within which you have to touch/click the screen and move with two fingers before you trigger a Pinch Gesture. The distance is measured in inches and has a default value of 0.1.
 */
declare function gesture_get_pinch_distance(): number;
/**
 * This function is used to get the angle which a pair of touches must exceed in order to trigger a Rotate Start Gesture. The angle is measured in degrees and has a default value of 5°.
 */
declare function gesture_get_rotate_time(): number;
/**
 * This function is used to check whether tap counting is enabled or disabled. You can enable or disable tap counting using the function gesture_tap_count().
 */
declare function gesture_get_tap_count(): boolean;
/**
 * This function is used to set the angle within which a touch must be moving away from another touch before a Pinch Out Gesture may potentially be started. The angle is measured in degrees and has a default value of 45°.
 */
declare function gesture_pinch_angle_away(angle: undefined): number;
/**
 * This function is used to set the angle within which a touch must be moving towards another touch before a Pinch In Gesture may potentially be started. The angle is measured in degrees and has a default value of 45°.
 */
declare function gesture_pinch_angle_towards(angle: undefined): number;
/**
 * This function is used to set the distance within which you have to touch/click the screen and move with two fingers before you trigger a Pinch Gesture. The distance is measured in inches and has a default value of 0.1.
 */
declare function gesture_pinch_distance(distance: undefined): number;
/**
 * This function is used to set the angle which a pair of touches must exceed in order to trigger a Rotate Start Gesture. The angle is measured in degrees and has a default value of 5°.
 */
declare function gesture_rotate_angle(angle: undefined): number;
/**
 * This function is used to set the time within which a pair of touches must be rotating in a consistent direction for a Rotate Start Gesture to be triggered. The time is measured in seconds and has a default value of 0.16s.
 */
declare function gesture_rotate_time(time: undefined): number;
/**
 * This function is used to set whether tap counting is enabled or disabled. When set to true tap counting is enabled, and when set to false it is disabled, although you can check which state it is in using the function gesture_get_tap_count(). Note that this is enabled by default.
 */
declare function gesture_tap_count(enable: boolean): undefined;
/**
 * This function will clear the current keyboard and mouse states.
 */
declare function io_clear(): undefined;
/**
 * With this function you can check to see if a key is held down or not. Unlike the keyboard_check_pressed() or keyboard_check_released() functions which are only triggered once when the key is pressed or released, this function is triggered every step that the key is held down for.
 */
declare function keyboard_check(key: Constant.VirtualKey | number): boolean;
/**
 * This function will return true if the key with the particular keycode is pressed, or false if it is not, by checking the hardware directly.
 */
declare function keyboard_check_direct(key: Constant.VirtualKey | number): boolean;
/**
 * With this function you can check to see if a key has been pressed or not. Unlike the keyboard_check() function, this function will only run once for every time the key is pressed down, so for it to trigger again, the key must be first released and then pressed again.
 */
declare function keyboard_check_pressed(key: Constant.VirtualKey | number): boolean;
/**
 * With this function you can check to see if a key has been released or not. Unlike the keyboard_check() function, this function will only run once for every time the key is lifted, so for it to trigger again, the key must be first pressed and then released again.
 */
declare function keyboard_check_released(key: Constant.VirtualKey | number): boolean;
/**
 * With this function you can clear the current keyboard state, which essentially means that if the key is being held down, it will no longer be recognised until it is released again (which won't trigger the Keyboard Key Released event either on this occasion) and pressed again.
 */
declare function keyboard_clear(key: Constant.VirtualKey | number): undefined;
/**
 * Sometimes you may wish to get the ASCII code for a mapped key (to see if it is already mapped, for example) which is what this function returns.
 */
declare function keyboard_get_map(key: Constant.VirtualKey | number): number;
/**
 * You can use this function to find the status of the keypad number lock with true being returned for on, and false returned for off.
 */
declare function keyboard_get_numlock(): boolean;
/**
 * With this function you can simulate the press of any key on the keyboard.
 */
declare function keyboard_key_press(key: Constant.VirtualKey | number): undefined;
/**
 * With this function you can simulate the release of any key on the keyboard.
 */
declare function keyboard_key_release(key: Constant.VirtualKey | number): undefined;
/**
 * This function maps a keyboard key to another one using the keycode value so that any input from either key will be interpreted as the same.
 */
declare function keyboard_set_map(key1: Constant.VirtualKey | number, key2: Constant.VirtualKey | number): boolean;
/**
 * You can use this function to switch the keypad number-lock on or off (set to true for on, and false for off).
 */
declare function keyboard_set_numlock(value: boolean): undefined;
/**
 * With this function you can clear all re-mapped keys so that they return to their default state, i.e.: all keys to map to themselves.
 */
declare function keyboard_unset_map(): undefined;
/**
 * This function will return true if the mouse button being checked is held down or false if it is not.
 */
declare function mouse_check_button(numb: Constant.MouseButton): boolean;
/**
 * This function will return true if the mouse button being checked has been pressed or false if it has not. This function will only be triggered once for any mouse button when it is first pressed and to trigger it again the button will need to have been released and pressed again. Note that it will be considered triggered for the duration of the step, and for all instances that have any mouse events or that use this same function.
 */
declare function mouse_check_button_pressed(numb: Constant.MouseButton): boolean;
/**
 * This function will return true if the mouse button being checked has been released or false if it has not. This function will only be triggered once for any mouse button when it is released and to trigger it again the button will need to have been pressed and released again.
 */
declare function mouse_check_button_released(numb: Constant.MouseButton): boolean;
/**
 * This function will clear the current state of the given mouse button. This means that checks for it being held down will not return true until the player releases the button and presses it again (but the release state will still be detected if the clear is done while the mouse button is being held down).
 */
declare function mouse_clear(button: Constant.MouseButton): boolean;
/**
 * This function returns true if the mouse wheel is being rotated downwards and false otherwise.
 */
declare function mouse_wheel_down(): boolean;
/**
 * This function returns true if the mouse wheel is being rotated upwards and false otherwise.
 */
declare function mouse_wheel_up(): boolean;
/**
 * This function will return the current height in pixels of the virtual keyboard, based on the size of the display. If the keyboard is not visible, 0 will be returned.
 */
declare function keyboard_virtual_height(): number;
/**
 * This function can be used to hide the virtual keyboard on the device running the game. Calling this function will generate a System Asynchronous Event.
 */
declare function keyboard_virtual_hide(): undefined;
/**
 * This function can be used to show the virtual keyboard on the device running the game.
 */
declare function keyboard_virtual_show(keyboard_type: Constant.VirtualKeyboardType, return_key_type: Constant.VirtualKeyboardReturnType, autocapitalization_type: Constant.VirtualKeyboardAutoCapitalizeType, predictive_text_enabled: boolean): undefined;
/**
 * This function can be used to get the status of the virtual keyboard on the device running the game. The function will return true if the OS virtual keyboard is visible/being shown or false if it is hidden/hiding.
 */
declare function keyboard_virtual_status(): boolean;
/**
 * This Windows only function can be used to set the position of the virtual keyboard on the device running the game. The coordinates passed in are in display coordinates (use application_get_position() to find the game's position in this space).
 */
declare function keyboard_virtual_set_position(x: number, y: number): undefined;
/**
 * This function adds a virtual key that covers a portion of the screen area, mapping "touches" of this area to a keyboard key.
 */
declare function virtual_key_add(x: number, y: number, w: number, h: number, keycode: number): number;
/**
 * This function deletes a previously added virtual key.
 */
declare function virtual_key_delete(index: number): undefined;
/**
 * This function hides the coloured rectangle that's drawn to represent the given virtual key on the screen.
 */
declare function virtual_key_hide(index: number): undefined;
/**
 * This function draws a coloured rectangle to represent the given virtual key on the screen.
 */
declare function virtual_key_show(index: number): undefined;
/**
 * With this function you can trigger the garbage collector, forcing it to run at the end of the current frame (step). It is worth noting that the garbage collector does not need to be active for this to work.
 */
declare function gc_collect(): undefined;
/**
 * With this function you can enable or disable the garbage collector. Calling the function with true as the argument enables it and using false disables it (not recommended). It is enabled by default.
 */
declare function gc_enable(enable: boolean): undefined;
/**
 * With this function you can retrieve information about the current state of the garbage collector.
 */
declare function gc_get_stats(): Struct.GCStats;
/**
 * With this function you can retrieve the current target frame value for the garbage collector. The value returned is in microseconds (where 1,000,000 microseconds equals one second) and the default target frame time is 100 microseconds. If you wish to change this value then you should use the function gc_target_frame_time().
 */
declare function gc_get_target_frame_time(): number;
/**
 * With this function you can check to see if the garbage collector is enabled or not.
 */
declare function gc_is_enabled(): boolean;
/**
 * With this function you can indicate to the garbage collector that it should aim to spend no more than the time specified running each frame. The function takes a time value specified in microseconds (where 1,000,000 microseconds equals one second) and the default target frame time is 100 microseconds.
 */
declare function gc_target_frame_time(time: number): undefined;
/**
 * With this function you can check the weak reference to a struct to see if it is still "alive" or not. Note that if you supply a value that is not a weak reference, the function will return undefined.
 */
declare function weak_ref_create(struct_to_track: Record<string, unknown>): Struct.WeakRef;
/**
 * With this function you can check the weak reference to various structs to see if it they are still "alive" or not. Note that if you supply an array where any of the values are not a weak references, the function will return undefined.
 */
declare function weak_ref_any_alive(weak_ref: Array<Struct.WeakRef>, index?: number, length?: number): boolean;
/**
 * With this function you can end the game (and the Game End Event will be triggered). This will not happen instantaneously, but rather at the end of the current step, so any code you have in the same step after this function has been called will still run.
 */
declare function game_end(return_code?: number): undefined;
/**
 * This function can be used to get the game speed as either the number of game frames to run per second or as the number of microseconds per game frame. Note that this is not the actual running speed FPS value (for that use the fps_real variable) but rather the number of game frames (FPS) that the game will attempt to maintain each second, or the length of each game frame in microseconds that the game will try to maintain (MPF).
 */
declare function game_get_speed(type: Constant.GameSpeed): number;
/**
 * This is a legacy function that can be used to load a game that has been previously saved using game_save(). Note that it will restore the version of the game that was used to create the save, so any updates made after it will not be visible. For more info, read the page on game_save().
 * @deprecated
 */
declare function game_load(filename: string): undefined;
/**
 * With this function you can load a game state that has been saved previously. The game is loaded from a previously created "grow" buffer and the buffer must have had a game state saved to it using game_save_buffer() function.
 */
declare function game_load_buffer(buffer: Id.Buffer): undefined;
/**
 * With this function you can restart the game. This is essentially the same as running the game for the first time and so the Game Start Event will be triggered, as well as the Game End Event.
 */
declare function game_restart(): undefined;
/**
 * This is a legacy function that can be used to save the current state of the game, and is not recommended for use anymore. Use the File functions instead to create a custom save system where you only save and load specific game data.
 * @deprecated
 */
declare function game_save(filename: string): undefined;
/**
 * This is a variant of the game_save() function, so please read its page first as it contains important information related to its use and to this function's use as well.
 */
declare function game_save_buffer(buffer: Id.Buffer): undefined;
/**
 * This function can be used to set the game speed. You can set this in one of two ways: as game frames per second (FPS) or as microseconds per game frame (MPF).
 */
declare function game_set_speed(speed: number, type: Constant.GameSpeed): undefined;
/**
 * This function allows you to close the currently running title and launch another title, it will only work in VM and on certain platforms it will only work in a package build and not in run/debug.
 */
declare function game_change(working_directory: string, launch_parameters: string): undefined;
/**
 * With this function you can add a name and a score to the internal global high score list. There is no need to check the value to see if it is high enough to enter into the score list as GameMaker will only store those values that are greater than the tenth position stored.
 */
declare function highscore_add(str: string, numb: number): undefined;
/**
 * With this function you can retrieve the score value that has been stored in the high score list at the given position. If no score has been entered, the function will return 0.
 */
declare function highscore_value(place: number): number;
/**
 * With this function you can retrieve the name string that has been stored in the high score list at the given position. If no name has been entered, the string "Unknown" will be returned.
 */
declare function highscore_name(place: number): string;
/**
 * This function returns the smallest difference between the two specified angles, where the difference is calculated from the source angle towards the destination angle.
 */
declare function angle_difference(ang1: number, ang2: number): number;
/**
 * This function returns the inverse cosine (in radians) of x, in that if cos(val)=n, arccos(n)=val, and the resulting number will be between 0 and pi.
 */
declare function arccos(x: number): number;
/**
 * This function returns the inverse sine (in radians) of x, in that if sin(x)=n, arcsin(n)=x, and the resulting number will be between -pi/2 and pi/2.
 */
declare function arcsin(x: number): number;
/**
 * This function returns the inverse tangent (in radians) of x.
 */
declare function arctan(x: number): number;
/**
 * This function returns the inverse tangent (in radians) of a value given as a ratio y/x, where y = opposite side of triangle and x = adjacent side of triangle. Unlike arctan(), the function arctan2() is valid for all angles and so may be used to convert a vector to an angle without risking division by zero, and it also returns a result in the correct quadrant.
 */
declare function arctan2(y: number, x: number): number;
/**
 * This function returns the cosine of an angle in radians. In a right-angled triangle the cosine is defined as cos(val) = adjacent / hypotenuse, where val is one of the three angles.
 */
declare function cos(val: number): number;
/**
 * This function returns the inverse cosine (in degrees) of x, in that if dcos(val)=n, darccos(n)=val, and the resulting number will be between 0 and 180.
 */
declare function darccos(x: number): number;
/**
 * This function returns the inverse sine (in degrees) of x, in that if dsin(x)=n, darcsin(n)=x, and the resulting number will be between -90 and 90.
 */
declare function darcsin(val: number): number;
/**
 * This function returns the inverse tangent (in degrees) of x. This will accept any number as, unlike dtan(), darctan() asymptotes are on the y axis so it just means you'll never get returned a number greater than 90 or less than -90.
 */
declare function darctan(val: number): number;
/**
 * This function returns the inverse tangent (in degrees) of a value given as y/x, where y = Opposite side of triangle and x = Adjacent side of triangle. Unlike darctan(), the function darctan2() is valid for all angles and so may be used to convert a vector to an angle without risking division by zero, and it also returns a result in the correct quadrant.
 */
declare function darctan2(y: number, x: number): number;
/**
 * This function returns the cosine of an angle in degrees. In a right-angled triangle the cosine is defined as cos(val) = adjacent / hypotenuse, where val is one of the three angles.
 */
declare function dcos(val: number): number;
/**
 * This function converts an angle in degrees to an angle in radians. This function translates degrees into radians using the formula: angle_radians = angle_degrees * pi / 180;
 */
declare function degtorad(deg: number): number;
/**
 * This function calculates the distance from the edge of the bounding box of the calling instance to the nearest edge of the nearest instance of the object specified.
 */
declare function distance_to_object(obj: Id.Instance | Asset.GMObject): number;
/**
 * This function checks a sphere of radius r at position x,y,z against the current view frustum. Returns true if the sphere intersects or is contained in the view frustum and false if the sphere is completely outside the view frustum.
 */
declare function sphere_is_visible(x: number, y: number, z: number, r: number): boolean;
/**
 * This function calculates the distance from the edge of the bounding box of the calling instance to the specified (x , y) position in the room, with the return value being in pixels.
 */
declare function distance_to_point(x: number, y: number): number;
/**
 * This function returns the dot product of two 2D vectors specified as (x1, y1) and (x2, y2).
 */
declare function dot_product(x1: number, y1: number, x2: number, y2: number): number;
/**
 * This function returns the dot product of two 3D vectors specified as (x1, y1, z1) and (x2, y2, z2).
 */
declare function dot_product_3d(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
/**
 * This function returns the normalised dot product of two 3D vectors, specified as (x1, y1, z1) and (x2, y2, z2).
 */
declare function dot_product_3d_normalised(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
/**
 * This function returns the normalised dot product of two 2D vectors specified as (x1, y1) and (x2, y2).
 */
declare function dot_product_normalised(x1: number, y1: number, x2: number, y2: number): number;
/**
 * This function returns the sine of an angle in degrees. In a right-angled triangle the sine is defined as sin(val) = opposite / hypotenuse, where val is one of the three angles.
 */
declare function dsin(val: number): number;
/**
 * This function returns the tangent of an angle in degrees. In a right-angled triangle the tangent is defined as tan(val) = opposite / adjacent, where val is one of the three angles.
 */
declare function dtan(val: number): number;
/**
 * This function is used to get the x component of a position "len" pixels from the starting point and in direction "dir".
 */
declare function lengthdir_x(len: number, dir: number): number;
/**
 * This function is used to get the y component of a position "len" pixels from the starting point and in direction "dir".
 */
declare function lengthdir_y(len: number, dir: number): number;
/**
 * This function returns the direction of a vector formed by the specified components (x1, y1) and (x2, y2) in relation to the fixed x/y coordinates of the room.
 */
declare function point_direction(x1: number, y1: number, x2: number, y2: number): number;
/**
 * This function returns the length of a vector formed by the specified components (x1, y1) and (x2, y2).
 */
declare function point_distance(x1: number, y1: number, x2: number, y2: number): number;
/**
 * This function returns the length of a vector formed by the specified components (x1, y1, z1) and (x2, y2, z2).
 */
declare function point_distance_3d(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
/**
 * This function converts an angle in radians to an angle in degrees. The function translates radians into degrees using the formula: angle_degrees = angle_radians * 180 / pi;
 */
declare function radtodeg(rad: number): number;
/**
 * This function returns the sine of an angle in radians. In a right-angled triangle the sine is defined as sin(val) = opposite / hypotenuse, where val is one of the three angles.
 */
declare function sin(val: number): number;
/**
 * This function returns the tangent of an angle in radians. In a right-angled triangle the tangent is defined as tan(val) = opposite / adjacent, where val is one of the three angles.
 */
declare function tan(val: number): number;
/**
 * With this function you can check two dates to see which one is the earlier or later than the other. The function returns -1 if date1 is earlier, 0 if both dates are the same, and 1 if date1 is later.
 */
declare function date_compare_date(date1: number, date2: number): number;
/**
 * With this function you can check two dates and times to see which one is the earlier or later than the other. The function returns -1 if date1 is earlier, 1 if date1 is later and 0 if they are the same.
 */
declare function date_compare_datetime(date1: number, date2: number): number;
/**
 * With this function you can check two dates and times to see which one has the time component earlier or later than the other. The function returns -1 if datetime1 is earlier, 1 if datetime1 is later and 0 if they are the same, and it ignores the date, so literally just which of the times is further through its given day.
 */
declare function date_compare_time(datetime1: number, datetime2: number): number;
/**
 * This function will create a datetime value from the components given as the arguments.
 */
declare function date_create_datetime(year: number, month: number, day: number, hour: number, minute: number, second: number): number;
/**
 * Returns the date-time value of the current moment. The time returned is based on the default time zone for the system (i.e.: local time).
 */
declare function date_current_datetime(): number;
/**
 * With this function you can create a string containing the given datetime, formatted for the system or device that is running the game when the function is called.
 */
declare function date_datetime_string(date: number): string;
/**
 * Returns the date value of the given datetime.
 */
declare function date_date_of(date: number): number;
/**
 * With this function you can create a string containing the given date, formatted as day/month/year.
 */
declare function date_date_string(date: number): string;
/**
 * With this function you can get the number of days that the given month has, either 28, 29, 30 or 31.
 */
declare function date_days_in_month(date: number): number;
/**
 * With this function you can get the number of days that the given year has, returning 365 for a normal year, and 366 for a leap year.
 */
declare function date_days_in_year(date: number): number;
/**
 * With this function you can get the number of days between two dates. This value is always positive, and incomplete days will be returned as a fraction.
 */
declare function date_day_span(date1: number, date2: number): number;
/**
 * This function returns the day (from 1 to 31) of the given datetime.
 */
declare function date_get_day(date: number): number;
/**
 * This function returns the day (from 1 to 366) within the year of the given datetime.
 */
declare function date_get_day_of_year(date: number): number;
/**
 * This function returns the hour of the given datetime value.
 */
declare function date_get_hour(date: number): number;
/**
 * This function returns the hour of the given datetime value within the year (from the total number of hours for the year, taking into account leap years).
 */
declare function date_get_hour_of_year(date: number): number;
/**
 * This function returns the minute of the given datetime value.
 */
declare function date_get_minute(date: number): number;
/**
 * This function returns the minute of the given datetime value within the year (from the total number of minutes for the year, taking into account leap years).
 */
declare function date_get_minute_of_year(date: number): number;
/**
 * This function returns the month of the given datetime value.
 */
declare function date_get_month(date: number): number;
/**
 * This function returns the second of the given datetime value.
 */
declare function date_get_second(date: number): number;
/**
 * This function returns the second of the given datetime value within the year (from the total number of seconds for the year, taking into account leap years).
 */
declare function date_get_second_of_year(date: number): number;
/**
 * This function gets the base time zone being used for all the rest of the date and time functions, which can be either local (as set by the system) or UTC.
 */
declare function date_get_timezone(): number;
/**
 * This function returns the week of the given datetime value within the year.
 */
declare function date_get_week(date: number): number;
/**
 * This function returns the week day value of the given datetime. This will be a value from 0 to 6.
 */
declare function date_get_weekday(date: number): number;
/**
 * This function returns the year of the given datetime.
 */
declare function date_get_year(date: number): number;
/**
 * With this function you can get the number of hours between two dates. This value is always positive, and incomplete hours will be returned as a fraction.
 */
declare function date_hour_span(date1: number, date2: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of days, and it will return the new datetime value.
 */
declare function date_inc_day(date: number, amount: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of hours, and it will return the new datetime value.
 */
declare function date_inc_hour(date: number, amount: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of minutes, and it will return the new datetime value.
 */
declare function date_inc_minute(date: number, amount: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of months, and it will return the new datetime value.
 */
declare function date_inc_month(date: number, amount: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of seconds, and it will return the new datetime value.
 */
declare function date_inc_second(date: number, amount: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of weeks, and it will return the new datetime value.
 */
declare function date_inc_week(date: number, amount: number): number;
/**
 * With this function you can increment a given datetime value by a specific number of years, and it will return the new datetime value.
 */
declare function date_inc_year(date: number, amount: number): number;
/**
 * This function will return true if the given datetime value is the day it is being checked on (i.e.: today), or false otherwise. This can be a handy function for things like Easter Eggs in your games, or for unlocking seasonal content.
 */
declare function date_is_today(date: number): boolean;
/**
 * This function will return true if the year component of the given datetime value is a leap year or false otherwise. This can be a handy function for things like Easter Eggs in your games, or for unlocking special content.
 */
declare function date_leap_year(date: number): boolean;
/**
 * With this function you can get the number of minutes between two dates. This value is always positive, and incomplete minutes will be returned as a fraction.
 */
declare function date_minute_span(date1: number, date2: number): number;
/**
 * With this function you can get the number of months between two dates. This value is always positive, and incomplete months will be returned as a fraction.
 */
declare function date_month_span(date1: number, date2: number): number;
/**
 * With this function you can get the number of seconds between two dates. The return value is always positive and will be a whole number.
 */
declare function date_second_span(date1: number, date2: number): number;
/**
 * This function sets the base time zone to use for all the rest of the date and time functions, which can either be local (as set by the system) or UTC.
 */
declare function date_set_timezone(timezone: number): undefined;
/**
 * This function returns the time value of the given datetime.
 */
declare function date_time_of(date: number): number;
/**
 * With this function you can create a string containing the given time, formatted for the system or device that is running the game when the function is called.
 */
declare function date_time_string(date: number): string;
/**
 * With this function you can check a datetime value to see if it is valid (returns true) or not (returns false). Note that this function will only consider a valid datetime as being after 1/1/1970 and anything before that will return false.
 */
declare function date_valid_datetime(year: number, month: number, day: number, hour: number, minute: number, second: number): boolean;
/**
 * With this function you can get the number of weeks between two dates. This value is always positive, and incomplete weeks will be returned as a fraction.
 */
declare function date_week_span(date1: number, date2: number): number;
/**
 * With this function you can get the number of years between two dates. This value is always positive, and incomplete years will be returned as a fraction.
 */
declare function date_year_span(date1: number, date2: number): number;
/**
 * This function returns the time that your game has been running on the chosen platform in microseconds (there are 1 million microseconds per second).
 */
declare function get_timer(): number;
/**
 * This function creates a custom transformation matrix from 3-dimensional (x, y, z) translation, rotation and scale values and returns it. Or optionally writes the result to an existing matrix that you specify.
 */
declare function matrix_build(x: number, y: number, z: number, xrotation: number, yrotation: number, zrotation: number, xscale: number, yscale: number, zscale: number, result_matrix?: Array<number>): Array<number>;
/**
 * This will build a 4x4 identity matrix.
 */
declare function matrix_build_identity(): Array<number>;
/**
 * This function builds a "look-at" (view) matrix. And can optionally write the result to an existing matrix that you specify.
 */
declare function matrix_build_lookat(xfrom: number, yfrom: number, zfrom: number, xto: number, yto: number, zto: number, xup: number, yup: number, zup: number, result_matrix?: Array<number>): Array<number>;
/**
 * This function builds an orthographic projection matrix based on the specified parameters (this is the default projection method used when you create a room in GameMaker without changing anything). And can optionally write the result to an existing matrix that you specify.
 */
declare function matrix_build_projection_ortho(w: number, h: number, znear: number, zfar: number, result_matrix?: Array<number>): Array<number>;
/**
 * This function builds a perspective projection matrix based on the dimensions of the near clipping plane, using the specified parameters. And can optionally write the result to an existing matrix that you specify.
 */
declare function matrix_build_projection_perspective(width: number, height: number, znear: number, zfar: number, result_matrix?: Array<number>): Array<number>;
/**
 * This function builds a perspective projection matrix matrix based on field of view, using the specified parameters. And can optionally write the result to an existing matrix that you specify.
 */
declare function matrix_build_projection_perspective_fov(fov_y: number, aspect: number, znear: number, zfar: number, result_matrix?: Array<number>): Array<number>;
/**
 * This function gets the currently used matrix of the given type, which can be either the world, view or projection matrix. And can optionally write the result to an existing matrix that you specify.
 */
declare function matrix_get(type: Constant.MatrixType, result_matrix?: Array<number>): Array<number>;
/**
 * This function multiplies two matrices together to create a new matrix and returns the result as a new matrix, or optionally writes the result to an existing matrix that you specify.
 */
declare function matrix_multiply(matrix1: Array<number>, matrix2: Array<number>, result_matrix?: Array<number>): Array<number>;
/**
 * This function returns a new matrix that is the inverse of the matrix you pass it, or optionally writes the result to an existing matrix that you specify.
 */
declare function matrix_inverse(matrix: Array<number>, result_matrix?: Array<number>): Array<number>;
/**
 * This function sets the current matrix of the given type (world, view or projection) to the given matrix.
 */
declare function matrix_set(type: Constant.MatrixType, matrix: Array<number>): undefined;
/**
 * This function clears the matrix stack.
 */
declare function matrix_stack_clear(): undefined;
/**
 * This function can be used to check whether the matrix stack is empty (returns true) or not (returns false).
 */
declare function matrix_stack_is_empty(): boolean;
/**
 * This function removes the matrix that is at the top of the current matrix stack.
 */
declare function matrix_stack_pop(): undefined;
/**
 * This function multiplies the given matrix with the matrix currently at the top of the matrix stack and pushes the resulting matrix onto the stack.
 */
declare function matrix_stack_push(matrix: unknown[]): undefined;
/**
 * This function overwrites the current top of the matrix stack with the specified matrix.
 */
declare function matrix_stack_set(matrix: unknown[]): undefined;
/**
 * This function returns the current top matrix of the stack, but does not remove it (for that use matrix_stack_pop()).
 */
declare function matrix_stack_top(): Array<number>;
/**
 * This function transforms a vector by a matrix and returns the result as a new array, or optionally writes the result to an existing array that you specify. * array[0] = x * array[1] = y * array[2] = z * array[3] = w (if x, y, z and w are provided).
 */
declare function matrix_transform_vertex(matrix: Array<number>, x: number, y: number, z: number, w?: number, result_array?: Array<number>): Array<number>;
/**
 * This function returns the absolute value of the input argument, so if it's a positive value then it will remain the same, but if it's negative it will be multiplied by -1 to make it positive.
 */
declare function abs(val: number): number;
/**
 * This function takes any real number and rounds it up to the nearest integer.
 */
declare function ceil(x: number): number;
/**
 * This function chooses a random value from the arguments you pass it.
 */
declare function choose(val1: GML.ArgumentIdentity, ___: GML.ArgumentIdentity): GML.ArgumentIdentity;
/**
 * With this function you can maintain an input value between a specified range.
 */
declare function clamp(val: number, min: number, max: number): number;
/**
 * This is the function power(e, n), where e is approximately 2.718281828 (also known as Euler's Number), and n is the number of times it should be multiplied by itself.
 */
declare function exp(n: number): number;
/**
 * This function takes any real number and rounds it down to the nearest integer.
 */
declare function floor(n: number): number;
/**
 * This function returns the fractional part of n, that is, the part behind the decimal dot.
 */
declare function frac(n: number): number;
/**
 * This function returns a random integer (whole number) value.
 */
declare function irandom(n: number): number;
/**
 * This function returns a random integer value within the given range (both inclusive).
 */
declare function irandom_range(n1: number, n2: number): number;
/**
 * With this function you can find the value that equates to the position between two other values for a given percentage.
 */
declare function lerp(a: number, b: number, amt: number): number;
/**
 * This function returns the natural logarithm of the given value.
 */
declare function ln(n: number): number;
/**
 * This function returns the logarithm base 10 of the given number, which is the number of 10's that you need to multiply together to get n.
 */
declare function log10(n: number): number;
/**
 * This function returns the logarithm base 2 of the given number, which is the number of 2's that you need to multiply together to get n.
 */
declare function log2(n: number): number;
/**
 * This function returns the logarithm base n of the given number, which is the number of times that you need to multiply n by itself to get the value.
 */
declare function logn(n: number, val: number): number;
/**
 * This function will return the current epsilon value for the target platform.
 */
declare function math_get_epsilon(): number;
/**
 * This function sets the epsilon value for number comparisons, which is used to determine whether two numbers subject to rounding errors are close enough to be considered "equal".
 */
declare function math_set_epsilon(epsilon: number): number;
/**
 * This function returns the maximum of the input values, of which it can have as many as you require (note that more arguments will mean that the function will be slower to parse).
 */
declare function max(val0: number, ___: number): number;
/**
 * This function works by adding up all the input values and then dividing them by their own number.
 */
declare function mean(val0: number, ___: number): number;
/**
 * This function returns the median of the input values, that is, the middle value, or the larger of the two middle values when the number of arguments is even.
 */
declare function median(val0: number, ___: number): number;
/**
 * This function returns the minimum of the input values, of which it can have as many as you require (note that more arguments will mean that the function will be slower to parse).
 */
declare function min(val0: number, ___: number): number;
/**
 * This will return the value of a number multiplied by itself "n" number of times.
 */
declare function power(x: number, n: number): number;
/**
 * This function returns a random floating-point (decimal) number between 0.0 (inclusive) and the specified upper limit (inclusive).
 */
declare function random(n: number): number;
/**
 * This function sets the seed to a random value. Should you need to keep a consistent value over a number of runs of a game, however, you should be using random_set_seed() instead.
 */
declare function randomise(): number;
/**
 * This function retrieves the seed used by GameMaker to generate random numbers.
 */
declare function random_get_seed(): number;
/**
 * This function returns a random floating-point (decimal) number between the specified lower limit (inclusive) and the specified upper limit (inclusive).
 */
declare function random_range(n1: number, n2: number): number;
/**
 * This function sets the seed used by GameMaker to generate random numbers.
 */
declare function random_set_seed(val: number, fixRangeBug?: boolean): undefined;
/**
 * This function takes a real number and rounds it up or down to the nearest integer.
 */
declare function round(n: number): number;
/**
 * This function returns whether a number is positive, negative or neither and returns 1, -1, 0 respectively.
 */
declare function sign(n: number): number;
/**
 * Multiplies a number by itself and so returns the square of that number.
 */
declare function sqr(val: number): number;
/**
 * This function returns the square root of the given number.
 */
declare function sqrt(val: number): number;
/**
 * You can use this function to check and see if the calling instance would collide with any other instance of an object or all instances in your game. For this collision to resolve correctly, the instance running the code must have a valid collision mask (either for the sprite itself, or through the mask_index) and it will only register collisions with those instances that also have a valid mask.
 */
declare function place_empty(x: number, y: number, object_id?: Id.TileMapElement | Asset.GMObject | Id.Instance | unknown[]): boolean;
/**
 * You can use this function to check and see if the calling instance would collide with any instance flagged as solid in your game.
 */
declare function place_free(x: number, y: number): boolean;
/**
 * With this function you can check a position for a collision with another instance or all instances of an object using the collision mask of the instance that runs the code.
 */
declare function place_meeting(x: number, y: number, obj: Id.TileMapElement | Asset.GMObject | Id.Instance | Constant.All | unknown[]): boolean;
/**
 * This function checks if the given point falls within the given circular area.
 */
declare function point_in_circle(px: number, py: number, x1: number, y1: number, rad: number): boolean;
/**
 * This function checks if the given point falls within the given rectangular area.
 */
declare function point_in_rectangle(px: number, py: number, x1: number, y1: number, x2: number, y2: number): boolean;
/**
 * This function checks if the given point falls within the given triangular area.
 */
declare function point_in_triangle(px: number, py: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): boolean;
/**
 * This function will check a position for a collision with any instances at the given point, and if there is one, it will change all instances in collision to be instances of the chosen object.
 * @deprecated
 */
declare function position_change(x: Id.Instance, y: Id.Instance, obj: Asset.GMObject, perf: boolean): undefined;
/**
 * This function simply destroys all instances that are found to be in collision with the specified position. Collisions are based on the mask of the instances, and if any part of the mask overlaps with the target point it then the function will destroy that instance. Instances destroyed in this way will trigger their Destroy and Clean Up events.
 */
declare function position_destroy(x: number, y: number): undefined;
/**
 * This function will check to see if a given position enters into collision with any instance with a valid collision mask at the given position.
 */
declare function position_empty(x: number, y: number): boolean;
/**
 * With this function you can check a position for a collision with another instance or all instances of an object. When you use this you are checking a single point in the room for an instance or an object. The check will be done against the bounding box of the instance or against the mask of the instance if that instance has precise collisions checked.
 */
declare function position_meeting(x: number, y: number, obj: Id.TileMapElement | Asset.GMObject | Id.Instance | Constant.All | unknown[]): boolean;
/**
 * This function will check a rectangular area that you define to see if it is either not in collision, completely within the destination bounds, or if it is simply touching, a defined circular area. If they are not touching at all the function will return 0, if the source is completely within the destination it will return 1, and if they are simply overlapping then it will return 2.
 */
declare function rectangle_in_circle(sx1: number, sy1: number, sx2: number, sy2: number, x: number, y: number, rad: number): number;
/**
 * This function will check two rectangular areas that you define to see if the source rectangle is either not in collision, completely within the destination rectangles bounds, or if they are simply touching. If they are not touching at all the function will return 0, if the source is completely within the destination it will return 1, and if they are simply overlapping then it will return 2.
 */
declare function rectangle_in_rectangle(sx1: number, sy1: number, sx2: number, sy2: number, dx1: number, dy1: number, dx2: number, dy2: number): number;
/**
 * This function will check a rectangular area that you define to see if it is either not in collision, completely within the destination bounds, or if it is simply touching, a defined triangular area. If they are not touching at all the function will return 0, if the source is completely within the destination it will return 1, and if they are simply overlapping then it will return 2.
 */
declare function rectangle_in_triangle(sx1: number, sy1: number, sx2: number, sy2: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): number;
/**
 * This function marks an individual cell within the given MP grid as "forbidden" meaning that the path finding functions will not ever cross it.
 */
declare function mp_grid_add_cell(id: Id.MpGrid, h: number, v: number): undefined;
/**
 * This function uses the instance collision mask (decided by the sprite properties or the mask index of the calling instance) to mark cells as forbidden or not in an MP grid, where forbidden cells cannot be crossed by any of the pathfinding functions. You can specify in the function whether to consider precise collisions or not and the forbidden cells marked will change depending on this setting.
 */
declare function mp_grid_add_instances(id: Id.MpGrid, obj: Asset.GMObject | Id.Instance, prec: boolean): undefined;
/**
 * This function takes a rectangle in room coordinates and marks all MP grid cells that "touch" that rectangle as forbidden, meaning that the pathfinding functions cannot cross them.
 */
declare function mp_grid_add_rectangle(id: Id.MpGrid, x1: number, y1: number, x2: number, y2: number): undefined;
/**
 * This function clears an MP grid of all "forbidden" cells.
 */
declare function mp_grid_clear_all(id: Id.MpGrid): boolean;
/**
 * This function clears a specific "cell" of an MP grid. Cells are not calculated as room coordinates, but rather as grid coordinates, where (0, 0) is the top-left corner of the grid.
 */
declare function mp_grid_clear_cell(id: Id.MpGrid, h: number, v: number): boolean;
/**
 * With this function you can define an area in room coordinates which will then clear the corresponding cells in the specified MP grid. Even if a cell partially falls within the defined rectangular region it will be cleared.
 */
declare function mp_grid_clear_rectangle(id: Id.MpGrid, x1: number, y1: number, x2: number, y2: number): boolean;
/**
 * This function creates an MP grid for the motion planning functions.
 */
declare function mp_grid_create(left: number, top: number, hcells: number, vcells: number, cellwidth: number, cellheight: number): Id.MpGrid;
/**
 * This function destroys the given MP grid and frees up the memory used by it.
 */
declare function mp_grid_destroy(id: Id.MpGrid): undefined;
/**
 * This function draws the specified MP grid, marking free cells as green and forbidden cells as red.
 */
declare function mp_grid_draw(id: Id.MpGrid): boolean;
/**
 * This function returns whether the given MP grid cell is flagged as occupied or not. If it has been occupied or the position being checked is out of the grid's bounds, the function will return -1, otherwise it will return 0.
 */
declare function mp_grid_get_cell(id: Id.MpGrid, x1: number, y1: number): number;
/**
 * This function creates a path that will navigate through the given MP grid from a start point to a finish point, avoiding any obstacles that have been added into the grid.
 */
declare function mp_grid_path(id: Id.MpGrid, path: Asset.GMPath, x_start: number, y_start: number, xgoal: number, ygoal: number, allowdiag: boolean): boolean;
/**
 * This function copies the given MP grid into a DS grid. A cell in the DS grid will contain the value -1 if it's flagged as occupied in the MP grid, or 0 if it isn't.
 */
declare function mp_grid_to_ds_grid(source: Id.MpGrid, destination: Id.DsGrid): boolean;
/**
 * This function computes a straight line path from the current instance position to the given target position. The path may be blocked by all instances or just solid ones.
 */
declare function mp_linear_path(path: Asset.GMPath, xgoal: number, ygoal: number, stepsize: number, checkall: boolean): boolean;
/**
 * This function computes a straight line path from the current instance position to the given target position. The path may be blocked by instances of a given object, by a single instance or by all instances.
 */
declare function mp_linear_path_object(path: Asset.GMPath, xgoal: number, ygoal: number, stepsize: number, obj: Asset.GMObject | Id.Instance): boolean;
/**
 * With this function you tell an instance to take a "step" towards the given target position. The instance may stop at a collision with all instances or just solid ones.
 */
declare function mp_linear_step(xgoal: number, ygoal: number, stepsize: number, checkall: number): boolean;
/**
 * With this function you tell an instance to take a "step" towards the given target position. The instance may stop at a collision with instances of a given object, with a single instance or with all instances.
 */
declare function mp_linear_step_object(xgoal: number, ygoal: number, stepsize: number, obj: Asset.GMObject | Id.Instance): boolean;
/**
 * This function computes a path for the instance from its current position and orientation to the position specified by the xgoal,ygoal arguments.
 */
declare function mp_potential_path(path: Asset.GMPath, xgoal: number, ygoal: number, stepsize: number, factor: number, checkall: boolean): boolean;
/**
 * This function computes a path for the instance from its current position and orientation to the position specified by the xgoal, ygoal arguments.
 */
declare function mp_potential_path_object(path: Asset.GMPath, xgoal: number, ygoal: number, stepsize: number, factor: number, obj: Id.Instance | Asset.GMObject | Constant.All): boolean;
/**
 * The mp_potential_* functions do their work using a number of parameters that can be changed using this function.
 */
declare function mp_potential_settings(maxrot: number, rotstep: number, ahead: number, onspot: boolean): undefined;
/**
 * This function lets the instance take a step towards a particular position defined by xgoal/ygoal, all the while trying to avoid obstacles.
 */
declare function mp_potential_step(xgoal: number, ygoal: number, stepsize: number, checkall: boolean): boolean;
/**
 * This function lets the instance take a step towards a particular position defined by xgoal/ygoal, all the while trying to avoid obstacles.
 */
declare function mp_potential_step_object(xgoal: number, ygoal: number, stepsize: number, obj: Id.Instance | Asset.GMObject | Constant.All): boolean;
/**
 * This function will modify the current direction and speed of the instance running the code, combining the values given with the current values. If you wish to simply change these values, you should be using the function motion_set().
 */
declare function motion_add(dir: number, speed: number): undefined;
/**
 * This function sets a new direction of movement and a new speed to the instance running the code. Note that this does not add to the instance's current speed and direction (for that you would use motion_add()) but rather forces it to the new settings.
 */
declare function motion_set(dir: number, speed: number): undefined;
/**
 * With this function you can command an instance to bounce off all instances within the room, with the only exception being those that have no sprite or mask index assigned to them. You can also tell it to use precise collision checking when enabled, but be aware that this requires all instances to have precise masks enabled and will greatly slow down your game when many instances are involved due to the amount of processing that has to be done.
 */
declare function move_bounce_all(adv: boolean): undefined;
/**
 * With this function you can command an instance to bounce off only those instances marked as solid within the room. You can also tell it to use precise collision checking when enabled, but be aware that this requires all instances to have precise masks enabled and will greatly slow down your game when many instances are involved due to the amount of processing that has to be done.
 */
declare function move_bounce_solid(adv: boolean): undefined;
/**
 * This function will move the instance running the code a set number of pixels in the specified direction until it meets any other instance with a valid mask. You can use -1 or 0 for the maxdist being a default 1000px, i.e.: GameMaker will move the instance continually up 1000 pixels until it is out of collision.
 */
declare function move_contact_all(dir: number, maxdist: number): undefined;
/**
 * This function will move the instance running the code a set number of pixels in the specified direction until it meets an instance with solid flagged as true. You can use -1 or 0 for the maxdist being a default 1000px, i.e.: GameMaker will move the instance continually up 1000 pixels until it is out of collision.
 */
declare function move_contact_solid(dir: number, maxdist: number): undefined;
/**
 * With this function you can tell an instance to move out of a collision in any direction and any number of pixels each step, with a value of -1 or 0 for the maxdist being a default 1000px, i.e.: GameMaker will move the instance continually up 1000 pixels until it is out of collision.
 */
declare function move_outside_all(dir: number, maxdist: number): undefined;
/**
 * With this function you can tell an instance to move out of a collision with any instance flagged as solid in any direction and any number of pixels each step, with a value of -1 or 0 for the maxdist being a default 1000px, i.e.: GameMaker will move the instance continually up 1000 pixels until it is out of collision.
 */
declare function move_outside_solid(dir: number, maxdist: number): undefined;
/**
 * With this function you can set the instance to a position anywhere in the room, but aligned to an "invisible" grid. So a value of 32 for the hsnap and vsnap will set the instance to a random position that is aligned to a grid of 32x32 squares (you can set these values to 1 to get a position anywhere in the room).
 */
declare function move_random(hsnap: number, vsnap: number): undefined;
/**
 * This function is used to "snap" the instance to a grid of a given size. The instance will be snapped to the nearest corresponding position on the "invisible" grid that the hsnap and vsnap values define.
 */
declare function move_snap(hsnap: number, vsnap: number): undefined;
/**
 * This function tells the instance running the code to move towards a set point at a set speed.
 */
declare function move_towards_point(x: number, y: number, sp: number): undefined;
/**
 * This function will automatically "wrap" an instance that has left the room on either the horizontal or vertical (or both) axis. You can specify a margin outside the edges of the room for this to occur, and when the instance has travelled outside of that margin GameMaker will automatically wrap it back into the room at the other side.
 */
declare function move_wrap(hor: boolean, vert: boolean, margin: number): undefined;
/**
 * With this function you can check and see if the origin of an instance (its (x and y position) is aligned to a grid with the hsnap and vsnap values specified by you.
 */
declare function place_snapped(hsnap: number, vsnap: number): boolean;
/**
 * With this function you can send a request to connect to a server. The function takes the socket id to connect through and requires you to give the IP address to connect to as well as the port to connect through, and if the connection fails a value of less than 0 will be returned. This connection uses a special protocol that ensures only GameMaker games connect to each other, however if you need to connect to a server that is not a GameMaker game, you can use network_connect_raw().
 */
declare function network_connect(socket: Id.Socket, url: string, port: number): number;
/**
 * With this function you can send a request to connect to a server. The function takes the socket id to connect through and requires you to give the IP address to connect to as well as the port to connect through, and if the connection fails a value of less than 0 will be returned. The connection uses a special protocol that ensures only GameMaker games connect to each other, however if you need to connect to a server that is not a GameMaker game, you can use network_connect_raw_async().
 */
declare function network_connect_async(socket: Id.Socket, url: string, port: number): number;
/**
 * With this function you can send a request to connect to a server. The function takes the socket id to connect through and requires you to give the IP address to connect to as well as the port to connect through, and if the connection fails a value of less than 0 will be returned.
 */
declare function network_connect_raw(socket: Id.Socket, url: string, port: number): number;
/**
 * With this function you can send a request to connect to a server. The function takes the socket id to connect through and requires you to give the IP address to connect to as well as the port to connect through, and if the connection fails a value of less than 0 will be returned.
 */
declare function network_connect_raw_async(socket: Id.Socket, url: string, port: number): number;
/**
 * This function is used to create a new network server for your game, using one of the permitted connection protocols.
 */
declare function network_create_server(type: Constant.SocketType, port: number, max_client: number): number;
/**
 * This function is used to create a new raw network server for your game, using one of the permitted connection protocols.
 */
declare function network_create_server_raw(type: Constant.SocketType, port: number, max_client: number): number;
/**
 * This function creates a new client socket for your game to communicate over the network. The function returns a unique id for the socket, or a value of less than 0 if the connection fails.
 */
declare function network_create_socket(type: Constant.SocketType): Id.Socket;
/**
 * This function creates a new client socket for your game to communicate over the network. The function returns a unique id for the socket, or a value of less than 0 if the connection fails.
 */
declare function network_create_socket_ext(type: Constant.SocketType, port: number): Id.Socket;
/**
 * With this function you can remove a network socket connection from your game.
 */
declare function network_destroy(socket: Id.Socket): undefined;
/**
 * This function will return the IP address of the given URL.
 */
declare function network_resolve(url: string): string;
/**
 * With this function you can broadcast the data from a buffer locally to a range of IP addresses. The function will return the number of bytes of data sent, or a number less than 0 if the send has failed.
 */
declare function network_send_broadcast(socket: Id.Socket, port: number, buffer: Id.Buffer, size: number): number;
/**
 * With this function you can send a data "packet" through the network. The function will return the number of bytes of data sent, or a number less than 0 if the send has failed. Note that the final size of the data being sent by this function will also include the GameMaker header information, which is an additional 12 bytes.
 */
declare function network_send_packet(socket: Id.Socket, buffer: Id.Buffer, size: number): number;
/**
 * With this function you can send a "raw" data packet through the network. The function will return the number of bytes of data sent, or a number less than 0 if the send has failed. Note that the data is sent "raw", i.e. it is not formatted by GameMaker in any way.
 */
declare function network_send_raw(socket: Id.Socket, buffer: Id.Buffer, size: number, options?: number): number;
/**
 * With this function you can send data over the network using UDP to a server. The function will return the number of bytes of data sent, or a number less than 0 if the send has failed. Note that the final size of the data being sent by this function will also include the GameMaker header information, which is an additional 12 bytes.
 */
declare function network_send_udp(socket: Id.Socket, url: string, port: number, buffer: Id.Buffer, size: number): number;
/**
 * With this function you can send data over the network using UDP to a server. The function will return the number of bytes of data sent, or a number less than 0 if the send has failed. Note that the data is sent "raw", i.e. it is not formatted by GameMaker in any way.
 */
declare function network_send_udp_raw(socket: Id.Socket, url: string, port: number, buffer: Id.Buffer, size: number): number;
/**
 * With this function you can set different network configurations.
 */
declare function network_set_config(config_value: Constant.NetworkConfig, value1: unknown, value2?: unknown): string;
/**
 * With this function you can set the timeout for reading and writing data to/from a server through the given socket. Note that the timeout does not generate any type of event, so you will need to deal with timeouts yourself using alarms (for example).
 */
declare function network_set_timeout(socket: Id.Socket, read_timeout: number, write_timeout: number): undefined;
/**
 * This function returns the value of the environment variable with the given name.
 */
declare function environment_get_variable(name: string): string;
/**
 * If you have created an external function call to a dll or dylib using external_define(), you can use this function to then call it. You supply the name of the previously defined function as well as each of the arguments it requires (each argument must be of the correct type, either real or string) and the function returns the result of the external call.
 */
declare function external_call(id: Id.ExternalCall, ___?: unknown): unknown;
/**
 * This function can be used to define an external function call to a specific dll (for Windows) or dylib (for Mac). This file can be either an included file or part of an extension.
 */
declare function external_define(dll: string, name: string, calltype: Constant.ExternalCallType, restype: Constant.ExternalArgumentType, argnumb: number, ___?: Constant.ExternalArgumentType): Id.ExternalCall;
/**
 * This function frees the memory associated with the dll or dylib with the given name.
 */
declare function external_free(id: string): undefined;
/**
 * This function affects how the given target compiles your code and should be called with the different commands to further optimise the final compilation of your project. These commands are effectively pre-processed before the game is compiled and so the function can be placed anywhere in your project and it will still be processed before the game is fully compiled.
 */
declare function gml_pragma(command: string, ___?: GML.ArgumentIdentity): undefined;
/**
 * This function sets whether the game is running in release mode. Enabling release mode will disable certain internal error checks at runtime.
 */
declare function gml_release_mode(flag: boolean): undefined;
/**
 * With this function you can check to see if a specific permission has been granted to the game by the user. The function returns one of os_permission_granted, os_permission_denied, os_permission_denied_dont_request. See Android documentation for the permissions that can be requested.
 */
declare function os_check_permission(permission: string): number;
/**
 * This function returns the name (as a string) of the currently selected configuration for your game.
 */
declare function os_get_config(): string;
/**
 * This function returns a DS Map with detailed information about the OS that the game is running on. The exact information returned will depend on the OS and the device.
 */
declare function os_get_info(): Id.DsMap;
/**
 * This function returns a string with the two letter Language Code for the OS that is running the game, as set by the ISO639 standard. If the information is not available, the function will return an empty string "", or "en" for "English" language.
 */
declare function os_get_language(): string;
/**
 * This function returns a string with the two or three letter Regional Code for the OS that is running the game, as set by the ISO3166-1 standard. If the information is not available, it will hold simply an empty string "".
 */
declare function os_get_region(): string;
/**
 * With this function you can check if your device currently has an internet connection. Depending on the value of the attempt_connection argument and the OS, it may attempt to make a connection before returning a value.
 */
declare function os_is_network_connected(attempt_connection?: Constant.NetworkConnectType): boolean;
/**
 * You can use this function to check if the device the game is running on is paused or not.
 */
declare function os_is_paused(): boolean;
/**
 * With this function you can "lock" your device to the current orientation until such time as you "free" it to allow all Game Options enabled orientations again for that target platform. Note that you likely want to confirm the orientation is as desired before locking.
 */
declare function os_lock_orientation(flag: boolean): undefined;
/**
 * With this function you can "lock" your device to the current orientation until such time as you "free" it to allow all Game Options enabled orientations again for that target platform. Note that you likely want to confirm the orientation is as desired before locking.
 */
declare function os_set_orientation_lock(landscape_enable: boolean, portrait_enable: boolean): undefined;
/**
 * With this function you can turn on or off the power saving features of the device. This is important as certain games (for example those that use the tilt functions) may not generate events that the OS can interpret as being user input and so shut down the screen or exit the game. By setting this function to false you can disable the power saving features and ensure that the screen (and game) are always functioning.
 */
declare function os_powersave_enable(flag: boolean): undefined;
/**
 * This function returns the number of command-line parameters passed to the game. Note that this function works on the HTML5 platform, retrieving the URL parameters.
 */
declare function parameter_count(): number;
/**
 * This function returns the value of the command-line parameter at the given position. Note that this function works on the HTML5 platform, retrieving the URL parameters.
 */
declare function parameter_string(n: number): string;
/**
 * This function is used to retrieve the resolution of the Windows thread scheduler in milliseconds. If the scheduler's resolution is set to the default value (as set by Windows), the function will return -1.
 */
declare function scheduler_resolution_get(): number;
/**
 * This function is used to change the resolution of the Windows thread scheduler. The resolution value supplied in the argument needs to be in milliseconds.
 */
declare function scheduler_resolution_set(milliseconds: number): undefined;
/**
 * This function is used to toggle physics debug messages and errors.
 */
declare function physics_debug(enable: boolean): undefined;
/**
 * This function checks the physics fixtures of the objects given against the ray specified, it will return an array of structures that will give the hitPointX, hitPointY (the room coordinates of the intersection), normalX, normalY (the normal of the intersection), fraction (the normalised distance down the ray of the intersection)
 */
declare function physics_raycast(xStart: number, yStart: number, xEnd: number, yEnd: number, ids: Asset.GMObject | Id.Instance | Array<Id.Instance> | Array<Asset.GMObject>, all_hits?: boolean, max_fraction?: number): unknown[];
/**
 * This function can be used to set custom mass and inertia values for a physics-enabled instance. Note that the mass is calculated in real world weight (i.e.:kilograms) and you should always try and keep values realistic for what you are modelling.
 */
declare function physics_mass_properties(mass: number, local_center_x: number, local_center_y: number, inertia: number): undefined;
/**
 * This function can be used to check if the physical body of the calling instance (i.e. any of its bound fixtures) overlaps, or will overlap, when rotated and placed at a given position in the room.
 */
declare function physics_test_overlap(xpos: number, ypos: number, angle: number, obj: Id.Instance | Asset.GMObject | Constant.Other | Constant.All): boolean;
/**
 * This function defines the points of a polygon which has previously been set to the fixture using either physics_fixture_set_polygon_shape() or it can be used to add points to a chain of edge fixtures using the function physics_fixture_set_chain_shape(). Note that for a polygon shape, the points are relative to the origin of the fixture, with the (0, 0) position of the x/y axis being the centre, and the subsequent coordinates being calculated as usual in GameMaker with down/right being +x,+y and up/left being -x,-y.
 */
declare function physics_fixture_add_point(fixture: Id.PhysicsFixture, xpos: number, ypos: number): undefined;
/**
 * This function binds the given fixture to the given target object or instance and returns the ID of the bound fixture.
 */
declare function physics_fixture_bind(fixture: Id.PhysicsFixture, target: Id.Instance | Asset.GMObject | Constant.Other | Constant.All): Id.PhysicsFixtureBound;
/**
 * This function binds the given fixture to the given target object or instance at an offset and returns the ID of the bound fixture. Note that a fixture can only support a single offset, as adding multiple offsets to a single fixture is not supported by Box2D.
 */
declare function physics_fixture_bind_ext(fixture: Id.PhysicsFixture, target: Id.Instance | Asset.GMObject | Constant.Other | Constant.All, xoffset: number, yoffset: number): Id.PhysicsFixtureBound;
/**
 * This function creates a new physics fixture.
 */
declare function physics_fixture_create(): Id.PhysicsFixture;
/**
 * This function deletes the given fixture, freeing the memory it is using.
 */
declare function physics_fixture_delete(fixture: Id.PhysicsFixture): undefined;
/**
 * This function sets the angular damping of the given fixture. Normally you will use a damping value between 0 and 1, but you can use any non-negative value if required.
 */
declare function physics_fixture_set_angular_damping(fixture: Id.PhysicsFixture, damping: number): undefined;
/**
 * This function sets whether the given physics fixture should be "awake" (whether it is processing events and interacting with the surrounding instances).
 */
declare function physics_fixture_set_awake(fixture: Id.PhysicsFixture, flag: boolean): undefined;
/**
 * This function defines a box shape for the given fixture. It takes the half width and height as the physics world uses this value far more than whole width/height values to determine things like collisions.
 */
declare function physics_fixture_set_box_shape(fixture: Id.PhysicsFixture, half_width: number, half_height: number): undefined;
/**
 * This function tells the given fixture to use a "chain" shape, which consists of a number of points that are connected using edge shapes. The points are specified after calling this function using physics_fixture_add_point().
 */
declare function physics_fixture_set_chain_shape(fixture: Id.PhysicsFixture, loop: boolean): undefined;
/**
 * This function defines a circle shape for your fixture with a radius defined by the argument "rad".
 */
declare function physics_fixture_set_circle_shape(fixture: Id.PhysicsFixture, rad: number): undefined;
/**
 * This function assigns a collision group to the given fixture.
 */
declare function physics_fixture_set_collision_group(fixture: Id.PhysicsFixture, group: number): undefined;
/**
 * This function sets the density of the given physics fixture.
 */
declare function physics_fixture_set_density(fixture: Id.PhysicsFixture, density: number): undefined;
/**
 * This function defines an "edge" shape for the given fixture.
 */
declare function physics_fixture_set_edge_shape(fixture: Id.PhysicsFixture, local_x1: number, local_y1: number, local_x2: number, local_y2: number): undefined;
/**
 * This function sets the friction of the given physics fixture. Note that the friction is usually set to a value between 0 and 1, but you can use any non-negative value if required.
 */
declare function physics_fixture_set_friction(fixture: Id.PhysicsFixture, friction: number): undefined;
/**
 * This function sets the given physics fixture to be kinematic (a kinematic fixture will not be affected by any forces).
 */
declare function physics_fixture_set_kinematic(fixture: Id.PhysicsFixture): undefined;
/**
 * This function sets the linear damping of the given fixture. Damping parameters should be between 0 and infinity, with 0 meaning no damping, and infinity meaning full damping. Normally you will use a damping value between 0 and 1, but you can use any non-negative value if required.
 */
declare function physics_fixture_set_linear_damping(fixture: Id.PhysicsFixture, damping: number): undefined;
/**
 * This function tells the given fixture to use a polygon shape. The points must be specified after calling this function using physics_fixture_add_point().
 */
declare function physics_fixture_set_polygon_shape(fixture: Id.PhysicsFixture): undefined;
/**
 * This function sets the restitution of the given physics fixture.
 */
declare function physics_fixture_set_restitution(fixture: Id.PhysicsFixture, restitution: number): undefined;
/**
 * This function sets whether the given fixture should be a sensor.
 */
declare function physics_fixture_set_sensor(fixture: Id.PhysicsFixture, state: boolean): undefined;
/**
 * This function returns the density of the given bound fixture.
 */
declare function physics_get_density(fixture: Id.PhysicsFixtureBound): number;
/**
 * This function returns the restitution of the given bound fixture.
 */
declare function physics_get_restitution(fixture: Id.PhysicsFixtureBound): number;
/**
 * This function removes (or "un-binds") a fixture from an instance or instances. This permits you to redefine a new fixture and bind that to the instance. In this way you can change the instance's physical properties without having to destroy and re-create it.
 */
declare function physics_remove_fixture(id: Id.Instance | Asset.GMObject, fixture: Id.PhysicsFixtureBound): undefined;
/**
 * This function sets the density value of the given bound fixture.
 */
declare function physics_set_density(fixture: Id.PhysicsFixtureBound, density: number): undefined;
/**
 * This function sets the friction value of the given bound fixture.
 */
declare function physics_set_friction(fixture: Id.PhysicsFixtureBound, friction: number): undefined;
/**
 * This function sets the restitution value of the given bound fixture.
 */
declare function physics_set_restitution(fixture: Id.PhysicsFixtureBound, restitution: number): undefined;
/**
 * This function will give an angular impulse to a physics-enabled instance. This impulse will set the angular rotation by the amount given, ignoring the current torque, essentially setting the amount of "spin" that a fixture has.
 */
declare function physics_apply_angular_impulse(impulse: number): undefined;
/**
 * This function applies a force to the current physics-enabled instance.
 */
declare function physics_apply_force(xpos: number, ypos: number, xforce: number, yforce: number): undefined;
/**
 * This function applies an impulse to the current physics-enabled instance.
 */
declare function physics_apply_impulse(xpos: number, ypos: number, ximpulse: number, yimpulse: number): undefined;
/**
 * This function applies a local force to the current physics-enabled instance.
 */
declare function physics_apply_local_force(xlocal: number, ylocal: number, xforce: number, yforce: number): undefined;
/**
 * This function applies a local impulse to the current physics-enabled instance.
 */
declare function physics_apply_local_impulse(xpos: number, ypos: number, ximpulse: number, yimpulse: number): undefined;
/**
 * This function applies a torque to the given physics-enabled instance.
 */
declare function physics_apply_torque(torque: number): undefined;
/**
 * This function deletes the given physics joint.
 */
declare function physics_joint_delete(joint: Id.PhysicsJoint): undefined;
/**
 * This function creates a distance joint between two physics instances. A distance joint is one of the simplest joints and says that the distance between two points on two instances must be constant.
 */
declare function physics_joint_distance_create(inst1: Id.Instance, inst2: Id.Instance, w_anchor1_x: number, w_anchor1_y: number, w_anchor2_x: number, w_anchor2_y: number, col: boolean): Id.PhysicsJoint;
/**
 * This function sets whether to enable or disable the motor on a physics joint that has a motor.
 */
declare function physics_joint_enable_motor(joint: Id.PhysicsJoint, motor: boolean): undefined;
/**
 * This function creates a friction joint between two physics instances. A friction joint is a bit different to all other joints in the physics simulation in that the connection created will not constrain the instances' position or movement, but rather their speed and rotation.
 */
declare function physics_joint_friction_create(inst1: Id.Instance, inst2: Id.Instance, anchor_x: number, anchor_y: number, max_force: number, max_torque: number, col: boolean): Id.PhysicsJoint;
/**
 * This function creates a gear joint between two physics instances.
 */
declare function physics_joint_gear_create(inst1: Id.Instance, inst2: Id.Instance, joint_1: Id.PhysicsJoint, joint_2: Id.PhysicsJoint, ratio: number): Id.PhysicsJoint;
/**
 * This function returns the value of the joint property corresponding to the given joint constant.
 */
declare function physics_joint_get_value(joint: Id.PhysicsJoint, value: Constant.PhysicsJointProperty): number;
/**
 * This function creates a prismatic joint between two physics instances. Like a revolute joint, the prismatic joint only has one degree of freedom, but with this joint it is directional relative to an axis rather than rotational and actually prevents any form of rotation.
 */
declare function physics_joint_prismatic_create(inst1: Id.Instance, inst2: Id.Instance, w_anchor_x: number, w_anchor_y: number, w_axis_x: number, w_axis_y: number, lower_trans_limit: number, upper_trans_limit: number, limit: boolean, max_motor_force: number, motor_speed: number, motor: boolean, col: boolean): Id.PhysicsJoint;
/**
 * This function creates a pulley joint between two physics instances. A pulley joint is used to connect two instances within the physics world in such a way that moving one will directly influence the movement of the other.
 */
declare function physics_joint_pulley_create(inst1: Id.Instance, inst2: Id.Instance, w_anchor1_x: number, w_anchor1_y: number, w_anchor2_x: number, w_anchor2_y: number, l_anchor1_x: Id.Instance, l_anchor1_y: Id.Instance, l_anchor2_x: Id.Instance, l_anchor2_y: Id.Instance, ratio: Id.Instance, col: boolean): Id.PhysicsJoint;
/**
 * This function creates a revolute joint between two physics instances. A revolute joint forces two bodies to share a common anchor point (often called a hinge point) and the joint has a single degree of freedom - the relative rotation of the two bodies around this point.
 */
declare function physics_joint_revolute_create(inst1: Id.Instance, inst2: Id.Instance, w_anchor_x: number, w_anchor_y: number, ang_min_limit: number, ang_max_limit: number, ang_limit: boolean, max_motor_torque: number, motor_speed: number, motor: boolean, col: boolean): Id.PhysicsJoint;
/**
 * This function creates a rope joint between two physics instances. A rope joint is one which is used to join two instances that you want to keep a constant distance apart, no matter what other forces are acting on it.
 */
declare function physics_joint_rope_create(inst1: Id.Instance, inst2: Id.Instance, w_anchor1_x: number, w_anchor1_y: number, w_anchor2_x: number, w_anchor2_y: number, maxlength: number, col: boolean): Id.PhysicsJoint;
/**
 * This function sets the value of the joint property corresponding to the given joint constant to the given value.
 */
declare function physics_joint_set_value(joint: Id.PhysicsJoint, field: Constant.PhysicsJointProperty, value: unknown): undefined;
/**
 * This function creates a weld joint between two physics instances. The weld joint is designed to attach two fixtures together in a strong, yet flexible bond and will permit flexing between the two joined fixtures but without the stretching associated with, for example, a distance joint, and will always try to "spring" back to the reference angle when put under any stress or load.
 */
declare function physics_joint_weld_create(inst1: Id.Instance, inst2: Id.Instance, anchor_x: number, anchor_y: number, ref_angle: number, freq_hz: number, damping_ratio: number, col: boolean): Id.PhysicsJoint;
/**
 * This function creates a wheel joint between two physics instances. A wheel joint combines a piston and a revolute joint, like a wheel mounted on the shock absorber of a car.
 */
declare function physics_joint_wheel_create(inst1: Id.Instance, inst2: Id.Instance, anchor_x: number, anchor_y: number, axis_x: number, axis_y: number, enablemotor: boolean, max_motor_torque: number, motor_speed: number, freq_hz: number, damping_ratio: number, col: boolean): Id.PhysicsJoint;
/**
 * This function will return the number of particles that are active in a physics-enabled room.
 */
declare function physics_particle_count(): number;
/**
 * With this function you can create a single particle anywhere within your game room, setting certain flags and properties.
 */
declare function physics_particle_create(flags: Constant.PhysicsParticleFlag, x: number, y: number, xv: number, yv: number, col: Constant.Color, alpha: number, category: number): Id.PhysicsParticle;
/**
 * With this function you can delete (remove) a particle from the physics simulation in the current room.
 */
declare function physics_particle_delete(ind: Id.PhysicsParticle): undefined;
/**
 * With this function you can delete (remove) all the particles that fall within the bounds of the defined rectangular area from the physics simulation in the current room.
 */
declare function physics_particle_delete_region_box(x: number, y: number, halfwidth: number, halfheight: number): undefined;
/**
 * With this function you can delete (remove) all the particles that fall within the bounds of the defined circular area from the physics simulation in the current room.
 */
declare function physics_particle_delete_region_circle(x: number, y: number, radius: number): undefined;
/**
 * With this function you can delete (remove) all the particles that fall within the bounds of the defined polygonal area from the physics simulation in the current room.
 */
declare function physics_particle_delete_region_poly(pointlist: Id.DsList): undefined;
/**
 * This function will draw a sprite at the position of all the particles that share the same user-defined category value, and that have flags which coincide with those set for the mask. The mask value is defined in the same way as you would define the flags when creating the particle, i.e.: using the bitwise or "|" to mask off the appropriate bits for each flag.
 */
declare function physics_particle_draw(typemask: number, category: number, sprite: Asset.GMSprite, subimg: number): undefined;
/**
 * This function will draw a sprite at the position of all the particles that share the same user-defined category value, and that have flags which coincide with those set for the mask. The mask value is defined in the same way as you would define the flags when creating the particles, i.e.: using the bitwise or "|" to mask off the appropriate bits for each flag.
 */
declare function physics_particle_draw_ext(typemask: number, category: number, sprite: Asset.GMSprite, subimg: number, xscale: number, yscale: number, ang: number, col: Constant.Color, alpha: number): undefined;
/**
 * With this function you can find out what the current linear damping is for particles in the physics simulation (you can set this value using physics_particle_set_damping()).
 */
declare function physics_particle_get_damping(): number;
/**
 * This function returns various pieces of information about each particle in the physics simulation using the given flags checked. The buffer used must have been created previously using the function buffer_create(), and should be of the "grow" type, with the size being approximately that of the expected return data.
 */
declare function physics_particle_get_data(buffer: Id.Buffer, flags: number): Id.Buffer;
/**
 * This function returns various pieces of information about a single particle in the physics simulation using the given flags checked. The particle index (its ID) is that which was returned by the function physics_particle_create(), and the buffer used must have been created previously using the function buffer_create(). The buffer should be of the "grow" type, with the size being approximately that of the expected return data.
 */
declare function physics_particle_get_data_particle(ind: number, buffer: Id.Buffer, flags: number): Id.Buffer;
/**
 * With this function you can find out what the current density is for particles in the physics simulation (you can set this value using physics_particle_set_density()).
 */
declare function physics_particle_get_density(): number;
/**
 * With this function you can find out what the current gravity scale factor is for particles in the physics simulation (you can set this value using physics_particle_set_gravity_scale()).
 */
declare function physics_particle_get_gravity_scale(): number;
/**
 * With this function you can retrieve the group flags for a group of particles. The group value is that which was returned when you created the group of particles using the function physics_particle_group_end(), and the function will return a value which is the combined value of the currently set flags.
 */
declare function physics_particle_get_group_flags(group: number): number;
/**
 * With this function you can find out what the current cap value is on particles permitted in the physics simulation (you can set this value using physics_particle_set_max_count()).
 */
declare function physics_particle_get_max_count(): number;
/**
 * With this function you can find out what the current radius (in pixels) is for particles in the physics simulation (you can set this value using physics_particle_set_radius()).
 */
declare function physics_particle_get_radius(): number;
/**
 * This function sets a point in the room to define the shape of a polygon which will be used to create a group of soft body particles. You must have previously signaled to GameMaker that you are going define a polygon shape using the function physics_particle_group_polygon() and then use this function to define the individual points of the polygon.
 */
declare function physics_particle_group_add_point(x: number, y: number): undefined;
/**
 * With this function you can create a group of particles in a room.
 */
declare function physics_particle_group_begin(flags: Constant.PhysicsParticleFlag, groupflags: Constant.PhysicsParticleGroupFlag, x: number, y: number, ang: number, xv: number, yv: number, ang_velocity: number, col: Constant.Color, alpha: number, strength: number, category: number): undefined;
/**
 * This function will set the shape of the particle group that is being created to a box shape.
 */
declare function physics_particle_group_box(halfwidth: number, halfheight: number): undefined;
/**
 * This function will set the shape of the particle group that is being created to a circle shape.
 */
declare function physics_particle_group_circle(radius: number): undefined;
/**
 * This function will return the number of particles that are active in a single group.
 */
declare function physics_particle_group_count(group: number): number;
/**
 * With this function you can delete (remove) a particle group from the physics simulation in the current room.
 */
declare function physics_particle_group_delete(ind: number): undefined;
/**
 * This function is used to end the definition of a particle group shape.
 */
declare function physics_particle_group_end(): Id.PhysicsParticleGroup;
/**
 * With this function you can retrieve the rotation (angle) in the room of a group of particles.
 */
declare function physics_particle_group_get_angle(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the angular velocity of a group of particles.
 */
declare function physics_particle_group_get_ang_vel(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the x component of the center of mass of an entire group of particles.
 */
declare function physics_particle_group_get_centre_x(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the y component of the center of mass of an entire group of particles.
 */
declare function physics_particle_group_get_centre_y(group: Id.PhysicsParticleGroup): number;
/**
 * This function returns various pieces of information about a group of particles in the physics simulation using the given flags checked.
 */
declare function physics_particle_group_get_data(group: Id.PhysicsParticleGroup, buffer: Id.Buffer, flags: number): Id.Buffer;
/**
 * With this function you can retrieve the inertia of an entire group of particles.
 */
declare function physics_particle_group_get_inertia(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the horizontal velocity of a group of particles.
 */
declare function physics_particle_group_get_vel_x(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the vertical velocity of a group of particles.
 */
declare function physics_particle_group_get_vel_y(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the x position in the room of a group of particles.
 */
declare function physics_particle_group_get_x(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can retrieve the y position in the room of a group of particles.
 */
declare function physics_particle_group_get_y(group: Id.PhysicsParticleGroup): number;
/**
 * With this function you can join two particle groups together, and the joined groups will then behave as if they were both part of a single entity.
 */
declare function physics_particle_group_join(to: Id.PhysicsParticleGroup, from: Id.PhysicsParticleGroup): undefined;
/**
 * This function will set the shape of the particle group that is being created to a polygon shape.
 */
declare function physics_particle_group_polygon(): undefined;
/**
 * With this function you can change the particle flags for a category of particles.
 */
declare function physics_particle_set_category_flags(category: number, flags: number): undefined;
/**
 * With this function you can set the linear damping of particles in the simulation.
 */
declare function physics_particle_set_damping(damping: number): undefined;
/**
 * With this function you can set the density of the particles in a physics simulation.
 */
declare function physics_particle_set_density(density: number): undefined;
/**
 * With this function you can change the particle flags for an individual particle.
 */
declare function physics_particle_set_flags(index: number, flags: number): number;
/**
 * With this function you can set the gravity scale factor for particles in the physics simulation.
 */
declare function physics_particle_set_gravity_scale(scale: number): undefined;
/**
 * With this function you can change the group flags for a group of particles.
 */
declare function physics_particle_set_group_flags(group: number, flags: number): undefined;
/**
 * This function will set the total permitted number of particles in a physics simulation.
 */
declare function physics_particle_set_max_count(count: number): undefined;
/**
 * With this function you can set the radius (in pixels) for the particles in a physics simulation.
 */
declare function physics_particle_set_radius(radius: number): undefined;
/**
 * This function debug-draws a visual representation of the current physics-enabled instance.
 */
declare function physics_draw_debug(): undefined;
/**
 * This function sets whether the physics simulation should be paused or not.
 */
declare function physics_pause_enable(flag: boolean): undefined;
/**
 * This function will associate a physics "world" with the room and all instances created in the room will behave using the physics that has been defined for them and the world itself.
 */
declare function physics_world_create(pixeltometrescale: number): undefined;
/**
 * This function will draw a representation of the physics world system of the room.
 */
declare function physics_world_draw_debug(flag: Constant.PhysicsDebugFlag): undefined;
/**
 * This function sets the gravity for the current physics world.
 */
declare function physics_world_gravity(xg: number, yg: number): undefined;
/**
 * This function sets the number of iterations per step that the physics system will perform.
 */
declare function physics_world_update_iterations(y1: number): undefined;
/**
 * This function sets the number of times per second that the physics system updates.
 */
declare function physics_world_update_speed(speed: number): undefined;
/**
 * This function returns a string containing the character with raw BYTE value set. This will not, and should not, be displayed, but it will save correctly to disk for use in encoding.
 */
declare function ansi_char(val: number): string;
/**
 * This function returns a string containing the character which relates to the input Unicode code for displaying. This character depends on the current drawing font's character set code page and if no font is set, it will use the default code page for the machine.
 */
declare function chr(val: number): string;
/**
 * This function will return a string of the text contained on the clipboard. If no text is stored it will return an empty string "".
 */
declare function clipboard_get_text(): string;
/**
 * This function will return true if the clipboard contains text or false if it does not.
 */
declare function clipboard_has_text(): boolean;
/**
 * This function will set the clipboard to hold the defined string. You can set it to an empty string "" to effectively clear the clipboard of text.
 */
declare function clipboard_set_text(string: string): undefined;
/**
 * This function takes a single character input string and returns the Unicode (UTF-8) value for that character. When used with the keyboard_check* functions, the input string can only be one character in length and can only be a number from 0 to 9 or a capitalised Roman character from A to Z.
 */
declare function ord(string: string): number;
/**
 * This function can be used to turn a given string into a real number. When using this function, numbers, minus signs, decimal points and exponential parts in the string are taken into account, while other characters (such as letters) will cause an error to be thrown. If a string has any other characters then you can use string_digits() to remove all non-numeric characters, before using this function to turn the resulting string into a real number.
 */
declare function real(string: unknown): number;
/**
 * With this function you can turn any value into a string. If the real number is an integer, it will be saved with no decimal places, otherwise, it will be saved with two decimal places. If you require more decimal places, then use the function string_format(). Also note that using this function on a variable storing an array, a data structure, or a struct will convert the contents of these variables into a string which can then be output to the console or saved to a file for debugging. You are also able to use a format string with "{x}" placeholders (i.e. {0},{1},...) where 'X' is the argument number after the format string (starting at 0).
 */
declare function string(val_or_format: unknown, ___?: GML.ArgumentIdentity): string;
/**
 * Returns the raw byte value as a real value at a given position in the given string.
 */
declare function string_byte_at(str: string, index: number): number;
/**
 * This function returns the number of bytes in a string, but you should note that due to their being held as UTF-8, this will not be equal to their string length.
 */
declare function string_byte_length(string: string): number;
/**
 * You can use this function to return a specific character at a specific position within a string, with the index starting at 1 for the first character. If no character is found or the string is shorter than the given index value, an empty string "" is returned, however if the given index is equal to or smaller than 0, then the first character of the string is returned.
 */
declare function string_char_at(str: string, index: number): string;
/**
 * With this function you can easily select a number of characters from within a string to be copied to another one. The first character in a string is always indexed as 1 and not 0 as you may expect, so to copy (for example) the first five characters of string you would have string_copy(str, 1, 5).
 */
declare function string_copy(str: string, index: number, count: number): string;
/**
 * This function will return the number of times the given substring appears within a specific string.
 */
declare function string_count(substr: string, str: string): number;
/**
 * You can use this function to remove a specific part of a string. You supply the input string and the start and end position within that string to remove characters (index starts at 1) and the function will return a new string without that section in it.
 */
declare function string_delete(str: string, index: number, count: number): string;
/**
 * You can use this function to parse a given string and get any numbers from it.
 */
declare function string_digits(string: string): string;
/**
 * Turns a real number into a string using your own formatting, where you can choose how many "places" are saved to the string and how many decimal places are saved also.
 */
declare function string_format(val: number, tot: number, dec: number): string;
/**
 * This function returns a string where the "#" symbol has been converted into a new line.
 */
declare function string_hash_to_newline(string: string): string;
/**
 * This function will return the height (in pixels) of the input string, taking into account the line separation and any line breaks the text may have.
 */
declare function string_height(string: string): number;
/**
 * This function will return the height (in pixels) of the input string, taking into account the line separation and line break width (which is defined as the number of pixels that the string can occupy before a line break is inserted).
 */
declare function string_height_ext(string: string, sep: number, w: number): number;
/**
 * With this function you can create a new string made up of two strings, where one has been inserted into the other at a given position. Keep in mind when calculating the position to insert into that strings are indexed from 1, so the first character in a string is 1 and not 0 as you may expect.
 */
declare function string_insert(substr: string, str: string, index: number): string;
/**
 * This function will return the character position of an instance of a substring within a string, searching from the end of the string to the beginning (so the reverse of string_pos()). The function will return 0 if the search string is not found, or the position of the first character of the search string if it is.
 */
declare function string_last_pos(substr: string, str: string): number;
/**
 * This function will return the character position of an instance of a substring within a string, searching backwards through the string from the position given as the starting position. The function will return 0 if the search string is not found, or the position of the first character of the search string if it is.
 */
declare function string_last_pos_ext(substr: string, str: string, start_pos: number): number;
/**
 * This function returns the number of characters in a given string.
 */
declare function string_length(string: string): number;
/**
 * With this function you can remove all characters that are not classed as letters.
 */
declare function string_letters(string: string): string;
/**
 * This function will return a copy of a given string with everything but its letters and digits removed, which means it can be used to remove any unwanted characters (like "#" or "?") from, for example, a login name or a password.
 */
declare function string_lettersdigits(string: string): string;
/**
 * With this function you can force a string to contain only lowercase characters.
 */
declare function string_lower(string: string): string;
/**
 * You can use this function to return a specific character code at a specific position within a string, with the index starting at 1 for the first character. If no character is found or the string is shorter than the value given to index, -1 is returned.
 */
declare function string_ord_at(str: string, index: number): number;
/**
 * This function will return the character position of an instance of a substring within a string, searching from the beginning of the string (to search from the end, use the function string_last_pos()). The function will return 0 if it's not found at all, or the position of the first character of the substring if it is found.
 */
declare function string_pos(substr: string, str: string): number;
/**
 * This function will return the character position of an instance of a substring within a string, searching forwards through the string from the position given as the starting position. The function will return 0 if the search string is not found, or the position of the first character of the search string if it is.
 */
declare function string_pos_ext(substr: string, str: string, start_pos: number): number;
/**
 * This function simply returns the same string repeated a given number of times over itself.
 */
declare function string_repeat(str: string, count: number): string;
/**
 * You can use this function to parse a string looking for a specific part, which can then be replaced by the new string that you have specified.
 */
declare function string_replace(str: string, substr: string, newstr: string): string;
/**
 * You can use this function to parse a string looking for specific parts, which can then be replaced by the new string that you have specified in all places that they occur.
 */
declare function string_replace_all(str: string, substr: string, newstr: string): string;
/**
 * This function sets a byte directly in a string (based on the UTF-8 format) and returns a copy of the string with the changes.
 */
declare function string_set_byte_at(str: string, pos: number, byte: number): string;
/**
 * With this function you can force a string to contain only uppercase characters.
 */
declare function string_upper(string: string): string;
/**
 * This function will return the width (in pixels) of the input string, taking into account any line breaks the text may have.
 */
declare function string_width(string: string): number;
/**
 * This function will return the maximum width (in pixels) of the input string, taking into account the line separation and line break width (which is defined as the number of pixels that the string can occupy before a line break is inserted). Separation and width can be set to -1 to get the default spacing.
 */
declare function string_width_ext(string: string, sep: number, w: number): number;
/**
 * This function returns a new string using a format string with placeholder information and an array of values. The placeholders should follow the format "{x}" where x is the index of the value in the array that it should be replaced with.
 */
declare function string_ext(format: string, val_array: unknown[]): string;
/**
 * This function removes whitespace from the beginning of a string (left). You can optionally provide an array of strings to be used for trimming if you want to remove something other than whitespace.
 */
declare function string_trim_start(str: string, substrs?: Array<string>): string;
/**
 * This function removes whitespace from the end of a string (right). You can optionally provide an array of strings to be used for trimming if you want to remove something other than whitespace.
 */
declare function string_trim_end(str: string, substrs?: Array<string>): string;
/**
 * This function removes whitespace from both ends of a string and returns a new string, without modifying the original string. You can optionally provide an array of strings to be used for trimming if you want to remove something other than whitespaces.
 */
declare function string_trim(str: string, substrs?: Array<string>): string;
/**
 * This function determines whether a string begins with the characters of a specified string, returning true or false as appropriate.
 */
declare function string_starts_with(str: string, substr: string): boolean;
/**
 * This function determines whether a string ends with the characters of a specified string, returning true or false as appropriate.
 */
declare function string_ends_with(str: string, substr: string): boolean;
/**
 * This function splits string into an ordered list of substrings by searching for the delimiter, puts these substrings into an array, and returns the array.
 */
declare function string_split(str: string, delimiter: string, remove_empty?: boolean, max_splits?: number): Array<string>;
/**
 * This function splits string into an ordered list of substrings by searching from an array of delimiters, puts these substrings into an array, and returns the array.
 */
declare function string_split_ext(str: string, delimiter_array: Array<string>, remove_empty?: boolean, max_splits?: number): Array<string>;
/**
 * This function joins a set of arguments using the provided delimiter, non-string values will be converted to string.
 */
declare function string_join(delimiter: string, ___: GML.ArgumentIdentity): string;
/**
 * This function joins the elements of an array using the provided delimiter, non-string values will be converted to string.
 */
declare function string_join_ext(delimiter: string, values_array: unknown[], offset?: number, length?: number): string;
/**
 * This function concatenates a set of arguments, non-string values will be converted to string.
 */
declare function string_concat(___: GML.ArgumentIdentity): string;
/**
 * This function concatenates a range of elements in an array, non-string values will be converted to string.
 */
declare function string_concat_ext(values_array: unknown[], offset?: number, length?: number): string;
/**
 * This function iterates over each character of a string calling a provided function. Note that the start position is 1-based.
 */
declare function string_foreach(str: string, func: GMLFunction, pos?: number, length?: number): undefined;
/**
 * With this function you can copy all or part of an array into another array at any position. If the data being copied exceeds the length of the destination array, the array will be extended to accept the data.
 */
declare function array_copy(dest: unknown[], dest_index: number, src: unknown[], src_index: number, length: number): undefined;
/**
 * With this function you can delete a value (or values) from an array at any given position.
 */
declare function array_delete(array: unknown[], index: number, number: number): undefined;
/**
 * With this function you can check to see if two arrays are equal (equivalent or the same). Note that this is not the same as checking if two arrays are the same using ==, which will not check to see if the two arrays hold equivalent values, but only to see if the arrays are referencing the same initial array.
 */
declare function array_equals(array1: unknown[], array2: unknown[]): boolean;
/**
 * With this function you can retrieve the value from an index in an array. Note that if the array index given is out of bounds then the game will crash with an error.
 */
declare function array_get(array: unknown[], index: number): unknown;
/**
 * With this function you can insert a value (or values) into an array at any given position.
 */
declare function array_insert(array: unknown[], index: number, ___: GML.ArgumentIdentity): undefined;
/**
 * With this function you can get the length (number of entries) of an array dimension. This function can also be used for multi-dimensional arrays, as long as you specify which dimension you want to get the length of when you supply the array index.
 */
declare function array_length(array: unknown[]): number;
/**
 * This function will remove the last element in the given array and return its value. If the array is empty undefined is returned.
 */
declare function array_pop(array: unknown[]): GML.ArgumentIdentity;
/**
 * With this function you can push a value (or values) onto the end of an array without having to know the length of the array.
 */
declare function array_push(array: unknown[], ___: GML.ArgumentIdentity): undefined;
/**
 * With this function you can resize an existing array dimension to a new size. Note that this function is designed for resizing an array down to a smaller length as you can resize up by simply setting a new index in the array. If you do use it to size up an array, any new indices will be set to the default value of 0.
 */
declare function array_resize(array: unknown[], new_size: number): undefined;
/**
 * With this function you can set the value of an index in an array to a value. This function can also be used for multi-dimensional arrays, as long as you specify which dimension you want to set when you supply the array index.
 */
declare function array_set(array: unknown[], index: number, value: unknown): undefined;
/**
 * With this function you can sort an array in ascending order or descending order or using a custom function to define the sort order.
 */
declare function array_sort(array: unknown[], sorttype_or_function: unknown): undefined;
/**
 * This function will remove the first element in the given array and return its value. If the array is empty undefined is returned.
 */
declare function array_shift(array: unknown[]): GML.ArgumentIdentity;
/**
 * With this function you can shuffle an array (or subsection), a new array is returned that is a copy of the original with the entries shuffled.
 */
declare function array_shuffle(array: unknown[], offset?: number, length?: number): unknown[];
/**
 * With this function you can shuffle an array (or subsection) in place, nothing is returned.
 */
declare function array_shuffle_ext(array: unknown[], offset?: number, length?: number): undefined;
/**
 * This function returns the first index at which a given element can be found in the array (or subsection). If the value is not found the function returns -1.
 */
declare function array_get_index(array: unknown[], value: unknown, offset?: number, length?: number): number;
/**
 * Determines whether an array includes a certain value among its entries, returning true or false as appropriate.
 */
declare function array_contains(array: unknown[], value: unknown, offset?: number, length?: number): boolean;
/**
 * Determines whether an array includes certain values among its entries, returning true or false as appropriate. The function doesn't account for order.
 */
declare function array_contains_ext(array: unknown[], values: unknown[], matchAll?: boolean, offset?: number, length?: number): boolean;
/**
 * With this function you can return the first element of the array, or undefined if the array is empty.
 */
declare function array_first(array: unknown[]): GML.ArgumentIdentity;
/**
 * With this function you can return the last element of the array, or undefined if the array is empty.
 */
declare function array_last(array: unknown[]): GML.ArgumentIdentity;
/**
 * With this function you can create an array of a given size, initialising each element with the provided function.
 */
declare function array_create_ext(size: number, function_: GMLFunction): unknown[];
/**
 * With this function you can find the index of the first element that returns true to the given predicate. This function allows a custom range definition and reverse order.
 */
declare function array_find_index(array: unknown[], function_: GMLFunction, offset?: number, length?: number): number;
/**
 * With this function you can check if any of the elements returns true to the given predicate. This function allows a custom range definition and reverse order.
 */
declare function array_any(array: unknown[], function_: GMLFunction, offset?: number, length?: number): boolean;
/**
 * With this function you can check if all of the elements return true to the given predicate. This function allows a custom range definition and reverse order.
 */
declare function array_all(array: unknown[], function_: GMLFunction, offset?: number, length?: number): boolean;
/**
 * With this function you can execute a method on all or a range of elements in the array. This function allows a custom range definition and reverse order.
 */
declare function array_foreach(array: unknown[], function_: GMLFunction, offset?: number, length?: number): undefined;
/**
 * With this function you can traverse the array/range performing a cumulative operation on its elements. This function allows a custom range definition and reverse order.
 */
declare function array_reduce(array: unknown[], function_: GMLFunction, init?: unknown, offset?: number, length?: number): unknown;
/**
 * With this function you can create a new array from elements of the current array while the predicate is matched. This function allows a custom range definition and reverse order.
 */
declare function array_copy_while(array: unknown[], function_: GMLFunction, offset?: number, length?: number): unknown[];
/**
 * With this function you can create a new array with only the elements that return true to the given predicate. This function allows a custom range definition and reverse order.
 */
declare function array_filter(array: unknown[], function_: GMLFunction, offset?: number, length?: number): unknown[];
/**
 * With this function you can mutate an existing array to filter the elements that return true to the given predicate. This function returns the number of filtered elements. The filtered elements will be padded to offset and order by the traversing direction. This function allows a custom range definition and reverse order.
 */
declare function array_filter_ext(array: unknown[], function_: GMLFunction, offset?: number, length?: number): number;
/**
 * With this function you can create a new array by mapping the current array elements using the given predicate. This function allows a custom range definition and reverse order.
 */
declare function array_map(array: unknown[], function_: GMLFunction, offset?: number, length?: number): unknown[];
/**
 * With this function you can mutate an existing array by mapping the element values using the given predicate. This function returns the number of mapped elements. The mapped elements will keep their original position on the array. This function allows a custom range definition and reverse order.
 */
declare function array_map_ext(array: unknown[], function_: GMLFunction, offset?: number, length?: number): number;
/**
 * With this function you can create a new array with only unique values. This function allows a custom range definition and reverse order.
 */
declare function array_unique(array: unknown[], offset?: number, length?: number): unknown[];
/**
 * With this function you can mutate an existing array with only unique value. This function returns the number of unique elements. The mapped elements will be padded to offset and order by the traversing direction. This function allows a custom range definition and reverse order.
 */
declare function array_unique_ext(array: unknown[], offset?: number, length?: number): number;
/**
 * With this function you can create a new array with the elements in reverse order. This function allows a custom range definition.
 */
declare function array_reverse(array: unknown[], offset?: number, length?: number): unknown[];
/**
 * With this function you can mutate an existing array reversing the elements order. This function returns the number of reversed elements. This function allows a custom range definition.
 */
declare function array_reverse_ext(array: unknown[], offset?: number, length?: number): number;
/**
 * With this function you can concatenate two or more arrays into a single one.
 */
declare function array_concat(array0: unknown[], ___: unknown[]): unknown[];
/**
 * With this function you can join two or more arrays into a single one, removing the duplicates.
 */
declare function array_union(array0: unknown[], ___: unknown[]): unknown[];
/**
 * With this function you can create an array of elements common to all the input arrays, removing duplicates.
 */
declare function array_intersection(array0: unknown[], ___: unknown[]): unknown[];
/**
 * This function will attempt to convert a given value into a boolean data type, where the value will be returned as true if it is greater than 0.5 and false otherwise.
 */
declare function bool(n: unknown): boolean;
/**
 * This function can be used to get the name of the function that was used to create a struct when the struct was created using a constructor function and the new operator. The function will return either a string with the function name or undefined. Note that if you pass the function a struct literal it will simply return the string "struct". This function can also be used to check if a struct reference is a weak reference or not, in which case the function will return the string "weakref" instead of the name of the function that created the struct for more information, see the function weak_ref_create()).
 */
declare function gml_instanceof(struct: Record<string, unknown>): string;
/**
 * This function returns whether the given struct is an "instance of" the given constructor. You can use this function to check if the constructor used to create your struct was the same one as you supplied in the second argument, or if it's a child constructor of your given constructor.
 */
declare function is_instanceof(struct: Record<string, unknown>, constructor_name: GMLFunction | Asset.GMScript): boolean;
/**
 * Returns the static struct for the given struct or function / script, returns undefined if no static struct is set.
 */
declare function static_get(struct: Record<string, unknown> | GMLFunction | Asset.GMScript): Record<string, unknown>;
/**
 * Sets the static struct on the given struct.
 */
declare function static_set(struct: Record<string, unknown>, static_struct: Record<string, unknown>): undefined;
/**
 * This function will attempt to convert a given value into a 64bit integer, where the value must be either a real, a string, an int64, an int32, or a ptr. Anything else will cause the game to crash with an error message.
 */
declare function int64(val: unknown): number;
/**
 * This function can be used to check and see if a variable holds an array (true) or not (false).
 */
declare function is_array(n: unknown): boolean;
/**
 * This function returns whether a given variable is a boolean (true or false) or not.
 */
declare function is_bool(n: unknown): boolean;
/**
 * This function returns whether a given variable can be called (either being a method or a valid function index).
 */
declare function is_callable(n: unknown): boolean;
/**
 * This function returns whether a given variable is a handle that references an internal type.
 */
declare function is_handle(n: unknown): boolean;
/**
 * This function returns whether a given variable is infinity (an infinite number) or not, returning true if it is, and false if it is not.
 */
declare function is_infinity(n: unknown): boolean;
/**
 * This function returns whether a given variable is a 32bit integer or not.
 */
declare function is_int32(n: unknown): boolean;
/**
 * This function returns whether a given variable is a 64bit integer or not.
 */
declare function is_int64(n: unknown): boolean;
/**
 * This function can be used to check and see if a variable is a method variable (true) or not (false).
 */
declare function is_method(n: unknown): boolean;
/**
 * This function returns whether a given variable is NaN (not a number) or not, returning true if it is, and false if it is not.
 */
declare function is_nan(n: unknown): boolean;
/**
 * This function returns whether a given variable is a numeric value (real, int32, int64 or boolean) or not.
 */
declare function is_numeric(n: unknown): boolean;
/**
 * This function returns whether a given variable is a pointer or not.
 */
declare function is_ptr(n: unknown): boolean;
/**
 * This function returns whether a given variable is a real number (single, double or integer) or not.
 */
declare function is_real(n: unknown): boolean;
/**
 * This function returns whether a given variable is a string or not.
 */
declare function is_string(n: unknown): boolean;
/**
 * This function checks if the supplied value is a struct.
 */
declare function is_struct(val: unknown): boolean;
/**
 * This function checks whether a given value is equal to the value undefined or not.
 */
declare function is_undefined(n: unknown): boolean;
/**
 * Returns the argument as a string, resolved at compile time.
 */
declare function nameof(name: unknown): string;
/**
 * With this function you can bind any function that has previously been defined to a given instance or struct, creating a method variable that can be used later. The function will return a method which can be called from the variable it is assigned to. Note that you can bind built-in functions as well as user-defined functions, and you can also supply the special constant undefined as the instance/struct argument meaning that the current self scope will be used for the binding.
 */
declare function method(struct_ref_or_instance_id: unknown, function_: GMLFunction): GMLFunction;
/**
 * With this function you can retrieve the script index for the script where the method was defined. If the method was not defined in a script then the function will return -1, otherwise it will return the index value for the script.
 */
declare function method_get_index(method: GMLFunction): Asset.GMScript;
/**
 * With this function you can retrieve the instance ID or struct reference which is the self context used when the method is called. If the variable is not a method then the function will return undefined.
 */
declare function method_get_self(method: GMLFunction): Record<string, unknown> | Id.Instance;
/**
 * This function will attempt to convert a given value into a pointer data type, where the value must be either a real, a string, an int64, an int32, or a ptr; anything else will cause the game to crash with an error message.
 */
declare function ptr(n: unknown): Pointer.Any;
/**
 * This function will attempt to convert a string into a handle data type, to be used when a handle has been converted to a string and you want to convert it back. Note: No validation is done on the value returned so it is not guaranteed to be valid.
 */
declare function handle_parse(value_string: string): Asset.Any;
/**
 * This function returns the data type of any given variable as a string.
 */
declare function gml_typeof(variable: unknown): string;
/**
 * This function can accept any kind of data as its first parameter, which represents the variable or data structure to be cloned (won't work for instances). The second parameter, "depth" is applicable only for arrays and structs and sets the level of depth to which the cloning process should be performed (with a maximum value of 128).
 */
declare function variable_clone(value: unknown, depth?: number): unknown;
/**
 * With this function you can compute the hash of a given struct or instance member allowing for faster access (see struct_get_from_hash() and struct_set_from_hash()).
 */
declare function variable_get_hash(name: unknown): number;
/**
 * With this function you can check whether a global scope variable exists or not.
 */
declare function variable_global_exists(name: string): boolean;
/**
 * With this function you can get the value from a given named global variable. The function will return the value held by the global variable or undefined if the variable does not exist.
 */
declare function variable_global_get(name: string): unknown;
/**
 * With this function you can set the value of a given global variable. If the global variable does not exist already in the game it will be created and then assigned the value.
 */
declare function variable_global_set(name: string, val: unknown): undefined;
/**
 * With this function you can check whether an instance scope variable exists or not.
 */
declare function variable_instance_exists(instance_id: Record<string, unknown> | Id.Instance, name: string): boolean;
/**
 * With this function you can get the value from a given named variable. The function will return the value held by the variable, or undefined if the variable does not exist.
 */
declare function variable_instance_get(instance_id: Record<string, unknown> | Id.Instance | Constant.All, name: string): unknown;
/**
 * With this function you can retrieve an array populated with the instance variable names for an instance, or the global variables for a game. When you pass in an instance ID value, each entry in the array will be a string of the variable name that corresponds to an instance scope variable that has been created in the instance. However if you pass in the keyword global, each entry in the array will be a string of the variable name that corresponds to a global scope variable.
 */
declare function variable_instance_get_names(instance_id_global: Record<string, unknown> | Id.Instance | Constant.All): Array<string>;
/**
 * With this function you can find the total number of variables defined for an instance. The function will return an integer value for the number of variables encountered, or -1 if no instance of the given ID exists.
 */
declare function variable_instance_names_count(instance_id: Record<string, unknown> | Id.Instance): number;
/**
 * With this function you can set the value of a given variable in an instance. If the variable does not exist already in the instance it will be created and then assigned the value.
 */
declare function variable_instance_set(instance_id: Record<string, unknown> | Id.Instance, name: string, val: unknown): undefined;
/**
 * With this function you can check whether a variable exists within the given struct or not.
 */
declare function variable_struct_exists(struct: Record<string, unknown>, name: unknown): boolean;
/**
 * With this function you can get the value from a given named variable within a struct. The function will return the value held by the variable or undefined if the named variable does not exist.
 */
declare function variable_struct_get(struct: Record<string, unknown>, name: unknown): unknown;
/**
 * With this function you can retrieve an array populated with the variable names from a struct.
 */
declare function variable_struct_get_names(struct: Record<string, unknown>): Array<string>;
/**
 * With this function you can find the total number of variables defined for a struct. The function will return an integer value for the number of variables encountered, or -1 if no struct of the given ID exists.
 */
declare function variable_struct_names_count(struct_id: Record<string, unknown>): number;
/**
 * With this function you can remove a variable from a struct.
 */
declare function variable_struct_remove(struct: Record<string, unknown>, name: unknown): undefined;
/**
 * With this function you can set the value of a given variable in a struct. If the variable does not exist already in the struct it will be created and then assigned the value.
 */
declare function variable_struct_set(struct: Record<string, unknown>, name: unknown, val: unknown): undefined;
/**
 * With this function you can check whether a variable exists within the given struct or not.
 */
declare function struct_exists(struct: Record<string, unknown>, name: string): boolean;
/**
 * With this function you can check whether a variable exists within the given struct or not.
 */
declare function struct_exists_from_hash(struct: Record<string, unknown>, hash: number): boolean;
/**
 * With this function you can execute a method on all of the members in the struct.
 */
declare function struct_foreach(struct: Record<string, unknown>, func: GMLFunction): undefined;
/**
 * With this function you can get the value from a given named variable within a struct. The function will return the value held by the variable or undefined if the named variable does not exist.
 */
declare function struct_get(struct: Record<string, unknown>, name: string): unknown;
/**
 * With this function you can get the value from a given named variable within a struct. The function will return the value held by the variable or undefined if the named variable does not exist.
 */
declare function struct_get_from_hash(struct: Record<string, unknown>, hash: number): unknown;
/**
 * With this function you can retrieve an array populated with the variable names from a struct.
 */
declare function struct_get_names(struct: Record<string, unknown>): Array<string>;
/**
 * With this function you can find the total number of variables defined for a struct. The function will return an integer value for the number of variables encountered, or -1 if no struct of the given ID exists.
 */
declare function struct_names_count(struct_id: Record<string, unknown>): number;
/**
 * With this function you can remove a variable from a struct.
 */
declare function struct_remove(struct: Record<string, unknown>, name: string): undefined;
/**
 * With this function you can remove a variable from a struct.
 */
declare function struct_remove_from_hash(struct: Record<string, unknown>, hash: number): undefined;
/**
 * With this function you can set the value of a given variable in a struct. If the variable does not exist already in the struct it will be created and then assigned the value.
 */
declare function struct_set(struct: Record<string, unknown>, name: string, val: unknown): undefined;
/**
 * With this function you can set the value of a given variable in a struct. If the variable does not exist already in the struct it will be created and then assigned the value.
 */
declare function struct_set_from_hash(struct: Record<string, unknown>, hash: number, val: unknown): undefined;
/**
 * This function will send the specified text to the analytics provider that you have set up through the HTML5 Game Options. This function can be used to create a custom analytic to track something outside of the scope of the provider being used.
 * @deprecated
 */
declare function analytics_event(string: string): undefined;
/**
 * This function will send the specified text to the analytics provider that you have set up through the HTML5 Game Options. This function can be used to create a custom analytic to track something outside of the scope of the provider being used, and will also accept custom parameter/value pairs, where the parameter is a string and the value a real number. For Google Analytics, you can only add in one extra pair while Flurry will accept up to 7.
 * @deprecated
 */
declare function analytics_event_ext(string: string, string_param_0__9_: unknown, value_0___9_: unknown, ___?: unknown): undefined;
/**
 * With this function you can set whether the browser window should capture all input (set it to false) or whether the game should capture the input (set it to true). Note that this function is for use with the HTML5 module only.
 */
declare function browser_input_capture(enable: boolean): undefined;
/**
 * With this function you can create a custom, clickable, icon that acts as a "button" outside of the game canvas, but within the browser window itself. This function is very useful to prevent the browser creating a pop-up window when clicking on the button as it is all done through GameMaker itself.
 */
declare function clickable_add(x: number, y: number, tpe: number, url: string, target: string, params: unknown): number;
/**
 * With this function you can create a custom, clickable, icon that acts as a "button" outside of the game canvas, but within the browser window itself. This function is very useful to prevent the browser creating a pop-up window when clicking on the button as it is all done through GameMaker itself.
 */
declare function clickable_add_ext(x: number, y: number, tpe: number, url: string, target: string, params: unknown, alpha: number, scale: number): number;
/**
 * With this function you can change the sprite and position of a clickable icon previously created with clickable_add(). Please note that the position is based on the window, not the canvas, (0, 0) position and that the sprite must be referenced directly from the texture page (see: sprite_get_tpe()).
 */
declare function clickable_change(index: number, tpe: number, x: number, y: number): undefined;
/**
 * With this function you can change the sprite and position of a clickable icon previously created with clickable_add(). Bear in mind that the position is based on the window, not the canvas, (0, 0) position and that the sprite must be referenced directly from the texture page (see: sprite_get_tpe()).
 */
declare function clickable_change_ext(index: number, tpe: number, x: number, y: number, scale: number, alpha: number): undefined;
/**
 * This function must be used to remove a clickable icon previously created with clickable_add() from the game window.
 */
declare function clickable_delete(index: number): undefined;
/**
 * This function returns whether a clickable DOM icon has been created with the specified index exists or not. Please note, that the value used for checking must have been initialised previously or else you will get an error causing GameMaker to close.
 */
declare function clickable_exists(index: number): boolean;
/**
 * This function lets you set the CSS style properties for the given button via the key/value pairs in the provided DS Map.
 */
declare function clickable_set_style(index: number, map: undefined): undefined;
/**
 * You can use this to get the domain where your HTML5 game is being played.
 */
declare function url_get_domain(): string;
/**
 * This will open the specified URL on the browser of the chosen target device, or, if you are using the HTML5 module, in the currently open browser.
 */
declare function url_open(url: string): undefined;
/**
 * This will open the specified URL on the browser of the chosen target device, or, if you are using the HTML5 module, in the currently open browser.
 */
declare function url_open_ext(url: string, target: string): undefined;
/**
 * This will open the specified URL on the browser of the chosen target device, or, if you are using the HTML5 module, in the currently open browser.
 */
declare function url_open_full(url: string, target: string, options: string): undefined;
/**
 * @deprecated
 */
declare function array_length_1d(variable: unknown[]): number;
/**
 * @deprecated
 */
declare function array_length_2d(variable: unknown[], index: number): number;
/**
 * @deprecated
 */
declare function array_height_2d(variable: unknown[]): number;
/**
 * This function sets the seed to a random value. Should you need to keep a consistent value over a number of runs of a game, you should be using random_set_seed().
 */
declare function randomize(): undefined;
/**
 * This function returns the normalized dot product of two 2D vectors specified as (x1, y1) and (x2, y2).
 */
declare function dot_product_normalized(x1: number, y1: number, x2: number, y2: number): number;
/**
 * This function returns the normalized dot product of two 3D vectors, specified as (x1, y1, z1) and (x2, y2, z2).
 */
declare function dot_product_3d_normalized(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number;
/**
 * With this function you can set the base draw color for the game. This value will affect all further drawing where appropriate, including fonts, forms, primitives and 3D. If any of those assets are drawn with their own color value changed, this value will be ignored.
 */
declare function draw_set_color(col: Constant.Color): undefined;
/**
 * This function returns the current draw color which is used for drawing forms, text, primitives and untextured 3D models. This can be set with the draw_set_color() function.
 */
declare function draw_get_color(): Constant.Color;
/**
 * With this function you can take two colors and then merge them together to make a new color. The amount of each of the component colors can be defined by changing the "amount" argument, where a value of 0 will return the first color (col1), a value of 1 will return the second color (col2) and a value in between will return the corresponding mix. For example, a value of 0.5 will mix the two colors equally.
 */
declare function merge_color(col1: Constant.Color, col2: Constant.Color, amount: number): Constant.Color;
/**
 * This function creates a color based on the red, green and blue components.
 */
declare function make_color_rgb(red: number, green: number, blue: number): Constant.Color;
/**
 * This function creates a color based on the hue, saturation and value components.
 */
declare function make_color_hsv(hue: number, sat: number, val: number): Constant.Color;
/**
 * This function returns the amount of red used to make the given color, with the value being between 0 and 255, where 0 is no red and 255 is all red.
 */
declare function color_get_red(col: Constant.Color): number;
/**
 * This function returns the amount of green used to make the given color, with the value being between 0 and 255, where 0 is no green and 255 is all green.
 */
declare function color_get_green(col: Constant.Color): number;
/**
 * This function returns the amount of blue used to make the given color, with the value being between 0 and 255, where 0 is no blue and 255 is all blue.
 */
declare function color_get_blue(col: Constant.Color): number;
/**
 * This function will return the hue of the given color. This is the "pure" color tone which is part of the hue, saturation and value (luminosity) method for defining a color.
 */
declare function color_get_hue(col: Constant.Color): number;
/**
 * This function will return the saturation of the given color. This is the amount of the color tone that is mixed into the final color and is part of the hue, saturation and value (luminosity) method for defining a color.
 */
declare function color_get_saturation(col: Constant.Color): number;
/**
 * This function will return the value (luminosity) of the given color. This is the amount of the "light" that is mixed into the final color and is part of the hue, saturation and value method for defining a color.
 */
declare function color_get_value(col: Constant.Color): number;
/**
 * This function will draw text in a similar way to draw_text(), only now you can choose the colors to use for coloring the text as well as the alpha value, and these new values will be used instead of the base drawing color and alpha.
 */
declare function draw_text_color(x: number, y: number, string: unknown, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_ext() and draw_text_color() functions, permitting you to define gradient colors for text as well as the line spacing and maximum width per line all together.
 */
declare function draw_text_ext_color(x: number, y: number, string: unknown, sep: number, w: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_transformed() and draw_text_color() functions, permitting you to scale and rotate text as well as color it with a gradient fill and change its alpha value, ignoring the base alpha and color settings for drawing.
 */
declare function draw_text_transformed_color(x: number, y: number, string: unknown, xscale: number, yscale: number, angle: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * This function is a combination of the base draw_text() function with the draw_text_ext(), draw_text_transformed() and draw_text_color() functions.
 */
declare function draw_text_ext_transformed_color(x: number, y: number, string: unknown, sep: number, w: number, xscale: number, yscale: number, angle: number, c1: Constant.Color, c2: Constant.Color, c3: Constant.Color, c4: Constant.Color, alpha: number): undefined;
/**
 * With this function you can draw a single pixel anywhere on the screen with a color that you define.
 */
declare function draw_point_color(x: number, y: number, col1: Constant.Color): undefined;
/**
 * With this function you can draw a 1 pixel wide line with the color blended between color 1 at the first point and color 2 at the second point.
 */
declare function draw_line_color(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color): undefined;
/**
 * With this function you can draw a line of a specific width with the color blended between color 1 at the first point and color 2 at the second point.
 */
declare function draw_line_width_color(x1: number, y1: number, x2: number, y2: number, w: number, col1: Constant.Color, col2: Constant.Color): undefined;
/**
 * With this function you can draw either an outline of a rectangle or a filled rectangle by defining an area where the (x1, y1) position is the top left corner and the (x2, y2) position is the bottom right corner.
 */
declare function draw_rectangle_color(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color, col3: Constant.Color, col4: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rounded rectangle or a filled rounded rectangle where the (x1, y1) position is the top left corner and the (x2, y2) position is the bottom right corner.
 */
declare function draw_roundrect_color(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a rounded rectangle or a filled rounded rectangle where the (x1, y1) position is the top left corner and the (x2, y2) position is the bottom right corner.
 */
declare function draw_roundrect_color_ext(x1: number, y1: number, x2: number, y2: number, xrad: number, yrad: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a triangle or a filled triangle.
 */
declare function draw_triangle_color(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, col1: Constant.Color, col2: Constant.Color, col3: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of a circle or a filled circle, and if it is filled you can define the interior and exterior fill colors.
 */
declare function draw_circle_color(x: number, y: number, r: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * With this function you can draw either an outline of an ellipse or a filled ellipse by defining a rectangular area that will then have the ellipse created to fit.
 */
declare function draw_ellipse_color(x1: number, y1: number, x2: number, y2: number, col1: Constant.Color, col2: Constant.Color, outline: boolean): undefined;
/**
 * This function defines the position of a vertex for a primitive, with its own color and alpha setting.
 */
declare function draw_vertex_color(x: number, y: number, col: Constant.Color, alpha: number): undefined;
/**
 * This function lets you pre-cache a character glyph from a font. If you don't pre-cache a character using this function, it's automatically cached before it's drawn for the first time.
 */
declare function font_cache_glyph(font: Asset.GMFont, glyph_index: number): undefined;
/**
 * This function defines the position of a textured vertex for a primitive.
 */
declare function draw_vertex_texture_color(x: number, y: number, xtex: number, ytex: number, col: Constant.Color, alpha: number): undefined;
/**
 * With this function you can get the height (in pixels) of the GUI as used in the Draw GUI Event.
 */
declare function display_get_gui_height(): number;
/**
 * This function can set the background color of the game window.
 */
declare function window_set_color(color: Constant.Color): undefined;
/**
 * This function returns the background color of the game window.
 */
declare function window_get_color(): Constant.Color;
/**
 * @deprecated
 */
declare function audio_resume_music(): undefined;
/**
 * @deprecated
 */
declare function audio_music_is_playing(): boolean;
/**
 * @deprecated
 */
declare function audio_pause_music(): undefined;
/**
 * @deprecated
 */
declare function audio_play_music(soundid: Asset.GMSound, loops: boolean): undefined;
/**
 * @deprecated
 */
declare function audio_stop_music(): undefined;
/**
 * @deprecated
 */
declare function audio_music_gain(value: Asset.GMSound, time: number): undefined;
/**
 * @deprecated
 */
declare function audio_system(): undefined;

declare function highscore_clear(): undefined;
/**
 * @deprecated
 */
declare function font_get_first(ind: Asset.GMFont): number;
/**
 * @deprecated
 */
declare function room_set_background_colour(ind: Asset.GMRoom, col: Constant.Color, show: boolean): undefined;
/**
 * @deprecated
 */
declare function room_set_background_color(ind: Asset.GMRoom, col: Constant.Color, show: boolean): undefined;
/**
 * This function is used to set a particle type to be a single color for the total duration of the lifetime of each individual particle.
 */
declare function part_type_color1(ind: Id.ParticleType, colour1: Constant.Color): undefined;
/**
 * This function can be used to set a two color gradient for each particle created of the given type. The first color is that which all particles will start with, and the second color is the one on which the particle will end with, and a smooth gradient change will occur to the color over the particle's lifetime from one color to the other.
 */
declare function part_type_color2(ind: Id.ParticleType, colour1: Constant.Color, colour2: Constant.Color): undefined;
/**
 * This function can be used to set a three color gradient for each particle created of the given type. The first color is that which all particles will start with, and the second color is the one that will be blended to half way through its lifetime and the third color is the one with which the particle will end with. A smooth gradient change will occur through the colors over the particle's lifetime from one color to the other.
 */
declare function part_type_color3(ind: Id.ParticleType, colour1: Constant.Color, colour2: Constant.Color, colour3: Constant.Color): undefined;
/**
 * With this function you can set the given particle type to be a random blend of two colors.
 */
declare function part_type_color_mix(ind: Id.ParticleType, colour1: Constant.Color, colour2: Constant.Color): undefined;
/**
 * With this function you can set the mix of red, green and blue colors for all particles created of the given type. All values must be between 0 and 255.
 */
declare function part_type_color_rgb(ind: Id.ParticleType, rmin: number, rmax: number, gmin: number, gmax: number, bmin: number, bmax: number): undefined;
/**
 * With this function you can set a hue, saturation and value range for all particles of the given type. In this way you can create particles of the same hue but different saturations, or of different hues but the same value (luminosity), etc. All values must be between 0 and 255.
 */
declare function part_type_color_hsv(ind: Id.ParticleType, hmin: number, hmax: number, smin: number, smax: number, vmin: number, vmax: number): undefined;
/**
 * This function draws the given particle system.
 */
declare function part_system_drawit(ind: Id.ParticleSystem): undefined;
/**
 * This function is ideal for those effects that do not require any of the functionality offered by particle emitters (for example, to create smoke from a missile, or a simple explosion effect) as it permits you to quickly and easily create particles at any position in the game room.
 */
declare function part_particles_create_color(ind: Id.ParticleSystem, x: number, y: number, parttype: Id.ParticleType, color: Constant.Color, number: number): undefined;
/**
 * This function requests the OS for a specific permission. On Android the string should be formatted as "android.permission.<permission>". On GXgames you can request the permission "DeviceMotion" to request access to orientation information on certain browsers.
 */
declare function os_request_permission(permission: string, ___?: GML.ArgumentIdentity): undefined;
/**
 * This function sets the GUI layer's resolution to the size of the window, with optional scaling and offset parameters.
 */
declare function display_set_gui_maximise(xscale?: number, yscale?: number, xoffset?: number, yoffset?: number): undefined;
/**
 * This function sets the GUI layer's resolution to the size of the window, with optional scaling and offset parameters.
 */
declare function display_set_gui_maximize(xscale?: number, yscale?: number, xoffset?: number, yoffset?: number): undefined;
/**
 * With this function you can switch on or off the color channels and the alpha channel for all further drawing. The default value for each of the components is true, and can be supplied as either four unique arguments or as a 4 element 1D array.
 */
declare function gpu_set_colorwriteenable(red: boolean | Array<boolean>, green?: boolean, blue?: boolean, alpha?: boolean): undefined;
/**
 * This function can be used to set the texture filtering (linear interpolation) of all images drawn on the game screen. When this is enabled (true) all textures will be smoothed when drawn (this includes sprites as they too are considered textures), meaning that when scaled or moved if there is not a 1:1 pixel ratio then there will be a "smudging" across various pixels which may make images appear blurry depending on the art style used. If this is disabled (false) then images will be drawn based on the nearest pixel when scaled or moving which may lead to "blocky" images. The default value is false, and this can also be changed in the Global Game Options for individual target platforms.
 */
declare function gpu_set_tex_filter(linear: boolean): undefined;
/**
 * This function can be used to set the linear interpolation for a single sampler "slot" when using Shaders in GameMaker. When this is enabled (true) the sampler texture will be smoothed and if this is disabled (false) then images will be drawn based on the nearest pixel. The default value is that set by the Global Game Options for your game, or that set using the function gpu_set_texfilter().
 */
declare function gpu_set_tex_filter_ext(sampler_id: Id.Sampler, linear: boolean): undefined;
/**
 * This function can be used to indicate to GameMaker whether textures should repeat (true) or not (false) when used for models and primitives. Normally texture widths and heights lie in the range 0 - 1, but if you specify a value larger than 1 by default the rest is not drawn (the entire texture will be drawn with an "empty" section corresponding to the percentage over 1 that is used. So a value of 2 for a texture width or height would draw the texture in half the space and leave the other half empty). However, by using this function to set repeat to true the texture is repeated automatically over all models and primitives. The likely use case for these functions is for repeating a texture in 3D but in order for it to work and not pull images from the rest of the texture page, the sprite used will need to be marked as being on a "Separate Texture Page" in the Sprite Editor.
 */
declare function gpu_set_tex_repeat(repeat: boolean): undefined;
/**
 * This function can be used to set whether a single sampler "slot" repeats the given texture when using Shaders in GameMaker. Setting it to true will repeat the texture if the uv coordinates are out with the 0-1 range, while a setting of false will mean no repeating. The likely use case for these functions is for repeating a texture in 3D but in order for it to work and not pull images from the rest of the texture page, the sprite used will need to be marked as being on a "Separate Texture Page" in the Sprite Editor.
 */
declare function gpu_set_tex_repeat_ext(sampler_id: Id.Sampler, repeat: boolean): undefined;
/**
 * This function can be used to retrieve the current color write-enable values. The function returns a 4 element 1D array with elements that are either true (enabled) or false (disabled) for each of the RGBA components. By default all color writing is set to true.
 */
declare function gpu_get_colorwriteenable(): Array<boolean>;
/**
 * With this function you can check to see whether texture filtering (linear interpolation) is enabled (returns true) or not (returns false).
 */
declare function gpu_get_tex_filter(): boolean;
/**
 * With this function you can check to see whether texture interpolation (linear interpolation) is enabled (returns true) or not (returns false) for a given shader sampler texture.
 */
declare function gpu_get_tex_filter_ext(sampler_id: Id.Sampler): boolean;
/**
 * With this function you can check to see whether texture repeating is enabled (returns true) or not (returns false).
 */
declare function gpu_get_tex_repeat(): boolean;
/**
 * With this function you can check to see whether texture repeating is enabled (returns true) or not (returns false) for a given shader sampler texture.
 */
declare function gpu_get_tex_repeat_ext(sampler_id: Id.Sampler): boolean;
/**
 * @deprecated
 */
declare function achievement_event(stringid: string): undefined;
/**
 * @deprecated
 */
declare function achievement_show(type: undefined, val: undefined): undefined;
/**
 * @deprecated
 */
declare function achievement_get_info(userid: undefined): undefined;
/**
 * @deprecated
 */
declare function ads_enable(x: number, y: number, num: number): undefined;
/**
 * @deprecated
 */
declare function ads_disable(num: number): undefined;
/**
 * @deprecated
 */
declare function ads_setup(user_uuid: number, ad_app_key: string): undefined;
/**
 * @deprecated
 */
declare function ads_engagement_launch(): undefined;
/**
 * @deprecated
 */
declare function ads_engagement_available(): undefined;
/**
 * @deprecated
 */
declare function ads_engagement_active(): undefined;
/**
 * @deprecated
 */
declare function ads_event(stringid: string): undefined;
/**
 * @deprecated
 */
declare function ads_event_preload(stringid: string): undefined;
/**
 * @deprecated
 */
declare function ads_set_reward_callback(callback: Asset.Script): undefined;
/**
 * @deprecated
 */
declare function ads_get_display_height(slotnum: number): number;
/**
 * @deprecated
 */
declare function ads_get_display_width(slotnum: number): number;
/**
 * @deprecated
 */
declare function ads_move(x: number, y: number, slotnum: number): undefined;
/**
 * @deprecated
 */
declare function ads_interstitial_available(): boolean;
/**
 * @deprecated
 */
declare function ads_interstitial_display(): boolean;
/**
 * @deprecated
 */
declare function iap_activate(ds_list: Id.DsList): undefined;
/**
 * @deprecated
 */
declare function iap_status(): boolean;
/**
 * @deprecated
 */
declare function iap_enumerate_products(ds_list: Id.DsList): undefined;
/**
 * @deprecated
 */
declare function iap_restore_all(): undefined;
/**
 * @deprecated
 */
declare function iap_acquire(product_id: unknown, payload: unknown): undefined;
/**
 * @deprecated
 */
declare function iap_consume(product_id: unknown): undefined;
/**
 * @deprecated
 */
declare function iap_product_details(product_id: unknown, ds_map: Id.DsMap): undefined;
/**
 * @deprecated
 */
declare function iap_purchase_details(purchase_id: undefined, ds_map: undefined): undefined;
/**
 * This function can be used to set the color of the LEDs on a PlayStation controller.
 */
declare function gamepad_set_color(device: number, color: Constant.Color): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_tile_notification(template: unknown, ds_map: unknown, expiry: unknown, tag: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_tile_clear(): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_badge_notification(id: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_badge_clear(): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_queue_enable(flag: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_secondarytile_pin(id: unknown, shortName: unknown, displayName: unknown, cmdLineArgs: unknown, dsListOptions: unknown, tileImg: unknown, wideTileImg: unknown, textCol: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_secondarytile_badge_notification(id: unknown, tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_secondarytile_delete(id: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_begin(template: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_secondary_begin(template: unknown, tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_expiry(expiryTime: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_tag(tag: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_text_add(text: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_image_add(image: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_livetile_notification_end(): undefined;
/**
 * @deprecated
 */
declare function win8_appbar_enable(flag: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_appbar_add_element(type: unknown, icon: unknown, label: unknown, section: unknown, toolTip: unknown, callback: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_appbar_remove_element(id: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_settingscharm_add_entry(name: unknown, callback: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_settingscharm_add_html_entry(id: unknown, name: unknown, htmlPath: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_settingscharm_add_xaml_entry(name: unknown, xamlPath: unknown, headerRGB: unknown, callback: unknown, wideFlyout: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_settingscharm_set_xaml_property(entryName: unknown, elementName: unknown, propertyName: unknown, newValue: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_settingscharm_get_xaml_property(entryName: unknown, elementName: unknown, propertyName: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_settingscharm_remove_entry(name: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_share_image(image_filename: unknown, title: unknown, description: unknown, immediate: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_share_screenshot(title: unknown, description: unknown, immediate: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_share_file(filename: unknown, title: unknown, description: unknown, immediate: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_share_url(url: unknown, title: unknown, description: unknown, immediate: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_share_text(text: unknown, title: unknown, description: unknown, immediate: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_search_enable(_selectionCallback: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_search_disable(): undefined;
/**
 * @deprecated
 */
declare function win8_search_add_suggestions(_dslist: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_device_touchscreen_available(): undefined;
/**
 * @deprecated
 */
declare function win8_license_initialize_sandbox(_licenseString: unknown): undefined;
/**
 * @deprecated
 */
declare function win8_license_trial_version(): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_tile_clear(): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_badge_notification(id: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_badge_clear(): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_queue_enable(flag?: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_secondarytile_pin(tileId: unknown, displayName: unknown, cmdLineArgs: unknown, tileImage: unknown, wideTileImage: unknown, largeTileImage: unknown, textCol: unknown, tileSize: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_secondarytile_badge_notification(id: unknown, tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_secondarytile_delete(tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_secondarytile_badge_clear(tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_secondarytile_tile_clear(tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_begin(template: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_secondary_begin(template: unknown, tileId: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_expiry(expiryTime: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_tag(tag: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_text_add(text: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_image_add(image: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_end(): undefined;
/**
 * @deprecated
 */
declare function uwp_livetile_notification_template_add(template: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_appbar_enable(flag: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_appbar_add_element(id: unknown, type: unknown, icon: unknown, label: unknown, section: unknown, toolTip: unknown, callback: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_appbar_remove_element(id: unknown): undefined;
/**
 * @deprecated
 */
declare function uwp_device_touchscreen_available(): undefined;
/**
 * @deprecated
 */
declare function winphone_license_trial_version(): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_title(title: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_count(count: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_back_title(title: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_back_content(content: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_back_content_wide(content: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_front_image(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_front_image_small(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_front_image_wide(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_back_image(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_back_image_wide(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_background_colour(colour: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_background_color(color: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_icon_image(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_small_icon_image(included_filename: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_wide_content(content: unknown, index: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_cycle_images(included_filename_1?: unknown, included_filename_2?: unknown): undefined;
/**
 * @deprecated
 */
declare function winphone_tile_small_background_image(included_filename: unknown): undefined;
/**
 * This function gets the friction value of the given bound fixture (not the "base" fixture).
 */
declare function physics_get_friction(fixture: Id.PhysicsFixtureBound): number;
/**
 * With this function you can retrieve the mass of an entire group of particles.
 */
declare function physics_particle_group_get_mass(group: Id.PhysicsParticleGroup): number;
/**
 * This function resets the shader used for drawing and should be called when you no longer wish to use the current shader (set using shader_set()).
 */
declare function shader_reset(): undefined;
/**
 * This function sets a shader constant to hold an array of values.
 */
declare function shader_set_uniform_i_array(uniform_id: Id.Uniform, array: Array<number>): undefined;
/**
 * This function adds an RGBA color attribute to the new vertex format being created.
 */
declare function vertex_format_add_color(): undefined;
/**
 * @deprecated
 */
declare function vertex_format_add_textcoord(): undefined;
/**
 * If your defined vertex format takes a color value you can use this function to add that data to the vertex being defined for the current primitive. The function needs a buffer to store the data in and will take either a color constant, or a hex value (using the standard GameMaker format of BGR, e.g.: $FF0000 for blue) as well as an alpha value from 0 (transparent) to 1 (fully opaque).
 */
declare function vertex_color(buffer: Id.VertexBuffer, color: Constant.Color, alpha: number): undefined;
/**
 * @deprecated
 */
declare function push_get_application_badge_number(): number;
/**
 * @deprecated
 */
declare function push_set_application_badge_number(num: unknown): undefined;
/**
 * This function creates an attachment for the instance's skeletal animation sprite at runtime using a sprite asset from your game, blended with the given color and alpha value.
 */
declare function skeleton_attachment_create_color(name: string, sprite: Asset.GMSprite, ind: number, xorigin: number, yorigin: number, xscale: number, yscale: number, rot: number, color: Constant.Color, alpha: number): undefined;
/**
 * With this function you can set an attachment slot color and alpha so all sprites attached to it will be drawn with these blend values.
 */
declare function skeleton_slot_color_set(slot: string, color: Constant.Color, alpha: number): undefined;
/**
 * With this function you can get an attachment slot color.
 */
declare function skeleton_slot_color_get(slot: string): number;
/**
 * This function can be used to retrieve all the frames for the given event, in the given animation.
 */
declare function skeleton_animation_get_event_frames(anim_name: string, event_name: string): Array<number>;
/**
 * This function is used to enable (true) or disable (false) per-slot blend modes for skeletal sprites.
 */
declare function draw_enable_skeleton_blendmodes(enable: boolean): undefined;
/**
 * This function returns whether per-slot blend modes for skeletal sprites are enabled (true) or disabled (false).
 */
declare function draw_get_enable_skeleton_blendmodes(): boolean;
/**
 * This function is used to enable (true) or disable (false) whether the default blendmode is overridden if a skeletal sprite atlas uses premultiplied alpha.
 */
declare function draw_enable_skeleton_blend_override(enable: boolean): undefined;
/**
 * This function returns true if the default blend mode is overriden for skeletal sprites whose atlases use premultiplied alpha or false otherwise.
 */
declare function draw_get_enable_skeleton_blend_override(): boolean;
/**
 * This function can be used to retrieve the Z depth set for rendering layers within the room.
 */
declare function layer_get_forced_depth(): number;
/**
 * Using this function you can set the sprite index of the background element.
 */
declare function layer_background_change(background_element_id: Id.BackgroundElement, sprite: Asset.GMSprite): undefined;
/**
 * @deprecated
 */
declare function layer_tile_exists(layer_id: string | Id.Layer, tile_element_id: Id.TileMapElement): boolean;
/**
 * @deprecated
 */
declare function layer_tile_create(layer_id: string | Id.Layer, x: number, y: number, tileset: Asset.GMTileSet, left: number, top: number, width: number, height: number): Id.TileElementId;
/**
 * @deprecated
 */
declare function layer_tile_destroy(tile_element_id: Id.TileElementId): undefined;
/**
 * @deprecated
 */
declare function layer_tile_change(tile_element_id: Id.TileElementId, sprite: Asset.GMSprite): undefined;
/**
 * @deprecated
 */
declare function layer_tile_xscale(tile_element_id: Id.TileElementId, scale: number): undefined;
/**
 * @deprecated
 */
declare function layer_tile_yscale(tile_element_id: Id.TileElementId, scale: number): undefined;
/**
 * @deprecated
 */
declare function layer_tile_blend(tile_element_id: Id.TileElementId, col: Constant.Color): undefined;
/**
 * @deprecated
 */
declare function layer_tile_alpha(tile_element_id: Id.TileElementId, alpha: number): undefined;
/**
 * @deprecated
 */
declare function layer_tile_x(tile_element_id: Id.TileElementId, x: number): undefined;
/**
 * @deprecated
 */
declare function layer_tile_y(tile_element_id: Id.TileElementId, y: number): undefined;
/**
 * @deprecated
 */
declare function layer_tile_region(tile_element_id: Id.TileElementId, left: number, top: number, width: number, height: number): undefined;
/**
 * @deprecated
 */
declare function layer_tile_visible(tile_element_id: Id.TileElementId, visible: boolean): undefined;
/**
 * @deprecated
 */
declare function layer_tile_get_sprite(tile_element_id: Id.TileElementId): Asset.GMSprite;
/**
 * @deprecated
 */
declare function layer_tile_get_xscale(tile_element_id: Id.TileElementId): number;
/**
 * @deprecated
 */
declare function layer_tile_get_yscale(tile_element_id: Id.TileElementId): number;
/**
 * @deprecated
 */
declare function layer_tile_get_blend(tile_element_id: Id.TileElementId): Constant.Color;
/**
 * @deprecated
 */
declare function layer_tile_get_alpha(tile_element_id: Id.TileElementId): number;
/**
 * @deprecated
 */
declare function layer_tile_get_x(tile_element_id: Id.TileElementId): number;
/**
 * @deprecated
 */
declare function layer_tile_get_y(tile_element_id: Id.TileElementId): number;
/**
 * @deprecated
 */
declare function layer_tile_get_region(tile_element_id: Id.TileElementId): Array<number>;
/**
 * @deprecated
 */
declare function layer_tile_get_visible(tile_element_id: Id.TileElementId): boolean;
/**
 * This function is used to get the angle which a pair of touches must exceed in order to trigger a Rotate Start Gesture event.
 */
declare function gesture_get_rotate_angle(): number;
/**
 * This function checks if one or more tag strings is assigned to any asset from the Asset Browser. You supply either the asset name (as a string) or its asset index, as well as either a single tag string or an array where each item is a single tag string. If you supply an asset index value, then you will need to supply the optional asset type argument (a constant), as assets of different types can have the same index, even though they cannot have the same name.
 */
declare function asset_has_any_tag(asset_name_or_id: string | Asset.Any, tags: string | Array<string>, asset_type?: Constant.AssetType): boolean;
/**
 * This function returns the total number of options that exist in the extension with the given name. The function will return undefined if the provided extension name is invalid.
 */
declare function extension_get_option_count(extension_name: string): number;
/**
 * This function returns an array containing the names of all the options that exist in the extension with the given name. The function will return undefined if the provided extension name is invalid.
 */
declare function extension_get_option_names(extension_name: string): Array<string>;
/**
 * This function returns the value of the given option in the extension with the given name. The function will return undefined if the provided extension name is invalid.
 */
declare function extension_get_option_value(extension_name: string, option_name: string): unknown;
/**
 * This function returns a struct containing all the options, and their values, for the extension with the given name. The function will return undefined if the provided extension name is invalid.
 */
declare function extension_get_options(extension_name: string): Record<string, unknown>;
/**
 * This function tells whether an extension with the given name exists (true) or not (false).
 */
declare function extension_exists(extension_name: string): boolean;
/**
 * This function gets the version of an Extension Asset with the given name, and returns it as a string formatted as "major.minor.revision".
 */
declare function extension_get_version(extension_name: string): string;
/**
 * This function returns if the given Animation Curve Asset or Animation Curve Struct exists and is a valid Animation Curve.
 */
declare function animcurve_exists(curve_struct_or_id: Asset.GMAnimCurve | Struct.AnimCurve): boolean;
/**
 * With this function you can check the weak reference to a struct to see if it is still "alive" or not.
 */
declare function weak_ref_alive(weak_ref: Struct.WeakRef): boolean;
/**
 * This function is used to create a new FX Struct for a given effect type, which contains information on the effect and the values for its parameters.
 */
declare function fx_create(filter_or_effect_name: string): Struct.Fx;
/**
 * This function is used to retrieve the name of a filter/effect from its struct.
 */
declare function fx_get_name(filter_or_effect: Struct.Fx): string;
/**
 * This function is used to retrieve the name of a filter/effect from its struct.
 */
declare function fx_get_parameter_names(filter_or_effect: Struct.Fx): Array<string>;
/**
 * This function is used to retrieve the value of a parameter from an FX Struct.
 */
declare function fx_get_parameter(filter_or_effect: Struct.Fx, parameter_name: string): unknown;
/**
 * This function is used to retrieve a struct containing all the parameters for the given FX struct.
 */
declare function fx_get_parameters(filter_or_effect: Struct.Fx): Record<string, unknown>;
/**
 * Returns if the filter or effect is forced on a single layer.
 */
declare function fx_get_single_layer(filter_or_effect: Struct.Fx): boolean;
/**
 * This function is used to change the value of a parameter in the given FX struct. You specify an FX struct (as returned from fx_create() or layer_get_fx()), a parameter name as a string, and its new value.
 */
declare function fx_set_parameter(filter_or_effect: Struct.Fx, parameter_name: string, val: number | unknown[]): undefined;
/**
 * This function is used to change the parameters of a filter/effect. You specify an FX struct (as returned from fx_create() or layer_get_fx()) and a struct containing its parameters (as returned from fx_get_parameters()).
 */
declare function fx_set_parameters(filter_or_effect: Struct.Fx, parameter_struct: Record<string, unknown>): undefined;
/**
 * This function is used to force a filter or effect onto a single layer.
 */
declare function fx_set_single_layer(filter_or_effect: Struct.Fx, enable: boolean): undefined;
/**
 * This function is used to assign an FX struct to a Room Layer.
 */
declare function layer_set_fx(layer_name_or_id: string | Id.Layer, filter_or_effect: Struct.Fx): undefined;
/**
 * This function is used to retrieve the FX struct for a layer.
 */
declare function layer_get_fx(layer_name_or_id: string | Id.Layer): Struct.Fx;
/**
 * This function is used to clear the FX struct that is applied to the specified layer.
 */
declare function layer_clear_fx(layer_name_or_id: string | Id.Layer): undefined;
/**
 * This function is used to enable FX for a specified layer.
 */
declare function layer_enable_fx(layer_name_or_id: string | Id.Layer, enable: boolean): undefined;
/**
 * This function is used to check if FX is enabled for a specified layer.
 */
declare function layer_fx_is_enabled(layer_name_or_id: string | Id.Layer): boolean;
/**
 * This function defines the object to use for players in rollback multiplayer.
 */
declare function rollback_define_player(player_object: Asset.GMObject, layer_name?: string): undefined;
/**
 * This function defines the input to be used by the rollback system.
 */
declare function rollback_define_input(input_struct: Record<string, unknown>): undefined;
/**
 * This function defines the mocked input to be used by the rollback system during sync test.
 */
declare function rollback_define_mock_input(player_id: number, input_struct: Record<string, unknown>): undefined;
/**
 * This function sets a fixed local input frame delay.
 */
declare function rollback_define_input_frame_delay(delay: number): undefined;
/**
 * This function sets an extra latency to be added to all sent and received network messages. This can be used to simulate worse network conditions for the local player.
 */
declare function rollback_define_extra_network_latency(latency: number): undefined;
/**
 * This function enables manual start, meaning that the game will not automatically start once everyone is connected and instead wait for rollback_start_game to be called.
 */
declare function rollback_use_manual_start(): undefined;
/**
 * This function connects to GXC and creates a game instance of the specified size. The user needs to be signed in to GXC.
 */
declare function rollback_create_game(num_players: number, sync_test?: boolean, region?: string): undefined;
/**
 * This function checks if the game was started via an invite to a GXC game and if so joins it.
 */
declare function rollback_join_game(dry_run?: boolean): boolean;
/**
 * This function starts the current game.
 */
declare function rollback_start_game(): undefined;
/**
 * This function leaves the current game.
 */
declare function rollback_leave_game(): undefined;
/**
 * This function returns a struct containing fields w,a,s,d,z,x,c,space,up,left,down,right and the corresponding last_? fields for last frames input.
 */
declare function rollback_get_input(player_id?: number): Record<string, unknown>;
/**
 * This function sends a chat message.
 */
declare function rollback_chat(message: string, to?: number): undefined;
/**
 * This function is used to enable player preferences and needs to be called before joining or creating a rollback game. When using this feature the game won't autostart and instead require rollback_start_game to be called after all players have set their preferences.
 */
declare function rollback_use_player_prefs(default_?: unknown): undefined;
/**
 * This function is used to update the local player preferences. Preferences can only be set after joining or creating a game, but before starting the game.
 */
declare function rollback_set_player_prefs(default_: unknown): undefined;
/**
 * This function is used to get the preferences for a given player. Undefined will be returned if no preferences have been set. If the player id argument is not given, the preferences for the local player will be returned.
 */
declare function rollback_get_player_prefs(player_id?: number): unknown;
/**
 * This function returns a struct containing player_name and avatar_url for the player.
 */
declare function rollback_get_info(player_id?: number): Record<string, unknown>;
/**
 * This function switches random input for other players in sync test.
 */
declare function rollback_use_random_input(enabled: boolean): undefined;
/**
 * This function sets if the default display of rollback events should be used or not. Default value is true.
 */
declare function rollback_display_events(enabled: boolean): undefined;
/**
 * Synchronize the rollback game on the current frame. This means that we will only proceed past the current frame if all inputs are confirmed. Returns true if successful, false if the current frame will be rerun.
 */
declare function rollback_sync_on_frame(): boolean;
/**
 * Set config for live wallpaper
 */
declare function wallpaper_set_config(default_: unknown): undefined;
/**
 * Set subscriptions for live wallpaper
 */
declare function wallpaper_set_subscriptions(default_: unknown): undefined;
/**
 * Creates a new time source, returning its index.
 */
declare function time_source_create(parent: Id.TimeSource | Constant.TimeSource, period: number, units: Constant.TimeSourceUnits, callback: GMLFunction, args?: unknown[], reps?: number, expiry_type?: Constant.TimeSourceExpiryType): Id.TimeSource;
/**
 * Destroys the time source, as long as it has no children.
 */
declare function time_source_destroy(id: Id.TimeSource | Constant.TimeSource, destroy_tree?: boolean): undefined;
/**
 * Starts/Resumes the time source and all of its children.
 */
declare function time_source_start(id: Id.TimeSource | Constant.TimeSource): undefined;
/**
 * Stops the time source and all of its children.
 */
declare function time_source_stop(id: Id.TimeSource): undefined;
/**
 * Pauses the time source and all of its children.
 */
declare function time_source_pause(id: Id.TimeSource | Constant.TimeSource): undefined;
/**
 * Resumes a time source and all of its children.
 */
declare function time_source_resume(id: Id.TimeSource | Constant.TimeSource): undefined;
/**
 * Resets the time source and all of its children.
 */
declare function time_source_reset(id: Id.TimeSource): undefined;
/**
 * Resets and reconfigures the time source, additionally resets all of the time source's children.
 */
declare function time_source_reconfigure(id: Id.TimeSource, period: number, units: Constant.TimeSourceUnits, callback: GMLFunction, args?: unknown[], reps?: number, expiry_type?: Constant.TimeSourceExpiryType): undefined;
/**
 * Returns the period of the time source, measured in its own units.
 */
declare function time_source_get_period(id: Id.TimeSource): number;
/**
 * Returns the number of repetitions the time source has completed so far.
 */
declare function time_source_get_reps_completed(id: Id.TimeSource): number;
/**
 * Returns the number of repetitions the time source has left to complete.
 */
declare function time_source_get_reps_remaining(id: Id.TimeSource): number;
/**
 * Returns the units that the time source is measuring in.
 */
declare function time_source_get_units(id: Id.TimeSource): Constant.TimeSourceUnits;
/**
 * Returns the time left before the next expiry of the time source, measured in its own units.
 */
declare function time_source_get_time_remaining(id: Id.TimeSource): number;
/**
 * Returns the current active state of the time source.
 */
declare function time_source_get_state(id: Id.TimeSource | Constant.TimeSource): Constant.TimeSourceState;
/**
 * Returns the index of the parent of this time source.
 */
declare function time_source_get_parent(id: Id.TimeSource): Id.TimeSource;
/**
 * Returns an array containing all of the indexes of the children of this time source.
 */
declare function time_source_get_children(id: Id.TimeSource | Constant.TimeSource): Array<Id.TimeSource>;
/**
 * Returns true if the given index corresponds to an existing time source.
 */
declare function time_source_exists(id: Id.TimeSource | Constant.TimeSource): boolean;
/**
 * Converts a period in seconds to its equivalent frequency in beats-per-minute.
 */
declare function time_seconds_to_bpm(seconds: number): number;
/**
 * Converts a frequency in beats-per-minute to its equivalent period in seconds.
 */
declare function time_bpm_to_seconds(bpm: number): number;
/**
 * Invokes a callback after the specified time. Returns a handle which can be used to cancel the call.
 */
declare function call_later(period: number, units: Constant.TimeSourceUnits, callback: GMLFunction, repeat?: boolean): Id.TimeSource;
/**
 * Cancels a delayed call set up by call_later().
 */
declare function call_cancel(handle: Id.TimeSource): undefined;
/**
 * Starts recording the input depending on the provided filter flags.
 */
declare function debug_input_record(filter: Constant.DebugInputFilter): undefined;
/**
 * Saves the input currently being recorded. This will stop the current recording.
 */
declare function debug_input_save(filename: string): undefined;
/**
 * Plays back a previously recorded input.
 */
declare function debug_input_playback(filename: string): undefined;
/**
 * This will attempt to re-validate the Mac AppStore receipt and will generate an async system event of type receipt_validation.
 */
declare function mac_refresh_receipt_validation(): undefined;
/**
 * This function returns the format of the given surface. All formats are listed in our manual.
 */
declare function surface_get_format(surface_id: Id.Surface): Constant.SurfaceFormatType;
/**
 * This function returns the frequency (or refresh rate) of the display that the game is being played on. It will return a real value as frames-per-second, so for example if your monitor is 60hz you will get 60, if it's running at 144hz then you will get 144, and so on.
 */
declare function display_get_frequency(): number;
declare const audiogroup_default: Asset.GMAudioGroup;

declare function array_create(size: number): undefined[];
declare function array_create<T>(size: number, value: T): T[];
declare function instance_id_get(index: number): GMObject | typeof noone;

declare function ds_list_create<T = unknown>(): Id.DsList<T>;
declare function ds_list_add<T>(list: Id.DsList<T>, ...values: T[]): undefined;
declare function ds_list_set<T>(list: Id.DsList<T>, index: number, value: T): undefined;
declare function ds_list_find_value<T>(list: Id.DsList<T>, index: number): T | undefined;
declare function ds_map_create<K extends string | number = string | number, V = unknown>(): Id.DsMap<K, V>;
declare function ds_map_add<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): boolean;
declare function ds_map_set<K extends string | number, V>(map: Id.DsMap<K, V>, key: K, value: V): undefined;
declare function ds_map_find_value<K extends string | number, V>(map: Id.DsMap<K, V>, key: K): V | undefined;
declare function ds_map_keys_to_array<K extends string | number>(map: Id.DsMap<K, unknown>): K[];
declare function ds_map_values_to_array<V>(map: Id.DsMap<string | number, V>): V[];
declare function ds_grid_create<T = unknown>(width: number, height: number): Id.DsGrid<T>;
declare function ds_grid_get<T>(grid: Id.DsGrid<T>, x: number, y: number): T | undefined;
declare function ds_grid_set<T>(grid: Id.DsGrid<T>, x: number, y: number, value: T): undefined;
declare function ds_queue_create<T = unknown>(): Id.DsQueue<T>;
declare function ds_queue_enqueue<T>(queue: Id.DsQueue<T>, ...values: T[]): undefined;
declare function ds_queue_dequeue<T>(queue: Id.DsQueue<T>): T | undefined;
declare function ds_queue_head<T>(queue: Id.DsQueue<T>): T | undefined;
declare function ds_queue_tail<T>(queue: Id.DsQueue<T>): T | undefined;
declare function ds_stack_create<T = unknown>(): Id.DsStack<T>;
declare function ds_stack_push<T>(stack: Id.DsStack<T>, ...values: T[]): undefined;
declare function ds_stack_pop<T>(stack: Id.DsStack<T>): T | undefined;
declare function ds_stack_top<T>(stack: Id.DsStack<T>): T | undefined;
declare function ds_priority_create<T = unknown>(): Id.DsPriority<T>;
declare function ds_priority_add<T>(priority: Id.DsPriority<T>, value: T, score: number): undefined;
declare function ds_priority_find_min<T>(priority: Id.DsPriority<T>): T | undefined;
declare function ds_priority_find_max<T>(priority: Id.DsPriority<T>): T | undefined;
declare function ds_priority_delete_min<T>(priority: Id.DsPriority<T>): T | undefined;
declare function ds_priority_delete_max<T>(priority: Id.DsPriority<T>): T | undefined;

type CollisionTargets = CollisionTarget | Constant.All | Constant.Other | ReadonlyArray<CollisionTarget | Constant.All | Constant.Other>;
type NarrowCollisionTargetResult<T> = T extends Constant.All | Constant.Other ? Id.Instance<GMObject> | typeof noone : Exclude<CollisionResult<T>, NoOne> | typeof noone;
type NarrowCollisionResult<T> = T extends ReadonlyArray<infer U> ? NarrowCollisionTargetResult<U> : NarrowCollisionTargetResult<T>;
declare function collision_circle<T extends CollisionTargets>(x1: number, y1: number, radius: number, target: T, precise: boolean, notme: boolean): NarrowCollisionResult<T>;
declare function collision_ellipse<T extends CollisionTargets>(x1: number, y1: number, x2: number, y2: number, target: T, precise: boolean, notme: boolean): NarrowCollisionResult<T>;
declare function collision_line<T extends CollisionTargets>(x1: number, y1: number, x2: number, y2: number, target: T, precise: boolean, notme: boolean): NarrowCollisionResult<T>;
declare function collision_point<T extends CollisionTargets>(x: number, y: number, target: T, precise: boolean, notme: boolean): NarrowCollisionResult<T>;
declare function collision_rectangle<T extends CollisionTargets>(x1: number, y1: number, x2: number, y2: number, target: T, precise: boolean, notme: boolean): NarrowCollisionResult<T>;
declare function collision_circle_list<T extends CollisionTargets>(x1: number, y1: number, radius: number, target: T, precise: boolean, notme: boolean, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function collision_ellipse_list<T extends CollisionTargets>(x1: number, y1: number, x2: number, y2: number, target: T, precise: boolean, notme: boolean, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function collision_line_list<T extends CollisionTargets>(x1: number, y1: number, x2: number, y2: number, target: T, precise: boolean, notme: boolean, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function collision_point_list<T extends CollisionTargets>(x: number, y: number, target: T, precise: boolean, notme: boolean, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function collision_rectangle_list<T extends CollisionTargets>(x1: number, y1: number, x2: number, y2: number, target: T, precise: boolean, notme: boolean, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function instance_create_layer<T extends GMObject>(x: number, y: number, layer: string | Id.Layer, object: Asset.GMObject<T>, initial?: Partial<T>): T;
declare function instance_create_depth<T extends GMObject>(x: number, y: number, depth: number, object: Asset.GMObject<T>, initial?: Partial<T>): T;
declare function instance_find<T extends GMObject>(object: Asset.GMObject<T>, index: number): Id.Instance<T> | typeof noone;
declare function instance_find(object: Constant.All, index: number): Id.Instance<GMObject> | typeof noone;
declare function instance_nearest<T extends GMObject>(x: number, y: number, object: Asset.GMObject<T>): Id.Instance<T> | typeof noone;
declare function instance_nearest(x: number, y: number, object: Constant.All): Id.Instance<GMObject> | typeof noone;
declare function instance_furthest<T extends GMObject>(x: number, y: number, object: Asset.GMObject<T>): Id.Instance<T> | typeof noone;
declare function instance_furthest(x: number, y: number, object: Constant.All): Id.Instance<GMObject> | typeof noone;
declare function instance_place<T extends CollisionTargets>(x: number, y: number, target: T): NarrowCollisionResult<T>;
declare function instance_position<T extends CollisionTargets>(x: number, y: number, target: T): NarrowCollisionResult<T>;
declare function instance_place_list<T extends CollisionTargets>(x: number, y: number, target: T, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function instance_position_list<T extends CollisionTargets>(x: number, y: number, target: T, list: Id.DsList<Exclude<NarrowCollisionResult<T>, typeof noone>>, ordered: boolean): number;
declare function move_and_collide<T extends CollisionTargets>(x: number, y: number, target: T, num_iterations?: number, x_offset?: number, y_offset?: number, max_x_move?: number, max_y_move?: number): Array<Exclude<NarrowCollisionResult<T>, typeof noone>>;
