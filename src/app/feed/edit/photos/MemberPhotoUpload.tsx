"use client";

import { addImage } from "@/app/actions/userActions";
import { ImageUploadButton } from "@/components/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "react-toastify";

interface MemberPhotoUploadProps {}

export const MemberPhotoUpload: FC<MemberPhotoUploadProps> = () => {
  const router = useRouter();

  const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info === "object") {
      await addImage(result.info.secure_url, result.info.public_id);
      router.refresh();
    } else {
      toast.error("Problem adding image");
    }
  };

  return <ImageUploadButton onUploadImage={onAddImage} />;
};
