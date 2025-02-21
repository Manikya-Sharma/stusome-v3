"use server";

import { db } from "@/lib/db";
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
  });

  if (!channel) {
    return notFound();
  }

  return <div></div>;
};

export default Page;
