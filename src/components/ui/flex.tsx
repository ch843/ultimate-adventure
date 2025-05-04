import { isDef } from "./checks.ts";
import classNames from "classnames";
import {
    CSSProperties,
    DetailedHTMLProps,
    ElementType,
    forwardRef,
} from "react";
import { Link, LinkProps } from "react-router-dom";
import * as flexCss from "./flex.module.css";
import { StyleProps, styleClasses, stylePropKeys } from "./styles";
import { SpacingValue } from "./box";

type Justify =
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
export type Align =
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline";

export interface FlexProps
    extends DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
        StyleProps {
    dir?: "row" | "column";
    reverse?: boolean;
    /**
     * gap OR { rowGap, columnGap }
     */
    gap?:
        | SpacingValue
        | {
        rowGap?: SpacingValue | undefined;
        columnGap?: SpacingValue | undefined;
    };
    justify?: Justify;
    align?: Align;
    alignSelf?: Align;
    children?: React.ReactNode;
    flex?: CSSProperties["flex"];
    wrap?: CSSProperties["flexWrap"];
    as?: ElementType;
    grow?: CSSProperties["flexGrow"];
    shrink?: CSSProperties["flexShrink"];
    basis?: CSSProperties["flexBasis"];
    inert?: boolean;
    disabled?: boolean;

    /** Only if it's a label HTML element. Useful for passing `htmlFor` to make some child focusable. */
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    linkProps?: LinkProps;
}

const gapClasses = (gap: NonNullable<FlexProps["gap"]>) => {
    if (typeof gap === "object") {
        const _gapClasses = [];
        if (isDef(gap.rowGap)) {
            _gapClasses.push(`row-gap-${gap.rowGap}`);
        }
        if (isDef(gap.columnGap)) {
            _gapClasses.push(`column-gap-${gap.columnGap}`);
        }
        return _gapClasses;
    } else {
        return [`gap-${gap}`];
    }
};

const toCamelCase = (str: string) => {
    return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const Flex = forwardRef(function Flex(
    {
        children,
        dir = "row",
        gap = "md",
        justify = "flex-start",
        align = "stretch",
        alignSelf,
        flex,
        grow,
        shrink,
        basis,
        className,
        style,
        reverse,
        wrap = "nowrap",
        as = "div",
        inert = false,
        disabled,
        labelProps,
        linkProps,
        ...rest
    }: FlexProps,
    ref,
) {
    const As = as === "a" ? Link : as;
    const styleProps = Object.fromEntries(
        Object.entries(rest).filter(([key]) => stylePropKeys.has(key as any)),
    );
    const otherProps = Object.fromEntries(
        Object.entries(rest).filter(([key]) => !stylePropKeys.has(key as any)),
    );
    return (
        <As
            className={classNames(
                flexCss.flex,
                styleProps["flexDirection"] ? undefined : flexCss[dir],
                { [flexCss.reverse]: reverse },
                flexCss[toCamelCase(`justify-${justify}`)],
                flexCss[toCamelCase(`align-${align}`)],
                flexCss[toCamelCase(`align-self-${alignSelf}`)],
                flexCss[toCamelCase(`wrap-${wrap}`)],
                ...gapClasses(gap),
                ...styleClasses(styleProps),
                className,
            )}
            disabled={disabled}
            ref={ref}
            style={{
                ...style,
                ...(isDef(flex) && { flex }),
                ...(isDef(grow) && { flexGrow: grow }),
                ...(isDef(shrink) && { flexShrink: shrink }),
                ...(isDef(basis) && { flexBasis: basis }),
            }}
            {...(inert ? { inert: "" } : {})}
            {...otherProps}
            {...labelProps}
            {...linkProps}
        >
            {children}
        </As>
    );
});
