/**
 * Thanks: https://github.com/bscotch/stitch
 */

export const EventTypes = {
  CREATE: 0,
  DESTROY: 1,
  ALERT: 2,
  STEP: 3,
  COLLISION: 4,
  KEY_DOWN: 5,
  MOUSE: 6,
  ASYNC: 7,
  ROOM: 7,
  GAME: 7,
  USER_EVENT: 7,
  ANIMATION: 7,
  DRAW: 8,
  KEY_PRESSED: 9,
  KEY_UP: 10,
  CLEAN_UP: 12,
  GESTURE: 13,
};

/** Provenance for the checked LTS event mapping used by declarations and .yy output. */
export const EventRegistryMetadata = Object.freeze({
  runtimeVersion: "2026.0.0.23",
  source: "ObjectEditorGUI/Skins/Dark/Layouts/object_editor_context_menus.xml",
  sourceSha256: "0125c9b1b032c55a4e969a6653eebd998fdd1c20f9a4a967829249682bcb2113",
});

export interface IObjectEvent {
  label: string;
  name: string;
  eventNum: number;
  eventType: number;
  group: string;
  handler: string;
}

const objectAlarmEvents: IObjectEvent[] = [];
for (let i = 0; i < 12; i++) {
  objectAlarmEvents.push({
    label: `Alarm ${i}`,
    name: `Alarm_${i}`,
    eventNum: i,
    eventType: EventTypes.ALERT,
    group: 'alarm',
    handler: `onAlarm_${i}`,
  });
}

export const OnCreateHandler = "onCreate";
export const OnCollisionHandlerPrefix = "onCollision_";
export const isCollisionHandler = (methodName: string): boolean =>
  methodName.startsWith(OnCollisionHandlerPrefix);
export const getCollisionTargetName = (methodName: string): string =>
  methodName.slice(OnCollisionHandlerPrefix.length);

