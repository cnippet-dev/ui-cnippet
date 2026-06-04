import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const deployTargets: {
  description: string;
  label: string;
  value: string | null;
}[] = [
  { description: "", label: "Select environment", value: null },
  {
    description: "Public-facing production environment",
    label: "Production",
    value: "production",
  },
  {
    description: "Internal testing and QA environment",
    label: "Staging",
    value: "staging",
  },
  {
    description: "For feature development and experiments",
    label: "Development",
    value: "development",
  },
  {
    description: "Isolated per-branch preview deployments",
    label: "Preview",
    value: "preview",
  },
];

export default function Particle() {
  return (
    <Select defaultValue={deployTargets[2]} items={deployTargets}>
      <SelectTrigger className="w-56">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {deployTargets.slice(1).map((item) => (
          <SelectItem key={item.value} value={item}>
            <span className="flex flex-col gap-0.5">
              <span>{item.label}</span>
              <span className="text-muted-foreground text-xs">
                {item.description}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
