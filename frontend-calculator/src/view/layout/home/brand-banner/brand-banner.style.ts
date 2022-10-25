// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import styled from "styled-components";
import {
    border,
    color,
    linearGradient,
    radius,
} from "../../../atomic/styleguide.atm";
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
