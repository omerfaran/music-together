"use client";

import { updateMemberProfile } from "@/app/actions/userActions";
import { Button } from "@/components/ui/Button";
import {
  MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/memberEditSchema";
import { handleFormServerErrors } from "@/lib/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface EditFormProps {
  member: Member;
}

export const EditForm: FC<EditFormProps> = ({ member }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    // Populate member current data inside the form
    if (member) {
      const { name, description, city, country } = member;

      reset({
        name,
        description,
        city,
        country,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data);

    if (result.status === "success") {
      toast.success("Profile updated");
      router.refresh();
      return reset({
        ...data,
      });
    }

    handleFormServerErrors(result, setError);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label="Description"
        variant="bordered"
        {...register("description")}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex gap-3">
        <Input
          label="City"
          variant="bordered"
          {...register("city")}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="Country"
          variant="bordered"
          {...register("country")}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      <p className="text-danger text-sm">{errors.root?.serverError.message}</p>
      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="secondary"
      >
        Update Profile
      </Button>
    </form>
  );
};
