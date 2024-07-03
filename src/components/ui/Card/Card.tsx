import {
  Card as NextCard,
  type CardProps as NextCardProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface CardProps {
  className?: NextCardProps["className"];
  as?: NextCardProps["as"];
  href?: string; // href doesn't exist in NextCardProps
  /**
   * @default false
   **/
  fullWidth?: NextCardProps["fullWidth"];
  /**
   * @default false
   **/
  isPressable?: NextCardProps["isPressable"];
  children: NextCardProps["children"];
}

export const Card: FC<CardProps> = ({
  fullWidth = false,
  isPressable = false,
  children,
  ...rest
}) => {
  return (
    <NextCard fullWidth={fullWidth} isPressable={isPressable} {...rest}>
      {children}
    </NextCard>
  );
};
