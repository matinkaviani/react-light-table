import { useEffect, useMemo, useState } from "react";
import { ReactLightTable, getPrimarySort, type SortState } from "react-light-table";

type Person = {
    name: string;
    age: number;
    department: string;
    bio: string;
};

const baseData: Person[] = [
    { name: "Alice Johnson", age: 28, department: "Engineering", bio: "Full-stack engineer" },
    { name: "Bob Smith", age: 34, department: "Design", bio: "Product designer" },
    { name: "Charlie Brown", age: 22, department: "Marketing", bio: "Growth marketer" },
    { name: "Dana Lee", age: 41, department: "Engineering", bio: "Staff engineer" },
    { name: "Eve Adams", age: 31, department: "Sales", bio: "Account executive" },
    { name: "Frank Miller", age: 27, department: "Design", bio: "Visual designer" },
    { name: "Grace Kim", age: 36, department: "Marketing", bio: "Brand strategist" },
    { name: "Henry Wilson", age: 29, department: "Sales", bio: "Sales lead" },
    { name: "Ivy Chen", age: 33, department: "Engineering", bio: "Frontend engineer" },
    { name: "Jack Taylor", age: 24, department: "Design", bio: "UX researcher" },
    { name: "Kate Moore", age: 38, department: "Marketing", bio: "Marketing director" },
    { name: "Leo Garcia", age: 26, department: "Sales", bio: "SDR" },
];

const columns = [
    { key: "name", title: "Name", sortable: true, isHeadNowrap: true, filter: "text" as const },
    { key: "age", title: "Age", sortable: true },
    { key: "department", title: "Department", sortable: true, filter: "select" as const, filterOptions: [
        { label: "Engineering", value: "Engineering" },
        { label: "Design", value: "Design" },
        { label: "Marketing", value: "Marketing" },
        { label: "Sales", value: "Sales" },
    ] },
] as const;

type TreeNode = {
    id: string;
    name: string;
    department: string;
    children?: TreeNode[];
};

const treeData: TreeNode[] = [
    {
        id: "eng",
        name: "Engineering",
        department: "Engineering",
        children: [
            { id: "eng-1", name: "Alice Johnson", department: "Engineering" },
            { id: "eng-2", name: "Dana Lee", department: "Engineering" },
        ],
    },
    {
        id: "design",
        name: "Design",
        department: "Design",
        children: [
            { id: "design-1", name: "Bob Smith", department: "Design" },
            { id: "design-2", name: "Frank Miller", department: "Design" },
        ],
    },
];

const virtualData = Array.from({ length: 500 }, (_, index) => ({
    name: `User ${index + 1}`,
    age: 20 + (index % 30),
    department: ["Engineering", "Design", "Marketing", "Sales"][index % 4],
    bio: `Bio for user ${index + 1}`,
}));

const scenarios = [
    "basic",
    "pagination",
    "controlled",
    "filter",
    "selection",
    "server",
    "expandable",
    "columns",
    "export",
    "custom",
    "dark",
    "loading",
    "empty",
    "rtl",
    "multi-sort",
    "column-filters",
    "striped",
    "editable",
    "bulk",
    "virtual",
    "tree",
    "resize",
] as const;

type Scenario = (typeof scenarios)[number];

function sortRows(rows: Person[], sort: SortState) {
    const primary = getPrimarySort(sort);
    if (!primary?.mode) return rows;
    return [...rows].sort((a, b) => {
        const left = a[primary.key as keyof Person];
        const right = b[primary.key as keyof Person];
        if (left === right) return 0;
        if (left > right) return primary.mode === "asc" ? 1 : -1;
        return primary.mode === "asc" ? -1 : 1;
    });
}

function filterRows(rows: Person[], query: string) {
    const lower = query.trim().toLowerCase();
    if (!lower) return rows;
    return rows.filter((row) =>
        [row.name, row.department, row.bio].some((value) => value.toLowerCase().includes(lower))
    );
}

