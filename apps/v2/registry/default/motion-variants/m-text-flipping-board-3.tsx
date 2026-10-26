"use client";

import { useEffect, useState } from "react";
import { TextFlippingBoard } from "@/registry/default/motion/text-flipping-board";

const pad = (n: number) => String(n).padStart(2, "0");

export default function TextFlippingBoardCountdown() {
  const [seconds, setSeconds] = useState(2 * 3600 + 15 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const time = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 p-6">
      <p className="font-medium text-muted-foreground text-sm">Launch in</p>
      <TextFlippingBoard
        // Descending order: each tick is a single flip.
        charset="9876543210:"
        className="text-3xl sm:text-5xl"
        cols={8}
        flipDuration={0.12}
        text={time}
      />
    </div>
  );
}
