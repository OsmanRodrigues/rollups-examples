import { useEffect, useState } from "react";

export const useCalculatorDisplay = (
    operation: string[],
    getOperation: (currentOperation: typeof operation)=> string
) => {
    const [inputtedOperation, setInputtedOperation] = useState("");

    const getInputtingOperation = (
        currentOperation: typeof operation
    ): string => {
        if (currentOperation.length <= 3) return getOperation(currentOperation);
        return getOperation(currentOperation.slice(-3));
    };

    useEffect(() => {
        if (operation.length >= 4) {
            const operationStr = getOperation(operation);
            setInputtedOperation(operationStr);
        } else {
            if (!!inputtedOperation) setInputtedOperation("");
        }
    }, [operation]);

    return {
        inputtedOperation,
        getInputtingOperation
    }
}
