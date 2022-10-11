import React from "react";
import { Label, Paragraph } from "../../../atomic/typography.mol";
import { string } from "../constants";
import {
    BrandBannerHero,
} from "./brand-banner.style";

const brandString = string.brandBanner;

export const BrandBanner: React.FC<{}> = () =>{
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
            <Paragraph color="gray">
                {brandString.description}
            </Paragraph>
        </>
    );
};
