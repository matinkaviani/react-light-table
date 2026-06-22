import type { CSSProperties, ElementType, HTMLAttributes } from "react";

type TextEllipsisProps = {
    children: string;
    lineClamp?: number;
    as?: ElementType;
    dir?: "rtl" | "ltr";
    className?: string;
} & HTMLAttributes<HTMLElement>;

const TextEllipsis = ({
    children,
    lineClamp = 1,
    as: Component = "div",
    dir = "rtl",
    className,
    ...rest
}: TextEllipsisProps) => {
    return (
        <Component
            className={`multiline-ellipsis ${className ?? ""}`}
            style={{ WebkitLineClamp: lineClamp, direction: dir } as CSSProperties}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default TextEllipsis;
