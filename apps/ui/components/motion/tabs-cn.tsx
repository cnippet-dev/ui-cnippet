"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
    isValidElement,
} from "react";

/*eslint-disable @typescript-eslint/no-explicit-any*/
interface TabContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
    wobbly: boolean;
    hover: boolean;
    defaultValue: string;
    prevIndex: number;
    setPrevIndex: (value: number) => void;
    tabsOrder: string[];
}
const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabs = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTabs must be used within a TabsProvider");
    }
    return context;
};

interface TabsProviderProps {
    children: ReactNode;
    defaultValue: string;
    wobbly?: boolean;
    hover?: boolean;
}

export const TabsProvider = ({
    children,
    defaultValue,
    wobbly = true,
    hover = false,
}: TabsProviderProps) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    const [prevIndex, setPrevIndex] = useState(0);
    const [tabsOrder, setTabsOrder] = useState<string[]>([]);
    useEffect(() => {
        const order: string[] = [];
        React.Children.toArray(children).forEach((child) => {
            if (isValidElement(child) && child.type === TabsContent) {
                const typedChild = child as React.ReactElement<{ value: string }>;
                order.push(typedChild.props.value);
            }
        });
        setTabsOrder(order);
    }, [children]);

    return (
        <TabContext.Provider
            value={{
                activeTab,
                setActiveTab,
                wobbly,
                hover,
                defaultValue,
                setPrevIndex,
                prevIndex,
                tabsOrder,
            }}
        >
            {children}
        </TabContext.Provider>
    );
};

export const TabsBtn = ({ children, className, value }: any) => {
    const {
        activeTab,
        setPrevIndex,
        setActiveTab,
        defaultValue,
        hover,
        wobbly,
        tabsOrder,
    } = useTabs();

    const handleClick = () => {
        setPrevIndex(tabsOrder.indexOf(activeTab));
        setActiveTab(value);
    };

    return (
        <>
            <>
                <motion.div
                    className={cn(
                        `relative cursor-pointer rounded-md p-1 px-2 sm:p-2 sm:px-4`,
                        className,
                    )}
                    onFocus={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        hover && handleClick();
                    }}
                    onMouseEnter={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        hover && handleClick();
                    }}
                    onClick={handleClick}
                >
                    {children}

                    {activeTab === value && (
                        <AnimatePresence mode="wait">
                            <motion.div
                                transition={{
                                    layout: {
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.2,
                                    },
                                }}
                                layoutId={defaultValue}
                                className="dark:bg-primary-base absolute top-0 left-0 z-[1] h-full w-full rounded-md bg-white"
                            />
                        </AnimatePresence>
                    )}

                    {wobbly ? (
                        <>
                            {activeTab === value && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        transition={{
                                            layout: {
                                                duration: 0.4,
                                                ease: "easeInOut",
                                                delay: 0.04,
                                            },
                                        }}
                                        layoutId={defaultValue}
                                        className="dark:bg-primary-base tab-shadow absolute top-0 left-0 z-[1] h-full w-full rounded-md bg-white"
                                    />
                                </AnimatePresence>
                            )}
                            {activeTab === value && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        transition={{
                                            layout: {
                                                duration: 0.4,
                                                ease: "easeOut",
                                                delay: 0.2,
                                            },
                                        }}
                                        layoutId={`${defaultValue}b`}
                                        className="dark:bg-primary-base tab-shadow absolute top-0 left-0 z-[1] h-full w-full rounded-md bg-white"
                                    />
                                </AnimatePresence>
                            )}
                        </>
                    ) : (
                        <></>
                    )}
                </motion.div>
            </>
        </>
    );
};

export const TabsContent = ({ children, className, value, yValue }: any) => {
    const { activeTab, tabsOrder, prevIndex } = useTabs();
    const isForward = tabsOrder.indexOf(activeTab) > prevIndex;
    return (
        <>
            <AnimatePresence mode="popLayout">
                {activeTab === value && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: yValue ? (isForward ? 10 : -10) : 0,
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                            opacity: 0,
                            y: yValue ? (isForward ? -50 : 50) : 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            delay: 0.5,
                        }}
                        className={cn(
                            "relative rounded-md p-2 px-4",
                            className,
                        )}
                    >
                        {activeTab === value ? children : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

/*eslint-enable @typescript-eslint/no-explicit-any*/
