"use client";

import { signInUser } from "@/app/actions/authActions";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGuitar } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardBody, CardHeader } from "@/components/ui";
// TODO - use our Input, not next ui input directly
import { Input } from "@nextui-org/react";
import { FC } from "react";
import { JobPostSchema, jobPostSchema } from "@/lib/schemas/jobPostSchema";

interface JobPostFormProps {
  onFormSubmit: (data: JobPostSchema) => Promise<void>;
}

export const JobPostFormPure: FC<JobPostFormProps> = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<JobPostSchema>({
    resolver: zodResolver(jobPostSchema),
    mode: "onTouched",
  });

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <FaGuitar size={30} />
            <h1 className="text-3xl font-semibold">Create a new job</h1>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              {...register("title")}
              isInvalid={!!errors.title}
              errorMessage={errors?.title?.message}
              label="Title"
              variant="bordered"
            />
            <Input
              defaultValue=""
              {...register("expertise")}
              isInvalid={!!errors.expertise}
              errorMessage={errors?.expertise?.message}
              label="Expertise"
              variant="bordered"
            />
            <Input
              defaultValue=""
              {...register("description")}
              isInvalid={!!errors.description}
              errorMessage={errors?.description?.message}
              label="Description"
              variant="bordered"
            />
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              type="submit"
              fullWidth
              color="secondary"
            >
              Create
            </Button>
            {/* <div className="flex justify-center hover:underline text-sm">
              <Link href="/forgot-password">Forgot password?</Link>
            </div> */}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

const Observed = JobPostFormPure;

export const JobPostForm = () => {
  const router = useRouter();

  const onSubmit = async (data: JobPostSchema) => {
    // FIX
    const result = await signInUser(data);
    if (result.status === "error") {
      toast.error(result.error as string);
      return;
    }

    router.replace("/members");
    router.refresh();
  };

  return <Observed onFormSubmit={onSubmit} />;
};
