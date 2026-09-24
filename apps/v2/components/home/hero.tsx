import { ArrowRight, Check } from "lucide-react";
import { CopyCommand } from "@/components/home/copy-command";
import { PrefetchLink } from "@/components/prefetch-link";
import {
  Frame,
  FrameHeader,
  FrameMeta,
  FramePanel,
  FrameTitle,
} from "@/components/signal/frame";
import { Nodes } from "@/components/signal/rule";
import { CONTAINER } from "@/components/signal/section";
import { SignalDot } from "@/components/signal/signal-dot";
import { Facehash } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/default/ui/progress";
import { Switch } from "@/registry/default/ui/switch";

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
      {/* Texture: column lines fading down from the top edge, plus grain. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dot-field" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 mx-auto h-80 max-w-3xl rounded-full bg-signal-soft blur-3xl"
      />

      <div
        className={cn(
          CONTAINER,
          "grid items-center gap-14 pt-[calc(var(--header-height)+3rem)] pb-20 md:pt-[calc(var(--header-height)+4.5rem)] md:pb-24 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-12",
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
              "mt-7 text-balance font-display font-semibold text-[clamp(2.6rem,6.4vw,4.5rem)] text-ink leading-[1] tracking-[-0.05em]",
              rise(1),
            )}
          >
            <span className="lg:whitespace-nowrap">Stop rebuilding UI.</span>
            <br />
            <em className="font-normal font-serif tracking-[-0.015em]">
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

        <HeroStage className={rise(3)} />
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
 * A small, real interface assembled from registry components — the product,
 * shown working, instead of a screenshot.
 */
function HeroStage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-md lg:max-w-none",
        className,
      )}
    >
      <Frame className="shadow-float" spotlight>
        <FrameHeader>
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
            </span>
            <FrameTitle className="ms-1 font-mono font-normal text-[12px] text-muted-foreground">
              deploy-settings.tsx
            </FrameTitle>
          </div>
          <FrameMeta>6 components</FrameMeta>
        </FrameHeader>
        <FramePanel className="flex flex-col gap-5 p-5">
          <div className="flex items-center gap-3">
            <span className="inline-block size-9 shrink-0 overflow-hidden rounded-lg">
              <Facehash name="cnippet" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-[14px] leading-tight">
                cnippet-ui
              </p>
              <p className="font-mono text-[11px] text-muted-foreground">
                main · 4f2a91c
              </p>
            </div>
            <Badge variant="success">
              <Check />
              Passing
            </Badge>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="font-medium text-[13px]"
              htmlFor="hero-project-name"
            >
              Project name
            </label>
            <Input defaultValue="cnippet-ui" id="hero-project-name" />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border bg-frame px-3 py-2.5">
            <div>
              <p className="font-medium text-[13px]">Preview deployments</p>
              <p className="text-[12px] text-muted-foreground">
                Every pull request gets a URL
              </p>
            </div>
            <Switch aria-label="Preview deployments" defaultChecked />
          </div>

          <Progress value={72}>
            <div className="flex items-center justify-between">
              <ProgressLabel className="text-[13px]">Build</ProgressLabel>
              <ProgressValue className="font-mono text-[12px]" />
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>

          <div className="flex items-center justify-end gap-2 border-t pt-4">
            <Button size="sm" variant="ghost">
              Cancel
            </Button>
            <Button size="sm">
              Deploy
              <KbdGroup className="ms-1 gap-0.5 opacity-70">
                <Kbd className="h-4 min-w-4 bg-primary-foreground/15 text-[10px] text-primary-foreground">
                  ⌘
                </Kbd>
                <Kbd className="h-4 min-w-4 bg-primary-foreground/15 text-[10px] text-primary-foreground">
                  ↵
                </Kbd>
              </KbdGroup>
            </Button>
          </div>
        </FramePanel>
      </Frame>

      {/* Floating status chip — depth without a screenshot. */}
      <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border bg-popover px-3 py-2 text-[12px] shadow-float sm:flex md:-left-8">
        <SignalDot pulse />
        <span className="text-muted-foreground">
          Deployed in <span className="font-mono text-foreground">1.2s</span>
        </span>
      </div>
    </div>
  );
}
