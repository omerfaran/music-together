"use client";

import { MessageDto } from "@/types";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { MessageBox } from "./MessageBox";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/util";
import { Channel } from "pusher-js";
import { useMessagesStore } from "@/hooks/useMessagesStore";

interface MessageListProps {
  initialMessages: { messages: MessageDto[]; readCount: number };
  currentUserId: string;
  chatId: string;
}

export const MessageList: FC<MessageListProps> = ({
  currentUserId,
  initialMessages,
  chatId,
}) => {
  const setReadCount = useRef(false);
  const channelRef = useRef<Channel | null>(null);
  const { updateUnreadCount } = useMessagesStore((state) => ({
    updateUnreadCount: state.updateUnreadCount,
  }));

  const [messages, setMessages] = useState(initialMessages.messages);

  useEffect(() => {
    // TODO - all this logic should not be here, but in the store!
    // This component should only display the message list and that's it
    if (!setReadCount.current) {
      updateUnreadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages.readCount, updateUnreadCount]);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    // make current messages in state marked as read if they're included in messageIds array
    setMessages((prevState) => {
      return prevState.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message
      );
    });
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);

      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("messages:read", handleReadMessages);
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new", handleNewMessage);
        channelRef.current.unbind("messages:read", handleReadMessages);
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {!messages.length ? (
        "No messages to show"
      ) : (
        <div>
          {messages.map((message) => {
            return (
              <MessageBox
                key={message.id}
                currentUserId={currentUserId}
                message={message}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
