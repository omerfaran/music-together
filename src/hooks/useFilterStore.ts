import { UserFilters } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type FilterState = {
  filters: UserFilters;
  setFilters: (
    filterName: keyof FilterState["filters"],
    // TODO - type unknown or any isn't great, why not just create a setter fo each option?
    value: unknown
  ) => void;
};

const useFilterStore = create<FilterState>()(
  devtools((set) => ({
    filters: {
      ageRange: [18, 100],
      gender: ["male", "female"],
      orderBy: "updated",
    },
    setFilters: (filterName, value) =>
      set((state) => {
        return { filters: { ...state.filters, [filterName]: value } };
      }),
  }))
);

export default useFilterStore;
