"use client";

import { Select, Input, Textarea } from "@/components/ui";
import { format, subYears } from "date-fns";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface ProfileFormProps {}

export const ProfileForm: FC<ProfileFormProps> = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const genderList = [
    { label: "Male", value: "m" },
    { label: "Female", value: "f" },
  ];

  return (
    <div className="space-y-4">
      <Select
        items={genderList}
        defaultSelectedKeys={getValues("gender")}
        aria-label="Select gender"
        {...register("gender")}
        isInvalid={!!errors.gender}
        errorMessage={errors?.gender?.message?.toString()}
        label="Gender"
        variant="bordered"
        onChange={(e) => {
          setValue("gender", e.target.value);
        }}
      />
      <Input
        defaultValue={getValues("dateOfBirth")}
        {...register("dateOfBirth")}
        isInvalid={!!errors.dateOfBirth}
        max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
        errorMessage={errors?.dateOfBirth?.message?.toString()}
        label="Date of birth"
        type="date"
        variant="bordered"
      />
      <Textarea
        defaultValue={getValues("description")}
        {...register("description")}
        isInvalid={!!errors.description}
        errorMessage={errors?.description?.message?.toString()}
        label="Description"
        variant="bordered"
      />
      <Input
        defaultValue={getValues("city")}
        {...register("city")}
        isInvalid={!!errors.city}
        errorMessage={errors?.city?.message?.toString()}
        label="City"
        variant="bordered"
      />
      <Input
        defaultValue={getValues("country")}
        {...register("country")}
        isInvalid={!!errors.country}
        errorMessage={errors?.country?.message?.toString()}
        label="Country"
        variant="bordered"
      />
    </div>
  );
};
