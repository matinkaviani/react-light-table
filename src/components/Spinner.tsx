import type { ReactNode } from "react";

interface LoadingSpinnerProps {
    loading: boolean;
    loadingContent?: ReactNode;
    className?: string;
}

const Spinner = ({ loading, loadingContent, className }: LoadingSpinnerProps) => {
    if (loadingContent) {
        return loading ? (
            <div className={`table-loading-overlay visible ${className ?? ""}`}>{loadingContent}</div>
        ) : null;
    }

    return (
        <div
            className={`table-loading-overlay ${loading ? "visible" : ""} ${className ?? ""}`}
            aria-hidden={!loading}
            aria-live="polite"
        >
            <div className="loading-spinner" />
        </div>
    );
};

export default Spinner;
