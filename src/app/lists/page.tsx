import React from "react";
import ListsTab from "./ListsTab";
import {
  LikeType,
  fetchCurrentUserLikeIds,
  fetchLikedMembers,
} from "../actions/likeActions";

export default async function ListsPage({
  searchParams,
}: {
  searchParams: { type: LikeType };
}) {
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div>
      <ListsTab members={members} likeIds={likeIds ?? []} />
    </div>
  );
}
