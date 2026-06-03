"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/default/ui/breadcrumb";
import { Button } from "@/registry/default/ui/button";

const steps = [
  { id: 1, label: "Cart" },
  { id: 2, label: "Shipping" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" },
];

export function Pattern() {
  const [current, setCurrent] = useState(2);

  return (
    <div className="flex flex-col items-center gap-6">
      <Breadcrumb>
        <BreadcrumbList className="gap-1 sm:gap-1">
          {steps.map((step, i) => {
            const done = step.id < current;
            const active = step.id === current;
            return (
              <>
                <BreadcrumbItem key={step.id}>
                  {active ? (
                    <BreadcrumbPage className="flex items-center gap-1.5">
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary font-bold text-[10px] text-primary-foreground">
                        {step.id}
                      </span>
                      <span className="font-semibold text-sm">
                        {step.label}
                      </span>
                    </BreadcrumbPage>
                  ) : (
                    <button
                      className={`flex items-center gap-1.5 text-sm ${done ? "text-foreground" : "text-muted-foreground/50"}`}
                      disabled={!done}
                      onClick={() => done && setCurrent(step.id)}
                      type="button"
                    >
                      <span
                        className={`flex size-5 items-center justify-center rounded-full font-bold text-[10px] ${
                          done
                            ? "bg-emerald-500 text-white"
                            : "border text-muted-foreground/50"
                        }`}
                      >
                        {done ? <CheckIcon className="size-3" /> : step.id}
                      </span>
                      {step.label}
                    </button>
                  )}
                </BreadcrumbItem>
                {i < steps.length - 1 && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-2">
        <Button
          disabled={current === 1}
          onClick={() => setCurrent((c) => Math.max(1, c - 1))}
          size="sm"
          variant="outline"
        >
          Back
        </Button>
        <Button
          disabled={current === steps.length}
          onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))}
          size="sm"
        >
          {current === steps.length - 1 ? "Place Order" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
