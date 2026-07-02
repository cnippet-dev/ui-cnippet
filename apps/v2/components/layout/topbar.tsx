"use client";

import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo, LogoText } from "@/components/ui/logo";
import { TopbarButton } from "@/components/ui/topbar-button";
import { cn } from "@/lib/utils";
import { FullWidthBorder } from "./full-width-border";

const navigationLinks = [
  { href: "/docs/introduction", label: "Docs" },
  { href: "/explore", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/playground", label: "Playground" },
];

export function TopBar({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={cn("fixed top-0 right-0 left-0 z-50", className)}>
      <div className="fixed top-0 right-0 left-0 h-16 min-h-16 min-w-screen border-background border-b bg-background" />
      <div className="container-wrapper relative mx-auto bg-background">
        <div className="container z-50 mx-auto flex items-center bg-background py-4 lg:justify-between">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-14 lg:w-70">
              <Link className="flex items-center" href="/">
                <LogoText className="hidden lg:flex" />
                <Logo className="size-5.5 text-primary lg:hidden" />
              </Link>
            </div>
          </div>
          <div className="hidden items-center space-x-4 lg:flex lg:flex-1 lg:justify-center">
            {navigationLinks.map((link) => (
              <TopbarButton
                className="text-foreground"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </TopbarButton>
            ))}
          </div>
          <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-3">
            {children}
            <button
              aria-label="Toggle menu"
              className="flex size-8 items-center justify-center rounded border border-dashed transition-colors hover:bg-accent lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              type="button"
            >
              {mobileOpen ? (
                <XIcon className="size-4" />
              ) : (
                <MenuIcon className="size-4" />
              )}
            </button>
          </div>
        </div>
        <FullWidthBorder className="bottom-0" />
      </div>

      {mobileOpen && (
        <div className="relative z-40 border-b border-dashed bg-background lg:hidden">
          <div className="container-wrapper mx-auto">
            <nav className="flex flex-col px-4 py-4">
              {navigationLinks.map((link) => (
                <Link
                  className="border-b border-dashed py-3 font-mono text-foreground/70 text-sm transition-colors last:border-b-0 hover:text-foreground"
                  href={link.href}
                  key={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
