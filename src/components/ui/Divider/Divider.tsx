import {
  Divider as NextDivider,
  type DividerProps as NextDividerProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface DividerProps {
  className?: NextDividerProps["className"];
}

export const Divider: FC<DividerProps> = (props) => {
  return <NextDivider {...props} />;
};
