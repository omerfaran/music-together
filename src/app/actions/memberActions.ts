"use server";

import { prisma } from "@/lib/prisma";
import { GetMembersParams, PaginatedResponse, UserFilters } from "@/types";
import { JobPost, Member, Photo } from "@prisma/client";
import { addYears } from "date-fns";
import { getAuthUserId } from "./authActions";

export async function getJobPosts(): Promise<
  PaginatedResponse<
    Pick<Member, "name" | "image" | "userId"> & {
      jobPosts: Array<
        Pick<JobPost, "photoUrl" | "title" | "description" | "id">
      >;
    }
  >
> {
  const userId = await getAuthUserId();

  try {
    const members = await prisma.member.findMany({
      where: {
        jobPosts: {
          some: {},
        },
      },
      select: {
        name: true,
        image: true,
        userId: true,
        jobPosts: {
          select: {
            id: true,
            photoUrl: true,
            title: true,
            description: true,
          },
        },
      },
    });

    // const flattenedJobPosts = members.flatMap((member) =>
    //   member.jobPosts.map((jobPost) => ({
    //     name: member.name,
    //     image: member.image,
    //     ...jobPost,
    //   }))
    // );

    return { items: members, totalCount: 0 };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMembers({
  ageRange = "18,100",
  gender = "male,female",
  orderBy = "updated",
  pageNumber = "1",
  pageSize = "12",
  withPhoto = "true",
}: GetMembersParams): Promise<PaginatedResponse<Member>> {
  const userId = await getAuthUserId();

  const [minAge, maxAge] = ageRange.split(",");
  const currentDate = new Date();
  // These are the oldest, we take the higher age, and calculate date of birth
  const minDateOfBirth = addYears(currentDate, -maxAge - 1);

  const maxDateOfBirth = addYears(currentDate, -minAge);

  const selectedGender = gender.split(",");

  const page = parseInt(pageNumber);
  const limit = parseInt(pageSize);

  const skip = (page - 1) * limit;

  try {
    const where = {
      AND: [
        { dateOfBirth: { gte: minDateOfBirth } },
        { dateOfBirth: { lte: maxDateOfBirth } },
        // selectedGender is an array with either of the options male or female or both
        { gender: { in: selectedGender } },
        withPhoto === "true" ? { image: { not: null } } : {},
      ],
      NOT: {
        // return all members except for the current logged in one
        userId,
      },
    };

    const count = await prisma.member.count({
      where,
    });

    const members = await prisma.member.findMany({
      where,
      orderBy: { [orderBy]: "desc" },
      skip,
      take: limit,
    });

    return { items: members, totalCount: count };
  } catch (error) {
    console.log(error);
    throw error;
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
  const currentUserId = await getAuthUserId();

  const member = await prisma.member.findUnique({
    where: { userId },
    select: {
      photos: {
        // if user shows own photos, then get everything (filter nothing),
        // otherwise (if other users look at another profile), show
        // only approved photos
        where: currentUserId === userId ? {} : { isApproved: true },
      },
    },
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
