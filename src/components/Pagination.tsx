import { ReactNode } from "react";

export interface Props {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
    arrowRight?: ReactNode;
    arrowLeft?: ReactNode;
    className?: string;
}

const DefaultPrevIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const DefaultNextIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const Pagination = ({
    page,
    totalPages,
    handlePagination,
    arrowRight,
    arrowLeft,
    className,
}: Props) => {
    const getPageNumbers = () => {
        const pageNumbers: Array<number | "separator"> = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else if (page <= 4) {
            pageNumbers.push(1, 2, 3, 4, 5, "separator", totalPages);
        } else if (page > 4 && page < totalPages - 3) {
            pageNumbers.push(1, "separator", page - 1, page, page + 1, "separator", totalPages);
        } else {
            pageNumbers.push(
                1,
                "separator",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    if (!totalPages) return null;

    return (
        <nav className={`pagination${className ? ` ${className}` : ""}`} aria-label="Table pagination">
            <div className="paginationWrapper" role="group" aria-label="Pagination controls">
                <button
                    type="button"
                    className="pageItem pageItem-nav"
                    onClick={() => handlePagination(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                >
                    {arrowLeft ?? <DefaultPrevIcon />}
                </button>

                {pageNumbers.map((pageNumber, index) => {
                    if (pageNumber === "separator") {
                        return (
                            <span key={`sep-${index}`} className="pageItem-ellipsis" aria-hidden="true">
                                …
                            </span>
                        );
                    }

                    const isActive = page === pageNumber;

                    return (
                        <button
                            key={`page-${pageNumber}`}
                            type="button"
                            className={`pageItem pageItem-number${isActive ? " active" : ""}`}
                            onClick={() => handlePagination(pageNumber)}
                            aria-label={`Page ${pageNumber}`}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                <button
                    type="button"
                    className="pageItem pageItem-nav"
                    onClick={() => handlePagination(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Next page"
                >
                    {arrowRight ?? <DefaultNextIcon />}
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
