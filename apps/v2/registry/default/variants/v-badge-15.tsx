import { Badge } from "@/registry/default/ui/badge";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const tiers = [
  {
    description: "For individuals getting started",
    label: "Free",
    price: "$0/mo",
    variant: "secondary" as const,
  },
  {
    description: "For small teams and projects",
    label: "Starter",
    price: "$12/mo",
    variant: "info" as const,
  },
  {
    description: "Advanced features for growing teams",
    label: "Pro",
    price: "$49/mo",
    variant: "default" as const,
  },
  {
    description: "Custom pricing for large organisations",
    label: "Enterprise",
    price: "Custom",
    variant: "success" as const,
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Frame>
        {tiers.map((tier) => (
          <FramePanel
            className="flex items-center justify-between gap-3"
            key={tier.label}
          >
            <div className="flex items-center gap-2.5">
              <Badge size="sm" variant={tier.variant}>
                {tier.label}
              </Badge>
              <span className="text-muted-foreground text-sm">
                {tier.description}
              </span>
            </div>
            <span className="shrink-0 font-semibold text-sm">{tier.price}</span>
          </FramePanel>
        ))}
      </Frame>
    </div>
  );
}
