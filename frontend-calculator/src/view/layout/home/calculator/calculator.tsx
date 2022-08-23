import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
        mainOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear,
        getOperation,
    } = useCalculator();

    const [operationDisplay, setOperationDisplay] = useState("");

    useEffect(() => {
        if (mainOperation.length >= 4) {
            const operationStr = getOperation(mainOperation);
            console.log({ operationStr, mainOperation });

            setOperationDisplay(operationStr);
        } else if (mainOperation.length === 0) setOperationDisplay("");
    }, [mainOperation]);

    return <Container>
        {/* <CurrentOperation style={{border: '1px solid red'}}> */}
        <h1 style={{border: '1px solid red'}}>
            {operationDisplay ?? '0'}
        </h1>

        <Display>0</Display>
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
    </Container>;
};

