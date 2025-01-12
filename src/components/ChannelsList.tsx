"use client";

import type { Channel } from "@prisma/client";

const ChannelsList = ({ channels }: { channels: Channel[] }) => {
  return (
    <ul className="space-y-2">
      {channels.map((channel) => (
        <li
          key={channel.id}
          className="group flex cursor-pointer items-center justify-between rounded-lg border border-black/30 bg-white px-4 py-2 transition-colors hover:bg-transparent dark:border-white/20 dark:bg-zinc-900 dark:hover:bg-transparent"
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
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;
