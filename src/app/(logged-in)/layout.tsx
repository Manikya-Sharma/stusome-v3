"use server";

import ThemeSwitch from "@/components/ThemeSwitch";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Pathname from "./Pathname";
import AppSidebar from "@/components/AppSidebar";
import { trpc } from "@/lib/trpc/server";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await auth();
  if (!user) {
    redirect(
      encodeURI(`/login?callbackUrl=/dashboard&message=Login to continue`),
    );
  }
  const dbUser = await trpc.authRouter.getProfile();
  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={dbUser} />
        <main className="w-full">
          <div className="flex items-center gap-2 py-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold tracking-tight">
              <Pathname />
            </h1>
            <div className="ml-auto w-fit px-5">
              <ThemeSwitch />
            </div>
          </div>

          <div className="overflow-y-auto md:h-[calc(100vh-60px)]">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
