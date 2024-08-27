import { type FC } from "react";
import { auth } from "@/auth";
import {
  getJobPosts,
  getMemberByUserId,
  getMembers,
} from "../actions/memberActions";
import { Member } from "@prisma/client";
import { MemberCard } from "./MemberCard";
import { fetchCurrentUserLikeIds } from "../actions/likeActions";
import { Pagination } from "@/components/Pagination";
import { JobPost as PrismaJobPost } from "@prisma/client";
import { GetMembersParams, JobPost, UserFilters } from "@/types";
import { EmptyState } from "@/components/EmptyState";
import { JobPostForm } from "@/components/JobPostForm/JobPostForm";
import { JobPost as JobPostComponent } from "@/components/JobPost/JobPost";
import { getAuthUserId } from "../actions/authActions";

interface FeedPageProps {
  jobPosts: Array<JobPost>;
  likeIds?: string[];
  totalCount: number;
}

export const FeedPage: FC<FeedPageProps> = ({
  jobPosts,
  likeIds,
  totalCount,
}) => {
  return !jobPosts.length ? (
    <EmptyState />
  ) : (
    <>
      {/* TODO - not very responsive; fix! */}
      <JobPostForm />
      <div className="pt-10 grid grid-cols-2 md:grid-cols-3 gap-8 ">
        {jobPosts.map((jobPost) => {
          return <JobPostComponent key={jobPost.id} {...jobPost} />;
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
  const userId = await getAuthUserId();
  const memberId = await getMemberByUserId(userId);
  console.log(userId, "*&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

  // // get all members, unrelated to user
  // const { items, totalCount } = await getMembers(searchParams);
  // // get all the ids of users the current member has liked
  // const likeIds = await fetchCurrentUserLikeIds();

  const { items, totalCount } = await getJobPosts();

  const converted = convertPrismaJobPostsToJobPosts(items, memberId?.id);
  console.log({ converted });

  return (
    <FeedPage
      jobPosts={converted ?? []}
      totalCount={totalCount}
      // likeIds={likeIds ?? []}
    />
  );
}

const convertPrismaJobPostsToJobPosts = (
  jobPosts: Array<
    PrismaJobPost & {
      member: Pick<Member, "name" | "image">;
    }
  >,
  loggedMemberId?: string
): JobPost[] => {
  return jobPosts.map(
    ({
      id,
      photoUrl,
      title,
      description,
      created,
      updated,
      member,
      memberId,
    }) => {
      return {
        id,
        photoUrl,
        title,
        description,
        created,
        updated,
        memberId,
        memberImageSrc: member.image,
        memberName: member.name,
        editAvailable: loggedMemberId === memberId,
      };
    }
  );
};
