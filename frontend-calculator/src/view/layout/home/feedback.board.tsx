import { FC } from "react";
import { Col, Row } from "react-grid-system";
import { NoticeViewModel } from "../../../service/notices.service";
import { BoxWrapper } from "../../atomic/layout.org/layout.mol";
import { H1, H4 } from "../../atomic/typography.mol";
import { string } from "./constants";
import { UseServiceState } from "../../../controller/use-service/use-service.hook";
import { CalculatorHistory } from "./calculator/calculator-history/calculator-history";
import { useCalculatorHistory } from "./calculator/calculator-history/calculator-history.context";
import { onboardTourCSSClass } from "./onboard-tour/onboard-tour.style";

interface IFeedbackBoard {
    data: NoticeViewModel[],
    status: UseServiceState<any>['status']
}

const boardString = string.resultPreview;

export const FeedbackBoard: FC<IFeedbackBoard> = ({
    data,
    status
}) => {
    const [history] = useCalculatorHistory();
    const handleResult = (
        currentData: typeof data,
        currentStatus: typeof status
    ) => {

        if (
            currentStatus !== 'resolved' &&
            !data?.length
        ) return { message: null };

        const notice = currentData[0];

        //TODO: adjust message
        const message = `Your result is: ${notice.payload_parsed}!`;

        return { message };
    };
    const { message } = handleResult(data, status);
    const shouldShowResultPreview = status === "pending" || status === "resolved";
    const shouldShowHistory = !shouldShowResultPreview && history.length;

    return (
        <Col xs={12} md={5}>
            <BoxWrapper
                className={onboardTourCSSClass["onboard-tour-element-4"]}
                isFluid
                shouldMaxSize
            >
                <Row justify="end">
                    <Col xs="content">
                        <H4 color="lightMain">
                            {shouldShowHistory
                                ? boardString.titleWithHistory
                                : boardString.title}
                        </H4>
                    </Col>
                </Row>
                {status === "pending" ? (
                    <Row justify="center">
                        <Col xs="content">
                            <H1 color="sweetMain" justify="center">
                                {boardString.pendingFeedback}
                            </H1>
                        </Col>
                    </Row>
                ) : (
                    <>
                        <Row justify="center">
                            <Col xs={shouldShowHistory ? 12 : "content"}>
                                {status === "idle" || status === "rejected" ? (
                                    shouldShowHistory ? (
                                        <CalculatorHistory history={history} />
                                    ) : (
                                        <H1 color="sweetMain" justify="center">
                                            {boardString.idleFeedback}
                                        </H1>
                                    )
                                ) : null}
                                {message ? (
                                    <H1
                                        color="sweetMain"
                                        justify="center"
                                        isBold
                                    >
                                        {message}
                                    </H1>
                                ) : null}
                            </Col>
                        </Row>
                    </>
                )}
            </BoxWrapper>
        </Col>
    );
};
