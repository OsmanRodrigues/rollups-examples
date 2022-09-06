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
import { NoticeViewModel } from "../../../service/notices.service";
import { BoxWrapper } from "../../atomic/layout.org/layout.mol";
import { H1, H4 } from "../../atomic/typography.mol";
import { string } from "./constants";
import SkullImgSVG from "../../../assets/img/skull.svg";
import CelebrationImgSVG from "../../../assets/img/celebration.svg";
import { UseServiceState } from "../../../controller/use-service/use-service.hook";
import { Image } from "../../atomic/image.mol/image.mol";
import { ShipCrashAnimation } from "./ship-crash/ship-crash.animation";

interface IFeedbackBoard {
    data: NoticeViewModel[];
    status: UseServiceState<any>["status"];
}

const boardString = string.resultPreview;

export const FeedbackBoard: FC<IFeedbackBoard> = ({ data, status }) => {
    const handleResult = (
        currentData: typeof data,
        currentStatus: typeof status
    ) => {
        if (currentStatus !== "resolved" && !data?.length)
            return { img: null, message: null };

        const notice = currentData[0];
        const isSurvived = notice.payload_parsed === "1";
        const message = isSurvived
            ? boardString.survivedFeeback
            : boardString.sankFeedback;
        const img = isSurvived ? CelebrationImgSVG : SkullImgSVG;

        return { message, img };
    };
    const { img, message } = handleResult(data, status);

    return (
        <BoxWrapper sm={12} md={6} isFluid>
            <Row justify="end">
                <Col xs="content">
                    <H4 color="lightMain">{boardString.title}</H4>
                </Col>
            </Row>
            <Row justify="center" style={{ height: "100%" }}>
                <Col xs={status === "pending" ? 12 : "content"}>
                    {status === "pending" ? <ShipCrashAnimation /> : null}
                    {status === "idle" || status === "rejected" ? (
                        <H1 color="sweetMain" justify="center">
                            {boardString.idleFeedback}
                        </H1>
                    ) : null}
                    {img ? (
                        <Image src={img} justify="center" size="lg" />
                    ) : null}
                    {message ? (
                        <H1 color="sweetMain" justify="center" isBold>
                            {message}
                        </H1>
                    ) : null}
                </Col>
            </Row>
        </BoxWrapper>
    );
};
