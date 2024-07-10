import { z } from "zod";

export const jobPostSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be many characters lol" }),
  // the object with message is optional, without it we'd have a default error message
});

export type jobPostSchema = z.infer<typeof jobPostSchema>;
