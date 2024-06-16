"use client";

import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import React, { type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children: ReactNode;
  userId: string | null;
}

export const Providers: FC<ProvidersProps> = ({ children, userId }) => {
  usePresenceChannel();
  useNotificationChannel(userId);
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
