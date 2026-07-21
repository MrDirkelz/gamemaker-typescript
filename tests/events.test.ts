import {describe, expect, test} from "vitest";
import {EventRegistryMetadata, EventTypes, objectEvents, resolveObjectEvent} from "../src/events";

describe("LTS 2026 event registry", () => {
  test.each([
    ["onAlarm_11", EventTypes.ALERT, 11, "Alarm_11"],
    ["onUserEvent_15", EventTypes.USER_EVENT, 25, "Other_25"],
    ["onKeyDown_vk_left", EventTypes.KEY_DOWN, 37, "KeyPress_37"],
    ["onKeyPressed_A", EventTypes.KEY_PRESSED, 65, "KeyPressed_65"],
    ["onKeyReleased_Digit9", EventTypes.KEY_UP, 57, "KeyRelease_57"],
    ["onGestureTap", EventTypes.GESTURE, 0, "Gesture_0"],
    ["onGesturePinchIn", EventTypes.GESTURE, 7, "Gesture_7"],
    ["onGesturePinchOut", EventTypes.GESTURE, 8, "Gesture_8"],
    ["onGlobalGestureRotateEnd", EventTypes.GESTURE, 76, "Gesture_76"],
    ["onOutsideView_7", EventTypes.GAME, 47, "Other_47"],
    ["onAsyncPushNotification", EventTypes.ASYNC, 71, "Other_71"],
    ["onAsyncAudioPlaybackEnded", EventTypes.ASYNC, 80, "Other_80"],
    ["onWallpaperSubscriptionData", EventTypes.ASYNC, 81, "Other_81"],
  ])("resolves %s", (handler, eventType, eventNum, name) => {
    expect(resolveObjectEvent(handler)).toMatchObject({ handler, eventType, eventNum, name });
  });

  test("rejects unknown keyboard suffixes", () => {
    expect(resolveObjectEvent("onKeyDown_LeftArrow")).toBeUndefined();
  });

  test("pins the authoritative LTS registry source", () => {
    expect(EventRegistryMetadata).toEqual(expect.objectContaining({
      runtimeVersion: "2026.0.0.23",
      sourceSha256: expect.stringMatching(/^[a-f0-9]{64}$/),
    }));
  });

  test("covers every local and global LTS gesture without shifted numbers", () => {
    const suffixes = ["Tap", "DoubleTap", "DragStart", "Dragging", "DragEnd", "Flick", "PinchStart", "PinchIn", "PinchOut", "PinchEnd", "RotateStart", "Rotating", "RotateEnd"];
    for (const [index, suffix] of suffixes.entries()) {
      expect(resolveObjectEvent(`onGesture${suffix}`)?.eventNum).toBe(index);
      expect(resolveObjectEvent(`onGlobalGesture${suffix}`)?.eventNum).toBe(index + 64);
    }
  });

  test("contains no duplicate handler names", () => {
    expect(new Set(objectEvents.map((event) => event.handler)).size).toBe(objectEvents.length);
  });
});
