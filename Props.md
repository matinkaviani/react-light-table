# TableProps Reference

The `TableProps` interface defines the properties passed to `ReactLightTable`.

## Core

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Table element id |
| `columns` | `TableColumns<T>[]` | Column definitions |
| `data` | `T[]` | Row data |
| `sortable` | `boolean` | Enable column sorting |
| `multiSort` | `boolean` | Multi-column sort (Shift+click) |
| `headerTextAlign` | `"right" \| "center" \| "left"` | Header alignment (default `"center"`) |
| `contentTextAlign` | `"right" \| "center" \| "left"` | Cell alignment |
| `className` | `string` | Extra root classes |
| `loading` | `boolean` | Loading state |
| `emptyContent` | `ReactNode` | Custom empty UI |
| `loadingContent` | `ReactNode` | Custom loading UI |
| `rowKey` | `(item: T) => string` | Stable row key. **Required** for `selectable`, `expandable`, `treeData` |
| `handleRowClick` | `(item, event?) => void` | Row click handler |
| `onCurrentDataChange` | `(data: T[] \| null) => void` | Called when visible rows change |

## Sorting

| Prop | Type | Description |
|------|------|-------------|
| `sort` | `SortState` | Controlled sort (`SortProps`, `SortProps[]`, or `null`) |
| `onSortChange` | `(sort: SortState) => void` | Sort change handler |
| `initSort` | `SortProps` | **Deprecated.** Initial uncontrolled sort |
| `afterSort` | `(key, mode) => void` | Callback after sort action |
| `manualSorting` | `boolean` | Skip client-side sorting |

## Pagination

| Prop | Type | Description |
|------|------|-------------|
| `hasPagination` | `boolean` | Enable pagination |
| `rowsPerPage` | `number` | Rows per page (default `50`) |
| `page` | `number` | Controlled page (1-based) |
| `onPageChange` | `(page: number) => void` | Page change handler |
| `manualPagination` | `boolean` | Skip client-side slicing |
| `totalRows` | `number` | Total count for manual pagination |

## Filtering

| Prop | Type | Description |
|------|------|-------------|
| `filterValue` | `string` | Controlled global filter |
| `onFilterChange` | `(value: string) => void` | Global filter handler |
| `filterKeys` | `(keyof T)[]` | Keys to search (defaults to column keys) |
| `filterFunction` | `(row, query) => boolean` | Custom global filter matcher |
| `manualFiltering` | `boolean` | Skip client-side global filter |
| `showFilter` | `boolean` | Show toolbar search input |
| `filterPlaceholder` | `string` | Search placeholder |
| `columnFilters` | `Record<string, string>` | Per-column filter values |
| `onColumnFiltersChange` | `(filters) => void` | Column filter handler |
| `showColumnFilters` | `boolean` | Show filter row under headers |
| `manualColumnFiltering` | `boolean` | Skip client-side column filters |

## Selection

| Prop | Type | Description |
|------|------|-------------|
| `selectable` | `boolean \| "single" \| "multiple"` | Enable row selection |
| `selectedRowKeys` | `string[]` | Controlled selection |
| `onSelectionChange` | `(keys, rows) => void` | Selection handler |
| `disableRowSelection` | `(row: T) => boolean` | Per-row disable |
| `bulkActionsContent` | `ReactNode \| (keys, rows) => ReactNode` | Bar shown when rows selected |
| `exportSelected` | `boolean` | Export only selected rows |

## Expandable rows

| Prop | Type | Description |
|------|------|-------------|
| `expandable` | `boolean` | Show expand column |
| `expandedRowKeys` | `string[]` | Controlled expanded keys |
| `onExpandedChange` | `(keys: string[]) => void` | Expand handler |
| `renderExpandedRow` | `(row: T) => ReactNode` | Detail panel renderer |

## Tree data

| Prop | Type | Description |
|------|------|-------------|
| `treeData` | `boolean` | Enable hierarchical rows |
| `childrenColumn` | `keyof T` | Key containing child array |

## Column visibility / order / sizing

| Prop | Type | Description |
|------|------|-------------|
| `columnVisibility` | `Record<string, boolean>` | Visibility map |
| `onColumnVisibilityChange` | `(visibility) => void` | Visibility handler |
| `showColumnToggle` | `boolean` | Built-in column picker |
| `columnOrder` | `string[]` | Column order by key |
| `onColumnOrderChange` | `(order: string[]) => void` | Order handler |
| `columnWidths` | `Record<string, number>` | Width map (px) |
| `onColumnWidthsChange` | `(widths) => void` | Width handler |
| `resizable` | `boolean` | Column resize handles |
| `reorderable` | `boolean` | Drag-and-drop column reorder |

