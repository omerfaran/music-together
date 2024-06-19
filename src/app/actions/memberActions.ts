"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserFilters } from "@/types";
import { Member, Photo } from "@prisma/client";
import { addYears } from "date-fns";
import { getAuthUserId } from "./authActions";

export async function getMembers(searchParams: UserFilters) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const ageRange = searchParams?.ageRange?.toString()?.split(",") || [18, 100];
  const currentDate = new Date();
  // These are the oldest, we take the higher age, and calculate date of birth
  const minDateOfBirth = addYears(currentDate, -ageRange[1] - 1);

  const maxDateOfBirth = addYears(currentDate, -ageRange[0]);

  const orderBySelector = searchParams.orderBy || "updated";

  const selectedGender = searchParams?.gender?.toString()?.split(",") || [
    "male",
    "female",
  ];

  try {
    return prisma.member.findMany({
      where: {
        AND: [
          { dateOfBirth: { gte: minDateOfBirth } },
          { dateOfBirth: { lte: maxDateOfBirth } },
          // selectedGender is an array with either of the options male or female or both
          { gender: { in: selectedGender } },
        ],
        NOT: {
          // return all members except for the current logged in one
          userId: session.user.id,
        },
      },
      orderBy: { [orderBySelector]: "desc" },
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

export async function updateLastActive(): Promise<void> {
  const userId = await getAuthUserId();

  try {
    prisma.member.update({
      where: {
        userId,
      },
      data: {
        updated: new Date(),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
