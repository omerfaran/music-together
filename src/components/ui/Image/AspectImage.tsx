/**
 * TODO - This is probably temporary, next ui org seems to not be able to render a defined aspect image, so using default
 * next/image here instead. If possible delete this component
 */

import NextImage from "next/image";
import { type FC } from "react";

interface AspectImageProps {
  src: string;
  alt: string;
  height: number;
  width?: number;
}

export const AspectImage: FC<AspectImageProps> = ({
  src,
  alt,
  height,
  width,
}) => {
  return (
    <div className="relative" style={{ minHeight: height, width }}>
      <NextImage fill src={src} alt={alt} />;
    </div>
  );
};
