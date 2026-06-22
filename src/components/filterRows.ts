export function filterRows<T extends Record<string, unknown>>(
    data: T[],
    query: string,
    filterKeys: (keyof T)[],
    filterFunction?: (row: T, query: string) => boolean
): T[] {
    const trimmed = query.trim();
    if (!trimmed) return data;

    if (filterFunction) {
        return data.filter((row) => filterFunction(row, trimmed));
    }

    const lower = trimmed.toLowerCase();
    return data.filter((row) =>
        filterKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(lower))
    );
}
