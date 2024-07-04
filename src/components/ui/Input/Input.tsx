import {
  Input as NextInput,
  type InputProps as NextInputProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface InputProps {
  type?: NextInputProps["type"];
  placeholder?: NextInputProps["placeholder"];
  variant?: NextInputProps["variant"];
  defaultValue?: NextInputProps["value"];
  /**
   * @default false
   */
  isInvalid?: NextInputProps["isInvalid"];
  max?: NextInputProps["max"];
  errorMessage?: NextInputProps["errorMessage"];
  label?: NextInputProps["label"];
}

export const Input: FC<InputProps> = ({ isInvalid = false, ...rest }) => {
  return <NextInput isInvalid={isInvalid} {...rest} />;
};
