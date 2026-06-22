import { describe, expect, it } from "vitest";
import { toggleSort, normalizeSortState, getPrimarySort } from "./sortUtils";

describe("sortUtils", () => {
    it("normalizes single and array sort state", () => {
        expect(normalizeSortState(null)).toEqual([]);
        expect(normalizeSortState({ key: "name", mode: "asc" })).toEqual([
            { key: "name", mode: "asc" },
        ]);
        expect(
            normalizeSortState([
                { key: "name", mode: "asc" },
                { key: "age", mode: "desc" },
            ])
        ).toHaveLength(2);
    });

    it("toggles single-column sort", () => {
        expect(toggleSort(null, "name", false, false)).toEqual({
            key: "name",
            mode: "asc",
            isAbsoluteValue: false,
        });
        expect(
            toggleSort({ key: "name", mode: "asc", isAbsoluteValue: false }, "name", false, false)
        ).toEqual({ key: "name", mode: "desc", isAbsoluteValue: false });
        expect(
            toggleSort({ key: "name", mode: "desc", isAbsoluteValue: false }, "name", false, false)
        ).toBeNull();
    });

    it("supports multi-sort with shift key", () => {
        const first = { key: "name", mode: "asc" as const, isAbsoluteValue: false };
        const next = toggleSort(first, "age", false, true, true);
        expect(normalizeSortState(next)).toEqual([
            first,
            { key: "age", mode: "asc", isAbsoluteValue: false },
        ]);
        expect(getPrimarySort(next)).toEqual(first);
    });
});
