// (has to be called layout.tsx)
// IMPORTANT: We call getMemberByUserId here in the layout, and also on the page
// we don't have a choice we must call it in both places, because we cannot pass it from layout down to
// the page. But Nextjs knows how to handle it and will actually make one call

import { getMemberByUserId } from "@/app/actions/memberActions";
import { Member } from "@prisma/client";
import { notFound } from "next/navigation";
import React, { FC, ReactNode } from "react";
import { MemberSidebar } from "../MemberSidebar";
import { Card } from "@nextui-org/react";

export interface LayoutPageProps {
  member: Member;
  children: ReactNode;
}

export const LayoutPage: FC<LayoutPageProps> = ({ member, children }) => {
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
};

interface PageProps {
  children: ReactNode;
  params: { userId: string };
}

export default async function Page({ children, params }: PageProps) {
  const member = await getMemberByUserId(params.userId);
  if (!member) {
    return notFound();
  }

  return <LayoutPage member={member}>{children}</LayoutPage>;
}
