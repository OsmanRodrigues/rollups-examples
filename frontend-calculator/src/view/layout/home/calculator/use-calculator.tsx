import React, { useState } from "react";

//Custom Hook
/**
 * Use cases : Numeral Operator Numeral
 *             Numeral Operator
 *             Numeral Operator Numeral Operator
 * Special operators:
"1/x = 1 / numeral
"x²" = numeral ^ 2
"√"  = sqrt(numeral)
"%"  = percent * total %
 */

const Numeral = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9"
}

enum CommonOperations {
    "+" = "+",
    "-" = "-",
    "/" = "/",
    "*" = "*",
    "^" = "^",
}

enum SpecialOperations {
    "1/x" = "1/x",
    "sqrt" = "sqrt",
    "%" = "%",
}

enum Delimiter {
    "." = ".",
}

//TODO: extract functions from useCalculator hook

export const useCalculator = () =>{

    const [mainOperation, setMainOperation] = useState<string[]>([]);
    const [hasMalformedExpression, setHasMalformedExpression] = useState(false);

    const getOperation = (currentOperation: typeof mainOperation): string => {
        if (!currentOperation.length) return '';
        else if (currentOperation.length === 1) {
            setHasMalformedExpression(true);

            return "";
        };

        let operationCopy = [...currentOperation];
        const lastIndex = operationCopy.length - 1;
        const lastItem = operationCopy[lastIndex];

        if (lastItem in CommonOperations || lastItem in SpecialOperations) {
            setHasMalformedExpression(true);
            return "";
        } else if (
            !Number.isNaN(Number(lastItem)) &&
            //Has some especial operation in queue
            operationCopy[lastIndex - 1] in SpecialOperations
        ) {
            const typedSpecialOperation = operationCopy[
                lastIndex - 1
            ] as SpecialOperations;
            const typedNewOperation = handleSpecialOperation(
                typedSpecialOperation,
                operationCopy,
                { next: "" }
            ) as string[];

            operationCopy = typedNewOperation;
        }

        return operationCopy.reduce((total, current) => total + current);
    }

    const handleCommonOperation = (
        value:
            | keyof typeof CommonOperations
            | keyof typeof Delimiter
            | keyof typeof Numeral,
        currentOperation: typeof mainOperation
    ): void => {
        if (!currentOperation.length) {
            setMainOperation([value]);
        } else {
            const lastIndex = currentOperation.length - 1;
            const lastElement = currentOperation[lastIndex];
            const isValueNaN = Number.isNaN(Number(value));

            const incrementLastElement = (
                currentValue: string,
                operation: typeof currentOperation
            ) => {
                const concat = lastElement + currentValue;
                const operationCopy = [...operation];
                operationCopy[lastIndex] = concat;
                setMainOperation(operationCopy);
            };
            const incrementOperation = (
                currentValue: string,
                operation: typeof currentOperation
            ) => {
                const operationCopy = [...operation, currentValue];
                setMainOperation(operationCopy);
            };

            if (isValueNaN) {
                const lastElementIsNaN = Number.isNaN(Number(lastElement));

                if (value === Delimiter["."]) {
                    if (!lastElementIsNaN) {
                        incrementLastElement(value, currentOperation);
                    }
                } else if (value in CommonOperations) {
                    //Last element is an expression
                    if (!lastElementIsNaN || lastElement.startsWith("(")) {
                        //Has some especial operation in queue
                        if (currentOperation[lastIndex - 1] in SpecialOperations) {
                            const typedSpecialOperation = currentOperation[
                                lastIndex - 1
                            ] as SpecialOperations;
                            handleSpecialOperation(
                                typedSpecialOperation,
                                currentOperation,
                                { next: value as CommonOperations }
                            );
                        } else {
                            incrementOperation(value, currentOperation);
                        }
                    }
                }
            } else {
                if (lastElement in CommonOperations) {
                    incrementOperation(value, currentOperation);
                } else if (lastElement in SpecialOperations) {
                    if (!isValueNaN) {
                        incrementOperation(value, currentOperation);
                    }
                } else if (!Number.isNaN(Number(lastElement))) {
                    incrementLastElement(value, currentOperation);
                }
            }
        }
    };

    const handleSpecialOperation = (
        value: keyof typeof SpecialOperations,
        currentOperation: typeof mainOperation,
        queue?: {
            next: keyof typeof CommonOperations | "";
        }
    ): string[] | void => {
        const lastIndex = currentOperation.length - 1;
        const lastElement = currentOperation[lastIndex];
        const lastElementIsNan = Number.isNaN(Number(lastElement));

        const handleQueuedOperation = (
            expression: string,
            currentQueue = queue
        ) => {
            const operationCopy = currentOperation.slice(
                0,
                currentOperation.length - 2
            );
            const typedNextOperation = currentQueue?.next as string;

            operationCopy.push(expression);
            if (!!typedNextOperation) operationCopy.push(typedNextOperation);

            const newOperation = [...operationCopy];

            setMainOperation(newOperation);

            if(typedNextOperation === "") return newOperation;
        };

        switch (value) {
            case "%":
                if (currentOperation.length < 3) break;
                else {
                    const percentageExpressionElements = currentOperation.slice(
                        currentOperation.length - 3,
                        currentOperation.length
                    );

                    for (const [
                        index,
                        element,
                    ] of percentageExpressionElements.entries()) {
                        if (
                            (index === 0 || index === 2) &&
                            Number.isNaN(Number(element))
                        )
                            break;
                        else if (
                            index === 1 &&
                            element !== CommonOperations["*"]
                        )
                            break;
                    }

                    const percent = percentageExpressionElements[0];
                    const targetTotal = percentageExpressionElements[2];
                    const percentageExpression = `((${percent}/100)*${targetTotal})`;
                    const operationCopy = currentOperation.slice(
                        0,
                        currentOperation.length - 3
                    );

                    operationCopy.push(percentageExpression);
                    setMainOperation(operationCopy);
                }
                break;
            case "sqrt":
                if (!!queue) {
                    const radicand = lastElement;
                    const sqrtExpression = `(${value}(${radicand}))`;
                    return handleQueuedOperation(sqrtExpression, queue);
                } else if (lastElementIsNan) {
                    setMainOperation((prevState) => [...prevState, value]);
                }
                break;
            case "1/x":
                if (!!queue) {
                    const divisor = lastElement;
                    const fractionExpression = `(1/${divisor})`;
                    return handleQueuedOperation(fractionExpression, queue);
                } else if (lastElementIsNan) {
                    setMainOperation((prevState) => [...prevState, value]);
                }
                break;
        }
    };

    const handleClear = (
        clearType: "CE" | "C" | "<",
        currentOperation: typeof mainOperation
    ) => {
        if(!currentOperation.length){
            return null
        }

        const lastIndex = currentOperation.length -1;
        const lastElement = currentOperation[lastIndex]

        switch (clearType) {
            case "CE":
                setMainOperation(() => {
                    const currentOperationCopy = [...currentOperation];
                    currentOperation.pop();

                    return currentOperationCopy;
                });
                break;
            case "C":
                setMainOperation(() => {
                    return [];
                });
                break;
            case "<":
                if(Number.isNaN(Number(lastElement))){
                    return null
                }
                setMainOperation(() => {
                    const currentOperationCopy = [...currentOperation];
                    if (lastElement.length > 1) {
                        const newLastElement = lastElement.slice(
                            0,
                            lastElement.length - 1
                        );
                        currentOperation.pop();
                        currentOperation.push(newLastElement);
                    } else {
                        currentOperation.pop();
                    }
                    return currentOperationCopy;
                });
                break;
            default:
                break;
        }

        setHasMalformedExpression(false);
    }

    return {
        mainOperation,
        hasMalformedExpression,
        getOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear
    }
}
