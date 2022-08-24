import { Row } from "react-grid-system";
import styled from "styled-components";
import { border, color, linearGradient, radius, spacing } from "../../atomic/styleguide.atm";

export const InteractiveBoardWrapper = styled(Row)`
    padding: ${spacing.padding.md};
    border: ${border.small} ${color.mediumMain};
    border-radius: ${radius.lg};
    background: ${linearGradient.homeInteractiveWrapper};
`;
