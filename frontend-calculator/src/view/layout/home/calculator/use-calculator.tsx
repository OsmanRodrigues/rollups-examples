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

enum CommonOperations{
    "+" = "+",
    "-" = "-",
    "/" = "/",
    "*" = "*",
    "^" = "^"
}
enum Delimiter{
    "." = "."
}

enum SpecialOperations{
"1/x" = "1/x",
"x²" = "x²",
"√"  = "√",
"%"  = "%"
}

export const useCalculator = () =>{

    const [operation, setOperation] = useState<string[]>([])

    const getOperation = (currentOperation: typeof operation) =>
    //TODO - Polish array treatment when operation is empty
    currentOperation.reduce((total,current)=> total + current)


    const handleCommonOperation = (value: string,currentOperation: typeof operation) =>{
        if(!currentOperation.length){
            setOperation([value])
        }else{
            const lastIndex = currentOperation.length -1;
            const lastElement = currentOperation[lastIndex]

            const incrementLastElement =(currentValue: string)=>{
                setOperation((prevState)=>{
                    const concat = lastElement + currentValue
                    const prevStateCopy = [...prevState]
                    prevStateCopy[lastIndex] = concat;
                    return prevStateCopy
                })

            }


            if(Number.isNaN(Number(value))){
                const lastElementIsNaN = Number.isNaN(Number(lastElement))

                if(value === Delimiter["."]){
                    if(!lastElementIsNaN){
                        incrementLastElement(value)
                    }
               }else if(Object.keys(CommonOperations).includes(value)){
                    if(!lastElementIsNaN)
                        setOperation((prevState)=>{
                            const prevStateCopy = [...prevState, value]
                            return prevStateCopy
                            })
               }
            }else{
                if(Object.keys(CommonOperations).includes(lastElement)){
                    setOperation((prevState)=>{
                        const prevStateCopy = [...prevState, value]
                        return prevStateCopy
                        })
                }else if(!Number.isNaN(Number(lastElement))){
                    incrementLastElement(value)
                }
            }
        }


    }
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
