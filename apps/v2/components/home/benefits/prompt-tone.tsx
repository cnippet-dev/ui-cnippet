"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const lines = [
  "import { Button } from '@cnippet/ui/button'",
  "import { Dialog } from '@cnippet/ui/dialog'",
  "import { DataTable } from '@cnippet/ui/data-table'",
  "// Fully typed with TypeScript",
  "// Tree-shakeable — only import what you need",
  "// Tailwind CSS v4 compatible",
  "// Dark mode out of the box",
];

export const PromptToneGraphic = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative overflow-clip">
      <div
        className="grid gap-2 overflow-clip font-mono text-muted-foreground text-xs"
        ref={ref}
      >
        {lines.map((line, index) => (
          <motion.div
            animate={{ opacity: isInView ? 1 : 0 }}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            key={line}
            transition={{ delay: index * 0.1, duration: 0.1, ease: "easeOut" }}
          >
            <p className="truncate">{line}</p>
          </motion.div>
        ))}
      </div>
      <div className="absolute right-0 bottom-0 left-0 h-20 bg-linear-to-t from-background to-transparent" />
      <div className="absolute top-0 right-0 bottom-0 w-20 bg-linear-to-l from-background to-transparent" />
    </div>
  );
};
