import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LINKS = {
  connect: [
    {
      external: true,
      href: "https://instagram.com/cnippet",
      label: "Instagram",
    },
    { external: true, href: "https://x.com/cnippet", label: "X / Twitter" },
    {
      external: true,
      href: "https://21st.dev/community/cnippet_dev",
      label: "21st Dev",
    },
    {
      external: true,
      href: "https://github.com/cnippet-dev/ui-cnippet",
      label: "GitHub",
    },
  ],
  docs: [
    { href: "/docs/introduction", label: "Introduction" },
    { href: "/docs/get-started", label: "Installation" },
    { href: "/docs/theming", label: "Theming" },
    { href: "/docs/changelog", label: "Changelog" },
  ],
  explore: [
    { href: "/explore", label: "All Components" },
    { href: "/playground", label: "Playground" },
    { href: "/themes", label: "Themes" },
    { external: true, href: "https://blocks.cnippet.dev", label: "Blocks" },
  ],
  resources: [
    { external: true, href: "https://base-ui.com", label: "Base UI" },
    { external: true, href: "https://tailwindcss.com", label: "Tailwind CSS" },
    { external: true, href: "https://nextjs.org", label: "Next.js" },
    { external: true, href: "https://react.dev", label: "React" },
  ],
};

// const LEGAL = [
//   { href: "/terms", label: "Terms" },
//   { href: "/privacy", label: "Privacy" },
// ];

export function SiteFooter() {
  return (
    <footer
      className={cn(
        "grid grid-cols-1 border-gray-950/5 border-t",
        "[--gutter-width:2.5rem] md:-mx-4",
        "md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)]",
        "lg:mx-auto dark:border-white/10",
      )}
    >
      {/* Left gutter */}
      <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

      {/* Footer content */}
      <div className="text-gray-950 dark:text-white">
        {/* Label bar */}
        <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
          cnippet.dev · Base UI · Tailwind CSS v4 · MIT License
        </div>

        {/* Heading */}
        <div className="relative before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
          <div className="flex items-center gap-3 text-balance px-2 text-4xl tracking-tighter max-sm:px-4 max-lg:font-medium sm:gap-4 sm:text-5xl lg:gap-5 lg:text-6xl xl:gap-6 xl:text-6xl">
            <span className="w-fit">
              <Image
                alt=""
                className="size-40 dark:hidden"
                height={500}
                src="/images/logo-light.png"
                width={500}
              />
              <Image
                alt=""
                className="hidden size-40 object-cover dark:block"
                height={1000}
                src="/images/logo-dark.png"
                width={1000}
              />
            </span>
            Build beautiful <br /> interfaces, faster.
          </div>
        </div>

        {/* Subtitle */}
        <div className="relative mt-5 px-2 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:text-white/40 dark:after:bg-white/10">
          Copy, paste, and make it yours — no subscription required.
        </div>

        {/* Link columns */}
        <div className="relative grid grid-cols-2 gap-x-8 gap-y-10 px-2 py-12 after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:grid-cols-4 dark:after:bg-white/10">
          {(
            [
              { items: LINKS.docs, label: "Docs" },
              { items: LINKS.explore, label: "Explore" },
              { items: LINKS.resources, label: "Resources" },
              { items: LINKS.connect, label: "Connect" },
            ] as const
          ).map(({ label, items }) => (
            <div key={label}>
              <p className="mb-4 font-mono text-black/40 text-xs tracking-tighter dark:text-white/40">
                {label}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="inline-flex items-center gap-1 font-mono text-black/60 text-xs tracking-tighter transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
                      href={item.href}
                      {...("external" in item && item.external
                        ? { rel: "noopener noreferrer", target: "_blank" }
                        : {})}
                    >
                      {item.label}
                      {"external" in item && item.external && (
                        <ArrowUpRight className="size-2.5 opacity-40" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-4 px-2 py-4 font-mono text-black/30 text-xs tracking-tighter max-sm:px-4 dark:text-white/30">
          <div className="flex items-center gap-2.5">
            <span>
              © {new Date().getFullYear()} Cnippet. All rights reserved.
            </span>
          </div>
          {/* <div className="flex items-center gap-4">
            {LEGAL.map((item) => (
              <Link
                className="transition-colors hover:text-black/60 dark:hover:text-white/50"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div> */}
        </div>
      </div>

      {/* Right gutter */}
      <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
    </footer>
  );
}
