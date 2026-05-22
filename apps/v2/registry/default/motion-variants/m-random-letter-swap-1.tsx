"use client";

import { RandomLetterSwap } from "@/registry/default/motion/random-letter-swap";

const links = ["Home", "Work", "About", "Blog", "Contact"];

export default function RandomLetterSwapNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <RandomLetterSwap
            className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground"
            key={link}
            label={link}
            staggerDuration={0.025}
            transition={{ duration: 0.6, type: "spring" }}
          />
        ))}
      </nav>
    </div>
  );
}
