# Changelog

## 3.1.0

### Fixed

- Virtual scroll: disabled row entrance animations in virtual mode (absolute row index caused multi-second render delays when scrolling deep into large lists).
- Virtual scroll: batched scroll updates via `requestAnimationFrame` and only re-render when the visible window changes.
- Sticky columns: first-column header now pins correctly during horizontal scroll (per-cell sticky instead of whole `thead`).
- TypeScript: `filterOptions` and `editOptions` accept `readonly` arrays (fixes `as const` column definitions).

## 3.0.0

### Added

- **Multi-sort** — `multiSort` prop; Shift+click headers for secondary sorts. `SortState` = `SortProps | SortProps[] | null`.
- **Per-column filters** — `showColumnFilters`, `columnFilters`, `onColumnFiltersChange`, `manualColumnFiltering`. Column-level `filter`, `filterOptions`, `filterPlaceholder`.
- **Table variants** — `variant="striped" | "bordered"`.
- **Virtual scrolling** — `virtualized`, `virtualRowHeight`, `scroll.y` for large datasets.
- **Tree data** — `treeData`, `childrenColumn` with expand/collapse and depth indentation.
- **Inline editing** — column `editable`, `editType`, `editOptions`, and `onCellChange`.
- **Bulk actions** — `bulkActionsContent` bar when rows are selected; `exportSelected` for CSV export of selection only.
- **Column resize** — `resizable`, `columnWidths`, `onColumnWidthsChange`.
- **Column reorder** — `reorderable`, `columnOrder`, `onColumnOrderChange` (drag headers).
- **Sticky columns** — `stickyColumn="first" | "last"` with horizontal scroll.
- **Headless hook** — `useReactLightTable(props)` exports state and handlers for custom UIs.
- **Utilities** — `sortUtils` (`toggleSort`, `getPrimarySort`, `normalizeSortState`, `isColumnSorted`), `filterColumnRows`, `flattenTreeRows`, `getOrderedColumns`, `useVirtualWindow`.
- Expanded playground with 20+ demo scenarios.
- 57 unit tests (up from 41).

### Changed

- `onSortChange` now receives `SortState` (single sort or array) instead of only `SortProps | null`.
- Pagination redesigned with accessible button controls inside the table surface.
- Dark mode CSS scoped correctly on the table root element.

## 2.3.0

### Added

- `appearance` prop for CSS design-token overrides (accent, colors, radius, shadow, etc.).
- `classNames` slot API for root, table, row, cell, toolbar, pagination, and more.
- `disableAnimations` prop to turn off motion.
- `defaultTableAppearance` and `applyAppearance` exports.
- Lightweight animations: row entrance, expand/fade, loading overlay, pagination/button transitions.
- `prefers-reduced-motion` support.

### Changed

- Default UI refresh: card surface, refined typography, accent-colored active states.
- Sort icons updated to smaller, theme-aware SVGs.
- Loading state now uses a blurred overlay instead of a standalone spinner block.

## 2.2.0

### Added

- Expandable rows via `expandable`, `expandedRowKeys`, `onExpandedChange`, and `renderExpandedRow`.
- Column visibility controls via `columnVisibility`, `onColumnVisibilityChange`, and `showColumnToggle`.
- CSV export via `exportToCsv` utility and `showExport` toolbar button.
- Table toolbar with filter, column toggle, export, and `toolbarContent` slot.
- `theme` (`light` | `dark`) and `size` (`default` | `compact`) props.

## 2.1.0

### Added

- Client-side filtering with `filterValue`, `onFilterChange`, `showFilter`, and related props.
- Row selection via `selectable`, `selectedRowKeys`, and `onSelectionChange`.
- Server/manual mode via `manualSorting`, `manualPagination`, `manualFiltering`, and `totalRows`.
- `useTableData` / `processTableData` pipeline for filter → sort → paginate.
- Playground scenarios for filter, selection, and server-driven data.

## 2.0.0

### Breaking changes

- `data` is now typed as `T[]` instead of `Record<string, any>[]`.
- Column `sortFunction` now receives and returns `T[]`.

### Added

- Controlled sort state via `sort` and `onSortChange`.
- Controlled pagination via `page` and `onPageChange`.
- Custom UI slots via `emptyContent` and `loadingContent`.
- Accessibility improvements: `aria-sort`, pagination labels, keyboard support.
- Vitest test suite and GitHub Actions CI.
- In-repo Vite playground (`npm run dev:playground`).

### Changed

- Replaced dual `tsc` build with `tsup`.
- Removed accidental `yarn` runtime dependency.
- Upgraded tooling: TypeScript 5, React 19 support in peer dependencies.
- `onCurrentDataChange` now fires when sort, page, or data changes.
- `sortDesc` null handling aligned with `sortAsc`.

### Deprecated

- `initSort` — use `sort` and `onSortChange` instead.

## 1.1.1

- Last v1 release with sorting, pagination, loading, and row click support.
