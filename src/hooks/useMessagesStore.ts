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
  resetMessages: () => void;
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
      resetMessages: () => set({ messages: [] }),
      set: (messages) =>
        set((state) => {
          // He does it for dev only, he thinks that hot module reloading can cause duplicate messages,
          // so he uses map to make sure there're no duplicates
          const map = new Map(
            [...state.messages, ...messages].map((m) => [m.id, m])
          );
          const uniqueMessages = Array.from(map.values());
          return { messages: uniqueMessages };
        }),
      updateUnreadCount: (count) =>
        set((state) => ({ unreadCount: state.unreadCount + count })),
    }),

    { name: "messagesStoreDemo" }
  )
);
