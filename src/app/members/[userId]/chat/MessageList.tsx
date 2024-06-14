"use client";

import { MessageDto } from "@/types";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { MessageBox } from "./MessageBox";
import { pusherClient } from "@/lib/pusher";
import { formatShortDateTime } from "@/lib/util";
import { Channel } from "pusher-js";

interface MessageListProps {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
}

export const MessageList: FC<MessageListProps> = ({
  currentUserId,
  initialMessages,
  chatId,
}) => {
  // const setReadCount = useRef(false);
  const channelRef = useRef<Channel | null>(null);

  const [messages, setMessages] = useState(initialMessages);

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
