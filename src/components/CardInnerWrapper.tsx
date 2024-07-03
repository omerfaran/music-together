import { FC, ReactNode } from "react";
import { Divider } from "@nextui-org/react";
import { CardBody, CardFooter, CardHeader } from "./ui";

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
