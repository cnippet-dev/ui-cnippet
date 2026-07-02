import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Blocks from "@/components/blocks";
import Components from "@/components/components";
import { HomeThemes } from "@/components/home-themes";
import { CornerPlus } from "@/components/layout/corner-plus";
import { Footer } from "@/components/layout/footer";
import { TopBar } from "@/components/layout/topbar";
import MotionComponents from "@/components/motion-components";
import { Background } from "@/components/ui/background";
import { Logos } from "@/components/ui/logos";

export const metadata: Metadata = {
  description:
    "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
  openGraph: {
    description:
      "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
    title: "Cnippet UI",
    url: "https://ui.cnippet.dev",
  },
  title: "Cnippet UI",
  twitter: {
    description:
      "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
    title: "Cnippet UI",
  },
};

export default function HomePage() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-clip">
      <TopBar>
        <Link
          className="inline-flex h-8 items-center justify-center rounded-[2px] border border-transparent bg-primary px-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          href="/docs/introduction"
        >
          Get started
        </Link>
        <Link
          className="hidden h-8 items-center justify-center rounded-[2px] border px-3 font-medium text-sm transition-colors hover:bg-accent md:inline-flex"
          href="/explore"
        >
          Components
        </Link>
      </TopBar>

      <main className="flex flex-1 flex-col">
        <div className="container-wrapper mx-auto">
          {/* Hero — terminal layout */}
          <div className="relative min-h-svh overflow-hidden border-b border-dashed">
            <CornerPlus className="left-0 -translate-x-1/2" />
            <CornerPlus className="right-0 translate-x-1/2" />
            {/* Top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-background to-transparent" />
            {/* Bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-t from-background to-transparent" />

            {/* Content */}
            <div className="relative z-20 flex min-h-svh flex-col pt-16">
              {/* Two-column split */}

              <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
                {/* Left — terminal window */}
                <div className="relative flex items-center justify-center border-b border-dashed px-8 py-16 lg:border-r lg:border-b-0 lg:px-12 lg:py-20">
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Background
                      accentColorVar="--cnippet-blue"
                      className="absolute inset-0 z-0"
                      fieldOpacity={0.12}
                      interactive={true}
                      pointerTrail={true}
                      pointerTrailIntensity={0.5}
                      pointerTrailRadius={0.22}
                      speed={0.85}
                    />
                  </div>
                  <div className="w-full max-w-105 rounded-[2px] border border-dashed bg-background/70 ring-1 ring-cnippet-blue/10 backdrop-blur-sm">
                    {/* Title bar */}
                    <div className="flex items-center gap-3 border-b border-dashed px-4 py-3">
                      <div className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-red-400/50" />
                        <span className="size-2.5 rounded-full bg-yellow-400/50" />
                        <span className="size-2.5 rounded-full bg-green-400/50" />
                      </div>
                      <span className="font-mono text-muted-foreground/40 text-xs">
                        ~ cnippet-app
                      </span>
                    </div>

                    {/* Terminal body */}
                    <div className="space-y-4 px-5 py-5 font-mono text-sm">
                      {/* Init command */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="select-none text-cnippet-blue">
                            $
                          </span>
                          <span className="text-foreground">
                            npx cnippet@latest init
                          </span>
                        </div>
                        <div className="space-y-1.5 pl-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-cnippet-green text-xs">
                              ✓
                            </span>
                            <span>Detected Next.js project</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-cnippet-green text-xs">
                              ✓
                            </span>
                            <span>Tailwind CSS v4 configured</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-cnippet-green text-xs">
                              ✓
                            </span>
                            <span>Base UI primitives installed</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-dashed" />

                      {/* Add components command */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="select-none text-cnippet-blue">
                            $
                          </span>
                          <span className="text-foreground">
                            npx cnippet add button dialog toast
                          </span>
                        </div>
                        <div className="space-y-1.5 pl-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-cnippet-green text-xs">
                              ✓
                            </span>
                            <span>
                              button.tsx{" "}
                              <span className="text-muted-foreground/40">
                                added
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-cnippet-green text-xs">
                              ✓
                            </span>
                            <span>
                              dialog.tsx{" "}
                              <span className="text-muted-foreground/40">
                                added
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-cnippet-green text-xs">
                              ✓
                            </span>
                            <span>
                              toast.tsx{" "}
                              <span className="text-muted-foreground/40">
                                added
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pl-4">
                          <span className="text-cnippet-orange text-xs">✓</span>
                          <span className="text-muted-foreground/60">
                            3 components added in{" "}
                            <span className="text-cnippet-orange">0.8s</span>
                          </span>
                        </div>
                      </div>

                      {/* Cursor */}
                      <div className="flex gap-2">
                        <span className="select-none text-cnippet-blue">$</span>
                        <span
                          aria-hidden
                          className="inline-block h-4 w-1.75 animate-pulse bg-cnippet-blue/60"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right — label + heading + CTAs */}
                <div className="flex flex-col justify-center gap-7 px-8 py-16 lg:px-12 lg:py-20">
                  {/* Label pill */}
                  <div className="inline-flex w-fit items-center gap-2 rounded-[2px] border border-cnippet-blue/40 border-dashed bg-cnippet-blue/5 px-3 py-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-cnippet-blue" />
                    <span className="font-medium font-mono text-cnippet-blue text-xs tracking-wide">
                      component library · base ui · tailwind css
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="font-f37-stout text-[48px] leading-none tracking-tight sm:text-[56px] lg:text-[60px] xl:text-[72px]">
                    Ship stunning
                    <br />
                    interfaces faster.
                    <br />
                    <span className="text-cnippet-blue">Built for speed.</span>
                  </h1>

                  {/* Description */}
                  <p className="max-w-sm text-balance text-base text-muted-foreground leading-relaxed">
                    Copy, paste, own your code. Built on Base UI primitives and
                    styled with Tailwind CSS — no black-box dependencies, no
                    lock-in.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <Link
                      className="group inline-flex h-10 items-center justify-center gap-2 rounded-[2px] bg-primary px-7 font-medium text-primary-foreground text-sm transition-all duration-200 hover:bg-primary/85"
                      href="/docs/introduction"
                    >
                      Get started
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-[2px] border border-dashed px-7 font-medium text-sm transition-all duration-200 hover:border-cnippet-blue/40 hover:bg-cnippet-blue/5 hover:text-cnippet-blue"
                      href="/explore"
                    >
                      Browse components
                    </Link>
                  </div>

                  {/* Tech stack */}
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-muted-foreground/40 text-xs">
                      built with
                    </span>
                    <div className="flex items-center gap-3">
                      <Link
                        href="https://react.dev"
                        rel="noopener"
                        target="_blank"
                      >
                        <Logos.react className="size-4 opacity-50 transition-opacity duration-200 hover:opacity-100" />
                      </Link>
                      <Link
                        href="https://nextjs.org"
                        rel="noopener"
                        target="_blank"
                      >
                        <Logos.nextjs className="size-4 opacity-50 transition-opacity duration-200 hover:opacity-100" />
                      </Link>
                      <Link
                        href="https://tailwindcss.com"
                        rel="noopener"
                        target="_blank"
                      >
                        <Logos.tailwind className="size-4 opacity-50 transition-opacity duration-200 hover:opacity-100" />
                      </Link>
                      <Link
                        href="https://base-ui.com"
                        rel="noopener"
                        target="_blank"
                      >
                        <Logos.baseUI className="size-4 opacity-50 transition-opacity duration-200 hover:opacity-100" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stat strip */}
              <div className="grid grid-cols-2 divide-x divide-dashed border-t border-dashed sm:grid-cols-4">
                <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-orange/5">
                  <span className="absolute inset-x-0 top-0 h-px bg-cnippet-orange opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="font-f37-stout text-3xl text-cnippet-orange leading-none">
                    57
                  </span>
                  <span className="mt-1 font-mono text-muted-foreground text-xs">
                    core components
                  </span>
                </div>
                <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-blue/5">
                  <span className="absolute inset-x-0 top-0 h-px bg-cnippet-blue opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="font-f37-stout text-3xl text-cnippet-blue leading-none">
                    40+
                  </span>
                  <span className="mt-1 font-mono text-muted-foreground text-xs">
                    motion animations
                  </span>
                </div>
                <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-green/5">
                  <span className="absolute inset-x-0 top-0 h-px bg-cnippet-green opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="font-f37-stout text-3xl text-cnippet-green leading-none">
                    MIT
                  </span>
                  <span className="mt-1 font-mono text-muted-foreground text-xs">
                    open-source forever
                  </span>
                </div>
                <div className="group relative flex flex-col gap-1 px-6 py-5 transition-colors duration-200 hover:bg-cnippet-yellow/5">
                  <span className="absolute inset-x-0 top-0 h-px bg-cnippet-yellow opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="font-f37-stout text-3xl text-cnippet-yellow leading-none">
                    100%
                  </span>
                  <span className="mt-1 font-mono text-muted-foreground text-xs">
                    copy-paste ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Component showcase sections */}
          <Components />
          <MotionComponents />
          <HomeThemes />
          <Blocks />
        </div>
      </main>

      <Footer />
    </div>
  );
}
