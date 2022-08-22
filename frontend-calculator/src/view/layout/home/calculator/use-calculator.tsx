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

export const useCalculator = () =>{

    const [operation, setOperation] = useState<string[]>([]);

    //TODO - Polish array treatment when operation is empty
    const getOperation = (currentOperation: typeof operation) =>
        currentOperation.reduce((total,current)=> total + current)

    const handleCommonOperation = (
        value:
            | keyof typeof CommonOperations
            | keyof typeof Delimiter
            | keyof typeof Numeral,
        currentOperation: typeof operation
    ): void => {
        if (!currentOperation.length) {
            setOperation([value]);
        } else {
            const lastIndex = currentOperation.length - 1;
            const lastElement = currentOperation[lastIndex];
            const isValueNaN = Number.isNaN(Number(value));

            const incrementLastElement = (currentValue: string) => {
                setOperation((prevState) => {
                    const concat = lastElement + currentValue;
                    const prevStateCopy = [...prevState];
                    prevStateCopy[lastIndex] = concat;
                    return prevStateCopy;
                });
            };
            const incrementOperation = (currentValue: string) => {
                setOperation((prevState) => {
                    const prevStateCopy = [...prevState, currentValue];
                    return prevStateCopy;
                });
            };

            if (isValueNaN) {
                const lastElementIsNaN = Number.isNaN(Number(lastElement));

                if (value === Delimiter["."]) {
                    if (!lastElementIsNaN) {
                        incrementLastElement(value);
                    }
                } else if (value in CommonOperations) {
                    //Last element is an expression
                    if (
                        !lastElementIsNaN ||
                        lastElement.startsWith("(")
                    ) {
                        //Has some especial operation in queue
                        if (
                            operation[lastIndex - 1] in SpecialOperations
                        ) {
                            const typedSpecialOperation =
                                operation[lastIndex - 1] as SpecialOperations;
                            handleSpecialOperation(
                                typedSpecialOperation,
                                currentOperation,
                                { next: value as CommonOperations }
                            );
                        } else {
                            incrementOperation(value);
                        }
                    }
                }
            } else {
                if (lastElement in CommonOperations) {
                    incrementOperation(value);
                } else if (lastElement in SpecialOperations) {
                    if (!isValueNaN) {
                        incrementOperation(value);
                    }
                } else if (!Number.isNaN(Number(lastElement))) {
                    incrementLastElement(value);
                }
            }
        }
    };

    const handleSpecialOperation = (
        value: keyof typeof SpecialOperations,
        currentOperation: typeof operation,
        queue?: {
            next: keyof typeof CommonOperations;
        }
    ): void => {
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
            setOperation([...operationCopy, typedNextOperation]);
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
                    setOperation(operationCopy);
                }
                break;
            case "sqrt":
                if (!!queue) {
                    const radicand = lastElement;
                    const sqrtExpression = `(${value}(${radicand}))`;
                    handleQueuedOperation(sqrtExpression, queue);
                } else if (lastElementIsNan) {
                    setOperation((prevState) => [...prevState, value]);
                }
                break;
            case "1/x":
                if (!!queue) {
                    const divisor = lastElement;
                    const fractionExpression = `(1/${divisor})`;
                    handleQueuedOperation(fractionExpression, queue);
                } else if (lastElementIsNan) {
                    setOperation((prevState) => [...prevState, value]);
                }
                break;
        }
    };

    const handleClear = (clearType : "CE"|"C"|"<", currentOperation: typeof operation)=>{
        if(!currentOperation.length){
            return null
        }

        const lastIndex = currentOperation.length -1;
        const lastElement = currentOperation[lastIndex]

        switch (clearType) {
            case "CE":
                setOperation(()=>{
                    const currentOperationCopy = [...currentOperation]
                    currentOperation.pop()

                    return currentOperationCopy
                    })
                break;
            case "C":
                setOperation(()=>{
                    return []
                    })
                break;
            case "<":
                if(Number.isNaN(Number(lastElement))){
                    return null
                }
                setOperation(()=>{
                    const currentOperationCopy = [...currentOperation]
                    if(lastElement.length > 1){
                        const newLastElement = lastElement.slice(0,lastElement.length -1)
                        currentOperation.pop()
                        currentOperation.push(newLastElement)

                    }else{
                        currentOperation.pop()
                    }
                    return currentOperationCopy
                    })
                break;
            default:
                break;
        }
    }

    return {
        operation,
        getOperation,
        handleCommonOperation,
        handleSpecialOperation,
        handleClear
    }

}
