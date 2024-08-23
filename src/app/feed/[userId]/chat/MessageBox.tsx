"use client";

import { PresenceAvatar } from "@/components/PresenceAvatar";
import { PLACEHOLDER_IMAGE } from "@/constants";
import { timeAgo, transformImageUrl } from "@/lib/util";
import { MessageDto } from "@/types";
import clsx from "clsx";
import { FC, useEffect, useRef } from "react";

interface MessageBoxProps {
  message: MessageDto;
  currentUserId: string;
}

export const MessageBox: FC<MessageBoxProps> = ({ message, currentUserId }) => {
  const isCurrentUserSender = message.senderId === currentUserId;
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageEndRef]);

  const messageContentClasses = clsx("flex flex-col w-[50%] px-2 py-1", {
    "rounded-l-xl rounded-tr-xl text-white bg-blue-100": isCurrentUserSender,
    "rounded-r-xl rounded-tl-xl border-gray-200 bg-green-100":
      !isCurrentUserSender,
  });

  const messageHeader = (
    <div
      className={clsx("flex items-center w-full", {
        "justify-between": isCurrentUserSender,
      })}
    >
      {message.dateRead && message.recipientId !== currentUserId ? (
        <span className="text-xs text-black italic">
          (Read ${timeAgo(message.dateRead)} ago)
        </span>
      ) : (
        <div />
      )}
      <div className="flex">
        <span className="text-sm font-semibold text-gray-900">
          {message.senderName}
        </span>
        <span className="text-sm text-gray-500 ml-2">{message.created}</span>
      </div>
    </div>
  );

  const renderMessageContent = (
    <div className={messageContentClasses}>
      {messageHeader}
      <p className="text-sm py-3 text-gray-900">{message.text}</p>
    </div>
  );

  return (
    <div className="grid grid-rows-1">
      <div
        ref={messageEndRef}
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && <MessageAvatar message={message} />}
        {renderMessageContent}
        {isCurrentUserSender && <MessageAvatar message={message} />}
      </div>
    </div>
  );
};

const MessageAvatar: FC<{ message: MessageDto }> = ({ message }) => {
  return (
    <div className="self-end">
      <PresenceAvatar
        src={transformImageUrl(message.senderImage) ?? PLACEHOLDER_IMAGE}
        userId={message.senderId}
      />
    </div>
  );
};
