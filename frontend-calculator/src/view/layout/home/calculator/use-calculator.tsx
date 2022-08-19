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

enum SpecialOperations{
    "1/x" = "1/x",
    "√"  = "√",
    "%"  = "%"
}

enum Delimiter {
    "." = ".",
}

export const useCalculator = () =>{

    const [operation, setOperation] = useState<string[]>([])

    //TODO - Polish array treatment when operation is empty
    const getOperation = (currentOperation: typeof operation) =>
        currentOperation.reduce((total,current)=> total + current)

    const handleCommonOperation = (
        value:
            | keyof typeof CommonOperations
            | keyof typeof Delimiter
            | keyof typeof Numeral,
        currentOperation: typeof operation
    ) => {
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

            if (Number.isNaN(Number(value))) {
                const lastElementIsNaN = Number.isNaN(Number(lastElement));

                if (value === Delimiter["."]) {
                    if (!lastElementIsNaN) {
                        incrementLastElement(value);
                    }
                } else if (Object.keys(CommonOperations).includes(value)) {
                    if (!lastElementIsNaN)
                        setOperation((prevState) => {
                            const prevStateCopy = [...prevState, value];
                            return prevStateCopy;
                        });
                }
            } else {
                if (Object.keys(CommonOperations).includes(lastElement)) {
                    setOperation((prevState) => {
                        const prevStateCopy = [...prevState, value];
                        return prevStateCopy;
                    });
                } else if (!Number.isNaN(Number(lastElement))) {
                    incrementLastElement(value);
                }
            }
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
        handleClear
    }

}
