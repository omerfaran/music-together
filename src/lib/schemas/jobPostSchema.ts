import { JobPost } from "@/types";
import { z, ZodType } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  // expertise: z.string().min(1, {
  //   message: "Expertise is required",
  // }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  // instrument: z.string().min(1, {
  //   message: "Instrument is required",
  // }),
  photo: z.string().optional(),
}) satisfies ZodType<Pick<JobPost, "title" | "description" | "photo">>;

export type JobPostSchema = z.infer<typeof jobPostSchema>;
