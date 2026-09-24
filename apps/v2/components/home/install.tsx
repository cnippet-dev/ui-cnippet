"use client";

import { ArrowRight } from "lucide-react";
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
import { Facehash } from "@/components/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { Switch } from "@/registry/default/ui/switch";
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

// Every preview below is the real component from registry/default/ui — the
// same source the CLI copies.
const PREVIEWS = [
  {
    name: "button",
    render: (
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Deploy</Button>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
      </div>
    ),
  },
  {
    name: "badge",
    render: (
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="success">Passing</Badge>
        <Badge variant="outline">v2.0</Badge>
      </div>
    ),
  },
  {
    name: "input",
    render: (
      <Input aria-label="Email" placeholder="you@example.com" size="sm" />
    ),
  },
  {
    name: "switch",
    render: (
      <div className="flex items-center gap-2.5">
        <Switch aria-label="Dark mode" defaultChecked />
        <span className="text-[13px] text-muted-foreground">Dark mode</span>
      </div>
    ),
  },
  {
    name: "kbd",
    render: (
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    ),
  },
  {
    name: "avatar",
    render: (
      <div className="flex -space-x-2">
        {["UU", "AAAk", "I"].map((seed) => (
          <span
            className="inline-block size-7 overflow-hidden rounded-full ring-2 ring-card"
            key={seed}
          >
            <Facehash name={seed} />
          </span>
        ))}
      </div>
    ),
  },
  {
    name: "skeleton",
    render: (
      <div className="flex w-full items-center gap-2.5">
        <Skeleton className="size-7 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-2.5 w-full" />
          <Skeleton className="h-2.5 w-2/3" />
        </div>
      </div>
    ),
  },
  {
    name: "status",
    render: (
      <span className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
        <SignalDot pulse />
        Live preview
      </span>
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
      <div className="grid gap-4 lg:grid-cols-2">
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
              Rendered live
            </FrameTitle>
            <FrameMeta>registry/default/ui</FrameMeta>
          </FrameHeader>
          <FramePanel className="grid grid-cols-2">
            {PREVIEWS.map((preview, i) => (
              <div
                className="flex min-h-32 flex-col justify-between gap-4 border-border p-4 transition-colors duration-150 hover:bg-frame/60 sm:p-5 [&:not(:nth-last-child(-n+2))]:border-b [&:nth-child(odd)]:border-e"
                key={preview.name}
              >
                <span className="font-mono text-[11px] text-faint">
                  {String(i + 1).padStart(2, "0")} · {preview.name}
                </span>
                <div>{preview.render}</div>
              </div>
            ))}
          </FramePanel>
          <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
            <span className="text-[13px] text-muted-foreground">
              8 of 97, from the same source the CLI copies.
            </span>
            <PrefetchLink
              className="group/more inline-flex items-center gap-1 font-medium text-[13px] text-foreground"
              href="/explore"
            >
              See all
              <ArrowRight className="size-3.5 transition-transform duration-250 ease-out-expo group-hover/more:translate-x-0.5" />
            </PrefetchLink>
          </div>
        </Frame>
      </div>
    </SignalSection>
  );
}
