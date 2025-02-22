"use client";
import ChannelsList from "@/components/channels/ChannelsList";
import { trpc } from "@/lib/trpc/client";

export const RecommendedChannelsClient = () => {
  const [recommendedChannels] =
    trpc.channelRouter.getRecommendedChannelsForUser.useSuspenseQuery();

  return <ChannelsList channels={recommendedChannels} />;
};
