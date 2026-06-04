import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type ServiceStatus = "operational" | "degraded" | "down";

type Service = {
  name: string;
  uptime: string;
  latency: string;
  status: ServiceStatus;
};

const services: Service[] = [
  {
    latency: "12 ms",
    name: "API Gateway",
    status: "operational",
    uptime: "99.99%",
  },
  {
    latency: "8 ms",
    name: "Auth Service",
    status: "operational",
    uptime: "99.97%",
  },
  {
    latency: "340 ms",
    name: "Image CDN",
    status: "degraded",
    uptime: "98.12%",
  },
  {
    latency: "22 ms",
    name: "Database",
    status: "operational",
    uptime: "99.95%",
  },
  { latency: "—", name: "Email Worker", status: "down", uptime: "94.60%" },
  {
    latency: "18 ms",
    name: "Search Index",
    status: "operational",
    uptime: "99.90%",
  },
];

const dotClass: Record<ServiceStatus, string> = {
  degraded: "bg-amber-400",
  down: "bg-red-500",
  operational: "bg-emerald-500",
};

const statusLabel: Record<ServiceStatus, string> = {
  degraded: "Degraded",
  down: "Down",
  operational: "Operational",
};

export function Pattern() {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
      <span className="text-muted-foreground text-xs">Services</span>
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {services.map(({ name, uptime, latency, status }) => (
            <Tooltip key={name}>
              <TooltipTrigger className="cursor-default">
                <span
                  aria-label={`${name}: ${statusLabel[status]}`}
                  className={`block size-2.5 rounded-full ${dotClass[status]}`}
                />
              </TooltipTrigger>
              <TooltipContent className="space-y-0.5 p-2.5">
                <p className="font-medium">{name}</p>
                <p className="text-muted-foreground">{statusLabel[status]}</p>
                <p className="text-muted-foreground">Uptime {uptime}</p>
                <p className="text-muted-foreground">Latency {latency}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
