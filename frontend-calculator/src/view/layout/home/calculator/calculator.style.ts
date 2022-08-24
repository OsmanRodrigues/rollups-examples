import styled from "styled-components";
import { color } from "../../../atomic/styleguide.atm";

export const CalculatorWrapper = styled.div``;

export const InputtedOperationDisplay = styled.div`
    text-align: right;

    label {
        color: ${color.displayMain};
        font-size: 1.25rem;
    }
`;

export const InputtingOperationDisplay = styled.div`
    text-align: right;

    label {
        color: ${color.white};
        font-size: 3rem;
        font-weight: 700;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 74px);
    grid-template-rows: [row1-start] 25% [row1-end] repeat(5, 44px);
    grid-gap: 10px;
`;

export const CalculatorButtonWrapper = styled.button`
    background: #5442c9;
    border: none;
    border-radius: 3px;
    font-size: 1.68rem;
    line-height: 32px;
    font-style: normal;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
`;
