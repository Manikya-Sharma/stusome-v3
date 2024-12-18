"use client";

import type { Channel } from "@prisma/client";

const ChannelsList = ({ channels }: { channels: Channel[] }) => {
  return (
    <ul className="space-y-2">
      {channels.map((channel) => (
        <li
          key={channel.id}
          className="cursor-pointer border border-black/30 flex group bg-white hover:bg-transparent transition-colors items-center justify-between px-4 py-2 rounded-lg"
        >
          <div className="space-y-2">
            <p className="group-hover:underline">{channel.name}</p>
            <p className="text-muted-foreground text-pretty text-base/7">
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
