import { afterEach, describe, expect, it, vi } from "vitest";
import { exportToCsv } from "./exportToCsv";

const columns = [
    { key: "name", title: "Name" },
    { key: "note", title: "Note" },
] as const;

const data = [
    { name: "Alice", note: 'Says "hello"' },
    { name: "Bob", note: "Plain" },
];

describe("exportToCsv", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("creates a downloadable csv blob", () => {
        const click = vi.fn();
        const link = { click, download: "", href: "" } as unknown as HTMLAnchorElement;

        vi.stubGlobal(
            "URL",
            {
                createObjectURL: vi.fn(() => "blob:csv"),
                revokeObjectURL: vi.fn(),
            }
        );

        vi.spyOn(document, "createElement").mockReturnValue(link);

        exportToCsv({
            data,
            columns: [...columns],
            filename: "people.csv",
        });

        expect(document.createElement).toHaveBeenCalledWith("a");
        expect(URL.createObjectURL).toHaveBeenCalled();
        expect(link.download).toBe("people.csv");
        expect(click).toHaveBeenCalled();
        expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:csv");
    });
});
