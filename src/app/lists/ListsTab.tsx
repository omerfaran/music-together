"use client";

import { Spinner, Tab, Tabs } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { FC, Key, useTransition } from "react";
import { LikeType } from "../actions/likeActions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MemberCard } from "../members/MemberCard";
import { LoadingComponent } from "@/components/LoadingComponent";

export interface ListsTabProps {
  members: Member[];
  likeIds: string[];
}

export const ListsTab: FC<ListsTabProps> = ({ members, likeIds }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // This is my addition, we get the params when page loads and use it for the defaultSelectedKey, thus when refreshing
  // the Tabs will use the url to have the correct selected tab
  const currentType = searchParams.get("type") ?? "source";

  function handleTabChange(key: Key): void {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  const tabs: Array<{ id: LikeType; label: string }> = [
    { id: "source", label: "Members I have liked" },
    { id: "target", label: "Members who like me" },
    { id: "mutual", label: "Mutual likes" },
  ];

  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <div className="flex items-center">
        <Tabs
          aria-label="Like tabs"
          color="secondary"
          defaultSelectedKey={currentType}
          onSelectionChange={handleTabChange}
        >
          {tabs.map((item) => {
            return <Tab key={item.id} title={item.label} />;
          })}
        </Tabs>
        {isPending && (
          <Spinner color="secondary" className="self-center ml-3" />
        )}
      </div>
      {tabs.map((item) => {
        const isSelected = searchParams.get("type") === item.id;
        return isSelected ? (
          <div>
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
          </div>
        ) : null;
      })}
    </div>
  );
};

export default ListsTab;
