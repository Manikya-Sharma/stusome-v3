"use server";

import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Pathname from "./Pathname";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return notFound();
  }

  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="w-full">
          <div className="flex items-center gap-2 py-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold tracking-tight">
              <Pathname />
            </h1>
          </div>

          <div className="h-[calc(100vh-52px)] overflow-y-auto">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
