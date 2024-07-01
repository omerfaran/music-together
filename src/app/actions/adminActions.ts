"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";
import { Photo } from "@prisma/client";
import { cloudinary } from "@/lib/cloudinary";

export async function getUnapprovedPhotos() {
  try {
    const role = await getUserRole();

    if (role !== "ADMIN") {
      throw new Error("Forbidden");
    }

    return prisma.photo.findMany({ where: { isApproved: false } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function approvePhoto(photoId: string) {
  try {
    const role = await getUserRole();
    if (role !== "ADMIN") {
      throw new Error("Forbidden");
    }

    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      // We get the photo to approve but then also get the related
      // user and member on the fly. We do that in case we also want
      // to set that photo as the main photo of that user
      include: { member: { include: { user: true } } },
    });

    if (!photo || !photo.member || !photo?.member.user) {
      throw new Error("Cannot approve this image");
    }

    const { member } = photo;

    // if user has no image, we'll set the current approved one as
    // their main image, otherwise the empty object won't do anything.
    // All the complicated extra functionality here is for a case of setting main image
    const userUpdate =
      member.user && member.user.image === null ? { image: photo.url } : {};

    const memberUpdate = member.image === null ? { image: photo.url } : {};

    const shouldUpdateUser = Object.keys(userUpdate).length;
    if (shouldUpdateUser) {
      await prisma.user.update({
        where: { id: member.userId },
        data: userUpdate,
      });
    }

    return prisma.member.update({
      where: { id: member.id },
      data: {
        ...memberUpdate,
        photos: {
          update: { where: { id: photo.id }, data: { isApproved: true } },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function rejectPhoto(photo: Photo) {
  try {
    const role = await getUserRole();

    if (role !== "ADMIN") {
      throw new Error("Forbidden");
    }

    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId);
    }

    return prisma.photo.delete({ where: { id: photo.id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
