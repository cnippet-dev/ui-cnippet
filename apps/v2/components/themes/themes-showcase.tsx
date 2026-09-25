//biome-ignore-all lint/style/noNonNullAssertion: <>

"use client";

import { Button } from "@cnippet/ui/components/button";
import { cn } from "@cnippet/ui/lib/utils";
import { useTheme } from "@cnippet/ui/shared/theme-provider";
import { Check, ChevronDown, Copy, Moon, RotateCcw, Sun } from "lucide-react";
import { parseAsFloat, parseAsString, useQueryState } from "nuqs";
import { Suspense, useEffect, useState } from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";
// Accordion
import AccordionBasic from "@/registry/default/variants/v-accordion-1";
// Alert variants
import AlertWithAction from "@/registry/default/variants/v-alert-3";
import AlertInfo from "@/registry/default/variants/v-alert-4";
import SuccessAlert from "@/registry/default/variants/v-alert-5";
// Avatar
import AvatarGroup from "@/registry/default/variants/v-avatar-3";
// Badge
import BadgeSizes from "@/registry/default/variants/v-badge-9";
// Navigation
import BreadcrumbNav from "@/registry/default/variants/v-breadcrumb-1";
// Card variants
import CardCreate from "@/registry/default/variants/v-card-1";
import { Pattern as CardDepth } from "@/registry/default/variants/v-card-9";
import { Pattern as CardSignIn } from "@/registry/default/variants/v-card-10";
import { Pattern as BillingCard } from "@/registry/default/variants/v-card-11";
import { Pattern as RevenueCard } from "@/registry/default/variants/v-card-12";
import { Pattern as CardIntegration } from "@/registry/default/variants/v-card-13";
import { Pattern as IconCard } from "@/registry/default/variants/v-card-14";
// Charts
import { ChartAreaDefault } from "@/registry/default/variants/v-chart-2";
import { ChartBarDefault } from "@/registry/default/variants/v-chart-3";
import { ChartLineDefault } from "@/registry/default/variants/v-chart-4";
import { ChartPieSimple } from "@/registry/default/variants/v-chart-5";
import { ChartRadarDefault } from "@/registry/default/variants/v-chart-6";
import { ChartRadialSimple } from "@/registry/default/variants/v-chart-7";
// Form & interactive
import CheckboxWithDesc from "@/registry/default/variants/v-checkbox-3";
import PaginationBasic from "@/registry/default/variants/v-pagination-1";
// Feedback
import { BaseProgressStatus as ProgressDownload } from "@/registry/default/variants/v-progress-3";
import SkeletonUsers from "@/registry/default/variants/v-skeleton-1";
import SliderOpacity from "@/registry/default/variants/v-slider-2";
import SwitchLabel from "@/registry/default/variants/v-switch-1";
// Tabs
import TabsUnderline from "@/registry/default/variants/v-tabs-2";

interface ThemeTokens {
  primary: string;
  primaryForeground: string;
  ring: string;
}

interface Preset {
  name: string;
  swatch: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}

const PRESETS: Preset[] = [
  {
    dark: {
      primary: "var(--color-neutral-100)",
      primaryForeground: "var(--color-neutral-800)",
      ring: "var(--color-neutral-500)",
    },
    light: {
      primary: "var(--color-neutral-800)",
      primaryForeground: "var(--color-neutral-50)",
      ring: "var(--color-neutral-400)",
    },
    name: "Default",
    swatch: "#262626",
  },
  {
    dark: {
      primary: "var(--color-blue-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-blue-400)",
    },
    light: {
      primary: "var(--color-blue-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-blue-400)",
    },
    name: "Blue",
    swatch: "#2563eb",
  },
  {
    dark: {
      primary: "var(--color-violet-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-violet-400)",
    },
    light: {
      primary: "var(--color-violet-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-violet-400)",
    },
    name: "Violet",
    swatch: "#7c3aed",
  },
  {
    dark: {
      primary: "var(--color-rose-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-rose-400)",
    },
    light: {
      primary: "var(--color-rose-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-rose-400)",
    },
    name: "Rose",
    swatch: "#e11d48",
  },
  {
    dark: {
      primary: "var(--color-orange-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-orange-400)",
    },
    light: {
      primary: "var(--color-orange-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-orange-400)",
    },
    name: "Orange",
    swatch: "#ea580c",
  },
  {
    dark: {
      primary: "var(--color-emerald-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-emerald-400)",
    },
    light: {
      primary: "var(--color-emerald-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-emerald-400)",
    },
    name: "Emerald",
    swatch: "#059669",
  },
  {
    dark: {
      primary: "var(--color-teal-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-teal-400)",
    },
    light: {
      primary: "var(--color-teal-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-teal-400)",
    },
    name: "Teal",
    swatch: "#0d9488",
  },
  {
    dark: {
      primary: "var(--color-amber-500)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-amber-400)",
    },
    light: {
      primary: "var(--color-amber-600)",
      primaryForeground: "var(--color-white)",
      ring: "var(--color-amber-400)",
    },
    name: "Amber",
    swatch: "#d97706",
  },
];

