"use client";
import * as React from "react";
import {
    AnimatePresence,
    motion,
    MotionConfig,
    Transition,
    Variant,
    Variants,
} from "motion/react";
import { createContext, useContext, useState, useId, useEffect } from "react";
import { cn } from "@/lib/utils";

export type CollapsibleContextType = {
    open: boolean;
    toggle: () => void;
    variants?: { expanded: Variant; collapsed: Variant };
};

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(
    undefined,
);

export type CollapsibleProviderProps = {
    children: React.ReactNode;
    open: boolean;
    onOpenChange?: (open: boolean) => void;
    variants?: { expanded: Variant; collapsed: Variant };
};

function CollapsibleProvider({
    children,
    open: openProp,
    onOpenChange,
    variants,
}: CollapsibleProviderProps) {
    const [internalOpenValue, setInternalOpenValue] =
        useState<boolean>(openProp);

    useEffect(() => {
        setInternalOpenValue(openProp);
    }, [openProp]);

    const toggle = () => {
        const newOpen = !internalOpenValue;
        setInternalOpenValue(newOpen);
        if (onOpenChange) {
            onOpenChange(newOpen);
        }
    };

    return (
        <CollapsibleContext.Provider
            value={{
                open: internalOpenValue,
                toggle,
                variants,
            }}
        >
            {children}
        </CollapsibleContext.Provider>
    );
}

function useCollapsible() {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error(
            "useCollapsible must be used within a CollapsibleProvider",
        );
    }
    return context;
}

export type CollapsibleProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
    variants?: { expanded: Variant; collapsed: Variant };
    transition?: Transition;
};

export function Collapsible({
    open: openProp = false,
    onOpenChange,
    children,
    className,
    transition,
    variants,
}: CollapsibleProps) {
    return (
        <MotionConfig transition={transition}>
            <div className={className}>
                <CollapsibleProvider
                    open={openProp}
                    onOpenChange={onOpenChange}
                    variants={variants}
                >
                    {React.Children.toArray(children)[0]}
                    {React.Children.toArray(children)[1]}
                </CollapsibleProvider>
            </div>
        </MotionConfig>
    );
}

export function CollapsibleTrigger({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { toggle, open } = useCollapsible();

    return (
        <>
            {React.Children.map(children, (child) => {
                return React.isValidElement(child)
                    ? React.cloneElement(child, {
                          onClick: toggle,
                          role: "button",
                          "aria-expanded": open,
                          tabIndex: 0,
                          onKeyDown: (e: {
                              key: string;
                              preventDefault: () => void;
                          }) => {
                              if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  toggle();
                              }
                          },
                          className: cn(
                              className,
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (child as React.ReactElement<any>).props
                                  .className,
                          ),
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          ...(child as React.ReactElement<any>).props,
                      })
                    : child;
            })}
        </>
    );
}

export function CollapsibleContent({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { open, variants } = useCollapsible();
    const uniqueId = useId();

    const BASE_VARIANTS: Variants = {
        expanded: {
            height: "auto",
            opacity: 1,
        },
        collapsed: {
            height: 0,
            opacity: 0,
        },
    };

    const combinedVariants = {
        expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
        collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
    };

    return (
        <div className={cn("overflow-hidden", className)}>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={uniqueId}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        variants={combinedVariants}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// export default {
//     Collapsible,
//     CollapsibleProvider,
//     CollapsibleTrigger,
//     CollapsibleContent,
// };
