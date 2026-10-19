// title: Status dot indicators (Online, Busy, Away, Offline)
import { Badge, type BadgeProps } from "@/registry/default/ui/badge";

type Status = {
  label: string;
  dotClass: string;
  variant: BadgeProps["variant"];
};

const statuses: Status[] = [
  { dotClass: "bg-success", label: "Online", variant: "success" },
  { dotClass: "bg-destructive", label: "Busy", variant: "error" },
  { dotClass: "bg-warning", label: "Away", variant: "warning" },
  {
    dotClass: "bg-muted-foreground/48",
    label: "Offline",
    variant: "secondary",
  },
];

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((s) => (
        <Badge key={s.label} variant={s.variant}>
          <span
            aria-hidden="true"
            className={`size-1.5 rounded-full ${s.dotClass}`}
          />
          {s.label}
        </Badge>
      ))}
    </div>
  );
}
