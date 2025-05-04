import {
    TextSizeValue,
    TextWeightValue,
} from "./typography";
import classNames from "classnames";
import {
    ForwardedRef,
    forwardRef,
    JSXElementConstructor,
    memo,
    MouseEvent,
} from "react";
import CircleSpinner from "../../circle-spinner.svg";
import { Flex } from "./flex";
import { Text } from "./text";
import { SpacingValue } from "./box";
import * as ButtonCss from "./-button.module.css";

export const ButtonSize = ["xs", "sm", "md", "lg", "xl"] as const;
export type ButtonSize = (typeof ButtonSize)[number];

export const ButtonTheme = [
    "normal",
    "destructive",
    "success",
    "action",
] as const;
export type ButtonTheme = (typeof ButtonTheme)[number];

export const ButtonHierarchy = [
    "primary",
    "secondary",
    "tertiary",
    "link",
    "link_underline",
] as const;
export type ButtonHierarchy = (typeof ButtonHierarchy)[number];

/**
 * @param pending -- custom pending states can be achieved by passing spinner icon leading, new text, and disabled
 *
 * @param dangerousStyleThatShouldOnlyBeUsedInSpecificSituations -- this should only defined if we need the button to follow a merchant's branding.
 * Do not use in other situations.
 *
 * @param type -- if you are using an HTML form, you may care about setting this.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type}
 *
 */
export interface ButtonProps {
    onClick?(event: MouseEvent<HTMLButtonElement>): void;
    dataTestId?: string;
    size?: ButtonSize;
    theme?: ButtonTheme;
    hierarchy?: ButtonHierarchy;
    text?: string;
    textWeight?: TextWeightValue;
    IconLeading?: JSXElementConstructor<any> | "placeholder";
    IconTrailing?: JSXElementConstructor<any> | "placeholder";
    dontRestrainIconWidth?: boolean;
    disabled?: boolean;
    pending?: boolean;
    pressed?: boolean;
    buttonClassName?: string;
    buttonContentClassName?: string;
    buttonId?: string;
    buttonValue?: string;
    centerItems?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
    flexGrow?: number;
    dangerousStyleThatShouldOnlyBeUsedForMerchantBranding?: React.CSSProperties;
}

/**
 * Figma
 * https://www.figma.com/design/iZHj2I36zd9i8nRbWKw4ZK/%E2%9D%96-Arbiter?node-id=3287-427074&t=p984S770InFMNsms-0
 */
export const Button = memo(
    forwardRef(function Button(
        {
            dataTestId,
            size = "sm",
            theme = "normal",
            hierarchy = "tertiary",
            IconLeading,
            IconTrailing,
            text,
            textWeight = "medium",
            onClick,
            disabled,
            pending,
            centerItems = true,
            buttonClassName,
            buttonContentClassName,
            buttonId,
            buttonValue,
            dontRestrainIconWidth,
            className,
            type = "button",
            form,
            pressed,
            flexGrow,
            dangerousStyleThatShouldOnlyBeUsedForMerchantBranding,
        }: ButtonProps,
        ref: ForwardedRef<HTMLButtonElement>,
    ) {
        const isIconOnly = !text;

        function wrappedIcon(
            Icon: JSXElementConstructor<any> | "placeholder",
            extraClasses?: string,
        ) {
            const icon = typeof Icon === "string" ? <div /> : <Icon />;

            return (
                <Flex
                    align="center"
                    className={classNames(
                        ButtonCss.iconContainer,
                        ButtonCss[size],
                        dontRestrainIconWidth && ButtonCss.dontRestrainIconWidth,
                        extraClasses,
                    )}
                    justify="center"
                >
                    {icon}
                </Flex>
            );
        }

        const fontSize = sizeToFontSize[size];

        const px = evaluatePx(size, isIconOnly, hierarchy);

        return (
            <div
                className={className}
                style={flexGrow !== undefined ? { flexGrow } : undefined}
            >
                <button
                    className={classNames(
                        ButtonCss.button,
                        disabled || pending ? ButtonThemeCss.disabled : undefined,
                        ButtonCss[size],
                        themeClass[theme],
                        hierarchyClass[hierarchy],
                        pressed && ButtonThemeCss.pressed,
                        buttonClassName,
                    )}
                    data-testid={dataTestId}
                    disabled={disabled || pending}
                    form={form}
                    id={buttonId}
                    onClick={onClick}
                    ref={ref}
                    style={dangerousStyleThatShouldOnlyBeUsedForMerchantBranding}
                    type={type}
                    value={buttonValue}
                >
                    {pending && wrappedIcon(CircleSpinner, ButtonCss.spinner)}
                    <Flex
                        align="center"
                        className={classNames(
                            ButtonCss.buttonContent,
                            pending && ButtonCss.pending,
                            buttonContentClassName,
                        )}
                        gap={sizeToGap[size]}
                        justify={centerItems ? "center" : "flex-start"}
                        px={px}
                    >
                        {IconLeading && wrappedIcon(IconLeading)}
                        {text && (
                            <Text
                                fontSize={fontSize}
                                fontWeight={textWeight}
                                overflow="hidden"
                                px="xxs"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                            >
                                {text}
                            </Text>
                        )}
                        {IconTrailing && wrappedIcon(IconTrailing)}
                    </Flex>
                </button>
            </div>
        );
    }),
);

function evaluatePx(
    size: ButtonSize,
    isIconOnly: boolean,
    hierarchy: ButtonHierarchy,
) {
    if (hierarchy === "link") {
        return "none";
    }
    if (isIconOnly) {
        return iconOnlySizeToPaddingX[size];
    }
    return sizeToPaddingX[size];
}

const themeClass: Record<ButtonTheme, string> = {
    ["normal"]: ButtonThemeCss.themeNormal,
    ["destructive"]: ButtonThemeCss.themeDestructive,
    ["success"]: ButtonThemeCss.themeSuccess,
    ["action"]: ButtonThemeCss.themeAction,
};

const hierarchyClass: Record<ButtonHierarchy, string> = {
    ["primary"]: ButtonThemeCss.hierarchyPrimary,
    ["secondary"]: ButtonThemeCss.hierarchySecondary,
    ["tertiary"]: ButtonThemeCss.hierarchyTertiary,
    ["link"]: ButtonThemeCss.hierarchyLinkGray,
    ["link_underline"]: ButtonThemeCss.hierarchyLinkUnderline,
};

const sizeToPaddingX: Record<ButtonSize, SpacingValue> = {
    ["xs"]: "md",
    ["sm"]: "lg",
    ["md"]: "lg",
    ["lg"]: "lg",
    ["xl"]: "xl",
};

const iconOnlySizeToPaddingX: Record<ButtonSize, SpacingValue> = {
    ["xs"]: "sm",
    ["sm"]: "sm",
    ["md"]: "md",
    ["lg"]: "md",
    ["xl"]: "lg",
};

const sizeToFontSize: Record<ButtonSize, TextSizeValue> = {
    ["xs"]: "xs",
    ["sm"]: "xs",
    ["md"]: "sm",
    ["lg"]: "sm",
    ["xl"]: "md",
};

const sizeToGap: Record<ButtonSize, TextSizeValue> = {
    ["xs"]: "xs",
    ["sm"]: "xs",
    ["md"]: "xs",
    ["lg"]: "xs",
    ["xl"]: "sm",
};
