import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const features = [
  { id: "dark-mode", label: "Dark mode" },
  { id: "analytics", label: "Analytics" },
  { id: "notifications", label: "Notifications" },
  { id: "auto-save", label: "Auto-save" },
  { id: "keyboard-shortcuts", label: "Keyboard shortcuts" },
];

export default function Component() {
  return (
    <CheckboxGroup
      aria-label="Feature flags"
      defaultValue={["dark-mode", "auto-save"]}
      disabled
    >
      {features.map((feature) => (
        <Label key={feature.id}>
          <Checkbox value={feature.id} />
          {feature.label}
        </Label>
      ))}
    </CheckboxGroup>
  );
}
