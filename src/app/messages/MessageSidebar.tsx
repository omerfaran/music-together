"use client";

import { Chip } from "@/components/ui";
import { useMessagesStore } from "@/hooks/useMessagesStore";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

export const MessageSideBar = () => {
  const { unreadCount } = useMessagesStore((state) => ({
    unreadCount: state.unreadCount,
  }));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") ?? "inbox"
  );

  const items = [
    {
      key: "inbox",
      label: "Inbox",
      icon: GoInbox,
      chip: true,
    },
    { key: "outbox", label: "Outbox", icon: MdOutlineOutbox, chip: false },
  ];

  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set("container", key);
    // TODO - is this really the best way to replace params in the URL?
    // Better practice - create a custom hook that handles the router replace and the stuff with params, then use it wherever needed,
    // but not inside the component itself, separate it into another layer
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
      {items.map(({ key, icon: Icon, label, chip }) => {
        return (
          <div
            key={key}
            className={clsx(
              "flex flex-row items-center rounded-t-lg gap-2 p-3",
              {
                "text-secondary font-semibold": selected === key,
                "text-black hover:text-secondary/70": selected !== key,
              }
            )}
            onClick={() => {
              handleSelect(key);
            }}
          >
            <Icon size={24} />
            <div className="flex justify-between flex-grow">
              <span>{label}</span>
              {chip && <Chip>{unreadCount}</Chip>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
