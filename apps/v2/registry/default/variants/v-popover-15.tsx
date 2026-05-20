import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

type Status = "degraded" | "operational" | "outage";

const services: { latency: string; name: string; status: Status }[] = [
  { latency: "42ms", name: "API Gateway", status: "operational" },
  { latency: "8ms", name: "Database", status: "operational" },
  { latency: "12ms", name: "CDN", status: "operational" },
  { latency: "340ms", name: "Auth Service", status: "degraded" },
  { latency: "91ms", name: "Storage", status: "operational" },
];

const statusConfig: Record<Status, { dot: string; label: string }> = {
  degraded: { dot: "bg-amber-500", label: "Degraded" },
  operational: { dot: "bg-emerald-500", label: "Operational" },
  outage: { dot: "bg-red-500", label: "Outage" },
};

const allOperational = services.every((s) => s.status === "operational");

export function Pattern() {
  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <span
            className={`size-2 animate-pulse rounded-full ${allOperational ? "bg-emerald-500" : "bg-amber-500"}`}
          />
          System Status
        </PopoverTrigger>
        <PopoverContent align="center" className="w-72 gap-0 p-0">
          <div className="border-b px-0 py-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">System Status</h4>
              <Badge
                className="text-xs"
                variant={allOperational ? "default" : "outline"}
              >
                {allOperational ? "All Operational" : "Issues Detected"}
              </Badge>
            </div>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Real-time service health.
            </p>
          </div>
          <div className="divide-y">
            {services.map(({ name, status, latency }) => {
              const cfg = statusConfig[status];
              return (
                <div className="flex items-center gap-3 px-2 py-2.5" key={name}>
                  <span className={`size-2 shrink-0 rounded-full ${cfg.dot}`} />
                  <span className="flex-1 text-sm">{name}</span>
                  <span className="text-muted-foreground text-xs tabular-nums">
                    {latency}
                  </span>
                  <span className="w-20 text-right text-muted-foreground text-xs">
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t px-0 py-2.5">
            <p className="text-muted-foreground text-xs">
              Last checked{" "}
              <span className="font-medium text-foreground">just now</span>.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
