"use client";

import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { useRole } from "@/hooks/useRole";
import { useDisclosure } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import clsx from "clsx";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { AppModal } from "./AppModal";
import { Button, Image } from "./ui";
import { PLACEHOLDER_IMAGE } from "@/constants";

interface MemberImageProps {
  photo: Photo | null;
}

export const MemberImage: FC<MemberImageProps> = ({ photo }) => {
  const role = useRole();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO - kinda redundant ?
  if (!photo) {
    return null;
  }

  const approve = async (photoId: string) => {
    // TODO - as usual this shouldn't be here
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong"
      );
    }
  };

  const reject = async (photos: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong"
      );
    }
  };

  return (
    <div className="cursor-pointer" onClick={onOpen}>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved && role !== "ADMIN",
          })}
          priority
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url ?? PLACEHOLDER_IMAGE}
          alt="User image"
        />
      )}
      {!photo?.isApproved && role !== "ADMIN" && (
        <div className="absolute bottom-2 w-full bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}
      {role === "ADMIN" && (
        <div className="flex flex-row gap-2 mt-2">
          <Button
            onClick={() => approve(photo.id)}
            color="success"
            variant="bordered"
            fullWidth
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onClick={() => reject(photo)}
            color="danger"
            variant="bordered"
            fullWidth
          >
            <ImCross size={20} />
          </Button>
        </div>
      )}
      <AppModal
        imageModal
        isOpen={isOpen}
        onClose={onClose}
        body={
          <>
            {photo?.publicId ? (
              <CldImage
                alt="Image of member"
                src={photo.publicId}
                width={750}
                height={750}
                className={clsx("rounded-2xl", {
                  "opacity-40": !photo.isApproved && role !== "ADMIN",
                })}
                priority
              />
            ) : (
              <Image
                width={750}
                height={750}
                src={photo?.url ?? PLACEHOLDER_IMAGE}
                alt="User image"
              />
            )}
          </>
        }
      />
    </div>
  );
};
