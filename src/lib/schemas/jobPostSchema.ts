import { z } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  expertise: z.string().min(1, {
    message: "Expertise is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export type JobPostSchema = z.infer<typeof jobPostSchema>;
