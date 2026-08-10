"use client";

import { useTheme } from "@cnippet/ui/shared/theme-provider";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="relative flex size-9 items-center justify-center rounded border transition-colors hover:bg-accent"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      type="button"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

const COLUMNS = [
  {
    links: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/get-started", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/changelog", label: "Changelog" },
    ],
    title: "Docs",
  },
  {
    links: [
      { href: "/explore", label: "Components" },
      { href: "/motion", label: "Motion" },
      { href: "/themes", label: "Themes" },
      { href: "/playground", label: "Playground" },
    ],
    title: "Product",
  },
  {
    links: [
      { href: "https://github.com/cnippet-dev/ui-cnippet", label: "GitHub" },
      { href: "https://x.com/cnippetdev", label: "X" },
      { href: "https://discord.gg/cnippet", label: "Discord" },
    ],
    title: "Community",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-dashed">
      <div className="grid gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2.5 font-f37-stout text-xl">
            <Logo className="size-5 text-foreground" />
            <span>
              cnippet<span className="text-cnippet-accent">.</span>ui
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[13px] text-muted-foreground leading-relaxed">
            Accessible, composable React components built with Base UI and
            Tailwind CSS. Copy, paste, and make it yours.
          </p>
          <p className="mt-4 max-w-xs font-mono text-[11px] text-muted-foreground leading-relaxed">
            97 components · 40+ motion variants · MIT licensed · $0 forever.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="font-mono text-[11px] text-foreground uppercase tracking-[0.18em]">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    className="font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { rel: "noreferrer", target: "_blank" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-dashed px-5 py-4 sm:flex-row sm:items-center sm:px-8">
        <p className="font-mono text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Cnippet · MIT licensed core
        </p>
        <div className="flex items-center gap-5 sm:ml-auto">
          <Link
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            href="/legal/privacy"
          >
            Privacy
          </Link>
          <Link
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            href="/legal/terms"
          >
            Terms
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
