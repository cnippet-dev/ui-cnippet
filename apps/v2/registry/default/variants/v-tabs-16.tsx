"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

const plans = [
  {
    features: [
      "5 projects",
      "3 team members",
      "5 GB storage",
      "Email support",
    ],
    monthly: 9,
    name: "Starter",
    yearly: 7,
  },
  {
    features: [
      "Unlimited projects",
      "20 team members",
      "50 GB storage",
      "Priority support",
      "Advanced analytics",
    ],
    monthly: 29,
    name: "Pro",
    yearly: 23,
  },
  {
    features: [
      "Unlimited projects",
      "Unlimited members",
      "1 TB storage",
      "Dedicated support",
      "SSO & SAML",
      "Audit logs",
    ],
    monthly: 99,
    name: "Enterprise",
    yearly: 79,
  },
];

export function Pattern() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-6">
      <Tabs
        onValueChange={(v) => setBilling(v as "monthly" | "yearly")}
        value={billing}
      >
        <TabsList>
          <TabsTab value="monthly">Monthly</TabsTab>
          <TabsTab className="gap-1.5" value="yearly">
            Yearly
            <Badge size="sm" variant="success">
              Save 20%
            </Badge>
          </TabsTab>
        </TabsList>
        <TabsPanel value="monthly" />
        <TabsPanel value="yearly" />
      </Tabs>

      <div className="grid w-full grid-cols-3 gap-3">
        {plans.map((plan) => (
          <div
            className={`flex flex-col gap-3 rounded-xl border p-4 ${plan.name === "Pro" ? "border-primary ring-1 ring-primary/20" : "border-border"}`}
            key={plan.name}
          >
            <div>
              <p className="font-semibold text-sm">{plan.name}</p>
              <p className="mt-1 font-bold text-2xl">
                ${billing === "monthly" ? plan.monthly : plan.yearly}
                <span className="font-normal text-muted-foreground text-xs">
                  /mo
                </span>
              </p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {plan.features.map((f) => (
                <li
                  className="flex items-start gap-1.5 text-muted-foreground text-xs"
                  key={f}
                >
                  <CheckIcon className="mt-px size-3 shrink-0 text-emerald-500" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className="mt-auto"
              size="sm"
              variant={plan.name === "Pro" ? "default" : "outline"}
            >
              Get started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
