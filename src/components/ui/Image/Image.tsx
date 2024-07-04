import {
  Image as NextImage,
  type ImageProps as NextImageProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface ImageProps {
  /**
   * @default false
   */
  isZoomed?: NextImageProps["isZoomed"];
  height?: NextImageProps["height"];
  width?: NextImageProps["width"];
  src?: NextImageProps["src"];
  alt?: NextImageProps["alt"];
  className?: NextImageProps["className"];
}

export const Image: FC<ImageProps> = ({ isZoomed = false, ...rest }) => {
  return <NextImage isZoomed={isZoomed} {...rest} />;
};
