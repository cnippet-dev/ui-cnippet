//biome-ignore-all lint/style/noNonNullAssertion: snippets is never empty
"use client";

import { Settings } from "lucide-react";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import type { HeroSnippetName } from "@/components/home/hero-snippets";
import {
  Frame,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/signal/frame";
import { SignalDot } from "@/components/signal/signal-dot";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Slider, SliderValue } from "@/registry/default/ui/slider";
import { Switch } from "@/registry/default/ui/switch";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

// Each demo mirrors its `code` in hero-snippets.ts.
const DEMOS: Record<HeroSnippetName, ReactNode> = {
  button: (
    <div className="flex gap-2">
      <Button>Deploy</Button>
      <Button variant="outline">Preview</Button>
      <Button aria-label="Settings" size="icon" variant="ghost">
        <Settings />
      </Button>
    </div>
  ),
  input: (
    <form
      className="flex w-full max-w-xs flex-col gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <Label htmlFor="hero-email">Get the changelog</Label>
      <div className="flex gap-2">
        <Input id="hero-email" placeholder="you@example.com" type="email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  ),
  slider: (
    <Slider
      aria-labelledby="hero-volume"
      className="w-full max-w-xs"
      defaultValue={64}
    >
      <div className="mb-3 flex items-center justify-between">
        <Label id="hero-volume">Volume</Label>
        <SliderValue />
      </div>
    </Slider>
  ),
  switch: (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Label className="flex justify-between">
        Preview deployments
        <Switch defaultChecked />
      </Label>
      <Label>
        <Checkbox defaultChecked />
        Email me when a build fails
      </Label>
    </div>
  ),
};

interface Accent {
  name: string;
  swatch: string;
  light?: [primary: string, ring: string];
  dark?: [primary: string, ring: string];
}

const DEFAULT_ACCENT: Accent = {
  name: "Default",
  swatch: "var(--primary)",
};

// "Default" sets nothing, so the preview follows the page (and the theming
// section further down).
const ACCENTS: Accent[] = [
  DEFAULT_ACCENT,
  {
    dark: ["var(--color-violet-500)", "var(--color-violet-400)"],
    light: ["var(--color-violet-600)", "var(--color-violet-400)"],
    name: "Violet",
    swatch: "var(--color-violet-600)",
  },
  {
    dark: ["var(--color-blue-500)", "var(--color-blue-400)"],
    light: ["var(--color-blue-600)", "var(--color-blue-400)"],
    name: "Blue",
    swatch: "var(--color-blue-600)",
  },
  {
    dark: ["var(--color-emerald-500)", "var(--color-emerald-400)"],
    light: ["var(--color-emerald-600)", "var(--color-emerald-400)"],
    name: "Emerald",
    swatch: "var(--color-emerald-600)",
  },
  {
    dark: ["var(--color-rose-500)", "var(--color-rose-400)"],
    light: ["var(--color-rose-600)", "var(--color-rose-400)"],
    name: "Rose",
    swatch: "var(--color-rose-600)",
  },
];

const RADII = [
  { label: "0", value: "0rem" },
  { label: ".375", value: "0.375rem" },
  { label: ".625", value: undefined },
  { label: "1", value: "1rem" },
];

const CYCLE_MS = 4500;

/**
 * Scoped theme: the registry components read `--primary`, `--ring` and
 * `--radius`, so overriding them on the preview wrapper restyles only it.
 */
function themeStyle(accent: Accent, radius: string | undefined) {
  const style: Record<string, string> = {};
  if (radius) style["--radius"] = radius;
  if (accent.light && accent.dark) {
    style["--hero-primary"] = accent.light[0];
    style["--hero-ring"] = accent.light[1];
    style["--hero-primary-dark"] = accent.dark[0];
    style["--hero-ring-dark"] = accent.dark[1];
  }
  return style as CSSProperties;
}

export function HeroStage({
  className,
  snippets,
}: {
  className?: string;
  snippets: { name: HeroSnippetName; html: string }[];
}) {
  const [index, setIndex] = useState(0);
  const [view, setView] = useState<"preview" | "code">("preview");
  const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);
  const [radius, setRadius] = useState<string | undefined>(undefined);
  // Autoplay stops for good once the visitor takes the wheel, and pauses
  // while the pointer or focus is inside.
  const [touched, setTouched] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (touched || paused || view !== "preview") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % snippets.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [touched, paused, view, snippets.length]);

  const active = snippets[index] ?? snippets[0]!;
  const themed = Boolean(accent.light);

  return (
    <div
      className={cn(
        "relative mx-auto w-full min-w-0 max-w-md lg:max-w-none",
        className,
      )}
    >
      <Frame
        className="shadow-float"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false);
          }
        }}
        onFocus={() => setPaused(true)}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        spotlight
      >
        <FrameHeader className="py-1.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex shrink-0 gap-1">
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
              <span className="size-2 rounded-full bg-border-strong" />
            </span>
            <FrameTitle className="ms-1 truncate font-mono font-normal text-[12px] text-muted-foreground">
              @cnippet/
              <span className="text-foreground">{active.name}</span>
            </FrameTitle>
          </div>
          <Tabs
            onValueChange={(value) => {
              setView(value as "preview" | "code");
              setTouched(true);
            }}
            value={view}
          >
            <TabsList className="bg-transparent">
              <TabsTab className="h-7 text-[13px] sm:h-7" value="preview">
                Preview
              </TabsTab>
              <TabsTab className="h-7 text-[13px] sm:h-7" value="code">
                Code
              </TabsTab>
            </TabsList>
          </Tabs>
        </FrameHeader>

        <FramePanel className="flex h-80 flex-none flex-col">
          {view === "preview" ? (
            <div
              className={cn(
                "flex min-h-0 flex-1 items-center justify-center bg-dots p-6",
                themed &&
                  "[--primary-foreground:var(--color-white)] [--primary:var(--hero-primary)] [--ring:var(--hero-ring)] dark:[--primary:var(--hero-primary-dark)] dark:[--ring:var(--hero-ring-dark)]",
              )}
              style={themeStyle(accent, radius)}
            >
              <div
                className="flex w-full justify-center motion-safe:animate-rise"
                key={active.name}
              >
                {DEMOS[active.name]}
              </div>
            </div>
          ) : (
            <div
              className="min-h-0 flex-1 overflow-auto bg-(--color-code) py-1 text-[12.5px] [&_pre]:text-[12.5px]"
              dangerouslySetInnerHTML={{ __html: active.html }}
            />
          )}

          {/* Component picker — the file tab strip of the preview. */}
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-t bg-card px-2 py-1.5">
            {snippets.map((snippet, i) => (
              <button
                aria-pressed={i === index}
                className={cn(
                  "flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2 font-mono text-[11px] transition-colors duration-150",
                  i === index
                    ? "bg-muted text-foreground"
                    : "text-faint hover:text-foreground",
                )}
                key={snippet.name}
                onClick={() => {
                  setIndex(i);
                  setTouched(true);
                }}
                type="button"
              >
                {i === index && <SignalDot />}
                {snippet.name}
              </button>
            ))}
          </div>
        </FramePanel>

        {/* Theme strip — scoped to the preview above. */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 pt-2.5 pb-1.5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-faint">
              {"// accent"}
            </span>
            <div className="flex gap-1">
              {ACCENTS.map((entry) => (
                <button
                  aria-label={entry.name}
                  aria-pressed={accent.name === entry.name}
                  className={cn(
                    "flex size-6 cursor-pointer items-center justify-center rounded-full transition-shadow duration-150",
                    accent.name === entry.name
                      ? "ring-1 ring-border-strong"
                      : "hover:ring-1 hover:ring-border",
                  )}
                  key={entry.name}
                  onClick={() => {
                    setAccent(entry);
                    setTouched(true);
                  }}
                  title={entry.name}
                  type="button"
                >
                  <span
                    className="block size-3.5 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/15"
                    style={{ backgroundColor: entry.swatch }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-faint">
              {"// radius"}
            </span>
            <div className="flex gap-0.5">
              {RADII.map((entry) => (
                <button
                  aria-pressed={radius === entry.value}
                  className={cn(
                    "flex h-6 cursor-pointer items-center rounded-md px-1.5 font-mono text-[11px] tabular-nums transition-colors duration-150",
                    radius === entry.value
                      ? "bg-background text-foreground shadow-xs/5 ring-1 ring-border"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  key={entry.label}
                  onClick={() => {
                    setRadius(entry.value);
                    setTouched(true);
                  }}
                  type="button"
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Frame>

      {/* Floating chip — the point of the whole frame. */}
      <div
        className={cn(
          "pointer-events-none absolute top-16 -left-3 hidden items-center gap-2 rounded-xl border bg-popover px-3 py-2 text-[12px] shadow-float transition-opacity duration-150 sm:flex md:-left-8",
          view === "code" && "opacity-0",
        )}
      >
        <SignalDot pulse />
        <span className="text-muted-foreground">
          Copied to{" "}
          <span className="font-mono text-foreground">
            components/ui/{active.name}.tsx
          </span>
        </span>
      </div>
    </div>
  );
}
