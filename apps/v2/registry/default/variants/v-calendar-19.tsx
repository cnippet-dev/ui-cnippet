"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();

export default function Particle() {
  const [selected, setSelected] = React.useState<Date | undefined>();

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {months.map((month) => (
          <div className="overflow-hidden rounded-lg border" key={month}>
            <Calendar
              className="[&_.rdp-nav]:hidden [&_table]:text-[10px] [&_td]:p-0 [&_th]:p-0 [&_th]:text-[9px]"
              defaultMonth={new Date(today.getFullYear(), month)}
              mode="single"
              onSelect={setSelected}
              selected={selected}
            />
          </div>
        ))}
      </div>
      {selected && (
        <p className="text-center text-muted-foreground text-sm">
          Selected:{" "}
          <span className="font-medium text-foreground">
            {selected.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </p>
      )}
    </div>
  );
}
