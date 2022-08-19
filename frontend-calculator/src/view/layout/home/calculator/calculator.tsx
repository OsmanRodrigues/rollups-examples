import React from "react";
import styled, { css } from "styled-components";
import { ButtonType } from "./calculator-button";
import {Button} from "./calculator-button";
import { useCalculator } from "./use-calculator";

const Container = styled.div`
`;

const CurrentOperation = styled.div`
font-size: 20px;
color: #FFFF;
letter-spacing: 0.09em;
grid-column-end: span 4;
text-align: right;
`;

const Display = styled.div`
border-radius: 10px;
text-align: right;
font-size: 48px;
grid-column-end: span 4;
color: #FFFF;
font-weight: 700;
letter-spacing: 0.09em;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4,74px);
    grid-template-rows: [row1-start] 25% [row1-end] repeat(5,44px);
    grid-gap: 10px;
`;


export const Calculator: React.FC<{}> = () =>{
    const {
        operation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear,
        getOperation,
    } = useCalculator()
    console.log(operation)
    return <Container>
        <CurrentOperation>9+9+9</CurrentOperation>
        <Display>0</Display>
        <Grid>
            <Button buttonType = {ButtonType.Misc} label="%"  onClick = {()=>handleSpecialOperation("%", operation)}/>
            <Button buttonType = {ButtonType.Misc} label="CE" onClick = {()=>handleClear("CE",operation)}/>
            <Button buttonType = {ButtonType.Misc} label="C"  onClick = {()=>handleClear("C",operation)}/>
            <Button buttonType = {ButtonType.Misc} label="<"  onClick = {()=>handleClear("<",operation)}/>
            <Button buttonType = {ButtonType.Operation}  label="1/x" onClick = {()=>handleSpecialOperation("1/x",operation)}/>
            <Button buttonType = {ButtonType.Operation}  label="x²" onClick = {()=>handleCommonOperation("^",operation)}/>
            <Button buttonType = {ButtonType.Operation}  label="√" onClick = {()=>handleSpecialOperation("sqrt",operation)}/>
            <Button buttonType = {ButtonType.Operation}  label="/" onClick = {()=>handleCommonOperation("/",operation)}/>
            <Button label="1" onClick = {()=>handleCommonOperation("1",operation)}/>
            <Button label="2" onClick = {()=>handleCommonOperation("2",operation)}/>
            <Button label="3" onClick = {()=>handleCommonOperation("3",operation)}/>
            <Button buttonType = {ButtonType.BasicOperation}  label="x" onClick = {()=>handleCommonOperation("*",operation)}/>
            <Button label="4" onClick = {()=>handleCommonOperation("4",operation)}/>
            <Button label="5" onClick = {()=>handleCommonOperation("5",operation)}/>
            <Button label="6" onClick = {()=>handleCommonOperation("6",operation)}/>
            <Button buttonType = {ButtonType.BasicOperation} label="-" onClick = {()=>handleCommonOperation("-",operation)}/>
            <Button label="7" onClick = {()=>handleCommonOperation("7",operation)}/>
            <Button label="8" onClick = {()=>handleCommonOperation("8",operation)}/>
            <Button label="9" onClick = {()=>handleCommonOperation("9",operation)}/>
            <Button buttonType = {ButtonType.BasicOperation} label="+" onClick = {()=>handleCommonOperation("+",operation)}/>
            <Button label="+/-"/>
            <Button label="0" onClick = {()=>handleCommonOperation("0",operation)} />
            <Button label="," onClick = {()=>handleCommonOperation(".",operation)}/>
            <Button buttonType = {ButtonType.Equals} label="=" onClick = {()=>{
                const teste = getOperation(operation)
                console.log(teste)
            }}/>
        </Grid>
    </Container>;
};


function handleNumerical(arg0: number): React.MouseEventHandler<HTMLButtonElement> | undefined {
    throw new Error("Function not implemented.");
}

