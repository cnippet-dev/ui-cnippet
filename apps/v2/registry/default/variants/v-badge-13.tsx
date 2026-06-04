import { Badge } from "@/registry/default/ui/badge";

type Status = {
  label: string;
  dotClass: string;
  variant:
    | "default"
    | "outline"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "info";
};

const statuses: Status[] = [
  { dotClass: "bg-emerald-500", label: "Online", variant: "success" },
  { dotClass: "bg-red-500", label: "Busy", variant: "destructive" },
  { dotClass: "bg-yellow-400", label: "Away", variant: "warning" },
  { dotClass: "bg-slate-400", label: "Offline", variant: "secondary" },
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
