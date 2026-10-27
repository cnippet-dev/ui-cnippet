"use client";

import type * as React from "react";
import {
  Sankey as RechartsSankey,
  type SankeyLinkProps,
  type SankeyNodeProps,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipRows } from "@/registry/default/charts/chart-tooltip-presets";
import {
  buildChartConfig,
  formatCompact,
  toConfigKey,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type SankeyLink = {
  /** Name of the node the flow leaves. */
  source: string;
  /** Name of the node the flow enters. */
  target: string;
  value: number;
};

export type SankeyProps = {
  /** Flows between named nodes. Nodes are created from the names, in order of appearance. Must not form a cycle. */
  data: SankeyLink[];
  /** Colours or labels per node name; built from the names when omitted. */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  showTooltip?: boolean;
  /** Width of each node bar in px. */
  nodeWidth?: number;
  /** Vertical gap between nodes in px. */
  nodePadding?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function Sankey({
  data,
  config,
  valueFormatter = formatCompact,
  showTooltip = true,
  nodeWidth = 10,
  nodePadding = 24,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: SankeyProps) {
  const links = data.filter((link) => link.value > 0);
  const names = [...new Set(links.flatMap((l) => [l.source, l.target]))];
  const resolvedConfig = buildChartConfig(names.map(toConfigKey), {
    ...Object.fromEntries(
      names.map((name) => [toConfigKey(name), { label: name }]),
    ),
    ...config,
  });

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (links.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const Node = ({ x, y, width, height, payload }: SankeyNodeProps) => {
    // Nodes with no outgoing flow sit in the last column: label them on the left.
    const last = !payload.targetLinks?.length;
    return (
      <g>
        <rect
          fill={`var(--color-${toConfigKey(payload.name)})`}
          height={height}
          rx={2}
          width={width}
          x={x}
          y={y}
        />
        <text
          className="fill-foreground"
          dominantBaseline="middle"
          fontSize={12}
          textAnchor={last ? "end" : "start"}
          x={last ? x - 6 : x + width + 6}
          y={y + height / 2}
        >
          {payload.name}
          <tspan className="fill-muted-foreground" dx={6}>
            {valueFormatter(payload.value)}
          </tspan>
        </text>
      </g>
    );
  };

  const Link = ({
    sourceX,
    targetX,
    sourceY,
    targetY,
    sourceControlX,
    targetControlX,
    linkWidth,
    payload,
  }: SankeyLinkProps) => (
    <path
      className="transition-[stroke-opacity] hover:[stroke-opacity:0.5]"
      d={`M${sourceX},${sourceY} C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
      fill="none"
      stroke={`var(--color-${toConfigKey(payload.source.name)})`}
      strokeOpacity={0.25}
      strokeWidth={Math.max(linkWidth, 1)}
    />
  );

  return (
    <div className={cn("w-full", className)}>
      <ChartContainer
        aria-label={ariaLabel ?? "Flow diagram"}
        className="aspect-auto size-full overflow-hidden"
        config={resolvedConfig}
        role="figure"
      >
        <RechartsSankey
          data={{
            links: links.map((l) => ({
              source: names.indexOf(l.source),
              target: names.indexOf(l.target),
              value: l.value,
            })),
            nodes: names.map((name) => ({ name })),
          }}
          link={Link}
          margin={{ bottom: 8, left: 8, right: 8, top: 8 }}
          node={Node}
          nodePadding={nodePadding}
          nodeWidth={nodeWidth}
        >
          {showTooltip ? (
            <ChartTooltip
              content={({ active, payload }) => {
                const item = payload?.[0]?.payload as
                  | {
                      payload?: {
                        name?: string;
                        source?: { name?: string };
                        target?: { name?: string };
                        value?: number;
                      };
                    }
                  | undefined;
                const p = item?.payload;
                if (!active || !p) return null;
                const isLink = Boolean(p.source && p.target);
                const name = isLink ? p.source?.name : p.name;
                return (
                  <ChartTooltipRows
                    color={`var(--color-${toConfigKey(name ?? "")})`}
                    rows={[["Flow", valueFormatter(Number(p.value))]]}
                    title={
                      isLink ? `${p.source?.name} → ${p.target?.name}` : p.name
                    }
                  />
                );
              }}
            />
          ) : null}
        </RechartsSankey>
      </ChartContainer>
      <ul className="sr-only">
        {links.map((l) => (
          <li key={`${l.source}-${l.target}`}>
            {l.source} to {l.target}: {valueFormatter(l.value)}
          </li>
        ))}
      </ul>
    </div>
  );
}
