import { CheckIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";

const plan = {
  badge: "Most Popular",
  cta: "Start free trial",
  features: [
    "Unlimited components",
    "Team collaboration",
    "Priority support",
    "Custom themes",
    "CLI access",
  ],
  name: "Pro",
  period: "/ month",
  price: "$12",
};

export function Pattern() {
  return (
    <Card className="w-full max-w-xs ring-2 ring-primary">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm">{plan.name}</span>
          <Badge size="sm">{plan.badge}</Badge>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-3xl">{plan.price}</span>
          <span className="text-muted-foreground text-sm">{plan.period}</span>
        </div>
        <Separator />
        <ul className="flex flex-col gap-2">
          {plan.features.map((f) => (
            <li className="flex items-center gap-2 text-sm" key={f}>
              <CheckIcon className="size-4 shrink-0 text-emerald-500" />
              {f}
            </li>
          ))}
        </ul>
        <Button className="w-full">{plan.cta}</Button>
      </CardContent>
    </Card>
  );
}
