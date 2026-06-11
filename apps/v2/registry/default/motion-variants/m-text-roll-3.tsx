"use client";

import { TextRoll } from "@/registry/default/motion/text-roll";

const links = ["Home", "About", "Work", "Blog", "Contact"];

export default function TextRollNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <nav className="flex items-center gap-6">
        {links.map((link, i) => (
          <a
            className="group cursor-pointer font-medium text-muted-foreground text-sm hover:text-foreground"
            href="#"
            key={link}
            onClick={(e) => e.preventDefault()}
          >
            <TextRoll
              className="block"
              duration={0.35}
              getEnterDelay={(j) => i * 0.05 + j * 0.025}
              transition={{ ease: "easeOut" }}
            >
              {link}
            </TextRoll>
          </a>
        ))}
      </nav>
    </div>
  );
}
