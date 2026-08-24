import {
  ArrowUpRight,
  Blocks,
  CircleDollarSign,
  ScrollText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "@/components/home/copy-command";
import { MovingUsersFacehashes } from "@/components/home/moving-users-facehashes";
import { SectionHeader } from "@/components/home/section";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

const FACTS = [
  {
    accent: "text-cnippet-accent",
    bg: "bg-cnippet-accent/5 dark:bg-cnippet-accent/10",
    border: "border-cnippet-accent/20",
    icon: Blocks,
    label: "Components",
    value: "97",
  },
  {
    accent: "text-cnippet-orange",
    bg: "bg-cnippet-orange/5 dark:bg-cnippet-orange/10",
    border: "border-cnippet-orange/20",
    icon: Sparkles,
    label: "Motion variants",
    value: "40+",
  },
  {
    accent: "text-cnippet-blue",
    bg: "bg-cnippet-blue/5 dark:bg-cnippet-blue/10",
    border: "border-cnippet-blue/20",
    icon: ScrollText,
    label: "License",
    value: "MIT",
  },
  {
    accent: "text-cnippet-green",
    bg: "bg-cnippet-green/5 dark:bg-cnippet-green/10",
    border: "border-cnippet-green/20",
    icon: CircleDollarSign,
    label: "Cost",
    value: "$0",
  },
];

export function Hero() {
  return (
    <section>
      <SectionHeader
        index="00"
        title="component library · base ui · tailwind css"
      />

      <div className="flex flex-col items-center">
        {/* Main content — centered */}
        <div className="flex w-full max-w-3xl flex-col items-center px-5 py-20 text-center sm:px-8 sm:py-28">
          <h1 className="font-f37-stout text-[38px] leading-[1.05] tracking-tight sm:text-[52px] lg:text-[58px]">
            Stop rebuilding UI.
            <br />
            <span className="text-cnippet-accent">Start shipping.</span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
            97 production-ready components you copy, paste, and own. Built on
            Base UI, styled with Tailwind CSS. MIT licensed, free forever.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              className={cn("group")}
              render={<Link href="/explore" />}
              size="lg"
            >
              Browse components
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
            <Button
              render={<Link href="/docs/introduction" />}
              size="lg"
              variant="outline"
            >
              Documentation
            </Button>
          </div>

          <div className="mt-10 w-full max-w-md">
            <CopyCommand command="npx shadcn@latest add @cnippet/button" />
            <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
              Add your first component in seconds — no lock-in, just source
              code.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <MovingUsersFacehashes />
            <span className="font-mono text-[12px] text-muted-foreground">
              Open source and built in public — no vendor lock-in, ever.
            </span>
          </div>
        </div>

        {/* Facts panel — full width row, centered */}
        <div className="w-full border-t border-dashed">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {FACTS.map((fact, index) => (
              <div
                className={cn(
                  "group flex items-center justify-center gap-4 border-dashed px-5 py-10 text-center transition-colors hover:bg-accent/30 sm:px-8",
                  index % 2 === 0 && "border-r",
                  index < FACTS.length - 2 && "border-b",
                  "md:border-b-0",
                  index !== FACTS.length - 1 && "md:border-r",
                )}
                key={fact.label}
              >
                <span
                  className={cn(
                    "inline-flex size-9 w-fit items-center justify-center rounded-lg border px-3",
                    fact.bg,
                    fact.border,
                  )}
                >
                  <fact.icon
                    aria-hidden="true"
                    className={cn("size-4", fact.accent)}
                  />
                </span>
                <div className="flex items-center justify-center gap-2.5">
                  <div className="mt-1.5 font-f37-stout text-3xl tabular-nums sm:text-4xl">
                    {fact.value}
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                    {fact.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
