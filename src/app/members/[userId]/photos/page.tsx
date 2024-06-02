import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import React, { FC } from "react";

interface PhotosPageProps {
  photos: Photo[] | null;
}

export const PhotosPage: FC<PhotosPageProps> = async ({ photos }) => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3">
          {photos?.map((photo) => {
            return (
              <div key={photo.id}>
                <Image
                  width={300}
                  height={300}
                  src={photo.url}
                  alt="Image of member"
                  className="object-cover aspect-square"
                />
              </div>
            );
          })}
        </div>
      </CardBody>
    </>
  );
};

export default async function Page({ params }: { params: { userId: string } }) {
  const photos = await getMemberPhotosByUserId(params.userId);

  return <PhotosPage photos={photos} />;
}
