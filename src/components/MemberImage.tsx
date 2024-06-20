"use client";

import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

interface MemberImageProps {
  photo: Photo | null;
}

export const MemberImage: FC<MemberImageProps> = ({ photo }) => {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className="rounded-2xl"
          priority
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url ?? "/images/user.png"}
          alt="User image"
        />
      )}
    </div>
  );
};
