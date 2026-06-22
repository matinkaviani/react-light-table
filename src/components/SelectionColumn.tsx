import { ChangeEvent, MouseEvent } from "react";

interface SelectionColumnProps<T> {
    mode: "single" | "multiple";
    selectedRowKeys: string[];
    rowKey: (item: T) => string;
    pageRows: T[];
    onSelectionChange: (keys: string[], rows: T[]) => void;
    disableRowSelection?: (row: T) => boolean;
    headerTextAlign?: string;
    contentTextAlign?: string;
}

function stopPropagation(event: MouseEvent) {
    event.stopPropagation();
}

export function SelectionHeader<T>({
    mode,
    selectedRowKeys,
    rowKey,
    pageRows,
    onSelectionChange,
    disableRowSelection,
    headerTextAlign,
}: SelectionColumnProps<T>) {
    if (mode === "single") {
        return (
            <th className={`selection-header-col${headerTextAlign ? ` ${headerTextAlign}` : ""}`} scope="col">
                Select
            </th>
        );
    }

    const selectableRows = pageRows.filter((row) => !disableRowSelection?.(row));
    const selectableKeys = selectableRows.map((row) => rowKey(row));
    const selectedOnPage = selectableKeys.filter((key) => selectedRowKeys.includes(key));
    const allSelected = selectableKeys.length > 0 && selectedOnPage.length === selectableKeys.length;
    const indeterminate = selectedOnPage.length > 0 && !allSelected;

    const handleToggleAll = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const merged = Array.from(new Set([...selectedRowKeys, ...selectableKeys]));
            const rows = pageRows.filter((row) => merged.includes(rowKey(row)));
            onSelectionChange(merged, rows);
            return;
        }

        const remaining = selectedRowKeys.filter((key) => !selectableKeys.includes(key));
        onSelectionChange(remaining, []);
    };

    return (
        <th className={`selection-header-col${headerTextAlign ? ` ${headerTextAlign}` : ""}`} scope="col">
            <input
                type="checkbox"
                aria-label="Select all rows on this page"
                checked={allSelected}
                ref={(input) => {
                    if (input) input.indeterminate = indeterminate;
                }}
                onChange={handleToggleAll}
                onClick={stopPropagation}
            />
        </th>
    );
}

export function SelectionCell<T>({
    mode,
    selectedRowKeys,
    rowKey,
    row,
    pageRows,
    onSelectionChange,
    disableRowSelection,
    contentTextAlign,
}: SelectionColumnProps<T> & { row: T }) {
    const key = rowKey(row);
    const disabled = disableRowSelection?.(row) ?? false;
    const checked = selectedRowKeys.includes(key);

    const handleChange = () => {
        if (disabled) return;

        if (mode === "single") {
            onSelectionChange([key], [row]);
            return;
        }

        const nextKeys = checked
            ? selectedRowKeys.filter((selectedKey) => selectedKey !== key)
            : [...selectedRowKeys, key];
        const nextRows = pageRows.filter((item) => nextKeys.includes(rowKey(item)));
        onSelectionChange(nextKeys, nextRows);
    };

    return (
        <td
            className={`selection-cell${contentTextAlign ? ` ${contentTextAlign}` : ""}`}
            onClick={stopPropagation}
        >
            <input
                type={mode === "single" ? "radio" : "checkbox"}
                name={mode === "single" ? "react-light-table-selection" : undefined}
                aria-label={`Select row ${key}`}
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
            />
        </td>
    );
}
