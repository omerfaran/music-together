import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PresenceState = {
  members: string[]; // User ids of people connected to our app
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
};

// the devtools here is just additional thing for dev tools use.
// the set argument two lines below isn't related to the set prop in PresenceState
export const usePresenceStore = create<PresenceState>()(
  devtools(
    (set) => ({
      members: [],
      add: (id) => set((state) => ({ members: [...state.members, id] })),
      remove: (id) =>
        set((state) => ({
          members: state.members.filter((member) => member !== id),
        })),
      set: (ids) => set({ members: ids }),
    }),
    { name: "PresenceStore" }
  )
);
