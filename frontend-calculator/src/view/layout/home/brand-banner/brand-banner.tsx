import React from "react";
import { Label, Paragraph } from "../../../atomic/typography.mol";
import {
    BrandBannerHero,
} from "./brand-banner.style";

export const BrandBanner: React.FC<{}> = () =>{
    return (
        <>
            <BrandBannerHero>
                <Label paddingX="sm" justify="start" isBold>
                    Web3
                </Label>
                <Label paddingX="sm" justify="start" isBold>
                    Calculator
                </Label>
            </BrandBannerHero>
            <Paragraph color="gray">
                Mount your math expression and calculate it in the blockchain.
            </Paragraph>
        </>
    );
};
