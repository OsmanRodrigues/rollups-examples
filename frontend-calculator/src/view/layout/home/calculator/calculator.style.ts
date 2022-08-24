import styled from "styled-components";

export const CalculatorWrapper = styled.div``;

export const InputtedOperationDisplay = styled.div`
    font-size: 20px;
    color: #ffff;
    letter-spacing: 0.09em;
    grid-column-end: span 4;
    text-align: right;
`;

export const InputtingOperationDisplay = styled.div`
    border-radius: 10px;
    text-align: right;
    font-size: 48px;
    grid-column-end: span 4;
    color: #ffff;
    font-weight: 700;
    letter-spacing: 0.09em;
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
    font-size: 27px;
    line-height: 32px;
    font-family: "Rubik";
    font-style: normal;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
`;
