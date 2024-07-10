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
  /**
   * Do not render card body which creates padding in all axis
   * @default false
   **/
  noPadding?: boolean;
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
  noPadding = false,
  ...rest
}) => {
  const body = noPadding ? (
    <div>{children}</div>
  ) : (
    <CardBody>{children}</CardBody>
  );

  return (
    <NextCard fullWidth={fullWidth} isPressable={isPressable} {...rest}>
      {header && <CardHeader>{header}</CardHeader>}
      {body}
      {footer && <CardFooter>{footer}</CardFooter>}
    </NextCard>
  );
};
