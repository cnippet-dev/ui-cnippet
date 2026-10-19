// title: Compact dot progress with step count
"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
} from "@/registry/default/ui/stepper";

const TITLES = ["Account", "Profile", "Preferences", "Review", "Done"];

export default function Particle() {
  const [step, setStep] = useState(3);

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{TITLES[step - 1]}</span>
        <span className="text-muted-foreground tabular-nums">
          Step {step} of {TITLES.length}
        </span>
      </div>
      <Stepper value={step}>
        {TITLES.map((title, i) => (
          <StepperItem key={title} step={i + 1}>
            <StepperIndicator className="size-2.5 group-data-[state=active]/step:ring-2">
              <span className="sr-only">{title}</span>
            </StepperIndicator>
            <StepperSeparator className="mx-1 mt-[4.5px]" />
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex justify-between">
        <Button
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
          size="sm"
          variant="ghost"
        >
          <ChevronLeftIcon aria-hidden="true" />
          Back
        </Button>
        <Button
          disabled={step === TITLES.length}
          onClick={() => setStep((s) => s + 1)}
          size="sm"
          variant="ghost"
        >
          Next
          <ChevronRightIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
