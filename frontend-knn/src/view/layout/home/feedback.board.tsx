import { FC } from "react";
import { Col, Row } from "react-grid-system";
import { NoticeViewModel } from "../../../service/notices.service";
import { BoxWrapper } from "../../atomic/layout.org/layout.mol";
import { H1, H4 } from "../../atomic/typography.mol";
import { string } from "./constants";
import { UseServiceState } from "../../../controller/use-service/use-service.hook";
import { IrisResultCard } from "./iris-result.card/iris-result.card";
import { IrisType } from "./iris-result.card/constants";
import { SendInputData } from "../../../controller/send.controller";
import { PengindLoadingState } from "./pending.loading-state";

interface IFeedbackBoard {
    data: NoticeViewModel[];
    inputData: SendInputData | null;
    status: UseServiceState<any>['status'];
}

const boardString = string.resultPreview;

export const FeedbackBoard: FC<IFeedbackBoard> = ({
    data,
    inputData,
    status
}) => {
    const handleResult = (
        currentData: typeof data,
        currentStatus: typeof status
    ) => {

        if (
            currentStatus !== 'resolved' &&
            !data?.length
        ) return { irisType: null };

        const notice = currentData[0];
        const irisType = notice.payload_parsed.toLowerCase();

        return { irisType };
    };
    const { irisType } = handleResult(data, status);

    return (
        <Col sm={12} md={6}>
            <BoxWrapper isFluid>
                <Row justify="end">
                    <Col xs="content">
                        <H4 color="lightMain">{boardString.title}</H4>
                    </Col>
                </Row>
                {status === "pending" ? (
                    <Row justify="center">
                        <Col xs="content">
                            <H1 color="sweetMain" justify="center">
                                {boardString.pendingFeedback}
                            </H1>
                            <PengindLoadingState />
                        </Col>
                    </Row>
                ) : (
                    <Row justify="center">
                        <Col xs="content">
                            {status === "idle" || status === "rejected" ? (
                                <H1 color="sweetMain" justify="center">
                                    {boardString.idleFeedback}
                                </H1>
                            ) : null}
                            {irisType && inputData ? (
                                <IrisResultCard
                                    irisType={IrisType.Setosa}
                                    inputData={inputData}
                                />
                            ) : null}
                        </Col>
                    </Row>
                )}
            </BoxWrapper>
        </Col>
    );
};
