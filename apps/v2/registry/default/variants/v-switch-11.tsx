"use client";

import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Switch } from "@/registry/default/ui/switch";

const features = [
  { id: "analytics", label: "Advanced Analytics", pro: true },
  { id: "api", label: "API Access", pro: true },
  { id: "export", label: "Data Export", pro: true },
  { id: "sso", label: "Single Sign-On", pro: true },
  { id: "audit", label: "Audit Logs", pro: false },
  { id: "support", label: "Priority Support", pro: false },
];

export default function Particle() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    analytics: true,
    api: false,
    export: true,
    sso: false,
    audit: false,
    support: false,
  });

  return (
    <div className="w-full max-w-sm space-y-1 rounded-xl border p-1">
      {features.map(({ id, label, pro }) => (
        <div
          className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50"
          key={id}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{label}</span>
            {!pro && (
              <Badge className="text-[10px]" variant="secondary">
                Enterprise
              </Badge>
            )}
          </div>
          <Switch
            checked={enabled[id]}
            disabled={!pro}
            onCheckedChange={(v) => setEnabled((prev) => ({ ...prev, [id]: v }))}
          />
        </div>
      ))}
    </div>
  );
}
