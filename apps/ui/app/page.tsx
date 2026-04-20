const _Blocks = dynamic(() => import("@/components/home/blocks"));
const _Components = dynamic(() => import("@/components/home/components"));

import { cn } from "@/lib/utils";

const _tweetIds = [
  "1995030252259774593",
  "2012275639865217189",
  "2008848683857830005",
  "1980659099445653624",
  "1981060426315288776",
  "1957752385272738170",
  "1980646442441285656",
  "1957771454839238912",
  "1957762133787082766",
];

import dynamic from "next/dynamic";
import type { SVGProps } from "react";
import SiteHeader from "@/components/shared/header/site-header";

export const ChromeLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 190.5 190.5">
    <path
      d="M95.252 142.873c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z"
      fill="#fff"
    />
    <path
      d="m54.005 119.07-41.24-71.43a95.227 95.227 0 0 0-.003 95.25 95.234 95.234 0 0 0 82.496 47.61l41.24-71.43v-.011a47.613 47.613 0 0 1-17.428 17.443 47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z"
      fill="#229342"
    />
    <path
      d="m136.495 119.067-41.239 71.43a95.229 95.229 0 0 0 82.489-47.622A95.24 95.24 0 0 0 190.5 95.248a95.237 95.237 0 0 0-12.772-47.623H95.249l-.01.007a47.62 47.62 0 0 1 23.819 6.372 47.618 47.618 0 0 1 17.439 17.431 47.62 47.62 0 0 1-.001 47.633z"
      fill="#fbc116"
    />
    <path
      d="M95.252 132.961c20.824 0 37.705-16.881 37.705-37.706S116.076 57.55 95.252 57.55 57.547 74.431 57.547 95.255s16.881 37.706 37.705 37.706z"
      fill="#1a73e8"
    />
    <path
      d="M95.252 47.628h82.479A95.237 95.237 0 0 0 142.87 12.76 95.23 95.23 0 0 0 95.245 0a95.222 95.222 0 0 0-47.623 12.767 95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633 47.61 47.61 0 0 1 41.252-23.815z"
      fill="#e33b2e"
    />
  </svg>
);

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <div className="grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] justify-center [--gutter-width:2.5rem] md:-mx-4 md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-0">
        <VerticalSeparatorLeft />

        <main className="grid gap-24 pb-24 text-gray-950 sm:gap-40 md:pb-40 dark:text-white">
          <div>
            <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
              Model providers for Vercel AI SDK v5 & v6
            </div>

            <div className="relative before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
              <h1 className="text-balance px-2 text-4xl tracking-tighter max-sm:px-4 max-lg:font-medium sm:text-5xl lg:text-6xl xl:text-8xl">
                Ship stunning interfaces faster with Cnippet UI.
              </h1>
            </div>

            <div className="relative mt-5 px-2 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:h-px max-sm:px-4 dark:text-white/40">
              Build accessible, composable React components with Base UI and
              Tailwind CSS. Copy, paste, and make it yours.
            </div>

            <Separator />

            <div className="relative mt-10 flex gap-2 px-2 before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:after:bg-white/10 dark:before:bg-white/10">
              <Button
                className="text-balance rounded-none py-2 tracking-tight"
                render={<Link href="docs/introduction" />}
              >
                Get started
              </Button>

              <Button
                className="flex gap-2 text-balance rounded-none tracking-tight"
                render={<Link href="/components" />}
                variant="secondary"
              >
                Browse Components
                <MoveUpRight className="size-3.5" />
              </Button>
            </div>

            <HomeCodeSection />

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
        "relative flex h-7 w-full border-edge border-y lg:h-10",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10",
        "before:absolute before:right-[calc(100%+var(--gutter-width))] before:-z-1 before:h-7 before:w-screen before:border-border/50! before:border-edge before:border-y lg:before:h-10 dark:before:border-border",
        "after:absolute after:left-[calc(100%+var(--gutter-width))] after:-z-1 after:h-7 after:w-screen after:border-border/50! after:border-edge after:border-y lg:after:h-10 dark:after:border-border",
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
