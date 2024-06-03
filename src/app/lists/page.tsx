import React, { FC } from "react";
import ListsTab, { ListsTabProps } from "./ListsTab";
import {
  LikeType,
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeActions";

interface ListsPageProps {
  members: ListsTabProps["members"];
  likeIds: ListsTabProps["likeIds"];
}

const ListsPage: FC<ListsPageProps> = ({ members, likeIds }) => {
  return (
    <div>
      <ListsTab members={members} likeIds={likeIds ?? []} />
    </div>
  );
};

export default async function Page({
  searchParams,
}: {
  searchParams: { type: LikeType };
}) {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);

  return <ListsPage members={members} likeIds={likeIds ?? []} />;
}
