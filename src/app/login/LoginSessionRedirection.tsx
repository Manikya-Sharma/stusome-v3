"use client";

import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { PROFILE_POST } from "@/types/api-routes/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formType = z.object({
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only consist of numbers, letters and underscores"
    )
    .min(4, "Username must have at-least 4 characters")
    // Is 15 really sufficient?
    .max(15, "Maximum size allowed is 15"),
  displayName: z
    .string()
    .min(4, "Display Name must have at-least 4 characters")
    .max(20, "Maximum size allowed is 20"),
});

// The purpose is to ensure that logged in use is in the database
const LoginSessionRedirection = ({
  email,
  userId,
  profilePicture,
}: {
  email: string;
  userId: string;
  profilePicture: string | undefined;
}) => {
  const [needsCreation, setNeedsCreation] = useState<boolean>(false);
  const [usernameNotUnique, setUsernameNotUnique] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const { isLoading } = useQuery({
    queryKey: ["profile", email],
    queryFn: async () => {
      const res = await fetch(`/api/v1/profile?email=${email}`);
      if (res.status === 200) {
        // account found successfully
        router.push(callbackUrl ?? "/dashboard");
      } else if (res.status === 404) {
        // we need to create a new account
        setNeedsCreation(true);
      } else {
        console.error(
          `Error: status code ${res.status} | message: ${
            (await res.json()).message
          }`
        );
      }
      return {};
    },
  });

  const { mutate: createAccount, isPending: isCreating } = useMutation({
    mutationFn: async (data: PROFILE_POST) => {
      const res = await fetch("/api/v1/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 400) {
        const { message } = await res.json();
        if (message === "username not unique") {
          setUsernameNotUnique(true);
        }
        return;
      }
      if (res.status !== 200) {
        throw new Error(
          `Error: status code ${res.status} | message: ${
            (await res.json()).message
          }`
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", email],
      });
    },
  });

  const form = useForm<z.infer<typeof formType>>({
    resolver: zodResolver(formType),
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  const onSubmit = ({ username, displayName }: z.infer<typeof formType>) => {
    createAccount({
      displayName,
      email,
      externalId: userId,
      username,
      profilePicture,
    });
  };

  return (
    <main className="px-5 absolute mt-7 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[70vw] h-[85vh] bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center">
      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-3">
          <Loader2 className="size-8 animate-spin" />
          <p>Loading...</p>
        </div>
      )}
      {needsCreation ? (
        isCreating ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <Loader2 className="size-8 animate-spin" />
            <p>Creating your account...</p>
          </div>
        ) : (
          <div className="w-full max-w-prose">
            <h1 className="font-semibold text-4xl tracking-tight mb-16">
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
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className: "underline",
                  }),
                  "px-0"
                )}
                target="_blank"
                href="/toc"
              >
                Terms and Conditions
                <ExternalLink className="size-2" />
              </Link>
            </p>
          </div>
        )
      ) : null}
    </main>
  );
};

export default LoginSessionRedirection;
