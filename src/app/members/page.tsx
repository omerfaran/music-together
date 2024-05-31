import React, { type FC } from "react";
import { getMembers } from "../actions/memberActions";
import { Member } from "@prisma/client";

interface MembersPageProps {
  members: Array<Member>;
}

export const MembersPage: FC<MembersPageProps> = ({ members }) => {
  return (
    <div>
      <ul>
        {members.map((member) => {
          return <li key={member.id}>{member.name}</li>;
        })}
      </ul>
    </div>
  );
};

// We can name the function MembersPage however we want (it's default), but that's his convention
// I think now we don't need to use getServerSideProps, we can just do it in the component itself:
// https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-6-migrating-data-fetching-methods
export default async function Page() {
  const members = await getMembers();

  return <MembersPage members={members ?? []} />;
}
