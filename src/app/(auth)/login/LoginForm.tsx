"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500 whitespace-nowrap">
            Welcome back to NextMatch
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              // The defaultValue="" here is to make sure the component isn't treated as controlled, we want it uncontrolled
              defaultValue=""
              {...register("email", { required: "Email is required" })}
              isInvalid={!!errors.email}
              errorMessage={errors?.email?.message}
              label="Email"
              type="email"
              variant="bordered"
            />
            <Input
              defaultValue=""
              {...register("password", { required: "Password is required" })}
              isInvalid={!!errors.password}
              errorMessage={errors?.password?.message}
              label="Password"
              variant="bordered"
              type="password"
            />
            <Button
              //   isDisabled={!isValid}
              type="submit"
              fullWidth
              color="secondary"
            >
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
