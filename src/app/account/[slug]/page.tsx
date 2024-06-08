"use server";

import Profile from "@/components/Profile";
import { db } from "@/lib/db";
import { get_username_and_id } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  // determine the username and id
  let final_id = undefined;
  let final_username = undefined;
  try {
    const { id, username } = get_username_and_id(slug);
    final_id = id;
    final_username = username !== undefined ? decodeURIComponent(username) : "";
  } catch (err) {
    // invalid url slug
    return notFound();
  }
  if (final_id != undefined && final_username != undefined) {
    const account = await db.account.findFirst({
      where: { id: final_id },
      include: {
        posts: true,
        doubts: true,
        friendOf: true,
        guilds: true,
      },
    });
    if (account?.username !== final_username) {
      // invalid slug
      return notFound();
    }
    return (
      <div className="min-h-screen w-full @container">
        <Profile account={account} />
      </div>
    );
  } else {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-3 text-center">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
        <div className="inset-x-0 max-w-prose text-muted-foreground">
          This should not take long, make sure you have opened correct link to
          the account
        </div>
      </div>
    );
  }
};

export default Page;
