import { AppModal } from "@/components/AppModal";
import { PresenceAvatar } from "@/components/PresenceAvatar";
import { Button } from "@/components/ui/Button/Button";
import { truncateString } from "@/lib/util";
import { MessageDto } from "@/types";
import { ButtonProps, useDisclosure } from "@nextui-org/react";
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

  const onConfirmDeleteMessage = () => {
    deleteMessage(item);
  };

  const footerButtons: ButtonProps[] = [
    { color: "default", onClick: onClose, children: "Cancel" },
    {
      color: "secondary",
      onClick: onConfirmDeleteMessage,
      children: "Confirm",
    },
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
            header="Please confirm this action"
            body={<div>Are you sure you want to delete this message?</div>}
            footerButtons={footerButtons}
          />
        </>
      );
  }
};
