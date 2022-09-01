import { FC } from "react";
import { ImageLayout, ImageWrapper } from "./image.atm";

interface IImage extends
    React.ImgHTMLAttributes<HTMLImageElement>,
    ImageLayout
{ }

export const Image: FC<IImage> = ({
    justify,
    size,
    ...other
}) => {
    return (
        <ImageWrapper justify={justify} size={size}>
            <img {...other} />
        </ImageWrapper>
    );
};