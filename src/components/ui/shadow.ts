import { StyleProps } from "./styles";
export const shadowPropKeys = ["shadow"] as const;

export interface ShadowProps {
    shadow?: ShadowSize;
}

const shadowSize = ["lg"] as const;

export type ShadowSize = (typeof shadowSize)[number];

export function shadowClasses(props: StyleProps): string[] {
    if (props.shadow) {
        return [`shadow-${props.shadow}`];
    }
    return [];
}
