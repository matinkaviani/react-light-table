export interface FlatTreeRow<T> {
    row: T;
    depth: number;
    hasChildren: boolean;
    key: string;
}

export function flattenTreeRows<T extends Record<string, unknown>>({
    data,
    childrenColumn,
    rowKey,
    expandedRowKeys,
}: {
    data: T[];
    childrenColumn: keyof T;
    rowKey: (row: T) => string;
    expandedRowKeys: string[];
}): FlatTreeRow<T>[] {
    const result: FlatTreeRow<T>[] = [];

    const walk = (rows: T[], depth: number) => {
        rows.forEach((row) => {
            const key = rowKey(row);
            const children = row[childrenColumn];
            const childRows = Array.isArray(children) ? (children as T[]) : [];
            const hasChildren = childRows.length > 0;

            result.push({ row, depth, hasChildren, key });

            if (hasChildren && expandedRowKeys.includes(key)) {
                walk(childRows, depth + 1);
            }
        });
    };

    walk(data, 0);
    return result;
}
