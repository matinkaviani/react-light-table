import { ReactNode } from "react";
export interface Props {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
    arrowRight?: ReactNode;
    arrowLeft?: ReactNode;
}
declare const Pagination: ({ page, totalPages, handlePagination, arrowRight, arrowLeft }: Props) => import("react/jsx-runtime").JSX.Element;
export default Pagination;
