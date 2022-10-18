// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, PropsWithChildren, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import { H1 } from "../../typography.mol";
import { Separator } from "../separator.mol/separator.atm";
import { ModalCloseButton, ModalContent, ModalWrapper } from "./modal.style";

export interface IModal {
    isOpen: boolean;
    title: string;
    labelledBy?: string;
    onOpen?: () => void;
    onClose?: () => void;
}

export const Modal: FC<PropsWithChildren<IModal>> = ({
    children,
    isOpen,
    title,
    labelledBy,
    onClose,
    onOpen,
}) => {
    useEffect(() => {
        if (onOpen) onOpen();
    }, []);

    return (
        <ModalWrapper isOpen={isOpen} onDismiss={onClose}>
            <ModalContent aria-labelledby={labelledBy}>
                <ModalCloseButton
                    onClick={() => {
                        onClose?.();
                    }}
                />
                <Row justify="center">
                    <Col xs="content">
                        <H1 id={labelledBy} color="dark">
                            {title}
                        </H1>
                    </Col>
                </Row>
                <Separator large />
                {children}
            </ModalContent>
        </ModalWrapper>
    );
};
