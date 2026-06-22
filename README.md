# React Light Table

A lightweight, customizable React table component with sorting, pagination, filtering, selection, and accessible defaults.

## Features

- Column sorting (asc → desc → neutral)
- Pagination with smart page controls
- Global search / filtering (client or manual/server mode)
- Row selection (single or multiple)
- Expandable rows, column visibility, CSV export
- Clickable rows
- Loading and empty states (customizable)
- Controlled or uncontrolled sort, page, filter, and selection state
- Light/dark theme and compact density
- RTL/LTR header support
- Custom column rendering and sort functions
- React 18 and 19 support

## Installation

```bash
npm install react-light-table
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

## Filtering

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  showFilter
  filterPlaceholder="Search..."
/>
```

For server-driven filtering, use controlled `filterValue` / `onFilterChange` with `manualFiltering`.

## Row selection

```tsx
<ReactLightTable
  columns={columns}
  data={data}
  selectable="multiple"
  rowKey={(row) => row.id}
  selectedRowKeys={selected}
  onSelectionChange={setSelected}
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

## CSV export

```tsx
import { exportToCsv } from "react-light-table";

exportToCsv({ data, columns, filename: "export.csv" });
```

Or enable the built-in toolbar button with `showExport`.

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
    row: "my-table-row",
    cell: "my-table-cell",
    pagination: "my-table-pagination",
  }}
/>
```

Set `disableAnimations` to opt out of motion. You can also override CSS variables directly on the root element — see `defaultTableAppearance` for the full token list.

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev:playground
```

See [Props.md](./Props.md) and [CHANGELOG.md](./CHANGELOG.md) for the full API and release notes.

## License

MIT
