import { getMemberByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { notFound } from "next/navigation";
import React, { FC } from "react";

export interface MemberDetailedPageProps {
  member: Member;
}

const MemberDetailedPage: FC<MemberDetailedPageProps> = ({ member }) => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
};

export default async function Page({ params }: { params: { userId: string } }) {
  const member = await getMemberByUserId(params.userId);
  if (!member) {
    return notFound();
  }

  return <MemberDetailedPage member={member} />;
}
