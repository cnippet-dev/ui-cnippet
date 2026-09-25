import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CopyCommand } from "@/components/home/copy-command";
import { PrefetchLink } from "@/components/prefetch-link";
import { Kicker } from "@/components/signal/kicker";
import { Rule } from "@/components/signal/rule";
import { CONTAINER, SectionTitle } from "@/components/signal/section";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

const PATHS = [
  {
    body: "Browse the full catalog, copy what you need.",
    href: "/explore",
    label: "The library",
  },
  {
    body: "CLI, theming and every component documented.",
    href: "/docs/introduction",
    label: "The docs",
  },
  {
    body: "Star it, fork it, open an issue. MIT licensed.",
    external: true,
    href: "https://github.com/cnippet-dev/ui-cnippet",
    label: "The source",
  },
];

export function Closing() {
  return (
    <section id="start">
      <Rule />
      <div className={cn(CONTAINER, "py-16 md:py-24")}>
        <div
          className="relative isolate overflow-hidden rounded-3xl border bg-frame px-6 py-16 text-center md:px-12 md:py-24"
          data-spotlight
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-columns"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-32 -z-10 mx-auto h-64 max-w-2xl rounded-full bg-signal-soft blur-3xl"
          />

          <div className="relative z-2 mx-auto flex max-w-2xl flex-col items-center">
            <Kicker index="06">get started</Kicker>
            <SectionTitle className="mt-5 text-[40px] md:text-[60px]">
              Ready to <em>stop rebuilding?</em>
            </SectionTitle>
            <p className="mt-5 max-w-md text-balance text-[16px] text-muted-foreground leading-relaxed md:text-[17px]">
              97 components, 40+ motion variants — MIT licensed, $0 forever.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              <Button
                className="group/cta"
                render={<PrefetchLink href="/docs/get-started" />}
                size="lg"
              >
                Get started
                <ArrowRight className="transition-transform duration-250 ease-out-expo group-hover/cta:translate-x-0.5" />
              </Button>
              <Button
                render={<PrefetchLink href="/explore" />}
                size="lg"
                variant="outline"
              >
                Browse components
              </Button>
            </div>
            <CopyCommand
              className="mt-6 max-w-sm bg-background"
              command="npx shadcn@latest add @cnippet/ui"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {PATHS.map((path) => (
            <PrefetchLink
              className="group/path flex items-start justify-between gap-4 rounded-2xl border px-5 py-4 transition-colors duration-150 hover:border-border-strong hover:bg-frame"
              href={path.href}
              key={path.label}
              {...(path.external
                ? { rel: "noreferrer", target: "_blank" }
                : {})}
            >
              <div>
                <p className="font-medium text-[14px]">{path.label}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {path.body}
                </p>
              </div>
              {path.external ? (
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-faint transition-all duration-250 ease-out-expo group-hover/path:text-foreground" />
              ) : (
                <ArrowRight className="mt-0.5 size-4 shrink-0 text-faint transition-all duration-250 ease-out-expo group-hover/path:translate-x-0.5 group-hover/path:text-foreground" />
              )}
            </PrefetchLink>
          ))}
        </div>
      </div>
    </section>
  );
}
