import {
  Button as NextButton,
  NextUIProvider,
  type ButtonProps as NextButtonProps,
} from "@nextui-org/react";
import { FC } from "react";

interface ButtonProps {
  /**
   * @default 'solid'
   */
  variant?: NextButtonProps["variant"];
  /**
   * @default 'default'
   */
  color?: NextButtonProps["color"];
  onClick: NextButtonProps["onClick"];
  /**
   * @default 'default'
   */
  isLoading?: NextButtonProps["isLoading"];
  /**
   * @default 'default'
   */
  isDisabled?: NextButtonProps["isDisabled"];
  type?: NextButtonProps["type"];
  /**
   * @default false
   */
  fullWidth?: NextButtonProps["fullWidth"];
  children: NextButtonProps["children"];
}

export const Button: FC<ButtonProps> = ({
  variant = "solid",
  color = "default",
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
      fullWidth={fullWidth}
      isDisabled={isDisabled}
      isLoading={isLoading}
      {...rest}
    >
      {children}
    </NextButton>
  );
};
