import { ChevronDownIcon, CircleAlertIcon } from "lucide-react";

import { Badge } from "@/registry/default/ui/badge";
import { Card, CardHeader, CardPanel, CardTitle } from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Separator } from "@/registry/default/ui/separator";

const timeline = [
  {
    time: "14:32 UTC",
    status: "investigating",
    message: "We are investigating reports of elevated API error rates affecting a subset of requests.",
  },
  {
    time: "14:48 UTC",
    status: "identified",
    message: "The issue has been identified as a misconfigured load balancer rule following a routine deployment at 14:15 UTC.",
  },
  {
    time: "15:04 UTC",
    status: "monitoring",
    message: "A fix has been deployed and rolled out to all regions. Error rates are returning to normal. We are monitoring the situation.",
  },
];

const statusVariant: Record<string, "warning" | "info" | "success" | "destructive"> = {
  identified: "warning",
  investigating: "destructive",
  monitoring: "success",
  resolved: "success",
};

export function Pattern() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <Collapsible defaultOpen>
          <CardHeader className="border-b pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <CircleAlertIcon className="mt-0.5 size-4 shrink-0 text-warning" />
                <div>
                  <CardTitle className="text-sm leading-snug">
                    Elevated API error rates
                  </CardTitle>
                  <p className="mt-0.5 text-muted-foreground text-xs">
                    Started May 25, 2025 · 14:32 UTC
                  </p>
                </div>
              </div>
              <Badge size="sm" variant="warning">
                Monitoring
              </Badge>
            </div>
            <CollapsibleTrigger className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              View incident timeline
              <ChevronDownIcon className="size-3 transition-transform duration-200 in-data-panel-open:rotate-180" />
            </CollapsibleTrigger>
          </CardHeader>

          <CollapsiblePanel>
            <CardPanel className="py-3">
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-[7px] w-px bg-border" />
                <div className="space-y-4">
                  {timeline.map((event, i) => (
                    <div className="relative flex gap-3" key={i}>
                      <div className="relative z-10 mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full border bg-background">
                        <div
                          className={`size-1.5 rounded-full ${
                            i === timeline.length - 1
                              ? "bg-success"
                              : "bg-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge
                            size="sm"
                            variant={statusVariant[event.status] ?? "outline"}
                          >
                            {event.status}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            {event.time}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {event.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Separator className="mt-4 mb-3" />
              <p className="text-muted-foreground text-xs">
                Next update in <span className="font-medium text-foreground">12 minutes</span>.
              </p>
            </CardPanel>
          </CollapsiblePanel>
        </Collapsible>
      </Card>
    </div>
  );
}
