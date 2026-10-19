// title: Docs navigation with collapsible sections (inset)
"use client";

import {
  BookOpenIcon,
  ChevronRightIcon,
  CodeIcon,
  LayersIcon,
  type LucideIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/default/ui/sidebar";

type Section = { title: string; icon: LucideIcon; pages: string[] };

const SECTIONS: Section[] = [
  {
    icon: BookOpenIcon,
    pages: ["Introduction", "Installation", "Theming"],
    title: "Getting started",
  },
  {
    icon: LayersIcon,
    pages: ["Button", "Dialog", "Sidebar", "Stepper"],
    title: "Components",
  },
  { icon: CodeIcon, pages: ["CLI", "Registry", "MCP"], title: "Tooling" },
];

export default function Particle() {
  return (
    // The transform keeps the fixed sidebar inside the preview.
    <div className="flex h-88 w-full transform-gpu overflow-hidden rounded-xl border">
      <SidebarProvider className="h-full min-h-0">
        <Sidebar className="h-full" variant="inset">
          <SidebarHeader className="px-4 pt-4 font-semibold text-sm">
            Acme Docs
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Guides</SidebarGroupLabel>
              <SidebarMenu>
                {SECTIONS.map((section, i) => (
                  <Collapsible
                    className="group/collapsible"
                    defaultOpen={i === 1}
                    key={section.title}
                    render={<SidebarMenuItem />}
                  >
                    <CollapsibleTrigger render={<SidebarMenuButton />}>
                      <section.icon aria-hidden="true" />
                      <span>{section.title}</span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="ms-auto transition-transform group-data-open/collapsible:rotate-90"
                      />
                    </CollapsibleTrigger>
                    <CollapsiblePanel>
                      <SidebarMenuSub>
                        {section.pages.map((page) => (
                          <SidebarMenuSubItem key={page}>
                            <SidebarMenuSubButton
                              isActive={page === "Sidebar"}
                              render={<button type="button" />}
                            >
                              {page}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsiblePanel>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="min-w-0">
          <header className="flex h-12 items-center gap-2 px-3">
            <SidebarTrigger />
            <span className="text-muted-foreground text-sm">
              Components / <span className="text-foreground">Sidebar</span>
            </span>
          </header>
          <div className="space-y-3 p-4 pt-0">
            <div className="h-6 w-1/3 rounded-md bg-muted/60" />
            <div className="h-4 w-full rounded-md bg-muted/40" />
            <div className="h-4 w-5/6 rounded-md bg-muted/40" />
            <div className="h-32 rounded-lg bg-muted/40" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
