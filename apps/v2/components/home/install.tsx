"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { CopyCommand } from "@/components/home/copy-command";
import { PrefetchLink } from "@/components/prefetch-link";
import {
  Frame,
  FrameHeader,
  FrameMeta,
  FramePanel,
  FrameTitle,
} from "@/components/signal/frame";
import { SignalSection } from "@/components/signal/section";
import { SignalDot } from "@/components/signal/signal-dot";
import { FlipWords } from "@/registry/default/motion/flip-words";
import { LetterSwapHover } from "@/registry/default/motion/letter-swap-hover";
import { ScrambleHover } from "@/registry/default/motion/scramble-hover";
import { SlidingNumber } from "@/registry/default/motion/sliding-number";
import { TextShimmer } from "@/registry/default/motion/text-shimmer";
import { Typewriter } from "@/registry/default/motion/typewriter";
import { Button } from "@/registry/default/ui/button";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";
import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

const TABS = [
  {
    commands: [
      {
        command: "npx shadcn@latest add @cnippet/button",
        note: "Drops button.tsx into your project. It's yours now.",
      },
      {
        command: "npx shadcn@latest add @cnippet/table",
        note: "Pulls the component and everything it depends on.",
      },
      {
        command: "npx shadcn@latest add @cnippet/ui",
        note: "Adds every component in one pass.",
      },
    ],
    id: "ui",
    label: "Components",
  },
  {
    commands: [
      {
        command: "npx shadcn@latest add @cnippet/hero-01",
        note: "A full section built from the same primitives.",
      },
      {
        command: "npx shadcn@latest add @cnippet/text-reveal",
        note: "A motion-driven text component, ready to animate.",
      },
      {
        command: "npx shadcn@latest add @cnippet/pricing-02",
        note: "A complete, responsive block — no assembly.",
      },
    ],
    id: "blocks",
    label: "Blocks & motion",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const FRAMEWORKS = ["Next.js", "React", "Vite", "Remix", "Astro", "Laravel"];

const OTP_SLOTS = ["otp-1", "otp-2", "otp-3", "otp-4"];

function CounterPreview() {
  const [count, setCount] = useState(1284);
  return (
    <div className="flex items-center gap-2.5">
      <Button
        aria-label="Decrease"
        onClick={() => setCount((n) => n - 1)}
        size="icon-xs"
        variant="outline"
      >
        <Minus />
      </Button>
      <span className="min-w-14 text-center font-display font-semibold text-[20px] tabular-nums tracking-[-0.03em]">
        <SlidingNumber value={count} />
      </span>
      <Button
        aria-label="Increase"
        onClick={() => setCount((n) => n + 1)}
        size="icon-xs"
        variant="outline"
      >
        <Plus />
      </Button>
    </div>
  );
}

// Components you won't find in a stock shadcn/ui install: cnippet's motion
// set, plus primitives only Base UI ships. Every preview is the real
// registry source — the same file the CLI copies.
const PREVIEWS = [
  {
    kind: "motion",
    name: "text-shimmer",
    render: (
      <TextShimmer className="font-medium text-[15px]" duration={1.6}>
        Generating preview…
      </TextShimmer>
    ),
  },
  {
    kind: "motion",
    name: "sliding-number",
    render: <CounterPreview />,
  },
  {
    kind: "motion",
    name: "flip-words",
    render: (
      <p className="font-medium text-[15px]">
        Ship it{" "}
        <FlipWords
          className="font-serif text-[17px] text-signal italic"
          words={["faster", "cleaner", "today"]}
        />
      </p>
    ),
  },
  {
    kind: "motion",
    name: "scramble-hover",
    render: (
      <ScrambleHover className="cursor-default font-mono text-[13px]">
        hover to decrypt
      </ScrambleHover>
    ),
  },
  {
    kind: "motion",
    name: "typewriter",
    render: (
      <Typewriter
        className="font-mono text-[13px]"
        loop
        text={["copy.", "paste.", "own it."]}
        waitTime={1400}
      />
    ),
  },
  {
    kind: "motion",
    name: "letter-swap-hover",
    render: (
      <LetterSwapHover
        className="w-fit cursor-default justify-start font-medium text-[15px]"
        label="Hover me"
      />
    ),
  },
  {
    kind: "base ui",
    name: "meter",
    render: (
      <Meter className="w-full" value={62}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel className="text-[13px]">Storage</MeterLabel>
          <MeterValue className="font-mono text-[12px]" />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    ),
  },
  {
    kind: "base ui",
    name: "otp-field",
    render: (
      <OTPField aria-label="One-time code" length={OTP_SLOTS.length}>
        {OTP_SLOTS.map((slot, i) => (
          <OTPFieldInput
            aria-label={`Digit ${i + 1} of ${OTP_SLOTS.length}`}
            key={slot}
          />
        ))}
      </OTPField>
    ),
  },
];

export function Install() {
  const [activeTab, setActiveTab] = useState<TabId>(TABS[0].id);
  const tab = TABS.find((entry) => entry.id === activeTab) ?? TABS[0];

  return (
    <SignalSection
      id="install"
      index="02"
      kicker="install"
      lead="The CLI writes source into components/ui/ and gets out of the way. No wrapper package, no hidden dependency, no lock-in."
      title={
        <>
          One command. <em>Then it's yours.</em>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Frame>
          <FrameHeader className="py-1.5">
            <Tabs
              onValueChange={(value) => setActiveTab(value as TabId)}
              value={activeTab}
            >
              <TabsList className="bg-transparent">
                {TABS.map((entry) => (
                  <TabsTab key={entry.id} value={entry.id}>
                    {entry.label}
                  </TabsTab>
                ))}
              </TabsList>
            </Tabs>
            <FrameMeta className="hidden sm:inline">terminal</FrameMeta>
          </FrameHeader>
          <FramePanel className="flex flex-col p-5 sm:p-6">
            <ol className="mb-8 flex flex-col gap-5">
              {tab.commands.map((entry, i) => (
                <li className="flex gap-4" key={entry.command}>
                  <span className="mt-2.5 font-mono text-[11px] text-faint tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <CopyCommand command={entry.command} />
                    <p className="mt-2 text-[13px] text-muted-foreground">
                      {entry.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5">
              <span className="font-mono text-[11px] text-faint">
                {"// works with"}
              </span>
              {FRAMEWORKS.map((framework) => (
                <span className="text-[13px] text-foreground" key={framework}>
                  {framework}
                </span>
              ))}
            </div>
          </FramePanel>
        </Frame>

        <Frame>
          <FrameHeader>
            <FrameTitle className="flex items-center gap-2">
              <SignalDot />
              Only in cnippet
            </FrameTitle>
            <FrameMeta>motion · base ui</FrameMeta>
          </FrameHeader>
          <FramePanel className="grid grid-cols-2">
            {PREVIEWS.map((preview, i) => (
              <div
                className="flex min-h-32 min-w-0 flex-col justify-between gap-4 border-border p-4 transition-colors duration-150 hover:bg-frame/60 sm:p-5 not-nth-last-[-n+2]:border-b odd:border-e"
                key={preview.name}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-faint">
                  <span className="truncate">
                    {String(i + 1).padStart(2, "0")} · {preview.name}
                  </span>
                  <span className="hidden shrink-0 sm:inline">
                    {preview.kind}
                  </span>
                </div>
                <div>{preview.render}</div>
              </div>
            ))}
          </FramePanel>
          <div className="flex items-center justify-between gap-3 px-3 pt-2.5 pb-1.5">
            <span className="text-[13px] text-muted-foreground">
              Originals — not in a stock shadcn/ui install.
            </span>
            <PrefetchLink
              className="group/more inline-flex shrink-0 items-center gap-1 font-medium text-[13px] text-foreground"
              href="/motion"
            >
              All motion
              <ArrowRight className="size-3.5 transition-transform duration-250 ease-out-expo group-hover/more:translate-x-0.5" />
            </PrefetchLink>
          </div>
        </Frame>
      </div>
    </SignalSection>
  );
}
