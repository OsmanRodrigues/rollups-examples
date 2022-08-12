import { FC } from "react";
import { color } from "../styleguide.atm";
import { Paragraph } from "../typography.mol";
import { ImageLayout, ImageWrapper } from "./img.atm";

interface IImage extends
    React.ImgHTMLAttributes<HTMLImageElement>,
    ImageLayout
{
    description?: string,
    options?: {
        textColor: keyof typeof color;
    }
}

export const Image: FC<IImage> = ({
    justify,
    size,
    description,
    options,
    ...other
}) => {
    return (
        <ImageWrapper justify={justify} size={size}>
            <img {...other} />
            {description ? (
                <Paragraph justify="justify" color={options?.textColor}>
                    {description}
                </Paragraph>
            ) : null}
        </ImageWrapper>
    );
};
