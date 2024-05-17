import { NextUIProvider } from "@nextui-org/react";
import React, { type FC, type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
