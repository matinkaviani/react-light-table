import { ReactNode } from "react";
import type { TableAppearance } from "../applyAppearance";
import type { SortState } from "../sortUtils";

export type SortMode = "asc" | "desc" | null;
export type SelectionMode = boolean | "single" | "multiple";
export type TableSize = "default" | "compact";
export type TableTheme = "light" | "dark";
export type TableVariant = "default" | "striped" | "bordered";
export type ColumnFilterType = "text" | "select";
export type EditType = "text" | "number" | "select";
export type StickyColumn = "first" | "last";

export interface SortProps {
    key: string;
    mode: SortMode;
    isAbsoluteValue?: boolean;
}

export interface ColumnFilterOption {
    label: string;
    value: string;
}

export interface TableClassNames {
    root?: string;
    toolbar?: string;
    surface?: string;
    scrollContainer?: string;
    table?: string;
    headerRow?: string;
    headerCell?: string;
    filterRow?: string;
    filterCell?: string;
    body?: string;
    row?: string;
    cell?: string;
    pagination?: string;
    empty?: string;
    loading?: string;
    filter?: string;
    exportButton?: string;
    bulkActions?: string;
}

export interface TableColumns<T = Record<string, unknown>> {
    key?: keyof T;
    title: string | (() => string);
    isHeadNowrap?: boolean;
    sortable?: boolean;
    isAbsoluteValue?: boolean;
    headClassName?: string;
    cellClassName?: string;
    render?: (key: string, record: T) => ReactNode;
    sortFunction?: (data: T[], sortMode: SortMode) => T[];
    filter?: ColumnFilterType | boolean;
    filterOptions?: readonly ColumnFilterOption[];
    filterPlaceholder?: string;
    editable?: boolean | ((record: T) => boolean);
    editType?: EditType;
    editOptions?: readonly ColumnFilterOption[];
    summary?: (data: T[]) => ReactNode;
    width?: number;
}

export interface TableScroll {
    x?: number | string;
    y?: number | string;
}

type PaginatedProps =
    | { hasPagination: true; rowsPerPage?: number }
    | { hasPagination: false; rowsPerPage?: never }
    | { hasPagination?: never; rowsPerPage?: never };

type TableProps<T extends Record<string, unknown> = Record<string, unknown>> = PaginatedProps & {
    id?: string;
    columns: TableColumns<T>[];
    data: T[];
    sortable?: boolean;
    multiSort?: boolean;
    headerTextAlign?: "right" | "center" | "left";
    contentTextAlign?: "right" | "center" | "left";
    className?: string;
    /** @deprecated Use `sort` and `onSortChange` for controlled sort state. */
    initSort?: SortProps;
    sort?: SortState;
    onSortChange?: (sort: SortState) => void;
    page?: number;
    onPageChange?: (page: number) => void;
    filterValue?: string;
    onFilterChange?: (value: string) => void;
    filterKeys?: (keyof T)[];
    filterFunction?: (row: T, query: string) => boolean;
    manualFiltering?: boolean;
    showFilter?: boolean;
    filterPlaceholder?: string;
    columnFilters?: Record<string, string>;
    onColumnFiltersChange?: (filters: Record<string, string>) => void;
    showColumnFilters?: boolean;
    manualColumnFiltering?: boolean;
    manualSorting?: boolean;
    manualPagination?: boolean;
    totalRows?: number;
    selectable?: SelectionMode;
    selectedRowKeys?: string[];
    onSelectionChange?: (keys: string[], rows: T[]) => void;
    disableRowSelection?: (row: T) => boolean;
    expandable?: boolean;
    expandedRowKeys?: string[];
    onExpandedChange?: (keys: string[]) => void;
    renderExpandedRow?: (row: T) => ReactNode;
    columnVisibility?: Record<string, boolean>;
    onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
    showColumnToggle?: boolean;
    columnOrder?: string[];
    onColumnOrderChange?: (order: string[]) => void;
    columnWidths?: Record<string, number>;
    onColumnWidthsChange?: (widths: Record<string, number>) => void;
    resizable?: boolean;
    reorderable?: boolean;
    showExport?: boolean;
    exportSelected?: boolean;
    exportFilename?: string;
    toolbarContent?: ReactNode;
    bulkActionsContent?: ReactNode | ((selectedKeys: string[], selectedRows: T[]) => ReactNode);
    size?: TableSize;
    theme?: TableTheme;
    variant?: TableVariant;
    appearance?: TableAppearance;
    classNames?: TableClassNames;
    disableAnimations?: boolean;
    scroll?: TableScroll;
    stickyColumn?: StickyColumn;
    virtualized?: boolean;
    virtualRowHeight?: number;
    childrenColumn?: keyof T;
    treeData?: boolean;
    onCellChange?: (row: T, key: string, value: unknown) => void;
    numberRows?: boolean;
    direction?: "rtl" | "ltr";
    icons?: { asc: ReactNode; desc: ReactNode; neutral: ReactNode };
    handleRowClick?: (item: T, e?: React.MouseEvent<HTMLTableRowElement>) => void;
    loading?: boolean;
    emptyContent?: ReactNode;
    loadingContent?: ReactNode;
    rowKey?: (item: T) => string;
    afterSort?: (key: string, mode: SortMode) => void;
    onCurrentDataChange?: (data: T[] | null) => void;
};

export default TableProps;
export type { SortState };
