import { router } from "@/lib/trpc/init";
import { authRouter } from "./auth-routes";

export const appRouter = router({
  authRouter,
});

export type AppRouter = typeof appRouter;
