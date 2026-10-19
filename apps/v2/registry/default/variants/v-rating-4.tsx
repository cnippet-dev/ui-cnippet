// title: Ten-point survey ratings
"use client";

import { useState } from "react";
import { Rating } from "@/registry/default/ui/rating";

const QUESTIONS = [
  "How easy was it to set up?",
  "How fast did support reply?",
  "How likely are you to renew?",
];

export default function Particle() {
  const [scores, setScores] = useState<number[]>([4, 0, 0]);
  const answered = scores.filter(Boolean).length;

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-medium text-sm">Quarterly check-in</p>
        <span className="text-muted-foreground text-xs tabular-nums">
          {answered} of {QUESTIONS.length} answered
        </span>
      </div>
      {QUESTIONS.map((question, i) => (
        <div className="flex flex-col gap-1.5" key={question}>
          <p className="text-sm" id={`q-${i}`}>
            {question}
          </p>
          <Rating
            aria-labelledby={`q-${i}`}
            max={10}
            onValueChange={(value) =>
              setScores((prev) => prev.map((s, j) => (j === i ? value : s)))
            }
            size="sm"
            value={scores[i]}
          />
        </div>
      ))}
    </div>
  );
}
