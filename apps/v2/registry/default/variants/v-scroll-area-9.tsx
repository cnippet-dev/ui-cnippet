import { ScrollArea } from "@/registry/default/ui/scroll-area";

const timeline = [
  {
    date: "Today",
    entries: [
      {
        action: "Deployed v2.4.1 to production",
        time: "3:12 PM",
        type: "deploy",
      },
      {
        action: "Merged PR #382: Fix auth token expiry",
        time: "1:47 PM",
        type: "merge",
      },
      { action: "Build #914 passed", time: "1:45 PM", type: "build" },
    ],
  },
  {
    date: "Yesterday",
    entries: [
      {
        action: "Opened PR #382: Fix auth token expiry",
        time: "4:20 PM",
        type: "pr",
      },
      {
        action: "Build #913 failed — lint errors",
        time: "4:18 PM",
        type: "error",
      },
      {
        action: "Deployed v2.4.0 to staging",
        time: "11:02 AM",
        type: "deploy",
      },
    ],
  },
  {
    date: "Jun 12",
    entries: [
      { action: "Released v2.4.0", time: "5:00 PM", type: "release" },
      {
        action: "Merged PR #379: Add dark mode",
        time: "3:31 PM",
        type: "merge",
      },
      { action: "Build #910 passed", time: "3:29 PM", type: "build" },
    ],
  },
];

const dotColor: Record<string, string> = {
  build: "bg-green-500",
  deploy: "bg-blue-500",
  error: "bg-destructive",
  merge: "bg-purple-500",
  pr: "bg-muted-foreground",
  release: "bg-primary",
};

export default function Particle() {
  return (
    <ScrollArea className="h-80 w-full max-w-sm rounded-lg border">
      <div className="p-4">
        {timeline.map(({ date, entries }) => (
          <div className="mb-4 last:mb-0" key={date}>
            <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              {date}
            </p>
            <div className="space-y-2">
              {entries.map((entry) => (
                <div className="flex items-start gap-2.5" key={entry.action}>
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${dotColor[entry.type] ?? "bg-muted-foreground"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">{entry.action}</p>
                    <p className="text-muted-foreground text-xs">
                      {entry.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
