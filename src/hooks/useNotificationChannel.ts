import { pusherClient } from "@/lib/pusher";
import { MessageDto } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Channel } from "pusher-js";
import { useCallback, useEffect, useRef } from "react";
import { useMessagesStore } from "./useMessagesStore";
import { toast } from "react-toastify";
import { newMessageToast } from "@/components/navbar/NewMessageToast";

// that's a private channel for notifying users when they receive a message
export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { add, updateUnreadCount } = useMessagesStore((state) => ({
    add: state.add,
    updateUnreadCount: state.updateUnreadCount,
  }));

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      // TODO - can create a hook to check this stuff, looks bad like this
      //
      if (
        pathname === "/messages" &&
        searchParams.get("container") !== "outbox"
      ) {
        // if they're in their outbox window
        add(message);
        updateUnreadCount(1);
      } else if (pathname !== `/members/${message.senderId}/chat`) {
        // If they're not in messages window, toast to let them know
        newMessageToast(message);
        updateUnreadCount(1);
      }
    },
    [add, pathname, searchParams, updateUnreadCount]
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`);

      channelRef.current.bind("message:new", handleNewMessage);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current = null;
      }
    };
  }, [handleNewMessage, userId]);
};
