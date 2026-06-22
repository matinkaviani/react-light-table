import type { TableColumns } from "./Models/Props";

export function getVisibleColumns<T extends Record<string, unknown>>(
    columns: TableColumns<T>[],
    columnVisibility?: Record<string, boolean>
): TableColumns<T>[] {
    if (!columnVisibility) return columns;

    return columns.filter((column) => {
        const key = column.key?.toString();
        if (!key) return true;
        return columnVisibility[key] !== false;
    });
}
