import styled from "styled-components";
import { border, color, linearGradient, radius } from "../../../atomic/styleguide.atm";
import bannerHeroBg from "../../../../assets/banner-hero-bg.svg";

export const BrandBannerHero = styled.div`
    height: 100px;
    background: ${linearGradient.homeBrandBannerHero};
    border-radius: ${radius.lg};
    border: ${border.small} ${color.mediumMain};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    background-image: url(${bannerHeroBg});
    background-repeat: no-repeat;

    label {
        font-size: 1.5rem;
        min-width: 50%;
    }
`;
