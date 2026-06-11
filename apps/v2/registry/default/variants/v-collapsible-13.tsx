"use client";

import {
  ChevronDownIcon,
  PackageIcon,
  ShieldIcon,
  ZapIcon,
} from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Card, CardPanel } from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

const PACKAGES = [
  {
    description: "Logging, rate limiting, and request tracing utilities.",
    icon: ZapIcon,
    id: "middleware",
    items: ["@cnippet/logger", "@cnippet/rate-limit", "@cnippet/trace"],
    label: "Middleware",
    version: "v1.4.2",
  },
  {
    description: "Input sanitization and schema validation.",
    icon: ShieldIcon,
    id: "security",
    items: ["@cnippet/sanitize", "@cnippet/zod-adapter"],
    label: "Security",
    version: "v2.1.0",
  },
  {
    description: "UI component bundles and design tokens.",
    icon: PackageIcon,
    id: "ui",
    items: ["@cnippet/ui", "@cnippet/tokens", "@cnippet/icons"],
    label: "UI",
    version: "v3.0.0",
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <p className="mb-3 font-semibold text-sm">Package dependencies</p>
      {PACKAGES.map((pkg) => {
        const Icon = pkg.icon;
        return (
          <Card className="overflow-hidden p-0" key={pkg.id}>
            <Collapsible>
              <CollapsibleTrigger className="w-full">
                <CardPanel className="py-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <Icon className="size-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{pkg.label}</span>
                      <Badge size="sm" variant="secondary">
                        {pkg.version}
                      </Badge>
                    </div>
                    <ChevronDownIcon className="size-3.5 in-data-panel-open:rotate-180 text-muted-foreground transition-transform duration-200" />
                  </div>
                </CardPanel>
              </CollapsibleTrigger>
              <CollapsiblePanel>
                <div className="space-y-1.5 border-t bg-muted/30 px-4 py-3">
                  <p className="mb-2 text-muted-foreground text-xs">
                    {pkg.description}
                  </p>
                  {pkg.items.map((item) => (
                    <div
                      className="font-mono text-foreground text-xs"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CollapsiblePanel>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
