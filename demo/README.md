# React Light Table

## Overview

`React Light Table` is a customizable React component designed for creating tables with sorting, pagination, and other features. It offers a clean and straightforward interface for rendering data in a tabular format, providing flexibility and ease of use.

## Features

- **Sorting:** Enable sorting on columns by clicking the column headers. The table supports ascending, descending, and neutral sort indicators.
- **Pagination:** Implement pagination to navigate through large datasets with ease. The component includes a pagination control at the bottom of the table.
- **Clickable Rows:** Customize the table to handle row clicks, providing interactive functionality.
- **Loading Spinner:** Display a loading spinner while data is being fetched or processed.
- **Customizable Styles:** Tailor the appearance of the table with customizable styles for headers, cells, and more.

## Installation

To use `React Light Table` in your React project, follow these steps:

1. Install the package using your package manager of choice:

   ```
   npm install react-light-table
   ```
   or
   ```
   yarn add react-light-table
   ```

2. Import the component in your React file:

```
import { ReactLightTable } from 'react-light-table';
```

3. Import the css file:

```
import "react-light-table/style.css";
```

## Usage

The `React Light Table` component accepts a variety of props to customize its behavior. Here's a basic example of how to use it:


```
import { ReactLightTable } from 'react-light-table';
import "react-light-table/style.css";

const MyTable = () => {
  // Define your data, columns, and other configuration
  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'age', title: 'Age', sortable: true },
    // Add more columns as needed
  ];

  const data = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 25 },
    // Add more data items as needed
  ];

  return (
    <ReactLightTable
      id="my-table"
      columns={columns}
      data={data}
      sortable={true}
      hasPagination={true}
    />
  );
};

export default MyTable;
```

## Props

- **id:**  Unique identifier for the table.
- **columns:** Array of column configurations.
- **data** Array of data items to be displayed in the table.
- **sortable**  Enable or disable column sorting.
- **hasPagination** Enable or disable pagination.
- **... (and more)**

Refer to the [Props documentation](./Props.md) for a detailed list of available props.

## License

This project is licensed under the MIT License.

## Contributing

We welcome contributions! Feel free to open issues, submit pull requests, or provide feedback