const RADIUS_OPTIONS = [
  { label: "None", value: 0 },
  { label: "SM", value: 0.25 },
  { label: "MD", value: 0.5 },
  { label: "LG", value: 0.625 },
  { label: "XL", value: 1 },
];

interface ChartPalette {
  name: string;
  swatches: [string, string, string, string, string];
  light: [string, string, string, string, string];
  dark: [string, string, string, string, string];
}

const CHART_PALETTES: ChartPalette[] = [
  {
    dark: [
      "var(--color-blue-700)",
      "var(--color-emerald-500)",
      "var(--color-amber-500)",
      "var(--color-purple-500)",
      "var(--color-rose-500)",
    ],
    light: [
      "var(--color-orange-600)",
      "var(--color-teal-600)",
      "var(--color-cyan-900)",
      "var(--color-amber-400)",
      "var(--color-amber-500)",
    ],
    name: "Default",
    swatches: ["#ea580c", "#0d9488", "#164e63", "#fbbf24", "#f59e0b"],
  },
  {
    dark: [
      "var(--color-blue-400)",
      "var(--color-cyan-400)",
      "var(--color-sky-400)",
      "var(--color-indigo-400)",
      "var(--color-violet-400)",
    ],
    light: [
      "var(--color-blue-600)",
      "var(--color-cyan-600)",
      "var(--color-cyan-700)",
      "var(--color-indigo-500)",
      "var(--color-violet-500)",
    ],
    name: "Ocean",
    swatches: ["#2563eb", "#0891b2", "#0e7490", "#6366f1", "#8b5cf6"],
  },
  {
    dark: [
      "var(--color-green-400)",
      "var(--color-emerald-400)",
      "var(--color-teal-400)",
      "var(--color-lime-400)",
      "var(--color-yellow-400)",
    ],
    light: [
      "var(--color-green-600)",
      "var(--color-emerald-600)",
      "var(--color-teal-600)",
      "var(--color-lime-500)",
      "var(--color-yellow-600)",
    ],
    name: "Forest",
    swatches: ["#16a34a", "#059669", "#0d9488", "#84cc16", "#ca8a04"],
  },
  {
    dark: [
      "var(--color-red-400)",
      "var(--color-orange-400)",
      "var(--color-amber-400)",
      "var(--color-pink-400)",
      "var(--color-purple-400)",
    ],
    light: [
      "var(--color-red-600)",
      "var(--color-orange-600)",
      "var(--color-amber-600)",
      "var(--color-pink-600)",
      "var(--color-purple-600)",
    ],
    name: "Sunset",
    swatches: ["#dc2626", "#ea580c", "#d97706", "#db2777", "#9333ea"],
  },
  {
    dark: [
      "var(--color-rose-400)",
      "var(--color-pink-400)",
      "var(--color-purple-400)",
      "var(--color-indigo-400)",
      "var(--color-sky-400)",
    ],
    light: [
      "var(--color-rose-600)",
      "var(--color-pink-600)",
      "var(--color-purple-600)",
      "var(--color-indigo-600)",
      "var(--color-sky-500)",
    ],
    name: "Rose",
    swatches: ["#e11d48", "#db2777", "#9333ea", "#6366f1", "#0ea5e9"],
  },
];

const STYLE_TAG_ID = "cnippet-theme-preview";

