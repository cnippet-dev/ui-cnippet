import { ScrollArea } from "@/registry/default/ui/scroll-area";

const logs = [
  { id: 1, level: "info", message: "Server started on port 3000", time: "10:00:01" },
  {
    id: 2,
    level: "info",
    message: "Connected to database successfully",
    time: "10:00:02",
  },
  {
    id: 3,
    level: "warn",
    message: "Deprecated API endpoint accessed: /api/v1/users",
    time: "10:00:15",
  },
  {
    id: 4,
    level: "info",
    message: "GET /api/health → 200 (12ms)",
    time: "10:00:23",
  },
  {
    id: 5,
    level: "error",
    message: "Failed to send email: SMTP connection refused",
    time: "10:00:31",
  },
  {
    id: 6,
    level: "info",
    message: "Cache cleared for key: user:sessions",
    time: "10:00:44",
  },
  {
    id: 7,
    level: "warn",
    message: "Rate limit threshold reached for IP 192.168.1.42",
    time: "10:01:02",
  },
  {
    id: 8,
    level: "info",
    message: "POST /api/auth/login → 200 (38ms)",
    time: "10:01:09",
  },
  {
    id: 9,
    level: "error",
    message: "Unhandled promise rejection in worker thread",
    time: "10:01:22",
  },
  {
    id: 10,
    level: "info",
    message: "Scheduled job 'cleanup' completed in 142ms",
    time: "10:01:30",
  },
];

const levelClass: Record<string, string> = {
  error: "text-red-500",
  info: "text-muted-foreground",
  warn: "text-yellow-500",
};

export default function Particle() {
  return (
    <ScrollArea className="h-64 w-full max-w-xl rounded-lg border bg-muted/30">
      <div className="flex flex-col gap-0.5 p-3 font-mono text-xs">
        {logs.map(({ id, level, message, time }) => (
          <div className="flex items-start gap-3" key={id}>
            <span className="shrink-0 text-muted-foreground">{time}</span>
            <span
              className={`w-10 shrink-0 font-semibold uppercase ${levelClass[level]}`}
            >
              {level}
            </span>
            <span className={levelClass[level] !== "text-muted-foreground" ? levelClass[level] : ""}>
              {message}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
