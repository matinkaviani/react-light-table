import type { CSSProperties } from "react";

export interface TableAppearance {
    accent?: string;
    accentForeground?: string;
    background?: string;
    foreground?: string;
    border?: string;
    hover?: string;
    mutedBackground?: string;
    headerBackground?: string;
    radius?: string;
    shadow?: string;
    fontFamily?: string;
    rowHeight?: string;
    transitionDuration?: string;
}

export const defaultTableAppearance: TableAppearance = {
    accent: "#3b82f6",
    accentForeground: "#ffffff",
    background: "#ffffff",
    foreground: "#1e293b",
    border: "#e2e8f0",
    hover: "#f8fafc",
    mutedBackground: "#f1f5f9",
    headerBackground: "#f8fafc",
    radius: "0.75rem",
    shadow: "0 1px 3px rgba(15, 23, 42, 0.08), 0 1px 2px rgba(15, 23, 42, 0.04)",
    fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    rowHeight: "3rem",
    transitionDuration: "180ms",
};

const appearanceMap: Record<keyof TableAppearance, string> = {
    accent: "--rlt-accent",
    accentForeground: "--rlt-accent-foreground",
    background: "--rlt-bg",
    foreground: "--rlt-primary",
    border: "--rlt-border",
    hover: "--rlt-hover",
    mutedBackground: "--rlt-muted-bg",
    headerBackground: "--rlt-header-bg",
    radius: "--rlt-radius",
    shadow: "--rlt-shadow",
    fontFamily: "--rlt-font-family",
    rowHeight: "--rlt-row-height",
    transitionDuration: "--rlt-transition",
};

export function applyAppearance(appearance?: TableAppearance): CSSProperties {
    if (!appearance) return {};

    const style: Record<string, string> = {};
    (Object.keys(appearanceMap) as Array<keyof TableAppearance>).forEach((key) => {
        const value = appearance[key];
        if (value !== undefined) {
            style[appearanceMap[key]] = value;
        }
    });

    return style as CSSProperties;
}

export const tableCssVariables = Object.values(appearanceMap);
