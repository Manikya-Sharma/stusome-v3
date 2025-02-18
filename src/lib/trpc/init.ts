import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import { db } from "../db";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const privateProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = ctx.session;
  const email = session?.user?.email;
  const user = await db.user.findFirst({
    where: {
      email: email ?? "",
    },
  });
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: { user },
  });
});
