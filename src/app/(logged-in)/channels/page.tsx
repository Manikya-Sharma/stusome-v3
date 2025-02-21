import { HydrateClient, trpc } from "@/lib/trpc/server";
import ChannelsContent from "@/modules/channels/channels-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";

const Page = async () => {
  const userChannels = await trpc.channelRouter.getChannelsForUser();
  await trpc.channelRouter.getRecommendedChannelsForUser.prefetch();
  // TODO: Add error boundary only for recommended channels and not for user channels
  return (
    <HydrateClient>
      <Suspense
        fallback={
          <div>
            <Loader2 className="size-5 animate-spin" />
          </div>
        }
      >
        <ErrorBoundary
          fallback={
            <div>Unable to fetch recommendations, please try again later</div>
          }
        >
          <ChannelsContent userChannels={userChannels} />;
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
};

export default Page;
