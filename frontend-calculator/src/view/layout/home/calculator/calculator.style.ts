// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { Col } from "react-grid-system";
import styled from "styled-components";
import { border, color, radius } from "../../../atomic/styleguide.atm";
import { ButtonType } from "./calculator-button";

export const CalculatorWrapper = styled(Col)`
    @media only screen and (max-width: 768px) {
        padding-bottom: 1rem;
    }
`;

export const InputtedOperationDisplay = styled.div`
    text-align: right;

    label {
        color: ${color.displayMain};
        font-size: 1.25rem;
    }
`;

export const InputtingOperationDisplay = styled.div`
    text-align: right;

    label {
        color: ${color.white};
        font-size: 3rem;
        font-weight: 700;
    }
`;

export const CalculatorButtonGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 4.5rem);
    grid-template-rows: [row1-start] 10% [row1-end] repeat(5, 44px);
    grid-gap: 10px;
    justify-content: right;

    @media only screen and (max-width: 411px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const CalculatorButtonWrapper = styled.button`
    background: ${color.buttonNumeric};
    border: none;
    border-radius: ${radius.md};
    font-size: 1.68rem;
    line-height: 32px;
    font-style: normal;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    &:disabled {
        background: ${color.buttonOperation};
        border: ${border.general} ${color.mediumMain};
    }
    &:hover {
        cursor: pointer;
    }
`;

export const getCalculatorButtonStyles = (
    type: ButtonType
): React.CSSProperties => {
    if (type == ButtonType.Misc) {
        return {
            background: color.white,
            color: color.dark,
            fontSize: "0.875rem",
            fontWeight: 700,
        };
    } else if (type == ButtonType.Operation) {
        return {
            background: color.buttonOperation,
            color: color.white,
            fontSize: "1.25rem",
        };
    } else if (type == ButtonType.Equals) {
        return {
            background: color.buttonEquals,
            color: color.white,
            fontSize: "1.5rem",
        };
    } else if (type == ButtonType.BasicOperation) {
        return {
            background: color.buttonBasicOperation,
            color: color.white,
            fontSize: "1.5rem",
        };
    }

    return {};
};
