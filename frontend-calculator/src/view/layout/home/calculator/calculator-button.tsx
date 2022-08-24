import React, { PropsWithChildren } from "react";
import { CalculatorButtonWrapper } from "./calculator.style";

type Props = React.HTMLProps<HTMLButtonElement> &{
    buttonType?: ButtonType,
    background?: string;
    color?: string;
    fontsize?: number;
}

export enum ButtonType{
    Operation,
    Number,
    Misc,
    BasicOperation,
    Equals
}

export const CalculatorButton: React.FC<PropsWithChildren<Props>> = ({
    type = ButtonType.Number,
    onClick,
    children
}) => {
    const styles: React.CSSProperties = {};
    if(type == ButtonType.Misc){
        styles.background = "#FFFFFF";
        styles.color = "#000000";
        styles.fontSize = 14;
        styles.fontWeight = 700;
    }
    if(type == ButtonType.Operation){
        styles.background = "#3D3675";
        styles.color = "#FFFFFF";
        styles.fontSize = 20;
    }
    if(type == ButtonType.Equals){
        styles.background = "#5B1F89";
        styles.color = "#FFFFFF";
        styles.fontSize = 24;
    }
    if(type == ButtonType.BasicOperation){
        styles.background = "#3D3675";
        styles.color = "#FFFFFF";
        styles.fontSize = 24;
    }

    return (
        <CalculatorButtonWrapper style={styles} onClick={onClick}>
            {children}
        </CalculatorButtonWrapper>
    );
}


