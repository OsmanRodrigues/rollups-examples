import React, { PropsWithChildren } from "react";
import { CalculatorButtonWrapper, getCalculatorButtonStyles } from "./calculator.style";

export enum ButtonType{
    Operation,
    Number,
    Misc,
    BasicOperation,
    Equals
}

type Props = React.HTMLProps<HTMLButtonElement> & {
    buttonType?: ButtonType;
    background?: string;
    color?: string;
    fontsize?: number;
};


export const CalculatorButton: React.FC<PropsWithChildren<Props>> = ({
    buttonType = ButtonType.Number,
    onClick,
    disabled,
    children
}) => (
    <CalculatorButtonWrapper
        disabled={disabled}
        style={getCalculatorButtonStyles(buttonType)}
        onClick={onClick}
    >
        {children}
    </CalculatorButtonWrapper>
);

