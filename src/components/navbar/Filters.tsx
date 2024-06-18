"use client";

import {
  Button,
  Select,
  SelectItem,
  type Selection,
  Slider,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

export const Filters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genders = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (value: number[]) => {
    // TODO - all those URL manipulations should be either in a store, or second best is a hook
    const params = new URLSearchParams(searchParams);
    params.set("ageRange", value.join(","));
    router.replace(`${pathname}?${params}`);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      const params = new URLSearchParams(searchParams);
      // The Selection type here can be a js set
      params.set("orderBy", value.values().next().value);
      router.replace(`${pathname}?${params}`);
    }
  };

  if (pathname !== "/members") {
    return null;
  }

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-grow justify-around items-center">
        <div className="text-secondary font-semibold text-xl">Results: 10</div>
        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genders.map(({ icon: Icon, value }) => {
            return (
              <Button key={value} size="sm" isIconOnly color="secondary">
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
            defaultValue={[18, 100]}
            onChangeEnd={(value) => handleAgeSelect(value as number[])}
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
            selectedKeys={new Set([searchParams.get("orderBy") || "updated"])}
            onSelectionChange={handleOrderSelect}
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
