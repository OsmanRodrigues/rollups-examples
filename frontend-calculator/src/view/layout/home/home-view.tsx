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
import { SendInputForm } from "./send-input.form";
import { FeedbackBoard } from "./feedback.board";
import {Calculator} from "./calculator/calculator";
import { Description } from "./description/description";
import { Separator } from "../../atomic/layout.org/separator.mol/separator.atm";
import { InteractiveBoardWrapper } from "./home.style";

export const HomeView: FC = () => {
    const [noticesState, noticesDispatch] = useService<NoticeViewModel[]>();
    const [sendInputState, sendInputDispatch] =
        useOnboardedService<SendInputViewModel>();
    const handleSendInput = (data: SendInputData) => {
        if (sendInputState.chain) {
            toast.info(string.sendInputFeedback.requestStarted);
            sendInput(
                sendInputDispatch,
                data,
                sendInputState.chain?.id,
                sendInputState.wallet.provider
            )
                .then((result) =>
                    fetchNotices(
                        noticesDispatch,
                        {
                            epoch_index: result?.epochNumber,
                            input_index: result?.inputIndex,
                        },
                        true
                    )
                        .then(() =>
                            toast.success(string.fetchNoticesFeedback.onSucess)
                        )
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
        <SharedLayout>
            <Row>
                <Col md={4}>
                    <Description />
                </Col>
                <Col md={8}>
                    <InteractiveBoardWrapper>
                        <Calculator />
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
    );
}
