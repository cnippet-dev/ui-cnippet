import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const days = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
];

export default function Component() {
  return (
    <CheckboxGroup
      aria-label="Select days"
      className="flex-row flex-wrap gap-x-5 gap-y-3"
      defaultValue={["mon", "tue", "wed", "thu", "fri"]}
    >
      {days.map((day) => (
        <Label key={day.id}>
          <Checkbox value={day.id} />
          {day.label}
        </Label>
      ))}
    </CheckboxGroup>
  );
}
