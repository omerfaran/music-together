"use client";

import React, { FC, useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { MemberImage } from "./MemberImage";
import { StarButton } from "./StarButton";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { setMainImage } from "@/app/actions/userActions";

interface MemberPhotosProps {
  photos: Photo[];
  /**
   * Display editing buttons? Should be displayed when editing own profile, not when viewing other's
   * @default false
   */
  editing?: boolean;
  mainImageUrl?: string | null;
}

export const MemberPhotos: FC<MemberPhotosProps> = ({
  photos,
  editing = false,
  mainImageUrl,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  // TODO - outsource this function, and the loading state and all that, to another function here,
  // Could be also a store or whatever
  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) {
      return null;
    }

    setLoading({ isLoading: true, id: photo.id, type: "main" });
    await setMainImage(photo);
    router.refresh();
    setLoading({ isLoading: false, id: "", type: "" });
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos.map((photo) => {
        return (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
