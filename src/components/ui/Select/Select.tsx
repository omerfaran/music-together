import { ValueAndLabel } from "@/types";
import {
  Select as NextSelect,
  SelectItem,
  SelectItemProps,
  type SelectProps as NextSelectProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface SelectProps {
  items: Array<ValueAndLabel & Omit<SelectItemProps, "key">>;
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
}

export const Select: FC<SelectProps> = ({
  items,
  isInvalid = false,
  fullWidth = false,
  variant = "flat",
  ...rest
}) => {
  return (
    <NextSelect
      fullWidth={fullWidth}
      variant={variant}
      isInvalid={isInvalid}
      {...rest}
    >
      {items.map(({ value, label, ...rest }) => {
        return (
          <SelectItem key={value} value={value} {...rest}>
            {label}
          </SelectItem>
        );
      })}
    </NextSelect>
  );
};
