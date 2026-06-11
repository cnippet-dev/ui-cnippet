"use client";

import { useState } from "react";
import { EncryptedText } from "@/registry/default/motion/encrypted-text";

const directions = ["ltr", "rtl", "center", "random"] as const;

export default function EncryptedTextDirections() {
  const [dir, setDir] = useState<(typeof directions)[number]>("ltr");
  const [key, setKey] = useState(0);

  const replay = (d: (typeof directions)[number]) => {
    setDir(d);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="flex h-12 items-center justify-center">
        <EncryptedText
          className="font-bold text-2xl text-foreground"
          key={key}
          maxIterations={14}
          revealDirection={dir}
          speed={45}
        >
          Cnippet Motion
        </EncryptedText>
      </div>
      <div className="flex gap-2">
        {directions.map((d) => (
          <button
            className={`rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${
              d === dir
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={d}
            onClick={() => replay(d)}
            type="button"
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}
