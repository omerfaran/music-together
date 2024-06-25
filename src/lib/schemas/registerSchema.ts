import { z } from "zod";
import { calculateAge } from "../util";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be many characters lol" }),
  // the object with message is optional, without it we'd have a default error message
});

export const profileSchema = z.object({
  gender: z.string().min(1),
  description: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  dateOfBirth: z
    .string()
    .min(1, {
      message: "Date of birth is required",
    })
    .refine(
      (dateString) => {
        const age = calculateAge(new Date(dateString));
        return age >= 18;
      },
      {
        message: "You must be at least 18 to use this app",
      }
    ),
});

export const combinedRegisterSchema = registerSchema.and(profileSchema);

// we want the register schema to consist of two stages, register and profile

export type RegisterSchema = z.infer<
  typeof registerSchema & typeof profileSchema
>;
