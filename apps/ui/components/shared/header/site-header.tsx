"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandMenu } from "@/components/command-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { appConfig } from "@/lib/config";
import { source } from "@/lib/source";
import { GitHubLink } from "./github-link";
import { MainNav } from "./main-nav";
import { ModeSwitcher } from "./mode-switcher";

export function SiteHeader() {
  const pageTree = source.pageTree;
  const pathname = usePathname();

  return (
    <header
      className={`border-b px-4 md:px-0 ${pathname.startsWith("/ui") || pathname.startsWith("/docs") ? "sticky top-0 z-20 bg-sidebar" : ""}`}
    >
      <div
        className={`mx-auto flex h-18 w-full items-center justify-between gap-3 border-x px-4 ${pathname.startsWith("/ui") || pathname.startsWith("/docs") ? "container bg-sidebar" : "max-w-6xl"}`}
      >
        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5 font-figtree font-medium text-2xl sm:text-[1.625em]">
          <Link aria-label="Home" href="/">
            cnippet{" "}
            <span className="text-muted-foreground/72 hover:text-muted-foreground">
              ui
            </span>
          </Link>

          <Badge size="sm" variant="secondary">
            Alpha
          </Badge>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <MainNav className="hidden lg:flex" items={appConfig.navItems} />
            <CommandMenu navItems={appConfig.navItems} tree={pageTree} />
            <Separator
              className="ml-3 h-5 max-md:hidden"
              orientation="vertical"
            />
            <GitHubLink />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
