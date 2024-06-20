import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { FaMale, FaFemale } from "react-icons/fa";
import useFilterStore from "./useFilterStore";
import { useEffect, useTransition } from "react";
import { type Selection } from "@nextui-org/react";

export const useFilters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { filters, setFilters } = useFilterStore((state) => ({
    filters: state.filters,
    setFilters: state.setFilters,
  }));

  const { gender, ageRange, orderBy } = filters;

  useEffect(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);

      if (params.get("gender")) {
        setFilters("gender", params.get("gender")?.split(","));
      }

      if (ageRange) {
        params.set("ageRange", ageRange.toString());
      }
      if (orderBy) {
        params.set("orderBy", orderBy);
      }
    });

    // this loads on the first time then it sets params by default in store, so everything is overwritten

    // TODO - do this not just for gender but for everything !!

    // router.replace(`${pathname}?${searchParams}`);
  }, []);

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
    const newGender = gender.includes(value)
      ? gender.filter((g) => g !== value)
      : [...gender, value];

    setFilters("gender", newGender);
    const params = new URLSearchParams(searchParams);
    params.set("gender", newGender.join(","));
    router.replace(`${pathname}?${params}`);
  };

  return {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderSelect,
    filters,
    // TODO - isPending is for the transition, can we have it outside this hook?
    isPending,
  };
};
