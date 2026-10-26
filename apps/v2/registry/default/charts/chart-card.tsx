"use client";

import type * as React from "react";
import { formatPercent } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";

export type ChartCardProps = Omit<React.ComponentProps<"div">, "title"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Headline number, already formatted, e.g. "$48.2K". */
  value?: React.ReactNode;
  /** Change as a fraction: 0.124 renders "+12.4%". */
  delta?: number;
  /** Set when a drop is good news (churn, latency, cost): flips the badge colour. */
  invertDelta?: boolean;
  /** Top-right slot, e.g. a range select. */
  actions?: React.ReactNode;
  footer?: React.ReactNode;
};

export function ChartCard({
  title,
  description,
  value,
  delta,
  invertDelta = false,
  actions,
  footer,
  children,
  className,
  ...props
}: ChartCardProps) {
  const good = delta !== undefined && (invertDelta ? delta < 0 : delta > 0);
  const bad = delta !== undefined && (invertDelta ? delta > 0 : delta < 0);

  return (
    <Card className={cn("w-full", className)} data-slot="chart-card" {...props}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
        {actions ? <CardAction>{actions}</CardAction> : null}
        {value !== undefined || delta !== undefined ? (
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            {value !== undefined ? (
              <span className="font-semibold text-2xl tabular-nums tracking-tight">
                {value}
              </span>
            ) : null}
            {delta !== undefined ? (
              <Badge
                className="tabular-nums"
                variant={good ? "success" : bad ? "error" : "secondary"}
              >
                {formatPercent(delta, { signed: true })}
              </Badge>
            ) : null}
          </div>
        ) : null}
      </CardHeader>
      <CardPanel>{children}</CardPanel>
      {footer ? (
        <CardFooter className="text-muted-foreground text-sm">
          {footer}
        </CardFooter>
      ) : null}
    </Card>
  );
}
