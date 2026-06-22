import { useCallback, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

interface ColumnResizerProps {
    columnKey: string;
    width?: number;
    onResize: (key: string, width: number) => void;
}

const ColumnResizer = ({ columnKey, width = 120, onResize }: ColumnResizerProps) => {
    const startX = useRef(0);
    const startWidth = useRef(width);
    const [resizing, setResizing] = useState(false);

    const onMouseDown = (event: ReactMouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        startX.current = event.clientX;
        startWidth.current = width;
        setResizing(true);

        const onMouseMove = (moveEvent: MouseEvent) => {
            const nextWidth = Math.max(72, startWidth.current + moveEvent.clientX - startX.current);
            onResize(columnKey, nextWidth);
        };

        const onMouseUp = () => {
            setResizing(false);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLSpanElement>) => {
            if (event.key === "ArrowRight") {
                onResize(columnKey, width + 8);
            }
            if (event.key === "ArrowLeft") {
                onResize(columnKey, Math.max(72, width - 8));
            }
        },
        [columnKey, onResize, width]
    );

    return (
        <span
            role="separator"
            aria-orientation="vertical"
            aria-label={`Resize ${columnKey} column`}
            tabIndex={0}
            className={`column-resizer${resizing ? " resizing" : ""}`}
            onMouseDown={onMouseDown}
            onKeyDown={handleKeyDown}
            onClick={(event) => event.stopPropagation()}
        />
    );
};

export default ColumnResizer;
