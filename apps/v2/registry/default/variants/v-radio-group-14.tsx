import { Label } from "@/registry/default/ui/label";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const statuses = [
  {
    color: "bg-green-500",
    description: "Visible to everyone",
    label: "Online",
    value: "online",
  },
  {
    color: "bg-yellow-500",
    description: "Will reply when back",
    label: "Away",
    value: "away",
  },
  {
    color: "bg-red-500",
    description: "Minimizing interruptions",
    label: "Busy",
    value: "busy",
  },
  {
    color: "bg-foreground/30",
    description: "Appears offline to others",
    label: "Offline",
    value: "offline",
  },
];

export default function Particle() {
  return (
    <RadioGroup className="w-full max-w-xs" defaultValue="online">
      {statuses.map(({ color, description, label, value }) => (
        <Label
          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-accent/50"
          key={value}
        >
          <Radio value={value} />
          <span
            aria-hidden="true"
            className={`size-2.5 shrink-0 rounded-full ${color}`}
          />
          <div className="flex flex-col">
            <span className="font-medium text-sm">{label}</span>
            <span className="text-muted-foreground text-xs">{description}</span>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
