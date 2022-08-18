import React from "react";
import styled, { css } from "styled-components";
import { sendInput, SendInputData } from "../../../../controller/send.controller";
import { fetchNotices } from "../../../../controller/notices.controller";
import { useService } from "../../../../controller/use-service/use-service.hook";
import { ButtonType } from "./calculator-button";
import {Button} from "./calculator-button";
import { SendInputViewModel } from "../../../../service/send.service";
import { NoticeViewModel } from "../../../../service/notices.service";



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
    return <Container>
        <CurrentOperation>9+9+9</CurrentOperation>
        <Display>0</Display>
        <Grid>
            <Button buttonType = {ButtonType.Misc} label="%"  onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Misc} label="CE" onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Misc} label="C"  onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Misc} label="<"  onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Operation}  label="1/x" onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Operation}  label="x²" onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Operation}  label="√" onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Operation}  label="/" onClick = {()=>handleNumerical(1)}></Button>
            <Button label="1" onClick = {()=>handleNumerical(1)}></Button>
            <Button label="2" onClick = {()=>handleNumerical(2)}></Button>
            <Button label="3" onClick = {()=>handleNumerical(3)}></Button>
            <Button buttonType = {ButtonType.BasicOperation}  label="x" onClick = {()=>handleNumerical(1)}></Button>
            <Button label="4" onClick = {()=>handleNumerical(4)}></Button>
            <Button label="5" onClick = {()=>handleNumerical(5)}></Button>
            <Button label="6" onClick = {()=>handleNumerical(6)}></Button>
            <Button buttonType = {ButtonType.BasicOperation} label="-" onClick = {()=>handleNumerical(1)}></Button>
            <Button label="7" onClick = {()=>handleNumerical(7)}></Button>
            <Button label="8" onClick = {()=>handleNumerical(8)}></Button>
            <Button label="9" onClick = {()=>handleNumerical(9)}></Button>
            <Button buttonType = {ButtonType.BasicOperation} label="+" onClick = {()=>handleNumerical(1)}></Button>
            <Button label="+/-" onClick = {()=>handleNumerical(1)}></Button>
            <Button label="0" onClick = {()=>handleNumerical(0)} ></Button>
            <Button label="," onClick = {()=>handleNumerical(1)}></Button>
            <Button buttonType = {ButtonType.Equals} label="=" onClick = {()=>handleNumerical(1)}></Button>
        </Grid>
    </Container>;
};


function handleNumerical(arg0: number): React.MouseEventHandler<HTMLButtonElement> | undefined {
    throw new Error("Function not implemented.");
}

