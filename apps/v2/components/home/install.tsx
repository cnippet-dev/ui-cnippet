"use client";

import { useState } from "react";
import { CopyCommand } from "@/components/home/copy-command";
import { Section, SectionBody, SectionHeader } from "@/components/home/section";
import { Facehash } from "@/components/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import { Kbd, KbdGroup } from "@/registry/default/ui/kbd";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { Switch } from "@/registry/default/ui/switch";
import { cn } from "@/lib/utils";

const TABS = [
  {
    commands: [
      {
        command: "npx shadcn@latest add @cnippet/button",
        note: "Drops button.tsx into your project. It's yours now — edit it, rename it, delete it.",
      },
      {
        command: "npx shadcn@latest add @cnippet/table",
        note: "Pulls the component and everything it depends on, in one pass.",
      },
      {
        command: "npx shadcn@latest add @cnippet/ui",
        note: "Adds every component in one pass — perfect for starting fresh.",
      },
    ],
    id: "ui",
    intro:
      "Run it for every component you need — the source lands in components/ui/, and it's yours: edit it, rename it, delete it. No dependency, no lock-in.",
    label: "Add a component",
  },
  {
    commands: [
      {
        command: "npx shadcn@latest add @cnippet/hero-01",
        note: "Adds a full section built from the same primitives — copy it in and start editing.",
      },
      {
        command: "npx shadcn@latest add @cnippet/text-reveal",
        note: "Drops in a motion-driven text component, ready to animate on scroll.",
      },
      {
        command: "npx shadcn@latest add @cnippet/pricing-02",
        note: "Pulls a complete, responsive block — no assembly required.",
      },
    ],
    id: "blocks",
    intro:
      "Beyond single components: full sections, motion primitives, and blocks — generated the same way, dropped into the same folder.",
    label: "Add a block",
  },
] as const;

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
      <div className="flex flex-wrap items-center gap-2">
        <Badge size="sm" variant="success">
          Passing
        </Badge>
        <Badge size="sm" variant="outline">
          v0.4
        </Badge>
      </div>
    ),
  },
  {
    name: "input",
    render: <Input defaultValue="" placeholder="you@example.com" />,
  },
  {
    name: "switch",
    render: (
      <div className="flex items-center gap-3">
        <Switch defaultChecked />
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
    name: "facehash",
    render: (
      <div className="flex items-center gap-1.5">
        {["UU", "AAAk", "I"].map((seed) => (
          <span
            className="inline-block size-7 shrink-0 rounded-xs border border-border border-dashed p-0.5"
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
      <div className="w-full space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    ),
  },
  {
    name: "avatar",
    render: (
      <div className="flex items-center gap-2">
        <span className="inline-block size-8 shrink-0 rounded-xs border border-border border-dashed p-0.5">
          <Facehash name="cnippet" />
        </span>
        <div className="leading-tight">
          <div className="text-[13px] text-foreground">Cnippet UI</div>
          <div className="font-mono text-[10px] text-muted-foreground">
            component
          </div>
        </div>
      </div>
    ),
  },
];

export function Install() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["id"]>(
    TABS[0].id,
  );
  const tab = TABS.find((entry) => entry.id === activeTab) ?? TABS[0];

  return (
    <Section id="install">
      <SectionHeader
        index="02"
        meta="[for developers]"
        title="Install it in one command"
      />

      <SectionBody className="grid grid-cols-1 p-0 sm:p-0 lg:grid-cols-2">
        {/* Commands */}
        <div className="border-dashed px-5 py-10 sm:px-8 sm:py-14 lg:border-r">
          <div className="flex gap-1 border border-dashed p-1">
            {TABS.map((entry) => (
              <button
                className={cn(
                  "flex-1 rounded-xs px-3 py-2 font-mono text-[12px] transition-colors",
                  entry.id === activeTab
                    ? "bg-cnippet-accent text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
                key={entry.id}
                onClick={() => setActiveTab(entry.id)}
                type="button"
              >
                {entry.label}
              </button>
            ))}
          </div>

          <p className="mt-6 max-w-md text-[15px] text-foreground leading-relaxed">
            {tab.intro}
          </p>

          <div className="mt-8 space-y-6">
            {tab.commands.map((entry) => (
              <div key={entry.command}>
                <CopyCommand command={entry.command} />
                <p className="mt-2 max-w-md text-[13px] text-muted-foreground leading-relaxed">
                  {entry.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-dashed pt-6">
            <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
              Works with
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] text-foreground">
              {FRAMEWORKS.map((framework) => (
                <span key={framework}>{framework}</span>
              ))}
            </div>
          </div>

          <p className="mt-6 max-w-md text-[13px] text-muted-foreground leading-relaxed">
            No hidden dependencies — the CLI writes source into{" "}
            <code className="rounded-xs border border-dashed px-1 py-0.5 font-mono text-[12px] text-foreground">
              components/ui/
            </code>{" "}
            and gets out of the way. You own every file.
          </p>
        </div>

        {/* Live previews */}
        <div className="flex flex-col">
          <div className="grid flex-1 grid-cols-2 [&>*:nth-child(2n)]:border-r-0 [&>*:nth-last-child(-n+2)]:border-b-0">
            {PREVIEWS.map((preview) => (
              <div
                className="flex min-h-[7.5rem] flex-col justify-between gap-4 border-r border-b border-dashed p-5 transition-colors hover:bg-accent/40"
                key={preview.name}
              >
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.18em]">
                  {preview.name}
                </span>
                <div>{preview.render}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed px-5 py-5 sm:px-8">
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Eight of ninety-seven, rendered live from the same source the CLI
              copies.{" "}
              <a
                className="text-foreground underline decoration-dashed underline-offset-4 transition-colors hover:text-cnippet-accent"
                href="/explore"
              >
                See the rest →
              </a>
            </p>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
