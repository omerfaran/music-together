import {
  Spinner as NextSpinner,
  type SpinnerProps as NextSpinnerProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface SliderProps {
  label?: NextSpinnerProps["label"];
  color?: NextSpinnerProps["color"];
  labelColor?: NextSpinnerProps["labelColor"];
  size?: NextSpinnerProps["size"];
  className?: NextSpinnerProps["className"];
}

export const Spinner: FC<SliderProps> = (props) => {
  return <NextSpinner {...props} />;
};
