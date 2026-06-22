import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
    it("renders all pages when total pages is small", () => {
        render(<Pagination page={1} totalPages={3} handlePagination={vi.fn()} />);

        expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Page 2")).toBeInTheDocument();
        expect(screen.getByLabelText("Page 3")).toBeInTheDocument();
    });

    it("disables previous button on first page", () => {
        render(<Pagination page={1} totalPages={5} handlePagination={vi.fn()} />);

        expect(screen.getByLabelText("Previous page")).toBeDisabled();
        expect(screen.getByLabelText("Next page")).not.toBeDisabled();
    });

    it("disables next button on last page", () => {
        render(<Pagination page={5} totalPages={5} handlePagination={vi.fn()} />);

        expect(screen.getByLabelText("Previous page")).not.toBeDisabled();
        expect(screen.getByLabelText("Next page")).toBeDisabled();
    });

    it("calls handlePagination when a page is clicked", () => {
        const handlePagination = vi.fn();
        render(<Pagination page={2} totalPages={5} handlePagination={handlePagination} />);

        fireEvent.click(screen.getByLabelText("Page 3"));
        expect(handlePagination).toHaveBeenCalledWith(3);
    });

    it("marks the active page with aria-current", () => {
        render(<Pagination page={2} totalPages={5} handlePagination={vi.fn()} />);

        expect(screen.getByLabelText("Page 2")).toHaveAttribute("aria-current", "page");
        expect(screen.getByLabelText("Page 2")).toHaveClass("active");
    });

    it("renders ellipsis for large page counts", () => {
        const { container } = render(
            <Pagination page={10} totalPages={20} handlePagination={vi.fn()} />
        );

        expect(screen.getByLabelText("Page 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Page 9")).toBeInTheDocument();
        expect(screen.getByLabelText("Page 10")).toHaveAttribute("aria-current", "page");
        expect(screen.getByLabelText("Page 11")).toBeInTheDocument();
        expect(screen.getByLabelText("Page 20")).toBeInTheDocument();
        expect(container.querySelectorAll(".pageItem-ellipsis").length).toBeGreaterThan(0);
    });
});
