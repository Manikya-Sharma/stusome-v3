"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button
      variant="destructive"
      size="icon"
      className="w-full"
      onClick={() => signOut({ redirectTo: "/login" })}
    >
      <LogOut className="mr-1.5 size-5 group-data-[collapsible=icon]:mr-0" />
      <span className="group-data-[collapsible=icon]:hidden">Logout</span>
    </Button>
  );
};

export default LogoutButton;
