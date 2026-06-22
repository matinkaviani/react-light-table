import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: ["src/index.ts"],
        format: ["esm"],
        outDir: "dist/esm",
        outExtension: () => ({ js: ".js" }),
        dts: true,
        splitting: false,
        sourcemap: true,
        clean: true,
    },
    {
        entry: ["src/index.ts"],
        format: ["cjs"],
        outDir: "dist/cjs",
        splitting: false,
        sourcemap: true,
        clean: false,
    },
]);
