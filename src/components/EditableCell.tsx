import { useEffect, useState } from "react";
import type { ColumnFilterOption, EditType } from "./Models/Props";

interface EditableCellProps<T extends Record<string, unknown>> {
    row: T;
    columnKey: string;
    value: unknown;
    editType?: EditType;
    editOptions?: readonly ColumnFilterOption[];
    onSave: (value: unknown) => void;
}

const EditableCell = <T extends Record<string, unknown>>({
    value,
    editType = "text",
    editOptions,
    onSave,
}: EditableCellProps<T>) => {
    const [draft, setDraft] = useState(String(value ?? ""));

    useEffect(() => {
        setDraft(String(value ?? ""));
    }, [value]);

    const commit = () => {
        const nextValue = editType === "number" ? Number(draft) : draft;
        onSave(nextValue);
    };

    if (editType === "select") {
        return (
            <select
                className="editable-cell-input"
                value={draft}
                onChange={(event) => {
                    setDraft(event.target.value);
                    onSave(event.target.value);
                }}
                onClick={(event) => event.stopPropagation()}
            >
                {editOptions?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            className="editable-cell-input"
            type={editType === "number" ? "number" : "text"}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onBlur={commit}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    commit();
                }
            }}
            onClick={(event) => event.stopPropagation()}
        />
    );
};

export default EditableCell;
