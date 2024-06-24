"use server";

import { MessageSchema, messageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult, MessageDto } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { Message } from "@prisma/client";
import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/util";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { text } = validated.data;
    const message = await prisma.message.create({
      data: { text, recipientId: recipientUserId, senderId: userId },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    await pusherServer.trigger(
      createChatId(userId, recipientUserId),
      "message:new",
      messageDto
    );

    return { status: "success", data: messageDto };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getMessageThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            // Messages that current user sent to others
            senderId: userId,
            recipientId,
            senderDeleted: false,
          },
          {
            // The opposite, messages that were sent to current users
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: { created: "asc" }, // order messages from oldest to newest
      select: messageSelect,
    });

    let readCount = 0;

    // mark messages as read by user
    if (messages.length) {
      // get all messages ids (in array) relevant to this correspondence
      const readMessagesIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id);

      // update them as read by user
      await prisma.message.updateMany({
        where: { id: { in: readMessagesIds } },
        data: { dateRead: new Date() },
      });

      readCount = readMessagesIds.length;

      // notify in the pusher channel so other user knows they're read
      await pusherServer.trigger(
        createChatId(recipientId, userId),
        "messages:read",
        readMessagesIds
      );
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );
    return { messages: messagesToReturn, readCount };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export type Container = "outbox" | "inbox";

const containerToSenderOrRecipientKey: Record<
  "outbox" | "inbox",
  Extract<keyof Message, "senderId"> | Extract<keyof Message, "recipientId">
> = {
  outbox: "senderId",
  inbox: "recipientId",
};

export async function getMessagesByContainer(
  container: string | null,
  cursor?: string,
  limit = 10
): Promise<{ messages: MessageDto[]; nextCursor?: string }> {
  try {
    const userId = await getAuthUserId();

    // not using it in the end...
    // const selector = containerToSenderOrRecipientKey[container];

    // will only retrieve not-deleted messages
    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { created: { lte: new Date(cursor) } } : {}),
      },
      orderBy: { created: "desc" },
      select: messageSelect,
      // by default we'll take 3 messages
      take: limit + 1,
    });

    let nextCursor: string | undefined;
    if (messages.length > limit) {
      // this mutates the array by removing last element, and returning it.
      // So effectively we'll return number of messages that's equal to the limit=2, because
      // we take limit+1. Then the nextCursor will be equal to the last message that we haven't yet returned.
      const nextItem = messages.pop();
      nextCursor = nextItem?.created.toISOString();
    } else {
      nextCursor = undefined;
    }

    const messagesToReturn = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return { messages: messagesToReturn, nextCursor };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// We only want to delete a message if both sender and recipient deleted it. If only one end deletes,
// we just mark it as deleted for that end (recipient or user), and not display that message for them.
export async function deleteMessage(messageId: string, isOutbox: boolean) {
  // TODO - change to an object with ts
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";
  const otherEndSelector = isOutbox ? "recipientDeleted" : "senderDeleted";

  try {
    // const userId = await getAuthUserId();

    // Find message
    const message = await prisma.message.findUnique({
      where: { id: messageId },
      select: {
        senderDeleted: true,
        recipientDeleted: true,
      },
    });

    if (!message) {
      throw new Error("message could not be found");
    }

    if (message[otherEndSelector]) {
      // Delete message
      await prisma.message.delete({ where: { id: messageId } });
      return;
    }

    // Or, update message to not be displayed for that end
    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    // // Check if both sender and recipient deleted, and if so then delete the message
    // // Why after updating the single message we search through all messages???
    // const messagesToDelete = await prisma.message.findMany({
    //   where: {
    //     OR: [
    //       {
    //         senderId: userId,
    //         senderDeleted: true,
    //         recipientDeleted: true,
    //       },
    //       {
    //         recipientId: userId,
    //         senderDeleted: true,
    //         recipientDeleted: true,
    //       },
    //     ],
    //   },
    // });

    // if (messagesToDelete.length > 0) {
    //   await prisma.message.deleteMany({
    //     where: {
    //       OR: messagesToDelete.map((m) => ({ id: m.id })),
    //     },
    //   });
    // }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUnreadMessageCount(): Promise<number> {
  try {
    const userId = await getAuthUserId();

    return prisma.message.count({
      where: {
        recipientId: userId,
        dateRead: null,
        recipientDeleted: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  // the fields we actually wanna get back
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
