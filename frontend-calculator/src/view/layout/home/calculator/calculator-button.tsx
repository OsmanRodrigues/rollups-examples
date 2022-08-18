import React from "react";
import styled from "styled-components";
import { string } from "../constants";

type Props = React.HTMLProps<HTMLButtonElement> &{
    buttonType?: ButtonType,
    label: string;
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

const Operation = [];

const StyledButton = styled.button`
background: #5442C9;
border: none;
border-radius: 3px;
font-size: 27px;
line-height: 32px;
font-family: 'Rubik';
font-style: normal;
font-weight: 500;
color: #FFFFFF;
text-align: center;
`;

export const Button: React.FC<Props> = ({type = ButtonType.Number,label,onClick}) =>{
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
        <StyledButton style={styles} onClick={onClick}>{label}</StyledButton>
    )
}


