//biome-ignore-all lint/style/noNonNullAssertion:<>

"use client";

import { addDays, format, isWeekend, startOfDay } from "date-fns";
import { PackageIcon, TruckIcon, ZapIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

type ShippingMethod = "standard" | "express";

const METHODS = [
  {
    description: "3–5 business days",
    icon: TruckIcon,
    id: "standard" as ShippingMethod,
    label: "Standard",
    minDays: 3,
    price: "Free",
  },
  {
    description: "1–2 business days",
    icon: ZapIcon,
    id: "express" as ShippingMethod,
    label: "Express",
    minDays: 1,
    price: "$9.99",
  },
];

function nextBusinessDay(from: Date, minDays: number): Date {
  let d = addDays(startOfDay(from), minDays);
  while (isWeekend(d)) d = addDays(d, 1);
  return d;
}

export default function Particle() {
  const today = new Date();
  const [method, setMethod] = useState<ShippingMethod>("standard");
  const [date, setDate] = useState<Date | undefined>();

  const selected = METHODS.find((m) => m.id === method)!;
  const earliest = nextBusinessDay(today, selected.minDays);
  const latest = nextBusinessDay(
    today,
    selected.minDays + (method === "standard" ? 2 : 1),
  );

  const handleMethodChange = (id: ShippingMethod) => {
    setMethod(id);
    setDate(undefined);
  };

  const deliveryStart = date ?? earliest;
  const deliveryEnd = date
    ? addDays(date, method === "standard" ? 2 : 1)
    : latest;

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <PackageIcon
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
        <h3 className="font-semibold text-sm">Choose Delivery</h3>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {METHODS.map((m) => (
          <button
            className={cn(
              "flex flex-col items-start rounded-lg border p-3 text-left transition-colors",
              method === m.id
                ? "border-primary bg-primary/5"
                : "border-input hover:bg-accent",
            )}
            key={m.id}
            onClick={() => handleMethodChange(m.id)}
            type="button"
          >
            <div className="flex w-full items-center justify-between">
              <m.icon
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
              <Badge variant={m.id === "express" ? "info" : "outline"}>
                {m.price}
              </Badge>
            </div>
            <p className="mt-2 font-medium text-sm">{m.label}</p>
            <p className="text-muted-foreground text-xs">{m.description}</p>
          </button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <PackageIcon aria-hidden="true" />
          {date
            ? `Deliver on ${format(date, "EEE, MMM dd")}`
            : `Earliest: ${format(earliest, "EEE, MMM dd")}`}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            disabled={[
              { before: earliest },
              { after: addDays(today, 30) },
              ...(method === "standard"
                ? [{ dayOfWeek: [0, 6] as (0 | 1 | 2 | 3 | 4 | 5 | 6)[] }]
                : []),
            ]}
            mode="single"
            onSelect={setDate}
            selected={date}
          />
        </PopoverPopup>
      </Popover>

      <p className="text-center text-muted-foreground text-xs">
        Estimated delivery:{" "}
        <span className="font-medium text-foreground">
          {format(deliveryStart, "EEE, MMM dd")} –{" "}
          {format(deliveryEnd, "EEE, MMM dd")}
        </span>
      </p>

      <Button className="w-full">Confirm Delivery</Button>
    </div>
  );
}
