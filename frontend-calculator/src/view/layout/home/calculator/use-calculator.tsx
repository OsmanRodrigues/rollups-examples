import React, { useState } from "react";

//Custom Hook
/**
 * Use cases : Numeral Operador Numeral
 *             Numeral Operador
 *             Numeral Operador Numeral Operador
 */

export const useCalculator = () =>{

    const [operation, setOperation] = useState<string[]>([])

    const getOperation = (currentOperation: typeof operation) =>
    //TODO - Polish array treatment when operation is empty
    currentOperation.reduce((total,current)=> total + current)

    const handleCommonOperation = (value: string,currentOperation: typeof operation) =>{
        if(!currentOperation.length){
            setOperation([value])
        }else{
            const lastElement = currentOperation[currentOperation.length - 1]
            switch (lastElement) {
                case "+"||"-"||"/"||"*":
                    if(Number(value)){
                        setOperation((prevState)=>{
                            const prevStateCopy = [...prevState, value]
                            return prevStateCopy
                        })
                    }//TO-DO
                    break;

                default:
                    break;
            }
        }


    }
    return {
        operation,
        getOperation,
        handleCommonOperation
    }
}
