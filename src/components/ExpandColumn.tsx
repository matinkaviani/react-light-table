import { MouseEvent } from "react";

interface ExpandColumnProps {
    expanded: boolean;
    onToggle: () => void;
    headerTextAlign?: string;
    contentTextAlign?: string;
    indent?: number;
    hasChildren?: boolean;
}

function stopPropagation(event: MouseEvent) {
    event.stopPropagation();
}

export function ExpandHeader({ headerTextAlign }: { headerTextAlign?: string }) {
    return (
        <th className={`expand-header-col${headerTextAlign ? ` ${headerTextAlign}` : ""}`} scope="col">
            <span className="sr-only">Expand row</span>
        </th>
    );
}

export function ExpandCell({
    expanded,
    onToggle,
    contentTextAlign,
    indent = 0,
    hasChildren = true,
}: ExpandColumnProps) {
    return (
        <td className={`expand-cell${contentTextAlign ? ` ${contentTextAlign}` : ""}`} onClick={stopPropagation}>
            <span className="expand-cell-inner" style={{ paddingInlineStart: `${indent * 1.25}rem` }}>
                {hasChildren ? (
                    <button
                        type="button"
                        className={`expand-toggle${expanded ? " expanded" : ""}`}
                        aria-expanded={expanded}
                        aria-label={expanded ? "Collapse row" : "Expand row"}
                        onClick={onToggle}
                    >
                        {expanded ? "−" : "+"}
                    </button>
                ) : (
                    <span className="expand-toggle-spacer" aria-hidden="true" />
                )}
            </span>
        </td>
    );
}
