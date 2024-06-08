"use server";

import { db } from "@/lib/db";

export const fetchUser = async ({ email }: { email: string }) => {
  const account = await db.account.findFirst({
    where: { email },
    include: {
      posts: true,
      doubts: true,
      friendOf: true,
      guilds: true,
    },
  });
  if (account) {
    return account;
  } else {
    throw new Error("Account not found");
  }
};
