import { usePresenceStore } from "@/hooks/usePresenceStore";
import { Avatar, Badge } from "@nextui-org/react";
import { FC } from "react";

interface PresenceAvatarProps {
  src?: string | null;
  isOnline: boolean;
}

const PresenceAvatarPure: FC<PresenceAvatarProps> = ({ src, isOnline }) => {
  return (
    <Badge content="" color="success" shape="circle" isInvisible={!isOnline}>
      <Avatar src={src || "/images/user.png"} alt="User avatar" />
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
