import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import React, { FC } from "react";

interface PhotosPageProps {
  photos: Photo[];
}

const PhotosPage: FC<PhotosPageProps> = ({ photos }) => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos.map((photo) => {
            return (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt="User image"
                />
              </div>
            );
          })}
        </div>
      </CardBody>
    </>
  );
};

export default async function Page() {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);

  return <PhotosPage photos={photos ?? []} />;
}
