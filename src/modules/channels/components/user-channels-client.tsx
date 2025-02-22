"use client";
import ChannelsList from "@/components/channels/ChannelsList";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const UserChannelsClient = () => {
  const [userChannels] =
    trpc.channelRouter.getChannelsForUser.useSuspenseQuery();
  return userChannels.length === 0 ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <p>No channels joined yet</p>
      <Button asChild>
        <Link href="/channels/new">
          <PlusCircle className="mr-1.5 inline-block size-5" />
          Create a new channel
        </Link>
      </Button>
    </div>
  ) : (
    <ChannelsList channels={userChannels} />
  );
};
