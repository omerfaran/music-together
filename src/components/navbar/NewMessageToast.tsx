import { transformImageUrl } from "@/lib/util";
import { MessageDto } from "@/types";
import Link from "next/link";
import { FC } from "react";
import { Image } from "../ui";

interface NewMessageToastProps {
  message: MessageDto;
}

export const NewMessageToast: FC<NewMessageToastProps> = ({ message }) => {
  return (
    <Link
      href={`/members/${message.senderId}/chat`}
      className="flex items-center"
    >
      <div className="mr-2">
        <Image
          src={transformImageUrl(message.senderImage) || "/images/user.png"}
          alt="Sender image"
          height={50}
          width={50}
        />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <div className="font-semibold">
          {message.senderName} sent you a message
        </div>
        <div className="text-sm">Click to view</div>
      </div>
    </Link>
  );
};
