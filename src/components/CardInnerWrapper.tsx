import React, { FC, ReactNode } from "react";
import { CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react";

interface CardInnerWrapperProps {
  header: ReactNode | string; // doesn't look great, react node can also be a string...
  body: ReactNode;
  footer?: ReactNode;
}

export const CardInnerWrapper: FC<CardInnerWrapperProps> = ({
  header,
  body,
  footer,
}) => {
  return (
    <>
      <CardHeader>
        {typeof header === "string" ? (
          <div className="text-2xl font-semibold text-secondary">{header}</div>
        ) : (
          <>{header}</>
        )}
      </CardHeader>
      <Divider />
      <CardBody>{body}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </>
  );
};

export default CardInnerWrapper;
