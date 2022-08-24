import React, { useEffect, useState } from "react";
import { ButtonType } from "./calculator-button";
import {Button} from "./calculator-button";
import { useCalculator } from "./use-calculator";
import {
    CalculatorWrapper,
    InputtedOperationDisplay,
    InputtingOperationDisplay,
    Grid
} from "./calculator.style";
import { useCalculatorDisplay } from "./use-calculator-display";

export const Calculator: React.FC<{}> = () =>{
    const {
        mainOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear,
        getOperation,
    } = useCalculator();
    const {
        getInputtingOperation,
        inputtedOperation
    } = useCalculatorDisplay(mainOperation, getOperation);

    return (
        <CalculatorWrapper>
            <InputtedOperationDisplay>
                {inputtedOperation || '0'}
            </InputtedOperationDisplay>
            <InputtingOperationDisplay>
                {getInputtingOperation(mainOperation) || '0'}
            </InputtingOperationDisplay>
            <Grid>
                <Button buttonType = {ButtonType.Misc} label="%"  onClick = {()=>handleSpecialOperation("%", mainOperation)}/>
                <Button buttonType = {ButtonType.Misc} label="CE" onClick = {()=>handleClear("CE",mainOperation)}/>
                <Button buttonType = {ButtonType.Misc} label="C"  onClick = {()=>handleClear("C",mainOperation)}/>
                <Button buttonType = {ButtonType.Misc} label="<"  onClick = {()=>handleClear("<",mainOperation)}/>
                <Button buttonType = {ButtonType.Operation}  label="1/x" onClick = {()=>handleSpecialOperation("1/x",mainOperation)}/>
                <Button buttonType = {ButtonType.Operation}  label="x²" onClick = {()=>handleCommonOperation("^",mainOperation)}/>
                <Button buttonType = {ButtonType.Operation}  label="√" onClick = {()=>handleSpecialOperation("sqrt",mainOperation)}/>
                <Button buttonType = {ButtonType.Operation}  label="/" onClick = {()=>handleCommonOperation("/",mainOperation)}/>
                <Button label="1" onClick = {()=>handleCommonOperation("1",mainOperation)}/>
                <Button label="2" onClick = {()=>handleCommonOperation("2",mainOperation)}/>
                <Button label="3" onClick = {()=>handleCommonOperation("3",mainOperation)}/>
                <Button buttonType = {ButtonType.BasicOperation}  label="x" onClick = {()=>handleCommonOperation("*",mainOperation)}/>
                <Button label="4" onClick = {()=>handleCommonOperation("4",mainOperation)}/>
                <Button label="5" onClick = {()=>handleCommonOperation("5",mainOperation)}/>
                <Button label="6" onClick = {()=>handleCommonOperation("6",mainOperation)}/>
                <Button buttonType = {ButtonType.BasicOperation} label="-" onClick = {()=>handleCommonOperation("-",mainOperation)}/>
                <Button label="7" onClick = {()=>handleCommonOperation("7",mainOperation)}/>
                <Button label="8" onClick = {()=>handleCommonOperation("8",mainOperation)}/>
                <Button label="9" onClick = {()=>handleCommonOperation("9",mainOperation)}/>
                <Button buttonType = {ButtonType.BasicOperation} label="+" onClick = {()=>handleCommonOperation("+",mainOperation)}/>
                <Button label="+/-"/>
                <Button label="0" onClick = {()=>handleCommonOperation("0",mainOperation)} />
                <Button label="," onClick = {()=>handleCommonOperation(".",mainOperation)}/>
                <Button buttonType = {ButtonType.Equals} label="=" onClick = {()=>{
                    const teste = getOperation(mainOperation)
                    console.log(teste)
                }}/>
            </Grid>
        </CalculatorWrapper>
    )
};

