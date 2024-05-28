"use server";
import { db } from "@/lib/db";

export const getUsers = async () => {
  const users = await db.account.findMany();
  return users;
};