## Layout / scrolling / virtualization

| Prop | Type | Description |
|------|------|-------------|
| `variant` | `"default" \| "striped" \| "bordered"` | Table style variant |
| `scroll` | `{ x?: number \| string; y?: number \| string }` | Scroll container size |
| `stickyColumn` | `"first" \| "last"` | Pin first or last column |
| `virtualized` | `boolean` | Virtual row rendering |
| `virtualRowHeight` | `number` | Row height for virtualization (default `44`) |

## Editing

| Prop | Type | Description |
|------|------|-------------|
| `onCellChange` | `(row, key, value) => void` | Called when an editable cell is saved |

## Toolbar / export / theme

| Prop | Type | Description |
|------|------|-------------|
| `showExport` | `boolean` | CSV export button |
| `exportFilename` | `string` | Download filename |
| `toolbarContent` | `ReactNode` | Custom toolbar slot |
| `theme` | `"light" \| "dark"` | Color theme |
| `size` | `"default" \| "compact"` | Row density |
| `appearance` | `TableAppearance` | Design token overrides |
| `classNames` | `TableClassNames` | Class name slots (see below) |
| `disableAnimations` | `boolean` | Disable motion |

### `TableClassNames` slots

`root`, `toolbar`, `surface`, `scrollContainer`, `table`, `headerRow`, `headerCell`, `filterRow`, `filterCell`, `body`, `row`, `cell`, `pagination`, `empty`, `loading`, `filter`, `exportButton`, `bulkActions`

### `TableAppearance` tokens

`accent`, `accentForeground`, `background`, `foreground`, `border`, `hover`, `mutedBackground`, `headerBackground`, `radius`, `shadow`, `fontFamily`, `rowHeight`, `transitionDuration`

## Other

| Prop | Type | Description |
|------|------|-------------|
| `numberRows` | `boolean` | Show row numbers |
| `direction` | `"rtl" \| "ltr"` | Text direction |
| `icons` | `{ asc, desc, neutral }` | Custom sort icons |

---

## TableColumns\<T\>

| Prop | Type | Description |
|------|------|-------------|
| `key` | `keyof T` | Data field key |
| `title` | `string \| () => string` | Header label |
| `sortable` | `boolean` | Enable sorting on this column |
| `isAbsoluteValue` | `boolean` | Sort numbers by absolute value |
| `isHeadNowrap` | `boolean` | Ellipsis on header text |
| `headClassName` | `string` | Extra header classes |
| `cellClassName` | `string` | Extra cell classes |
| `render` | `(key, record) => ReactNode` | Custom cell renderer |
| `sortFunction` | `(data, mode) => T[]` | Custom sort function |
| `filter` | `"text" \| "select" \| boolean` | Column filter type |
| `filterOptions` | `readonly ColumnFilterOption[]` | Options for select filter |
| `filterPlaceholder` | `string` | Filter input placeholder |
| `editable` | `boolean \| (record) => boolean` | Enable inline editing |
| `editType` | `"text" \| "number" \| "select"` | Editor input type |
| `editOptions` | `readonly ColumnFilterOption[]` | Options for select editor |
| `width` | `number` | Default column width (px) |
| `summary` | `(data: T[]) => ReactNode` | Footer summary cell |

---

## Types

### SortProps

```ts
{ key: string; mode: "asc" | "desc" | null; isAbsoluteValue?: boolean }
```

### SortState

```ts
SortProps | SortProps[] | null
```

---

## Headless hook

```ts
import { useReactLightTable, type UseReactLightTableReturn } from "react-light-table";

const table = useReactLightTable(props);
// table.sort, table.visibleRows, table.requestSort, table.handleExport, etc.
```

---

## Exported utilities

```ts
// CSV
exportToCsv<T>({ data, columns, filename?, columnVisibility? }): void

// Data pipeline
processTableData(options): { visibleRows, filteredCount, totalPages }

// Tree
flattenTreeRows({ data, childrenColumn, rowKey, expandedRowKeys }): FlatTreeRow[]

// Sort helpers
normalizeSortState(sort): SortProps[]
getPrimarySort(sort): SortProps | null
toggleSort(current, key, isAbsoluteValue, multiSort, shiftKey?): SortState
isColumnSorted(sort, key): SortProps | undefined

// Theming
applyAppearance(appearance?): CSSProperties
defaultTableAppearance: TableAppearance
```
