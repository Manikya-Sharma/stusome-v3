"use client";

import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginTiles = () => {
  const [loading, setLoading] = useState<"github" | null>(null);
  return (
    <div className="flex flex-col items-center gap-5">
      <Button
        size="lg"
        variant="secondary"
        onClick={async () => {
          setLoading("github");
          await signIn("github");
          setLoading(null);
        }}
      >
        {loading === "github" ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <Github className="size-5" />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
};

export default LoginTiles;
