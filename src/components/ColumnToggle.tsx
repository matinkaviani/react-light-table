import { useEffect, useRef, useState } from "react";
import type { TableColumns } from "./Models/Props";

interface ColumnToggleProps<T extends Record<string, unknown>> {
    columns: TableColumns<T>[];
    columnVisibility: Record<string, boolean>;
    onColumnVisibilityChange: (visibility: Record<string, boolean>) => void;
}

const ColumnToggle = <T extends Record<string, unknown>>({
    columns,
    columnVisibility,
    onColumnVisibilityChange,
}: ColumnToggleProps<T>) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleColumn = (key: string) => {
        const next = {
            ...columnVisibility,
            [key]: columnVisibility[key] === false,
        };
        onColumnVisibilityChange(next);
    };

    return (
        <div className="column-toggle" ref={containerRef}>
            <button
                type="button"
                className="column-toggle-button"
                aria-expanded={open}
                aria-haspopup="true"
                onClick={() => setOpen((value) => !value)}
            >
                Columns
            </button>
            {open ? (
                <div className="column-toggle-menu" role="menu">
                    {columns.map((column) => {
                        const key = column.key?.toString();
                        if (!key) return null;
                        const title = typeof column.title === "string" ? column.title : column.title();
                        const visible = columnVisibility[key] !== false;

                        return (
                            <label key={key} className="column-toggle-item" role="menuitemcheckbox">
                                <input
                                    type="checkbox"
                                    checked={visible}
                                    onChange={() => toggleColumn(key)}
                                />
                                <span>{title}</span>
                            </label>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};

export default ColumnToggle;
