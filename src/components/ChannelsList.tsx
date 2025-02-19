"use client";

import type { Channel } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const ChannelsList = ({
  channels,
  isLoading,
}: {
  channels: Channel[];
  isLoading?: boolean;
}) => {
  return (
    <ul className="space-y-1">
      {isLoading &&
        Array.from({ length: 3 }).map((val, idx) => (
          <li key={idx} className="rounded-lg px-4 py-2">
            <Skeleton className="h-16 w-full" />
          </li>
        ))}
      {!isLoading && channels.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <p>No channels joined yet</p>
          <Link
            href="/channels/explore"
            className={cn(buttonVariants({ variant: "secondary" }), "block")}
          >
            Explore channels{" "}
            <ArrowRight className="ml-1.5 inline-block size-4" />
          </Link>
        </div>
      ) : (
        channels.map((channel) => (
          <li
            key={channel.id}
            className="cursor-pointer rounded-lg border border-black/30 bg-white px-4 py-2 transition-colors hover:bg-transparent dark:border-white/20 dark:bg-zinc-900 dark:hover:bg-transparent"
          >
            <Link
              className="group flex items-center justify-between"
              href={`/channel/${channel.descriptor.slice(1)}`}
            >
              <div className="space-y-2">
                <p className="group-hover:underline">{channel.name}</p>
                <p className="text-pretty text-base/7 text-muted-foreground">
                  {channel.brief}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
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
