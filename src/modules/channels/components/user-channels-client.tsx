"use client";
import ChannelsList from "@/components/channels/ChannelsList";
import { trpc } from "@/lib/trpc/client";

export const UserChannelsClient = () => {
  const [userChannels] =
    trpc.channelRouter.getChannelsForUser.useSuspenseQuery();
  return userChannels.length === 0 ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <p>No channels joined yet</p>
    </div>
  ) : (
    <ChannelsList channels={userChannels} />
  );
};
