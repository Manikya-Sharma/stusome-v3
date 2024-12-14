"use client";

import { PROFILE_POST } from "@/types/api-routes/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    .max(15, "Maximum size allowed is 15"),
  displayName: z.string().max(20, "Maximum size allowed is 15"),
});

// The purpose is to ensure that logged in use is in the database
const LoginSessionRedirection = ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  const [needsCreation, setNeedsCreation] = useState<boolean>(false);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formType>>({
    resolver: zodResolver(formType),
  });

  const onSubmit = ({ username, displayName }: z.infer<typeof formType>) => {
    createAccount({
      displayName,
      email,
      externalId: userId,
      username,
    });
  };

  return (
    <div>
      {isLoading && "Loading..."}
      {needsCreation ? (
        isCreating ? (
          <div>Creating your account</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username">Username</label>
              <input id="username" {...register("username")} />
              {errors.username?.message}
            </div>
            <div>
              <label htmlFor="display-name">Display Name</label>
              <input id="display-name" {...register("displayName")} />
              {errors.displayName?.message}
            </div>

            <button type="submit">Submit</button>
          </form>
        )
      ) : (
        <div>Please wait while we redirect...</div>
      )}
    </div>
  );
};

export default LoginSessionRedirection;
