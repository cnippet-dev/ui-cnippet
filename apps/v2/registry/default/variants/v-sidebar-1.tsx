// title: App shell with icon collapse, groups, badges and user footer
"use client";

import {
  BarChart3Icon,
  BoxIcon,
  ChevronsUpDownIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  PlusIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Separator } from "@/registry/default/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";

const NAV = [
  { icon: HomeIcon, label: "Overview" },
  { badge: 12, icon: InboxIcon, label: "Inbox" },
  { icon: BarChart3Icon, label: "Analytics" },
  { icon: UsersIcon, label: "Customers" },
];

const PROJECTS = ["Website redesign", "Mobile app", "Design system"];

export default function Particle() {
  const [active, setActive] = useState("Overview");

  return (
    // The transform makes this box the containing block for the sidebar's
    // fixed positioning, so the demo stays inside the preview.
    <div className="flex h-88 w-full transform-gpu overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar className="h-full" collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Acme Inc">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BoxIcon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-muted-foreground text-xs">
                      Pro plan
                    </span>
                  </span>
                  <ChevronsUpDownIcon aria-hidden="true" className="ms-auto" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        isActive={active === item.label}
                        onClick={() => setActive(item.label)}
                        tooltip={item.label}
                      >
                        <item.icon aria-hidden="true" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupAction aria-label="New project">
                <PlusIcon aria-hidden="true" />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {PROJECTS.map((project) => (
                    <SidebarMenuItem key={project}>
                      <SidebarMenuButton
                        isActive={active === project}
                        onClick={() => setActive(project)}
                        tooltip={project}
                      >
                        <FolderIcon aria-hidden="true" />
                        <span>{project}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <SettingsIcon aria-hidden="true" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Maya Patel">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg text-xs">
                      MP
                    </AvatarFallback>
                  </Avatar>
                  <span className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">Maya Patel</span>
                    <span className="truncate text-muted-foreground text-xs">
                      maya@acme.dev
                    </span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <Separator className="h-4" orientation="vertical" />
            <span className="font-medium text-sm">{active}</span>
          </header>
          <div className="grid gap-3 p-4 sm:grid-cols-3">
            {["Revenue", "Orders", "Visitors"].map((label) => (
              <div className="h-20 rounded-lg bg-muted/50 p-3" key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            ))}
            <div className="h-40 rounded-lg bg-muted/50 sm:col-span-3" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
