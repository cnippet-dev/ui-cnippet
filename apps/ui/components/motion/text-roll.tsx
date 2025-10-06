"use client";
import { motion, Transition } from "motion/react";

export type TextRollProps = {
    children: string;
    duration?: number;
    getEnterDelay?: (index: number) => number;
    getExitDelay?: (index: number) => number;
    className?: string;
    transition?: Transition;
    onAnimationComplete?: () => void;
};

export function TextRoll({
    children,
    duration = 0.5,
    getEnterDelay = (i) => i * 0.1,
    getExitDelay = (i) => i * 0.1 + 0.2,
    className,
    transition = { ease: "easeIn" },
    onAnimationComplete,
}: TextRollProps) {
    const letters = children.split("");

    return (
        <span className={className}>
            {letters.map((letter, i) => (
                <span
                    key={i}
                    className="relative inline-block [width:auto] [perspective:10000px] [transform-style:preserve-3d]"
                    aria-hidden="true"
                >
                    <motion.span
                        className="absolute inline-block [transform-origin:50%_25%] [backface-visibility:hidden]"
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: 90 }}
                        transition={{
                            ...transition,
                            duration,
                            delay: getEnterDelay(i),
                        }}
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                    <motion.span
                        className="absolute inline-block [transform-origin:50%_100%] [backface-visibility:hidden]"
                        initial={{ rotateX: 90 }}
                        animate={{ rotateX: 0 }}
                        transition={{
                            ...transition,
                            duration,
                            delay: getExitDelay(i),
                        }}
                        onAnimationComplete={
                            letters.length === i + 1
                                ? onAnimationComplete
                                : undefined
                        }
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                    <span className="invisible">
                        {letter === " " ? "\u00A0" : letter}
                    </span>
                </span>
            ))}
            <span className="sr-only">{children}</span>
        </span>
    );
}
