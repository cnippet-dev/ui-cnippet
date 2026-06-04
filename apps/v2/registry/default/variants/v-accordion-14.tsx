"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import { Button } from "@/registry/default/ui/button";

const steps = [
  {
    description:
      "Give your workspace a name and upload a logo. This is how your team will identify the space.",
    title: "Create your workspace",
    value: "step-1",
  },
  {
    description:
      "Add teammates by email. They'll receive an invite link and can join immediately.",
    title: "Invite your team",
    value: "step-2",
  },
  {
    description:
      "Integrate with Slack, GitHub, Jira, and 50+ other tools. Connections can be updated anytime.",
    title: "Connect your tools",
    value: "step-3",
  },
  {
    description:
      "Add a payment method to keep access after your 14-day trial ends. Cancel anytime.",
    title: "Set up billing",
    value: "step-4",
  },
];

export function Pattern() {
  const [completed, setCompleted] = useState<string[]>(["step-1"]);
  const [opened, setOpened] = useState<string[]>(["step-2"]);

  const markDone = (value: string, index: number) => {
    setCompleted((prev) => [...prev, value]);
    const next = steps[index + 1];
    if (next) setOpened([next.value]);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4">
        <h2 className="font-semibold text-base">Getting started</h2>
        <p className="text-muted-foreground text-sm">
          {completed.length} of {steps.length} steps completed
        </p>
      </div>
      <Accordion
        className="w-full space-y-2 border-none"
        multiple
        onValueChange={setOpened}
        value={opened}
      >
        {steps.map((step, i) => {
          const done = completed.includes(step.value);
          return (
            <AccordionItem
              className={`rounded-lg border px-4 last:border-b ${
                done
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/30"
                  : ""
              }`}
              key={step.value}
              value={step.value}
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full font-semibold text-xs ${
                      done
                        ? "bg-emerald-500 text-white"
                        : "border-2 bg-background text-muted-foreground"
                    }`}
                  >
                    {done ? <CheckIcon className="size-3.5" /> : i + 1}
                  </div>
                  <span className="font-medium text-sm">{step.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-9">
                <p className="mb-3 text-muted-foreground text-sm">
                  {step.description}
                </p>
                {!done && (
                  <Button onClick={() => markDone(step.value, i)} size="sm">
                    Mark as complete
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
