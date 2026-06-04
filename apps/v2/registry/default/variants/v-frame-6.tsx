import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

const stats = [
  { label: "Total revenue", trend: "+12.5%", value: "$48,295" },
  { label: "Active users", trend: "+8.1%", value: "3,842" },
  { label: "Conversion rate", trend: "-0.4%", value: "3.6%" },
];

export function Pattern() {
  return (
    <Frame className="w-full max-w-sm">
      <FrameHeader>
        <FrameTitle>Overview</FrameTitle>
        <FrameDescription>Last 30 days</FrameDescription>
      </FrameHeader>
      {stats.map((stat) => (
        <FramePanel key={stat.label}>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <span
              className={`font-medium text-xs ${stat.trend.startsWith("+") ? "text-success" : "text-destructive-foreground"}`}
            >
              {stat.trend}
            </span>
          </div>
          <p className="font-semibold text-xl">{stat.value}</p>
        </FramePanel>
      ))}
    </Frame>
  );
}
