import {
  Select as NextSelect,
  type SelectProps as NextSelectProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface SelectProps {
  value?: NextSelectProps["value"];
  size?: NextSelectProps["size"];
  /**
   * @default "flat"
   **/
  variant?: NextSelectProps["variant"];
  /**
   * @default false
   **/
  fullWidth?: NextSelectProps["fullWidth"];
  /**
   * @default false
   **/
  isInvalid?: NextSelectProps["isInvalid"];
  errorMessage?: NextSelectProps["errorMessage"];
  className?: NextSelectProps["className"];
  onChange?: NextSelectProps["onChange"];
  defaultSelectedKeys?: NextSelectProps["defaultSelectedKeys"];
  label?: NextSelectProps["label"];
  placeholder?: NextSelectProps["placeholder"];
  color?: NextSelectProps["color"];
  selectedKeys?: NextSelectProps["selectedKeys"];
  onSelectionChange?: NextSelectProps["onSelectionChange"];
  children: NextSelectProps["children"];
}
1;
export const Select: FC<SelectProps> = ({
  isInvalid = false,
  fullWidth = false,
  variant = "flat",
  children,
  ...rest
}) => {
  return (
    <NextSelect
      fullWidth={fullWidth}
      variant={variant}
      isInvalid={isInvalid}
      {...rest}
    >
      {children}
    </NextSelect>
  );
};
