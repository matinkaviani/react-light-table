import { describe, expect, it } from "vitest";
import helpers from "./helpers";

const data = [
    { name: "Charlie", age: 30, score: null },
    { name: "Alice", age: 25, score: 10 },
    { name: "Bob", age: 35, score: -5 },
    { name: "Dana", age: 20, score: 5 },
];

describe("helpers.sortAsc", () => {
    it("sorts strings ascending", () => {
        const sorted = [...data].sort(helpers.sortAsc("name"));
        expect(sorted.map((row) => row.name)).toEqual(["Alice", "Bob", "Charlie", "Dana"]);
    });

    it("sorts numbers ascending", () => {
        const sorted = [...data].sort(helpers.sortAsc("age"));
        expect(sorted.map((row) => row.age)).toEqual([20, 25, 30, 35]);
    });

    it("puts null values at the bottom when enabled", () => {
        const sorted = [...data].sort(helpers.sortAsc("score", { putNullAtBottom: true }));
        expect(sorted.map((row) => row.score)).toEqual([-5, 5, 10, null]);
    });

    it("sorts by absolute value when enabled", () => {
        const values = [{ value: -10 }, { value: 2 }, { value: -3 }];
        const sorted = [...values].sort(helpers.sortAsc("value", { sortByAbsValue: true }));
        expect(sorted.map((row) => row.value)).toEqual([2, -3, -10]);
    });
});

describe("helpers.sortDesc", () => {
    it("sorts strings descending", () => {
        const sorted = [...data].sort(helpers.sortDesc("name"));
        expect(sorted.map((row) => row.name)).toEqual(["Dana", "Charlie", "Bob", "Alice"]);
    });

    it("puts null values at the bottom when enabled", () => {
        const sorted = [...data].sort(helpers.sortDesc("score", { putNullAtBottom: true }));
        expect(sorted.map((row) => row.score)).toEqual([10, 5, -5, null]);
    });
});
