// title: Reading progress bar
"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

const ARTICLE = [
  "Design tokens are the smallest decisions in a design system: a colour, a radius, a spacing step.",
  "Naming them by purpose, like --primary or --muted-foreground, lets a theme change without touching components.",
  "Start with a small set. Most products need fewer than a dozen colours once states are mapped to tokens.",
  "Keep raw values in one place and reference them everywhere else, including charts and illustrations.",
  "Dark mode then becomes a second set of values for the same names instead of a second stylesheet.",
  "Document each token with where it is used, so contributors pick the right one the first time.",
  "Review new tokens like code. Every addition is something the whole team has to maintain.",
  "Finally, test contrast for every foreground and background pair you actually ship.",
];

export function Pattern() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const el = document.getElementById("scroll-article");
    function onScroll() {
      if (!el) return;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const total = scrollHeight - clientHeight;
      setScroll(total > 0 ? (scrollTop / total) * 100 : 0);
    }
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg border">
      <Progress value={scroll}>
        <ProgressTrack className="h-1 rounded-none">
          <ProgressIndicator className="transition-none" />
        </ProgressTrack>
      </Progress>
      <div
        className="h-44 overflow-y-auto p-4 text-muted-foreground text-sm"
        id="scroll-article"
      >
        <p className="mb-2 font-semibold text-foreground">Reading Progress</p>
        {ARTICLE.map((paragraph) => (
          <p className="mb-3 leading-relaxed" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
