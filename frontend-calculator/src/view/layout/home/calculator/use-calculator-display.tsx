import { useEffect, useState } from "react";
import { CommonOperations, SpecialOperations } from "./use-calculator";

export const useCalculatorDisplay = (
    operation: string[],
    getOperation: (currentOperation: typeof operation)=> string
) => {
    const getInputtedOperation = (currentOperation: typeof operation): string => {
        if (currentOperation.length >= 4) {
            return getOperation(currentOperation);
        } else {
            return "";
        }
    };
    const getInputtingOperation = (
        currentOperation: typeof operation
    ): string => {
        if (currentOperation.length <= 3) return getOperation(currentOperation);
        return getOperation(currentOperation.slice(-3));
    };
    const hasMalformedExpression = (
        currentOperation: typeof operation
    ): boolean => {
        const lastItem = currentOperation[operation.length - 1];

        if (currentOperation.length === 1) return true;
        else if (
            lastItem in CommonOperations ||
            lastItem in SpecialOperations
        ) {
            return true;
        }

        return false;
    };

    return {
        getInputtedOperation,
        getInputtingOperation,
        hasMalformedExpression,
    };
}
