"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const UI_ITEMS = [{ href: "/explore?section=core", label: "Components" }];

const MOTION_ITEMS = [
  { href: "/explore?section=text+animations", label: "Text Animations" },
  { href: "/explore?section=scroll+animations", label: "Scroll Animations" },
];

export function ExploreNav() {
  const pathname = usePathname();
  const isActive = pathname === "/explore" || pathname.startsWith("/explore");

  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        render={
          <Button
            className={cn("gap-1", isActive && "text-primary")}
            data-pressed={isActive || undefined}
            variant="ghost"
          />
        }
      >
        Explore
        <ChevronDownIcon className="size-3 opacity-60 transition-transform [[data-open]>&]:rotate-180" />
      </PopoverTrigger>

      <PopoverPopup
        align="start"
        className="min-w-48 p-0"
        side="bottom"
        sideOffset={6}
      >
        <div className="p-2">
          <p className="px-2 pb-1 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            UI
          </p>
          {UI_ITEMS.map((item) => (
            <DropdownLink href={item.href} key={item.href}>
              {item.label}
            </DropdownLink>
          ))}
        </div>

        <div className="border-t p-2">
          <p className="px-2 pb-1 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            Motion
          </p>
          {MOTION_ITEMS.map((item) => (
            <DropdownLink href={item.href} key={item.href}>
              {item.label}
            </DropdownLink>
          ))}
        </div>
      </PopoverPopup>
    </Popover>
  );
}

function DropdownLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      href={href}
    >
      {children}
    </Link>
  );
}
