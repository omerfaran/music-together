"use client";

import LikeButton from "@/components/LikeButton";
import { PresenceDot } from "@/components/PresenceDot";
import { calculateAge, transformImageUrl } from "@/lib/util";
import { Member } from "@prisma/client";
import Link from "next/link";
import { FC, useState } from "react";
import { toggleLikeMember } from "../actions/likeActions";
import { Card, CardFooter, Image } from "@/components/ui";

export interface MemberCardProps {
  member: Member;
  hasLiked: boolean;
}

const PLACEHOLDER_IMAGE = "/images/user.png";

export const MemberCard: FC<MemberCardProps> = ({
  member,
  hasLiked: initialHasLiked,
}) => {
  const [hasLiked, setHasLiked] = useState(initialHasLiked);
  const [loading, setLoading] = useState(false);

  async function toggleLike() {
    setLoading(true);
    try {
      await toggleLikeMember(member.userId, hasLiked);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card as={Link} href={`/members/${member.userId}`} isPressable fullWidth>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={transformImageUrl(member.image) ?? PLACEHOLDER_IMAGE}
        className="aspect-square object-cover"
      />
      <div
        onClick={(e) => {
          e.preventDefault();
          // we don't need stopPropagation since the outer event (here in Card wrapper) we're preventing is a redirect
          // so preventDefault is enough. If we liked to stop an outer click event we'd need to stop propagation.
          // There might be cases when we do want to use both preventDefault and stopPropagation, for example
          // when both redirecting and doing some event bubbling such as an alert or something...
          // e.stopPropagation()
        }}
      >
        <div className="absolute top-3 right-3 z-50">
          {/* To that LikeButton we pass the id of the current member card (that the user sees out of many), so the LikeButton knows if user
        already likes that person */}
          <LikeButton
            loading={loading}
            toggleLike={toggleLike}
            hasLiked={hasLiked}
          />
        </div>
        <div className="absolute top-2 left-3 z-50">
          <PresenceDot member={member} />
        </div>
      </div>
      <CardFooter className="bg-dark-gradient flex justify-start overflow-hidden absolute bottom-0 z-10">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
