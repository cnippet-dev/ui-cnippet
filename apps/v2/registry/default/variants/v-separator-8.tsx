import { Separator } from "@/registry/default/ui/separator";

const steps = [
  { description: "Your email address is confirmed", label: "Email verified" },
  { description: "Payment method saved securely", label: "Billing set up" },
  {
    description: "Configure how your team works together",
    label: "Team preferences",
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-0">
      {steps.map((step, i) => (
        <div key={step.label}>
          <div className="flex items-start gap-3 py-3">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-sm">{step.label}</p>
              <p className="text-muted-foreground text-xs">
                {step.description}
              </p>
            </div>
          </div>
          {i < steps.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
