import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { Label } from "@/registry/default/ui/label";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const themes = [
  { Icon: SunIcon, label: "Light", value: "light" },
  { Icon: MoonIcon, label: "Dark", value: "dark" },
  { Icon: MonitorIcon, label: "System", value: "system" },
];

export default function Particle() {
  return (
    <RadioGroup className="flex-row gap-3" defaultValue="system">
      {themes.map(({ Icon, label, value }) => (
        <Label
          className="relative flex w-24 cursor-pointer flex-col items-center gap-3 rounded-lg border p-4 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
          key={value}
        >
          <Radio className="absolute top-3 right-3" value={value} />
          <Icon aria-hidden="true" className="size-5" />
          <span className="text-sm">{label}</span>
        </Label>
      ))}
    </RadioGroup>
  );
}
