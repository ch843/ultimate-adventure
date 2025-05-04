export type SpacingValue =
    | "none"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"
    | "10xl"
    | "11xl";

export type MarginValue = SpacingValue | "auto";

export type RadiusValue =
    | "none"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "full";

/* The width values on Figma are not very useful, says Patrick, but I learned that after making this */
/* none, full, and fit-content can probably stay, but other than that maybe CSS modules are a better choice */
export type WidthValue =
    | "none"
    | "full"
    | "half"
    | "fit-content"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";

export type DisplayValue =
    | "none"
    | "block"
    | "inline-block"
    | "inline"
    | "flex"
    | "inline-flex"
    | "grid"
    | "inline-grid";

export type FlexDirectionValue =
    | "row"
    | "column"
    | "row-reverse"
    | "column-reverse";

export type PositionValue =
    | "static"
    | "fixed"
    | "absolute"
    | "relative"
    | "sticky";

export type PositionAmountValue =
    | "0"
    | "xxs"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl";

export type HoverColorValue = "primary" | "secondary" | "primary-alternate";

export type BgColorValue =
    | "none"
    | "primary"
    | "primary-alt"
    | "secondary"
    | "secondary-alt"
    | "tertiary"
    | "quaternary"
    | "brand-primary"
    | "brand-secondary"
    | "error-primary"
    | "error-secondary"
    | "error-solid"
    | "warning-primary"
    | "warning-secondary"
    | "warning-solid"
    | "success-primary"
    | "success-secondary"
    | "success-solid"
    | "alternate"
    | "secondary-solid"
    | "disabled";

export type BorderColorValue =
    | "none"
    | "primary"
    | "secondary"
    | "tertiary"
    | "disabled"
    | "disabled_subtle"
    | "brand"
    | "brand-solid"
    | "brand-solid_alt"
    | "error"
    | "error-solid"
    | "transparent";

export type OverflowValue = "visible" | "hidden" | "scroll" | "auto";

export type BorderStyleValue = "none" | "solid" | "dashed";

export type BorderWidthValue = "none" | "1px" | "2px";

export type HeightValue =
    | "none"
    | "half-screen"
    | "screen"
    | "full"
    | "three-quarter-screen"
    | "quarter-screen"
    | "auto"
    | "fit-content";
export type CursorValue = "pointer" | "default" | "not-allowed";

/* The main props from the CSS box model */
export interface BoxProps {
    m?: MarginValue;
    mt?: MarginValue;
    mb?: MarginValue;
    ml?: MarginValue;
    mr?: MarginValue;
    mx?: MarginValue;
    my?: MarginValue;
    p?: SpacingValue;
    pt?: SpacingValue;
    pb?: SpacingValue;
    pl?: SpacingValue;
    pr?: SpacingValue;
    px?: SpacingValue;
    py?: SpacingValue;
    radius?: RadiusValue;
    radiusBottom?: RadiusValue;
    w?: WidthValue;
    maxW?: WidthValue;
    minW?: WidthValue;
    display?: DisplayValue;
    position?: PositionValue;
    flexDirection?: FlexDirectionValue;
    grow?: number | string;
    gap?:
        | SpacingValue
        | {
        rowGap?: SpacingValue | undefined;
        columnGap?: SpacingValue | undefined;
    };
    bgColor?: BgColorValue;
    hoverColor?: HoverColorValue;
    className?: string;
    borderColor?: BorderColorValue;
    borderStyle?: BorderStyleValue;
    borderWidth?: BorderWidthValue;
    borderTopWidth?: BorderWidthValue;
    borderRightWidth?: BorderWidthValue;
    borderBottomWidth?: BorderWidthValue;
    borderLeftWidth?: BorderWidthValue;
    height?: HeightValue;
    maxHeight?: HeightValue;
    overflow?: OverflowValue;
    overflowX?: OverflowValue;
    overflowY?: OverflowValue;
    cursor?: CursorValue;
    bottom?: PositionAmountValue;
    left?: PositionAmountValue;
    right?: PositionAmountValue;
    top?: PositionAmountValue;
}

export const paddingPropsKeys = [
    "p",
    "pt",
    "pr",
    "pb",
    "pl",
    "px",
    "py",
] as const;
export type PaddingKey = (typeof paddingPropsKeys)[number];

export type PaddingProps = { [K in PaddingKey]?: SpacingValue };

export const boxPropsKeys: readonly (keyof BoxProps)[] = [
    "m",
    "mt",
    "mr",
    "mb",
    "ml",
    "mx",
    "my",
    ...paddingPropsKeys,
    "radius",
    "radiusBottom",
    "w",
    "maxW",
    "minW",
    "display",
    "position",
    "flexDirection",
    "grow",
    "gap",
    "bgColor",
    "hoverColor",
    "className",
    "borderColor",
    "borderStyle",
    "borderWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "height",
    "maxHeight",
    "overflow",
    "overflowX",
    "overflowY",
    "cursor",
    "bottom",
    "left",
    "right",
    "top",
] as const;

export const camelToKebab = (str: string) => {
    return str
        .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
        .replace(".", "-");
};

export function boxClasses(props: BoxProps) {
    const onlyBoxProps = Object.entries(props).filter(
        ([key, value]) => boxPropsKeys.includes(key as keyof BoxProps) && value,
    );
    return onlyBoxProps.reduce((acc, [key, value]) => {
        if (key === "className") {
            acc.push(value);
        } else {
            acc.push(camelToKebab(key) + "-" + value);
        }
        return acc;
    }, [] as string[]);
}
