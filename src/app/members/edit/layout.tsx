import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import { MemberSidebar } from "../MemberSidebar";
import { Member } from "@prisma/client";
import { Card } from "@/components/ui/Card";

export interface LayoutPageProps {
  children: ReactNode;
  member: Member;
}

const basePath = `/members/edit`;
const navLinks = [
  { name: "Edit Profile", href: `${basePath}` },
  { name: "Update Photos", href: `${basePath}/photos` },
];

export const LayoutPage: FC<LayoutPageProps> = ({ children, member }) => {
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
};

interface PageProps {
  children: ReactNode;
}

export default async function Page({ children }: PageProps) {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }

  return <LayoutPage member={member}>{children}</LayoutPage>;
}
