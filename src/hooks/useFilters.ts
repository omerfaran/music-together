import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { FaMale, FaFemale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect } from "react";
import { type Selection } from "@nextui-org/react";

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams1 = useSearchParams();
  const router = useRouter();

  const { filters, setFilters } = useFilterStore((state) => ({
    filters: state.filters,
    setFilters: state.setFilters,
  }));

  const { gender, ageRange, orderBy } = filters;

  useEffect(() => {
    // this loads on the first time then it sets params by default in store, so everything is overwritten
    const searchParams = new URLSearchParams(searchParams1);

    if (gender) {
      // I think join(",") is the same as toString() in an array
      console.log(searchParams.get("gender"), "haveri");
      searchParams.set("gender", gender.join(","));
    }

    if (ageRange) {
      searchParams.set("ageRange", ageRange.toString());
    }
    if (orderBy) {
      searchParams.set("orderBy", orderBy);
    }

    router.replace(`${pathname}?${searchParams}`);
  }, [gender, ageRange, orderBy, pathname, router, searchParams1]);

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList: { value: "male" | "female"; icon: IconType }[] = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    setFilters("ageRange", value);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      // The expression value.values().next().value, is for getting first element
      // in the set
      setFilters("orderBy", value.values().next().value);
    }
  };

  const handleGenderSelect = (value: "male" | "female") => {
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
  };

  return {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    filters,
  };
};
