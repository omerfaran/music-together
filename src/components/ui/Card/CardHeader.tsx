import {
  CardHeader as NextCard,
  type CardProps as NextCardProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface CardHeaderProps {
  className?: NextCardProps["className"];
  children: NextCardProps["children"];
}

export const CardHeader: FC<CardHeaderProps> = ({ children, ...rest }) => {
  return <NextCard {...rest}>{children}</NextCard>;
};
