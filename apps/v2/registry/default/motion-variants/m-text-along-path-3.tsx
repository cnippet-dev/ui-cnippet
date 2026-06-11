"use client";
import { TextAlongPath } from "@/registry/default/motion/text-along-path";

export default function TextAlongPathCurve() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="h-36 w-72">
        <TextAlongPath
          animationType="auto"
          duration={5}
          path="M 10,80 C 30,10 70,10 90,80"
          pathClassName="stroke-muted-foreground/30"
          showPath={true}
          text="Follow the curve • animated path text • "
          textAnchor="start"
          textClassName="text-[5px] fill-foreground font-medium"
          viewBox="0 0 100 100"
        />
      </div>
    </div>
  );
}
