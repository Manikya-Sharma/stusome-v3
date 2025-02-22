import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Orbit, PlusCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { RecommendedChannels } from "./components/recommended-channels";
import { UserChannels } from "./components/user-channels";

const ChannelsContent = () => {
  return (
    <main className="mx-auto h-full max-w-prose px-10 pt-2">
      <Tabs defaultValue="my" className="mx-auto w-full max-w-[80vw]">
        <TabsList className="mb-3 w-full justify-around bg-slate-300 dark:bg-slate-800">
          <TabsTrigger
            value="my"
            className="w-full data-[state=active]:bg-slate-600 data-[state=active]:text-white dark:data-[state=active]:bg-slate-700"
          >
            <Orbit className="mr-1.5 inline-block size-4" />
            Your channels
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=active]:bg-slate-600 data-[state=active]:text-white dark:data-[state=active]:bg-slate-700"
            value="explore"
          >
            <Sparkles className="mr-1.5 inline-block size-4" />
            You might like
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my">
          <UserChannels />
        </TabsContent>
        <TabsContent value="explore">
          <RecommendedChannels />
        </TabsContent>
      </Tabs>
      <Button asChild className="mt-10 w-full" size="lg">
        <Link href="/channels/new">
          <PlusCircle className="mr-1.5 inline-block size-5" />
          Create a new Channel
        </Link>
      </Button>
    </main>
  );
};

export default ChannelsContent;
