"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export const fetchUser = async () => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    throw new Error("User not logged in");
  }
  const account = await db.account.findFirst({
    where: { email: session.user.email },
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
