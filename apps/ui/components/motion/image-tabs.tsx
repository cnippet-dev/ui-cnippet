"use client";
import React, { ReactNode, useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

// interface Tab {
//     id: string;
//     title: string;
//     description: string;
//     imageUrl: string;
// }

interface TabsContextType {
    activeTab: string;
    setActiveTab: (id: string) => void;
    isDesktop: boolean;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("Tabs components must be used within a TabsProvider");
    }
    return context;
};

export function TabsProvider({
    children,
    defaultValue,
    className,
}: {
    children: ReactNode;
    defaultValue: string;
    className?: string;
}) {
    const [activeTab, setActiveTab] = useState(defaultValue);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab, isDesktop }}>
            <div className={cn("h-full w-full", className)}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabList({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return <div className={cn("h-fit rounded-sm", className)}>{children}</div>;
}

export function TabItem({
    children,
    value,
    // index,
}: {
    children: ReactNode;
    value: string;
    // index: number;
}) {
    const { activeTab, setActiveTab } = useTabs();

    return (
        <motion.div
            className={`mb-2 overflow-hidden rounded-lg ${
                activeTab === value
                    ? "active border-2 border-[#F2F2F2] bg-[#F2F2F2] dark:border-[#656fe2] dark:bg-[#E0ECFB]"
                    : "border-2 bg-transparent dark:hover:border-[#656fe2]"
            }`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </motion.div>
    );
}

export function TabHeader({
    children,
    value,
}: {
    children: ReactNode;
    value: string;
}) {
    const { activeTab } = useTabs();
    return (
        <h3
            className={`flex cursor-pointer items-center justify-between p-4 font-semibold text-black transition-all hover:bg-[#F2F2F2] hover:text-black dark:text-white dark:hover:bg-[#1e2a78] dark:hover:text-white ${
                activeTab === value
                    ? "active bg-[#F2F2F2] dark:bg-[#1e2a78]"
                    : "bg-white dark:bg-[#11112b]"
            }`}
        >
            {children}
        </h3>
    );
}

export function TabDes({
    children,
    value,
}: {
    children: ReactNode;
    value: string;
}) {
    const { activeTab } = useTabs();
    return (
        <AnimatePresence mode="sync">
            {activeTab === value && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                        delay: 0.14,
                    }}
                >
                    <p className={`bg-[#F2F2F2] p-3 text-black dark:bg-white`}>
                        {children}
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function TabImageContainer({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("", className)}>
            <AnimatePresence mode="popLayout">{children}</AnimatePresence>
        </div>
    );
}

export function TabImage({
    children,
    value,
    // index,
}: {
    children: ReactNode;
    value: string;
    // index: number;
}) {
    const { activeTab, isDesktop } = useTabs();

    if (activeTab !== value || !isDesktop) return null;

    return (
        <motion.div className="h-[400px] overflow-hidden p-4">
            <motion.div
                initial={{ opacity: 0, overflow: "hidden" }}
                animate={{ opacity: 1, overflow: "hidden" }}
                exit={{ opacity: 0, overflow: "hidden" }}
                transition={{
                    duration: 0.4,
                    delay: 0.2,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
