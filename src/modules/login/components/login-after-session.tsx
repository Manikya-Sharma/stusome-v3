"use client";

import { useLogin } from "@/hooks/use-login";

import { trpc } from "@/lib/trpc/client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

import CreateAccountForm from "./create-account-form";

// The purpose is to ensure that logged in user is in the database
const LoginAfterSession = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const { isLoading, status } = trpc.authRouter.getProfile.useQuery();
  const { mutate: createAccount, status: mutationStatus } =
    trpc.authRouter.createProfile.useMutation();

  const { completed, needsCreation, usernameNotUnique } = useLogin({
    callbackUrl: callbackUrl ?? "/dashboard",
    isLoading,
    mutationStatus,
    status,
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      {status === "pending" && !needsCreation && (
        <div className="flex flex-col items-center justify-center gap-3">
          <Loader2 className="size-8 animate-spin" />
          <p>Loading...</p>
        </div>
      )}
      {needsCreation ? (
        completed ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="size-8 animate-spin" />
            <p>Creating your account...</p>
          </div>
        ) : (
          <CreateAccountForm
            usernameNotUnique={usernameNotUnique}
            createAccount={createAccount}
          />
        )
      ) : null}
    </div>
  );
};

export default LoginAfterSession;
