import { ReactNode } from "react";

export interface Props {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
    arrowRight?: ReactNode;
    arrowLeft?: ReactNode;
}

const Pagination = ({
    page,
    totalPages,
    handlePagination,
    arrowRight,
    arrowLeft
}: Props) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (page <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, "separator", totalPages);
            } else if (page > 4 && page < totalPages - 3) {
                pageNumbers.push(1, "separator", page - 1, page, page + 1, "separator", totalPages);
            } else {
                pageNumbers.push(1, "separator", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="pagination">
            {totalPages ? (
                <div className="paginationWrapper">
                    {page !== 1 && (
                        <span
                            onClick={() => handlePagination(page - 1)}
                            className="pageItem sides"
                        >
                            {arrowLeft ?? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
                            </svg>}
                        </span>
                    )}
                    {pageNumbers.map((pageNumber, index) => {
                        if (pageNumber === "separator") {
                            return (
                                <div key={index} className="separator">
                                    ...
                                </div>
                            );
                        }
                        return (
                            <span
                                key={index}
                                onClick={() => handlePagination(parseFloat(pageNumber.toString()))}
                                className={`pageItem ${page === pageNumber && "active"}`}
                            >
                                {pageNumber}
                            </span>
                        );
                    })}
                    {page !== totalPages && (
                        <span
                            onClick={() => handlePagination(page + 1)}
                            className="pageItem sides"
                        >
                            {arrowRight ?? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                            </svg>}
                        </span>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Pagination;
