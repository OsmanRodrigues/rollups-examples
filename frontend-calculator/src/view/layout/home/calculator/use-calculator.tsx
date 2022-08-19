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

            if (Number.isNaN(Number(value))) {
                const lastElementIsNaN = Number.isNaN(Number(lastElement));

                if (value === Delimiter["."]) {
                    if (!lastElementIsNaN) {
                        incrementLastElement(value);
                    }
                } else if (Object.keys(CommonOperations).includes(value)) {
                    if (
                        !lastElementIsNaN ||
                        lastElement.startsWith("(")
                    )
                        incrementOperation(value);
                }
            } else {
                if (lastElement in CommonOperations) {
                    incrementOperation(value);
                } /*
                    //TODO verify the possibility of do the sqrt case on submit
                    else if (lastElement in SpecialOperations) {
                        const typedLastElement = lastElement as SpecialOperations;
                        handleSpecialOperation(typedLastElement, currentOperation, {
                            [typedLastElement]: value,
                        });
                    }
                */
                else if (!Number.isNaN(Number(lastElement))) {
                    incrementLastElement(value);
                }
            }
        }
    };

    const handleSpecialOperation = (
        value: keyof typeof SpecialOperations,
        currentOperation: typeof operation,
        queue?: {
            [key in SpecialOperations]: string
        }
    ): void => {
        const lastIndex = currentOperation.length - 1;
        const lastElement = currentOperation[lastIndex];
        const setExpression = (expression: string, lastPosition: number) => {
            const operationCopy = currentOperation.slice(0, lastPosition);
            operationCopy.push(expression);
            setOperation(operationCopy);
        }

        switch (value) {
            case "%":
                if (currentOperation.length < 3) break;
                else {
                    const percentageExpressionElements = currentOperation.slice(
                        currentOperation.length - 3,
                        currentOperation.length
                    );

                    for (const [index, element] of percentageExpressionElements.entries()) {
                        if (
                            (index === 0 || index === 2) &&
                            Number.isNaN(Number(element))
                        )
                            break;
                        else if (index === 1 && element !== CommonOperations["*"])
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
                    const radicand = queue[value];
                    const sqrtExpression = `(${value}(${radicand}))`;

                    setExpression(sqrtExpression, currentOperation.length - 2);
                }
                else if (Number.isNaN(Number(lastElement))) {
                    setOperation(prevState => [...prevState, value]);
                }
                else break;

                break;
            case "1/x":
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
