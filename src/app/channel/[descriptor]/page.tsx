"use server";

import Navbar from "@/components/Navbar";
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

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Page;
