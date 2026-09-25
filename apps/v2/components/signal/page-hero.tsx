import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Kicker } from "./kicker";
import { Nodes } from "./rule";
import { CONTAINER } from "./section";

type Stat = { label: string; value: ReactNode };

/**
 * Hero for inner marketing pages (explore, themes). Same texture and type as
 * the homepage hero, shorter, with an optional aside and a stat strip.
 */
export function PageHero({
  aside,
  kicker,
  lead,
  stats,
  title,
}: {
  aside?: ReactNode;
  kicker: string;
  lead?: ReactNode;
  stats?: Stat[];
  title: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden md:rounded-t-canvas">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dot-field" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 mx-auto h-72 max-w-2xl rounded-full bg-signal-soft blur-3xl"
      />

      <div
        className={cn(
          CONTAINER,
          "grid items-end gap-10 pt-[calc(var(--header-height)+3rem)] pb-14 md:pt-[calc(var(--header-height)+4.5rem)] md:pb-16",
          aside && "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]",
        )}
      >
        <div className="flex max-w-2xl flex-col gap-5 motion-safe:animate-rise">
          <Kicker>{kicker}</Kicker>
          <h1 className="text-balance font-display font-semibold text-[clamp(2.5rem,6vw,4rem)] text-ink leading-[1.02] tracking-[-0.05em] [&_em]:font-normal [&_em]:font-serif [&_em]:tracking-[-0.015em]">
            {title}
          </h1>
          {lead ? (
            <p className="max-w-lg text-[17px] text-muted-foreground leading-relaxed">
              {lead}
            </p>
          ) : null}
        </div>
        {aside ? (
          <div className="motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
            {aside}
          </div>
        ) : null}
      </div>

      {stats?.length ? (
        <div className="relative border-t">
          <Nodes />
          <dl className={cn(CONTAINER, "grid grid-cols-2 md:grid-cols-4")}>
            {stats.map((stat, i) => (
              <div
                className={cn(
                  "flex items-baseline gap-2.5 py-5",
                  i % 2 === 1 && "ps-6 max-md:border-s",
                  i >= 2 && "max-md:border-t",
                  i > 0 && "md:border-s md:ps-8",
                )}
                key={stat.label}
              >
                <dd className="font-display font-semibold text-[24px] tabular-nums tracking-[-0.04em]">
                  {stat.value}
                </dd>
                <dt className="font-mono text-[12px] text-faint">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
}
