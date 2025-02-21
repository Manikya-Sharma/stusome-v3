"use client";

import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc/client";
import {
  newAccountFormValidator,
  NewAccountFormValidatorType,
} from "@/types/form-validators/account-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// The purpose is to ensure that logged in use is in the database
const LoginSessionRedirection = () => {
  const { data: session } = useSession();
  // state to determine if the user needs to create a new account for our database
  const [needsCreation, setNeedsCreation] = useState<boolean>(false);
  // state to determine if the username entered is unique
  const [usernameNotUnique, setUsernameNotUnique] = useState<boolean>(false);
  // state to determine if the account creation is completed and redirection is needed
  const [completed, setCompleted] = useState<boolean>(false);

  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const { isLoading, status } = trpc.authRouter.getProfile.useQuery();
  const { mutate: createAccount, status: mutationStatus } =
    trpc.authRouter.createProfile.useMutation();

  useEffect(() => {
    if (!isLoading) {
      if (status !== "success") {
        setNeedsCreation(true);
      } else {
        router.push(callbackUrl ?? "/dashboard");
      }
    }
  }, [isLoading, callbackUrl, router, status]);
  useEffect(() => {
    if (mutationStatus === "error") {
      setUsernameNotUnique(true);
    } else if (mutationStatus === "success") {
      setUsernameNotUnique(false);
      setCompleted(true);
      router.push(callbackUrl ?? "/dashboard");
    }
  }, [mutationStatus, callbackUrl, router]);

  const form = useForm<NewAccountFormValidatorType>({
    resolver: zodResolver(newAccountFormValidator),
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  const onSubmit = ({
    username,
    displayName,
  }: z.infer<typeof newAccountFormValidator>) => {
    if (!session?.user?.email || !session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An error occurred, please try again after clearing browser cache",
      });
      return;
    }
    createAccount({
      displayName,
      email: session?.user?.email,
      externalId: session?.user?.id,
      username,
      profilePicture: session.user.image ?? "",
    });
  };

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
          <div className="w-full max-w-prose">
            <h1 className="mb-16 text-4xl font-semibold tracking-tight">
              Almost there...
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="john_doe" {...field} />
                      </FormControl>
                      <FormDescription>
                        People tag you using this
                      </FormDescription>
                      <FormMessage />
                      {usernameNotUnique && (
                        <p className="text-red-500">
                          This username is already taken, try another
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <CustomButton type="submit">Create account</CustomButton>
              </form>
            </Form>
            <p className="mt-5 text-sm text-muted-foreground">
              By creating account, you agree to our{" "}
              <Button asChild variant="link" className="px-0 underline">
                <Link target="_blank" href="/toc">
                  Terms and Conditions
                  <ExternalLink className="size-2" />
                </Link>
              </Button>
            </p>
          </div>
        )
      ) : null}
    </div>
  );
};

export default LoginSessionRedirection;
