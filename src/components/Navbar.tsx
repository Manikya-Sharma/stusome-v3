"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomButton from "./ui/CustomButton";

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
            <div className="group">
              <Link
                className={buttonVariants({
                  variant: "default",
                  className: "custom-gradient",
                  size: "lg",
                })}
                href="/dashboard"
              >
                Dashboard
                <ArrowRight className="ml-1.5 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
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
