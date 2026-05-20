"use client";

import { ArrowLeftIcon, ArrowRightIcon, CompassIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const steps = [
  {
    description:
      "Add team members by email to collaborate on projects in real time. Assign roles and manage permissions from the team settings.",
    title: "Invite Your Team",
  },
  {
    description:
      "Set up your first project with a name, description, and timeline. Choose from templates or start from scratch.",
    title: "Create a Project",
  },
  {
    description:
      "Link tools like GitHub, Slack, and Figma to streamline your workflow and keep everything in sync.",
    title: "Connect Integrations",
  },
  {
    description:
      "Customize which events trigger alerts — mentions, due dates, status changes, and deployment updates.",
    title: "Set Up Notifications",
  },
];

export function Pattern() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <CompassIcon aria-hidden="true" />
          Feature Tour
        </PopoverTrigger>
        <PopoverContent
          className="w-72 gap-2 px-3 pt-3 pb-2"
          side="top"
          sideOffset={8}
        >
          <div className="space-y-2">
            <p className="font-medium leading-tight">
              {steps[currentStep]?.title}
            </p>
            <p className="text-muted-foreground">
              {steps[currentStep]?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
            <div className="flex gap-0.5">
              <Button
                aria-label="Previous step"
                className="size-6"
                disabled={isFirst}
                onClick={handlePrev}
                size="icon"
                variant="ghost"
              >
                <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
              </Button>
              <Button
                aria-label="Next step"
                className="size-6"
                disabled={isLast}
                onClick={handleNext}
                size="icon"
                variant="ghost"
              >
                <ArrowRightIcon aria-hidden="true" className="size-3.5" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
