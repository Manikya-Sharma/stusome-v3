"use server";
import { HydrateClient, trpc } from "@/lib/trpc/server";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RecommendedChannelsClient } from "./recommended-channels-client";

export const RecommendedChannels = async () => {
  await trpc.channelRouter.getRecommendedChannelsForUser.prefetch();
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
            <div>Unable to fetch recommendations, please try again later</div>
          }
        >
          <RecommendedChannelsClient />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};
