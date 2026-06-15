"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

const plans = [
  {
    description: "For personal projects and side work",
    price: "Free",
    value: "free",
  },
  {
    description: "Collaboration tools and priority support",
    price: "$12/mo",
    value: "pro",
  },
  {
    description: "SSO, audit logs, and dedicated support",
    price: "$49/mo",
    value: "team",
  },
] as const;

export function Pattern() {
  const [selected, setSelected] = useState<string>("pro");

  return (
    <RadioGroup
      className="w-full max-w-xs gap-3"
      onValueChange={setSelected}
      value={selected}
    >
      {plans.map(({ description, price, value }) => (
        <label
          className={`flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-colors hover:bg-muted/50 ${
            selected === value ? "border-primary bg-primary/5" : "border-border"
          }`}
          key={value}
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm capitalize">{value}</span>
            <span className="text-muted-foreground text-xs">{description}</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <span className="font-semibold text-sm tabular-nums">{price}</span>
            <Radio value={value} />
          </div>
        </label>
      ))}
    </RadioGroup>
  );
}
