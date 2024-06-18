import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import React, { FC } from "react";
import { AiFillAlert } from "react-icons/ai";
import { NavLink } from "./NavLink";
import { auth } from "@/auth";
import { UserMenu } from "./UserMenu";
import { Filters } from "./Filters";

// this is a server side component (we don't do "use client"), so we're allowed to use async

interface TopNavProps {}

export const TopNav: FC<TopNavProps> = async () => {
  const session = await auth();

  return (
    <>
      <Navbar
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
          <AiFillAlert size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Next</span>
            <span className="text-gray-200">Match</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavLink label="Matches" href="/members" />
          <NavLink label="Lists" href="/lists" />
          <NavLink label="Messages" href="/messages" />
        </NavbarContent>
        <NavbarContent justify="end">
          {session?.user ? (
            <UserMenu user={session.user} />
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
      </Navbar>
      <Filters />
    </>
  );
};
