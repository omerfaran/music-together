import { ValueAndLabel } from "@/types";
import {
  Select as NextSelect,
  SelectItem,
  type SelectProps as NextSelectProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface SelectProps {
  items: Array<ValueAndLabel>;
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
1;
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
      {items.map(({ value, label }) => {
        return (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        );
      })}
    </NextSelect>
  );
};
