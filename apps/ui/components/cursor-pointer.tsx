import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Cursor } from "./motion/cursor";

interface TrackedElement {
  id: string;
  ref: React.RefObject<HTMLButtonElement | HTMLDivElement | null>;
  isHovering: boolean;
}

interface CursorPointerProps {
  targets: Array<{
    id: string;
    ref: React.RefObject<HTMLButtonElement | HTMLDivElement | null>;
  }>;
}

const CursorPointer = ({ targets }: CursorPointerProps) => {
  const [hoverStates, setHoverStates] = useState<Record<string, boolean>>({});

  const trackedElements: TrackedElement[] = targets.map(({ id, ref }) => ({
    id,
    isHovering: hoverStates[id] || false,
    ref,
  }));

  const handlePositionChange = useCallback(
    (x: number, y: number) => {
      const newHoverStates: Record<string, boolean> = {};

      trackedElements.forEach(({ id, ref }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isInside =
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom;
          newHoverStates[id] = isInside;
        } else {
          newHoverStates[id] = false;
        }
      });

      setHoverStates(newHoverStates);
    },
    [trackedElements],
  );

  const isAnyHovering = Object.values(hoverStates).some(Boolean);

  return (
    <Cursor
      attachToParent
      onPositionChange={handlePositionChange}
      springConfig={{
        bounce: 0.001,
      }}
      transition={{
        duration: 0.15,
        ease: "easeInOut",
      }}
      variants={{
        animate: { opacity: 1, scale: 0.5 },
        exit: { opacity: 0, scale: 0.3 },
        initial: { opacity: 0, scale: 0.3 },
      }}
    >
      <motion.div
        animate={{
          height: isAnyHovering ? 80 : 16,
          width: isAnyHovering ? 80 : 16,
        }}
        className={cn(
          "absolute -top-5 left-0 flex w-fit cursor-default items-center justify-center overflow-hidden rounded-full",
          isAnyHovering ? "bg-indigo-300/50" : "bg-indigo-500",
        )}
      >
        <AnimatePresence>
          {isAnyHovering ? (
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex w-full items-center justify-center"
              exit={{ opacity: 0, scale: 0.6 }}
              initial={{ opacity: 0, scale: 0.6 }}
            >
              <div className="inline-flex h-5 items-center rounded-full text-white text-xs dark:text-black" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Cursor>
  );
};

export default CursorPointer;
