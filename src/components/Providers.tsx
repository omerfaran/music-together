"use client";

import { getUnreadMessageCount } from "@/app/actions/messageActions";
import { useMessagesStore } from "@/hooks/useMessagesStore";
import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useCallback, useEffect, useRef, type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  children: ReactNode;
  userId: string | null;
  // TODO - probably move this out of here don't know where
  profileComplete?: boolean;
}

export const Providers: FC<ProvidersProps> = ({
  children,
  userId,
  profileComplete,
}) => {
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

  usePresenceChannel(userId, profileComplete);
  useNotificationChannel(userId, profileComplete);
  return (
    // Session provider is for getting sessions info on client side
    // For the most part we wanted it through the server side but
    // it's also possible to get it with useSession hook on the client
    <SessionProvider>
      <NextUIProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          className="z-50"
        />
        {children}
      </NextUIProvider>
    </SessionProvider>
  );
};
