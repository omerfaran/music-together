"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Member, Photo, User } from "@prisma/client";

export async function getMembers() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          // return all members except for the current logged in one
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberByUserId(
  userId: string
): Promise<Member | null> {
  try {
    return prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMemberPhotosByUserId(
  userId: string
): Promise<Photo[] | null> {
  const member = await prisma.member.findUnique({
    where: { userId },
    select: { photos: true },
  });

  if (!member) {
    return null;
  }

  return member.photos;
}
