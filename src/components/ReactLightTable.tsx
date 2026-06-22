import {
    Fragment,
    useCallback,
    useMemo,
    type CSSProperties,
    type DragEvent,
    type KeyboardEvent,
    type MouseEvent,
    type ReactElement,
    type ReactNode,
} from "react";
import { applyAppearance } from "./applyAppearance";
import BulkActionBar from "./BulkActionBar";
import ColumnFilter from "./ColumnFilter";
import ColumnResizer from "./ColumnResizer";
import ColumnToggle from "./ColumnToggle";
import EditableCell from "./EditableCell";
import Empty from "./Empty";
import { ExpandCell, ExpandHeader } from "./ExpandColumn";
import Props, { TableColumns } from "./Models/Props";
import Pagination from "./Pagination";
import { SelectionCell, SelectionHeader } from "./SelectionColumn";
import { Neutral, SortAsc, SortDesc } from "./SortIndicators";
import Spinner from "./Spinner";
import TableFilter from "./TableFilter";
import TextEllipsis from "./TextEllipsis";
import { isColumnSorted } from "./sortUtils";
import { useReactLightTable } from "./useReactLightTable";
import { useVirtualWindow } from "./useVirtualWindow";

const getAriaSortValue = (mode: "asc" | "desc" | null): "ascending" | "descending" | "none" => {
    if (mode === "asc") return "ascending";
    if (mode === "desc") return "descending";
    return "none";
};

const isEditable = <T extends Record<string, unknown>>(
    column: TableColumns<T>,
    row: T
): boolean => {
    if (!column.editable) return false;
    if (typeof column.editable === "function") return column.editable(row);
    return true;
};

