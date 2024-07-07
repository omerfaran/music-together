import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextCard,
  type CardProps as NextCardProps,
} from "@nextui-org/react";
import { ReactNode, type FC } from "react";

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
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
  header,
  footer,
  fullWidth = false,
  isPressable = false,
  children,
  ...rest
}) => {
  return (
    <NextCard fullWidth={fullWidth} isPressable={isPressable} {...rest}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </NextCard>
  );
};
