import { describe, expect, it } from "vitest";
import { applyAppearance, defaultTableAppearance } from "./applyAppearance";

describe("applyAppearance", () => {
    it("maps appearance tokens to css variables", () => {
        expect(
            applyAppearance({
                accent: "#ff0000",
                background: "#000000",
            })
        ).toEqual({
            "--rlt-accent": "#ff0000",
            "--rlt-bg": "#000000",
        });
    });

    it("returns an empty object when appearance is undefined", () => {
        expect(applyAppearance()).toEqual({});
    });

    it("exposes sensible defaults", () => {
        expect(defaultTableAppearance.accent).toBeTruthy();
        expect(defaultTableAppearance.radius).toBeTruthy();
    });
});
