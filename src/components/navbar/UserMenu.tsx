"use client";

import { signOutUser } from "@/app/actions/authActions";
import { transformImageUrl } from "@/lib/util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { Avatar } from "../ui";
import { PLACEHOLDER_IMAGE } from "@/constants";

interface UserMenuProps {
  user: Session["user"];
}

export const UserMenu: FC<UserMenuProps> = ({ user }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name || "user avatar"}
          size="sm"
          src={user?.image || PLACEHOLDER_IMAGE}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            Signed in as {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit profile
        </DropdownItem>
        <DropdownItem color="danger" onClick={async () => signOutUser()}>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
