"use client";

import Profile from "@/components/Profile";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { fetchUser } from "./actions";
import { CircleX, Loader2 } from "lucide-react";
import type { Prisma } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FetchedAccount = Prisma.AccountGetPayload<{
  include: { posts: true; doubts: true; guilds: true; friendOf: true };
}> | null;

const ProfileSection = ({
  account,
  accountInfoLoading,
}: {
  // account is of same type as passed as prop to Profile
  account: FetchedAccount;
  accountInfoLoading: boolean | null;
}) => {
  return (
    <>
      {account ? (
        <Profile account={account} />
      ) : accountInfoLoading ? (
        <div className="my-5 flex w-full flex-col items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-center text-muted-foreground">
            Fetching your account details
          </p>
        </div>
      ) : (
        <div className="my-5 flex w-full flex-col items-center justify-center gap-2">
          <CircleX className="h-6 w-6 text-destructive" />
          <p className="text-center text-muted-foreground">
            This account could not be found
          </p>
        </div>
      )}
    </>
  );
};

const GuildsSection = ({
  account,
  accountInfoLoading,
}: {
  account: FetchedAccount;
  accountInfoLoading: boolean | null;
}) => {
  return (
    <>
      <h2 className="mb-10 text-xl font-semibold">Your Guilds</h2>
      {account ? (
        <ul className="space-y-4">
          {account.guilds.map((guild) => (
            <li key={guild.id} className="mx-5 rounded-lg bg-white px-5 py-7">
              <h3 className="text-xl font-semibold">{guild.name}</h3>
              <p className="text-right text-sm text-muted-foreground">
                Since {formatDate(guild.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      ) : accountInfoLoading ? (
        <div className="my-5 flex w-full flex-col items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-center text-muted-foreground">
            Finding your guilds
          </p>
        </div>
      ) : (
        <div className="my-5 flex w-full flex-col items-center justify-center gap-2">
          <CircleX className="h-6 w-6 text-destructive" />
          <p className="text-center text-muted-foreground">
            Something went wrong
          </p>
        </div>
      )}
    </>
  );
};

const PostsSection = ({
  account,
  accountInfoLoading,
}: {
  account: FetchedAccount;
  accountInfoLoading: boolean | null;
}) => {
  return (
    <div className="flex flex-col gap-10">
      {account ? (
        <>
          {/* Posts */}
          <div className="select-none">
            <h2 className="mb-10 text-xl font-semibold">Your Posts</h2>
            <Carousel className="mx-auto w-[calc(100%-10rem)]">
              <CarouselContent>
                {account.doubts.map((doubt) => (
                  <CarouselItem key={doubt.id}>
                    <div className="p-1">
                      <Card className="p-6">
                        <CardHeader>
                          <CardTitle>{doubt.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {doubt.updatedAt &&
                              `Last updated on ${formatDate(doubt.updatedAt)}`}
                          </p>
                        </CardHeader>
                        <CardContent className="truncate">
                          {doubt.content}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          {/* Doubts */}
          <div className="select-none">
            <h2 className="mb-10 text-xl font-semibold">Your Doubts</h2>
            <Carousel className="mx-auto w-[calc(100%-10rem)]">
              <CarouselContent>
                {account.posts.map((post) => (
                  <CarouselItem key={post.id}>
                    <div className="p-1">
                      <Card className="p-6">
                        <CardHeader>
                          <CardTitle>{post.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {post.updatedAt &&
                              `Last updated on ${formatDate(post.updatedAt)}`}
                          </p>
                        </CardHeader>
                        <CardContent className="truncate">
                          {post.content}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </>
      ) : accountInfoLoading ? (
        <div className="my-5 flex w-full flex-col items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-center text-muted-foreground">Fetching details</p>
        </div>
      ) : (
        <div className="my-5 flex w-full flex-col items-center justify-center gap-2">
          <CircleX className="h-6 w-6 text-destructive" />
          <p className="text-center text-muted-foreground">
            Something went wrong
          </p>
        </div>
      )}
    </div>
  );
};

const Page = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  let account: FetchedAccount = null;
  let accountInfoLoading = null;
  if (email) {
    const { data: fetchedAccount, isLoading } = useQuery({
      queryKey: ["fetch-account"],
      queryFn: async () => {
        return await fetchUser({ email });
      },
      retry: true,
      retryDelay: 1000,
    });
    account = fetchedAccount ?? null;
    accountInfoLoading = isLoading;
  }
  return (
    <main className="mx-5 grid grid-cols-7 gap-5">
      <section className="col-span-2 hidden rounded-lg bg-zinc-100 px-5 py-7 md:block">
        <GuildsSection
          account={account}
          accountInfoLoading={accountInfoLoading}
        />
      </section>
      <section className="col-span-3 rounded-lg bg-zinc-100 px-5 py-7">
        <PostsSection
          account={account}
          accountInfoLoading={accountInfoLoading}
        />
      </section>
      <section className="col-span-2 hidden rounded-lg bg-zinc-100 px-5 py-7 @container md:block">
        <ProfileSection
          account={account}
          accountInfoLoading={accountInfoLoading}
        />
      </section>
    </main>
  );
};

export default Page;
