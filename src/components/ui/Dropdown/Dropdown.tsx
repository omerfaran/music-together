"use client";

import {
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Dropdown as NextDropdown,
  DropdownItemProps as NextDropdownItemProps,
} from "@nextui-org/react";
import { ReactNode, type FC } from "react";

import { OverlayPlacement } from "@nextui-org/aria-utils";

interface DropdownProps {
  items: DropdownItem[];
  header?: ReactNode;
  /**
   * The component that triggers the dropdown menu to open
   */
  trigger: ReactNode;
  /**
   * @default 'bottom-end'
   */
  placement?: OverlayPlacement;
}

interface DropdownItem {
  label: NextDropdownItemProps["children"];
  as?: NextDropdownItemProps["as"];
  href?: NextDropdownItemProps["href"];
  color?: NextDropdownItemProps["color"];
  onClick?: NextDropdownItemProps["onClick"];
}

export const Dropdown: FC<DropdownProps> = ({
  trigger,
  header,
  items,
  placement = "bottom-end",
}) => {
  return (
    <NextDropdown placement={placement}>
      <DropdownTrigger>
        <div>{trigger}</div>
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        {/* TODO - Asked on Discord what to do: https://discord.com/channels/856545348885676062/1021141023105220698/threads/1258672234411593798
        if they don't answer try reporting a bug */}
        {header ? (
          <DropdownSection showDivider>
            <DropdownItem
              isReadOnly
              as="span"
              className="h-14 flex flex-row"
              aria-label="username"
            >
              {header}
            </DropdownItem>
          </DropdownSection>
        ) : (
          // To avoid ts errors - we render a hidden dropdown item instead of rendering null
          <DropdownItem className="hidden" />
        )}

        <DropdownSection>
          {items.map(({ label, ...rest }, index) => {
            return (
              <DropdownItem key={index} {...rest}>
                {label}
              </DropdownItem>
            );
          })}
        </DropdownSection>
      </DropdownMenu>
    </NextDropdown>
  );
};
