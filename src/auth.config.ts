import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
  // providers: [GitHub],
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (!validated.success) {
          return null;
        }

        const { email, password } = validated.data;

        const user = await getUserByEmail(email);
        if (
          !user ||
          !user.passwordHash ||
          !(await compare(password, user.passwordHash))
        ) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
