// title: Stock ticker preview with sparkline and key stats
import { TrendingUpIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

// Closing prices for the last 10 sessions.
const closes = [182, 179, 184, 188, 186, 191, 189, 195, 198, 204];

function sparklinePoints(values: number[], width: number, height: number) {
  const min = Math.min(...values);
  const range = Math.max(...values) - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

export function Pattern() {
  return (
    <p className="max-w-sm text-sm">
      Shares of{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium font-mono underline underline-offset-4">
          $ACME
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-sm">Acme Corp</p>
                <p className="text-muted-foreground text-xs">NASDAQ: ACME</p>
              </div>
              <Badge size="sm" variant="success">
                <TrendingUpIcon aria-hidden="true" />
                +12.1%
              </Badge>
            </div>
            <div className="flex items-end justify-between gap-4">
              <p className="font-semibold text-2xl tabular-nums">$204.00</p>
              <svg
                aria-label="Price trend over the last 10 sessions"
                className="h-8 w-28 overflow-visible"
                role="img"
                viewBox="0 0 112 32"
              >
                <polyline
                  fill="none"
                  points={sparklinePoints(closes, 112, 32)}
                  stroke="var(--chart-1)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <dl className="grid grid-cols-3 gap-2 border-t pt-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Open</dt>
                <dd className="font-medium tabular-nums">$198.40</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Day range</dt>
                <dd className="font-medium tabular-nums">197–206</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Mkt cap</dt>
                <dd className="font-medium tabular-nums">$84.2B</dd>
              </div>
            </dl>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      closed at a record high after the earnings call.
    </p>
  );
}
