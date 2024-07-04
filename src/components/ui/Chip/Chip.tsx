import {
  Chip as NextChip,
  type ChipProps as NextChipProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface ChipProps {
  children?: NextChipProps["children"];
  color?: NextChipProps["color"];
  size?: NextChipProps["size"];
  radius?: NextChipProps["radius"];
}

export const Chip: FC<ChipProps> = ({ children, ...rest }) => {
  return <NextChip {...rest}>{children}</NextChip>;
};
