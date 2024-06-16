import { pusherClient } from "@/lib/pusher";
import { Channel } from "pusher-js";
import { useEffect, useRef } from "react";

// that's a private channel for notifying users when they receive a message
export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [userId]);
};
