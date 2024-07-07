import clsx from "clsx";
import { FC } from "react";

export interface HrProps {
  /**
   * @default 'normal'
   */
  spacing?: "none" | "normal" | "big";
}

const spacingToMargins: Record<NonNullable<HrProps["spacing"]>, string> = {
  none: "",
  normal: "mt-2 mb-2",
  big: "mt-4 mb-4",
};

export const Hr: FC<HrProps> = ({ spacing = "normal" }) => {
  return <hr className={clsx(spacingToMargins[spacing], "w-full")} />;
};
