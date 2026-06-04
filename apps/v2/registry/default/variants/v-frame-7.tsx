import { Badge } from "@/registry/default/ui/badge";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <Frame className="w-full max-w-md">
      <FrameHeader className="flex-row items-start justify-between">
        <div>
          <FrameTitle>API Status</FrameTitle>
          <FrameDescription>Current system health</FrameDescription>
        </div>
        <Badge variant="success">Operational</Badge>
      </FrameHeader>
      <FramePanel>
        <div className="flex flex-col gap-2">
          {[
            { label: "Authentication API", status: "operational" },
            { label: "Storage API", status: "operational" },
            { label: "Webhooks", status: "degraded" },
          ].map((service) => (
            <div
              className="flex items-center justify-between"
              key={service.label}
            >
              <p className="text-sm">{service.label}</p>
              <span
                className={`size-2 rounded-full ${service.status === "operational" ? "bg-success" : "bg-warning"}`}
              />
            </div>
          ))}
        </div>
      </FramePanel>
    </Frame>
  );
}
