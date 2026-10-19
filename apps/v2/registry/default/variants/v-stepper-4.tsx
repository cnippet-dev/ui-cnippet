// title: Jump back to finished steps
"use client";

import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/registry/default/ui/stepper";

const steps = ["Details", "Pricing", "Media", "Publish"];

export default function Particle() {
  const [step, setStep] = useState(2);
  // Steps the user has already finished stay reachable after going back.
  const [furthest, setFurthest] = useState(3);

  return (
    <div className="flex w-full max-w-lg flex-col gap-5">
      <Stepper
        onValueChange={(next) => {
          setStep(next);
          setFurthest((f) => Math.max(f, next));
        }}
        value={step}
      >
        {steps.map((title, i) => (
          <StepperItem
            completed={i + 1 < furthest && i + 1 !== step}
            disabled={i + 1 > furthest}
            key={title}
            step={i + 1}
          >
            <StepperTrigger className="flex-row gap-2">
              <StepperIndicator />
              <StepperTitle className="max-sm:sr-only">{title}</StepperTitle>
            </StepperTrigger>
            <StepperSeparator />
          </StepperItem>
        ))}
      </Stepper>
      <div className="flex items-center justify-between rounded-xl border p-4 text-sm">
        <span>
          Editing <span className="font-medium">{steps[step - 1]}</span>
        </span>
        <Badge variant="outline">
          {furthest - 1} of {steps.length} done
        </Badge>
      </div>
      <p className="text-muted-foreground text-xs">
        Click any finished step to jump back to it.
      </p>
    </div>
  );
}
