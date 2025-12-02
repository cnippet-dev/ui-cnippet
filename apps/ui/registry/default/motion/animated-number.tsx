"use client";
import { cn } from "@/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "motion/react";
import { useEffect, ElementType } from "react";

export type AnimatedNumberProps = {
    value: number;
    className?: string;
    springOptions?: SpringOptions;
    as?: ElementType;
};

export function AnimatedNumber({
    value,
    className,
    springOptions,
    as = "span",
}: AnimatedNumberProps) {
    const spring = useSpring(value, springOptions);
    const display = useTransform(spring, (current) =>
        Math.round(current).toLocaleString(),
    );

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    // Cast to 'any' to avoid TypeScript issues with dynamic tag names
    const Component = motion[as as keyof typeof motion] || motion.span;

    return (
        <Component className={cn("tabular-nums", className)}>
            {display}
        </Component>
    );
}