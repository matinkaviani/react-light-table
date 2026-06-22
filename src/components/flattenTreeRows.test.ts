import { describe, expect, it } from "vitest";
import { flattenTreeRows } from "./flattenTreeRows";

type Node = { id: string; name: string; children?: Node[] };

const data: Node[] = [
    {
        id: "1",
        name: "Root",
        children: [
            { id: "1-1", name: "Child A" },
            { id: "1-2", name: "Child B", children: [{ id: "1-2-1", name: "Grandchild" }] },
        ],
    },
    { id: "2", name: "Root 2" },
];

describe("flattenTreeRows", () => {
    it("flattens expanded tree rows with depth", () => {
        const flat = flattenTreeRows({
            data,
            childrenColumn: "children",
            rowKey: (row) => row.id,
            expandedRowKeys: ["1", "1-2"],
        });

        expect(flat.map((entry) => [entry.key, entry.depth])).toEqual([
            ["1", 0],
            ["1-1", 1],
            ["1-2", 1],
            ["1-2-1", 2],
            ["2", 0],
        ]);
    });

    it("collapses children when parent is not expanded", () => {
        const flat = flattenTreeRows({
            data,
            childrenColumn: "children",
            rowKey: (row) => row.id,
            expandedRowKeys: [],
        });

        expect(flat.map((entry) => entry.key)).toEqual(["1", "2"]);
    });
});
