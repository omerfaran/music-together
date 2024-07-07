"use client";

import { useFilters } from "@/hooks/useFilters";
import { usePathname } from "next/navigation";
import { Switch, Spinner, Slider, Button, Select } from "../../ui";
import { ChangeEvent, FC } from "react";
import { IconType } from "react-icons";
import { UserFilters, ValueAndLabel } from "@/types";
import { type Selection } from "@nextui-org/react";

interface FilterProps {
  orderByList: Array<ValueAndLabel>;
  genderList: { value: "male" | "female"; icon: IconType }[];
  filters: UserFilters;
  selectAge: (value: number[]) => void;
  selectGender: (value: "male" | "female") => void;
  selectOrder: (value: Selection) => void;
  isPending: boolean;
  selectWithPhoto: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FiltersPure: FC<FilterProps> = ({
  orderByList,
  genderList,
  filters,
  selectAge,
  selectGender,
  selectOrder,
  isPending,
  selectWithPhoto,
}) => {
  return (
    <div className="shadow-md py-2">
      <div className="flex flex-grow justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-secondary font-semibold text-xl">
            Results: 10
          </div>
          {isPending && <Spinner size="sm" color="secondary" />}
        </div>
        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => {
            return (
              <Button
                key={value}
                size="sm"
                isIconOnly
                color={filters.gender.includes(value) ? "secondary" : "default"}
                onClick={() => selectGender(value)}
              >
                <Icon size={24} />
              </Button>
            );
          })}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            label="Age range"
            color="secondary"
            size="sm"
            minValue={18}
            maxValue={100}
            defaultValue={filters.ageRange}
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">With photo</p>
          <Switch
            color="secondary"
            defaultSelected
            size="sm"
            onChange={selectWithPhoto}
          />
        </div>
        <div className="w-1/4">
          <Select
            items={orderByList}
            size="sm"
            fullWidth
            placeholder="Order by"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
          />
        </div>
      </div>
    </div>
  );
};

export const Filters = () => {
  const filters = useFilters();

  const pathname = usePathname();
  if (pathname !== "/members") {
    return null;
  }

  return <FiltersPure {...filters} />;
};
