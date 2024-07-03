import {
  CardFooter as NextCard,
  type CardProps as NextCardProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface CardFooterProps {
  className?: NextCardProps["className"];
  children: NextCardProps["children"];
}

export const CardFooter: FC<CardFooterProps> = ({ children, ...rest }) => {
  return <NextCard {...rest}>{children}</NextCard>;
};
