import { router } from "@/lib/trpc/init";
import { authRouter } from "./auth-routes";
import { channelRouter } from "./channel-routes";

export const appRouter = router({
  authRouter,
  channelRouter,
});

export type AppRouter = typeof appRouter;
