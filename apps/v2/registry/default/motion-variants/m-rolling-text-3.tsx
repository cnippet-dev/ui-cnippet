"use client";

import { RollingText } from "@/registry/default/motion/rolling-text";

const navItems = ["Products", "Pricing", "Docs", "Blog"];

export default function RollingTextNav() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-8 px-6">
      <nav className="flex items-center gap-8">
        {navItems.map((item, i) => (
          <a
            className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground"
            href="#"
            key={item}
            onClick={(e) => e.preventDefault()}
          >
            <RollingText
              delay={i * 0.07}
              direction="down"
              duration={0.45}
              staggerDuration={0.025}
              transition={{ ease: [0.23, 1, 0.32, 1] }}
            >
              {item}
            </RollingText>
          </a>
        ))}
      </nav>
      <p className="text-xs text-muted-foreground">
        direction="down" — letters roll in from above
      </p>
    </div>
  );
}
