import { FC, HTMLProps, PropsWithChildren } from "react";
import { CalculatorButtonWrapper, getCalculatorButtonStyles } from "./calculator.style";

export enum ButtonType{
    Operation,
    Number,
    Misc,
    BasicOperation,
    Equals
}

type Props = HTMLProps<HTMLButtonElement> & {
    buttonType?: ButtonType;
    background?: string;
    color?: string;
    fontsize?: number;
};


export const CalculatorButton: FC<PropsWithChildren<Props>> = ({
    buttonType = ButtonType.Number,
    onClick,
    disabled,
    className,
    children,
}) => (
    <CalculatorButtonWrapper
        disabled={disabled}
        className={className}
        style={getCalculatorButtonStyles(buttonType)}
        onClick={onClick}
    >
        {children}
    </CalculatorButtonWrapper>
);