export default function App() {
    const [scenario, setScenario] = useState<Scenario>("basic");
    const [sort, setSort] = useState<SortState>({ key: "name", mode: "asc" });
    const primarySort = getPrimarySort(sort);
    const [page, setPage] = useState(1);
    const [filterValue, setFilterValue] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
        name: true,
        age: true,
        department: true,
    });
    const [loading, setLoading] = useState(false);
    const [serverRows, setServerRows] = useState<Person[]>(baseData.slice(0, 4));
    const [serverTotal, setServerTotal] = useState(baseData.length);
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const [editableData, setEditableData] = useState<Person[]>(baseData.slice(0, 6));

    const data = scenario === "empty" ? [] : baseData;

    useEffect(() => {
        if (scenario !== "server") return;

        setLoading(true);
        const timeout = window.setTimeout(() => {
            const filtered = filterRows(baseData, filterValue);
            const sorted = sortRows(filtered, sort);
            const start = (page - 1) * 4;
            setServerRows(sorted.slice(start, start + 4));
            setServerTotal(sorted.length);
            setLoading(false);
        }, 500);

        return () => window.clearTimeout(timeout);
    }, [scenario, sort, page, filterValue]);

    const selectedCount = useMemo(() => selectedRowKeys.length, [selectedRowKeys]);

    const runLoadingDemo = () => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 1200);
    };

    const resetScenarioState = (item: Scenario) => {
        setScenario(item);
        setPage(1);
        setFilterValue("");
        setSelectedRowKeys([]);
        setExpandedRowKeys([]);
        setLoading(false);
    };

    return (
        <div className="playground">
            <header className="playground-header">
                <h1>react-light-table playground</h1>
                <p>Local dev build importing source from ../src</p>
            </header>

            <div className="playground-controls">
                {scenarios.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={scenario === item ? "active" : ""}
                        onClick={() => resetScenarioState(item)}
                    >
                        {item}
                    </button>
                ))}
                {scenario === "loading" ? (
                    <button type="button" onClick={runLoadingDemo}>
                        Trigger loading
                    </button>
                ) : null}
            </div>

            <section className="playground-panel">
                {scenario === "basic" ? (
                    <ReactLightTable
                        id="basic-table"
                        columns={[...columns]}
                        data={data}
                        sortable
                        numberRows
                        handleRowClick={(row: Person) => window.alert(`Clicked ${row.name}`)}
                    />
                ) : null}

                {scenario === "pagination" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        hasPagination
                        rowsPerPage={4}
                    />
                ) : null}

                {scenario === "controlled" ? (
                    <>
                        <p>
                            Sort: {primarySort?.key} ({primarySort?.mode ?? "none"}) · Page: {page}
                        </p>
                        <ReactLightTable
                            columns={[...columns]}
                            data={data}
                            sortable
                            hasPagination
                            rowsPerPage={4}
                            sort={sort}
                            onSortChange={setSort}
                            page={page}
                            onPageChange={setPage}
                        />
                    </>
                ) : null}

                {scenario === "filter" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        showFilter
                        filterPlaceholder="Search name or department"
                    />
                ) : null}

                {scenario === "selection" ? (
                    <>
                        <p>Selected rows: {selectedCount}</p>
                        <ReactLightTable
                            columns={[...columns]}
                            data={data}
                            selectable="multiple"
                            rowKey={(row) => row.name}
                            selectedRowKeys={selectedRowKeys}
                            onSelectionChange={(keys) => setSelectedRowKeys(keys)}
                            hasPagination
                            rowsPerPage={4}
                        />
                    </>
                ) : null}

                {scenario === "server" ? (
                    <>
                        <p>
                            Server mode · sort: {primarySort?.key} ({primarySort?.mode ?? "none"}) · page: {page} ·
                            total: {serverTotal}
                        </p>
                        <ReactLightTable
                            columns={[...columns]}
                            data={serverRows}
                            sortable
                            hasPagination
                            rowsPerPage={4}
                            sort={sort}
                            onSortChange={setSort}
                            page={page}
                            onPageChange={setPage}
                            filterValue={filterValue}
                            onFilterChange={setFilterValue}
                            showFilter
                            manualSorting
                            manualPagination
                            manualFiltering
                            totalRows={serverTotal}
                            loading={loading}
                        />
                    </>
                ) : null}

                {scenario === "expandable" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        expandable
                        rowKey={(row) => row.name}
                        expandedRowKeys={expandedRowKeys}
                        onExpandedChange={setExpandedRowKeys}
                        renderExpandedRow={(row) => (
                            <div>
                                <strong>{row.name}</strong> works in {row.department}. {row.bio}
                            </div>
                        )}
                    />
                ) : null}

                {scenario === "columns" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        showColumnToggle
                        columnVisibility={columnVisibility}
                        onColumnVisibilityChange={setColumnVisibility}
                    />
                ) : null}

                {scenario === "export" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        showFilter
                        showExport
                        exportFilename="people.csv"
                    />
                ) : null}

                {scenario === "custom" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        showFilter
                        hasPagination
                        rowsPerPage={4}
                        appearance={{
                            accent: "#8b5cf6",
                            accentForeground: "#ffffff",
                            background: "#fffdf8",
                            foreground: "#3f2f63",
                            border: "#e9defa",
                            hover: "#f6f0ff",
                            mutedBackground: "#f3ebff",
                            headerBackground: "#f8f4ff",
                            radius: "1rem",
                            shadow: "0 10px 30px rgba(91, 33, 182, 0.08)",
                        }}
                        classNames={{
                            root: "playground-custom-table",
                            row: "playground-custom-row",
                        }}
                    />
                ) : null}

                {scenario === "dark" ? (
                    <div className="playground-panel-dark">
                        <ReactLightTable
                            columns={[...columns]}
                            data={data}
                            sortable
                            theme="dark"
                            size="compact"
                            hasPagination
                            rowsPerPage={4}
                        />
                    </div>
                ) : null}

                {scenario === "loading" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        loading={loading}
                        loadingContent={<div className="custom-loading">Loading table...</div>}
                    />
                ) : null}

                {scenario === "empty" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        emptyContent={<div className="custom-empty">No people found.</div>}
                    />
                ) : null}

                {scenario === "rtl" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        direction="rtl"
                        headerTextAlign="right"
                        contentTextAlign="right"
                    />
                ) : null}

                {scenario === "multi-sort" ? (
                    <>
                        <p>Click headers to sort. Hold Shift and click to add secondary sorts.</p>
                        <ReactLightTable
                            columns={[...columns]}
                            data={data}
                            sortable
                            multiSort
                        />
                    </>
                ) : null}

                {scenario === "column-filters" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        showColumnFilters
                        columnFilters={columnFilters}
                        onColumnFiltersChange={setColumnFilters}
                    />
                ) : null}

                {scenario === "striped" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        variant="striped"
                        hasPagination
                        rowsPerPage={4}
                    />
                ) : null}

                {scenario === "editable" ? (
                    <ReactLightTable
                        columns={[
                            { key: "name", title: "Name", editable: true },
                            { key: "age", title: "Age", editable: true, editType: "number" },
                            {
                                key: "department",
                                title: "Department",
                                editable: true,
                                editType: "select",
                                editOptions: [
                                    { label: "Engineering", value: "Engineering" },
                                    { label: "Design", value: "Design" },
                                    { label: "Marketing", value: "Marketing" },
                                    { label: "Sales", value: "Sales" },
                                ],
                            },
                        ]}
                        data={editableData}
                        rowKey={(row) => row.name}
                        onCellChange={(row, key, value) => {
                            setEditableData((rows) =>
                                rows.map((item) =>
                                    item.name === row.name ? { ...item, [key]: value } : item
                                )
                            );
                        }}
                    />
                ) : null}

                {scenario === "bulk" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        selectable="multiple"
                        rowKey={(row) => row.name}
                        selectedRowKeys={selectedRowKeys}
                        onSelectionChange={(keys) => setSelectedRowKeys(keys)}
                        showExport
                        exportSelected
                        bulkActionsContent={
                            <button type="button" onClick={() => window.alert(`Delete ${selectedCount} rows`)}>
                                Delete selected
                            </button>
                        }
                    />
                ) : null}

                {scenario === "virtual" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={virtualData}
                        sortable
                        virtualized
                        scroll={{ y: 360 }}
                        virtualRowHeight={44}
                    />
                ) : null}

                {scenario === "tree" ? (
                    <ReactLightTable
                        columns={[
                            { key: "name", title: "Name" },
                            { key: "department", title: "Department" },
                        ]}
                        data={treeData}
                        treeData
                        childrenColumn="children"
                        rowKey={(row) => row.id}
                        expandedRowKeys={expandedRowKeys}
                        onExpandedChange={setExpandedRowKeys}
                    />
                ) : null}

                {scenario === "resize" ? (
                    <ReactLightTable
                        columns={[...columns]}
                        data={data}
                        sortable
                        resizable
                        reorderable
                        scroll={{ x: 720 }}
                        stickyColumn="first"
                    />
                ) : null}
            </section>

            <style>{`
                .playground {
                    max-width: 960px;
                    margin: 0 auto;
                    padding: 2rem 1rem 3rem;
                    font-family: system-ui, sans-serif;
                    color: #1f2937;
                }
                .playground-header h1 {
                    margin: 0 0 0.25rem;
                    font-size: 1.75rem;
                }
                .playground-header p {
                    margin: 0 0 1.5rem;
                    color: #6b7280;
                }
                .playground-controls {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }
                .playground-controls button {
                    border: 1px solid #d1d5db;
                    background: #fff;
                    border-radius: 0.375rem;
                    padding: 0.5rem 0.75rem;
                    cursor: pointer;
                }
                .playground-controls button.active {
                    background: #2563eb;
                    border-color: #2563eb;
                    color: #fff;
                }
                .playground-panel {
                    border: 1px solid #e5e7eb;
                    border-radius: 0.75rem;
                    padding: 1rem;
                    background: #fff;
                }
                .playground-panel-dark {
                    padding: 0;
                    background: transparent;
                    border: none;
                }
                .custom-empty,
                .custom-loading {
                    padding: 1rem;
                    text-align: center;
                    border-radius: 0.5rem;
                    background: #f3f4f6;
                }
                .playground-custom-table {
                    padding: 0.25rem;
                }
            `}</style>
        </div>
    );
}
