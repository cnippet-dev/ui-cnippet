"use client";

import { useEffect, useState } from "react";
import { TextFlippingBoard } from "@/registry/default/motion/text-flipping-board";

const BOARDS = [
  [
    "FLT  DEST     TIME",
    "BA12 LONDON   0915",
    "LH44 BERLIN   0940",
    "AF31 PARIS    1005",
  ],
  [
    "FLT  DEST     TIME",
    "EK07 DUBAI    1030",
    "SQ21 SINGAPORE",
    "NH10 TOKYO    1120",
  ],
];

export default function TextFlippingBoardDepartures() {
  const [board, setBoard] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setBoard((b) => (b + 1) % BOARDS.length),
      7000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-80 items-center justify-center p-6">
      <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
        <p className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-widest">
          Departures
        </p>
        <TextFlippingBoard
          className="text-xs sm:text-base"
          cols={18}
          rows={4}
          text={BOARDS[board] ?? []}
        />
      </div>
    </div>
  );
}
