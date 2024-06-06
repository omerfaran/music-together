"use client";

import React from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";
import ChatForm from "./ChatForm";

export const ChatPage = () => {
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>chat goes here</div>}
      footer={<ChatForm />}
    />
  );
};

export default ChatPage;
