"use client";

import ChannelsList from "@/components/channels/ChannelsList";
import BentoElem from "./components/bento-elem";
import { trpc } from "@/lib/trpc/client";

const DashboardContent = () => {
  const { data: channels, isLoading: isChannelsLoading } =
    trpc.channelRouter.getChannelsForUser.useQuery();
  return (
    <div className="grid h-full grid-cols-1 grid-rows-4 gap-3 rounded-lg p-5 md:grid-cols-2 md:grid-rows-2">
      <div className="rounded-[1%] rounded-t-2xl bg-slate-50 ring-1 ring-black/20 dark:bg-slate-800 dark:ring-white/10 md:min-h-max md:rounded-tl-2xl md:rounded-tr-[1%]">
        <BentoElem address="/channels" heading="Channels">
          <ChannelsList
            isLoading={isChannelsLoading}
            channels={channels ?? []}
          />
        </BentoElem>
      </div>
      <div className="rounded-[1%] bg-slate-50 ring-1 ring-black/20 dark:bg-slate-800 dark:ring-white/10 md:min-h-max md:rounded-tr-2xl">
        <BentoElem address="/posts" heading="Posts">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
      <div className="rounded-[1%] bg-slate-50 ring-1 ring-black/20 dark:bg-slate-800 dark:ring-white/10 md:min-h-max md:rounded-bl-2xl">
        <BentoElem address="/stats" heading="Statistics">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
      <div className="rounded-[1%] rounded-b-2xl bg-slate-50 ring-1 ring-black/20 dark:bg-slate-800 dark:ring-white/10 md:min-h-max md:rounded-bl-[1%] md:rounded-br-2xl">
        <BentoElem address="/app-settings" heading="App Settings">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit
          accusamus quasi dolores deleniti ea eligendi sapiente laboriosam
          corrupti debitis molestias eveniet nesciunt illum iure nulla facere,
          veritatis necessitatibus cumque nemo a, molestiae dicta consequatur
          enim at quae! Et rem quos laudantium neque ipsum delectus! Quisquam.
        </BentoElem>
      </div>
    </div>
  );
};

export default DashboardContent;
