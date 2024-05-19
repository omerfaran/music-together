"use client";

import { NavbarItem, type NavbarItemProps } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type FC } from "react";

interface NavLinkProps {
  href: JSX.IntrinsicElements["a"]["href"];
  label: NavbarItemProps["children"];
}

export const NavLink: FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <NavbarItem isActive={href === pathname} href={href} as={Link}>
      {label}
    </NavbarItem>
  );
};
