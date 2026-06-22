import { useCallback, useEffect, useMemo, useState } from "react";
import { flattenTreeRows } from "./flattenTreeRows";
import { getOrderedColumns } from "./getOrderedColumns";
import { getVisibleColumns } from "./getVisibleColumns";
import type TableProps from "./Models/Props";
import type { SortProps, TableColumns } from "./Models/Props";
import { getPrimarySort, toggleSort, type SortState } from "./sortUtils";
import { useTableData } from "./useTableData";
import { exportToCsv } from "../utils/exportToCsv";

const getInitialSort = (
    sort: SortState | undefined,
    initSort: SortProps | undefined
): SortState => {
    if (sort !== undefined) return sort;
    if (initSort) {
        return {
            key: initSort.key,
            mode: initSort.mode,
            isAbsoluteValue: initSort.isAbsoluteValue,
        };
    }
    return null;
};

const getSelectionMode = (selectable: TableProps<Record<string, unknown>>["selectable"]) => {
    if (!selectable) return null;
    if (selectable === "single") return "single" as const;
    return "multiple" as const;
};

const getDefaultColumnVisibility = <T extends Record<string, unknown>>(
    columns: TableColumns<T>[]
): Record<string, boolean> => {
    return columns.reduce<Record<string, boolean>>((acc, column) => {
        const key = column.key?.toString();
        if (key) acc[key] = true;
        return acc;
    }, {});
};

const getDefaultColumnOrder = <T extends Record<string, unknown>>(
    columns: TableColumns<T>[]
): string[] => {
    return columns
        .map((column) => column.key?.toString())
        .filter((key): key is string => Boolean(key));
};

