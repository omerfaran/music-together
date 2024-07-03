import {
  CardBody as NextCard,
  type CardProps as NextCardProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface CardBodyProps {
  className?: NextCardProps["className"];
  children: NextCardProps["children"];
}

export const CardBody: FC<CardBodyProps> = ({ children, ...rest }) => {
  return <NextCard {...rest}>{children}</NextCard>;
};
