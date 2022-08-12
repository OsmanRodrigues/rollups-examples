import styled from "styled-components";
import { size as sizeConstant } from "../styleguide.atm";

export interface ImageLayout {
    justify?: "start" | "center" | "end";
    size?: keyof typeof sizeConstant.image;
}

export const ImageWrapper = styled.div<ImageLayout>`
    display: flex;
    flex-direction: column;
    justify-content: ${({ justify }) =>
        justify === "center" ? justify : `flex-${justify}`};
    height: ${({ size }) => size ? sizeConstant.image[size] : 'auto'};
`;
