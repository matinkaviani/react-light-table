# Changelog

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
