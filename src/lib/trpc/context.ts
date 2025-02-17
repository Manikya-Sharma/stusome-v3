import { cache } from "react";
import { auth } from "../auth";
import { db } from "../db";

export const createTRPCContext = cache(async () => {
  const user = await auth();
  if (!user || !user.user || !user.user.email) {
    return { user: null };
  }
  const data = await db.user.findFirst({
    where: {
      email: user.user?.email,
    },
  });
  return { user: data };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
