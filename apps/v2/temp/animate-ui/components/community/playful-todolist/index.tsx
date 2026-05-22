"use client";

import { Label } from "@workspace/ui/components/ui/label";
import { motion, type Transition } from "motion/react";
import * as React from "react";
import { Checkbox } from "@/registry/components/radix/checkbox";

const checkboxItems = [
  {
    defaultChecked: false,
    id: 1,
    label: "Code in Assembly 💾",
  },
  {
    defaultChecked: false,
    id: 2,
    label: "Present a bug as a feature 🪲",
  },
  {
    defaultChecked: false,
    id: 3,
    label: "Push to prod on a Friday 🚀",
  },
];

const getPathAnimate = (isChecked: boolean) => ({
  opacity: isChecked ? 1 : 0,
  pathLength: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
  opacity: {
    delay: isChecked ? 0 : 1,
    duration: 0.01,
  },
  pathLength: { duration: 1, ease: "easeInOut" },
});

function PlayfulTodolist() {
  const [checked, setChecked] = React.useState(
    checkboxItems.map((i) => !!i.defaultChecked),
  );

  return (
    <div className="space-y-6 rounded-2xl bg-neutral-100 p-6 dark:bg-neutral-900">
      {checkboxItems.map((item, idx) => (
        <div className="space-y-6" key={item.id}>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={checked[idx]}
              id={`checkbox-${item.id}`}
              onCheckedChange={(val) => {
                const updated = [...checked];
                updated[idx] = val === true;
                setChecked(updated);
              }}
              variant="accent"
            />
            <div className="relative inline-block">
              <Label htmlFor={`checkbox-${item.id}`}>{item.label}</Label>
              <motion.svg
                className="pointer-events-none absolute top-1/2 left-0 z-20 h-10 w-full -translate-y-1/2"
                height="32"
                viewBox="0 0 340 32"
                width="340"
              >
                <motion.path
                  animate={getPathAnimate(!!checked[idx])}
                  className="stroke-neutral-900 dark:stroke-neutral-100"
                  d="M 10 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36"
                  fill="none"
                  initial={false}
                  strokeLinecap="round"
                  strokeMiterlimit={10}
                  strokeWidth={2}
                  transition={getPathTransition(!!checked[idx])}
                  vectorEffect="non-scaling-stroke"
                />
              </motion.svg>
            </div>
          </div>
          {idx !== checkboxItems.length - 1 && (
            <div className="border-neutral-300 border-t dark:border-neutral-700" />
          )}
        </div>
      ))}
    </div>
  );
}

export { PlayfulTodolist };
