import { Badge } from "@/registry/default/ui/badge";
import { Label } from "@/registry/default/ui/label";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const frequencies = [
  {
    badge: null,
    description: "Pay each month",
    label: "Monthly",
    value: "monthly",
  },
  {
    badge: "Save 10%",
    description: "Billed every quarter",
    label: "Quarterly",
    value: "quarterly",
  },
  {
    badge: "Save 25%",
    description: "Billed once a year",
    label: "Annually",
    value: "annually",
  },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <p className="font-medium text-sm">Billing frequency</p>
      <RadioGroup defaultValue="monthly">
        {frequencies.map(({ badge, description, label, value }) => (
          <Label
            className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
            key={value}
          >
            <div className="flex items-center gap-3">
              <Radio value={value} />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium text-sm">{label}</span>
                <span className="text-muted-foreground text-xs">
                  {description}
                </span>
              </div>
            </div>
            {badge && <Badge variant="secondary">{badge}</Badge>}
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}
