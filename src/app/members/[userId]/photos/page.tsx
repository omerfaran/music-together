import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import { MemberPhotos } from "@/components/MemberPhotos";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Photo } from "@prisma/client";
import { FC } from "react";

interface PhotosPageProps {
  photos: Photo[];
}

export const PhotosPage: FC<PhotosPageProps> = async ({ photos }) => {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} />
      </CardBody>
    </>
  );
};

export default async function Page({ params }: { params: { userId: string } }) {
  const photos = await getMemberPhotosByUserId(params.userId);

  return <PhotosPage photos={photos ?? []} />;
}
