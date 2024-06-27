import { TokenType } from "@prisma/client";
import { randomBytes } from "crypto";
import { prisma } from "./prisma";

export async function getTokenByEmail(email: string) {
  try {
    return prisma.token.findFirst({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteToken(id: string) {
  try {
    return prisma.token.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function generateToken(email: string, type: TokenType) {
  // Alex does it with a dedicated lib, while this is node stack lib
  const token = randomBytes(48).toString("hex");
  // 24 hours from now
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  try {
    const existingToken = await getTokenByEmail(email);
    if (existingToken) {
      await deleteToken(existingToken.id);
    }

    return prisma.token.create({
      data: {
        email,
        token,
        expires,
        type,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
