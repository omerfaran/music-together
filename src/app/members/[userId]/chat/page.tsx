import { FC } from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { getAuthUserId } from "@/app/actions/authActions";
import { MessageList } from "./MessageList";
import { createChatId } from "@/lib/util";

interface ChatPageProps {
  messages: { messages: MessageDto[]; readCount: number };
  userId: string;
  chatId: string;
}

export const ChatPage: FC<ChatPageProps> = ({ messages, userId, chatId }) => {
  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList
          initialMessages={messages}
          currentUserId={userId}
          chatId={chatId}
        />
      }
      footer={<ChatForm />}
    />
  );
};

export default async function Page({ params }: { params: { userId: string } }) {
  const userId = await getAuthUserId();
  const messages = await getMessageThread(params.userId);
  const chatId = createChatId(userId, params.userId);

  return <ChatPage messages={messages ?? []} userId={userId} chatId={chatId} />;
}
