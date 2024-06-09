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
          },
          {
            // The opposite, messages that were sent to current users
            senderId: recipientId,
            recipientId: userId,
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

    const selector = containerToSenderOrRecipientKey[container];

    const messages = await prisma.message.findMany({
      where: { [selector]: userId },
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
