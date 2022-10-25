// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC } from "react";
import { Col, Row } from "react-grid-system";
import { Label } from "../../../../atomic/typography.mol";
import { ResolvedOperation } from "./calculator-history.context";

interface ICalculatorHistory {
    history: ResolvedOperation[];
}

export const CalculatorHistory: FC<ICalculatorHistory> = ({ history }) => (
    <>
        {history.map((resolvedOperation) => (
            <Row
                key={`resolvedOperation_${resolvedOperation.id}`}
                justify="end"
            >
                <Col xs={12}>
                    <Label justify="end" color="displayMain" isBlock>
                        {`${resolvedOperation.operation} =`}
                    </Label>
                </Col>
                <Col xs={12}>
                    <Label
                        justify="end"
                        color="displayResult"
                        size="lg"
                        isBlock
                        isBold
                        noPadding
                    >
                        {resolvedOperation.result}
                    </Label>
                </Col>
            </Row>
        ))}
    </>
);
