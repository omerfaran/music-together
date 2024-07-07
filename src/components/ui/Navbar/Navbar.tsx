import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";
import { AiFillAlert } from "react-icons/ai";
import { NavLink } from "./NavLink";

import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Avatar } from "../Avatar/Avatar";
import { LinkInterface } from "@/types";
import { Logo } from "../Logo/Logo";

interface NavbarProps {
  links: LinkInterface[];
  /**
   * If authenticated, a user menu is displayed on the right; otherwise: login/signup buttons
   */
  isAuthenticated: boolean;
  onUserLogout: () => void;
  userName?: string;
  userImage?: string;
}

export const Navbar: FC<NavbarProps> = ({
  links,
  isAuthenticated,
  onUserLogout,
  userName,
  userImage,
}) => {
  return (
    <>
      <NextNavbar
        maxWidth="xl"
        className="bg-gradient-to-r from-purple-400 to-purple-700"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-500",
          ],
        }}
      >
        <NavbarBrand as={Link} href="/">
          <Logo />
        </NavbarBrand>
        <NavbarContent justify="center">
          {links.map(({ href, label }) => {
            return <NavLink key={href} href={href} label={label} />;
          })}
        </NavbarContent>
        <NavbarContent justify="end">
          {isAuthenticated ? (
            <UserMenu
              userName={userName}
              userImage={userImage}
              onUserLogout={onUserLogout}
            />
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className="text-white"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                variant="bordered"
                className="text-white"
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </NextNavbar>
    </>
  );
};

interface UserMenuProps {
  userName: NavbarProps["userName"];
  userImage?: NavbarProps["userImage"];
  onUserLogout: NavbarProps["onUserLogout"];
}

const UserMenu: FC<UserMenuProps> = ({ userName, userImage, onUserLogout }) => {
  const dropdownTrigger = (
    <Avatar
      isBordered
      as="button"
      className="transition-transform"
      color="secondary"
      name={userName || "user avatar"}
      size="sm"
      src={userImage || "/images/user.png"}
    />
  );

  return (
    <Dropdown
      trigger={dropdownTrigger}
      header={`Signed in as ${userName}`}
      items={[
        { label: "Edit Profile", as: Link, href: "/members/edit" },
        {
          label: "Logout",
          color: "danger",
          onClick: onUserLogout,
        },
      ]}
    />
  );
};
