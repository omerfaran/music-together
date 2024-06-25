"use client";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import { useMessagesStore } from "@/hooks/useMessagesStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { useCallback, useEffect, useRef, type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children: ReactNode;
  userId: string | null;
}

export const Providers: FC<ProvidersProps> = ({ children, userId }) => {
  // TODO - this is probably redundant, he just uses it because we're in strict mode in development
  const isUnreadCountSet = useRef(false);

  const { updateUnreadCount } = useMessagesStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  const setUnreadCount = useCallback(
    (count: number) => {
      updateUnreadCount(count);
    },
    [updateUnreadCount]
  );

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel(userId);
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
