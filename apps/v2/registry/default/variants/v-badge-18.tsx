// title: Showcase: variants, sizes, icons and counts
import { CheckIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";

const variants = [
  "default",
  "outline",
  "secondary",
  "destructive",
  "info",
  "success",
  "warning",
  "error",
] as const;

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Row label="Variants">
        {variants.map((variant) => (
          <Badge className="capitalize" key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </Row>
      <Row label="Sizes">
        <Badge size="sm">Small</Badge>
        <Badge>Default</Badge>
        <Badge size="lg">Large</Badge>
      </Row>
      <Row label="With icon">
        <Badge variant="success">
          <CheckIcon aria-hidden="true" />
          Verified
        </Badge>
        <Badge variant="warning">
          <ClockIcon aria-hidden="true" />
          Pending
        </Badge>
      </Row>
      <Row label="Counts">
        <Badge className="rounded-full">7</Badge>
        <Badge className="rounded-full" variant="secondary">
          24
        </Badge>
        <Badge className="rounded-full" variant="error">
          99+
        </Badge>
      </Row>
    </div>
  );
}
