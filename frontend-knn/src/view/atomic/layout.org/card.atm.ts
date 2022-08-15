import styled from "styled-components";
import { color, radius, spacing } from "../styleguide.atm";

export const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${color.white};
    border-color: ${color.white};
    border-radius: ${radius.lg};
    padding: ${spacing.padding.md};

    a {
        color: ${color.lightMain};
        text-decoration: underline;
    }
`;
