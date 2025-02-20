"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import CustomButton from "./ui/CustomButton";

const Navbar = ({
  withoutButtons,
  className,
}: {
  withoutButtons?: boolean;
  className?: string;
}) => {
  const { status } = useSession();
  const pathName = usePathname();
  return (
    <nav
      className={cn(
        "flex items-center justify-between bg-white/60 px-3 py-5 backdrop-blur-sm dark:bg-transparent",
        className,
      )}
    >
      <div>
        <Link href="/">
          <img
            src="/logo-full-tx.png"
            className="aspect-[400/150] w-40"
            aria-label="stusome logo"
          />
        </Link>
      </div>
      <div className="flex items-center justify-end gap-5">
        <ThemeSwitch />
        {!withoutButtons && (
          <div>
            {status === "authenticated" ? (
              <div className="group">
                <Button
                  asChild
                  className="custom-gradient dark:text-white"
                  size="lg"
                >
                  <Link href="/dashboard">
                    Dashboard
                    <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ) : status === "unauthenticated" ? (
              <CustomButton
                className="group flex items-center dark:text-white"
                onClick={() =>
                  signIn("", {
                    redirectTo: pathName === "/" ? "/dashboard" : pathName,
                  })
                }
              >
                Login
                <ArrowRight className="ml-1.5 inline-block size-4 transition-transform group-hover:translate-x-1" />
              </CustomButton>
            ) : (
              <CustomButton
                className="group flex items-center dark:text-white"
                disabled
              >
                <Loader2 className="size-5 animate-spin" />
              </CustomButton>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
