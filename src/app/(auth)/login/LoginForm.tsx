"use client";

import { signInUser } from "@/app/actions/authActions";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { toast } from "react-toastify";
import { SocialLogin } from "./SocialLogin";
import { Button } from "@/components/ui/Button/Button";

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);
    if (result.status === "error") {
      return toast.error(result.error as string);
    }

    router.replace("/members");
    router.refresh();
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
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              type="submit"
              fullWidth
              color="secondary"
            >
              Login
            </Button>
            <SocialLogin />
            <div className="flex justify-center hover:underline text-sm">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
