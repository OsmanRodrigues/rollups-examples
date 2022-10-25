// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import {
    CommonOperations,
    Delimiter,
    SpecialOperations,
} from "./use-calculator";

export const useCalculatorDisplay = (
    operation: string[],
    getOperation: (currentOperation: typeof operation) => string
) => {
    const getInputtedOperation = (
        currentOperation: typeof operation
    ): string => {
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
        currentOperation.filter((item) => !Number.isNaN(Number(item))).length >
            10;
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
};
