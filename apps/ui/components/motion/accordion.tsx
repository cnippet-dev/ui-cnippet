"use client";
import {
    motion,
    AnimatePresence,
    Transition,
    Variants,
    Variant,
    MotionConfig,
} from "motion/react";
import { cn } from "@/lib/utils";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

export type AccordionContextType = {
    expandedValue: React.Key | null;
    toggleItem: (value: React.Key) => void;
    variants?: { expanded: Variant; collapsed: Variant };
    iconVariant?: "normal" | "plus-minus";
};

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined,
);

function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error(
            "useAccordion must be used within an AccordionProvider",
        );
    }
    return context;
}

export type AccordionProviderProps = {
    children: ReactNode;
    variants?: { expanded: Variant; collapsed: Variant };
    expandedValue?: React.Key | null;
    onValueChange?: (value: React.Key | null) => void;
    iconVariant?: "normal" | "plus-minus";
};

function AccordionProvider({
    children,
    variants,
    expandedValue: externalExpandedValue,
    onValueChange,
    iconVariant,
}: AccordionProviderProps) {
    const [internalExpandedValue, setInternalExpandedValue] =
        useState<React.Key | null>(null);

    const expandedValue =
        externalExpandedValue !== undefined
            ? externalExpandedValue
            : internalExpandedValue;

    const toggleItem = (value: React.Key) => {
        const newValue = expandedValue === value ? null : value;
        if (onValueChange) {
            onValueChange(newValue);
        } else {
            setInternalExpandedValue(newValue);
        }
    };

    return (
        <AccordionContext.Provider
            value={{ expandedValue, toggleItem, variants, iconVariant }}
        >
            {children}
        </AccordionContext.Provider>
    );
}

export type AccordionProps = {
    children: ReactNode;
    className?: string;
    transition?: Transition;
    variants?: { expanded: Variant; collapsed: Variant };
    expandedValue?: React.Key | null;
    iconVariant?: "normal" | "plus-minus";
    onValueChange?: (value: React.Key | null) => void;
};

function Accordion({
    children,
    className,
    transition,
    variants,
    expandedValue,
    onValueChange,
    iconVariant,
}: AccordionProps) {
    return (
        <MotionConfig transition={transition}>
            <div
                className={cn("relative", className)}
                aria-orientation="vertical"
            >
                <AccordionProvider
                    variants={variants}
                    expandedValue={expandedValue}
                    onValueChange={onValueChange}
                    iconVariant={iconVariant}
                >
                    {children}
                </AccordionProvider>
            </div>
        </MotionConfig>
    );
}

export type AccordionItemProps = {
    value: React.Key;
    children: ReactNode;
    className?: string;
};

function AccordionItem({ value, children, className }: AccordionItemProps) {
    const { expandedValue } = useAccordion();
    const isExpanded = value === expandedValue;

    return (
        <div
            className={cn("overflow-hidden", className)}
            {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        ...(child.props as any),
                        value,
                        expanded: isExpanded,
                    });
                }
                return child;
            })}
        </div>
    );
}

export type AccordionTriggerProps = {
    children: ReactNode;
    className?: string;
};

function AccordionTrigger({
    children,
    className,
    ...props
}: AccordionTriggerProps) {
    const { toggleItem, expandedValue, iconVariant } = useAccordion();
    const value = (props as { value?: React.Key }).value;
    const isExpanded = value === expandedValue;

    return (
        <button
            onClick={() => value !== undefined && toggleItem(value)}
            aria-expanded={isExpanded}
            type="button"
            className={cn(
                "group flex w-full items-center justify-between",
                className,
            )}
            {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
        >
            {children}
            {iconVariant === "normal" && (
                <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 h-4 w-4 shrink-0"
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.span>
            )}
            {iconVariant === "plus-minus" && (
                <AnimatePresence mode="wait">
                    <motion.span
                        key={isExpanded ? "minus" : "plus"}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.5 }}
                        className="ml-2 h-4 w-4 shrink-0"
                    >
                        {isExpanded ? (
                            <Minus className="h-4 w-4" />
                        ) : (
                            <Plus className="h-4 w-4" />
                        )}
                    </motion.span>
                </AnimatePresence>
            )}
        </button>
    );
}
export type AccordionContentProps = {
    children: ReactNode;
    className?: string;
};

function AccordionContent({
    children,
    className,
    ...props
}: AccordionContentProps) {
    const { expandedValue, variants } = useAccordion();
    const value = (props as { value?: React.Key }).value;
    const isExpanded = value === expandedValue;

    const BASE_VARIANTS: Variants = {
        expanded: { height: "auto", opacity: 1 },
        collapsed: { height: 0, opacity: 0 },
    };

    const combinedVariants = {
        expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
        collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
    };

    return (
        <AnimatePresence initial={false}>
            {isExpanded && (
                <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={combinedVariants}
                    className={className}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
