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

type UserFilters = {
  ageRange: number[];
  orderBy: string;
  gender: string[];
  withPhoto: boolean;
};

type PagingParams = {
  pageNumber: number;
  pageSize: number;
};

type PagingResult = {
  totalPages: number;
  totalCount: number;
} & PagingParams;

type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
};

type GetMembersParams = Partial<{
  ageRange: string;
  gender: string;
  pageNumber: string;
  pageSize: string;
  orderBy: string;
  withPhoto: "true" | "false";
}>;

interface LinkInterface {
  href: string;
  label: string;
}

interface ValueAndLabel {
  value: string;
  label: string;
}

export interface JobPost {
  // TODO - revisit
  id: string;
  userId: string;
  avatarImageSrc: string;
  name: string;
  date: string;
  createdOn: Date;
  modifiedOn: Date;
  expertise: string;
  description: string;
  selectedInstrument: Instrument;
  // Do we need replies?
  replies?: unknown;
}

// id - we probably don't need our own id, we can let mongo db create it
// createdOn and modifiedOn, we will generate them ourselves in the entity with new Date();
// avatarImageSrc - should be retrieved from the userId, not hardcoded in the document
// selectedInstrument - this can either be just an id if it's for bass for example, or 'custom'
// in which case there will be additional label and image, but not sure about it, for now can just be an id
//

//
