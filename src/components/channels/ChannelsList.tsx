"use client";

import type { Channel } from "@prisma/client";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const ChannelsList = ({
  channels,
  isLoading,
}: {
  channels: Channel[];
  isLoading?: boolean;
}) => {
  return (
    <ul className="relative space-y-3 md:space-y-4">
      {isLoading && (
        <div className="mt-20 flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
      {!isLoading && channels.length === 0 ? (
        <div className="mt-16 flex h-full w-full flex-col items-center justify-center gap-3">
          <p>No channels joined yet</p>
          <Button asChild variant="outline">
            <Link href="/channels">
              Explore channels{" "}
              <ArrowRight className="ml-1.5 inline-block size-4" />
            </Link>
          </Button>
        </div>
      ) : (
        channels.map((channel) => (
          <li
            key={channel.id}
            className="cursor-pointer rounded-lg border border-zinc-300 bg-slate-100 px-4 py-2 dark:border-transparent dark:bg-slate-700"
          >
            <Link
              className="group flex items-center justify-between"
              href={`/channel/${channel.descriptor.slice(1)}`}
            >
              <div className="space-y-2">
                <p className="group-hover:underline">{channel.name}</p>
                <p className="hidden text-pretty text-base/7 text-muted-foreground md:block">
                  {channel.brief}
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground md:text-sm">
                  {channel.descriptor}
                </span>
              </div>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default ChannelsList;
