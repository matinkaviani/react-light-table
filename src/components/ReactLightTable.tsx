import { useEffect, useState } from "react";
import Empty from "./Empty";
import Props, { SortProps } from "./Models/Props";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import TextEllipsis from "./TextEllipsis";
import helpers from "./helpers";

const ReactLightTable = <T,>({
    id,
    columns,
    data,
    sortable,
    headerTextAlign = "center",
    contentTextAlign,
    className,
    hasPagination,
    initSort,
    numberRows,
    rowsPerPage = 50,
    loading,
    handleRowClick,
    rowKey,
    afterSort,
    onCurrentDataChange,
}: Props<T>): JSX.Element => {
    const [sort, setSort] = useState<SortProps | null>(
        initSort
            ? {
                key: initSort.key,
                mode: initSort.mode,
                isAbsoluteValue: initSort.isAbsoluteValue,
            }
            : null
    );
    const [currentPage, setCurrentPage] = useState(1);

    const firstPageIndex = (currentPage - 1) * rowsPerPage;
    const lastPageIndex = firstPageIndex + rowsPerPage;

    const handlePages = (updatedPage: number) => setCurrentPage(updatedPage);

    const requestSort = (key: string, isAbsoluteValue: boolean) => {
        if (!sortable) return;

        const toggleSortMode = (
            currentSort: SortProps | null
        ): SortProps => {
            if (!currentSort || key !== currentSort.key) {
                return { key, mode: "asc", isAbsoluteValue };
            } else {
                const newMode =
                    currentSort.mode === null
                        ? "asc"
                        : currentSort.mode === "asc"
                            ? "desc"
                            : null;
                return { key, mode: newMode, isAbsoluteValue };
            }
        };

        const newSort = toggleSortMode(sort);
        afterSort?.(key, newSort.mode);
        setCurrentPage(1);
        setSort(newSort);
    };

    const getClassNamesFor = (name: string) => {
        if (!sort || !name) return "";
        return sort.key === name ? sort.mode : "";
    };

    let manageData: { [key: string]: any }[] | null = data;

    if (sort && !hasPagination) {
        const column = columns.find((col) => col.key === sort.key);
        if (column && column.sortFunction)
            manageData = column.sortFunction(data, sort.mode);
        else if (sort.mode)
            manageData = [...data].sort(
                helpers[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                    putNullAtBottom: true,
                    sortByAbsValue: sort.isAbsoluteValue,
                })
            );
        else manageData = data;
    }

    if (hasPagination) {
        if (sort) {
            const column = columns.find((col) => col.key === sort.key);
            if (column && column.sortFunction)
                manageData = column.sortFunction(data, sort.mode).slice(
                    firstPageIndex,
                    lastPageIndex
                );
            else
                manageData = data
                    ?.sort(
                        helpers[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                            putNullAtBottom: true,
                            sortByAbsValue: sort.isAbsoluteValue,
                        })
                    )
                    .slice(firstPageIndex, lastPageIndex);
        }
    }

    useEffect(() => {
        onCurrentDataChange?.(manageData);
    }, [currentPage]);

    return (
        <div id="custom-table">
            <table
                id={id}
                className={`react-light-table ${sortable ? "sortable-table" : ""} ${handleRowClick ? "clickable" : ""
                    } ${className ?? ""}`}
            >
                <thead>
                    <tr>
                        {numberRows ? (
                            <th
                                className={`${headerTextAlign ?? ""} number-header-col`}
                            >
                                Row
                            </th>
                        ) : null}
                        {columns.map((column, idx) => {
                            const typeOfTitle =
                                typeof column.title === "string"
                                    ? column.title
                                    : column.title();
                            return (
                                <th
                                    key={idx}
                                    onClick={() =>
                                        sortable && column.sortable
                                            ? requestSort(column.key! as string, column.isAbsoluteValue!)
                                            : undefined
                                    }
                                    className={`${headerTextAlign} ${getClassNamesFor(
                                        column.key as string
                                    )} ${column.headClassName ?? ""}`}
                                    title={typeOfTitle}
                                >
                                    <span className="sortable-header">
                                        {column.isHeadNowrap ? (
                                            <TextEllipsis children={typeOfTitle} />
                                        ) : (
                                            typeOfTitle
                                        )}
                                    </span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                {loading || !manageData || !manageData.length ? null : (
                    <tbody>
                        {manageData.map((item: any, idx: number) => (
                            <tr
                                key={rowKey ? `row-${rowKey(item)}` : idx}
                                onClick={(e) =>
                                    handleRowClick ? handleRowClick(item, e) : undefined
                                }
                            >
                                {numberRows ? (
                                    <td
                                        key="row"
                                        className={`${contentTextAlign ?? ""} number-row`}
                                    >
                                        {idx + 1 + (currentPage - 1) * rowsPerPage}
                                    </td>
                                ) : null}
                                {columns.map((column) => (
                                    <td
                                        key={column.key as string}
                                        className={`${column.cellClassName ?? ""} ${contentTextAlign ?? ""
                                            }`}
                                    >
                                        {column.render
                                            ? column.render(column.key! as string, item)
                                            : item[column.key!]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
            {!manageData || !manageData.length ? (
                <div>
                    <Empty />
                </div>
            ) : null}
            <div className="spinner-loader">
                <Spinner loading={loading ?? false} />
            </div>
            {!loading && hasPagination ? (
                <Pagination
                    page={currentPage}
                    totalPages={Math.ceil((data?.length ?? 0) / rowsPerPage)}
                    handlePagination={handlePages}
                />
            ) : null}
        </div>
    );
};

export default ReactLightTable;
