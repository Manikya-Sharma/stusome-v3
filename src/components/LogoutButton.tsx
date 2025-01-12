"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      variant="destructive"
      className="flex w-full items-center border border-red-400 bg-sidebar text-red-400 hover:text-sidebar dark:hover:text-white/80"
      onClick={() => signOut({ redirectTo: "/login" })}
    >
      <LogOut className="mr-1.5 size-5 group-data-[collapsible=icon]:mr-0" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
