"use client";

import ChannelsList from "@/components/channels/ChannelsList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc/client";
import { Channel } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const YourChannels = ({ userChannels }: { userChannels: Channel[] }) => {
  return userChannels.length === 0 ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <p>No channels joined yet</p>
      <Button asChild>
        <Link href="/channel/new">
          <PlusCircle className="mr-1.5 inline-block size-5" />
          Create a new channel
        </Link>
      </Button>
    </div>
  ) : (
    <ChannelsList channels={userChannels} />
  );
};

const YouMightLike = ({
  recommendedChannels,
}: {
  recommendedChannels: Channel[];
}) => {
  return <ChannelsList channels={recommendedChannels} />;
};

const ChannelsContent = ({ userChannels }: { userChannels: Channel[] }) => {
  const [width, setWidth] = useState(1024);

  const [recommendedChannels] =
    trpc.channelRouter.getRecommendedChannelsForUser.useSuspenseQuery();

  useEffect(() => {
    function updateWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <main className="flex h-full gap-5 px-10 pt-2">
      {width < 850 ? (
        <Tabs defaultValue="my" className="mx-auto w-full max-w-[80vw]">
          <TabsList className="mb-3 w-full justify-around bg-slate-300 dark:bg-slate-800">
            <TabsTrigger
              value="my"
              className="w-full data-[state=active]:bg-slate-600 data-[state=active]:text-white dark:data-[state=active]:bg-slate-700"
            >
              Your channels
            </TabsTrigger>
            <TabsTrigger
              className="w-full data-[state=active]:bg-slate-600 data-[state=active]:text-white dark:data-[state=active]:bg-slate-700"
              value="explore"
            >
              You might like
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my">
            <YourChannels userChannels={userChannels} />
          </TabsContent>
          <TabsContent value="explore">
            <YouMightLike recommendedChannels={recommendedChannels} />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <section className="h-full flex-1 rounded-md bg-slate-300 p-4 dark:bg-slate-800">
            <h2 className="mb-3 text-xl font-semibold tracking-tight">
              Your channels
            </h2>
            <YourChannels userChannels={userChannels} />
          </section>
          <section className="h-full flex-1 rounded-md bg-slate-300 p-4 dark:bg-slate-800">
            <h2 className="mb-3 text-xl font-semibold tracking-tight">
              You might like
            </h2>
            <YouMightLike recommendedChannels={recommendedChannels} />
          </section>
        </>
      )}
    </main>
  );
};

export default ChannelsContent;
