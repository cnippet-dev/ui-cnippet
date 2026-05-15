"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import { Progress } from "@/registry/default/ui/progress";

export function Pattern() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="relative w-full max-w-md gap-6 overflow-visible pb-1">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>3 days remaining in cycle</CardTitle>
        <CardAction>
          <Button size="sm" variant="outline">
            Billing
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent
        className={cn(
          "relative space-y-5 overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-125" : "max-h-48",
        )}
      >
        {/* Usage Details */}
        <div className="space-y-3 rounded-lg bg-muted/60 p-4">
          <div className="flex justify-between font-medium text-muted-foreground text-xs">
            <span>Included Credit</span>
            <span>On-Demand Charges</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>$18.08 / $20</span>
            <span>$0</span>
          </div>
          <Progress className="h-2" value={90} />
        </div>

        {/* Additional Usage Details */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Requests</span>
            <span className="text-muted-foreground">$210.84</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Active CPU</span>
            <span className="text-muted-foreground">$21.95</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Events</span>
            <span className="text-muted-foreground">$21.20</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Storage Usage</span>
            <span className="text-muted-foreground">$20.45</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Bandwidth</span>
            <span className="text-muted-foreground">$0.00</span>
          </div>
        </div>

        {/* Faded background effect for collapsed state */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-lg bg-linear-to-t from-background to-transparent transition-opacity duration-300",
            isOpen ? "opacity-0" : "opacity-100",
          )}
        />
      </CardContent>

      {/* Toggle button */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <Button
          className="rounded-full bg-background shadow-sm hover:bg-background"
          onClick={() => setIsOpen(!isOpen)}
          size="icon-sm"
          variant="outline"
        >
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-180",
            )}
          />
          <span className="sr-only">Toggle card</span>
        </Button>
      </div>
    </Card>
  );
}
