import Image from "next/image";
import WidthWrapper from "./chunks/WidthWrapper";
import { User2 } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import date from "date-and-time";
import type { Account, Post, Prisma } from "@prisma/client";
import { formatDate } from "@/lib/utils";

const Profile = ({
  account,
}: {
  account: Prisma.AccountGetPayload<{
    include: { posts: true; doubts: true; guilds: true; friendOf: true };
  }>;
}) => {
  return (
    <WidthWrapper className="grid grid-cols-1 gap-5 @md:grid-cols-2">
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
            User since {formatDate(account.createdAt)}
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
          <h2 className="text-center text-3xl tracking-tight">Profile Score</h2>
          {/* // TODO */}
          <div>Profile Score</div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Profile;
