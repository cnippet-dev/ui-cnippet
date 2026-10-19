// title: Mini year view with all 12 months in a compact grid
"use client";

import * as React from "react";
import { Calendar } from "@/registry/default/ui/calendar";

const today = new Date();

export default function Particle() {
  const [selected, setSelected] = React.useState<Date | undefined>();

  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="@container flex w-full flex-col gap-3">
      <div className="grid @3xl:grid-cols-4 @md:grid-cols-3 grid-cols-2 gap-2">
        {months.map((month) => (
          <div
            className="flex justify-center overflow-hidden rounded-lg border"
            key={month}
          >
            <Calendar
              className="p-2 [--cell-size:--spacing(5)] sm:[--cell-size:--spacing(5)] [&_table]:text-[10px] [&_td]:p-0 [&_th]:p-0 [&_th]:text-[9px]"
              classNames={{ caption_label: "text-xs", month_caption: "mx-0" }}
              defaultMonth={new Date(today.getFullYear(), month)}
              hideNavigation
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
