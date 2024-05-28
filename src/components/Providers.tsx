import { NextUIProvider } from "@nextui-org/react";
import React, { type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <NextUIProvider>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className="z-50"
      />
      {children}
    </NextUIProvider>
  );
};
