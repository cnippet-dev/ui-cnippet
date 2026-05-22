"use client";

import {
  Ban,
  ChevronLeft,
  ChevronRight,
  Command,
  IdCard,
  X,
} from "lucide-react";
import { motion, type Transition, type Variants } from "motion/react";
import * as React from "react";
import { SlidingNumber } from "@/registry/primitives/texts/sliding-number";

const TOTAL_PAGES = 10;

const BUTTON_MOTION_CONFIG = {
  initial: "rest",
  transition: { damping: 25, stiffness: 250, type: "spring" },
  variants: {
    hover: {
      maxWidth: "140px",
      transition: { damping: 35, delay: 0.15, stiffness: 200, type: "spring" },
    },
    rest: { maxWidth: "40px" },
    tap: { scale: 0.95 },
  },
  whileHover: "hover",
  whileTap: "tap",
} as const;

const LABEL_VARIANTS: Variants = {
  hover: { opacity: 1, visibility: "visible", x: 0 },
  rest: { opacity: 0, x: 4 },
  tap: { opacity: 1, visibility: "visible", x: 0 },
};

const LABEL_TRANSITION: Transition = {
  damping: 25,
  stiffness: 200,
  type: "spring",
};

function ManagementBar() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePrevPage = React.useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleNextPage = React.useCallback(() => {
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1);
  }, [currentPage]);

  return (
    <div className="@container/wrapper flex w-full justify-center">
      <div className="flex w-fit @xl/wrapper:flex-row flex-col items-center gap-y-2 rounded-2xl border border-border bg-background p-2 shadow-lg">
        <div className="mx-auto flex shrink-0 @lg/wrapper:flex-row flex-col items-center">
          <div className="flex h-10">
            <button
              className="p-1 text-muted-foreground transition-colors hover:text-foreground disabled:text-muted-foreground/30 disabled:hover:text-muted-foreground/30"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              <ChevronLeft size={20} />
            </button>
            <div className="mx-2 flex items-center space-x-1 text-sm tabular-nums">
              <SlidingNumber
                className="text-foreground"
                number={currentPage}
                padStart
              />
              <span className="text-muted-foreground">/ {TOTAL_PAGES}</span>
            </div>
            <button
              className="p-1 text-muted-foreground transition-colors hover:text-foreground disabled:text-muted-foreground/30 disabled:hover:text-muted-foreground/30"
              disabled={currentPage === TOTAL_PAGES}
              onClick={handleNextPage}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="mx-3 @lg/wrapper:block hidden h-6 w-px rounded-full bg-border" />

          <motion.div
            className="mx-auto flex flex-wrap space-x-2 sm:flex-nowrap"
            layout
            layoutRoot
          >
            <motion.button
              {...BUTTON_MOTION_CONFIG}
              aria-label="Blacklist"
              className="flex h-10 items-center space-x-2 overflow-hidden whitespace-nowrap rounded-lg bg-neutral-200/60 px-2.5 py-2 text-neutral-600 dark:bg-neutral-600/80 dark:text-neutral-200"
            >
              <Ban className="shrink-0" size={20} />
              <motion.span
                className="invisible text-sm"
                transition={LABEL_TRANSITION}
                variants={LABEL_VARIANTS}
              >
                Blacklist
              </motion.span>
            </motion.button>

            <motion.button
              {...BUTTON_MOTION_CONFIG}
              aria-label="Reject"
              className="flex h-10 items-center space-x-2 overflow-hidden whitespace-nowrap rounded-lg bg-red-200/60 px-2.5 py-2 text-red-600 dark:bg-red-800/80 dark:text-red-300"
            >
              <X className="shrink-0" size={20} />
              <motion.span
                className="invisible text-sm"
                transition={LABEL_TRANSITION}
                variants={LABEL_VARIANTS}
              >
                Reject
              </motion.span>
            </motion.button>

            <motion.button
              {...BUTTON_MOTION_CONFIG}
              aria-label="Hire"
              className="flex h-10 items-center space-x-2 overflow-hidden whitespace-nowrap rounded-lg bg-green-200/60 px-2.5 py-2 text-green-600 dark:bg-green-800/80 dark:text-green-300"
            >
              <IdCard className="shrink-0" size={20} />
              <motion.span
                className="invisible text-sm"
                transition={LABEL_TRANSITION}
                variants={LABEL_VARIANTS}
              >
                Hire
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        <div className="mx-3 @xl/wrapper:block hidden h-6 w-px rounded-full bg-border" />

        <motion.button
          className="flex h-10 @xl/wrapper:w-auto w-full cursor-pointer items-center justify-center rounded-lg bg-teal-500 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-teal-600 dark:bg-teal-600/80 dark:hover:bg-teal-800"
          whileTap={{ scale: 0.975 }}
        >
          <span className="mr-1 text-neutral-200">Move to:</span>
          <span>Interview I</span>
          <div className="mx-3 h-5 w-px rounded-full bg-white/40" />
          <div className="-mr-1 flex items-center gap-1 rounded-md bg-white/20 px-1.5 py-0.5">
            <Command size={14} />E
          </div>
        </motion.button>
      </div>
    </div>
  );
}

export { ManagementBar };