export const objectEvents: IObjectEvent[] = [
  {
    label: 'Create',
    name: 'Create_0',
    eventNum: 0,
    eventType: EventTypes.CREATE,
    group: 'main',
    handler: OnCreateHandler,
  },
  {
    label: 'Destroy',
    name: 'Destroy_0',
    eventNum: 0,
    eventType: EventTypes.DESTROY,
    group: 'cleanup',
    handler: "onDestroy",
  },
  {
    label: 'CleanUp',
    name: 'CleanUp_0',
    eventNum: 0,
    eventType: EventTypes.CLEAN_UP,
    group: 'cleanup',
    handler: "onCleanUp",
  },
  {
    label: 'Room Start',
    name: 'Other_4',
    eventNum: 4,
    eventType: EventTypes.ROOM,
    group: 'cleanup',
    handler: "onRoomStart",
  },
  {
    label: 'Room End',
    name: 'Other_5',
    eventNum: 5,
    eventType: EventTypes.ROOM,
    group: 'cleanup',
    handler: "onRoomEnd",
  },
  {
    label: 'Game End',
    name: 'Other_3',
    eventNum: 3,
    eventType: EventTypes.GAME,
    group: 'cleanup',
    handler: "onGameEnd",
  },
  {
    label: 'Pre-Draw',
    name: 'Draw_76',
    eventNum: 76,
    group: 'draw',
    eventType: EventTypes.DRAW,
    handler: "onPreDraw",
  },
  {
    label: 'Draw Begin',
    name: 'Draw_72',
    eventNum: 72,
    eventType: EventTypes.DRAW,
    group: 'draw',
    handler: "onDrawBegin",
  },
  {
    label: 'Draw',
    name: 'Draw_0',
    eventNum: 0,
    eventType: EventTypes.DRAW,
    group: 'draw',
    handler: "onDraw",
  },
  {
    label: 'Draw End',
    name: 'Draw_73',
    eventNum: 73,
    eventType: EventTypes.DRAW,
    group: 'draw',
    handler: "onDrawEnd",
  },
  {
    label: 'Post-Draw',
    name: 'Draw_77',
    eventNum: 77,
    eventType: EventTypes.DRAW,
    group: 'draw',
    handler: "onPostDraw",
  },
  {
    label: 'Draw GUI Begin',
    name: 'Draw_74',
    eventNum: 74,
    eventType: EventTypes.DRAW,
    group: 'draw-gui',
    handler: "onDrawGuiBegin",
  },
  {
    label: 'Draw GUI',
    name: 'Draw_64',
    eventNum: 64,
    eventType: EventTypes.DRAW,
    group: 'draw-gui',
    handler: "onDrawGui",
  },
  {
    label: 'Draw GUI End',
    name: 'Draw_75',
    eventNum: 75,
    eventType: EventTypes.DRAW,
    group: 'draw-gui',
    handler: "onDrawGuiEnd",
  },
  {
    label: 'Begin Step',
    name: 'Step_1',
    eventNum: 1,
    eventType: EventTypes.STEP,
    group: 'step',
    handler: "onBeginStep",
  },
  {
    label: 'Step',
    name: 'Step_0',
    eventNum: 0,
    eventType: EventTypes.STEP,
    group: 'step',
    handler: "onStep"
  },
  {
    label: 'End Step',
    name: 'Step_2',
    eventNum: 2,
    eventType: EventTypes.STEP,
    group: 'step',
    handler: "onEndStep",
  },
  ...Array.from({ length: 16 }, (_, i) => ({
    label: `User Event ${i}`,
    name: `Other_${i + 10}`,
    eventNum: i + 10,
    eventType: EventTypes.USER_EVENT,
    group: 'user',
    handler: `onUserEvent_${i}`,
  })),
  {
    label: 'Animation Update',
    name: 'Other_58',
    eventNum: 58,
    eventType: EventTypes.ANIMATION,
    group: 'animation',
    handler: "onAnimationUpdate",
  },
  {
    label: 'Animation Event',
    name: 'Other_59',
    eventNum: 59,
    eventType: EventTypes.ANIMATION,
    group: 'animation',
    handler: "onAnimationEvent",
  },
  {
    label: 'Async - Image Loaded',
    name: 'Other_60',
    eventNum: 60,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncImageLoaded",
  },
  {
    label: 'Async - HTTP',
    name: 'Other_62',
    eventNum: 62,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncHttp",
  },
  {
    label: 'Async - System',
    name: 'Other_75',
    eventNum: 75,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncSystem",
  },
  {
    label: 'Async - Social',
    name: 'Other_70',
    eventNum: 70,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncSocial",
  },
  {
    label: 'Async - Save/Load',
    name: 'Other_72',
    eventNum: 72,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncSaveLoad",
  },
  {
    label: 'Async - Steam',
    name: 'Other_69',
    eventNum: 69,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncSteam",
  },
  {
    label: 'Async - Dialog',
    name: 'Other_63',
    eventNum: 63,
    eventType: EventTypes.ASYNC,
    group: 'async',
    handler: "onAsyncDialog",
  },
  {
    label: 'Broadcast Message',
    name: 'Other_76',
    eventNum: 76,
    eventType: EventTypes.ASYNC,
    group: 'broadcast message',
    handler: "onBroadcastMessage",
  },
  {
    label: 'Global Left Released',
    name: 'Mouse_56',
    eventNum: 56,
    eventType: EventTypes.MOUSE,
    group: 'mouse',
    handler: "onGlobalLeftReleased",
  },
  {
    label: 'Global Right Released',
    name: 'Mouse_57',
    eventNum: 57,
    eventType: EventTypes.MOUSE,
    group: 'mouse',
    handler: "onGlobalRightReleased",
  },
  {
    label: 'Global Middle Released',
    name: 'Mouse_58',
    eventNum: 58,
    eventType: EventTypes.MOUSE,
    group: 'mouse',
    handler: "onGlobalMiddleReleased",
  },
  ...objectAlarmEvents,
];

export const eventByHandler = new Map(objectEvents.map((e) => [e.handler, e]));

