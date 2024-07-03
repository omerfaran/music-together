import {
  Button as NextButton,
  type ButtonProps as NextButtonProps,
} from "@nextui-org/react";
import { type FC } from "react";

interface ButtonProps {
  /**
   * @default 'solid'
   */
  variant?: NextButtonProps["variant"];
  /**
   * @default 'default'
   */
  color?: NextButtonProps["color"];
  onClick?: NextButtonProps["onClick"];
  /**
   * @default false
   */
  isIconOnly?: NextButtonProps["isIconOnly"];
  /**
   * @default false
   */
  isLoading?: NextButtonProps["isLoading"];
  /**
   * @default false
   */
  isDisabled?: NextButtonProps["isDisabled"];
  radius?: NextButtonProps["radius"];
  className?: NextButtonProps["className"];
  type?: NextButtonProps["type"];
  /**
   * @default false
   */
  fullWidth?: NextButtonProps["fullWidth"];
  /**
   * @default 'md'
   */
  size?: NextButtonProps["size"];
  as?: NextButtonProps["as"];
  href?: NextButtonProps["href"];
  children: NextButtonProps["children"];
}

export const Button: FC<ButtonProps> = ({
  variant = "solid",
  color = "default",
  size = "md",
  isIconOnly = false,
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  children,
  ...rest
}) => {
  return (
    <NextButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isIconOnly={isIconOnly}
      {...rest}
    >
      {children}
    </NextButton>
  );
};
