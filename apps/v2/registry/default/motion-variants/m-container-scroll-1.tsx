"use client";

import { useRef } from "react";
import { ContainerScroll } from "@/registry/default/motion/container-scroll";

const bars = [40, 65, 52, 80, 58, 92, 74];

export default function ContainerScrollDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-4"
      ref={containerRef}
    >
      <div className="h-48" />
      <ContainerScroll
        containerRef={containerRef}
        header={
          <h3 className="font-bold text-3xl text-foreground tracking-tight">
            Your metrics, at a glance
          </h3>
        }
      >
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {["Revenue $48.2k", "Users 12,840", "Churn 1.8%"].map((stat) => (
            <div className="rounded-lg border p-3" key={stat}>
              <p className="text-muted-foreground text-xs">
                {stat.split(" ")[0]}
              </p>
              <p className="font-semibold text-foreground text-lg">
                {stat.split(" ")[1]}
              </p>
            </div>
          ))}
          <div className="flex h-32 items-end gap-2 rounded-lg border p-3 sm:col-span-3">
            {bars.map((h, i) => (
              <div
                className="flex-1 rounded-t bg-foreground/70"
                key={i}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </ContainerScroll>
      <div className="h-48" />
    </div>
  );
}
