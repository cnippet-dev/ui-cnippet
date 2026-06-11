"use client";
import { TextAlongPath } from "@/registry/default/motion/text-along-path";

export default function TextAlongPathWave() {
  return (
    <div className="flex min-h-50 items-center justify-center px-4">
      <div className="w-full max-w-md">
        <TextAlongPath
          animationType="auto"
          duration={6}
          height="80px"
          path="M 0,50 Q 25,10 50,50 Q 75,90 100,50"
          showPath={false}
          text="Text flowing along a wave path • animated • "
          textClassName="text-[5.5px] fill-primary font-semibold"
          viewBox="0 0 100 100"
          width="100%"
        />
      </div>
    </div>
  );
}
