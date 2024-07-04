import {
  Avatar as NextAvatar,
  type AvatarProps as NextAvatarProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface AvatarProps {
  src?: NextAvatarProps["src"];
  alt?: NextAvatarProps["alt"];
  /**
   * @default false
   */
  isBordered?: NextAvatarProps["isBordered"];
  as?: NextAvatarProps["as"];
  className?: NextAvatarProps["className"];
  name?: NextAvatarProps["name"];
  color?: NextAvatarProps["color"];
  size?: NextAvatarProps["size"];
  radius?: NextAvatarProps["radius"];
}

export const Avatar: FC<AvatarProps> = ({ isBordered = false, ...rest }) => {
  return <NextAvatar isBordered={isBordered} {...rest} />;
};
