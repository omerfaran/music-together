import { AppModal } from "@/components/AppModal";
import { PresenceAvatar } from "@/components/PresenceAvatar";
import { truncateString } from "@/lib/util";
import { MessageDto } from "@/types";
import { Button, ButtonProps, useDisclosure } from "@nextui-org/react";
import { FC } from "react";
import { AiFillDelete } from "react-icons/ai";

interface MessageTableCellProps {
  item: MessageDto;
  columnKey: string;
  isOutbox: boolean;
  deleteMessage: (message: MessageDto) => void;
  isDeleting: boolean;
}

export const MessageTableCell: FC<MessageTableCellProps> = ({
  item,
  columnKey,
  isOutbox,
  deleteMessage,
  isDeleting,
}) => {
  const cellValue = item[columnKey as keyof MessageDto];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const footerButtons: ButtonProps[] = [
    { color: "default", onClick: onClose, children: "Close" },
    { color: "secondary", onClick: onClose, children: "Submit" },
  ];

  switch (columnKey) {
    // either recipientName or senderName
    case "recipientName":
    case "senderName":
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <PresenceAvatar
            userId={isOutbox ? item.recipientId : item.senderId}
            src={isOutbox ? item.recipientImage : item.senderImage}
          />
          <span>{cellValue}</span>
        </div>
      );

    case "text":
      return <div>{truncateString(cellValue, 80)}</div>;
    case "created":
      return <div>{cellValue}</div>;
    default:
      return (
        <>
          <Button
            onClick={() => onOpen()}
            isLoading={isDeleting}
            isIconOnly
            variant="light"
          >
            <AiFillDelete size={24} className="text-danger" />
          </Button>
          <AppModal
            isOpen={isOpen}
            onClose={onClose}
            header="test modal"
            body={<div>testing</div>}
            footerButtons={footerButtons}
          />
        </>
      );
  }
};
