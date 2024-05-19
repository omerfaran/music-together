import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be many characters lol" }),
  // the object with message is optional, without it we'd have a default error message
});

export type LoginSchema = z.infer<typeof loginSchema>;
