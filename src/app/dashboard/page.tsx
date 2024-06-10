"use client";

import Profile from "@/components/Profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, formatDate } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Cat, CircleX, Dog, Heart, Loader2, Pen, Pencil } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchUser } from "./actions";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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
        <Profile account={account} isContainer />
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
  return account ? (
    <>
      {/* Posts */}
      <div className="select-none">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Your Posts{" "}
            {account.posts.length !== 0 ? `(${account.posts.length})` : null}
          </h2>
          <Link
            href={"/post-creator"}
            className={cn(buttonVariants({ variant: "link" }), "group")}
          >
            New Post <Pen className="ml-3 h-5 w-5 group-hover:animate-pulse" />
          </Link>
        </div>
        {account.posts.length === 0 ? (
          <div className="flex aspect-[3/1] w-full flex-col items-center justify-center">
            <Cat className="size-1/2" />
            <p className="text-muted-foreground">No posts yet!</p>
          </div>
        ) : (
          <Carousel className="mx-auto w-[calc(100%-5rem)] md:w-[calc(100%-10rem)]">
            <CarouselContent>
              {account.posts.map((post) => (
                <CarouselItem key={post.id}>
                  <div className="p-1">
                    <Card className="min-h-56 p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <h3>{post.title}</h3>
                          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <Heart className="size-4" />
                            <p>{post.likes}</p>
                          </div>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {post.updatedAt && formatDate(post.updatedAt)}
                        </p>
                        {post.guildId ? (
                          <div className="w-fit text-sm font-semibold text-muted-foreground ">
                            {
                              account.guilds.find(
                                (guild) => guild.id === post.guildId,
                              )?.name
                            }
                          </div>
                        ) : null}
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
        )}
      </div>
      {/* Doubts */}
      <div className="mt-10 select-none">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Your Doubts{" "}
            {account.doubts.length !== 0 ? `(${account.doubts.length})` : null}
          </h2>
          <Link
            href={"/doubt-creator"}
            className={cn(buttonVariants({ variant: "link" }), "group")}
          >
            New Doubt{" "}
            <Pencil className="ml-3 h-5 w-5 group-hover:animate-pulse" />
          </Link>
        </div>
        {account.doubts.length === 0 ? (
          <div className="flex aspect-[3/1] w-full flex-col items-center justify-center">
            <Dog className="size-1/2" />
            <p className="text-muted-foreground">No doubts yet!</p>
          </div>
        ) : (
          <Carousel className="mx-auto w-[calc(100%-5rem)] md:w-[calc(100%-10rem)]">
            <CarouselContent>
              {account.doubts.map((doubt) => (
                <CarouselItem key={doubt.id}>
                  <div className="p-1">
                    <Card className="min-h-56 p-6">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <h3>{doubt.title}</h3>
                          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <Heart className="size-4" />
                            <p>{doubt.likes}</p>
                          </div>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {doubt.updatedAt && formatDate(doubt.updatedAt)}
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
        )}
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
      <p className="text-center text-muted-foreground">Something went wrong</p>
    </div>
  );
};

const Page = () => {
  const { data: account, isLoading } = useQuery({
    queryKey: ["fetch-account"],
    queryFn: async () => {
      return await fetchUser();
    },
    retry: true,
    retryDelay: 500,
  });
  if (isLoading) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
        <div className="inset-x-0 max-w-prose text-muted-foreground">
          Please wait while we fetch your data
        </div>
      </div>
    );
  }
  if (!account) {
    // no one without account can see this page
    return notFound();
  }
  return (
    <main className="grid grid-cols-7 gap-5 md:mx-5">
      <section className="col-span-2 hidden rounded-lg bg-zinc-100 px-5 py-7 md:block">
        <GuildsSection account={account} accountInfoLoading={isLoading} />
      </section>
      <section className="col-span-7 rounded-lg bg-zinc-100 px-5 py-7 md:col-span-3">
        <PostsSection account={account} accountInfoLoading={isLoading} />
      </section>
      <section className="col-span-2 hidden rounded-lg bg-zinc-100 px-5 py-7 @container md:block">
        <ProfileSection account={account} accountInfoLoading={isLoading} />
      </section>
    </main>
  );
};

export default Page;
