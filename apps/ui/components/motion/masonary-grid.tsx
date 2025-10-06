// masonary-grid.tsx
"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export interface Item {
    id: number;
    url: string;
    title: string;
}

interface MasonryGridProps {
    children: React.ReactNode;
    className?: string;
}

export const    MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
    ({ children, className = "" }, ref) => (
        <div ref={ref} className={`container mx-auto p-4 ${className}`}>
            <div className="columns-2 gap-4 md:columns-3 2xl:columns-4">
                {children}
            </div>
        </div>
    ),
);

MasonryGrid.displayName = "MasonryGrid";

interface MasonryItemProps {
    item: Item;
    index: number;
    setSelected: (item: Item | null) => void;
    children?: React.ReactNode;
    className?: string;
}

export const MasonryItem = ({
    item,
    // index,
    setSelected,
    children,
    className = "",
}: MasonryItemProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.figure
            whileTap={{ scale: 0.9 }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            ref={ref}
            className={`group relative inline-block w-full cursor-pointer overflow-hidden rounded-md bg-white before:absolute before:top-0 before:h-full before:w-full before:from-gray-200/90 before:from-5% before:to-transparent before:to-90% before:content-[''] hover:before:bg-gradient-to-t dark:bg-black dark:before:from-gray-900 ${className}`}
            onClick={() => setSelected(item)}
        >
            <motion.img
                layoutId={`card-${item.id}`}
                whileHover={{ scale: 1.025 }}
                src={item.url}
                className="bg-base-100 image-full w-full cursor-pointer shadow-xl"
            />
            {children || (
                <div className="absolute bottom-0 left-0 mt-2 flex flex-wrap p-2 font-semibold opacity-0 group-hover:opacity-100">
                    <h1>{item.title}</h1>
                </div>
            )}
        </motion.figure>
    );
};
