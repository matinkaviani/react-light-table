import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ReactLightTable } from "./ReactLightTable";

const columns = [
    { key: "name", title: "Name", sortable: true },
    { key: "age", title: "Age", sortable: true },
] as const;

const data = [
    { name: "Charlie", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 },
];

describe("ReactLightTable", () => {
    it("renders rows and columns", () => {
        render(<ReactLightTable columns={[...columns]} data={data} />);

        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.getByText("Bob")).toBeInTheDocument();
    });

    it("cycles sort mode when a sortable header is clicked", () => {
        render(<ReactLightTable columns={[...columns]} data={data} sortable />);

        const nameHeader = screen.getByTitle("Name");
        fireEvent.click(nameHeader);
        expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

        fireEvent.click(nameHeader);
        expect(nameHeader).toHaveAttribute("aria-sort", "descending");

        fireEvent.click(nameHeader);
        expect(nameHeader).not.toHaveAttribute("aria-sort");
    });

    it("paginates data", () => {
        const paginatedData = Array.from({ length: 12 }, (_, index) => ({
            name: `User ${index + 1}`,
            age: index,
        }));

        render(
            <ReactLightTable
                columns={[...columns]}
                data={paginatedData}
                hasPagination
                rowsPerPage={5}
            />
        );

        expect(screen.getByText("User 1")).toBeInTheDocument();
        expect(screen.queryByText("User 6")).not.toBeInTheDocument();

        fireEvent.click(screen.getByLabelText("Page 2"));
        expect(screen.getByText("User 6")).toBeInTheDocument();
    });

    it("supports controlled sort state", () => {
        const onSortChange = vi.fn();
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                sortable
                sort={{ key: "name", mode: "asc" }}
                onSortChange={onSortChange}
            />
        );

        fireEvent.click(screen.getByTitle("Age"));
        expect(onSortChange).toHaveBeenCalledWith({ key: "age", mode: "asc", isAbsoluteValue: false });
    });

    it("supports controlled page state", () => {
        const onPageChange = vi.fn();
        const paginatedData = Array.from({ length: 12 }, (_, index) => ({
            name: `User ${index + 1}`,
            age: index,
        }));

        render(
            <ReactLightTable
                columns={[...columns]}
                data={paginatedData}
                hasPagination
                rowsPerPage={5}
                page={1}
                onPageChange={onPageChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Page 2"));
        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("calls onCurrentDataChange when visible data changes", async () => {
        const onCurrentDataChange = vi.fn();
        const { rerender } = render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                sortable
                onCurrentDataChange={onCurrentDataChange}
            />
        );

        await waitFor(() => expect(onCurrentDataChange).toHaveBeenCalled());
        onCurrentDataChange.mockClear();

        rerender(
            <ReactLightTable
                columns={[...columns]}
                data={[...data, { name: "Dana", age: 40 }]}
                sortable
                onCurrentDataChange={onCurrentDataChange}
            />
        );

        await waitFor(() =>
            expect(onCurrentDataChange).toHaveBeenCalledWith(
                expect.arrayContaining([expect.objectContaining({ name: "Dana" })])
            )
        );
    });

    it("renders custom empty content", () => {
        render(
            <ReactLightTable
                columns={[...columns]}
                data={[]}
                emptyContent={<div>No records found</div>}
            />
        );

        expect(screen.getByText("No records found")).toBeInTheDocument();
    });

    it("renders custom loading content", () => {
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                loading
                loadingContent={<div>Loading table...</div>}
            />
        );

        expect(screen.getByText("Loading table...")).toBeInTheDocument();
    });

    it("handles row clicks", () => {
        const handleRowClick = vi.fn();
        render(
            <ReactLightTable columns={[...columns]} data={data} handleRowClick={handleRowClick} />
        );

        fireEvent.click(screen.getByText("Alice"));
        expect(handleRowClick).toHaveBeenCalledWith(
            expect.objectContaining({ name: "Alice" }),
            expect.any(Object)
        );
    });

    it("filters rows with the built-in search input", () => {
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                showFilter
                filterPlaceholder="Search people"
            />
        );

        fireEvent.change(screen.getByLabelText("Filter table rows"), {
            target: { value: "alice" },
        });

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    it("supports row selection", () => {
        const onSelectionChange = vi.fn();
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                selectable="multiple"
                rowKey={(row) => row.name}
                onSelectionChange={onSelectionChange}
            />
        );

        fireEvent.click(screen.getByLabelText("Select row Alice"));
        expect(onSelectionChange).toHaveBeenCalledWith(
            ["Alice"],
            [expect.objectContaining({ name: "Alice" })]
        );
    });

    it("uses totalRows for manual pagination", () => {
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data.slice(0, 2)}
                hasPagination
                rowsPerPage={2}
                manualPagination
                totalRows={10}
            />
        );

        expect(screen.getByLabelText("Page 5")).toBeInTheDocument();
    });

    it("renders expandable row content", () => {
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                expandable
                rowKey={(row) => row.name}
                expandedRowKeys={["Alice"]}
                renderExpandedRow={(row) => <div>Details for {row.name}</div>}
            />
        );

        expect(screen.getByText("Details for Alice")).toBeInTheDocument();
    });

    it("hides columns based on columnVisibility", () => {
        render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                columnVisibility={{ age: false }}
            />
        );

        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.queryByText("Age")).not.toBeInTheDocument();
    });

    it("renders export button and toolbar classes", () => {
        const { container } = render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                showExport
                theme="dark"
                size="compact"
            />
        );

        expect(screen.getByRole("button", { name: "Export CSV" })).toBeInTheDocument();
        expect(container.querySelector(".react-light-table-dark")).toBeInTheDocument();
        expect(container.querySelector(".react-light-table-compact")).toBeInTheDocument();
        expect(container.querySelector(".react-light-table-animated")).toBeInTheDocument();
    });

    it("applies appearance tokens and class name slots", () => {
        const { container } = render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                appearance={{ accent: "#9333ea", radius: "1rem" }}
                classNames={{ root: "custom-root", row: "custom-row", table: "custom-table" }}
            />
        );

        const root = container.querySelector("#react-light-table");
        expect(root).toHaveClass("custom-root");
        expect(root).toHaveStyle({ "--rlt-accent": "#9333ea", "--rlt-radius": "1rem" });
        expect(container.querySelector(".custom-table")).toBeInTheDocument();
        expect(container.querySelector(".custom-row")).toBeInTheDocument();
    });

    it("disables animations when requested", () => {
        const { container } = render(
            <ReactLightTable columns={[...columns]} data={data} disableAnimations />
        );

        expect(container.querySelector(".react-light-table-animated")).not.toBeInTheDocument();
    });

    it("filters with per-column filters", () => {
        const filterColumns = [
            { key: "name", title: "Name", filter: "text" as const },
            { key: "age", title: "Age" },
        ] as const;

        render(
            <ReactLightTable
                columns={[...filterColumns]}
                data={data}
                showColumnFilters
                columnFilters={{ name: "ali" }}
            />
        );

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("Bob")).not.toBeInTheDocument();
    });

    it("supports striped variant class", () => {
        const { container } = render(
            <ReactLightTable columns={[...columns]} data={data} variant="striped" />
        );

        expect(container.querySelector(".react-light-table-striped")).toBeInTheDocument();
    });

    it("virtualizes large datasets to a visible window", () => {
        const virtualData = Array.from({ length: 500 }, (_, index) => ({
            name: `User ${index + 1}`,
            age: index,
        }));

        const { container } = render(
            <ReactLightTable
                columns={[...columns]}
                data={virtualData}
                virtualized
                scroll={{ y: 360 }}
                virtualRowHeight={44}
            />
        );

        expect(container.querySelectorAll(".table-row").length).toBeLessThan(500);
        expect(screen.getByText("User 1")).toBeInTheDocument();
        expect(container.querySelector(".react-light-table-animated")).not.toBeInTheDocument();
        expect(container.querySelector(".react-light-table-virtual")).toBeInTheDocument();
    });

    it("applies sticky classes to the first column when configured", () => {
        const { container } = render(
            <ReactLightTable
                columns={[...columns]}
                data={data}
                scroll={{ x: 720 }}
                stickyColumn="first"
            />
        );

        const firstHeader = container.querySelector("thead th.sticky-col-first");
        const firstCell = container.querySelector("tbody td.sticky-col-first");

        expect(firstHeader).toBeInTheDocument();
        expect(firstCell).toBeInTheDocument();
        expect(container.querySelector(".react-light-table-sticky-first")).toBeInTheDocument();
    });
});
