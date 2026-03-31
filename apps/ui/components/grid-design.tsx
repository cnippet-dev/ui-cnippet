"use client";

import { fadeIn } from "cnippet-aos";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export function BorderTopWithDots() {
  const pathname = usePathname();

  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 z-999 flex w-full overflow-visible"
      {...fadeIn({ duration: 0.25, scroll: true, y: 10 })}
    >
      <div
        className="absolute top-3.5 left-0 z-0 h-px w-full flex-auto overflow-hidden border-gray-200 border-t dark:border-neutral-800"
        data-border="true"
        data-framer-name="Top divider"
      />

      <div
        className={`absolute top-2 left-1/2 z-0 h-full w-full flex-auto -translate-x-1/2 overflow-visible ${pathname.startsWith("/ui") || pathname.startsWith("/docs") ? "container" : "max-w-6xl"}`}
        data-framer-name="Vertical lines"
      >
        <div
          className="absolute right-4 bottom-0 z-0 h-full w-px border-gray-200 border-r md:right-0 dark:border-neutral-700"
          data-border="true"
          data-framer-name="Right line"
        >
          <div
            className="dot-tr"
            data-border="true"
            data-framer-name="Ellipsis"
          />
        </div>
        <div
          className="absolute bottom-0 left-4 z-0 h-full w-px border-gray-200 border-r md:left-0 dark:border-neutral-700"
          data-border="true"
          data-framer-name="Left line"
        >
          <div
            className="dot-tl"
            data-border="true"
            data-framer-name="Ellipsis"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function BorderBottomWithDots() {
  const pathname = usePathname();

  return (
    <motion.div
      className="pointer-events-none absolute bottom-2 left-0 z-999 flex w-full overflow-visible"
      {...fadeIn({ duration: 0.25, scroll: true, y: 10 })}
    >
      <div
        className="absolute -bottom-2 left-0 z-0 h-px w-full flex-auto overflow-hidden border-gray-200 border-t dark:border-neutral-800"
        data-border="true"
        data-framer-name="Top divider"
      />

      <div
        className={`absolute top-0 left-1/2 z-0 h-full w-full flex-auto -translate-x-1/2 overflow-visible ${pathname.startsWith("/ui") || pathname.startsWith("/docs") ? "container" : "max-w-6xl"}`}
        data-framer-name="Vertical lines"
      >
        <div
          className="absolute right-4 bottom-0 z-0 h-full w-px border-gray-200 border-r md:right-0 dark:border-neutral-700"
          data-border="true"
          data-framer-name="Right line"
        >
          <div
            className="dot-tr"
            data-border="true"
            data-framer-name="Ellipsis"
          />
        </div>
        <div
          className="absolute bottom-0 left-4 z-0 h-full w-px border-gray-200 border-r md:left-0 dark:border-neutral-700"
          data-border="true"
          data-framer-name="Left line"
        >
          <div
            className="dot-tl"
            data-border="true"
            data-framer-name="Ellipsis"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function BorderX() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-2 left-0 z-999 flex w-full overflow-visible"
      {...fadeIn({ duration: 0.25, scroll: true, y: 10 })}
    >
      <div
        className="absolute top-2 left-1/2 z-0 h-full w-full max-w-6xl flex-auto -translate-x-1/2 overflow-visible"
        data-framer-name="Vertical lines"
      >
        <div
          className="absolute right-2 bottom-0 z-0 h-full w-px border-gray-200 border-r md:right-0 dark:border-neutral-700"
          data-border="true"
          data-framer-name="Right line"
        />
        <div
          className="absolute bottom-0 left-2 z-0 h-full w-px border-gray-200 border-r md:left-0 dark:border-neutral-700"
          data-border="true"
          data-framer-name="Left line"
        />
      </div>
    </motion.div>
  );
}
