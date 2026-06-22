import type { SortProps } from "./Models/Props";
import type { SortMode } from "./Models/Props";

export type SortState = SortProps | SortProps[] | null;

export function normalizeSortState(sort: SortState): SortProps[] {
    if (!sort) return [];
    return Array.isArray(sort) ? sort : [sort];
}

export function getPrimarySort(sort: SortState): SortProps | null {
    const normalized = normalizeSortState(sort);
    return normalized[0] ?? null;
}

export function isColumnSorted(sort: SortState, key: string): SortProps | undefined {
    return normalizeSortState(sort).find((item) => item.key === key && item.mode);
}

export function toggleSort(
    current: SortState,
    key: string,
    isAbsoluteValue: boolean,
    multiSort: boolean,
    shiftKey = false
): SortState {
    const active = normalizeSortState(current);
    const existing = active.find((item) => item.key === key);

    if (!multiSort || !shiftKey) {
        if (!existing || existing.mode === null) {
            return { key, mode: "asc", isAbsoluteValue };
        }
        if (existing.mode === "asc") {
            return { key, mode: "desc", isAbsoluteValue };
        }
        return null;
    }

    if (!existing) {
        return [...active, { key, mode: "asc", isAbsoluteValue }];
    }

    const nextMode: SortMode =
        existing.mode === "asc" ? "desc" : existing.mode === "desc" ? null : "asc";
    const updated = active
        .map((item) => (item.key === key ? { ...item, mode: nextMode, isAbsoluteValue } : item))
        .filter((item) => item.mode !== null);

    return updated.length ? updated : null;
}
