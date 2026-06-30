import Link from "next/link";
import { Background } from "@/components/ui/background";
import { Logo, LogoTextSVG } from "@/components/ui/logo";
import { Logos } from "@/components/ui/logos";

export function Footer() {
  return (
    <footer className="mt-16 flex-col border-t border-dashed md:mt-0 md:border-transparent">
      <div className="container-wrapper z-0 mx-auto px-2 py-12 md:pt-60 lg:px-0">
        <div className="grid grid-cols-1 gap-8 px-2 md:grid-cols-4 md:px-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 font-f37-stout text-2xl text-primary">
              cnippet ui
            </div>
            <p className="mb-6 max-w-md font-mono text-foreground/60 text-sm">
              accessible, composable React components built with Base UI and
              Tailwind CSS. copy, paste, and make it yours.
            </p>
            <div className="mt-10 flex items-center gap-2">
              <Link
                className="flex h-8 items-center gap-2 rounded border border-dashed px-3 font-mono text-sm transition-colors hover:bg-accent"
                href="https://github.com/cnippet-dev/ui-cnippet"
                rel="noreferrer"
                target="_blank"
              >
                <Logos.gitHub className="size-4" />
                Star us on GitHub
              </Link>
            </div>
          </div>

          {/* Docs */}
          <div>
            <h3 className="mb-4 font-mono font-semibold text-foreground text-sm">
              Docs
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/docs/introduction", label: "Introduction" },
                { href: "/docs/get-started", label: "Installation" },
                { href: "/docs/theming", label: "Theming" },
                { href: "/docs/changelog", label: "Changelog" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    className="font-mono text-foreground/60 text-sm transition-colors hover:text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 font-mono font-semibold text-foreground text-sm">
              Community
            </h3>
            <ul className="space-y-2">
              {[
                { href: "https://discord.gg/cnippet", label: "Discord" },
                { href: "https://x.com/cnippetdev", label: "X" },
                {
                  href: "https://github.com/cnippet-dev/ui-cnippet",
                  label: "GitHub",
                },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    className="font-mono text-foreground/60 text-sm transition-colors hover:text-foreground"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom watermark + ASCII background area */}
      <div className="flex flex-col items-center justify-between border-t border-dashed md:items-start">
        <div className="container-wrapper relative mx-auto">
          {/* Copyright bar */}
          <div className="absolute inset-x-0 top-0 z-50 flex flex-col justify-between gap-4 p-4 md:flex-row">
            <p className="px-6 text-center font-mono text-foreground/60 text-sm md:text-left lg:px-0">
              © {new Date().getFullYear()} cnippet. open source under MIT
              license.
            </p>
            <div className="mx-auto mt-4 flex items-center space-x-6 px-6 md:mx-0 md:mt-0 lg:px-0">
              <Link
                className="font-mono text-foreground/60 text-sm transition-colors hover:text-foreground"
                href="/legal/privacy"
              >
                Privacy
              </Link>
              <Link
                className="font-mono text-foreground/60 text-sm transition-colors hover:text-foreground"
                href="/legal/terms"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="pointer-events-none h-100 min-h-100 w-full" />

          <Background
            className="absolute inset-0 z-0"
            fieldOpacity={0.06}
            interactive={true}
            pointerTrail={true}
            pointerTrailRadius={0.2}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-100 w-full bg-linear-to-b from-background to-transparent md:h-40" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 w-full bg-linear-to-b from-background to-transparent" />

          <LogoTextSVG className="pointer-events-none absolute inset-x-0 bottom-20 z-50 hidden w-full text-background md:block" />
          <Logo className="pointer-events-none absolute inset-x-0 bottom-4 z-50 mx-auto block size-56 w-full text-background md:hidden" />
        </div>
      </div>
    </footer>
  );
}
