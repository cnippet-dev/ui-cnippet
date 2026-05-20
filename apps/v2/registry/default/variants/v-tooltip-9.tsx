import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type Metric = {
  label: string;
  value: string;
  change: number;
  current: string;
  previous: string;
  period: string;
};

const metrics: Metric[] = [
  {
    change: 18.4,
    current: "24,892",
    label: "Page Views",
    period: "vs last month",
    previous: "21,025",
    value: "+18.4%",
  },
  {
    change: -3.2,
    current: "3.8%",
    label: "Bounce Rate",
    period: "vs last month",
    previous: "3.9%",
    value: "-3.2%",
  },
  {
    change: 7.1,
    current: "1,204",
    label: "Conversions",
    period: "vs last month",
    previous: "1,124",
    value: "+7.1%",
  },
];

export function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <TooltipProvider>
        <div className="flex gap-4">
          {metrics.map((metric) => {
            const isUp = metric.change > 0;
            const TrendIcon = isUp ? TrendingUpIcon : TrendingDownIcon;
            return (
              <Tooltip key={metric.label}>
                <TooltipTrigger className="cursor-default rounded-lg border bg-background px-4 py-3 text-left shadow-xs transition-shadow hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <p className="text-muted-foreground text-xs">
                    {metric.label}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <TrendIcon
                      aria-hidden="true"
                      className={`size-3.5 ${isUp ? "text-emerald-500" : "text-rose-500"}`}
                    />
                    <span
                      className={`font-semibold text-sm tabular-nums ${isUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                    >
                      {metric.value}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="px-3 py-2.5">
                  <p className="mb-1.5 font-medium">{metric.label}</p>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex items-center justify-between gap-6">
                      <span>Current</span>
                      <span className="font-medium text-foreground tabular-nums">
                        {metric.current}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-6">
                      <span>Previous</span>
                      <span className="tabular-nums">{metric.previous}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-6 border-t pt-1">
                      <span>{metric.period}</span>
                      <span
                        className={`font-semibold tabular-nums ${isUp ? "text-emerald-500" : "text-rose-500"}`}
                      >
                        {metric.value}
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>
    </div>
  );
}
