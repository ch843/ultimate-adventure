import classNames from "classnames";
import {
    CSSProperties,
    DetailedHTMLProps,
    ForwardedRef,
    ReactNode,
    forwardRef,
    memo,
} from "react";
import { StyleProps, styleClasses } from "./styles";
import * as textCss from "./text.module.css";
import { TextAlignValue } from "./typography";

type TextElement = "p" | "span" | "div" | "h1";

export interface TextProps extends StyleProps {
    textOverflow?: CSSProperties["textOverflow"];
    whiteSpace?: CSSProperties["whiteSpace"];
    textAlign?: TextAlignValue;
}

export const Text = memo(
    forwardRef(function Text(
        props: Omit<TextProps, "fontFamily" | "lineHeight"> & {
            children: ReactNode;
            as?: TextElement;
            fontFamily?: "inherit" | "text";
        } & DetailedHTMLProps<
            React.HTMLAttributes<HTMLSpanElement>,
            HTMLSpanElement
        >,
        ref: ForwardedRef<HTMLDivElement>,
    ) {
        const As: TextElement = props.as ?? "p";
        return (
            <As
                className={classNames(
                    textCss.text,
                    styleClasses({ ...props, fontFamily: props.fontFamily ?? "inherit" }),
                )}
                onClick={props.onClick}
                overflow={props.overflow}
                ref={ref}
                style={{
                    textOverflow: props.textOverflow,
                    whiteSpace: props.whiteSpace,
                    color: props.color,
                    ...props.style,
                }}
            >
                {props.children}
            </As>
        );
    }),
);

type HeaderElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";

export const Header = memo(function Header(
    props: Omit<TextProps, "fontFamily"> & {
        children: ReactNode;
        as?: HeaderElement;
        fontFamily?: "inherit";
    },
) {
    const As: HeaderElement = props.as ?? "h1";
    return (
        <As
            className={classNames(
                textCss.text,
                styleClasses({
                    ...props,
                    fontFamily: props.fontFamily ?? "header",
                    textColor: props.textColor ?? "primary",
                    isHeader: true,
                }),
            )}
            style={{ textOverflow: props.textOverflow, overflow: props.overflow }}
        >
            {props.children}
        </As>
    );
});
