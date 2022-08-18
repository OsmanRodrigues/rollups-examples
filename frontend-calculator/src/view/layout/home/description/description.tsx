import React from "react";
import styled, { css } from "styled-components";
import calculatorsvg from './image.svg';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1,74px);
    grid-template-rows: [row1-start] 25% [row1-end] repeat(2,44px);
    grid-gap: 20px;
`;

const Container = styled.div`
`;

const DescriptionHeader = styled.header`
height: 100px;
width: 324px;
background: linear-gradient(126.67deg, #2D2355 9.09%, rgba(60, 35, 85, 0) 94.52%);
border-radius: 8px;
color: #FFFF;
border: 1.06329px solid #332C63;
font-weight: 500;
font-size: 24px;
line-height: 28px;
word-spacing:9999px;
text-align: right;
display: flex;
justify-content: right; /* align horizontal */
align-items: center; /* align vertical */
background-image: url(${calculatorsvg});
background-repeat: no-repeat;
`;

const DescriptionText = styled.textarea`
font-weight: 400;
width: 324px;
height: 60px;
font-size: 16px;
line-height: 20px;
color:#9E9E9E;
word-wrap: break-word;
`;

export const Description: React.FC<{}> = () =>{
    return <Container>
        <Grid>
        <DescriptionHeader>Web3 Calculator</DescriptionHeader>
        <DescriptionText>Mount your math expression and calculate it in the blockchain.</DescriptionText>
        </Grid>
        </Container>;
};
