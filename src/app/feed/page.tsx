import { type FC } from "react";
import { getMembers } from "../actions/memberActions";
import { Member } from "@prisma/client";
import { MemberCard } from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { Pagination } from "@/components/Pagination";
import { GetMembersParams, UserFilters } from "@/types";
import { EmptyState } from "@/components/EmptyState";

interface MembersPageProps {
  members: Array<Member>;
  likeIds: string[];
  totalCount: number;
}

export const MembersPage: FC<MembersPageProps> = ({
  members,
  likeIds,
  totalCount,
}) => {
  return !members.length ? (
    <EmptyState />
  ) : (
    <>
      {/* TODO - not very responsive; fix! */}
      <div className="pt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
        {members.map((member) => {
          return (
            <MemberCard
              member={member}
              key={member.id}
              hasLiked={likeIds.includes(member.userId)}
            />
          );
        })}
      </div>
      <Pagination totalCount={totalCount} />
    </>
  );
};

// We can name the function MembersPage however we want (it's default), but that's his convention
// I think now we don't need to use getServerSideProps, we can just do it in the component itself:
// https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-6-migrating-data-fetching-methods
export default async function Page({
  searchParams,
}: {
  searchParams: GetMembersParams;
}) {
  // get all members, unrelated to user
  const { items, totalCount } = await getMembers(searchParams);
  // get all the ids of users the current member has liked
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <MembersPage
      members={items ?? []}
      totalCount={totalCount}
      likeIds={likeIds ?? []}
    />
  );
}
