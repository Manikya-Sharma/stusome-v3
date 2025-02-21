import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useLogin = ({
  callbackUrl,
  isLoading,
  mutationStatus,
  status,
}: {
  isLoading: boolean;
  status: "error" | "success" | "pending" | "idle";
  mutationStatus: string;
  callbackUrl: string;
}) => {
  const router = useRouter();
  const [needsCreation, setNeedsCreation] = useState<boolean>(false);
  const [usernameNotUnique, setUsernameNotUnique] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
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

  return { needsCreation, usernameNotUnique, completed };
};
