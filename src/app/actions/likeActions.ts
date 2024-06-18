"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { Like, Member } from "@prisma/client";
import { pusherServer } from "@/lib/pusher";

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
      const like = await prisma.like.create({
        // we specify the column sourceUserId, and targetUserId
        // prisma will generate the unique id for the row automatically of course,
        // it's not something we should care about when creating a new relationship row
        data: { sourceUserId: userId, targetUserId },
        select: {
          sourceMember: { select: { name: true, image: true, userId: true } },
        },
      });

      await pusherServer.trigger(`private-${targetUserId}`, "like:new", {
        name: like.sourceMember.name,
        image: like.sourceMember.image,
        userId: like.sourceMember.userId,
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

export type LikeType = "source" | "target" | "mutual";

export async function fetchLikedMembers(type: LikeType = "source") {
  try {
    const userId = await getAuthUserId();
    switch (type) {
      case "source":
        // who our user likes
        return await fetchSourceLikes(userId);
      case "target":
        // who likes our user
        return await fetchTargetLikes(userId);
      case "mutual":
        return await fetchMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// fetch all members that the current user likes
async function fetchSourceLikes(userId: string): Promise<Member[]> {
  const sourceList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember: true,
    },
  });

  return sourceList.map((x) => x.targetMember);
}

// fetch all members that like the current user
async function fetchTargetLikes(userId: string): Promise<Member[]> {
  const targetList = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    select: {
      sourceMember: true,
    },
  });

  return targetList.map((x) => x.sourceMember);
}

// fetch members that the current user likes and that also like the user back
async function fetchMutualLikes(userId: string): Promise<Member[]> {
  // here, as opposed to fetchSourceLikes, we just want the ids (of the users liked by our user), not the whole object
  // of each member
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });

  // getting string array of ids that the user likes
  const likedIds = likedUsers.map((x) => x.targetUserId);

  // now we want to filter out from the likesIds (the ids of users that the user likes), we want to keep only
  // users that like the current user back
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [
        { targetUserId: userId }, // members that likes the user
        { sourceUserId: { in: likedIds } }, // check that our use also likes that member who likes the user
      ],
    },
    select: {
      sourceMember: true,
    },
  });

  return mutualList.map((x) => x.sourceMember);
}
