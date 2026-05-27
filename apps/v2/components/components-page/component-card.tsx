"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";
import type { ComponentDef } from "./registry";

export function ComponentCard({ name, href, variants }: ComponentDef) {
  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Defer preview rendering to client — avoids SSR warnings from Base UI
  // primitives that emit internal <script> tags (e.g. Slider.Thumb).
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeKey = variants[selected]?.key;
  const Component = activeKey ? Index[activeKey]?.component : null;

  // tabs when ≤3 variants, dropdown otherwise
  const useDropdown = variants.length > 3;

  return (
    <motion.div
      className={`flex h-fit flex-col overflow-hidden rounded-xl border border-gray-950/8 bg-white dark:border-white/10 dark:bg-neutral-900 ${name === "Table" ? "col-span-8" : "col-span-4"}`}
      layout
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex min-h-10 flex-wrap items-center justify-between gap-2 border-gray-950/8 border-b px-4 py-2 dark:border-white/10">
        <Link
          className="font-mono text-gray-950/70 text-xs tracking-tight transition-colors hover:text-gray-950 dark:text-white/60 dark:hover:text-white"
          href={href}
        >
          {name}
        </Link>

        {variants.length > 1 &&
          (useDropdown ? (
            <select
              className="rounded-md border border-gray-950/10 bg-transparent px-2 py-0.5 font-mono text-gray-950/70 text-xs outline-none dark:border-white/10 dark:bg-neutral-900 dark:text-white/60"
              onChange={(e) => setSelected(Number(e.target.value))}
              value={selected}
            >
              {variants.map((v, i) => (
                <option key={v.key} value={i}>
                  {v.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex items-center gap-0.5 rounded-lg bg-gray-950/5 p-0.5 dark:bg-white/8">
              {variants.map((v, i) => (
                <button
                  className={cn(
                    "rounded-md px-2 py-0.5 font-mono text-[10px] tracking-tight transition-colors",
                    i === selected
                      ? "bg-white text-gray-950 shadow-xs dark:bg-neutral-700 dark:text-white"
                      : "text-gray-950/50 hover:text-gray-950/80 dark:text-white/40 dark:hover:text-white/70",
                  )}
                  key={v.key}
                  onClick={() => setSelected(i)}
                  type="button"
                >
                  {v.label}
                </button>
              ))}
            </div>
          ))}
      </div>

      {/* Preview — height animates via layout; content cross-fades via AnimatePresence */}
      <motion.div
        className="flex min-h-40 flex-1 items-start justify-center overflow-auto p-6"
        layout
      >
        {!mounted ? (
          <div className="h-8 w-24 animate-pulse rounded-md bg-gray-950/5 dark:bg-white/8" />
        ) : (
          <AnimatePresence initial={false} mode="wait">
            {Component ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                initial={{ opacity: 0, y: 6 }}
                key={activeKey}
                transition={{ duration: 0.18, ease: "easeInOut" }}
              >
                <Suspense
                  fallback={
                    <div className="h-8 w-24 animate-pulse rounded-md bg-gray-950/5 dark:bg-white/8" />
                  }
                >
                  <Component />
                </Suspense>
              </motion.div>
            ) : (
              <motion.p
                animate={{ opacity: 1 }}
                className="font-mono text-gray-950/30 text-xs dark:text-white/30"
                initial={{ opacity: 0 }}
                key="no-preview"
              >
                No preview available
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}
