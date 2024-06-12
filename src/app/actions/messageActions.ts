"use server";

import { MessageSchema, messageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult, MessageDto } from "@/types";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { Message } from "@prisma/client";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageSchema>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { text } = validated.data;
    const message = await prisma.message.create({
      data: { text, recipientId: recipientUserId, senderId: userId },
    });

    return { status: "success", data: message };
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
      select: {
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
      },
    });

    // mark messages as read by user
    if (messages.length) {
      await prisma.message.updateMany({
        where: { senderId: recipientId, recipientId: userId, dateRead: null },
        data: { dateRead: new Date() },
      });
    }

    return messages.map((message) => mapMessageToMessageDto(message));
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
  container: Container
): Promise<MessageDto[]> {
  try {
    const userId = await getAuthUserId();

    // not using it in the end...
    const selector = containerToSenderOrRecipientKey[container];

    // will only retrieve not-deleted messages
    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: { created: "desc" },
      select: {
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
      },
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// We only want to delete a message if both sender and recipient deleted it
export async function deleteMessage(messageId: string, isOutbox: boolean) {
  // TODO - change to an object with ts
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserId();

    // Mark message as deleted by the one chose to delete - sender or recipient
    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    // Check if both sender and recipient deleted, and if so then delete the message
    // Why after updating the single message we search through all messages???
    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
