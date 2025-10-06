"use client";
import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";

import { cn } from "@/lib/utils";

const _Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.3,
                },
            }}
            className={cn(
                "rounded-xl border dark:border-neutral-800 bg-card text-card-foreground shadow",
                className,
            )}
            {...props}
        />
    ),
);

_Card.displayName = "Card";

const _CardHeader = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => (
        <motion.div
            ref={ref}
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        />
    ),
);

_CardHeader.displayName = "CardHeader";

const _CardTitle = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => (
        <motion.div
            ref={ref}
            className={cn(
                "font-ins font-semibold leading-none tracking-tight",
                className,
            )}
            {...props}
        />
    ),
);

_CardTitle.displayName = "CardTitle";

const _CardDescription = React.forwardRef<
    HTMLDivElement,
    HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
    <motion.div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));

_CardDescription.displayName = "CardDescription";

const _CardContent = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => (
        <motion.div
            ref={ref}
            className={cn("p-6 pt-0", className)}
            {...props}
        />
    ),
);

_CardContent.displayName = "CardContent";

const _CardFooter = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
    ({ className, ...props }, ref) => (
        <motion.div
            ref={ref}
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        />
    ),
);

_CardFooter.displayName = "CardFooter";

const Card = motion.create(_Card);
const CardHeader = motion.create(_CardHeader);
const CardTitle = motion.create(_CardTitle);
const CardDescription = motion.create(_CardDescription);
const CardContent = motion.create(_CardContent);
const CardFooter = motion.create(_CardFooter);

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
