"use client";

import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ToastMessage = () => {
  const params = useSearchParams();
  const message = params.get("message");
  useEffect(() => {
    if (message)
      toast({
        variant: "destructive",
        title: "Login to continue",
        description: message,
      });
  });
  return null;
};

export default ToastMessage;
