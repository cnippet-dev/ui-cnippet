"use client";

import { LetterSwapHover } from "@/registry/default/motion/letter-swap-hover";

const links = ["Home", "Work", "About", "Blog", "Contact"];

export default function LetterSwapHoverNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <LetterSwapHover
            className="cursor-pointer font-medium text-muted-foreground text-sm hover:text-foreground"
            key={link}
            label={link}
            staggerDuration={0.03}
            transition={{ duration: 0.5, type: "spring" }}
          />
        ))}
      </nav>
    </div>
  );
}
