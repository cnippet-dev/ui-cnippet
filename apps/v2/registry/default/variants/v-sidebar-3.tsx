// title: Floating right-side details panel with search
"use client";

import {
  CalendarIcon,
  FileTextIcon,
  MessageSquareIcon,
  PaperclipIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";

const ITEMS = [
  { icon: MessageSquareIcon, label: "Comments", meta: "8 new" },
  { icon: PaperclipIcon, label: "Attachments", meta: "3 files" },
  { icon: CalendarIcon, label: "Schedule", meta: "Due Fri" },
  { icon: FileTextIcon, label: "Activity log", meta: "Today" },
];

export default function Particle() {
  const [query, setQuery] = useState("");
  const shown = ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    // The transform keeps the fixed sidebar inside the preview.
    <div className="flex h-88 w-full transform-gpu overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-0">
        <SidebarInset className="min-w-0">
          <header className="flex h-12 items-center justify-between gap-2 border-b px-4">
            <span className="font-medium text-sm">Issue #4821</span>
            <SidebarTrigger />
          </header>
          <div className="space-y-3 p-4">
            <div className="h-6 w-1/2 rounded-md bg-muted/60" />
            <div className="h-4 w-full rounded-md bg-muted/40" />
            <div className="h-4 w-4/5 rounded-md bg-muted/40" />
          </div>
        </SidebarInset>
        <Sidebar className="h-full" side="right" variant="floating">
          <SidebarHeader>
            <Label className="sr-only" htmlFor="details-search">
              Search details
            </Label>
            <div className="relative">
              <SearchIcon
                aria-hidden="true"
                className="pointer-events-none absolute start-2 top-1/2 size-4 -translate-y-1/2 opacity-60"
              />
              <SidebarInput
                className="ps-8"
                id="details-search"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search details…"
                value={query}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Details</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {shown.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton>
                        <item.icon aria-hidden="true" />
                        <span>{item.label}</span>
                        <span className="ms-auto text-muted-foreground text-xs">
                          {item.meta}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {shown.length === 0 && (
                    <p className="px-2 py-1.5 text-muted-foreground text-xs">
                      Nothing matches “{query}”.
                    </p>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
