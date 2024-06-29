import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.profileComplete = user.profileComplete;
      }

      return token;
    },
    // we want to modify the session we're getting by adding user id
    // so we check if we get sub (subject) on the user token, sub means id.
    // if we do and we got a user on the session we'll add that id.
    async session({ token, session }) {
      if (token.sub && session.user) {
        // return { ...session, user: { ...session.user, id: token.sub } };
        session.user.id = token.sub;
        session.user.profileComplete = token.profileComplete as boolean;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
