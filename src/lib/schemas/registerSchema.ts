import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be many characters lol" }),
  // the object with message is optional, without it we'd have a default error message
});

export type RegisterSchema = z.infer<typeof registerSchema>;
