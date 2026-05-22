import { TextLoop } from "@/registry/default/motion/text-loop";

const statuses = [
  { color: "bg-emerald-500", label: "All systems operational" },
  { color: "bg-blue-500", label: "Deploying v2.4.1" },
  { color: "bg-amber-500", label: "Elevated latency" },
];

export default function TextLoopStatus() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
        <TextLoop
          interval={3}
          transition={{ duration: 0.35 }}
          variants={{
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            initial: { opacity: 0, y: 8 },
          }}
        >
          {statuses.map(({ color, label }) => (
            <span className="flex items-center gap-2" key={label}>
              <span className={`h-2 w-2 rounded-full ${color}`} />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </span>
          ))}
        </TextLoop>
      </div>
    </div>
  );
}
