# TableProps Interface

The `TableProps` interface defines the properties that can be passed to a React table component.

## Properties

- `id` (optional): A string identifier for the table.

- `columns`: An array of `TableColumns` that describe the structure of the table.

- `data`: An array of records represented as key-value pairs.

- `sortable` (optional): A boolean indicating whether the table columns are sortable.

- `headerTextAlign` (optional): The text alignment for the table header. Possible values: "right", "center", "left".

- `contentTextAlign` (optional): The text alignment for the table content. Possible values: "right", "center", "left".

- `className` (optional): Additional CSS class names for styling the table.

- `initSort` (optional): Initial sorting configuration represented by a `SortProps` object.

- `numberRows` (optional): A boolean indicating whether to display row numbers.

- `direction` (optional): The text direction for the table. Possible values: "rtl" (right-to-left), "ltr" (left-to-right).

- `icons` (optional): An object containing React nodes for sorting icons (`asc`, `desc`, `neutral`).

- `handleRowClick` (optional): A function to handle row clicks. Receives the clicked item and the associated event.

- `loading` (optional): A boolean indicating whether the table is in a loading state.

- `rowKey` (optional): A function to generate unique keys for each row based on the item.

- `afterSort` (optional): A callback function invoked after a column is sorted. Receives the key and sort mode.

- `onCurrentDataChange` (optional): A callback function invoked when the current data in the table changes.

## Types

### SortMode

A string literal type representing sorting modes: "asc", "desc", or `null`.

### SortProps

An object representing sorting configuration with the following properties:

- `key`: The key of the column to be sorted.

- `mode`: The sorting mode ("asc", "desc", or `null`).

- `isAbsoluteValue` (optional): A boolean indicating whether to sort by absolute values.

### TableColumns<T>

An interface defining the structure of a table column with the following properties:

- `key` (optional): The key of the column corresponding to the data property.

- `title`: The title of the column, either a string or a function returning a string.

- `isHeadNowrap` (optional): A boolean indicating whether the column header should have nowrap.

- `sortable` (optional): A boolean indicating whether the column is sortable.

- `isAbsoluteValue` (optional): A boolean indicating whether to use absolute values in sorting.

- `headClassName` (optional): Additional CSS class for the column header.

- `cellClassName` (optional): Additional CSS class for the column cells.

- `render` (optional): A function to customize rendering of the column content.

- `sortFunction` (optional): A function to define custom sorting logic for the column.

### PaginatedProps

A union type representing pagination configuration with the following options:

1. `{ hasPagination: true; rowsPerPage?: number; }`
2. `{ hasPagination: false; rowsPerPage?: never; }`
3. `{ hasPagination?: never; rowsPerPage?: never; }`

The above options control whether the table has pagination and specify the number of rows per page.

---
**Note:** This documentation is a reference for developers using the `TableProps` interface in React applications.
