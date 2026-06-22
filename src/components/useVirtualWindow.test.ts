import { act, renderHook } from "@testing-library/react";
import type { UIEvent } from "react";
import { describe, expect, it, vi } from "vitest";
import { getVirtualWindow, useVirtualWindow } from "./useVirtualWindow";

describe("getVirtualWindow", () => {
    it("computes visible slice with overscan", () => {
        expect(getVirtualWindow(0, 100, 44, 400)).toEqual({
            start: 0,
            end: 22,
            offsetTop: 0,
            offsetBottom: 3432,
        });
    });

    it("advances start index when scrolled", () => {
        const window = getVirtualWindow(440, 100, 44, 400);
        expect(window.start).toBe(4);
        expect(window.offsetTop).toBe(176);
    });
});

describe("useVirtualWindow", () => {
    it("batches scroll updates to animation frames", () => {
        vi.useFakeTimers();
        const rafCallbacks: FrameRequestCallback[] = [];
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
            rafCallbacks.push(callback);
            return rafCallbacks.length;
        });

        const { result } = renderHook(() => useVirtualWindow(100, 44, 400));
        const scrollTarget = { scrollTop: 440 } as HTMLDivElement;

        act(() => {
            result.current.onScroll({
                currentTarget: scrollTarget,
            } as UIEvent<HTMLDivElement>);
            result.current.onScroll({
                currentTarget: scrollTarget,
            } as UIEvent<HTMLDivElement>);
        });

        expect(rafCallbacks).toHaveLength(1);

        act(() => {
            rafCallbacks[0](0);
        });

        expect(result.current.windowState.start).toBe(4);

        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("skips state updates when the visible window is unchanged", () => {
        vi.useFakeTimers();
        const rafCallbacks: FrameRequestCallback[] = [];
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
            rafCallbacks.push(callback);
            return rafCallbacks.length;
        });

        const { result } = renderHook(() => useVirtualWindow(100, 44, 400));
        const scrollTarget = { scrollTop: 10 } as HTMLDivElement;
        const initialWindow = result.current.windowState;

        act(() => {
            result.current.onScroll({
                currentTarget: scrollTarget,
            } as UIEvent<HTMLDivElement>);
            rafCallbacks[0](0);
        });

        expect(result.current.windowState).toBe(initialWindow);

        vi.useRealTimers();
        vi.restoreAllMocks();
    });
});
