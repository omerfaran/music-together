import GitHub from "next-auth/providers/github";

import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
  // providers: [GitHub],
  providers: [
    credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (!validated.success) {
          return null;
        }

        const { email, password } = validated.data;

        const user = await getUserByEmail(email);
        if (!user || !(await compare(password, user.passwordHash))) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
