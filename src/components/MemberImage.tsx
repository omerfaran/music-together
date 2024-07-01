"use client";

import { Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import clsx from "clsx";
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
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved,
          })}
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
      {!photo?.isApproved && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}
    </div>
  );
};
