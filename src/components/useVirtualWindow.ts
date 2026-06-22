import { useCallback, useEffect, useMemo, useRef, useState, type UIEvent } from "react";

interface VirtualWindow {
    start: number;
    end: number;
    offsetTop: number;
    offsetBottom: number;
}

export function getVirtualWindow(
    scrollTop: number,
    totalCount: number,
    rowHeight: number,
    viewportHeight: number,
    overscan = 6
): VirtualWindow {
    const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
    const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan * 2;
    const end = Math.min(totalCount, start + visibleCount);
    return {
        start,
        end,
        offsetTop: start * rowHeight,
        offsetBottom: Math.max(0, (totalCount - end) * rowHeight),
    };
}

function sameWindow(a: VirtualWindow, b: VirtualWindow): boolean {
    return a.start === b.start && a.end === b.end;
}

export function useVirtualWindow(
    totalCount: number,
    rowHeight: number,
    viewportHeight: number
) {
    const [scrollTop, setScrollTop] = useState(0);
    const scrollTopRef = useRef(0);
    const rafIdRef = useRef<number | null>(null);
    const paramsRef = useRef({ totalCount, rowHeight, viewportHeight });

    paramsRef.current = { totalCount, rowHeight, viewportHeight };

    const windowState = useMemo(
        () => getVirtualWindow(scrollTop, totalCount, rowHeight, viewportHeight),
        [scrollTop, totalCount, rowHeight, viewportHeight]
    );
    const windowRef = useRef(windowState);
    windowRef.current = windowState;

    const commitScrollTop = useCallback((nextScrollTop: number) => {
        const { totalCount, rowHeight, viewportHeight } = paramsRef.current;
        const nextWindow = getVirtualWindow(nextScrollTop, totalCount, rowHeight, viewportHeight);
        if (!sameWindow(nextWindow, windowRef.current)) {
            setScrollTop(nextScrollTop);
        }
    }, []);

    const onScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
        scrollTopRef.current = event.currentTarget.scrollTop;
        if (rafIdRef.current !== null) return;
        rafIdRef.current = requestAnimationFrame(() => {
            rafIdRef.current = null;
            commitScrollTop(scrollTopRef.current);
        });
    }, [commitScrollTop]);

    useEffect(() => {
        return () => {
            if (rafIdRef.current !== null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, []);

    const setScrollTopDirect = useCallback(
        (value: number) => {
            scrollTopRef.current = value;
            commitScrollTop(value);
        },
        [commitScrollTop]
    );

    return { windowState, onScroll, setScrollTop: setScrollTopDirect };
}
