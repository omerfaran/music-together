import { usePresenceStore } from "@/hooks/usePresenceStore";
import { Member } from "@prisma/client";
import React, { FC } from "react";
import { GoDot, GoDotFill } from "react-icons/go";

interface PresenceDotProps {}

const PresenceDotPure: FC<PresenceDotProps> = () => {
  return (
    <>
      <GoDot
        size={36}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <GoDotFill size={32} className="fill-green-500 animate-pulse" />
    </>
  );
};

const Observed = PresenceDotPure;

export function PresenceDot({ member }: { member: Member }) {
  const { members } = usePresenceStore((state) => ({
    members: state.members,
  }));

  const isOnline = members.includes(member.userId);
  if (!isOnline) {
    return null;
  }

  return <Observed />;
}