export function useReactLightTable<T extends Record<string, unknown>>(props: TableProps<T>) {
    const {
        columns,
        data,
        sortable,
        multiSort = false,
        initSort,
        sort: controlledSort,
        onSortChange,
        page: controlledPage,
        onPageChange,
        filterValue: controlledFilterValue,
        onFilterChange,
        filterKeys,
        filterFunction,
        manualFiltering = false,
        columnFilters: controlledColumnFilters,
        onColumnFiltersChange,
        manualColumnFiltering = false,
        manualSorting = false,
        manualPagination = false,
        totalRows,
        hasPagination = false,
        rowsPerPage = 50,
        selectable,
        selectedRowKeys: controlledSelectedRowKeys,
        onSelectionChange,
        rowKey,
        expandedRowKeys: controlledExpandedRowKeys,
        onExpandedChange,
        columnVisibility: controlledColumnVisibility,
        onColumnVisibilityChange,
        columnOrder: controlledColumnOrder,
        onColumnOrderChange,
        columnWidths: controlledColumnWidths,
        onColumnWidthsChange,
        treeData = false,
        childrenColumn,
        onCurrentDataChange,
        afterSort,
        exportFilename,
        exportSelected = false,
    } = props;

    const [internalSort, setInternalSort] = useState<SortState>(() =>
        getInitialSort(controlledSort, initSort)
    );
    const [internalPage, setInternalPage] = useState(1);
    const [internalFilterValue, setInternalFilterValue] = useState("");
    const [internalColumnFilters, setInternalColumnFilters] = useState<Record<string, string>>({});
    const [internalSelectedRowKeys, setInternalSelectedRowKeys] = useState<string[]>([]);
    const [internalExpandedRowKeys, setInternalExpandedRowKeys] = useState<string[]>([]);
    const [internalColumnVisibility, setInternalColumnVisibility] = useState<Record<string, boolean>>(
        () => getDefaultColumnVisibility(columns)
    );
    const [internalColumnOrder, setInternalColumnOrder] = useState<string[]>(() =>
        getDefaultColumnOrder(columns)
    );
    const [internalColumnWidths, setInternalColumnWidths] = useState<Record<string, number>>({});

    const sort = controlledSort !== undefined ? controlledSort : internalSort;
    const currentPage = controlledPage !== undefined ? controlledPage : internalPage;
    const filterValue = controlledFilterValue !== undefined ? controlledFilterValue : internalFilterValue;
    const columnFilters =
        controlledColumnFilters !== undefined ? controlledColumnFilters : internalColumnFilters;
    const selectedRowKeys =
        controlledSelectedRowKeys !== undefined ? controlledSelectedRowKeys : internalSelectedRowKeys;
    const expandedRowKeys =
        controlledExpandedRowKeys !== undefined ? controlledExpandedRowKeys : internalExpandedRowKeys;
    const columnVisibility =
        controlledColumnVisibility !== undefined
            ? controlledColumnVisibility
            : internalColumnVisibility;
    const columnOrder =
        controlledColumnOrder !== undefined ? controlledColumnOrder : internalColumnOrder;
    const columnWidths =
        controlledColumnWidths !== undefined ? controlledColumnWidths : internalColumnWidths;

    const selectionMode = getSelectionMode(selectable);
    const primarySort = getPrimarySort(sort);

    const orderedColumns = useMemo(
        () => getOrderedColumns(columns, columnOrder),
        [columns, columnOrder]
    );

    const visibleColumns = useMemo(
        () => getVisibleColumns(orderedColumns, columnVisibility),
        [orderedColumns, columnVisibility]
    );

    const flatRows = useMemo(() => {
        if (!treeData || !childrenColumn || !rowKey) return null;
        return flattenTreeRows({
            data,
            childrenColumn,
            rowKey,
            expandedRowKeys,
        });
    }, [childrenColumn, data, expandedRowKeys, rowKey, treeData]);

    const tableData = flatRows ? flatRows.map((entry) => entry.row) : data;

    const setCurrentPage = useCallback(
        (page: number) => {
            if (onPageChange) onPageChange(page);
            else setInternalPage(page);
        },
        [onPageChange]
    );

    const setSort = useCallback(
        (nextSort: SortState) => {
            if (onSortChange) onSortChange(nextSort);
            else setInternalSort(nextSort);
        },
        [onSortChange]
    );

    const setFilterValue = useCallback(
        (value: string) => {
            if (onFilterChange) onFilterChange(value);
            else setInternalFilterValue(value);
            if (currentPage !== 1) setCurrentPage(1);
        },
        [currentPage, onFilterChange, setCurrentPage]
    );

    const setColumnFilters = useCallback(
        (filters: Record<string, string>) => {
            if (onColumnFiltersChange) onColumnFiltersChange(filters);
            else setInternalColumnFilters(filters);
            if (currentPage !== 1) setCurrentPage(1);
        },
        [currentPage, onColumnFiltersChange, setCurrentPage]
    );

    const updateColumnFilter = useCallback(
        (key: string, value: string) => {
            setColumnFilters({ ...columnFilters, [key]: value });
        },
        [columnFilters, setColumnFilters]
    );

    const setSelectedRowKeysState = useCallback(
        (keys: string[], rows: T[]) => {
            if (onSelectionChange) onSelectionChange(keys, rows);
            else setInternalSelectedRowKeys(keys);
        },
        [onSelectionChange]
    );

    const handleSelectionChange = useCallback(
        (keys: string[], _rows: T[]) => {
            const rows = rowKey ? data.filter((item) => keys.includes(rowKey(item))) : _rows;
            setSelectedRowKeysState(keys, rows);
        },
        [data, rowKey, setSelectedRowKeysState]
    );

    const setExpandedRowKeys = useCallback(
        (keys: string[]) => {
            if (onExpandedChange) onExpandedChange(keys);
            else setInternalExpandedRowKeys(keys);
        },
        [onExpandedChange]
    );

    const setColumnVisibility = useCallback(
        (visibility: Record<string, boolean>) => {
            if (onColumnVisibilityChange) onColumnVisibilityChange(visibility);
            else setInternalColumnVisibility(visibility);
        },
        [onColumnVisibilityChange]
    );

    const setColumnOrder = useCallback(
        (order: string[]) => {
            if (onColumnOrderChange) onColumnOrderChange(order);
            else setInternalColumnOrder(order);
        },
        [onColumnOrderChange]
    );

    const setColumnWidths = useCallback(
        (widths: Record<string, number>) => {
            if (onColumnWidthsChange) onColumnWidthsChange(widths);
            else setInternalColumnWidths(widths);
        },
        [onColumnWidthsChange]
    );

    const resizeColumn = useCallback(
        (key: string, width: number) => {
            setColumnWidths({ ...columnWidths, [key]: width });
        },
        [columnWidths, setColumnWidths]
    );

    useEffect(() => {
        if (controlledSort !== undefined) return;
        setInternalSort(getInitialSort(undefined, initSort));
    }, [controlledSort, initSort]);

    useEffect(() => {
        if (controlledColumnVisibility !== undefined) return;
        setInternalColumnVisibility(getDefaultColumnVisibility(columns));
    }, [columns, controlledColumnVisibility]);

    useEffect(() => {
        if (controlledColumnOrder !== undefined) return;
        setInternalColumnOrder(getDefaultColumnOrder(columns));
    }, [columns, controlledColumnOrder]);

    useEffect(() => {
        if (controlledPage !== undefined) return;
        const rowCount = manualPagination ? (totalRows ?? data.length) : data.length;
        if (currentPage > 1 && rowCount <= (currentPage - 1) * rowsPerPage) {
            setInternalPage(1);
        }
    }, [controlledPage, currentPage, data.length, manualPagination, rowsPerPage, totalRows]);

    const { visibleRows, totalPages, filteredCount } = useTableData({
        data: tableData,
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
        hasPagination: hasPagination && !treeData,
        currentPage,
        rowsPerPage,
        totalRows,
    });

    useEffect(() => {
        onCurrentDataChange?.(visibleRows);
    }, [onCurrentDataChange, visibleRows]);

    const requestSort = useCallback(
        (key: string, isAbsoluteValue: boolean, shiftKey = false) => {
            if (!sortable) return;
            const newSort = toggleSort(sort, key, isAbsoluteValue, multiSort, shiftKey);
            const primary = getPrimarySort(newSort);
            afterSort?.(key, primary?.mode ?? null);
            if (currentPage !== 1) setCurrentPage(1);
            setSort(newSort);
        },
        [sortable, sort, multiSort, afterSort, currentPage, setCurrentPage, setSort]
    );

    const toggleExpandedRow = useCallback(
        (key: string) => {
            const next = expandedRowKeys.includes(key)
                ? expandedRowKeys.filter((expandedKey) => expandedKey !== key)
                : [...expandedRowKeys, key];
            setExpandedRowKeys(next);
        },
        [expandedRowKeys, setExpandedRowKeys]
    );

    const selectedRows = useMemo(() => {
        if (!rowKey) return [];
        return data.filter((row) => selectedRowKeys.includes(rowKey(row)));
    }, [data, rowKey, selectedRowKeys]);

    const handleExport = useCallback(() => {
        const exportData =
            exportSelected && selectedRows.length
                ? selectedRows
                : treeData
                  ? tableData
                  : data;

        exportToCsv({
            data: exportData,
            columns,
            filename: exportFilename,
            columnVisibility,
        });
    }, [
        columns,
        data,
        exportFilename,
        exportSelected,
        columnVisibility,
        selectedRows,
        tableData,
        treeData,
    ]);

    const reorderColumn = useCallback(
        (fromKey: string, toKey: string) => {
            const keys = visibleColumns
                .map((column) => column.key?.toString())
                .filter((key): key is string => Boolean(key));
            const fromIndex = keys.indexOf(fromKey);
            const toIndex = keys.indexOf(toKey);
            if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;

            const next = [...keys];
            const [moved] = next.splice(fromIndex, 1);
            next.splice(toIndex, 0, moved);
            setColumnOrder(next);
        },
        [setColumnOrder, visibleColumns]
    );

    const displayRows = useMemo(() => {
        if (!flatRows) return visibleRows.map((row, index) => ({ row, depth: 0, hasChildren: false, key: rowKey ? rowKey(row) : String(index) }));

        const visibleKeySet = new Set(
            visibleRows.map((row, index) => (rowKey ? rowKey(row) : String(index)))
        );
        return flatRows.filter((entry) => visibleKeySet.has(entry.key));
    }, [flatRows, rowKey, visibleRows]);

    return {
        sort,
        primarySort,
        currentPage,
        filterValue,
        columnFilters,
        selectedRowKeys,
        selectedRows,
        expandedRowKeys,
        columnVisibility,
        columnOrder,
        columnWidths,
        selectionMode,
        visibleColumns,
        visibleRows,
        displayRows,
        totalPages,
        filteredCount,
        setCurrentPage,
        setFilterValue,
        updateColumnFilter,
        handleSelectionChange,
        toggleExpandedRow,
        setColumnVisibility,
        resizeColumn,
        reorderColumn,
        requestSort,
        handleExport,
    };
}

export type UseReactLightTableReturn<T extends Record<string, unknown>> = ReturnType<
    typeof useReactLightTable<T>
>;
