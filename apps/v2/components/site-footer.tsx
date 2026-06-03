"use client";
import { fadeUp } from "cnippet-aos";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";

const _links = {
  docs: [
    { href: "/docs/introduction", label: "Introduction" },
    { href: "/docs/installation", label: "Installation" },
    { href: "/docs/theming", label: "Theming" },
    { href: "/docs/changelog", label: "Changelog" },
  ],
  explore: [
    { href: "/explore", label: "All Components" },
    { href: "/playground", label: "Playground" },
    { href: "/themes", label: "Themes" },
    {
      external: true,
      href: "https://blocks.cnippet.dev",
      label: "Blocks",
    },
  ],
  resources: [
    { external: true, href: "https://base-ui.com", label: "Base UI" },
    {
      external: true,
      href: "https://tailwindcss.com",
      label: "Tailwind CSS",
    },
    { external: true, href: "https://nextjs.org", label: "Next.js" },
    {
      external: true,
      href: "https://github.com/in-deepaknegi/cnippet-ui",
      label: "GitHub",
    },
  ],
};

const pages = [
  { href: "/", label: "Home" },
  { href: "/sections", label: "Sections" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/sections/hero", label: "Hero" },
  { href: "/sections/feature", label: "Feature" },
  { href: "/sections/team", label: "Team" },
  { href: "/sections/integration", label: "Integration" },
];

const socials = [
  { href: "https://instagram.com/cnippet", label: "Instagram" },
  { href: "https://x.com/cnippet", label: "X" },
  { href: "https://21st.dev/community/cnippet_dev", label: "21st Dev" },
];

const legal = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

const formatTime = () =>
  new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });

export function SiteFooter() {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = React.useState(formatTime());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(formatTime()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header
      className={cn(
        "grid grid-cols-1 md:-mx-4",
        pathname.startsWith("/ui") || pathname.startsWith("/docs")
          ? "sticky top-0 z-50 border-b px-4 backdrop-blur [--gutter-width:2rem] md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)] lg:mx-auto dark:supports-backdrop-filter:bg-neutral-950/60"
          : "[--gutter-width:2.5rem] md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto",
      )}
    >
      {/* Left gutter */}
      <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

      {/* Header content */}

      <div>
        <footer className="relative px-4 text-primary md:px-0 dark:bg-sidebar">
          <div
            className={`mx-auto flex ${pathname.startsWith("/sections") || pathname.startsWith("/docs") ? "container" : "max-w-6xl"} flex-col gap-16 border-x px-2 py-20`}
          >
            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_auto]">
              <motion.div
                {...fadeUp({
                  delay: 0.1,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
                className="flex flex-col justify-between gap-12"
              >
                <div className="max-w-xl space-y-6">
                  <p className="font-light text-base sm:text-lg">
                    Start your project today! Contact us to learn more and
                    let&apos;s work together to achieve your goals.
                  </p>
                  <Link
                    className="group flex cursor-pointer items-center justify-start gap-0"
                    href="mailto:support@cnippet.dev"
                  >
                    <span className="rounded-full bg-sidebar px-6 py-3 text-black duration-500 ease-in-out dark:bg-white">
                      Start a Project
                    </span>
                    <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-sidebar p-5 text-black duration-500 ease-in-out group-hover:bg-secondary group-hover:text-black group-hover:transition-colors dark:bg-white">
                      <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                      <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                    </div>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                {...fadeUp({
                  delay: 0.2,
                  duration: 0.8,
                  once: true,
                  scroll: true,
                })}
                className="flex flex-wrap gap-12 text-base lg:items-start lg:gap-16"
              >
                <motion.div
                  {...fadeUp({
                    delay: 0.25,
                    duration: 0.8,
                    once: true,
                    scroll: true,
                  })}
                  className="flex items-start gap-5"
                >
                  <span className="block text-neutral-500 text-xs uppercase tracking-[0.35em]">
                    ↳ Pages
                  </span>
                  <ul className="-mt-1 space-y-2">
                    {pages.map((item) => (
                      <li key={item.href}>
                        <Link
                          className="text-sm capitalize transition hover:text-black dark:hover:text-white/80"
                          href={item.href}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  {...fadeUp({
                    delay: 0.35,
                    duration: 0.8,
                    once: true,
                    scroll: true,
                  })}
                  className="flex items-start gap-5"
                >
                  <span className="mb-2 block text-neutral-500 text-xs uppercase tracking-[0.35em]">
                    ↳ Social
                  </span>
                  <ul className="-mt-1 space-y-2">
                    {socials.map((item) => (
                      <li key={item.label}>
                        <Link
                          className="text-sm transition hover:text-black dark:hover:text-white/80"
                          href={item.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  {...fadeUp({
                    delay: 0.45,
                    duration: 0.8,
                    once: true,
                    scroll: true,
                  })}
                  className="flex items-start gap-5"
                >
                  <span className="mb-2 block text-neutral-500 text-xs uppercase tracking-[0.35em]">
                    ↳ Legal
                  </span>
                  <ul className="-mt-1 space-y-2">
                    {legal.map((item) => (
                      <li key={item.label}>
                        <Link
                          className="text-sm transition hover:text-black dark:hover:text-white/80"
                          href={item.href}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              {...fadeUp({
                delay: 0.3,
                duration: 0.8,
                once: true,
                scroll: true,
              })}
              className="flex flex-col justify-between gap-4 text-neutral-800 text-xs uppercase tracking-[0.35em] sm:flex-row md:items-end dark:text-neutral-600"
            >
              <div className="font-medium text-[2rem] uppercase leading-none sm:text-[6rem] md:text-[7rem] lg:text-[6rem]">
                ©Cnippet
              </div>

              <div className="flex flex-col space-x-5 font-mono">
                <span>INDIA: {currentTime}</span>
                <span className="text-[0.65rem] text-neutral-500 tracking-[0.4em]">
                  ©{new Date().getFullYear()} Cnippet All Rights Reserved
                </span>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>

      <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
    </header>
  );
}

function _Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-7 w-full border-edge border-gray-950/5 border-y lg:h-10 dark:border-white/10!",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10",
        "before:absolute before:right-[calc(100%+var(--gutter-width))] before:-z-1 before:h-7 before:w-screen before:border-edge before:border-gray-950/5! before:border-y lg:before:h-10 dark:before:border-white/10!",
        "after:absolute after:left-[calc(100%+var(--gutter-width))] after:-z-1 after:h-7 after:w-screen after:border-edge after:border-gray-950/5! after:border-y lg:after:h-10 dark:after:border-white/10!",
        className,
      )}
    />
  );
}
