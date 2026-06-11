//biome-ignore-all lint/suspicious/noArrayIndexKey: <>

import { ChevronDownIcon } from "lucide-react";

import { Badge } from "@/registry/default/ui/badge";
import { Card, CardPanel } from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";

type StepStatus = "success" | "failed" | "running" | "pending";

const statusVariant: Record<
  StepStatus,
  "success" | "destructive" | "info" | "outline"
> = {
  failed: "destructive",
  pending: "outline",
  running: "info",
  success: "success",
};

const steps: {
  id: string;
  name: string;
  status: StepStatus;
  duration: string;
  log: string[];
}[] = [
  {
    duration: "3s",
    id: "install",
    log: [
      "$ bun install",
      "bun install v1.1.0",
      "Resolving dependencies...",
      "✓ 412 packages installed [3.14s]",
    ],
    name: "Install dependencies",
    status: "success",
  },
  {
    duration: "12s",
    id: "typecheck",
    log: [
      "$ tsc --noEmit",
      "src/components/Button.tsx(14,7): error TS2322",
      "  Type 'string' is not assignable to type 'number'.",
      "Found 1 error.",
    ],
    name: "Type check",
    status: "failed",
  },
  {
    duration: "—",
    id: "build",
    log: [],
    name: "Build",
    status: "pending",
  },
];

export function Pattern() {
  return (
    <div className="w-full max-w-md space-y-2">
      {steps.map((step) => (
        <Card className="overflow-hidden" key={step.id}>
          <Collapsible disabled={step.status === "pending"}>
            <CollapsibleTrigger className="w-full">
              <CardPanel className="py-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Badge size="sm" variant={statusVariant[step.status]}>
                      {step.status}
                    </Badge>
                    <span className="font-medium text-sm">{step.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-xs">{step.duration}</span>
                    {step.status !== "pending" && (
                      <ChevronDownIcon className="size-3.5 in-data-panel-open:rotate-180 transition-transform duration-200" />
                    )}
                  </div>
                </div>
              </CardPanel>
            </CollapsibleTrigger>

            {step.log.length > 0 && (
              <CollapsiblePanel>
                <div className="border-t bg-muted/40 px-4 py-3">
                  <pre className="space-y-0.5 overflow-x-auto text-xs leading-relaxed">
                    {step.log.map((line, i) => (
                      <div
                        className={
                          line.startsWith("$")
                            ? "font-semibold text-foreground"
                            : line.includes("error") || line.includes("Error")
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }
                        key={i}
                      >
                        {line}
                      </div>
                    ))}
                  </pre>
                </div>
              </CollapsiblePanel>
            )}
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}
