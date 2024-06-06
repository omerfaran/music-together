import React, { FC } from "react";
import { getMemberByUserId } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import { Member } from "@prisma/client";
import { notFound } from "next/navigation";

export interface MemberDetailedPageProps {
  member: Member;
}

const MemberDetailedPage: FC<MemberDetailedPageProps> = ({ member }) => {
  return (
    <CardInnerWrapper header="Profile" body={<div>{member.description}</div>} />
  );
};

export default async function Page({ params }: { params: { userId: string } }) {
  const member = await getMemberByUserId(params.userId);
  if (!member) {
    return notFound();
  }

  return <MemberDetailedPage member={member} />;
}
