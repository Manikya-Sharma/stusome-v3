"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const SessionRedirect = async ({
  callbackUrl,
  message,
}: {
  callbackUrl: string;
  message?: string;
}) => {
  const user = await auth();
  if (!user) {
    redirect(encodeURI(`/login?callbackUrl=${callbackUrl}&message=${message}`));
  }
  return null;
};

export default SessionRedirect;
