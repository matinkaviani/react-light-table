# React Light Table

A lightweight, customizable React data table with sorting, pagination, filtering, selection, virtualization, and accessible defaults. No heavy dependencies — just React.

## Features

- **Sorting** — single or multi-column (Shift+click)
- **Pagination** — client-side or manual/server mode
- **Filtering** — global search and per-column filters
- **Selection** — single/multiple rows with bulk action bar
- **Expandable rows** and **tree/hierarchical data**
- **Column controls** — visibility toggle, resize, drag reorder
- **Virtual scrolling** for large datasets
- **Inline cell editing**
- **CSV export** (all rows or selected only)
- **Theming** — light/dark, compact density, striped/bordered variants
- **Customization** — design tokens, class name slots, custom renderers
- **Headless hook** — `useReactLightTable` for custom UIs
- **Accessibility** — `aria-sort`, keyboard sort, pagination labels
- **React 18 and 19** support

## Installation

```bash
npm install react-light-table
```

Import the stylesheet once in your app:

```tsx
import "react-light-table/style.css";
```

## Quick start

```tsx
import { ReactLightTable } from "react-light-table";
import "react-light-table/style.css";

const columns = [
  { key: "name", title: "Name", sortable: true },
  { key: "age", title: "Age", sortable: true },
];

const data = [
  { name: "John Doe", age: 30 },
  { name: "Jane Doe", age: 25 },
];

export function MyTable() {
  return (
    <ReactLightTable
      columns={columns}
      data={data}
      sortable
      showFilter
      hasPagination
      rowsPerPage={10}
    />
  );
}
```

## Sorting

Single-column sort cycles **asc → desc → none** on header click.

```tsx
<ReactLightTable columns={columns} data={data} sortable />
```

Multi-column sort — hold **Shift** while clicking headers:

```tsx
<ReactLightTable columns={columns} data={data} sortable multiSort />
```

Controlled sort state accepts a single sort or an array:

```tsx
import { ReactLightTable, type SortState } from "react-light-table";

const [sort, setSort] = useState<SortState>({ key: "name", mode: "asc" });

<ReactLightTable
  columns={columns}
  data={data}
  sortable
  multiSort
  sort={sort}
  onSortChange={setSort}
/>
```

## Filtering

### Global search

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  showFilter
  filterPlaceholder="Search..."
/>
```

### Per-column filters

Define `filter` on columns (`"text"` or `"select"`) and enable the filter row:

```tsx
const columns = [
  { key: "name", title: "Name", filter: "text" },
  {
    key: "department",
    title: "Department",
    filter: "select",
    filterOptions: [
      { label: "Engineering", value: "Engineering" },
      { label: "Design", value: "Design" },
    ],
  },
];

<ReactLightTable
  columns={columns}
  data={data}
  showColumnFilters
  columnFilters={columnFilters}
  onColumnFiltersChange={setColumnFilters}
/>
```

For server-driven filtering, use controlled `filterValue` / `onFilterChange` with `manualFiltering`, or `manualColumnFiltering` for column filters.

## Row selection & bulk actions

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  selectable="multiple"
  rowKey={(row) => row.id}
  selectedRowKeys={selected}
  onSelectionChange={(keys, rows) => setSelected(keys)}
  bulkActionsContent={
    <button type="button" onClick={handleDelete}>Delete selected</button>
  }
  showExport
  exportSelected
/>
```

## Server-side / manual mode

```tsx
<ReactLightTable
  columns={columns}
  data={currentPageRows}
  sortable
  hasPagination
  rowsPerPage={20}
  sort={sort}
  onSortChange={setSort}
  page={page}
  onPageChange={setPage}
  filterValue={query}
  onFilterChange={setQuery}
  showFilter
  manualSorting
  manualPagination
  manualFiltering
  totalRows={totalCount}
  loading={isLoading}
/>
```

## Virtual scrolling

For large lists, enable virtualization. Row entrance animations are automatically disabled in virtual mode.

```tsx
<ReactLightTable
  columns={columns}
  data={largeDataset}
  virtualized
  scroll={{ y: 400 }}
  virtualRowHeight={44}
/>
```

## Tree data

