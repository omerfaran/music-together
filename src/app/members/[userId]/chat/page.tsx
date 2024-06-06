import React, { FC } from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { Message } from "@prisma/client";

interface ChatPageProps {
  messages: Partial<Message>[];
}

export const ChatPage: FC<ChatPageProps> = ({ messages }) => {
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>chat goes here</div>}
      footer={<ChatForm />}
    />
  );
};

export default async function Page({ params }: { params: { userId: string } }) {
  const messages = await getMessageThread(params.userId);

  return <ChatPage messages={messages ?? []} />;
}
