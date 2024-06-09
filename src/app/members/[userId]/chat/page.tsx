import React, { FC } from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { Message } from "@prisma/client";
import { MessageDto } from "@/types";
import { MessageBox } from "./MessageBox";
import { getAuthUserId } from "@/app/actions/authActions";

interface ChatPageProps {
  messages: MessageDto[];
  userId: string;
}

export const ChatPage: FC<ChatPageProps> = ({ messages, userId }) => {
  // MESSAGES NOT USED YET
  const body = (
    <div>
      {!messages.length ? (
        "No messages to show"
      ) : (
        <div>
          {messages.map((message) => {
            return (
              <MessageBox key={message.id} currentUserId="" message={message} />
            );
          })}
        </div>
      )}
    </div>
  );

  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />;
};

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = await getAuthUserId();
  const messages = await getMessageThread(params.userId);

  return <ChatPage messages={messages ?? []} userId={userId} />;
}
