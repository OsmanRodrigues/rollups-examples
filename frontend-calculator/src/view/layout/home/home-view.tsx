import { FC } from "react";
import { fetchNotices } from "../../../controller/notices.controller";
import { SendInputData, sendInput } from "../../../controller/send.controller";
import { useService } from "../../../controller/use-service/use-service.hook";
import { NoticeViewModel } from "../../../service/notices.service";
import { SendInputViewModel } from "../../../service/send.service";
import { SharedLayout } from "../shared/shared-layout";
import { Col, Row } from "react-grid-system";
import { toast } from "react-toast";
import { string } from "./constants";
import { resetServiceState } from "../../../controller/common.controller";
import { useOnboardedService } from "../../../controller/use-service/use-onboarded-service";
import { FeedbackBoard } from "./feedback.board";
import {Calculator} from "./calculator/calculator";
import { BrandBanner } from "./brand-banner/brand-banner";
import { InteractiveBoardWrapper } from "./home.style";
import { useCalculatorHistory } from "./calculator/calculator-history/calculator-history.context";
import { OnboardTourProvider } from "./onboard-tour/onboard-tour.context";

export const HomeView: FC = () => {
    const [noticesState, noticesDispatch] = useService<NoticeViewModel[]>();
    const [sendInputState, sendInputDispatch] =
        useOnboardedService<SendInputViewModel>();
    const [_, setHistory] = useCalculatorHistory();

    const handleSendInput = (data: SendInputData) => {
        if (sendInputState.chain) {
            toast.info(string.sendInputFeedback.requestStarted);
            sendInput(
                sendInputDispatch,
                data,
                sendInputState.chain?.id,
                sendInputState.wallet.provider
            )
                .then((sendInputResult) =>
                    fetchNotices(
                        noticesDispatch,
                        {
                            epoch_index: sendInputResult?.epochNumber ?? 0,
                            input_index: sendInputResult?.inputIndex ?? 0,
                        },
                        true
                    )
                        .then((fetchNoticesResult) => {
                            toast.success(string.fetchNoticesFeedback.onSucess)
                            setHistory({
                                id: Date.now(),
                                operation: data.Operation,
                                result: fetchNoticesResult.data?.[0].payload_parsed ?? ''
                            })
                        })
                        .catch(() =>
                            toast.error(string.fetchNoticesFeedback.onError)
                        )
                )
                .catch(() => toast.error(string.sendInputFeedback.onError));
        } else toast.error(
            string.sendInputFeedback.web3OnboardError
        );
    };
    const handleResetStates = () => {
        resetServiceState(noticesDispatch);
        resetServiceState(sendInputDispatch);
    };

    return (
        <OnboardTourProvider>
            <SharedLayout>
                <Row>
                    <Col md={3} lg={4}>
                        <BrandBanner />
                    </Col>
                    <Col md={9} lg={8}>
                        <InteractiveBoardWrapper>
                            <Calculator
                                handleSendInput={handleSendInput}
                                onClear={handleResetStates}
                            />
                            <FeedbackBoard
                                data={noticesState.data ?? []}
                                status={
                                    sendInputState.status === "pending"
                                        ? "pending"
                                        : noticesState.status
                                }
                            />
                        </InteractiveBoardWrapper>
                    </Col>
                </Row>
            </SharedLayout>
        </OnboardTourProvider>
    );
}
