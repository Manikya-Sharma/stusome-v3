"use server";

import { HydrateClient, trpc } from "@/lib/trpc/server";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { UserChannelsClient } from "./user-channels-client";

export const UserChannels = async () => {
  await trpc.channelRouter.getChannelsForUser.prefetch();
  return (
    <HydrateClient>
      <Suspense
        fallback={
          <div>
            <Loader2 className="mx-auto size-5 animate-spin" />
          </div>
        }
      >
        <ErrorBoundary
          fallback={
            <div>Unable to fetch your channels, please try again later</div>
          }
        >
          <UserChannelsClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};
