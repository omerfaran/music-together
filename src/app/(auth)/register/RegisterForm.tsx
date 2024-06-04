"use client";

import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { handleFormServerErrors } from "@/lib/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === "success") {
      return console.log("user registered successfully");
    }

    // this is a helper function to set the handle and set the form errors,
    // we pass the setError of the react form hook, and it sets the current errors
    // for us
    handleFormServerErrors(result, setError);
  };

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500 whitespace-nowrap">
            Welcome to NextMatch
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors?.name?.message}
              label="Name"
              variant="bordered"
            />
            <Input
              // The defaultValue="" here is to make sure the component isn't treated as controlled, we want it uncontrolled
              defaultValue=""
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors?.email?.message}
              label="Email"
              type="email"
              variant="bordered"
            />
            <Input
              defaultValue=""
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors?.password?.message}
              label="Password"
              variant="bordered"
              type="password"
            />
            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <Button
              isDisabled={!isValid}
              isLoading={isSubmitting}
              type="submit"
              fullWidth
              color="secondary"
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
