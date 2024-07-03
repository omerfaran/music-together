"use client";

import { PresenceDot } from "@/components/PresenceDot";
import { Button } from "@/components/ui/Button/Button";
import { calculateAge, transformImageUrl } from "@/lib/util";
import { Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export interface MemberSidebarProps {
  member: Member;
  navLinks: { name: string; href: string }[];
}

const PLACEHOLDER_IMAGE = "/images/user.png";

export const MemberSidebar: FC<MemberSidebarProps> = ({ member, navLinks }) => {
  const pathname = usePathname();

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={transformImageUrl(member.image) ?? PLACEHOLDER_IMAGE}
        alt="User profile main image"
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody className="overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="text-2xl">
              {member.name}, {calculateAge(member.dateOfBirth)}
            </div>
            <div>
              <PresenceDot member={member} />
            </div>
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
          <Divider className="my-3" />
          <nav className="flex flex-col p-4 ml-4 text-2xl gap-4 w-full">
            {navLinks.map((link) => {
              return (
                <Link
                  href={link.href}
                  key={link.name}
                  className={`block rounded ${
                    pathname === link.href
                      ? "text-secondary"
                      : // text-secondary/50 is lowering opacity to 50%
                        "hover:text-secondary/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          variant="bordered"
          fullWidth
          color="secondary"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
};
