import {
  Switch as NextSwitch,
  type SwitchProps as NextSwitchProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface SwitchProps {
  color?: NextSwitchProps["color"];
  size?: NextSwitchProps["size"];
  defaultSelected?: NextSwitchProps["defaultSelected"];
  onChange?: NextSwitchProps["onChange"];
}

export const Switch: FC<SwitchProps> = (props) => {
  return <NextSwitch {...props} />;
};
