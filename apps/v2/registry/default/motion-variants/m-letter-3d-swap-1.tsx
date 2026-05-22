"use client";

import { Letter3DSwap } from "@/registry/default/motion/letter-3d-swap";

const links = ["Home", "Work", "About", "Blog", "Contact"];

export default function Letter3DSwapNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <Letter3DSwap
            as="a"
            frontFaceClassName="text-muted-foreground"
            key={link}
            mainClassName="cursor-pointer text-sm font-medium hover:text-foreground"
            rotateDirection="top"
            secondFaceClassName="text-foreground"
            staggerDuration={0.04}
            transition={{ damping: 28, stiffness: 320, type: "spring" }}
          >
            {link}
          </Letter3DSwap>
        ))}
      </nav>
    </div>
  );
}
