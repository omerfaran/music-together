import { calculateAge } from "@/lib/util";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

export interface MemberCardProps {
  member: Member;
}

const PLACEHOLDER_IMAGE = "/images/user.png";

export const MemberCard: FC<MemberCardProps> = ({ member }) => {
  return (
    <Card as={Link} href={`/members/${member.userId}`} isPressable fullWidth>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={member.image ?? PLACEHOLDER_IMAGE}
        className="aspect-square object-cover"
      />
      <CardFooter className="bg-dark-gradient flex justify-start overflow-hidden absolute bottom-0 z-10">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
