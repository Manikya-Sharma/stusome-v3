"use client";
import Image from "next/image";
import WidthWrapper from "./WidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { LogIn, Moon, SunDim } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const theme: string = "light";
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <nav className="absolute inset-x-0 top-0 border-b border-zinc-300 bg-white/50 py-3 backdrop-blur-sm md:fixed">
      <WidthWrapper className="flex items-center justify-between">
        <Link
          href="/"
          className="relative block aspect-square h-10"
          title="Home page"
        >
          <Image src="/logo-tx.png" alt="stusome logo" fill />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            {theme == "light" && <Moon className="h-4 w-4" />}
            {theme == "dark" && <SunDim className="h-5 w-5" />}
          </Button>
          {session?.user?.email ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : !pathname.includes("login") ? (
            <Link
              href="/login"
              className={cn(buttonVariants(), "group flex items-center")}
            >
              <span className="block">Login</span>
              <LogIn className="ml-1 block h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </div>
      </WidthWrapper>
    </nav>
  );
};

export default Navbar;
