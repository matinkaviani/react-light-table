import React from "react";

const iconProps = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "sort-indicator-icon",
    "aria-hidden": true,
} as const;

export const SortAsc = React.memo(() => (
    <svg {...iconProps}>
        <path
            d="M8 14L12 10L16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
));

export const SortDesc = React.memo(() => (
    <svg {...iconProps}>
        <path
            d="M8 10L12 14L16 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
));

export const Neutral = React.memo(() => (
    <svg {...iconProps}>
        <path d="M8 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
));
