import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ChartScatter,
  LogOut,
  NotebookText,
  Orbit,
  Palette,
  Settings,
  User2,
  UserRoundCog,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const AppSidebar = ({ user }: { user: User }) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
            <div className="h-auto w-full p-3 border border-gray-400 rounded-lg bg-white flex items-center justify-between">
              <div className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
                <span>{user.displayName}</span>
                <span className="text-muted-foreground text-sm">
                  @ {user.username}
                </span>
              </div>
              <Avatar className="group-data-[collapsible=icon]:size-5">
                <AvatarImage src={user.profilePicture ?? undefined} />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>You</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
                <SidebarMenuButton asChild>
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
                <SidebarMenuButton asChild>
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
                <SidebarMenuButton asChild>
                  <Link href="/stats">
                    <ChartScatter className="mr-1.5 size-5" />
                    <span>Profile Stats</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="group-data-[collapsible=icon]:block hidden" />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
                <SidebarMenuButton asChild>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant="destructive"
                className="block bg-sidebar border border-red-400 text-red-400 hover:text-sidebar"
              >
                <LogOut className="mr-1.5 size-5 group-data-[collapsible=icon]:mr-0" />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
