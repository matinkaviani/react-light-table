import type { TableColumns } from "./Models/Props";

export function getOrderedColumns<T extends Record<string, unknown>>(
    columns: TableColumns<T>[],
    columnOrder?: string[]
): TableColumns<T>[] {
    if (!columnOrder?.length) return columns;

    const map = new Map(
        columns
            .map((column) => {
                const key = column.key?.toString();
                return key ? ([key, column] as const) : null;
            })
            .filter((entry): entry is readonly [string, TableColumns<T>] => entry !== null)
    );

    const ordered = columnOrder
        .map((key) => map.get(key))
        .filter((column): column is TableColumns<T> => column !== undefined);

    const remaining = columns.filter((column) => {
        const key = column.key?.toString();
        return key ? !columnOrder.includes(key) : true;
    });

    return [...ordered, ...remaining];
}
