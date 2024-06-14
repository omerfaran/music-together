"use client";

import { MessageDto } from "@/types";
import React, { FC, useCallback, useEffect, useState } from "react";
import { MessageBox } from "./MessageBox";
import { pusherClient } from "@/lib/pusher";

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
  const [messages, setMessages] = useState(initialMessages);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevState) => {
      return [...prevState, message];
    });
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
    };
  }, [chatId, handleNewMessage]);
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
