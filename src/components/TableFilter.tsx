import { ChangeEvent } from "react";

interface TableFilterProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const TableFilter = ({ value, onChange, placeholder = "Search...", className }: TableFilterProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <input
            type="search"
            className={`table-filter-input${className ? ` ${className}` : ""}`}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            aria-label="Filter table rows"
        />
    );
};

export default TableFilter;
