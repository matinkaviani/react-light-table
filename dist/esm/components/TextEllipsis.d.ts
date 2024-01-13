declare const TextEllipsis: ({ children, lineClamp, as, dir, className, ...rest }: {
    children: string;
    lineClamp?: number | undefined;
    as?: keyof JSX.IntrinsicElements | undefined;
    dir?: "rtl" | "ltr" | undefined;
    className?: string | undefined;
}) => import("react/jsx-runtime").JSX.Element;
export default TextEllipsis;
