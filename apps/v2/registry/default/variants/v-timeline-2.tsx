// title: Deployment history with status indicators
import { CheckIcon, LoaderIcon, XIcon } from "lucide-react";
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/registry/default/ui/timeline";

const DEPLOYS = [
  {
    commit: "a41f2c9",
    message: "Add saved views",
    status: "building",
    time: "Building · 1m 12s",
  },
  {
    commit: "9be07d1",
    message: "Fix timezone in exports",
    status: "ready",
    time: "Ready · 14 min ago",
  },
  {
    commit: "3c5a8e0",
    message: "Bump Next.js to 16.4",
    status: "failed",
    time: "Failed · 1 hour ago",
  },
  {
    commit: "e20d4b7",
    message: "Cache pricing page",
    status: "ready",
    time: "Ready · 3 hours ago",
  },
] as const;

const INDICATOR = {
  building: {
    className: "border-info/32 bg-info/8 text-info-foreground",
    icon: <LoaderIcon className="animate-spin" />,
  },
  failed: {
    className:
      "border-destructive/32 bg-destructive/8 text-destructive-foreground",
    icon: <XIcon />,
  },
  ready: {
    className: "border-success/32 bg-success/8 text-success-foreground",
    icon: <CheckIcon />,
  },
};

export default function Particle() {
  return (
    <div className="w-full max-w-sm rounded-xl border p-5">
      <p className="mb-4 font-medium text-sm">Deployments · production</p>
      <Timeline>
        {DEPLOYS.map((d) => (
          <TimelineItem key={d.commit}>
            <TimelineIndicator className={INDICATOR[d.status].className}>
              {INDICATOR[d.status].icon}
            </TimelineIndicator>
            <TimelineContent className="gap-0.5">
              <TimelineTitle>{d.message}</TimelineTitle>
              <TimelineDescription className="font-mono text-xs">
                {d.commit}
              </TimelineDescription>
              <TimelineTime>{d.time}</TimelineTime>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
