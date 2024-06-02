"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { Like } from "@prisma/client";

// function to like a certain member by current member, or unlike them if
// that other member is already liked
export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const userId = await getAuthUserId();

    // if the user likes a member, remove the like, if not then add like
    if (isLiked) {
      // user likes the member, delete it
      await prisma.like.delete({
        where: {
          // in the Like table, we search for the combination of the user and
          // the member that he likes.
          // Remember that in the schema, we defined the id as:
          // @@id([sourceUserId, targetUserId])
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
    } else {
      // use doesn't like the other user yet, let's add that like
      await prisma.like.create({
        data: {
          // we specify the column sourceUserId, and targetUserId
          // prisma will generate the unique id for the row automatically of course,
          // it's not something we should care about when creating a new relationship row
          sourceUserId: userId,
          targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error; // we re-throw the error, because we now have the error.tsx
    // component to display errors
  }
}

// get all the members that current user likes
export async function fetchCurrentUserLikeIds(): Promise<
  Like["targetUserId"][] | null
> {
  try {
    const userId = await getAuthUserId();

    const likeIds = await prisma.like.findMany({
      where: { sourceUserId: userId },
      // we just want the targetUserId, so we'll now get an array of those
      select: { targetUserId: true },
    });

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
