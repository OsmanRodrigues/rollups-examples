// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import React from "react";
import { Label, Paragraph } from "../../../atomic/typography.mol";
import { string } from "../constants";
import { BrandBannerHero } from "./brand-banner.style";

const brandString = string.brandBanner;

export const BrandBanner: React.FC<{}> = () => {
    return (
        <>
            <BrandBannerHero>
                <Label paddingX="sm" justify="start" isBold>
                    {brandString.heroPart1}
                </Label>
                <Label paddingX="sm" justify="start" isBold>
                    {brandString.heroPart2}
                </Label>
            </BrandBannerHero>
            <Paragraph color="gray">{brandString.description}</Paragraph>
        </>
    );
};
