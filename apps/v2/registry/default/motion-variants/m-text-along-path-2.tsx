"use client";
import { TextAlongPath } from "@/registry/default/motion/text-along-path";

export default function TextAlongPathWave() {
  return (
    <div className="flex min-h-50 items-center justify-center px-4">
      <div className="w-full max-w-md">
        <TextAlongPath
          path="M 0,50 Q 25,10 50,50 Q 75,90 100,50"
          text="Text flowing along a wave path • animated • "
          viewBox="0 0 100 100"
          width="100%"
          height="80px"
          animationType="auto"
          duration={6}
          textClassName="text-[5.5px] fill-primary font-semibold"
          showPath={false}
        />
      </div>
    </div>
  );
}
