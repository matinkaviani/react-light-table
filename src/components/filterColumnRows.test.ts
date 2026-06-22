import { describe, expect, it } from "vitest";
import { filterColumnRows } from "./filterColumnRows";

const columns = [
    { key: "name", title: "Name", filter: "text" as const },
    { key: "department", title: "Department", filter: "select" as const },
] as const;

const data = [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Design" },
    { name: "Charlie", department: "Engineering" },
];

describe("filterColumnRows", () => {
    it("filters by text column", () => {
        const result = filterColumnRows(data, [...columns], { name: "ali" });
        expect(result.map((row) => row.name)).toEqual(["Alice"]);
    });

    it("filters by select column", () => {
        const result = filterColumnRows(data, [...columns], { department: "Engineering" });
        expect(result.map((row) => row.name)).toEqual(["Alice", "Charlie"]);
    });
});
