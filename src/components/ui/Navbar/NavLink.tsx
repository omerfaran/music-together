"use client";

import { useMessagesStore } from "@/hooks/useMessagesStore";
import { NavbarItem, type NavbarItemProps } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";
import { Text } from "..";

interface NavLinkProps {
  href: JSX.IntrinsicElements["a"]["href"];
  label: NavbarItemProps["children"];
  /**
   * @default false
   */
  isActive?: boolean;
  unreadCount?: number;
}

export const NavLink: FC<NavLinkProps> = ({
  unreadCount,
  isActive = false,
  href,
  label,
}) => {
  // Why here ??????
  // const pathname = usePathname();
  // const { unreadCount } = useMessagesStore((state) => ({
  //   unreadCount: state.unreadCount,
  // }));

  return (
    <NavbarItem isActive={isActive} href={href} as={Link}>
      <Text component="span">{label}</Text>
      {unreadCount && unreadCount > 0 && (
        <Text component="span" className="ml-1">
          ({unreadCount})
        </Text>
      )}
    </NavbarItem>
  );
};
