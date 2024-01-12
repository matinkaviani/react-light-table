import { useCallback, useEffect, useState } from "react";
import Empty from "./Empty";
import Props, { SortProps, TableColumns } from "./Models/Props";
import Pagination from "./Pagination";
import { Neutral, SortAsc, SortDesc } from "./SortIndicators";
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
    direction = "ltr",
    icons = { asc: <SortAsc />, desc: <SortDesc />, neutral: <Neutral /> },
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
        if (currentPage !== 1)
            setCurrentPage(1);
        setSort(newSort);
    };
    const handleThClick = useCallback(
        (column: TableColumns<T>) => {
            sortable && column.sortable
                ? requestSort(column.key?.toString() ?? "", column.isAbsoluteValue ?? false)
                : undefined;
        },
        [sortable, requestSort]
    );
    const getClassNamesFor = (name: string) => {
        if (!sort || !name) return "";
        return sort.key === name ? ` ${sort.mode ?? ""}` : "";
    };
    const SortIndicator = () => {
        if (!sortable || !sort) return null;
        let component = null;
        switch (sort.mode) {
            case "asc":
                component = icons.asc
                break;
            case "desc":
                component = icons.desc
                break;
            default:
                component = icons.neutral
                break;
        }
        return <>{component}</>;
    }
    let manageData: Record<string, any>[] | null = data;

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
        if (sort && sort.mode !== null) {
            const column = columns.find((col) => col.key === sort.key);
            if (column && column.sortFunction) {
                manageData = column.sortFunction(data, sort.mode).slice(
                    firstPageIndex,
                    lastPageIndex
                );
            } else {
                manageData = [...data]
                    .sort(
                        helpers[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                            putNullAtBottom: true,
                            sortByAbsValue: sort.isAbsoluteValue,
                        })
                    )
                    .slice(firstPageIndex, lastPageIndex);
            }
        } else {
            // If sort is null or sort.mode is null, use the original data without sorting
            manageData = data.slice(firstPageIndex, lastPageIndex);
        }
    }

    useEffect(() => {
        onCurrentDataChange?.(manageData);
    }, [currentPage]);

    return (
        <div id="react-light-table">
            <table
                id={id}
                className={`react-light-table-wrapper${sortable ? " sortable-table" : ""}${handleRowClick ? " clickable" : ""
                    }${className ? ` ${className}` : ""}`}
            >
                <thead>
                    <tr>
                        {numberRows ? (
                            <th
                                className={`number-header-col${headerTextAlign ? ` ${headerTextAlign}` : ""}`}
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
                                    onClick={() => handleThClick(column)}
                                    className={`${headerTextAlign ? `${headerTextAlign}` : ""}${sortable ? getClassNamesFor(column.key as string) : ""}${column.headClassName ? ` ${column.headClassName}` : ""}`}
                                    title={typeOfTitle}
                                >
                                    <span className={`${sortable && column.sortable ? "sortable-header" : ""}`}>
                                        {column.isHeadNowrap ? (
                                            <TextEllipsis className={`${headerTextAlign}`} dir={direction} children={typeOfTitle} />
                                        ) : (
                                            typeOfTitle
                                        )}
                                        {column.sortable && column.key === sort?.key ? (
                                            <SortIndicator />
                                        ) : null}
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
                                        className={`number-row${contentTextAlign ? ` ${contentTextAlign}` : ""}`}
                                    >
                                        {idx + 1 + (currentPage - 1) * rowsPerPage}
                                    </td>
                                ) : null}
                                {columns.map((column) => (
                                    <td
                                        key={column.key as string}
                                        className={`${column.cellClassName || ""}${column.cellClassName && contentTextAlign ? " " : ""}${contentTextAlign || ""}`}
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
            <Spinner loading={loading ?? false} />
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
