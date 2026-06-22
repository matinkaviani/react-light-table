import type { TableColumns } from "./Models/Props";

export function filterColumnRows<T extends Record<string, unknown>>(
    data: T[],
    columns: TableColumns<T>[],
    columnFilters: Record<string, string>
): T[] {
    const activeFilters = Object.entries(columnFilters).filter(([, value]) => value.trim() !== "");
    if (!activeFilters.length) return data;

    return data.filter((row) =>
        activeFilters.every(([key, filterValue]) => {
            const column = columns.find((col) => col.key?.toString() === key);
            const cellValue = row[key as keyof T];
            const query = filterValue.trim().toLowerCase();

            if (column?.filter === "select") {
                return String(cellValue ?? "") === filterValue;
            }

            return String(cellValue ?? "")
                .toLowerCase()
                .includes(query);
        })
    );
}