const additionalEvents: IObjectEvent[] = [
  ["Outside Room", "Other_0", 0, EventTypes.GAME, "other", "onOutsideRoom"],
  ["Intersect Boundary", "Other_1", 1, EventTypes.GAME, "other", "onIntersectBoundary"],
  ["Game Start", "Other_2", 2, EventTypes.GAME, "game", "onGameStart"],
  ["Animation End", "Other_7", 7, EventTypes.ANIMATION, "animation", "onAnimationEnd"],
  ["End Of Path", "Other_8", 8, EventTypes.GAME, "other", "onEndOfPath"],
  ["Close Button", "Other_30", 30, EventTypes.GAME, "other", "onCloseButton"],
  ["Draw Resize", "Draw_65", 65, EventTypes.DRAW, "draw", "onDrawResize"],
  ["Mouse Left", "Mouse_0", 0, EventTypes.MOUSE, "mouse", "onMouseLeft"],
  ["Mouse Right", "Mouse_1", 1, EventTypes.MOUSE, "mouse", "onMouseRight"],
  ["Mouse Middle", "Mouse_2", 2, EventTypes.MOUSE, "mouse", "onMouseMiddle"],
  ["Mouse No Button", "Mouse_3", 3, EventTypes.MOUSE, "mouse", "onMouseNone"],
  ["Mouse Left Pressed", "Mouse_4", 4, EventTypes.MOUSE, "mouse", "onMouseLeftPressed"],
  ["Mouse Right Pressed", "Mouse_5", 5, EventTypes.MOUSE, "mouse", "onMouseRightPressed"],
  ["Mouse Middle Pressed", "Mouse_6", 6, EventTypes.MOUSE, "mouse", "onMouseMiddlePressed"],
  ["Mouse Left Released", "Mouse_7", 7, EventTypes.MOUSE, "mouse", "onMouseLeftReleased"],
  ["Mouse Right Released", "Mouse_8", 8, EventTypes.MOUSE, "mouse", "onMouseRightReleased"],
  ["Mouse Middle Released", "Mouse_9", 9, EventTypes.MOUSE, "mouse", "onMouseMiddleReleased"],
  ["Mouse Enter", "Mouse_10", 10, EventTypes.MOUSE, "mouse", "onMouseEnter"],
  ["Mouse Leave", "Mouse_11", 11, EventTypes.MOUSE, "mouse", "onMouseLeave"],
  ["Mouse Wheel Up", "Mouse_60", 60, EventTypes.MOUSE, "mouse", "onMouseWheelUp"],
  ["Mouse Wheel Down", "Mouse_61", 61, EventTypes.MOUSE, "mouse", "onMouseWheelDown"],
  ["Global Left", "Mouse_50", 50, EventTypes.MOUSE, "mouse", "onGlobalLeft"],
  ["Global Right", "Mouse_51", 51, EventTypes.MOUSE, "mouse", "onGlobalRight"],
  ["Global Middle", "Mouse_52", 52, EventTypes.MOUSE, "mouse", "onGlobalMiddle"],
  ["Global Left Pressed", "Mouse_53", 53, EventTypes.MOUSE, "mouse", "onGlobalLeftPressed"],
  ["Global Right Pressed", "Mouse_54", 54, EventTypes.MOUSE, "mouse", "onGlobalRightPressed"],
  ["Global Middle Pressed", "Mouse_55", 55, EventTypes.MOUSE, "mouse", "onGlobalMiddlePressed"],
  ["Async Networking", "Other_68", 68, EventTypes.ASYNC, "async", "onAsyncNetworking"],
  ["Async Sound Loaded", "Other_61", 61, EventTypes.ASYNC, "async", "onAsyncSoundLoaded"],
  ["Async IAP", "Other_66", 66, EventTypes.ASYNC, "async", "onAsyncIAP"],
  ["Async Cloud", "Other_67", 67, EventTypes.ASYNC, "async", "onAsyncCloud"],
  ["Async Push Notification", "Other_71", 71, EventTypes.ASYNC, "async", "onAsyncPushNotification"],
  ["Async Audio Recording", "Other_73", 73, EventTypes.ASYNC, "async", "onAsyncAudioRecording"],
  ["Async Audio Playback", "Other_74", 74, EventTypes.ASYNC, "async", "onAsyncAudioPlayback"],
  ["Rollback Start", "Other_77", 77, EventTypes.GAME, "other", "onRollbackStart"],
  ["Rollback Event", "Other_78", 78, EventTypes.GAME, "other", "onRollbackEvent"],
  ["Wallpaper Config", "Other_79", 79, EventTypes.ASYNC, "async", "onWallpaperConfig"],
  ["Audio Playback Ended", "Other_80", 80, EventTypes.ASYNC, "async", "onAsyncAudioPlaybackEnded"],
  ["Wallpaper Subscription Data", "Other_81", 81, EventTypes.ASYNC, "async", "onWallpaperSubscriptionData"],
].map(([label, name, eventNum, eventType, group, handler]) => ({
  label: label as string,
  name: name as string,
  eventNum: eventNum as number,
  eventType: eventType as number,
  group: group as string,
  handler: handler as string,
}));

for (const event of additionalEvents) {
  if (!eventByHandler.has(event.handler)) {
    objectEvents.push(event);
    eventByHandler.set(event.handler, event);
  }
}

