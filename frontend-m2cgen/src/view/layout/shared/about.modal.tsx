import { FC } from "react";
import { Col, Row } from "react-grid-system";
import { Button } from "../../atomic/button.mol/button.mol";
import { IModal, Modal } from "../../atomic/layout.org/modal.mol/modal.mol";
import { Separator } from "../../atomic/layout.org/separator.mol/separator.atm";
import { H2, H4, Paragraph } from "../../atomic/typography.mol";
import { string } from "./constants";

const modalString = string.aboutModal;

type AboutModal = Pick<IModal, 'isOpen' | 'onClose'>;

export const AboutModal: FC<AboutModal> = ({ isOpen, onClose }) => (
    <Modal
        isOpen={isOpen}
        title={modalString.title}
        onClose={onClose}
        labelledBy={modalString.aria.labelledById}
    >
        <Row>
            <Col>
                <H2 color="dark">{modalString.textTitle}</H2>
                <Paragraph color="dark" justify>
                    {modalString.textContent1}
                </Paragraph>
                <Paragraph color="dark" justify>
                    {modalString.textContent2}
                </Paragraph>
            </Col>
        </Row>
        <Separator />
        <Row justify="center">
            <Col xs="content">
                <Button variant="secondary" onClick={onClose}>
                    {modalString.CTAButton.text}
                </Button>
            </Col>
        </Row>
    </Modal>
);