export const ReactLightTable = <T extends Record<string, unknown>>(props: Props<T>): ReactElement => {
    const {
        id,
        columns,
        sortable,
        multiSort = false,
        headerTextAlign = "center",
        contentTextAlign,
        className,
        hasPagination = false,
        showFilter = false,
        filterPlaceholder,
        showColumnFilters = false,
        selectable,
        disableRowSelection,
        expandable = false,
        renderExpandedRow,
        showColumnToggle = false,
        showExport = false,
        exportSelected = false,
        toolbarContent,
        bulkActionsContent,
        size = "default",
        theme = "light",
        variant = "default",
        appearance,
        classNames,
        disableAnimations = false,
        scroll,
        stickyColumn,
        virtualized = false,
        virtualRowHeight = 44,
        treeData = false,
        childrenColumn,
        onCellChange,
        numberRows,
        rowsPerPage = 50,
        loading,
        direction = "ltr",
        icons = { asc: <SortAsc />, desc: <SortDesc />, neutral: <Neutral /> },
        handleRowClick,
        rowKey,
        emptyContent,
        loadingContent,
        resizable = false,
        reorderable = false,
    } = props;

    const table = useReactLightTable(props);

    if (selectable && !rowKey && process.env.NODE_ENV !== "production") {
        console.warn("react-light-table: `rowKey` is required when `selectable` is enabled.");
    }

    const {
        sort,
        currentPage,
        filterValue,
        columnFilters,
        selectedRowKeys,
        selectedRows,
        expandedRowKeys,
        columnVisibility,
        columnWidths,
        selectionMode,
        visibleColumns,
        displayRows,
        totalPages,
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
    } = table;

    const showExpandColumn = expandable || (treeData && Boolean(childrenColumn));
    const viewportHeight =
        typeof scroll?.y === "number" ? scroll.y : virtualized ? 400 : 0;
    const { windowState, onScroll } = useVirtualWindow(
        displayRows.length,
        virtualRowHeight,
        viewportHeight
    );

    const virtualizedRows = useMemo(() => {
        if (!virtualized) return displayRows;
        return displayRows.slice(windowState.start, windowState.end);
    }, [displayRows, virtualized, windowState.end, windowState.start]);

    const rowsToRender = virtualized ? virtualizedRows : displayRows;

    const handleThClick = useCallback(
        (event: MouseEvent<HTMLTableCellElement>, column: TableColumns<T>) => {
            if (sortable && column.sortable) {
                requestSort(
                    column.key?.toString() ?? "",
                    column.isAbsoluteValue ?? false,
                    event.shiftKey && multiSort
                );
            }
        },
        [multiSort, requestSort, sortable]
    );

    const handleThKeyDown = useCallback(
        (event: KeyboardEvent<HTMLTableCellElement>, column: TableColumns<T>) => {
            if (!sortable || !column.sortable) return;
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                requestSort(
                    column.key?.toString() ?? "",
                    column.isAbsoluteValue ?? false,
                    event.shiftKey && multiSort
                );
            }
        },
        [multiSort, requestSort, sortable]
    );

    const getClassNamesFor = (name: string) => {
        const columnSort = isColumnSorted(sort, name);
        if (!columnSort) return "";
        return ` ${columnSort.mode ?? ""}`;
    };

    const renderSortIndicator = (columnKey: string) => {
        const columnSort = isColumnSorted(sort, columnKey);
        if (!sortable || !columnSort?.mode) return null;

        let component: ReactNode = icons.neutral;
        if (columnSort.mode === "asc") component = icons.asc;
        if (columnSort.mode === "desc") component = icons.desc;

        return <span className="sort-indicator">{component}</span>;
    };

    const handleRowInteraction = (item: T, event: MouseEvent<HTMLTableRowElement>) => {
        if (handleRowClick) handleRowClick(item, event);
    };

    const showToolbar =
        showFilter || showColumnToggle || showExport || Boolean(toolbarContent) || Boolean(bulkActionsContent);
    const showEmptyState = !loading && displayRows.length === 0;
    const extraColumns =
        (numberRows ? 1 : 0) + (selectionMode ? 1 : 0) + (showExpandColumn ? 1 : 0);

    const hasColumnFilters = showColumnFilters && visibleColumns.some((column) => column.filter);

    const wrapperClassName = [
        "react-light-table-root",
        size === "compact" ? "react-light-table-compact" : "",
        theme === "dark" ? "react-light-table-dark" : "",
        variant !== "default" ? `react-light-table-${variant}` : "",
        !disableAnimations && !virtualized ? "react-light-table-animated" : "",
        virtualized ? "react-light-table-virtual" : "",
        scroll?.x ? "react-light-table-scroll-x" : "",
        stickyColumn ? `react-light-table-sticky-${stickyColumn}` : "",
        className ?? "",
        classNames?.root ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    const appearanceStyle = applyAppearance(appearance);
    const scrollContainerStyle: CSSProperties | undefined = scroll?.y
        ? { maxHeight: scroll.y, overflowY: "auto" }
        : virtualized
          ? { maxHeight: viewportHeight, overflowY: "auto" }
          : undefined;

    const tableStyle: CSSProperties | undefined = scroll?.x
        ? { minWidth: scroll.x, width: scroll.x }
        : undefined;

    const dragColumnKey = useCallback((event: DragEvent<HTMLTableCellElement>) => {
        const key = event.currentTarget.dataset.columnKey;
        if (key) event.dataTransfer.setData("text/plain", key);
    }, []);

    const dropOnColumn = useCallback(
        (event: DragEvent<HTMLTableCellElement>) => {
            event.preventDefault();
            const fromKey = event.dataTransfer.getData("text/plain");
            const toKey = event.currentTarget.dataset.columnKey;
            if (fromKey && toKey) reorderColumn(fromKey, toKey);
        },
        [reorderColumn]
    );

    const renderRow = (
        entry: (typeof displayRows)[number],
        idx: number,
        virtualIndex?: number
    ) => {
        const item = entry.row;
        const itemKey = entry.key;
        const isSelected = selectedRowKeys.includes(itemKey);
        const isExpanded = expandedRowKeys.includes(itemKey);
        const rowIndex = virtualIndex ?? idx;
        const rowStyle = {
            "--row-index": rowIndex,
            "--tree-depth": entry.depth,
        } as CSSProperties;

        return (
            <Fragment key={itemKey}>
                <tr
                    className={`table-row${isSelected ? " row-selected" : ""}${
                        isExpanded ? " row-expanded" : ""
                    }${entry.depth ? " tree-row" : ""}${classNames?.row ? ` ${classNames.row}` : ""}`}
                    style={rowStyle}
                    onClick={(event) => handleRowInteraction(item, event)}
                >
                    {showExpandColumn ? (
                        <ExpandCell
                            expanded={isExpanded}
                            onToggle={() => toggleExpandedRow(itemKey)}
                            contentTextAlign={contentTextAlign}
                            indent={treeData ? entry.depth : 0}
                            hasChildren={entry.hasChildren}
                        />
                    ) : null}
                    {selectionMode && rowKey ? (
                        <SelectionCell
                            mode={selectionMode}
                            selectedRowKeys={selectedRowKeys}
                            rowKey={rowKey}
                            row={item}
                            pageRows={rowsToRender.map((rowEntry) => rowEntry.row)}
                            onSelectionChange={handleSelectionChange}
                            disableRowSelection={disableRowSelection}
                            contentTextAlign={contentTextAlign}
                        />
                    ) : null}
                    {numberRows ? (
                        <td
                            className={`number-row${contentTextAlign ? ` ${contentTextAlign}` : ""}`}
                        >
                            {rowIndex + 1 + (currentPage - 1) * rowsPerPage}
                        </td>
                    ) : null}
                    {visibleColumns.map((column, columnIndex) => {
                        const columnKey = column.key?.toString() ?? "";
                        const width = columnWidths[columnKey] ?? column.width;
                        const stickyClass =
                            stickyColumn === "first" && columnIndex === 0
                                ? " sticky-col-first"
                                : stickyColumn === "last" && columnIndex === visibleColumns.length - 1
                                  ? " sticky-col-last"
                                  : "";

                        return (
                            <td
                                key={columnKey}
                                style={width ? { width, minWidth: width, maxWidth: width } : undefined}
                                className={`${column.cellClassName || ""}${
                                    column.cellClassName && contentTextAlign ? " " : ""
                                }${contentTextAlign || ""}${stickyClass}${
                                    classNames?.cell ? ` ${classNames.cell}` : ""
                                }`}
                            >
                                {column.render
                                    ? column.render(column.key! as string, item)
                                    : isEditable(column, item) && onCellChange
                                      ? (
                                            <EditableCell
                                                row={item}
                                                columnKey={columnKey}
                                                value={item[column.key!]}
                                                editType={column.editType}
                                                editOptions={column.editOptions}
                                                onSave={(value) => onCellChange(item, columnKey, value)}
                                            />
                                        )
                                      : String(item[column.key!] ?? "")}
                            </td>
                        );
                    })}
                </tr>
                {expandable && !treeData && isExpanded && renderExpandedRow ? (
                    <tr key={`${itemKey}-expanded`} className="expanded-row">
                        <td colSpan={visibleColumns.length + extraColumns}>
                            <div className="expanded-row-content">{renderExpandedRow(item)}</div>
                        </td>
                    </tr>
                ) : null}
            </Fragment>
        );
    };

    const bulkActions =
        typeof bulkActionsContent === "function"
            ? bulkActionsContent(selectedRowKeys, selectedRows)
            : bulkActionsContent;

    return (
        <div id="react-light-table" className={wrapperClassName} style={appearanceStyle}>
            {showToolbar ? (
                <div className={`table-toolbar${classNames?.toolbar ? ` ${classNames.toolbar}` : ""}`}>
                    {showFilter ? (
                        <TableFilter
                            value={filterValue}
                            onChange={setFilterValue}
                            placeholder={filterPlaceholder}
                            className={classNames?.filter}
                        />
                    ) : null}
                    {showColumnToggle ? (
                        <ColumnToggle
                            columns={columns}
                            columnVisibility={columnVisibility}
                            onColumnVisibilityChange={setColumnVisibility}
                        />
                    ) : null}
                    {showExport ? (
                        <button
                            type="button"
                            className={`table-export-button${classNames?.exportButton ? ` ${classNames.exportButton}` : ""}`}
                            onClick={handleExport}
                        >
                            {exportSelected && selectedRowKeys.length
                                ? `Export ${selectedRowKeys.length} selected`
                                : "Export CSV"}
                        </button>
                    ) : null}
                    {toolbarContent}
                </div>
            ) : null}

            {bulkActions ? (
                <BulkActionBar selectedCount={selectedRowKeys.length} className={classNames?.bulkActions}>
                    {bulkActions}
                </BulkActionBar>
            ) : null}

            <div className={`table-surface${classNames?.surface ? ` ${classNames.surface}` : ""}`}>
                <div
                    className={`table-scroll-container${classNames?.scrollContainer ? ` ${classNames.scrollContainer}` : ""}`}
                    style={scrollContainerStyle}
                    onScroll={virtualized || scroll?.y ? onScroll : undefined}
                >
                    <table
                        id={id}
                        role="table"
                        style={tableStyle}
                        className={`react-light-table-wrapper${sortable ? " sortable-table" : ""}${
                            handleRowClick ? " clickable" : ""
                        }${classNames?.table ? ` ${classNames.table}` : ""}`}
                    >
                        <thead>
                            <tr className={classNames?.headerRow}>
                                {showExpandColumn ? (
                                    <ExpandHeader headerTextAlign={headerTextAlign} />
                                ) : null}
                                {selectionMode && rowKey ? (
                                    <SelectionHeader
                                        mode={selectionMode}
                                        selectedRowKeys={selectedRowKeys}
                                        rowKey={rowKey}
                                        pageRows={rowsToRender.map((entry) => entry.row)}
                                        onSelectionChange={handleSelectionChange}
                                        disableRowSelection={disableRowSelection}
                                        headerTextAlign={headerTextAlign}
                                    />
                                ) : null}
                                {numberRows ? (
                                    <th
                                        className={`number-header-col${headerTextAlign ? ` ${headerTextAlign}` : ""}`}
                                        scope="col"
                                    >
                                        Row
                                    </th>
                                ) : null}
                                {visibleColumns.map((column, columnIndex) => {
                                    const typeOfTitle =
                                        typeof column.title === "string"
                                            ? column.title
                                            : column.title();
                                    const columnKey = column.key?.toString() ?? "";
                                    const columnSort = isColumnSorted(sort, columnKey);
                                    const width = columnWidths[columnKey] ?? column.width;
                                    const stickyClass =
                                        stickyColumn === "first" && columnIndex === 0
                                            ? " sticky-col-first"
                                            : stickyColumn === "last" &&
                                                columnIndex === visibleColumns.length - 1
                                              ? " sticky-col-last"
                                              : "";

                                    return (
                                        <th
                                            key={columnKey}
                                            data-column-key={columnKey}
                                            draggable={reorderable}
                                            onDragStart={reorderable ? dragColumnKey : undefined}
                                            onDragOver={
                                                reorderable
                                                    ? (event) => event.preventDefault()
                                                    : undefined
                                            }
                                            onDrop={reorderable ? dropOnColumn : undefined}
                                            onClick={(event) => handleThClick(event, column)}
                                            onKeyDown={(event) => handleThKeyDown(event, column)}
                                            tabIndex={sortable && column.sortable ? 0 : undefined}
                                            aria-sort={
                                                columnSort?.mode
                                                    ? getAriaSortValue(columnSort.mode)
                                                    : undefined
                                            }
                                            style={
                                                width
                                                    ? { width, minWidth: width, maxWidth: width }
                                                    : undefined
                                            }
                                            className={`${headerTextAlign ? `${headerTextAlign}` : ""}${
                                                sortable ? getClassNamesFor(columnKey) : ""
                                            }${column.headClassName ? ` ${column.headClassName}` : ""}${stickyClass}${
                                                classNames?.headerCell ? ` ${classNames.headerCell}` : ""
                                            }`}
                                            title={typeOfTitle}
                                            scope="col"
                                        >
                                            <span
                                                className={`${
                                                    sortable && column.sortable ? "sortable-header" : ""
                                                }`}
                                            >
                                                {column.isHeadNowrap ? (
                                                    <TextEllipsis
                                                        className={`${headerTextAlign}`}
                                                        dir={direction}
                                                        children={typeOfTitle}
                                                    />
                                                ) : (
                                                    typeOfTitle
                                                )}
                                                {renderSortIndicator(columnKey)}
                                            </span>
                                            {resizable ? (
                                                <ColumnResizer
                                                    columnKey={columnKey}
                                                    width={width}
                                                    onResize={resizeColumn}
                                                />
                                            ) : null}
                                        </th>
                                    );
                                })}
                            </tr>
                            {hasColumnFilters ? (
                                <tr className={`column-filter-row${classNames?.filterRow ? ` ${classNames.filterRow}` : ""}`}>
                                    {showExpandColumn ? <th /> : null}
                                    {selectionMode && rowKey ? <th /> : null}
                                    {numberRows ? <th /> : null}
                                    {visibleColumns.map((column) => {
                                        const columnKey = column.key?.toString() ?? "";
                                        const filterType =
                                            column.filter === true ? "text" : column.filter;

                                        return (
                                            <th
                                                key={`filter-${columnKey}`}
                                                className={classNames?.filterCell}
                                            >
                                                {filterType ? (
                                                    <ColumnFilter
                                                        type={filterType}
                                                        value={columnFilters[columnKey] ?? ""}
                                                        placeholder={column.filterPlaceholder}
                                                        options={column.filterOptions}
                                                        onChange={(value) =>
                                                            updateColumnFilter(columnKey, value)
                                                        }
                                                    />
                                                ) : null}
                                            </th>
                                        );
                                    })}
                                </tr>
                            ) : null}
                        </thead>
                        {loading || displayRows.length === 0 ? null : (
                            <tbody className={classNames?.body}>
                                {virtualized ? (
                                    <>
                                        {windowState.offsetTop > 0 ? (
                                            <tr aria-hidden="true">
                                                <td
                                                    colSpan={visibleColumns.length + extraColumns}
                                                    style={{ height: windowState.offsetTop, padding: 0, border: 0 }}
                                                />
                                            </tr>
                                        ) : null}
                                        {rowsToRender.map((entry, idx) =>
                                            renderRow(entry, idx, idx)
                                        )}
                                        {windowState.offsetBottom > 0 ? (
                                            <tr aria-hidden="true">
                                                <td
                                                    colSpan={visibleColumns.length + extraColumns}
                                                    style={{
                                                        height: windowState.offsetBottom,
                                                        padding: 0,
                                                        border: 0,
                                                    }}
                                                />
                                            </tr>
                                        ) : null}
                                    </>
                                ) : (
                                    rowsToRender.map((entry, idx) => renderRow(entry, idx))
                                )}
                            </tbody>
                        )}
                    </table>
                </div>
                {!loading && hasPagination ? (
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        handlePagination={setCurrentPage}
                        className={classNames?.pagination}
                    />
                ) : null}
                <Spinner
                    loading={loading ?? false}
                    loadingContent={loadingContent}
                    className={classNames?.loading}
                />
            </div>
            {showEmptyState ? (
                <div className={classNames?.empty}>{emptyContent ?? <Empty />}</div>
            ) : null}
        </div>
    );
};
