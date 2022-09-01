import { useEffect, useState } from "react";
import { CommonOperations, Delimiter, SpecialOperations } from "./use-calculator";

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
    const hasExceededExpressionMaxLength = (
        currentOperation: typeof operation
    ): boolean =>
        !!currentOperation.length &&
        currentOperation
            .filter(item => !Number.isNaN(Number(item)))
            .length > 10;
    const checkDigitLength = (
        currentOperation: typeof operation
    ): string | undefined => {
        const lastItem = currentOperation[currentOperation.length - 1];

        if (Number.isNaN(Number(lastItem))) return undefined;
        else if (lastItem.includes(Delimiter["."])) {
            const [, decimal] = lastItem.split(Delimiter["."]);

            if (decimal.length > 10)
                return "Limit of 10 digits after decimal point exceeded.";
        }

        return lastItem.length > 15
            ? "Total limit of 15 digits exceeded."
            : undefined;
    };

    return {
        checkDigitLength,
        getInputtedOperation,
        getInputtingOperation,
        hasExceededExpressionMaxLength,
        hasMalformedExpression,
    };
}
