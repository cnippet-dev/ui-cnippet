"use client";

import { useId, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";

const FEATURES = [
  {
    desc: "Dedicated infrastructure with 99.99% SLA.",
    id: "uptime",
    label: "High Availability",
  },
  {
    desc: "End-to-end encryption for all data at rest and in transit.",
    id: "encryption",
    label: "Data Encryption",
  },
  {
    desc: "Access real-time metrics, logs, and alerting dashboards.",
    id: "monitoring",
    label: "Advanced Monitoring",
  },
  {
    desc: "Enterprise SSO via SAML 2.0 and OIDC.",
    id: "sso",
    label: "SSO & SAML",
  },
  {
    desc: "Guaranteed 4-hour response for Severity 1 issues.",
    id: "support",
    label: "Priority Support",
  },
];

export function Pattern() {
  const id = useId();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(["uptime", "encryption"]),
  );

  const toggle = (fid: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(fid) ? next.delete(fid) : next.add(fid);
      return next;
    });

  const basePrice = 49;
  const addOnPrice = (selected.size - 2) * 12;
  const total = basePrice + Math.max(0, addOnPrice);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <p className="font-semibold text-sm">Customize your plan</p>
        <p className="mt-0.5 text-muted-foreground text-xs">
          Select the add-ons you need.
        </p>
      </div>
      <div className="space-y-1.5">
        {FEATURES.map((f) => (
          <label
            className="flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-muted/50"
            htmlFor={`${id}-${f.id}`}
            key={f.id}
          >
            <Checkbox
              checked={selected.has(f.id)}
              className="mt-0.5"
              id={`${id}-${f.id}`}
              onCheckedChange={() => toggle(f.id)}
            />
            <div className="flex-1">
              <span className="font-medium text-sm">{f.label}</span>
              <p className="mt-0.5 text-muted-foreground text-xs">{f.desc}</p>
            </div>
          </label>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-2.5">
        <span className="font-medium text-sm">Estimated total</span>
        <span className="font-bold text-sm">${total}/mo</span>
      </div>
      <Button className="w-full">Confirm selection</Button>
    </div>
  );
}
