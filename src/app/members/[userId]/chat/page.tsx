import React from "react";
import CardInnerWrapper from "@/components/CardInnerWrapper";

export const ChatPage = () => {
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>chat goes here</div>}
      footer={<div>chat form goes here</div>}
    />
  );
};

export default ChatPage;
