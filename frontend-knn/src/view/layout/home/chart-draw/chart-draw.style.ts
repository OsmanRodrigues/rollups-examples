import styled from "styled-components";

export const FLOWER_BG_ID = "flowerBg";

export const ChartDrawWrapper = styled.div`
    height: 400px;
    .Series {
        path {
            stroke: none !important;
        }
        /* Petal */
        g > g:nth-child(1) > path:nth-child(1) {
            fill: #af61b6 !important;
        }
        /* Sepal */
        g > g:nth-child(2) > path:nth-child(1) {
            fill: #a78acf !important;
        }
        /* Background */
        g > g:nth-child(3) {
            * {
                display: none;
            }
            path:nth-child(1) {
                display: initial;
                fill: url(#${FLOWER_BG_ID}) !important;
            }
        }
    }
`;
export const ChartDrawSVGDefs = styled.svg`
    width: 0;
    height: 0;
    image {
        x: -20;
        y: 100;
        width: 264px;
        height: 264px;
    }
`;
