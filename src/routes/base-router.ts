import { router } from "@/lib/trpc/init";
import { authRouter } from "./auth-router";
import { channelRouter } from "./channel-router";

export const appRouter = router({
  authRouter,
  channelRouter,
});

export type AppRouter = typeof appRouter;
