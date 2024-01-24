
const TextEllipsis = ({ children, lineClamp = 1, as = "div", dir = "rtl", className, ...rest }: { children: string, lineClamp?: number, as?: keyof JSX.IntrinsicElements, dir?: "rtl" | "ltr", className?: string }) => {
    const Wrapper = as;
    return (
        <Wrapper className={`multiline-ellipsis ${className ?? ""}`} style={{ WebkitLineClamp: lineClamp, direction: dir }} {...rest}>
            {children}
        </Wrapper>
    )
}

export default TextEllipsis;