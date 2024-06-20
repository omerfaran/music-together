"use client";

import { FC } from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

interface ImageUploadButtonProps {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
}

export const ImageUploadButton: FC<ImageUploadButtonProps> = ({
  onUploadImage,
}) => {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="nm-demo"
      className="flex items-center gap-2 border-secondary border-2 text-secondary rounded-lg py-2 px-4 hover:bg-secondary/10"
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  );
};
