import {
  Textarea as NextTextarea,
  type TextAreaProps as NextTextAreaProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface TextAreaProps {
  /**
   * @default false
   */
  isInvalid: NextTextAreaProps["isInvalid"];
  color?: NextTextAreaProps["color"];
  size?: NextTextAreaProps["size"];
  defaultValue?: NextTextAreaProps["defaultValue"];
  errorMessage?: NextTextAreaProps["errorMessage"];
  label?: NextTextAreaProps["label"];
  variant?: NextTextAreaProps["variant"];
  minRows?: NextTextAreaProps["minRows"];
  placeholder?: NextTextAreaProps["placeholder"];
}

export const Textarea: FC<TextAreaProps> = ({ isInvalid = false, ...rest }) => {
  return <NextTextarea isInvalid={isInvalid} {...rest} />;
};
