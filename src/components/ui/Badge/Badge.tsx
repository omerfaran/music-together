import {
  Badge as NextBadge,
  type BadgeProps as NextBadgeProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface BadgeProps {
  children?: NextBadgeProps["children"];
  color?: NextBadgeProps["color"];
  shape?: NextBadgeProps["shape"];
  /**
   * @default false
   */
  isInvisible?: NextBadgeProps["isInvisible"];
  content?: NextBadgeProps["content"];
}

export const Badge: FC<BadgeProps> = ({ children, isInvisible, ...rest }) => {
  return (
    <NextBadge isInvisible={isInvisible} {...rest}>
      {children}
    </NextBadge>
  );
};