```tsx
<ReactLightTable
  columns={columns}
  data={treeData}
  treeData
  childrenColumn="children"
  rowKey={(row) => row.id}
  expandedRowKeys={expanded}
  onExpandedChange={setExpanded}
/>
```

## Expandable rows

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  expandable
  rowKey={(row) => row.id}
  expandedRowKeys={expanded}
  onExpandedChange={setExpanded}
  renderExpandedRow={(row) => <div>{row.details}</div>}
/>
```

## Inline editing

Enable editing per column and handle changes:

```tsx
const columns = [
  { key: "name", title: "Name", editable: true },
  { key: "age", title: "Age", editable: true, editType: "number" },
  {
    key: "status",
    title: "Status",
    editable: true,
    editType: "select",
    editOptions: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];

<ReactLightTable
  columns={columns}
  data={data}
  rowKey={(row) => row.id}
  onCellChange={(row, key, value) => updateRow(row, key, value)}
/>
```

## Column resize, reorder & sticky columns

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  resizable
  reorderable
  columnWidths={widths}
  onColumnWidthsChange={setWidths}
  columnOrder={order}
  onColumnOrderChange={setOrder}
  scroll={{ x: 800 }}
  stickyColumn="first"
/>
```

## Table variants

```tsx
<ReactLightTable columns={columns} data={data} variant="striped" />
<ReactLightTable columns={columns} data={data} variant="bordered" />
```

## CSV export

Built-in toolbar button:

```tsx
<ReactLightTable columns={columns} data={data} showExport exportFilename="export.csv" />
```

Or use the utility directly:

```tsx
import { exportToCsv } from "react-light-table";

exportToCsv({ data, columns, filename: "export.csv", columnVisibility });
```

## Customization

### Design tokens (`appearance`)

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  appearance={{
    accent: "#8b5cf6",
    background: "#ffffff",
    foreground: "#1e293b",
    border: "#e2e8f0",
    radius: "1rem",
    shadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
  }}
/>
```

### Class name slots (`classNames`)

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  classNames={{
    root: "my-table",
    toolbar: "my-table-toolbar",
    surface: "my-table-surface",
    scrollContainer: "my-table-scroll",
    table: "my-table-el",
    row: "my-table-row",
    cell: "my-table-cell",
    pagination: "my-table-pagination",
    bulkActions: "my-table-bulk",
  }}
/>
```

Set `disableAnimations` to opt out of motion. Override CSS variables on the root — see `defaultTableAppearance` for the full token list.

### Theme & density

```tsx
<ReactLightTable columns={columns} data={data} theme="dark" size="compact" />
```

## Headless API

Use `useReactLightTable` to drive your own UI while reusing all table state logic:

```tsx
import { useReactLightTable } from "react-light-table";

function CustomTable(props) {
  const table = useReactLightTable(props);
  const { visibleRows, requestSort, setFilterValue } = table;
  // render your own markup
}
```

## Exported utilities

| Export | Description |
|--------|-------------|
| `ReactLightTable` | Main table component |
| `useReactLightTable` | Headless state/handler hook |
| `exportToCsv` | Client-side CSV download |
| `processTableData` | Filter → sort → paginate pipeline |
| `flattenTreeRows` | Flatten hierarchical data |
| `toggleSort` / `getPrimarySort` / `normalizeSortState` | Sort state helpers |
| `applyAppearance` / `defaultTableAppearance` | Theme token helpers |

## Development

```bash
npm install
npm run build
npm test
npm run typecheck
npm run lint
npm run dev:playground   # http://localhost:5173
```

The playground includes scenarios for pagination, filtering, selection, server mode, virtualization, tree data, editing, bulk actions, and more.

## Upgrading to v3

- `onSortChange` now receives `SortState` (`SortProps | SortProps[] | null`) instead of only a single `SortProps`. Use `getPrimarySort(sort)` if you only need the first active sort.
- Import the stylesheet: `import "react-light-table/style.css"`.
- Virtual mode automatically disables row entrance animations — no action needed.

See [CHANGELOG.md](./CHANGELOG.md) for the full release history.

## Documentation

- [Props.md](./Props.md) — full prop reference
- [CHANGELOG.md](./CHANGELOG.md) — release history

## License

MIT
