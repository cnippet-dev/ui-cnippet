"use client";
import React from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

interface GridProps {
    children: React.ReactNode;
    className?: string;
}

export const Grid = ({ children, className }: GridProps) => {
    return (
        <div className={twMerge("py-12 md:px-4")}>
            <motion.div
                initial="initial"
                animate="animate"
                transition={{ staggerChildren: 0.05 }}
                className={twMerge(
                    "mx-auto grid grid-flow-dense grid-cols-12 gap-4",
                    className,
                )}
            >
                {children}
            </motion.div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Block = ({ className, ...rest }: any) => {
    return (
        <motion.div
            variants={{
                initial: { scale: 0.5, y: 50, opacity: 0 },
                animate: { scale: 1, y: 0, opacity: 1 },
            }}
            transition={{
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={twMerge("col-span-4 p-6", className)}
            {...rest}
        />
    );
};
