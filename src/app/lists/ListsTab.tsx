"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import React, { FC, Key, useEffect, useState } from "react";
import { LikeType } from "../actions/likeActions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MemberCard } from "../members/MemberCard";

export interface ListsTabProps {
  members: Member[];
  likeIds: string[];
}

export const ListsTab: FC<ListsTabProps> = ({ members, likeIds }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // This is my addition, we get the params when page loads and use it for the defaultSelectedKey, thus when refreshing
  // the Tabs will use the url to have the correct selected tab
  const currentType = searchParams.get("type") ?? "source";

  function handleTabChange(key: Key): void {
    const params = new URLSearchParams(searchParams);
    params.set("type", key.toString());
    router.replace(`${pathname}?${params.toString()}`);
  }

  const tabs: Array<{ id: LikeType; label: string }> = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members who like me" },
    { id: "mutual", label: "Mutual likes" },
  ];

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabs}
        color="secondary"
        defaultSelectedKey={currentType}
        onSelectionChange={handleTabChange}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {members.length ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                {members.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    hasLiked={likeIds.includes(member.userId)}
                  />
                ))}
              </div>
            ) : (
              <div>No members for this filter</div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListsTab;
