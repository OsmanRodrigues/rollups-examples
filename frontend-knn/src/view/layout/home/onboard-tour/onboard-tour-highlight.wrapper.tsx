import { FC, PropsWithChildren } from "react";
import { Row, Col } from "react-grid-system";
import { onboardTourCSSClass } from "./onboard-tour.style";

interface IOnboardHighlightWrapper {
    className: keyof typeof onboardTourCSSClass;
}

export const OnboardTourHighlightWrapper: FC<
    PropsWithChildren<IOnboardHighlightWrapper>
> = ({ children, className }) => {
    return (
        <Row className={className}>
            <Col>{children}</Col>
        </Row>
    );
};
