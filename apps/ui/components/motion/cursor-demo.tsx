"use client";
import { useRef, useState } from "react";
import { Cursor } from "@/components/motion/cursor";
import { AnimatePresence, motion } from "motion/react";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

export default function Cursor1() {
    const [isHovering, setIsHovering] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);

    const handlePositionChange = (x: number, y: number) => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const isInside =
                x >= rect.left &&
                x <= rect.right &&
                y >= rect.top &&
                y <= rect.bottom;
            setIsHovering(isInside);
        }
    };

    return (
        <div className="flex h-[300px] w-full items-center justify-center z-999">
            <Cursor
                attachToParent
                variants={{
                    initial: { scale: 0.3, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.3, opacity: 0 },
                }}
                springConfig={{
                    bounce: 0.001,
                }}
                transition={{
                    ease: "easeInOut",
                    duration: 0.15,
                }}
                onPositionChange={handlePositionChange}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 80 : 16,
                        height: isHovering ? 32 : 16,
                    }}
                    className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
                >
                    <AnimatePresence>
                        {isHovering ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="inline-flex w-full items-center justify-center"
                            >
                                <div className="inline-flex items-center text-sm text-white dark:text-black">
                                    More <PlusIcon className="ml-1 h-4 w-4" />
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>
            </Cursor>
            <div ref={targetRef}>
                <Image
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg"
                    alt="Olympic logo Paris 2024"
                    width={1080}
                    height={680}
                    sizes="100vw"
                    className="h-52 w-full max-w-48 rounded-[8px] border border-zinc-100 object-cover dark:border-neutral-900"
                />
            </div>
        </div>
    );
}
