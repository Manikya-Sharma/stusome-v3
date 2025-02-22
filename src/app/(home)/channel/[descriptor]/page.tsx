"use server";

import { db } from "@/lib/db";
import UserLink from "@/modules/users/components/user-link";
import { CircleDot } from "lucide-react";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ descriptor: string }>;
}) => {
  const channel_desc = ":" + (await params).descriptor;

  const channel = await db.channel.findFirst({
    where: {
      descriptor: channel_desc,
    },
    include: {
      posts: true,
      mods: true,
      members: true,
    },
  });

  if (!channel) {
    return notFound();
  }

  return (
    <div className="mx-auto flex max-w-[80%] gap-2 px-2 py-5">
      <section className="flex-[2]">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {channel.name}
          </h1>
          <p className="text-xs text-muted-foreground">{channel.descriptor}</p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Posts</h2>
          {channel.posts.length === 0 && <div>No posts </div>}
          {channel.posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      </section>
      <section className="flex-1">
        <div>
          <CircleDot className="mr-1.5 inline-block size-4" />
          {channel.posts.length === 0 ? "No" : channel.posts.length} Posts
        </div>
        <div>
          <CircleDot className="mr-1.5 inline-block size-4" />
          {channel.members.length} Member
          {channel.members.length !== 1 && <span>s</span>}
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight">Mods</h2>
        <ul>
          {channel.mods.map((mod) => (
            <li key={mod.id}>
              <UserLink user={mod} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;
