"use client";

import { MessageDto } from "@/types";
import { FC } from "react";
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import clsx from "clsx";
import { MessageTableCell } from "./MessageTableCell";
import { useMessages } from "@/hooks/useMessages";

interface MessageTableProps {
  initialMessages: MessageDto[];
  nextCursor?: string;
}

export const MessageTable: FC<MessageTableProps> = ({
  initialMessages,
  nextCursor,
}) => {
  const {
    columns,
    isOutbox,
    isDeleting,
    deleteMessage,
    selectRow,
    messages,
    loadMore,
    loadingMore,
    hasMore,
  } = useMessages(initialMessages);

  return (
    <div className="flex flex-col h-[80vh]">
      <Card>
        <Table
          className="flex flex-col gap-3 h-[80vh] overflow-auto"
          aria-label="Table with messages"
          selectionMode="single"
          onRowAction={(key) => selectRow(key)}
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
                    <MessageTableCell
                      item={item}
                      columnKey={columnKey as string}
                      isOutbox={isOutbox}
                      deleteMessage={deleteMessage}
                      isDeleting={
                        isDeleting.loading && isDeleting.id === item.id
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="sticky bottom-0 pb-3 mr-3 text-right">
          <Button
            color="secondary"
            isLoading={loadingMore}
            isDisabled={!hasMore}
            onClick={loadMore}
          >
            {hasMore ? "Load more" : "No more messages"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
