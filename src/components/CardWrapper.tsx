import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

interface CardWrapperProps {
  body?: ReactNode;
  headerIcon: IconType;
  headerText: string;
  subHeaderText?: string;
  action?: () => void;
  actionLabel?: string;
  footer?: ReactNode;
}

export const CardWrapper: FC<CardWrapperProps> = ({
  body,
  headerIcon: Icon,
  headerText,
  subHeaderText,
  action,
  actionLabel,
  footer,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-2/5 mx-auto p-5">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
            <div className="flex flex-row items-center gap-3">
              <Icon size={30} />
              <h1 className="text-3xl font-semibold">{headerText}</h1>
            </div>
            {subHeaderText && (
              <p className="text-neutral-500 whitespace-nowrap">
                {subHeaderText}
              </p>
            )}
          </div>
        </CardHeader>
        {body && <CardBody>{body}</CardBody>}
        <CardFooter>
          {action && (
            <Button
              fullWidth
              color="secondary"
              variant="bordered"
              onClick={action}
            >
              {actionLabel}
            </Button>
          )}
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
};
