import { FC } from "react";
import { MessageSideBar } from "./MessageSidebar";
import { Container, getMessagesByContainer } from "../actions/messageActions";
import { MessageDto } from "@/types";
import { MessageTable } from "./MessageTable";

interface MessagesPageProps {
  messages: MessageDto[];
  nextCursor?: string;
}

export const MessagesPage: FC<MessagesPageProps> = ({
  messages,
  nextCursor,
}) => {
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSideBar />
      </div>
      <div className="col-span-10">
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
      </div>
    </div>
  );
};

export default async function Page({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const { messages, nextCursor } = await getMessagesByContainer(
    containerGuard(searchParams.container)
  );

  return <MessagesPage messages={messages} nextCursor={nextCursor} />;
}

const containerGuard = (container: string): Container => {
  return container === "outbox" || container === "inbox" ? container : "inbox";
};
