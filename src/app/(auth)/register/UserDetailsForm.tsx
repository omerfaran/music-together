"use client";

import { Input } from "@/components/ui";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface UserDetailsFormProps {}

export const UserDetailsForm: FC<UserDetailsFormProps> = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-4">
      <Input
        defaultValue=""
        {...register("name")}
        isInvalid={!!errors.name}
        errorMessage={errors?.name?.message?.toString()}
        label="Name"
        variant="bordered"
      />
      <Input
        // The defaultValue="" here is to make sure the component isn't treated as controlled, we want it uncontrolled
        defaultValue=""
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors?.email?.message?.toString()}
        label="Email"
        type="email"
        variant="bordered"
      />
      <Input
        defaultValue=""
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors?.password?.message?.toString()}
        label="Password"
        variant="bordered"
        type="password"
      />
    </div>
  );
};
