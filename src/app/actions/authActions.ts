"use server";

import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { ZodIssue } from "zod";

// 'use server' means what's written here will be executed on the server side
// all here won't be sent down to the client as js to be executed on the client

interface Error {
  error: ZodIssue[] | string;
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    const dataNotValid = !validated.success;
    if (dataNotValid) {
      // We shouldn't just throw a new error because they client cannot catch it.
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }

    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashedPassword },
    });
    return { status: "success", data: user };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
