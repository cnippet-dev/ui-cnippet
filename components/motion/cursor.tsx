"use client";
import React, { useEffect, useState, useRef } from "react";
import {
    motion,
    SpringOptions,
    useMotionValue,
    useSpring,
    AnimatePresence,
    Transition,
    Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type CursorProps = {
    children: React.ReactNode;
    className?: string;
    springConfig?: SpringOptions;
    attachToParent?: boolean;
    transition?: Transition;
    variants?: {
        initial: Variant;
        animate: Variant;
        exit: Variant;
    };
    onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
    children,
    className,
    springConfig,
    attachToParent,
    variants,
    transition,
    onPositionChange,
}: CursorProps) {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(!attachToParent);

    useEffect(() => {
        if (typeof window !== "undefined") {
            cursorX.set(window.innerWidth / 2);
            cursorY.set(window.innerHeight / 2);
        }
    }, [cursorX, cursorY]);

    useEffect(() => {
        document.body.style.cursor = "auto";

        const updatePosition = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            onPositionChange?.(e.clientX, e.clientY);
        };

        document.addEventListener("mousemove", updatePosition);

        return () => {
            document.removeEventListener("mousemove", updatePosition);
        };
    }, [cursorX, cursorY, onPositionChange, attachToParent]);

    const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
    const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

    useEffect(() => {
        const handleVisibilityChange = (visible: boolean) => {
            setIsVisible(visible);
        };

        if (attachToParent && cursorRef.current) {
            const parent = cursorRef.current.parentElement;
            if (parent) {
                const handleMouseEnter = () => {
                    parent.style.cursor = "auto";
                    handleVisibilityChange(true);
                };
                const handleMouseLeave = () => {
                    parent.style.cursor = "auto";
                    handleVisibilityChange(false);
                };

                parent.addEventListener("mouseenter", handleMouseEnter);
                parent.addEventListener("mouseleave", handleMouseLeave);

                return () => {
                    parent.removeEventListener("mouseenter", handleMouseEnter);
                    parent.removeEventListener("mouseleave", handleMouseLeave);
                };
            }
        }
    }, [attachToParent]);

    return (
        <motion.div
            ref={cursorRef}
            className={cn("fixed top-0 left-0 z-50", className)}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                        transition={transition}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
