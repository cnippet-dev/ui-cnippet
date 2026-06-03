import { Label } from "@/registry/default/ui/label";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const options = [
  {
    description: "5–7 business days",
    label: "Standard",
    price: "Free",
    value: "standard",
  },
  {
    description: "2–3 business days",
    label: "Express",
    price: "$9.99",
    value: "express",
  },
  {
    description: "Next business day",
    label: "Overnight",
    price: "$24.99",
    value: "overnight",
  },
];

export default function Particle() {
  return (
    <RadioGroup className="w-full max-w-sm" defaultValue="standard">
      {options.map(({ description, label, price, value }) => (
        <Label
          className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
          key={value}
        >
          <Radio value={value} />
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">{label}</span>
              <span className="text-muted-foreground text-xs">{description}</span>
            </div>
            <span className="font-medium text-sm">{price}</span>
          </div>
        </Label>
      ))}
    </RadioGroup>
  );
}
