"use client";

import { ChartNoAxesColumnIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export type ChartEmptyProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Defaults to a bar-chart icon. */
  icon?: React.ReactNode;
  /** e.g. a "Clear filters" or "Change range" button. */
  action?: React.ReactNode;
  className?: string;
};

export function ChartEmpty({
  title = "No data",
  description = "There's nothing to show for this range yet.",
  icon = <ChartNoAxesColumnIcon />,
  action,
  className,
}: ChartEmptyProps) {
  return (
    <Empty
      className={cn("aspect-video w-full gap-4 py-6 md:py-6", className)}
      data-slot="chart-empty"
    >
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        {description ? (
          <EmptyDescription>{description}</EmptyDescription>
        ) : null}
      </EmptyHeader>
      {action ? <EmptyContent>{action}</EmptyContent> : null}
    </Empty>
  );
}
