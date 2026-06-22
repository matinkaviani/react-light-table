import { describe, expect, it } from "vitest";
import { processTableData } from "./useTableData";

const columns = [
    { key: "name", title: "Name", sortable: true },
    { key: "age", title: "Age", sortable: true },
] as const;

const data = [
    { name: "Charlie", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 },
    { name: "Dana", age: 20 },
    { name: "Eve", age: 28 },
];

describe("processTableData", () => {
    it("filters before sorting and paginating", () => {
        const result = processTableData({
            data,
            columns: [...columns],
            sort: { key: "age", mode: "asc" },
            filterValue: "a",
            filterKeys: ["name"],
            hasPagination: true,
            currentPage: 1,
            rowsPerPage: 2,
        });

        expect(result.visibleRows.map((row) => row.name)).toEqual(["Dana", "Alice"]);
        expect(result.filteredCount).toBe(3);
        expect(result.totalPages).toBe(2);
    });

    it("skips client filter when manualFiltering is enabled", () => {
        const result = processTableData({
            data,
            columns: [...columns],
            sort: null,
            filterValue: "zzz",
            manualFiltering: true,
            hasPagination: false,
            currentPage: 1,
            rowsPerPage: 10,
        });

        expect(result.visibleRows).toEqual(data);
    });

    it("skips client sort when manualSorting is enabled", () => {
        const result = processTableData({
            data,
            columns: [...columns],
            sort: { key: "age", mode: "asc" },
            manualSorting: true,
            hasPagination: false,
            currentPage: 1,
            rowsPerPage: 10,
        });

        expect(result.visibleRows).toEqual(data);
    });

    it("uses totalRows for manual pagination", () => {
        const pageData = data.slice(0, 2);
        const result = processTableData({
            data: pageData,
            columns: [...columns],
            sort: null,
            manualPagination: true,
            totalRows: 20,
            hasPagination: true,
            currentPage: 1,
            rowsPerPage: 5,
        });

        expect(result.visibleRows).toEqual(pageData);
        expect(result.totalPages).toBe(4);
    });

    it("applies column filters before sorting", () => {
        const filterColumns = [
            { key: "name", title: "Name", filter: "text" as const },
            { key: "age", title: "Age", sortable: true },
        ] as const;

        const result = processTableData({
            data,
            columns: [...filterColumns],
            sort: { key: "age", mode: "asc" },
            columnFilters: { name: "a" },
            hasPagination: false,
            currentPage: 1,
            rowsPerPage: 10,
        });

        expect(result.visibleRows.map((row) => row.name)).toEqual(["Dana", "Alice", "Charlie"]);
    });
});
