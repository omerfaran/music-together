"use server";
import { auth, signIn, signOut } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
// 'use server' means what's written here will be executed on the server side
// all here won't be sent down to the client as js to be executed on the client

import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import {
  RegisterSchema,
  combinedRegisterSchema,
  registerSchema,
} from "@/lib/schemas/registerSchema";
import { generateToken } from "@/lib/tokens";
import { ActionResult } from "@/types";
import { TokenType, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email);
    if (!existingUser || !existingUser.email) {
      return { status: "error", error: "Invalid creds" };
    }

    if (!existingUser.emailVerified) {
      const token = await generateToken(
        existingUser.email,
        TokenType.VERIFICATION
      );

      await sendVerificationEmail(token.email, token.token);

      return {
        status: "error",
        error: "Please verify your email address before logging in",
      };
    }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(result);
    return { status: "success", data: "Logged in!" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };

        default:
          return { status: "error", error: "Something went wrong" };
      }
    }

    return { status: "error", error: "Something else went wrong?" };
  }
}

export async function signOutUser(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = combinedRegisterSchema.safeParse(data);

    const dataNotValid = !validated.success;
    if (dataNotValid) {
      // We shouldn't just throw a new error because they client cannot catch it.
      return { status: "error", error: validated.error.errors };
    }

    const {
      name,
      email,
      password,
      gender,
      description,
      dateOfBirth,
      city,
      country,
    } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        profileComplete: true,
        member: {
          create: {
            name,
            description,
            city,
            country,
            dateOfBirth: new Date(dateOfBirth),
            gender,
          },
        },
      },
    });

    const verificationToken = await generateToken(
      email,
      TokenType.VERIFICATION
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

// just a helper function to get current userId
export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
