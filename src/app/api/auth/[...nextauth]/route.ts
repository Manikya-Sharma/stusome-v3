"use server";

import { db } from "@/lib/db";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ email, account, user, credentials, profile }) {
      if (!user.email || !user.name) return false;

      const existing = await db.account.findFirst({
        where: {
          email: user.email,
        },
      });
      if (existing === null) {
        // new account
        await db.account.create({
          data: {
            email: user.email,
            name: user.name,
            imageUrl: user.image,
          },
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
