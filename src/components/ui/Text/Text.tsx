import { createElement, type FC, type ReactNode } from "react";
import clsx from "clsx";

export interface TextProps {
  component?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h4" | "h5";
  children: ReactNode;
  /**
   * @default false
   */
  center?: boolean;
  /**
   * @default false
   */
  uppercase?: boolean;
  /**
   * Small and grayish text. Will override styling by component
   * @default false
   */
  delicate?: boolean;
  /**
   * @default false
   */
  truncate?: boolean;
  /**
   * Additional tailwind classes
   */
  className?: string;
  /**
   * Override default component styles with Tailwind classes
   */
  customStyles?: string;
  /**
   * Revert to using text-base class, for default size
   * @default false
   */
  base?: boolean;
}

const classes: Record<NonNullable<TextProps["component"]>, string> = {
  p: "text-sm",
  span: "",
  h1: "text-2xl font-bold", //  TODO - adapt those as we go (till h5)
  h2: "text-3xl font-semibold",
  h3: "text-3xl font-bold",
  h4: "text-base font-bold",
  h5: "text-primaryGray text-xs font-bold",
};

export const Text: FC<TextProps> = ({
  component = "p",
  center = false,
  uppercase = false,
  truncate = false,
  children,
  className,
  customStyles,
  delicate = false,
  base = false,
}) => {
  const Element = createElement(
    component,
    {
      className: clsx(
        customStyles
          ? customStyles
          : delicate
            ? "text-xs text-gray-500"
            : base
              ? "text-base"
              : classes[component],
        center && "text-center",
        uppercase && "uppercase",
        truncate && "w-11/12 truncate",
        className
      ),
    },
    children
  );
  return Element;
};
