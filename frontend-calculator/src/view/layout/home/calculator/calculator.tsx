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
import { Paragraph } from "../../../atomic/typography.mol";

export const Calculator: React.FC<{}> = () =>{
    const {
        mainOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear,
        getOperation,
    } = useCalculator();
    const {
        inputtedOperation,
        getInputtingOperation,
        hasMalformedExpression
    } = useCalculatorDisplay(mainOperation, getOperation);
    const [showMalformedWarning, setShowMalformedWarning] = useState(false);

    const handleSubmit = (operation: typeof mainOperation) => {
        if (hasMalformedExpression(operation)) setShowMalformedWarning(true);
        else {
            const teste = getOperation(operation);
            console.log(teste);
        }
    };

    return (
        <CalculatorWrapper>
            <InputtedOperationDisplay>
                <Paragraph noPadding>
                    {inputtedOperation || '0'}
                </Paragraph>
            </InputtedOperationDisplay>
            <InputtingOperationDisplay>
                <Paragraph noPadding>
                    {getInputtingOperation(mainOperation) || '0'}
                </Paragraph>
            </InputtingOperationDisplay>
            {showMalformedWarning ?
                <Paragraph justify="end">Malformed expression</Paragraph>
            : null}
            <Grid>
                <Button buttonType = {ButtonType.Misc} label="%"  onClick = {()=>handleSpecialOperation("%", mainOperation)}/>
                <Button buttonType = {ButtonType.Misc} label="CE" onClick = {()=>handleClear(
                        "CE",
                        mainOperation,
                        ()=> {setShowMalformedWarning(false)}
                    )}/>
                <Button buttonType = {ButtonType.Misc} label="C"  onClick = {()=>handleClear(
                        "C",
                        mainOperation,
                        ()=> {setShowMalformedWarning(false)}
                    )}/>
                <Button buttonType = {ButtonType.Misc} label="<"  onClick = {()=>handleClear(
                        "<",
                        mainOperation,
                        ()=> {setShowMalformedWarning(false)}
                    )}/>
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
                <Button buttonType = {ButtonType.Equals} label="=" onClick = {()=> handleSubmit(mainOperation)}/>
            </Grid>
        </CalculatorWrapper>
    )
};

