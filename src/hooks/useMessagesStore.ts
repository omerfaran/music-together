import { MessageDto } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type MessageState = {
  messages: MessageDto[];
  unreadCount: number;
  add: (message: MessageDto) => void;
  remove: (id: MessageDto["id"]) => void;
  set: (messages: MessageDto[]) => void;
  updateUnreadCount: (count: number) => void;
};

export const useMessagesStore = create<MessageState>()(
  devtools(
    (set) => ({
      messages: [],
      unreadCount: 0,
      add: (message) =>
        set((state) => ({ messages: [message, ...state.messages] })),
      remove: (id) =>
        set((state) => ({
          messages: state.messages.filter((m) => m.id !== id),
        })),
      set: (messages) => set({ messages }),
      updateUnreadCount: (count) =>
        set((state) => ({ unreadCount: state.unreadCount + count })),
    }),
    { name: "messagesStoreDemo" }
  )
);
