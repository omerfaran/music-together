import {
  Card as NextCard,
  type CardProps as NextCardProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface CardProps {
  className?: NextCardProps["className"];
  children: NextCardProps["children"];
}

export const Card: FC<CardProps> = ({ children, ...rest }) => {
  return <NextCard {...rest}>{children}</NextCard>;
};
