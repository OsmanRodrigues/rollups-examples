import styled, { css } from "styled-components";
import { border, color, radius, size, spacing } from "../styleguide.atm";

interface Layout {
    isFluid?: boolean;
    shouldMaxSize?: boolean;
}

const sharedDefaultCss = css`
    padding: ${spacing.padding.layout};
`;

export const Header = styled.header`
    ${sharedDefaultCss}
    top: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
`;

export const Main = styled.main`
    ${sharedDefaultCss}
`;

export const Footer = styled.footer`
    ${sharedDefaultCss}
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BoxWrapper = styled.div<Layout>`
    padding: 0 ${spacing.padding.md};
    border: ${border.small} ${color.mediumMain};
    border-radius: ${radius.lg};
    background: linear-gradient(
        to top left,
        ${color.main} 60%,
        ${color.mediumMain} 100%
    );
    ${({ isFluid, shouldMaxSize }) => `
        ${isFluid ? `
        width: 100%;
        height: 100%;
        overflow-y: auto;
        ` : ""}
        ${shouldMaxSize ? `
            max-height: ${size.card.height};
        ` : ""}
    `}
`;
