"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { User } from "@prisma/client";
import {
  ChartScatter,
  NotebookText,
  Orbit,
  Palette,
  Settings,
  User2,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./auth/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const AppSidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  return (
    <Sidebar
      className="border-none bg-white dark:bg-sidebar"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
            <div className="flex h-auto w-full items-center justify-between rounded-lg border border-gray-400 bg-white p-3 dark:border-gray-600 dark:bg-slate-800">
              <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                <span>{user.displayName}</span>
                <span className="text-sm text-muted-foreground">
                  @{user.username}
                </span>
              </div>
              <Avatar className="group-data-[collapsible=icon]:size-5">
                <AvatarImage src={user.profilePicture ?? undefined} />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>You</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/feed"}
                  className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                  asChild
                  tooltip="feed"
                >
                  <Link href="/feed">
                    <NotebookText className="mr-1.5 size-5" />
                    <span>Feed</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/channels"}
                  className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                  asChild
                  tooltip="channels"
                >
                  <Link href="/channels">
                    <Orbit className="mr-1.5 size-5" />
                    <span>Channels</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/posts"}
                  className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                  asChild
                  tooltip="posts"
                >
                  <Link href="/posts">
                    <Palette className="mr-1.5 size-5" />
                    <span>Posts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/stats"}
                  className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                  asChild
                  tooltip="stats"
                >
                  <Link href="/stats">
                    <ChartScatter className="mr-1.5 size-5" />
                    <span>Profile Stats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="hidden group-data-[collapsible=icon]:block" />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/account-settings"}
                  className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                  asChild
                >
                  <Link href="/account-settings">
                    <UserRoundCog className="mr-1.5 size-5" />
                    <span>Account settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/app-settings"}
                  className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                  asChild
                >
                  <Link href="/app-settings">
                    <Settings className="mr-1.5 size-5" />
                    <span>App settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="my-[3px] hover:bg-slate-200 dark:hover:bg-slate-700"
                asChild
              >
                <LogoutButton />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
