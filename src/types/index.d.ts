import { Prisma } from "@prisma/client";
import { type ZodIssue } from "zod";

// this is called a discriminating union, if status is success ts will know we expect data, if error we know we expect error prop
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: ZodIssue[] | string };

// we're getting help from prisma to define a custom type.
// type of Message, according to the schema, is just the message,
// but we want also stuff from the sender
type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    created: true;
    dateRead: true;
    sender: {
      select: { userId; name; image };
    };
    recipient: {
      select: { userId; name; image };
    };
  };
}>;

type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};
