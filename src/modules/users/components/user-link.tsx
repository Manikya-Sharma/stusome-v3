"use client";

import { User } from "@prisma/client";
import Link from "next/link";

const UserLink = ({ user }: { user: User }) => {
  return <Link href={`/u/${user.username}`}>{user.displayName}</Link>;
};

export default UserLink;
