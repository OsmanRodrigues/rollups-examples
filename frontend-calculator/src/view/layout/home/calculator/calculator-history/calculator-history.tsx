import { FC } from "react";
import { Col, Row } from "react-grid-system";
import { Label } from "../../../../atomic/typography.mol";
import { ResolvedOperation } from "./calculator-history.context";

interface ICalculatorHistory {
    history: ResolvedOperation[];
}

export const CalculatorHistory: FC<ICalculatorHistory> = ({history}) => (
    <>
        {history.map((resolvedOperation) => (
            <Row key={`resolvedOperation_${resolvedOperation.id}`} justify="end">
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

