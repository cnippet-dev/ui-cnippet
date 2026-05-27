import { ZapIcon } from "lucide-react";

import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardPanel,
} from "@/registry/default/ui/card";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

const USED = 8_340;
const LIMIT = 50_000;

const tiers = [
  { label: "Free", threshold: 5_000 },
  { label: "Pro", threshold: 20_000 },
  { label: "Team", threshold: 50_000 },
];

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);
}

export function Pattern() {
  const pct = (USED / LIMIT) * 100;

  const currentTier = tiers.reduce((acc, tier) =>
    USED > acc.threshold ? tier : acc,
  );
  const nextTier = tiers.find((t) => t.threshold > USED);
  const toNext = nextTier ? nextTier.threshold - USED : 0;

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-2">
            <CardTitle>API Usage</CardTitle>
            <Badge variant="info" size="sm">
              <ZapIcon className="size-3" />
              {currentTier.label}
            </Badge>
          </div>
          <CardDescription>
            {USED.toLocaleString()} of {LIMIT.toLocaleString()} requests this month
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-5">
          <Progress value={pct}>
            <ProgressTrack className="relative h-3 rounded-full">
              <ProgressIndicator className="rounded-full bg-primary transition-all duration-700" />
              {tiers.slice(0, -1).map((tier) => {
                const markerPct = (tier.threshold / LIMIT) * 100;
                const passed = USED >= tier.threshold;
                return (
                  <span
                    className={`absolute top-0 h-full w-px ${passed ? "bg-primary-foreground/50" : "bg-border"}`}
                    key={tier.label}
                    style={{ left: `${markerPct}%` }}
                  />
                );
              })}
            </ProgressTrack>
          </Progress>

          <div className="relative flex justify-between text-xs">
            <span className="text-muted-foreground">0</span>
            {tiers.map((tier) => {
              const markerPct = (tier.threshold / LIMIT) * 100;
              const active = currentTier.label === tier.label;
              return (
                <span
                  className={`absolute -translate-x-1/2 ${active ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  key={tier.label}
                  style={{ left: `${markerPct}%` }}
                >
                  {fmt(tier.threshold)}
                </span>
              );
            })}
          </div>

          {nextTier && (
            <div className="rounded-lg border bg-muted/40 px-3 py-2.5 text-xs">
              <span className="font-medium">{toNext.toLocaleString()} requests</span>
              <span className="text-muted-foreground">
                {" "}until you reach the{" "}
                <span className="font-medium text-foreground">{nextTier.label}</span>{" "}
                tier limit
              </span>
            </div>
          )}
        </CardPanel>
      </Card>
    </div>
  );
}
