// title: Order tracking with compact dots
import {
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/registry/default/ui/timeline";

const STEPS = [
  {
    place: "San Francisco, CA",
    time: "Oct 19, 8:02 AM",
    title: "Out for delivery",
  },
  {
    place: "Oakland, CA",
    time: "Oct 18, 9:41 PM",
    title: "Arrived at local facility",
  },
  { place: "Reno, NV", time: "Oct 17, 6:15 PM", title: "In transit" },
  { place: "Denver, CO", time: "Oct 16, 10:30 AM", title: "Shipped" },
];

export default function Particle() {
  return (
    <div className="w-full max-w-sm rounded-xl border p-5">
      <div className="mb-4">
        <p className="font-medium text-sm">Order #10482</p>
        <p className="text-muted-foreground text-xs">Arrives today by 8 PM</p>
      </div>
      <Timeline className="[--timeline-indicator:--spacing(4)]">
        {STEPS.map((step, i) => (
          <TimelineItem className="pb-5" key={step.title}>
            <TimelineIndicator
              className={
                i === 0
                  ? "before:bg-primary before:ring-4 before:ring-primary/16"
                  : undefined
              }
            />
            <TimelineContent className="gap-0.5">
              <div className="flex items-baseline justify-between gap-3">
                <TimelineTitle className={i === 0 ? "font-medium" : undefined}>
                  {step.title}
                </TimelineTitle>
                <TimelineTime className="shrink-0">{step.time}</TimelineTime>
              </div>
              <TimelineDescription className="text-xs">
                {step.place}
              </TimelineDescription>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
}