function buildPreviewCSS(
  preset: Preset,
  chartPalette: ChartPalette,
  radius: number,
): string {
  const { light, dark } = preset;
  return `
:root {
  --radius: ${radius}rem;
  --primary: ${light.primary};
  --primary-foreground: ${light.primaryForeground};
  --ring: ${light.ring};
  --sidebar-primary: ${light.primary};
  --sidebar-primary-foreground: ${light.primaryForeground};
  --sidebar-ring: ${light.ring};
  --chart-1: ${chartPalette.light[0]};
  --chart-2: ${chartPalette.light[1]};
  --chart-3: ${chartPalette.light[2]};
  --chart-4: ${chartPalette.light[3]};
  --chart-5: ${chartPalette.light[4]};
}
.dark {
  --primary: ${dark.primary};
  --primary-foreground: ${dark.primaryForeground};
  --ring: ${dark.ring};
  --sidebar-primary: ${dark.primary};
  --sidebar-primary-foreground: ${dark.primaryForeground};
  --sidebar-ring: ${dark.ring};
  --chart-1: ${chartPalette.dark[0]};
  --chart-2: ${chartPalette.dark[1]};
  --chart-3: ${chartPalette.dark[2]};
  --chart-4: ${chartPalette.dark[3]};
  --chart-5: ${chartPalette.dark[4]};
}`.trim();
}

function buildExportCSS(
  preset: Preset,
  chartPalette: ChartPalette,
  radius: number,
): string {
  const { light, dark } = preset;
  return `@layer base {
  :root {
    --radius: ${radius}rem;
    --background: var(--color-white);
    --foreground: var(--color-neutral-800);
    --card: var(--color-white);
    --card-foreground: var(--color-neutral-800);
    --popover: var(--color-white);
    --popover-foreground: var(--color-neutral-800);
    --primary: ${light.primary};
    --primary-foreground: ${light.primaryForeground};
    --secondary: --alpha(var(--color-black) / 4%);
    --secondary-foreground: var(--color-neutral-800);
    --muted: --alpha(var(--color-black) / 4%);
    --muted-foreground: color-mix(in srgb, var(--color-neutral-500) 90%, var(--color-black));
    --accent: --alpha(var(--color-black) / 4%);
    --accent-foreground: var(--color-neutral-800);
    --destructive: var(--color-red-500);
    --destructive-foreground: var(--color-red-700);
    --info: var(--color-blue-500);
    --info-foreground: var(--color-blue-700);
    --success: var(--color-emerald-500);
    --success-foreground: var(--color-emerald-700);
    --warning: var(--color-amber-500);
    --warning-foreground: var(--color-amber-700);
    --border: --alpha(var(--color-black) / 8%);
    --input: --alpha(var(--color-black) / 10%);
    --ring: ${light.ring};
    --chart-1: ${chartPalette.light[0]};
    --chart-2: ${chartPalette.light[1]};
    --chart-3: ${chartPalette.light[2]};
    --chart-4: ${chartPalette.light[3]};
    --chart-5: ${chartPalette.light[4]};
    --sidebar: var(--color-white);
    --sidebar-foreground: color-mix(in srgb, var(--color-neutral-800) 64%, var(--sidebar));
    --sidebar-primary: ${light.primary};
    --sidebar-primary-foreground: ${light.primaryForeground};
    --sidebar-accent: --alpha(var(--color-black) / 4%);
    --sidebar-accent-foreground: var(--color-neutral-800);
    --sidebar-border: --alpha(var(--color-black) / 6%);
    --sidebar-ring: ${light.ring};
  }

  .dark {
    --background: color-mix(in srgb, var(--color-neutral-950) 95%, var(--color-white));
    --foreground: var(--color-neutral-100);
    --card: color-mix(in srgb, var(--background) 98%, var(--color-white));
    --card-foreground: var(--color-neutral-100);
    --popover: color-mix(in srgb, var(--background) 98%, var(--color-white));
    --popover-foreground: var(--color-neutral-100);
    --primary: ${dark.primary};
    --primary-foreground: ${dark.primaryForeground};
    --secondary: --alpha(var(--color-white) / 4%);
    --secondary-foreground: var(--color-neutral-100);
    --muted: --alpha(var(--color-white) / 4%);
    --muted-foreground: color-mix(in srgb, var(--color-neutral-500) 90%, var(--color-white));
    --accent: --alpha(var(--color-white) / 4%);
    --accent-foreground: var(--color-neutral-100);
    --destructive: color-mix(in srgb, var(--color-red-500) 90%, var(--color-white));
    --destructive-foreground: var(--color-red-400);
    --info: var(--color-blue-500);
    --info-foreground: var(--color-blue-400);
    --success: var(--color-emerald-500);
    --success-foreground: var(--color-emerald-400);
    --warning: var(--color-amber-500);
    --warning-foreground: var(--color-amber-400);
    --border: --alpha(var(--color-white) / 6%);
    --input: --alpha(var(--color-white) / 8%);
    --ring: ${dark.ring};
    --chart-1: ${chartPalette.dark[0]};
    --chart-2: ${chartPalette.dark[1]};
    --chart-3: ${chartPalette.dark[2]};
    --chart-4: ${chartPalette.dark[3]};
    --chart-5: ${chartPalette.dark[4]};
    --sidebar: color-mix(in srgb, var(--color-neutral-950) 97%, var(--color-white));
    --sidebar-foreground: color-mix(in srgb, var(--color-neutral-100) 64%, var(--sidebar));
    --sidebar-primary: ${dark.primary};
    --sidebar-primary-foreground: ${dark.primaryForeground};
    --sidebar-accent: --alpha(var(--color-white) / 4%);
    --sidebar-accent-foreground: var(--color-neutral-100);
    --sidebar-border: --alpha(var(--color-white) / 5%);
    --sidebar-ring: ${dark.ring};
  }
}`;
}

