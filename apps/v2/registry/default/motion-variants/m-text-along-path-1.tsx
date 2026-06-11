"use client";
import { TextAlongPath } from "@/registry/default/motion/text-along-path";

export default function TextAlongPathCircle() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="size-44">
        <TextAlongPath
          animationType="auto"
          duration={8}
          path="M 50,10 A 40,40 0 1,1 49.99,10"
          text="cnippet ui • motion components • "
          textClassName="text-[5px] fill-foreground font-medium uppercase tracking-widest"
          viewBox="0 0 100 100"
        />
      </div>
    </div>
  );
}
