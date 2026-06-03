import { FileIcon, FolderIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const segments = [
  { href: "#", icon: FolderIcon, label: "projects" },
  { href: "#", icon: FolderIcon, label: "ui-cnippet" },
  { href: "#", icon: FolderIcon, label: "apps" },
  { href: "#", icon: FolderIcon, label: "v2" },
  { href: "#", icon: FolderIcon, label: "registry" },
];
const current = { icon: FileIcon, label: "registry-variants.ts" };

export function Pattern() {
  return (
    <Frame>
      <FramePanel className="overflow-x-auto">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap sm:gap-1">
            {segments.map((seg) => (
              <>
                <BreadcrumbItem key={seg.label}>
                  <BreadcrumbLink
                    className="flex items-center gap-1 font-mono text-xs"
                    href={seg.href}
                  >
                    <seg.icon className="size-3.5 shrink-0 text-muted-foreground" />
                    {seg.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-muted-foreground/50">
                  /
                </BreadcrumbSeparator>
              </>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1 font-mono text-xs">
                <current.icon className="size-3.5 shrink-0 text-sky-500" />
                {current.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </FramePanel>
    </Frame>
  );
}
