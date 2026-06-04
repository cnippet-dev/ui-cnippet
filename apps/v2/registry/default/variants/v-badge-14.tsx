import { Badge } from "@/registry/default/ui/badge";

const channels = [
  { label: "Stable", variant: "success" as const },
  { label: "Beta", variant: "info" as const },
  { label: "Experimental", variant: "warning" as const },
  { label: "Deprecated", variant: "destructive" as const },
];

export default function Particle() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-muted-foreground text-sm">Release channels</p>
      <div className="flex flex-wrap items-center gap-2">
        {channels.map((c) => (
          <Badge key={c.label} variant={c.variant}>
            {c.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