for (let index = 0; index < 8; index += 1) {
  for (const [label, handler, eventNum] of [
    [`Outside View ${index}`, `onOutsideView_${index}`, 40 + index],
    [`Intersect View Boundary ${index}`, `onIntersectViewBoundary_${index}`, 50 + index],
  ] as const) {
    const event: IObjectEvent = { label, name: `Other_${eventNum}`, eventNum, eventType: EventTypes.GAME, group: "other", handler };
    objectEvents.push(event);
    eventByHandler.set(handler, event);
  }
}

const gestureNames = [
  ["Tap", "Tap"], ["Double Tap", "DoubleTap"], ["Drag Start", "DragStart"], ["Dragging", "Dragging"],
  ["Drag End", "DragEnd"], ["Flick", "Flick"], ["Pinch Start", "PinchStart"], ["Pinch In", "PinchIn"],
  ["Pinch Out", "PinchOut"], ["Pinch End", "PinchEnd"], ["Rotate Start", "RotateStart"],
  ["Rotating", "Rotating"], ["Rotate End", "RotateEnd"],
] as const;

for (const [index, [label, handlerSuffix]] of gestureNames.entries()) {
  for (const global of [false, true]) {
    const eventNum = index + (global ? 64 : 0);
    const handler = `on${global ? "Global" : ""}Gesture${handlerSuffix}`;
    const event: IObjectEvent = {
      label: `${global ? "Global " : ""}Gesture ${label}`,
      name: `Gesture_${eventNum}`,
      eventNum,
      eventType: EventTypes.GESTURE,
      group: "gesture",
      handler,
    };
    objectEvents.push(event);
    eventByHandler.set(handler, event);
  }
}

const keyboardValues: Record<string, number> = {
  vk_nokey: 0, vk_anykey: 1, vk_backspace: 8, vk_tab: 9, vk_enter: 13, vk_return: 13,
  vk_shift: 16, vk_control: 17, vk_alt: 18, vk_pause: 19, vk_escape: 27, vk_space: 32,
  vk_pageup: 33, vk_pagedown: 34, vk_end: 35, vk_home: 36, vk_left: 37, vk_up: 38,
  vk_right: 39, vk_down: 40, vk_printscreen: 44, vk_insert: 45, vk_delete: 46,
  vk_numpad0: 96, vk_numpad1: 97, vk_numpad2: 98, vk_numpad3: 99, vk_numpad4: 100,
  vk_numpad5: 101, vk_numpad6: 102, vk_numpad7: 103, vk_numpad8: 104, vk_numpad9: 105,
  vk_multiply: 106, vk_add: 107, vk_subtract: 109, vk_decimal: 110, vk_divide: 111,
  vk_f1: 112, vk_f2: 113, vk_f3: 114, vk_f4: 115, vk_f5: 116, vk_f6: 117,
  vk_f7: 118, vk_f8: 119, vk_f9: 120, vk_f10: 121, vk_f11: 122, vk_f12: 123,
  vk_lshift: 160, vk_rshift: 161, vk_lcontrol: 162, vk_rcontrol: 163, vk_lalt: 164, vk_ralt: 165,
};

const keyCode = (suffix: string): number | undefined => {
  if (suffix in keyboardValues) return keyboardValues[suffix];
  if (/^[A-Z]$/.test(suffix)) return suffix.charCodeAt(0);
  const digit = suffix.match(/^Digit([0-9])$/);
  return digit ? 48 + Number(digit[1]) : undefined;
};

export const KeyboardHandlerPrefixes = {
  onKeyDown_: EventTypes.KEY_DOWN,
  onKeyPressed_: EventTypes.KEY_PRESSED,
  onKeyReleased_: EventTypes.KEY_UP,
} as const;

export const resolveObjectEvent = (methodName: string): IObjectEvent | undefined => {
  const fixed = eventByHandler.get(methodName);
  if (fixed) return fixed;
  for (const [prefix, eventType] of Object.entries(KeyboardHandlerPrefixes)) {
    if (!methodName.startsWith(prefix)) continue;
    const suffix = methodName.slice(prefix.length);
    const eventNum = keyCode(suffix);
    if (eventNum === undefined) return undefined;
    const family = eventType === EventTypes.KEY_DOWN ? "KeyPress" : eventType === EventTypes.KEY_PRESSED ? "KeyPressed" : "KeyRelease";
    return {
      label: `${family} ${suffix}`,
      name: `${family}_${eventNum}`,
      eventNum,
      eventType,
      group: "keyboard",
      handler: methodName,
    };
  }
  return undefined;
};

export const isDynamicKeyboardHandler = (methodName: string): boolean =>
  Object.keys(KeyboardHandlerPrefixes).some((prefix) => methodName.startsWith(prefix));
