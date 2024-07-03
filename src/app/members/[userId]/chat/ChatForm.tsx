"use client";

import { createMessage } from "@/app/actions/messageActions";
import { Button } from "@/components/ui/Button/Button";
import { MessageSchema, messageSchema } from "@/lib/schemas/messageSchema";
import { handleFormServerErrors } from "@/lib/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

export const ChatForm = () => {
  const router = useRouter();
  const { userId } = useParams<{ userId: string }>();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setFocus,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  useEffect(() => {
    setFocus("text");
  }, [setFocus]);

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(userId, data);
    if (result.status === "error") {
      // TODO - it makes most sense to actually create a Form component that also knows how to handle errors
      // and thus not use this util function to which we pass the setError
      // We could create that Form, to which we pass onSubmit, and form also have props handleError,
      // then the form sets the error by itself, we can just pass the result to it.

      return handleFormServerErrors(result, setError);
    }

    // He did it with setTimeOut, but I think it's better this way
    const resetInput: Promise<void> = new Promise((resolve) => {
      reset();
      router.refresh();
      resolve();
    });
    resetInput.then(() => {
      setFocus("text");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center gap-2">
        <Input
          fullWidth
          placeholder="Type a message"
          variant="faded"
          {...register("text")}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type="submit"
          isIconOnly
          color="secondary"
          radius="full"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root.serverError.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default ChatForm;
