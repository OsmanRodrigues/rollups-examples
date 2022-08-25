import React, { useEffect, useState } from "react";
import { ButtonType } from "./calculator-button";
import {CalculatorButton} from "./calculator-button";
import { useCalculator } from "./use-calculator";
import {
    InputtedOperationDisplay,
    InputtingOperationDisplay,
    CalculatorButtonGrid,
    CalculatorWrapper
} from "./calculator.style";
import { useCalculatorDisplay } from "./use-calculator-display";
import { Paragraph } from "../../../atomic/typography.mol";
import { FiDelete } from "react-icons/fi";

export const Calculator: React.FC<{}> = () =>{
    const {
        mainOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear,
        getOperation,
    } = useCalculator();
    const {
        getInputtedOperation,
        getInputtingOperation,
        hasExceededExpressionMaxLength,
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
        <CalculatorWrapper xs={12} md={7}>
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
            <CalculatorButtonGrid>
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    children="%"
                    onClick={() => handleSpecialOperation("%", mainOperation)}
                />
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    children="CE"
                    onClick={() =>
                        handleClear("CE", mainOperation, () => {
                            setShowMalformedWarning(false);
                        })
                    }
                />
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    children="C"
                    onClick={() =>
                        handleClear("C", mainOperation, () => {
                            setShowMalformedWarning(false);
                        })
                    }
                />
                <CalculatorButton
                    buttonType={ButtonType.Misc}
                    onClick={() =>
                        handleClear("<", mainOperation, () => {
                            setShowMalformedWarning(false);
                        })
                    }
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
                    buttonType={ButtonType.Equals}
                    children="="
                    onClick={() => handleSubmit(mainOperation)}
                />
            </CalculatorButtonGrid>
        </CalculatorWrapper>
    );
};

