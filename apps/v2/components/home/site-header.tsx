"use client";

import { useTheme } from "@cnippet/ui/shared/theme-provider";
import { ChevronDown, Menu as MenuIcon, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { PrefetchLink } from "@/components/prefetch-link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";
import { GitHubIcon } from "../icons";

function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "relative flex size-8 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
    >
      <Sun className="size-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

type NavLink = {
  description?: string;
  href: string;
  label: string;
};

type NavGroup = { items: NavLink[]; label: string };

type NavItem = NavGroup | { href: string; label: string };

const NAV_ITEMS: NavItem[] = [
  {
    items: [
      {
        description: "97 copy-paste component variants",
        href: "/explore?section=core",
        label: "Components",
      },
      {
        description: "40+ text and scroll animations",
        href: "/explore?section=text+animations",
        label: "Motion",
      },
    ],
    label: "Explore",
  },
  {
    items: [
      {
        description: "Introduction, install, theming",
        href: "/docs/introduction",
        label: "Main",
      },
      {
        description: "API reference for every component",
        href: "/ui/actions/button",
        label: "Core Components",
      },
      {
        description: "API reference for motion variants",
        href: "/motion/text-animations/text-reveal",
        label: "Motion Components",
      },
    ],
    label: "Docs",
  },
  { href: "/themes", label: "Themes" },
  { href: "/playground", label: "Playground" },
];

const GITHUB_URL = "https://github.com/cnippet-dev/ui-cnippet";

function NavDropdown({ item }: { item: NavGroup }) {
  return (
    <Menu>
      <MenuTrigger className="flex items-center gap-1 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground data-popup-open:text-foreground">
        {item.label}
        <ChevronDown className="size-3.5 transition-transform data-popup-open:rotate-180" />
      </MenuTrigger>
      <MenuPopup align="start" className="min-w-60" sideOffset={12}>
        {item.items.map((link) => (
          <MenuItem
            className="flex-col items-start gap-0.5 py-2"
            key={link.href}
            render={
              <PrefetchLink className="cursor-pointer" href={link.href} />
            }
          >
            <span className="font-mono text-[12px] text-foreground">
              {link.label}
            </span>
            {link.description ? (
              <span className="text-[11px] text-muted-foreground">
                {link.description}
              </span>
            ) : null}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-5 px-5 sm:gap-8 sm:px-8">
        <PrefetchLink className="flex items-center gap-2" href="/">
          <Logo className="size-7 text-foreground" />
          <span className="font-mono text-[13px] text-foreground tracking-tight">
            cnippet
            <span className="text-cnippet-accent">.</span>
            ui
          </span>
        </PrefetchLink>

        <nav className="ml-auto hidden items-center gap-5 sm:flex sm:gap-6">
          {NAV_ITEMS.map((item) =>
            "items" in item ? (
              <NavDropdown item={item} key={item.label} />
            ) : (
              <PrefetchLink
                className="cursor-pointer font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </PrefetchLink>
            ),
          )}
          <a
            aria-label="View on GitHub"
            className="flex size-8 items-center justify-center rounded-xs text-muted-foreground transition-colors hover:text-foreground"
            href={GITHUB_URL}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-5" />
          </a>
          <ThemeToggle />
          <PrefetchLink
            className="rounded-xs border border-cnippet-accent/40 border-dashed bg-cnippet-accent/10 px-3 py-1.5 font-mono text-[11px] text-cnippet-accent transition-colors hover:bg-cnippet-accent/20"
            href="/docs/get-started"
          >
            Get Started
          </PrefetchLink>
        </nav>

        <button
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto flex size-8 items-center justify-center text-foreground sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? (
            <X className="size-5" />
          ) : (
            <MenuIcon className="size-5" />
          )}
        </button>
      </div>

      {menuOpen ? (
        <nav
          className="flex flex-col border-t border-dashed bg-background px-5 py-4 sm:hidden"
          id="mobile-nav"
        >
          {NAV_ITEMS.map((item) =>
            "items" in item ? (
              <div className="border-b border-dashed py-3" key={item.label}>
                <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                  {item.label}
                </span>
                <div className="mt-2 flex flex-col gap-2 pl-3">
                  {item.items.map((link) => (
                    <PrefetchLink
                      className="cursor-pointer font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                      key={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </PrefetchLink>
                  ))}
                </div>
              </div>
            ) : (
              <PrefetchLink
                className="border-b border-dashed py-3 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </PrefetchLink>
            ),
          )}
          <a
            className="mt-4 flex items-center justify-center gap-2 border-b border-dashed py-3 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            href={GITHUB_URL}
            onClick={() => setMenuOpen(false)}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </a>
          <div className="mt-4 flex items-center justify-between border-b border-dashed py-3">
            <span className="font-mono text-[13px] text-muted-foreground">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <PrefetchLink
            className="mt-4 rounded-xs border border-cnippet-accent/40 border-dashed bg-cnippet-accent/10 px-3 py-2.5 text-center font-mono text-[12px] text-cnippet-accent transition-colors hover:bg-cnippet-accent/20"
            href="/docs/get-started"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </PrefetchLink>
        </nav>
      ) : null}
    </header>
  );
}
