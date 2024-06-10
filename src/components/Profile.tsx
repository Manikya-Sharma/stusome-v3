import { cn, formatDate } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import { User2, UserCog2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WidthWrapper from "./chunks/WidthWrapper";
import ChartGraph from "./profile/ChartGraph";
import { buttonVariants } from "./ui/button";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { getServerSession } from "next-auth";

const Profile = async ({
  account,
  isContainer,
}: {
  account: Prisma.AccountGetPayload<{
    include: { posts: true; doubts: true; guilds: true; friendOf: true };
  }>;
  isContainer?: boolean;
}) => {
  const loggedInAccount = await getServerSession();

  return (
    <WidthWrapper className="grid grid-cols-1 gap-5 @md:grid-cols-2">
      <div className="row-span-full flex flex-col items-center justify-start">
        <div
          className={cn(
            "flex flex-col items-center justify-start gap-5 rounded-lg bg-zinc-100 px-10 py-5",
            !isContainer && "border-[1px]",
          )}
        >
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
          <h1 className="text-center text-4xl">{account.username}</h1>
          <p className="text-center text-sm text-muted-foreground">
            User since {formatDate(account.createdAt)}
          </p>
          {!isContainer && loggedInAccount?.user?.email === account.email ? (
            <div className="flex flex-col items-stretch justify-center gap-5">
              <Link
                href="edit-account"
                className={buttonVariants({ variant: "outline" })}
              >
                <UserCog2 className="mr-1.5 h-4 w-4" /> Edit account
              </Link>
            </div>
          ) : null}
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
          <ChartGraph account={account} />
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Profile;
