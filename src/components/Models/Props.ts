import { ReactNode } from "react";
export type SortMode = "asc" | "desc" | null;
export interface SortProps {
    key: string;
    mode: SortMode;
    isAbsoluteValue?: boolean;
}
export interface TableColumns<T = any> {
    key?: keyof T;
    title: string | (() => string);
    isHeadNowrap?: boolean;
    sortable?: boolean;
    isAbsoluteValue?: boolean;
    headClassName?: string;
    cellClassName?: string;
    render?: (key: string, record: T) => ReactNode;
    sortFunction?: (data: Record<string, any>[] | null, sortMode: SortMode) => Record<string, any>[];
}
type PaginatedProps = {
    hasPagination: true;
    rowsPerPage?: number;
} | {
    hasPagination: false;
    rowsPerPage?: never;
} | {
    hasPagination?: never;
    rowsPerPage?: never;
};
type TableProps<T> = PaginatedProps & {
    id?: string;
    columns: TableColumns<T>[];
    data: Record<string, any>[];
    sortable?: boolean;
    headerTextAlign?: "right" | "center" | "left";
    contentTextAlign?: "right" | "center" | "left";
    className?: string;
    initSort?: SortProps;
    numberRows?: boolean;
    direction?: "rtl" | "ltr";
    icons?: {
        asc: ReactNode;
        desc: ReactNode;
        neutral: ReactNode;
    };
    handleRowClick?: (item: T, e?: React.MouseEvent<HTMLTableRowElement>) => void;
    loading?: boolean;
    rowKey?: (item: T) => string;
    afterSort?: (key: string, mode: SortMode) => void;
    onCurrentDataChange?: (data: any) => void;
};
export default TableProps;
