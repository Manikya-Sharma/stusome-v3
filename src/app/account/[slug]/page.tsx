"use server";

import WidthWrapper from "@/components/chunks/WidthWrapper";
import { db } from "@/lib/db";
import { get_username_and_id } from "@/lib/utils";
import { Loader2, User2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import date from "date-and-time";
import { Account } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

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
      <WidthWrapper className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="row-span-full flex flex-col items-center justify-start">
          <div className="flex flex-col items-center justify-start gap-5 rounded-lg border-[1px] bg-zinc-100 px-10 py-5">
            <div className="relative aspect-square h-36 rounded-full bg-zinc-50">
              {account.profilePic ? (
                <Image
                  src={account.profilePic}
                  alt="profile picture"
                  fill
                  className="pointer-events-none rounded-full"
                />
              ) : (
                <User2 className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            <h1 className="text-4xl">{account.username}</h1>
            <p className="text-center text-sm text-muted-foreground">
              User since {date.format(account.createdAt, "MMM DD, YYYY")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-3xl tracking-tight">User Stats</h2>
            <Table className="mx-auto max-w-prose rounded-lg border border-muted">
              <TableBody>
                <TableRow>
                  <TableCell>Posts</TableCell>
                  <TableCell className="text-right">
                    {account.posts.length}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Doubts</TableCell>
                  <TableCell className="text-right">
                    {account.doubts.length}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Friends</TableCell>
                  <TableCell className="text-right">
                    {account.friendOf.length}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Guilds</TableCell>
                  <TableCell className="text-right">
                    {account.guilds.length}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-center text-3xl tracking-tight">
              Profile Score
            </h2>
            {/* // TODO */}
            <div>Profile Score</div>
          </div>
        </div>
      </WidthWrapper>
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
