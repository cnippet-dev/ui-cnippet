import { Button } from "@cnippet/ui/components/button";
import { MoveUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Blocks from "@/components/blocks";
import Components from "@/components/components";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

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
    <>
      <SiteHeader />
      <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center border-gray-950/5 border-t [--gutter-width:2.5rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-0 dark:border-white/10">
        <VerticalSeparatorLeft />

        <main className="grid gap-24 pb-24 text-gray-950 sm:gap-40 md:pb-40 dark:text-white">
          <div>
            <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
              56 components · 657 variants · Base UI · Tailwind CSS v4
            </div>

            <div className="relative before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
              <h1 className="text-balance px-2 text-4xl tracking-tighter max-sm:px-4 max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-8xl">
                Ship stunning interfaces faster with Cnippet UI.
              </h1>
            </div>

            <div className="relative mt-5 px-2 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:text-white/40">
              Build accessible, composable React components with Base UI and
              Tailwind CSS. Copy, paste, and make it yours.
            </div>

            <Separator />

            <div className="relative mt-10 flex gap-2 px-2 before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:after:bg-white/10 dark:before:bg-white/10">
              <Button
                className="text-balance rounded-none py-5 tracking-tight"
                render={<Link href="/docs/introduction" />}
              >
                Get started
              </Button>

              <Button
                className="flex gap-2 text-balance rounded-none py-5 tracking-tight"
                render={<Link href="/explore" />}
                variant="secondary"
              >
                Browse Components
                <MoveUpRight className="size-3.5" />
              </Button>
            </div>

            <Components />

            <Blocks />
          </div>
        </main>

        <VerticalSeparatorRight />
      </div>
    </>
  );
}

function Separator({ className }: { className?: string }) {
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

function VerticalSeparatorRight({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:col-start-3 md:block dark:[--pattern-fg:var(--color-white)]/8",
        className,
      )}
    />
  );
}

function VerticalSeparatorLeft({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "col-start-1 row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8",
        className,
      )}
    />
  );
}
