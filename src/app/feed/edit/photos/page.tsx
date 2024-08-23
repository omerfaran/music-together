import { getAuthUserId } from "@/app/actions/authActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions";
import { Member, Photo } from "@prisma/client";
import { FC } from "react";
import { MemberPhotoUpload } from "./MemberPhotoUpload";
import { MemberPhotos } from "@/components/MemberPhotos";
import { CardBody, CardHeader } from "@/components/ui";
import { Divider } from "@/components/ui";

interface PhotosPageProps {
  photos: Photo[];
  mainImageUrl?: Member["image"];
}

const PhotosPage: FC<PhotosPageProps> = ({ photos, mainImageUrl }) => {
  return (
    <>
      <CardHeader className="flex justify-between items-center">
        <div className="text-2xl font-semibold text-secondary">
          Edit Profile
        </div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos photos={photos} editing mainImageUrl={mainImageUrl} />
      </CardBody>
    </>
  );
};

export default async function Page() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return <PhotosPage photos={photos ?? []} mainImageUrl={member?.image} />;
}
