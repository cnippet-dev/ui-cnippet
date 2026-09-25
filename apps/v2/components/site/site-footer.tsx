import { ArrowUpRight } from "lucide-react";
import { PrefetchLink } from "@/components/prefetch-link";
import { Nodes } from "@/components/signal/rule";
import { SignalDot } from "@/components/signal/signal-dot";
import { ThemeToggle } from "@/components/signal/theme-toggle";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

const COLUMNS = [
  {
    links: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/get-started", label: "Installation" },
      { href: "/docs/theming", label: "Theming" },
      { href: "/docs/changelog", label: "Changelog" },
    ],
    title: "docs",
  },
  {
    links: [
      { href: "/explore", label: "Components" },
      { href: "/explore?section=text+animations", label: "Motion" },
      { href: "/themes", label: "Themes" },
      { href: "/playground", label: "Playground" },
    ],
    title: "product",
  },
  {
    links: [
      { href: "https://github.com/cnippet-dev/ui-cnippet", label: "GitHub" },
      { href: "https://x.com/cnippetdev", label: "X / Twitter" },
      { href: "https://blocks.cnippet.dev", label: "Blocks" },
    ],
    title: "community",
  },
];

/**
 * Lives inside the canvas, so it closes the page panel rather than floating on
 * the chrome. Ends with the cropped wordmark.
 */
export function SiteFooter({
  className,
  ruled = false,
}: {
  className?: string;
  /** Draw nodes where the top border crosses the canvas edge lines. */
  ruled?: boolean;
}) {
  return (
    <footer
      className={cn("relative mt-auto border-t md:rounded-b-canvas", className)}
    >
      {ruled ? <Nodes /> : null}
      <div className="mx-auto grid max-w-(--container) gap-12 px-4 pt-14 pb-10 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
        <div className="flex flex-col gap-4">
          <Brand />
          <p className="max-w-xs text-[14px] text-muted-foreground leading-relaxed">
            Accessible, composable React components built on Base UI and
            Tailwind CSS. Copy them in. Own them forever.
          </p>
          <p className="flex items-center gap-2 font-mono text-[11px] text-faint">
            <SignalDot pulse />
            all systems shipping · v2
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="font-mono text-[11px] text-faint lowercase">
              {`// ${column.title}`}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {column.links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <PrefetchLink
                      className="group/link inline-flex items-center gap-1 text-[14px] text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      href={link.href}
                      {...(external
                        ? { rel: "noreferrer", target: "_blank" }
                        : {})}
                    >
                      {link.label}
                      {external ? (
                        <ArrowUpRight className="size-3 opacity-0 transition-all duration-250 ease-out-expo group-hover/link:opacity-100" />
                      ) : null}
                    </PrefetchLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-(--container) flex-wrap items-center gap-x-6 gap-y-2 border-t px-4 py-4 sm:px-6 lg:px-8">
        <p className="font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} cnippet — MIT licensed
        </p>
        <div className="ms-auto flex items-center gap-4">
          <PrefetchLink
            className="font-mono text-[11px] text-faint transition-colors hover:text-foreground"
            href="/legal/privacy"
          >
            privacy
          </PrefetchLink>
          <PrefetchLink
            className="font-mono text-[11px] text-faint transition-colors hover:text-foreground"
            href="/legal/terms"
          >
            terms
          </PrefetchLink>
          <ThemeToggle />
        </div>
      </div>

      {/* The wordmark — cropped by the canvas edge, fading into it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mb-[-0.24em] select-none overflow-hidden text-center font-display font-semibold text-[clamp(4rem,18vw,17rem)] leading-[0.8] tracking-[-0.07em]"
      >
        <span className="bg-linear-to-b from-foreground/10 to-transparent bg-clip-text text-transparent">
          cnippet-ui
        </span>
      </div>
    </footer>
  );
}
