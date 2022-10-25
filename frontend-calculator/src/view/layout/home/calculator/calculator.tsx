// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, useCallback, useState } from "react";
import { ButtonType } from "./calculator-button";
import { CalculatorButton } from "./calculator-button";
import { ClearType, useCalculator } from "./use-calculator";
import {
    InputtedOperationDisplay,
    InputtingOperationDisplay,
    CalculatorButtonGrid,
    CalculatorWrapper,
} from "./calculator.style";
import { useCalculatorDisplay } from "./use-calculator-display";
import { Paragraph } from "../../../atomic/typography.mol";
import { FiDelete } from "react-icons/fi";
import { SendInputData } from "../../../../controller/send.controller";
import { onboardTourCSSClass } from "../onboard-tour/onboard-tour.style";

interface ICalculator {
    handleSendInput: (data: SendInputData) => void;
    onClear?: () => void;
}

export const Calculator: FC<ICalculator> = ({ handleSendInput, onClear }) => {
    const {
        mainOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear: handleCalculatorClear,
        getOperation,
    } = useCalculator();
    const {
        checkDigitLength,
        getInputtedOperation,
        getInputtingOperation,
        hasExceededExpressionMaxLength,
        hasMalformedExpression,
    } = useCalculatorDisplay(mainOperation, getOperation);
    const [showMalformedWarning, setShowMalformedWarning] = useState(false);
    const digitCheckMessage = checkDigitLength(mainOperation);

    const handleSubmit = (operation: typeof mainOperation): void => {
        if (hasExceededExpressionMaxLength(operation)) return void null;
        else if (hasMalformedExpression(operation))
            setShowMalformedWarning(true);
        else handleSendInput({ Operation: getOperation(operation) });
    };

    const handleClear = useCallback(
        (clearType: keyof typeof ClearType) => {
            handleCalculatorClear(clearType, mainOperation, () => {
                setShowMalformedWarning(false);

                if (clearType === "C") onClear?.();
            });
        },
        [mainOperation, onClear]
    );

    return (
        <CalculatorWrapper
            className={onboardTourCSSClass["onboard-tour-element-2"]}
            xs={12}
            md={7}
        >
            <InputtedOperationDisplay>
                <label>{getInputtedOperation(mainOperation) || "0"}</label>
            </InputtedOperationDisplay>
            <InputtingOperationDisplay>
                <label>{getInputtingOperation(mainOperation) || "0"}</label>
            </InputtingOperationDisplay>
            {showMalformedWarning ? (
                <Paragraph justify="end">Malformed expression</Paragraph>
            ) : null}
            {hasExceededExpressionMaxLength(mainOperation) ? (
                <Paragraph justify="end">
                    The expression must contain a maximum of 10 operations.
                </Paragraph>
            ) : null}
            {!!digitCheckMessage ? (
                <Paragraph justify="end">{digitCheckMessage}</Paragraph>
            ) : null}
            <CalculatorButtonGrid>
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    children="%"
                    onClick={() => handleSpecialOperation("%", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    children="CE"
                    onClick={() => handleClear("CE")}
                />
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    children="C"
                    onClick={() => handleClear("C")}
                />
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    onClick={() => handleClear("<")}
                >
                    <FiDelete />
                </CalculatorButton>
                <CalculatorButton
                    buttonType={ButtonType.Operation}
                    children="1/x"
                    onClick={() => handleSpecialOperation("1/x", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.Operation}
                    children="x²"
                    onClick={() => handleCommonOperation("^", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.Operation}
                    children="√"
                    onClick={() =>
                        handleSpecialOperation("sqrt", mainOperation)
                    }
                />
                <CalculatorButton
                    buttonType={ButtonType.Operation}
                    children="/"
                    onClick={() => handleCommonOperation("/", mainOperation)}
                />
                <CalculatorButton
                    children="1"
                    onClick={() => handleCommonOperation("1", mainOperation)}
                />
                <CalculatorButton
                    children="2"
                    onClick={() => handleCommonOperation("2", mainOperation)}
                />
                <CalculatorButton
                    children="3"
                    onClick={() => handleCommonOperation("3", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.BasicOperation}
                    children="x"
                    onClick={() => handleCommonOperation("*", mainOperation)}
                />
                <CalculatorButton
                    children="4"
                    onClick={() => handleCommonOperation("4", mainOperation)}
                />
                <CalculatorButton
                    children="5"
                    onClick={() => handleCommonOperation("5", mainOperation)}
                />
                <CalculatorButton
                    children="6"
                    onClick={() => handleCommonOperation("6", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.BasicOperation}
                    children="-"
                    onClick={() => handleCommonOperation("-", mainOperation)}
                />
                <CalculatorButton
                    children="7"
                    onClick={() => handleCommonOperation("7", mainOperation)}
                />
                <CalculatorButton
                    children="8"
                    onClick={() => handleCommonOperation("8", mainOperation)}
                />
                <CalculatorButton
                    children="9"
                    onClick={() => handleCommonOperation("9", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.BasicOperation}
                    children="+"
                    onClick={() => handleCommonOperation("+", mainOperation)}
                />
                <CalculatorButton disabled />
                <CalculatorButton
                    children="0"
                    onClick={() => handleCommonOperation("0", mainOperation)}
                />
                <CalculatorButton
                    children=","
                    onClick={() => handleCommonOperation(".", mainOperation)}
                />
                <CalculatorButton
                    className={onboardTourCSSClass["onboard-tour-element-3"]}
                    buttonType={ButtonType.Equals}
                    children="="
                    onClick={() => handleSubmit(mainOperation)}
                />
            </CalculatorButtonGrid>
        </CalculatorWrapper>
    );
};
