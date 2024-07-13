import { ValueAndLabel } from "@/types";
import {
  AutocompleteItem,
  Autocomplete as NextAutocomplete,
  type AutocompleteProps as NextAutocompleteProps,
} from "@nextui-org/react";
import { type FC } from "react";

export interface AutocompleteProps {
  /**
   * Use as controlled
   */
  value?: ValueAndLabel["value"];
  /**
   * When used as controlled
   */
  onChange?: (value: AutocompleteProps["value"]) => void;
  items: Array<ValueAndLabel>;
  /**
   *  Allow for values that don't exist in items array
   * @default false
   */
  allowCustomValue?: NextAutocompleteProps["allowsCustomValue"];
  label: string;
  /**
   * @default 'bordered'
   */
  variant?: NextAutocompleteProps["variant"];
  isInvalid?: NextAutocompleteProps["isInvalid"];
  errorMessage?: NextAutocompleteProps["errorMessage"];
  defaultSelectedKeys?: NextAutocompleteProps["defaultSelectedKey"];
}

export const Autocomplete: FC<AutocompleteProps> = ({
  items,
  label,
  variant = "bordered",
  allowCustomValue = false,
  value,
  onChange,
  ...rest
}) => {
  return (
    <NextAutocomplete
      selectedKey={value}
      // TODO - !important - controlled+allowCustomValue not working; check on discord:
      // https://discord.com/channels/856545348885676062/856545348885676068
      // if no answer open a github ticket
      onSelectionChange={(value) => {
        onChange?.((value as string) ?? "");
      }}
      allowsCustomValue={allowCustomValue}
      label={label}
      variant={variant}
      className="max-w-xs"
      defaultItems={items}
      {...rest}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </NextAutocomplete>
  );
};
