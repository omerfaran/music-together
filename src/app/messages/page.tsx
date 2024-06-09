import React, { FC } from "react";
import { MessageSideBar } from "./MessageSidebar";
import { Container, getMessagesByContainer } from "../actions/messageActions";
import { MessageDto } from "@/types";
import { MessageTable } from "./MessageTable";

interface MessagesPageProps {
  messages: MessageDto[];
}

export const MessagesPage: FC<MessagesPageProps> = ({ messages }) => {
  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSideBar />
      </div>
      <div className="col-span-10">
        <MessageTable messages={messages} />
      </div>
    </div>
  );
};

export default async function Page({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const messages = await getMessagesByContainer(
    containerGuard(searchParams.container)
  );

  return <MessagesPage messages={messages} />;
}

const containerGuard = (container: string): Container => {
  return container === "outbox" || container === "inbox" ? container : "inbox";
};
