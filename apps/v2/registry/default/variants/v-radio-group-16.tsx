// title: Showcase: simple, disabled and with descriptions
import { Label } from "@/registry/default/ui/label";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const plans = [
  { description: "For personal projects.", label: "Free", value: "free" },
  { description: "For growing teams.", label: "Pro", value: "pro" },
  {
    description: "Contact sales to enable.",
    disabled: true,
    label: "Enterprise",
    value: "enterprise",
  },
];

export default function Particle() {
  return (
    <div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground text-xs">Simple</span>
        <RadioGroup defaultValue="next">
          <Label>
            <Radio value="next" /> Next.js
          </Label>
          <Label>
            <Radio value="vite" /> Vite
          </Label>
          <Label>
            <Radio disabled value="astro" /> Astro (disabled)
          </Label>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground text-xs">With description</span>
        <RadioGroup defaultValue="pro">
          {plans.map((plan) => (
            <div className="flex items-start gap-2" key={plan.value}>
              <Radio
                disabled={plan.disabled}
                id={`showcase-${plan.value}`}
                value={plan.value}
              />
              <div className="flex flex-col gap-1">
                <Label htmlFor={`showcase-${plan.value}`}>{plan.label}</Label>
                <p className="text-muted-foreground text-xs">
                  {plan.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
