"use client";

import { useEffect, useState } from "react";
import { TextFlippingBoard } from "@/registry/default/motion/text-flipping-board";

const MESSAGES = [
  "SUMMER SALE 30% OFF",
  "FREE SHIPPING OVER $50",
  "NEW DROP FRIDAY",
];

export default function TextFlippingBoardAnnouncement() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-50 items-center justify-center p-6">
      <div className="flex w-full max-w-xl items-center justify-center overflow-hidden rounded-lg border bg-card px-3 py-2">
        <TextFlippingBoard
          className="text-[10px] sm:text-sm"
          cols={22}
          flipDuration={0.05}
          text={MESSAGES[index] ?? ""}
        />
      </div>
    </div>
  );
}
