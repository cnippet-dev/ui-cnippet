"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CommandMenu } from "@/components/command-menu";
import { appConfig } from "@/lib/config";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { GitHubLink } from "./github-link";
import { MainNav } from "./main-nav";
import { ModeSwitcher } from "./mode-switcher";

export default function SiteHeader() {
  const pageTree = source.pageTree;
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "grid grid-cols-1 [--gutter-width:2.5rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto",
        pathname.startsWith("/ui") || pathname.startsWith("/docs")
          ? "sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
          : "",
      )}
    >
      {/* Left gutter */}
      <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

      {/* Header content */}
      <div className="relative flex h-14 items-center justify-between gap-3 px-2 after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:after:bg-white/10">
        {/* Logo */}
        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5 font-figtree font-medium text-2xl sm:text-[1.625em]">
          <Link aria-label="Home" href="/">
            {/* cnippet{" "}
            <span className="text-muted-foreground/72 hover:text-muted-foreground">
              ui
            </span> */}
            <Image
              alt=""
              className="size-12 opacity-90 dark:hidden"
              height={500}
              src="/images/logo-light.png"
              width={500}
            />
            <Image
              alt=""
              className="hidden size-12 opacity-90 dark:block"
              height={500}
              src="/images/logo-dark.png"
              width={500}
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <MainNav className="hidden lg:flex" items={appConfig.navItems} />
          <CommandMenu navItems={appConfig.navItems} tree={pageTree} />
          <span className="ml-3 h-5 w-px bg-gray-950/10 max-md:hidden dark:bg-white/15" />
          <GitHubLink />
          <ModeSwitcher />
        </div>
      </div>

      {/* Right gutter */}
      <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
    </header>
  );
}
