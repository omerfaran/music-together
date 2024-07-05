"use client";

import { useMessagesStore } from "@/hooks/useMessagesStore";
import { NavbarItem, type NavbarItemProps } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FC } from "react";

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
      <span>{label}</span>
      {unreadCount && unreadCount > 0 && (
        <span className="ml-1">({unreadCount})</span>
      )}
    </NavbarItem>
  );
};
