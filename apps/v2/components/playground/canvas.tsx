"use client";

import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import {
  getCatalogEntry,
  getCategoryFromRegistryId,
} from "@/lib/playground/registry-catalog";
import { usePropsStore } from "@/lib/playground/store";
import { Index } from "@/registry/__index__";

export function InspectCanvas({
  variantKey,
  previewWidth,
  isPlaceholder,
  mode,
}: {
  variantKey: string;
  previewWidth?: string;
  isPlaceholder?: boolean;
  mode: "preview" | "customize";
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const propsMap = usePropsStore((s) => s.propsMap);
  const category = variantKey ? getCategoryFromRegistryId(variantKey) : "";
  const entry =
    mode === "customize" && variantKey && !isPlaceholder
      ? getCatalogEntry(variantKey)
      : undefined;
  const overrides = propsMap[category] ?? {};

  const Component =
    !isPlaceholder && variantKey ? Index[variantKey]?.component : null;

  return (
    <div className="flex flex-1 items-center justify-center overflow-auto p-8">
      <div
        className="flex w-full justify-center transition-all duration-300"
        style={previewWidth ? { maxWidth: previewWidth } : undefined}
      >
        {!mounted ? (
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-950/5 dark:bg-white/8" />
        ) : (
          <AnimatePresence initial={false} mode="wait">
            {mode === "customize" && variantKey && !isPlaceholder ? (
              entry ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  initial={{ opacity: 0, y: 6 }}
                  key={`customize-${category}`}
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                >
                  <entry.LiveRenderer props={overrides} />
                </motion.div>
              ) : (
                <motion.p
                  animate={{ opacity: 1 }}
                  className="font-mono text-gray-950/30 text-xs dark:text-white/30"
                  initial={{ opacity: 0 }}
                  key="no-catalog"
                >
                  No prop controls available for this component
                </motion.p>
              )
            ) : Component ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                initial={{ opacity: 0, y: 6 }}
                key={variantKey}
                transition={{ duration: 0.18, ease: "easeInOut" }}
              >
                <Suspense
                  fallback={
                    <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-950/5 dark:bg-white/8" />
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
                key="empty"
              >
                {isPlaceholder
                  ? "Component not yet available"
                  : "Select a component from the sidebar"}
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
