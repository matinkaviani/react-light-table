import type { ColumnFilterOption, ColumnFilterType } from "./Models/Props";

interface ColumnFilterProps {
    type: ColumnFilterType;
    value: string;
    placeholder?: string;
    options?: readonly ColumnFilterOption[];
    onChange: (value: string) => void;
}

const ColumnFilter = ({ type, value, placeholder, options, onChange }: ColumnFilterProps) => {
    if (type === "select") {
        return (
            <select
                className="column-filter-input"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                aria-label="Filter column"
            >
                <option value="">All</option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <input
            type="search"
            className="column-filter-input"
            value={value}
            placeholder={placeholder ?? "Filter..."}
            onChange={(event) => onChange(event.target.value)}
            aria-label="Filter column"
        />
    );
};

export default ColumnFilter;
