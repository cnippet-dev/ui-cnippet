import React, { useState, useCallback } from "react";
import { Cursor } from "./motion/cursor";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

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
        ref,
        isHovering: hoverStates[id] || false,
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
            variants={{
                initial: { scale: 0.3, opacity: 0 },
                animate: { scale: 0.5, opacity: 1 },
                exit: { scale: 0.3, opacity: 0 },
            }}
            springConfig={{
                bounce: 0.001,
            }}
            transition={{
                ease: "easeInOut",
                duration: 0.15,
            }}
            onPositionChange={handlePositionChange}
        >
            <motion.div
                animate={{
                    width: isAnyHovering ? 80 : 16,
                    height: isAnyHovering ? 80 : 16,
                }}
                className={cn(
                    "absolute -top-5 left-0 flex w-fit cursor-default items-center justify-center overflow-hidden rounded-full",
                    isAnyHovering ? "bg-indigo-300/50" : "bg-indigo-500",
                )}
            >
                <AnimatePresence>
                    {isAnyHovering ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="inline-flex w-full items-center justify-center"
                        >
                            <div className="inline-flex h-5 items-center rounded-full text-xs text-white dark:text-black"></div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </motion.div>
        </Cursor>
    );
};

export default CursorPointer;
