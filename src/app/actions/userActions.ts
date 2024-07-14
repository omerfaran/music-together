"use server";

import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "./authActions";
import { prisma } from "@/lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { JobPostSchema } from "@/lib/schemas/jobPostSchema";

export async function updateMemberProfile(
  data: MemberEditSchema
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserId();

    const validated = memberEditSchema.safeParse(data);
    if (!validated.success) {
      return {
        status: "error",
        error: validated.error.errors,
      };
    }

    const { name, description, city, country } = validated.data;

    const member = await prisma.member.update({
      where: {
        userId,
      },
      data: { name, description, city, country },
    });
    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function addJobPost(data: JobPostSchema): Promise<Member | null> {
  const { title, photo, description, expertise, instrument } = data;
  try {
    const userId = await getAuthUserId();

    return prisma.member.update({
      where: { userId },
      data: {
        jobPosts: {
          create: [
            {
              title,
              description,
              expertise,
              instrument,
              photoUrl: photo,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function addImage(
  url: string,
  publicId: string
): Promise<Member | null> {
  try {
    const userId = await getAuthUserId();

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: [
            {
              url,
              publicId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo): Promise<Member | null> {
  if (!photo.isApproved) {
    // This will be toasted so it's good user experience, but those texts shouldn't be
    // here
    throw new Error("Only approved photos can be set to main image");
  }
  try {
    const userId = await getAuthUserId();

    await prisma.user.update({
      where: { id: userId },
      data: {
        image: photo.url,
      },
    });

    return prisma.member.update({
      where: { userId },
      data: { image: photo.url },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteImage(photo: Photo): Promise<Member | null> {
  try {
    const userId = await getAuthUserId();

    // image is on cloudinary as well, delete from their cloud
    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: { id: photo.id },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
