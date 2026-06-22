# TableProps Interface

The `TableProps` interface defines the properties that can be passed to `ReactLightTable`.

## Core

- `id` (optional): Table element id.
- `columns`: Array of `TableColumns`.
- `data`: Array of row records typed as `T[]`.
- `sortable` (optional): Enable column sorting.
- `multiSort` (optional): Enable multi-column sort (Shift+click headers).
- `headerTextAlign` / `contentTextAlign` (optional): `"right" | "center" | "left"`.
- `className` (optional): Extra wrapper classes.
- `loading` (optional): Loading state.
- `emptyContent` / `loadingContent` (optional): Custom empty/loading UI.
- `rowKey` (optional): Stable row key generator. Required when using `selectable`, `expandable`, or `treeData`.
- `handleRowClick` (optional): Row click handler.
- `onCurrentDataChange` (optional): Called when visible rows change.

## Sorting

- `sort` / `onSortChange`: Controlled sort state (`SortProps`, `SortProps[]`, or `null`).
- `initSort` (deprecated): Initial uncontrolled sort.
- `afterSort` (optional): Callback after sort action.
- `manualSorting` (optional): Skip client-side sorting.

## Pagination

- `hasPagination` / `rowsPerPage`: Pagination config.
- `page` / `onPageChange`: Controlled page state.
- `manualPagination` (optional): Skip client-side slicing.
- `totalRows` (optional): Total row count for manual pagination.

## Filtering

- `filterValue` / `onFilterChange`: Controlled global filter query.
- `filterKeys` (optional): Keys to search (defaults to all column keys).
- `filterFunction` (optional): Custom matcher `(row, query) => boolean`.
- `manualFiltering` (optional): Skip client-side filtering.
- `showFilter` (optional): Render built-in search input.
- `filterPlaceholder` (optional): Search placeholder.
- `columnFilters` / `onColumnFiltersChange`: Per-column filter values.
- `showColumnFilters` (optional): Render filter row under headers.
- `manualColumnFiltering` (optional): Skip client-side column filtering.

## Selection

- `selectable` (optional): `true`, `"single"`, or `"multiple"`.
- `selectedRowKeys` / `onSelectionChange`: Controlled selection.
- `disableRowSelection` (optional): Per-row disable predicate.
- `bulkActionsContent` (optional): Toolbar shown when rows are selected.
- `exportSelected` (optional): Export only selected rows when selection exists.

## Expandable rows

- `expandable` (optional): Enable expand column.
- `expandedRowKeys` / `onExpandedChange`: Controlled expanded state.
- `renderExpandedRow` (optional): Detail panel renderer.

## Tree data

- `treeData` (optional): Enable hierarchical rows.
- `childrenColumn` (optional): Key containing child rows array.

## Column visibility / order / sizing

- `columnVisibility` / `onColumnVisibilityChange`: Controlled visibility map.
- `showColumnToggle` (optional): Built-in column picker.
- `columnOrder` / `onColumnOrderChange`: Column order by key.
- `columnWidths` / `onColumnWidthsChange`: Column width map (px).
- `resizable` (optional): Enable column resize handles.
- `reorderable` (optional): Enable drag-and-drop column reordering.

## Layout / scrolling / virtualization

- `variant` (optional): `"default" | "striped" | "bordered"`.
- `scroll` (optional): `{ x?, y? }` horizontal/vertical scroll container.
- `stickyColumn` (optional): `"first" | "last"` sticky column.
- `virtualized` (optional): Virtual row rendering for large lists.
- `virtualRowHeight` (optional): Row height for virtualization (default `44`).

## Editing

- `onCellChange` (optional): `(row, key, value) => void` when inline editing is enabled on columns.

## Toolbar / export / theme

- `showExport` (optional): Built-in CSV export button.
- `exportFilename` (optional): Download filename.
- `toolbarContent` (optional): Custom toolbar slot.
- `theme` (optional): `"light" | "dark"`.
- `size` (optional): `"default" | "compact"`.
- `appearance` (optional): Design token overrides.
- `classNames` (optional): Class slots including `scrollContainer`, `filterRow`, `filterCell`, `bulkActions`.
- `disableAnimations` (optional): Disable motion/entrance animations.

## Other

- `numberRows` (optional): Show row numbers.
- `direction` (optional): `"rtl" | "ltr"`.
- `icons` (optional): Custom sort icons.

## Headless hook

Use `useReactLightTable(props)` to access table state and handlers without rendering the default UI.

## Types

### TableColumns<T>

- `key`, `title`, `sortable`, `render`, `sortFunction`, `filter`, `filterOptions`, `editable`, `editType`, `editOptions`, `width`, `summary`, etc.

### SortProps / SortState

- `key`, `mode` (`"asc" | "desc" | null`), `isAbsoluteValue`.
- `SortState` = `SortProps | SortProps[] | null`.

## Utilities

### exportToCsv

```ts
exportToCsv<T>({ data, columns, filename?, columnVisibility? }): void
```
