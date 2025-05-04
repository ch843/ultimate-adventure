import { BoxProps, boxClasses, boxPropsKeys } from "./box";
import { ShadowProps, shadowClasses, shadowPropKeys } from "./shadow";
import { TextProps, textClasses, textPropKeys } from "./typography";
export interface StyleProps extends BoxProps, TextProps, ShadowProps {}

export const stylePropKeys = new Set([
    ...boxPropsKeys,
    ...textPropKeys,
    ...shadowPropKeys,
]);

export function styleClasses(props: StyleProps) {
    return [...boxClasses(props), ...textClasses(props), ...shadowClasses(props)];
}
