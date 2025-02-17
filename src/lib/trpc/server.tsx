import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "@/routes/base-router";
import { createTRPCContext } from "./context";

export const getQueryClient = cache(makeQueryClient);

const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);
