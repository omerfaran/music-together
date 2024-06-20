"use client";

import { useFilters } from "@/hooks/useFilters";
import { Button, Select, SelectItem, Slider, Spinner } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const Filters = () => {
  const pathname = usePathname();
  const {
    genderList,
    orderByList,
    filters,
    selectAge,
    selectGender,
    selectOrder,
    isPending,
  } = useFilters();

  if (pathname !== "/members") {
    return null;
  }

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
        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            placeholder="Order by"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map(({ value, label }) => {
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};
