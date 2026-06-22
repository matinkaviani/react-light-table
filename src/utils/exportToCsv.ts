import type { TableColumns } from "../components/Models/Props";

export interface ExportToCsvOptions<T extends Record<string, unknown>> {
    data: T[];
    columns: TableColumns<T>[];
    filename?: string;
    columnVisibility?: Record<string, boolean>;
}

function escapeCsvValue(value: unknown): string {
    const stringValue = value === null || value === undefined ? "" : String(value);
    if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
}

export function exportToCsv<T extends Record<string, unknown>>({
    data,
    columns,
    filename = "table-export.csv",
    columnVisibility,
}: ExportToCsvOptions<T>): void {
    const visibleColumns = columns.filter((column) => {
        const key = column.key?.toString();
        if (!key) return false;
        if (columnVisibility && columnVisibility[key] === false) return false;
        return true;
    });

    const headers = visibleColumns.map((column) =>
        typeof column.title === "string" ? column.title : column.title()
    );

    const rows = data.map((row) =>
        visibleColumns.map((column) => {
            const key = column.key as keyof T;
            return escapeCsvValue(row[key]);
        })
    );

    const csv = [headers.map(escapeCsvValue).join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}