const DEFAULT_COLOR = "Default";
const DEFAULT_CHART = "Default";
const DEFAULT_RADIUS = 0.625;

export function ThemesShowcase() {
  const [activeTab, setActiveTab] = useQueryState(
    "tab",
    parseAsString.withDefault("components"),
  );
  const [colorName, setColorName] = useQueryState(
    "color",
    parseAsString.withDefault(DEFAULT_COLOR),
  );
  const [chartName, setChartName] = useQueryState(
    "chart",
    parseAsString.withDefault(DEFAULT_CHART),
  );
  const [radius, setRadius] = useQueryState(
    "radius",
    parseAsFloat.withDefault(DEFAULT_RADIUS),
  );
  const [copied, setCopied] = useState(false);
  const [cssOpen, setCssOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const preset = PRESETS.find((p) => p.name === colorName) ?? PRESETS[0]!;
  const chartPalette =
    CHART_PALETTES.find((p) => p.name === chartName) ?? CHART_PALETTES[0]!;
  const isDefault =
    colorName === DEFAULT_COLOR &&
    chartName === DEFAULT_CHART &&
    radius === DEFAULT_RADIUS &&
    activeTab === "components";

  useEffect(() => {
    let styleEl = document.getElementById(
      STYLE_TAG_ID,
    ) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_TAG_ID;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = buildPreviewCSS(preset, chartPalette, radius);

    return () => {
      document.getElementById(STYLE_TAG_ID)?.remove();
    };
  }, [preset, chartPalette, radius]);

  function handleCopy() {
    navigator.clipboard.writeText(buildExportCSS(preset, chartPalette, radius));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setActiveTab("components");
    setColorName(DEFAULT_COLOR);
    setChartName(DEFAULT_CHART);
    setRadius(DEFAULT_RADIUS);
  }

  const chip = (active: boolean) =>
    cn(
      "flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-2.5 text-[13px] transition-colors duration-150",
      active
        ? "bg-background font-medium text-foreground shadow-xs/5 ring-1 ring-border"
        : "text-muted-foreground hover:text-foreground",
    );

  return (
    <div suppressHydrationWarning>
      {/* Toolbar — sticky under the header while previewing. */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-20 -mx-2 rounded-2xl border bg-frame/90 p-1 backdrop-blur-xl md:top-[calc(var(--header-height)+0.75rem+1px)]">
        <div className="flex flex-col gap-1 xl:flex-row xl:items-center">
          <div className="no-scrollbar flex items-center gap-0.5 overflow-x-auto">
            <span className="shrink-0 ps-2 pe-1.5 font-mono text-[11px] text-faint">
              {"// color"}
            </span>
            {PRESETS.map((p) => (
              <button
                aria-pressed={preset.name === p.name}
                className={chip(preset.name === p.name)}
                key={p.name}
                onClick={() => setColorName(p.name)}
                title={p.name}
                type="button"
              >
                <span
                  className="block size-3 shrink-0 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/15"
                  style={{ backgroundColor: p.swatch }}
                />
                {p.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-0.5 xl:ms-auto">
            <span className="shrink-0 ps-2 pe-1.5 font-mono text-[11px] text-faint">
              {"// radius"}
            </span>
            {RADIUS_OPTIONS.map((r) => (
              <button
                aria-pressed={radius === r.value}
                className={cn(
                  chip(radius === r.value),
                  "font-mono text-[12px]",
                )}
                key={r.label}
                onClick={() => setRadius(r.value)}
                type="button"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1 border-t px-1 pt-1.5 pb-0.5">
          <Button onClick={handleCopy} size="sm" variant="outline">
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy CSS"}
          </Button>
          <Button
            onClick={() => setCssOpen((v) => !v)}
            size="sm"
            variant="ghost"
          >
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform duration-250 ease-out-expo",
                cssOpen && "rotate-180",
              )}
            />
            {cssOpen ? "Hide CSS" : "Preview CSS"}
          </Button>
          <Button
            className="ms-auto"
            disabled={isDefault}
            onClick={handleReset}
            size="sm"
            variant="ghost"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
          <Button
            aria-label="Toggle dark mode"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            size="icon-sm"
            variant="ghost"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="size-3.5" />
            ) : (
              <Moon className="size-3.5" />
            )}
          </Button>
        </div>

        {cssOpen ? (
          <pre className="mx-1 mt-1.5 mb-1 max-h-72 overflow-auto rounded-xl border bg-background p-4 font-mono text-foreground/75 text-xs/5">
            {buildExportCSS(preset, chartPalette, radius)}
          </pre>
        ) : null}
      </div>

      {/* Tabbed showcase */}
      <Suspense>
        <Tabs
          onValueChange={(v) => setActiveTab(v as string)}
          value={activeTab}
        >
          <TabsList className="mt-8" variant="underline">
            <TabsTab value="components">Components</TabsTab>
            <TabsTab value="charts">Charts</TabsTab>
          </TabsList>

          <TabsPanel value="components">
            <div className="grid grid-cols-1 items-start gap-6 py-8 sm:grid-cols-2 xl:grid-cols-4">
              <div className="min-w-0 space-y-6">
                <CardCreate />
                <div className="pb-4">
                  <CardDepth />
                </div>
                <SkeletonUsers />
                <AvatarGroup />
              </div>
              <div className="min-w-0 space-y-6">
                <RevenueCard />
                <CardSignIn />
                <div className="flex w-full max-w-xs flex-col gap-5">
                  <SliderOpacity />
                  <CheckboxWithDesc />
                  <SwitchLabel />
                </div>
                <BadgeSizes />
              </div>
              <div className="min-w-0 space-y-6">
                <IconCard />
                <BillingCard />
                <ProgressDownload />
                <div className="w-full max-w-xs">
                  <TabsUnderline />
                </div>
                <AccordionBasic />
              </div>
              <div className="min-w-0 space-y-6">
                <CardIntegration />
                <div className="flex w-full max-w-sm flex-col gap-3">
                  <AlertWithAction />
                  <AlertInfo />
                  <SuccessAlert />
                </div>
                <div className="flex w-full max-w-sm flex-col gap-4">
                  <BreadcrumbNav />
                  <PaginationBasic />
                </div>
              </div>
            </div>
          </TabsPanel>

          <TabsPanel value="charts">
            <div className="no-scrollbar flex items-center gap-0.5 overflow-x-auto pt-6 pb-6">
              <span className="shrink-0 pe-2 font-mono text-[11px] text-faint">
                {"// palette"}
              </span>
              {CHART_PALETTES.map((p) => (
                <button
                  aria-pressed={chartPalette.name === p.name}
                  className={chip(chartPalette.name === p.name)}
                  key={p.name}
                  onClick={() => setChartName(p.name)}
                  type="button"
                >
                  <span className="flex gap-0.5">
                    {p.swatches.map((s, i) => (
                      <span
                        className="block size-2 rounded-full"
                        key={i}
                        style={{ backgroundColor: s }}
                      />
                    ))}
                  </span>
                  {p.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2 xl:grid-cols-3">
              <div className="min-w-0 space-y-6">
                <ChartBarDefault />
                <ChartRadialSimple />
              </div>
              <div className="min-w-0 space-y-6">
                <ChartAreaDefault />
                <ChartPieSimple />
              </div>
              <div className="min-w-0 space-y-6">
                <ChartLineDefault />
                <ChartRadarDefault />
              </div>
            </div>
          </TabsPanel>
        </Tabs>
      </Suspense>
    </div>
  );
}
