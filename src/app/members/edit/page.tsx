import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import { FC } from "react";
import { EditForm } from "./EditForm";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import { Member } from "@prisma/client";

interface MemberEditPageProps {
  member: Member;
}

const MemberEditPage: FC<MemberEditPageProps> = ({ member }) => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
};

export default async function Page() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  if (!member) {
    return notFound();
  }

  return <MemberEditPage member={member} />;
}
