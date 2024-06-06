"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const uploadPost = async (
  content: string,
  title: string,
  author_email: string,
) => {
  // ensure that author exists
  const found = await db.account.findFirst({
    where: {
      email: author_email,
    },
  });
  if (!found) throw new Error("Account not found!");
  await db.post.create({
    data: {
      content,
      title,
      accountId: found.id,
    },
  });
};
