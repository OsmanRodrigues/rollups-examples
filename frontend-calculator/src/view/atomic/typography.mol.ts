import styled, { css } from "styled-components";
import {
    color as colorConstant,
    spacing,
    size as sizeConstant
} from "./styleguide.atm";

interface SharedDefaultProps {
    color?: keyof typeof colorConstant;
    paddingX?: "sm" | "md" | "lg";
    paddingY?: "sm" | "md" | "lg";
    justify?: "start" | "center" | "end";
    isBold?: boolean;
    noPadding?: boolean;
}

interface LabelProps {
    size?: keyof typeof sizeConstant.typography.label;
    isBlock?: boolean;
}

const sharedDefaultCss = css<SharedDefaultProps>`
    word-break: keep-all;
    ${({ isBold, color, noPadding, paddingY, paddingX, justify }) => `
        ${isBold ? "font-weight: 500;" : ""}
        padding: ${
            paddingX || paddingX
                ? `${paddingY ? spacing.padding[paddingY] : "0"}
                    ${paddingX ? spacing.padding[paddingX] : "0"}`
                : noPadding
                ? "0"
                : `${spacing.padding.sm} 0`
        };
        ${justify ? `text-align: ${justify};` : ""}
        color: ${colorConstant[color ?? "white"]};
    `};
`;

export const H1 = styled.h1<SharedDefaultProps>`
    ${sharedDefaultCss}
    font-size: 2rem;
`;
export const H2 = styled.h2<SharedDefaultProps>`
    ${sharedDefaultCss}
    font-size: 1.2rem;
`;
export const H4 = styled.h4<SharedDefaultProps>`
    ${sharedDefaultCss}
    font-size: 0.8rem;
`;
export const Paragraph = styled.p<SharedDefaultProps>`
    ${sharedDefaultCss}
`;
export const Label = styled.label<SharedDefaultProps & LabelProps>`
    ${sharedDefaultCss}
    ${({ size, isBlock }) => `
        font-size: ${sizeConstant.typography.label[size ?? 'md']};
        ${isBlock ? 'display: block;' : ''}
    `}
`;
