"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGuitar } from "react-icons/fa";
import { Button } from "@/components/ui/Button/Button";
import { Card, CardBody, CardHeader, Image } from "@/components/ui";
// TODO - use our Input and Textarea, not next ui input directly.
// Using them directly as validation doesn't work well

import { Input, Textarea } from "@nextui-org/react";
import { FC } from "react";
import { JobPostSchema, jobPostSchema } from "@/lib/schemas/jobPostSchema";
import { ValueAndLabel } from "@/types";
import { ImageUploadButton } from "../ImageUploadButton";
import { addJobPost } from "@/app/actions/userActions";

interface JobPostFormProps {
  onFormSubmit: (data: JobPostSchema) => Promise<void>;
  instruments: ValueAndLabel[];
}

export const JobPostFormPure: FC<JobPostFormProps> = ({
  onFormSubmit,
  instruments,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<JobPostSchema>({
    resolver: zodResolver(jobPostSchema),
    mode: "onTouched",
  });

  const updatedPhoto = watch("photo", "");

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
              placeholder="e.g. Bass player required!"
              {...register("title")}
              isInvalid={!!errors.title}
              errorMessage={errors?.title?.message}
              label="Title"
              variant="bordered"
            />
            <Textarea
              defaultValue={getValues("description")}
              placeholder="e.g. Looking for a skilled bass player full time"
              minRows={5}
              {...register("description")}
              isInvalid={!!errors.description}
              errorMessage={errors?.description?.message}
              label="Description"
              variant="bordered"
            />
            {/* <Autocomplete
              items={instruments}
              defaultSelectedKeys={getValues("instrument")}
              aria-label="Select instrument"
              {...register("instrument")}
              isInvalid={!!errors.instrument}
              errorMessage={errors?.instrument?.message?.toString()}
              label="Instrument"
              variant="bordered"
              onChange={(instrument) => {
                setValue("instrument", instrument ?? "");
              }}
            /> */}
            <ImageUploadButton
              onUploadImage={(result) => {
                if (result.info && typeof result.info === "object") {
                  setValue("photo", result.info.secure_url);
                }
              }}
            />
            {updatedPhoto && <Image src={updatedPhoto} alt="post image" />}
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
  // TODO - put those in the store!
  const instruments: ValueAndLabel[] = [
    { value: "bassGuitar", label: "Bass Guitar" },
    { value: "piano", label: "Piano" },
    { value: "timpani", label: "Timpani" },
  ];

  const router = useRouter();

  const onSubmit = async (data: JobPostSchema) => {
    // FIX
    const result = await addJobPost(data);
    // if (result.status === "error") {
    //   toast.error(result.error as string);
    //   return;
    // }

    router.replace("/members");
    router.refresh();
  };

  return <Observed instruments={instruments} onFormSubmit={onSubmit} />;
};
