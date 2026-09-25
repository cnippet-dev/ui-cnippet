"use client";

import { ChevronDown, Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { GitHubIcon } from "@/components/icons";
import { PrefetchLink } from "@/components/prefetch-link";
import { CONTAINER } from "@/components/signal/section";
import { SignalDot } from "@/components/signal/signal-dot";
import { ThemeToggle } from "@/components/signal/theme-toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Menu,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from "@/registry/default/ui/menu";
import { Brand } from "./brand";
import { GITHUB_URL, isActive, NAV_ITEMS, type NavGroup } from "./nav";

const pill =
  "inline-flex h-8 items-center gap-1 rounded-lg px-3 font-medium text-[13px] outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ring";
const pillIdle = "text-muted-foreground hover:text-foreground";
const pillActiveChrome =
  "bg-background text-foreground shadow-xs/5 ring-1 ring-border";
// Inside the canvas the pill cannot be lifted onto canvas colour, so it is
// pressed into it instead.
const pillActiveCanvas = "bg-accent text-foreground ring-1 ring-border";

function NavDropdown({
  active,
  activeClass,
  item,
}: {
  active: boolean;
  activeClass: string;
  item: NavGroup;
}) {
  return (
    <Menu>
      <MenuTrigger
        className={cn(
          pill,
          active ? activeClass : pillIdle,
          "group/trigger data-popup-open:text-foreground",
        )}
      >
        {item.label}
        <ChevronDown className="size-3.5 opacity-60 transition-transform duration-250 ease-out-expo group-data-popup-open/trigger:rotate-180" />
      </MenuTrigger>
      <MenuPopup align="start" className="min-w-64" sideOffset={10}>
        {item.items.map((link) => (
          <MenuItem
            className="flex-col items-start gap-0.5 py-2"
            key={link.href}
            render={
              <PrefetchLink className="cursor-pointer" href={link.href} />
            }
          >
            <span className="font-medium text-[13px] text-foreground">
              {link.label}
            </span>
            {link.description ? (
              <span className="text-[12px] text-muted-foreground">
                {link.description}
              </span>
            ) : null}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}

/**
 * Two placements:
 * - `chrome` (docs): on the chrome plane above sidebar + canvas; the active
 *   route is lifted into a canvas-coloured pill.
 * - `canvas` (marketing): inside the top of the rounded canvas, transparent
 *   over the hero until the page scrolls.
 */
export function SiteHeaderClient({
  placement = "chrome",
  search,
}: {
  placement?: "chrome" | "canvas";
  search?: ReactNode;
}) {
  const inCanvas = placement === "canvas";
  const pillActive = inCanvas ? pillActiveCanvas : pillActiveChrome;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    // Close the mobile sheet on navigation.
    setLastPath(pathname);
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky z-50 transition-[background-color,box-shadow,border-color] duration-250",
        inCanvas
          ? cn(
              // Sticks at the canvas inset so the panel keeps its rounded top
              // while scrolling. The chrome-coloured spread shadow (clipped at
              // the bottom) masks content passing through the gap above it and
              // behind the rounded corners. The fill is opaque so the canvas edge lines
              // do not show through while content scrolls underneath.
              "top-0 border-b md:top-3 md:rounded-t-canvas",
              scrolled
                ? "bg-background md:shadow-[0_0_0_1px_var(--canvas-edge),0_0_0_13px_var(--chrome)] md:[clip-path:inset(-13px_-13px_0_-13px)]"
                : "border-transparent bg-transparent",
            )
          : // No scroll rule: the docs topbar sticks right below and draws
            // the canvas's rounded top against the chrome.
            "top-0 bg-chrome/80 backdrop-blur-xl",
      )}
    >
      <div
        className={cn(
          "flex h-(--header-height) items-center gap-4",
          inCanvas ? CONTAINER : "px-4 md:px-5",
        )}
      >
        <Brand />

        <nav
          aria-label="Main"
          className="ms-3 hidden items-center gap-0.5 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.match);
            return "items" in item ? (
              <NavDropdown
                active={active}
                activeClass={pillActive}
                item={item}
                key={item.label}
              />
            ) : (
              <PrefetchLink
                aria-current={active ? "page" : undefined}
                className={cn(pill, active ? pillActive : pillIdle)}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </PrefetchLink>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-1.5">
          <div className="hidden md:block">{search}</div>
          <a
            aria-label="View on GitHub"
            className="hidden size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground sm:inline-flex"
            href={GITHUB_URL}
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button
            className="ms-1 hidden sm:inline-flex"
            render={<PrefetchLink href="/docs/get-started" />}
            size="sm"
          >
            Get started
          </Button>
          <button
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-8 items-center justify-center rounded-lg text-foreground hover:bg-accent lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? (
              <X className="size-4.5" />
            ) : (
              <MenuIcon className="size-4.5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          className={cn(
            "max-h-[calc(100svh-var(--header-height))] overflow-y-auto border-t px-4 pt-3 pb-6 lg:hidden",
            inCanvas ? "bg-background" : "bg-chrome",
          )}
          id="mobile-nav"
        >
          <div className="mb-3 md:hidden">{search}</div>
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) =>
              "items" in item ? (
                <li className="py-2" key={item.label}>
                  <p className="px-3 pb-1 font-mono text-[11px] text-faint lowercase">
                    {`// ${item.label}`}
                  </p>
                  <ul className="flex flex-col">
                    {item.items.map((link) => (
                      <li key={link.href}>
                        <PrefetchLink
                          className="flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-[15px] text-foreground hover:bg-accent"
                          href={link.href}
                        >
                          {link.label}
                          <span className="truncate text-[12px] text-muted-foreground">
                            {link.description}
                          </span>
                        </PrefetchLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <PrefetchLink
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-[15px] text-foreground hover:bg-accent"
                    href={item.href}
                  >
                    {item.label}
                    {isActive(pathname, item.match) ? <SignalDot /> : null}
                  </PrefetchLink>
                </li>
              ),
            )}
          </ul>
          <div className="mt-4 flex items-center gap-2 border-t pt-4">
            <Button
              className="flex-1"
              render={<PrefetchLink href="/docs/get-started" />}
            >
              Get started
            </Button>
            <Button
              aria-label="GitHub"
              render={
                <Link
                  aria-label="GitHub"
                  href={GITHUB_URL}
                  rel="noreferrer"
                  target="_blank"
                />
              }
              size="icon"
              variant="outline"
            >
              <GitHubIcon className="size-4" />
            </Button>
            <ThemeToggle className="size-9 border" />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
