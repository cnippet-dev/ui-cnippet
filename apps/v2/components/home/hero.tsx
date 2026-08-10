import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CopyCommand } from "@/components/home/copy-command";
import { MovingUsersFacehashes } from "@/components/home/moving-users-facehashes";
import { Button } from "@/registry/default/ui/button";
import { cn } from "@/lib/utils";

const FACTS = [
  { label: "Components", value: "97" },
  { label: "Motion variants", value: "40+" },
  { label: "License", value: "MIT" },
  { label: "Cost", value: "$0" },
];

export function Hero() {
  return (
    <section className="border-b border-dashed">
      {/* Eyebrow rail — sticks just below the navbar while the hero is in view */}
      <div className="sticky top-14 z-40 flex items-center justify-center gap-3 border-b border-dashed bg-background px-5 py-4 sm:gap-4 sm:px-8">
        <span className="font-mono text-[11px] text-cnippet-accent tracking-[0.18em]">
          00
        </span>
        <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
          component library · base ui · tailwind css
        </span>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-20 sm:px-8 sm:py-28 lg:border-r lg:border-dashed">
          <h1 className="max-w-2xl font-f37-stout text-[38px] leading-[1.05] tracking-tight sm:text-[52px] lg:text-[58px]">
            Stop rebuilding UI.
            <br />
            <span className="text-cnippet-accent">Start shipping.</span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
            97 production-ready components you copy, paste, and own. Built on
            Base UI, styled with Tailwind CSS. MIT licensed, free forever.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<Link href="/explore" />}
              size="lg"
              className={cn("group")}
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

          <div className="mt-10 flex items-center gap-3">
            <MovingUsersFacehashes />
            <span className="font-mono text-[12px] text-muted-foreground">
              Open source and built in public — no vendor lock-in, ever.
            </span>
          </div>
        </div>

        {/* Fact panel */}
        <div className="grid grid-cols-2 border-t border-dashed lg:border-t-0">
          {FACTS.map((fact, index) => (
            <div
              className={cn(
                "flex flex-col justify-center border-dashed px-5 py-8 sm:px-8 lg:py-0",
                index % 2 === 0 && "border-r",
                index < FACTS.length - 2 && "border-b",
              )}
              key={fact.label}
            >
              <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
                {fact.label}
              </div>
              <div className="mt-1.5 font-f37-stout text-3xl tabular-nums sm:text-4xl">
                {fact.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
