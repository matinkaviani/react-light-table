import { describe, expect, it } from "vitest";
import { filterRows } from "./filterRows";

const data = [
    { name: "Alice Johnson", age: 28, department: "Engineering" },
    { name: "Bob Smith", age: 34, department: "Design" },
    { name: "Charlie Brown", age: 22, department: "Marketing" },
];

describe("filterRows", () => {
    it("returns all rows for an empty query", () => {
        expect(filterRows(data, "", ["name"])).toEqual(data);
        expect(filterRows(data, "   ", ["name"])).toEqual(data);
    });

    it("filters by case-insensitive substring", () => {
        expect(filterRows(data, "alice", ["name"]).map((row) => row.name)).toEqual(["Alice Johnson"]);
    });

    it("searches across multiple keys", () => {
        expect(filterRows(data, "design", ["name", "department"]).map((row) => row.name)).toEqual([
            "Bob Smith",
        ]);
    });

    it("supports a custom filter function", () => {
        const result = filterRows(data, "30", ["age"], (row, query) => row.age > Number(query));
        expect(result.map((row) => row.name)).toEqual(["Bob Smith"]);
    });
});
