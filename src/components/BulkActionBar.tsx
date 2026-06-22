import type { ReactNode } from "react";

interface BulkActionBarProps {
    selectedCount: number;
    children: ReactNode;
    className?: string;
}

const BulkActionBar = ({ selectedCount, children, className }: BulkActionBarProps) => {
    if (!selectedCount) return null;

    return (
        <div className={`bulk-action-bar${className ? ` ${className}` : ""}`} role="status">
            <span className="bulk-action-count">{selectedCount} selected</span>
            <div className="bulk-action-content">{children}</div>
        </div>
    );
};

export default BulkActionBar;
