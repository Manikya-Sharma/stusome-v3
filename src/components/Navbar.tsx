"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CustomButton from "./ui/CustomButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = ({
  withoutButtons,
  className,
}: {
  withoutButtons?: boolean;
  className?: string;
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  return (
    <nav
      className={cn(
        "flex items-center justify-between py-5 px-3 bg-white/60 backdrop-blur-sm",
        className
      )}
    >
      <div>
        <Link href="/">
          <img
            src="logo-full-tx.png"
            className="aspect-[400/150] w-40"
            aria-label="stusome logo"
          />
        </Link>
      </div>
      {!withoutButtons && (
        <div>
          {session?.user?.email ? (
            <>
              <Link
                className={buttonVariants({ variant: "default" })}
                href="/dashboard"
              >
                Dashboard
              </Link>{" "}
              {/* TODO: remove logout from here and move to profile popover */}
              <Button variant="secondary" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <CustomButton
              className="group flex items-center"
              onClick={() =>
                signIn("", {
                  redirectTo: pathName === "/" ? "/dashboard" : pathName,
                })
              }
            >
              Login
              <ArrowRight className="inline-block ml-1.5 size-4 group-hover:translate-x-1 transition-transform" />
            </CustomButton>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
