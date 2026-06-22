import { useMemo } from "react";
import { filterRows } from "./filterRows";
import { filterColumnRows } from "./filterColumnRows";
import helpers from "./helpers";
import type { TableColumns } from "./Models/Props";
import { normalizeSortState, type SortState } from "./sortUtils";

export interface TableDataOptions<T extends Record<string, unknown>> {
    data: T[];
    columns: TableColumns<T>[];
    sort: SortState;
    filterValue?: string;
    filterKeys?: (keyof T)[];
    filterFunction?: (row: T, query: string) => boolean;
    columnFilters?: Record<string, string>;
    manualFiltering?: boolean;
    manualColumnFiltering?: boolean;
    manualSorting?: boolean;
    manualPagination?: boolean;
    hasPagination?: boolean;
    currentPage: number;
    rowsPerPage: number;
    totalRows?: number;
}

export interface TableDataResult<T> {
    visibleRows: T[];
    filteredCount: number;
    totalPages: number;
}

function applySorts<T extends Record<string, unknown>>(
    rows: T[],
    columns: TableColumns<T>[],
    sort: SortState,
): T[] {
    const sorts = normalizeSortState(sort).filter((item) => item.mode);
    if (!sorts.length) return rows;

    return [...rows].sort((a, b) => {
        for (const item of sorts) {
            const column = columns.find((col) => col.key === item.key);
            if (column?.sortFunction) {
                const sorted = column.sortFunction([a, b], item.mode);
                if (sorted[0] === a && sorted[1] === b) continue;
                if (sorted[0] === b && sorted[1] === a) return item.mode === "asc" ? -1 : 1;
            }

            const comparator = helpers[item.mode === "asc" ? "sortAsc" : "sortDesc"](item.key, {
                putNullAtBottom: true,
                sortByAbsValue: item.isAbsoluteValue,
            });
            const result = comparator(a, b);
            if (result !== 0) return result;
        }
        return 0;
    });
}

export function processTableData<T extends Record<string, unknown>>({
    data,
    columns,
    sort,
    filterValue = "",
    filterKeys,
    filterFunction,
    columnFilters = {},
    manualFiltering = false,
    manualColumnFiltering = false,
    manualSorting = false,
    manualPagination = false,
    hasPagination = false,
    currentPage,
    rowsPerPage,
    totalRows,
}: TableDataOptions<T>): TableDataResult<T> {
    const keys =
        filterKeys ??
        columns.map((column) => column.key).filter((key): key is keyof T => key !== undefined);

    let filteredData = data;

    if (!manualFiltering) {
        filteredData = filterRows(filteredData, filterValue, keys, filterFunction);
    }

    if (!manualColumnFiltering) {
        filteredData = filterColumnRows(filteredData, columns, columnFilters);
    }

    const filteredCount = manualPagination ? (totalRows ?? data.length) : filteredData.length;
    const sortedData = manualSorting ? filteredData : applySorts(filteredData, columns, sort);

    if (manualPagination) {
        return {
            visibleRows: sortedData,
            filteredCount,
            totalPages: hasPagination ? Math.ceil(filteredCount / rowsPerPage) : 1,
        };
    }

    if (!hasPagination) {
        return { visibleRows: sortedData, filteredCount, totalPages: 1 };
    }

    const firstPageIndex = (currentPage - 1) * rowsPerPage;
    return {
        visibleRows: sortedData.slice(firstPageIndex, firstPageIndex + rowsPerPage),
        filteredCount,
        totalPages: Math.ceil(filteredCount / rowsPerPage),
    };
}

export function useTableData<T extends Record<string, unknown>>(
    options: TableDataOptions<T>
): TableDataResult<T> {
    const {
        data,
        columns,
        sort,
        filterValue,
        filterKeys,
        filterFunction,
        columnFilters,
        manualFiltering,
        manualColumnFiltering,
        manualSorting,
        manualPagination,
        hasPagination,
        currentPage,
        rowsPerPage,
        totalRows,
    } = options;

    return useMemo(
        () =>
            processTableData({
                data,
                columns,
                sort,
                filterValue,
                filterKeys,
                filterFunction,
                columnFilters,
                manualFiltering,
                manualColumnFiltering,
                manualSorting,
                manualPagination,
                hasPagination,
                currentPage,
                rowsPerPage,
                totalRows,
            }),
        [
            columnFilters,
            columns,
            currentPage,
            data,
            filterFunction,
            filterKeys,
            filterValue,
            hasPagination,
            manualColumnFiltering,
            manualFiltering,
            manualPagination,
            manualSorting,
            rowsPerPage,
            sort,
            totalRows,
        ]
    );
}
