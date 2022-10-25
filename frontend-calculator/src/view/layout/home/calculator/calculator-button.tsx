// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, HTMLProps, PropsWithChildren } from "react";
import {
    CalculatorButtonWrapper,
    getCalculatorButtonStyles,
} from "./calculator.style";

export enum ButtonType {
    Operation,
    Number,
    Misc,
    BasicOperation,
    Equals,
}

type Props = HTMLProps<HTMLButtonElement> & {
    buttonType?: ButtonType;
    background?: string;
    color?: string;
    fontsize?: number;
};

export const CalculatorButton: FC<PropsWithChildren<Props>> = ({
    buttonType = ButtonType.Number,
    onClick,
    disabled,
    className,
    children,
}) => (
    <CalculatorButtonWrapper
        disabled={disabled}
        className={className}
        style={getCalculatorButtonStyles(buttonType)}
        onClick={onClick}
    >
        {children}
    </CalculatorButtonWrapper>
);
