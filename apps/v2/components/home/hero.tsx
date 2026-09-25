import { ArrowRight } from "lucide-react";
import { CopyCommand } from "@/components/home/copy-command";
import { HERO_SNIPPETS } from "@/components/home/hero-snippets";
import { HeroStage } from "@/components/home/hero-stage";
import { PrefetchLink } from "@/components/prefetch-link";
import { Nodes } from "@/components/signal/rule";
import { CONTAINER } from "@/components/signal/section";
import { SignalDot } from "@/components/signal/signal-dot";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

const STATS = [
  { label: "components", value: "97" },
  { label: "motion variants", value: "40+" },
  { label: "license", value: "MIT" },
  { label: "forever", value: "$0" },
];

/** Staggered entry — each child rises 60ms after the previous one. */
const rise = (step: number) =>
  cn(
    "motion-safe:animate-rise",
    [
      "",
      "[animation-delay:60ms]",
      "[animation-delay:120ms]",
      "[animation-delay:180ms]",
      "[animation-delay:240ms]",
      "[animation-delay:300ms]",
    ][step],
  );

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden md:rounded-t-canvas">
      {/* Texture: a dot grid fading down from the top edge, wider and deeper
          than the default so it reaches the stat strip. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-dot-field [--dot-field-h:130%] [--dot-field-w:60%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-signal-soft blur-3xl"
      />

      <div
        className={cn(
          CONTAINER,
          "grid grid-cols-1 items-center gap-14 pt-[calc(var(--header-height)+3rem)] pb-20 md:pt-[calc(var(--header-height)+4.5rem)] md:pb-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12",
        )}
      >
        <div className="flex flex-col items-start">
          <PrefetchLink
            className={cn(
              "group/pill inline-flex items-center gap-2 rounded-full border bg-background py-1 ps-2.5 pe-1 text-[13px] text-muted-foreground shadow-xs/4 transition-colors duration-150 hover:border-border-strong hover:text-foreground",
              rise(0),
            )}
            href="/docs/changelog"
          >
            <SignalDot pulse />
            <span>
              <span className="text-foreground">v2</span> — rebuilt on Base UI
            </span>
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-muted transition-transform duration-250 ease-out-expo group-hover/pill:translate-x-0.5">
              <ArrowRight className="size-3" />
            </span>
          </PrefetchLink>

          <h1
            className={cn(
              "mt-7 text-balance font-display font-semibold text-[clamp(2.6rem,6.4vw,4.5rem)] pb-2 text-ink leading-none tracking-tighter",
              rise(1),
            )}
          >
            <span className="lg:whitespace-nowrap">Stop rebuilding UI.</span>
            <br />
            <em className="font-normal font-serif tracking-[-0.015em] ">
              Start shipping.
            </em>
          </h1>

          <p
            className={cn(
              "mt-6 max-w-lg text-[17px] text-muted-foreground leading-relaxed",
              rise(2),
            )}
          >
            97 production-ready components you copy, paste and own. Built on
            Base UI primitives, styled with Tailwind CSS — accessible by
            default, yours to bend.
          </p>

          <div
            className={cn("mt-8 flex flex-wrap items-center gap-2.5", rise(3))}
          >
            <Button
              className="group/cta"
              render={<PrefetchLink href="/explore" />}
              size="lg"
            >
              Browse components
              <ArrowRight className="transition-transform duration-250 ease-out-expo group-hover/cta:translate-x-0.5" />
            </Button>
            <Button
              render={<PrefetchLink href="/docs/introduction" />}
              size="lg"
              variant="outline"
            >
              Read the docs
            </Button>
          </div>

          <div className={cn("mt-8 w-full max-w-md", rise(4))}>
            <CopyCommand command="npx shadcn@latest add @cnippet/button" />
          </div>
        </div>

        <HeroPlayground className={rise(3)} />
      </div>

      {/* Stat strip — hairline cells, numbers in display type. */}
      <div className="relative border-t">
        <Nodes />
        <dl className={cn(CONTAINER, "grid grid-cols-2 md:grid-cols-4")}>
          {STATS.map((stat, i) => (
            <div
              className={cn(
                "flex items-baseline gap-2.5 py-6 md:py-7",
                i % 2 === 1 && "ps-6 max-md:border-s",
                i >= 2 && "max-md:border-t",
                i > 0 && "md:border-s md:ps-8",
              )}
              key={stat.label}
            >
              <dd className="font-display font-semibold text-[28px] tabular-nums tracking-[-0.04em] md:text-[32px]">
                {stat.value}
              </dd>
              <dt className="font-mono text-[12px] text-faint">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * The product, shown working: live registry components beside the code you'd
 * paste, with a scoped accent/radius control. Code is highlighted here on the
 * server so shiki never ships to the client.
 */
async function HeroPlayground({ className }: { className?: string }) {
  const snippets = await Promise.all(
    HERO_SNIPPETS.map(async (snippet) => ({
      html: await highlightCode(snippet.code),
      name: snippet.name,
    })),
  );
  return <HeroStage className={className} snippets={snippets} />;
}
