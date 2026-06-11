import { CountingNumber } from "@/registry/default/motion/counting-number";

const metrics = [
  {
    color: "from-violet-500 to-purple-600",
    label: "Uptime SLA",
    prefix: "",
    suffix: "%",
    target: 99.9,
    transition: {
      duration: 1.8,
      ease: "easeOut" as const,
      type: "tween" as const,
    },
  },
  {
    color: "from-blue-500 to-cyan-500",
    label: "Requests / sec",
    prefix: "",
    suffix: "K",
    target: 12.4,
    transition: {
      duration: 2,
      ease: "easeOut" as const,
      type: "tween" as const,
    },
  },
  {
    color: "from-emerald-500 to-teal-500",
    label: "Avg latency",
    prefix: "",
    suffix: "ms",
    target: 42,
    transition: {
      duration: 1.5,
      ease: "easeOut" as const,
      type: "tween" as const,
    },
  },
];

export default function CountingNumberDashboard() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex w-full max-w-xs flex-col gap-3">
        {metrics.map((m) => (
          <div
            className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            key={m.label}
          >
            <p className="text-muted-foreground text-sm">{m.label}</p>
            <p
              className={`bg-gradient-to-r ${m.color} bg-clip-text font-bold text-2xl text-transparent tabular-nums`}
            >
              {m.prefix}
              <CountingNumber target={m.target} transition={m.transition} />
              {m.suffix}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
