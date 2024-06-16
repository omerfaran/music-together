"use client";

import { MessageDto } from "@/types";
import React, { Key, useCallback, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AiFillDelete } from "react-icons/ai";
import { deleteMessage } from "../actions/messageActions";
import { truncateString } from "@/lib/util";
import { PresenceAvatar } from "@/components/PresenceAvatar";

export function MessageTable({ messages }: { messages: MessageDto[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isOutbox = searchParams.get("container") === "outbox";

  const [isDeleting, setIsDeleting] = useState({ id: "", loading: false });

  const columns = [
    {
      key: isOutbox ? "recipientName" : "senderName",
      label: isOutbox ? "Recipient" : "Sender",
    },
    { key: "text", label: "Message" },
    { key: "created", label: isOutbox ? "Date sent" : "Date received" },
    { key: "actions", label: "Actions" },
  ];

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setIsDeleting({ id: message.id, loading: true });
      await deleteMessage(message.id, isOutbox);
      router.refresh();
      setIsDeleting({ id: "", loading: false });
    },
    [isOutbox, router]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}/chat`
      : `/members/${message?.senderId}/chat`;

    router.push(url);
  };

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      const cellValue = item[columnKey];

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
          return cellValue;
        default:
          return (
            <Button
              onClick={() => handleDeleteMessage(item)}
              isLoading={isDeleting.id === item.id && isDeleting.loading}
              isIconOnly
              variant="light"
            >
              <AiFillDelete size={24} className="text-danger" />
            </Button>
          );
      }
    },
    [isOutbox, isDeleting.id, isDeleting.loading, handleDeleteMessage]
  );

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Table with messages"
        selectionMode="single"
        onRowAction={(key) => handleRowSelect(key)}
        shadow="none"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              width={column.key === "text" ? "50%" : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent="No messages for this container"
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell
                  className={clsx({
                    "font-semibold": item.dateRead && !isOutbox,
                  })}
                >
                  {renderCell(item, columnKey as keyof MessageDto)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
