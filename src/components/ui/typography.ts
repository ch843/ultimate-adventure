import { camelToKebab } from "./box";

const textSizeValues = ["xxs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
export type TextSizeValue = (typeof textSizeValues)[number];

export type TextWeightValue =
    | "thin"
    | "regular"
    | "medium"
    | "semibold"
    | "bold";
export type LineHeightValue = "1" | "1.5" | "2";
export type TextColorValue =
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary" // TODO: differences between figma, css light/dark variables, and code - text color definitions in figma are "quaterary", and the varaibles in CSS are "quarterary"
    | "quinary"
    | "disabled"
    | "placeholder"
    | "primary-on-brand"
    | "brand-primary"
    | "brand-secondary"
    | "brand-tertiary"
    | "error"
    | "warning"
    | "success"
    | "action-primary"
    | "inherit";

export type TextAlignValue = "left" | "center" | "right";

export interface TextProps {
    fontSize?: TextSizeValue;
    fontWeight?: TextWeightValue;
    fontFamily?: "text" | "header" | "inherit";
    lineHeight?: LineHeightValue;
    fontStyle?: "normal" | "italic";
    textColor?: TextColorValue;
    hoverTextColor?: TextColorValue;
    isHeader?: boolean;
    textAlign?: TextAlignValue;
    textDecoration?: "none" | "underline" | "line-through";
}

export const textPropKeys: readonly (keyof TextProps)[] = [
    "fontSize",
    "fontWeight",
    "fontFamily",
    "lineHeight",
    "textColor",
    "hoverTextColor",
    "textAlign",
    "fontStyle",
    "textDecoration",
] as const;

export function textClasses(props: TextProps) {
    const isHeader = !!props.isHeader || props.fontFamily === "header";
    const onlyTextProps = Object.entries(props).filter(
        ([key, value]) => textPropKeys.includes(key as keyof TextProps) && value,
    );
    return onlyTextProps.reduce((acc, [key, value]) => {
        if (key === "fontSize" && value) {
            const prefix = isHeader ? "header" : "text";
            acc.push(prefix + "-" + value);
        } else if (key === "fontWeight" && value) {
            acc.push("weight-" + value);
        } else {
            acc.push(camelToKebab(key) + "-" + value);
        }
        return acc;
    }, [] as string[]);
}
