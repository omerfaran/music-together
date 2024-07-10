import { usePresenceStore } from "@/hooks/usePresenceStore";
import { FC } from "react";
import { Avatar, Badge } from "./ui";
import { PLACEHOLDER_IMAGE } from "@/constants";

interface PresenceAvatarProps {
  src?: string | null;
  isOnline: boolean;
}

const PresenceAvatarPure: FC<PresenceAvatarProps> = ({ src, isOnline }) => {
  return (
    <Badge content="" color="success" shape="circle" isInvisible={!isOnline}>
      <Avatar src={src || PLACEHOLDER_IMAGE} alt="User avatar" />
    </Badge>
  );
};

const Observed = PresenceAvatarPure;

export const PresenceAvatar = ({
  userId,
  src,
}: {
  userId?: string;
  src: PresenceAvatarProps["src"];
}) => {
  const { members } = usePresenceStore((state) => ({
    members: state.members,
  }));

  const isOnline = !!userId && members.includes(userId);

  return <PresenceAvatarPure isOnline={isOnline} src={src} />;
};
