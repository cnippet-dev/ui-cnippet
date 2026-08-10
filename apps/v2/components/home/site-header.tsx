"use client";

import { GitFork, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/ui/logo";

const NAV_LINKS = [
  { href: "/explore", label: "Components" },
  { href: "/motion", label: "Motion" },
  { href: "/themes", label: "Themes" },
  { href: "/playground", label: "Playground" },
  { href: "/docs/introduction", label: "Docs" },
];

const GITHUB_URL = "https://github.com/cnippet-dev/ui-cnippet";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dashed bg-background/90 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-5 px-5 sm:gap-8 sm:px-8">
        <Link className="flex items-center gap-2" href="/">
          <Logo className="size-4 text-foreground" />
          <span className="font-mono text-[13px] text-foreground tracking-tight">
            cnippet
            <span className="text-cnippet-accent">.</span>
            ui
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 sm:flex sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              className="font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <a
            aria-label="View on GitHub"
            className="flex size-8 items-center justify-center rounded-xs border border-dashed text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            href={GITHUB_URL}
            rel="noreferrer"
            target="_blank"
          >
            <GitFork className="size-4" />
          </a>
          <Link
            className="rounded-xs border border-cnippet-accent/40 border-dashed bg-cnippet-accent/10 px-3 py-1.5 font-mono text-[11px] text-cnippet-accent transition-colors hover:bg-cnippet-accent/20"
            href="/docs/get-started"
          >
            Get Started
          </Link>
        </nav>

        <button
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto flex size-8 items-center justify-center text-foreground sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          className="flex flex-col border-t border-dashed bg-background px-5 py-4 sm:hidden"
          id="mobile-nav"
        >
          {NAV_LINKS.map((link) => (
            <Link
              className="border-b border-dashed py-3 font-mono text-[13px] text-muted-foreground transition-colors last:border-b-0 hover:text-foreground"
              href={link.href}
              key={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="mt-4 flex items-center justify-center gap-2 border-b border-dashed py-3 font-mono text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            href={GITHUB_URL}
            onClick={() => setMenuOpen(false)}
            rel="noreferrer"
            target="_blank"
          >
            <GitFork className="size-4" />
            GitHub
          </a>
          <Link
            className="mt-4 rounded-xs border border-cnippet-accent/40 border-dashed bg-cnippet-accent/10 px-3 py-2.5 text-center font-mono text-[12px] text-cnippet-accent transition-colors hover:bg-cnippet-accent/20"
            href="/docs/get-started"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
