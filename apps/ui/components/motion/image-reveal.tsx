"use client";

import { cn } from "@/lib/utils";
import { motion, useSpring } from "motion/react";
import React, {
    useState,
    MouseEvent,
    useRef,
    createContext,
    useContext,
} from "react";
import CldImageComponent from "../cld-image";

interface ImageItem {
    img: string;
    label: string;
}

interface ImageRevealContextType {
    setCurrentImage: (item: ImageItem | null) => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

const ImageRevealContext = createContext<ImageRevealContextType | null>(null);

export const ImageReveal = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [currentImage, setCurrentImage] = useState<ImageItem | null>(null);
    const [opacity, setOpacity] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const springConfig = {
        stiffness: 150,
        damping: 15,
        mass: 0.1,
    };

    const imagePosition = {
        x: useSpring(0, springConfig),
        y: useSpring(0, springConfig),
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const relativeX =
            e.clientX - containerRect.left - imageRef.current.offsetWidth / 2;
        const relativeY =
            e.clientY - containerRect.top - imageRef.current.offsetHeight / 2;

        imagePosition.x.set(relativeX);
        imagePosition.y.set(relativeY);
    };

    const contextValue = {
        setCurrentImage: (item: ImageItem | null) => {
            setCurrentImage(item);
            setOpacity(item ? 1 : 0);
        },
        containerRef,
    };

    return (
        <ImageRevealContext.Provider value={contextValue}>
            <section
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className={cn("relative mx-auto w-4/5 p-4", className)}
            >
                {children}

                <motion.div
                    className="pointer-events-none absolute top-0 left-0 h-[220px] w-[300px] rounded-lg object-cover"
                    style={{
                        x: imagePosition.x,
                        y: imagePosition.y,
                        opacity,
                        transition: "opacity 0.2s ease-in-out",
                    }}
                >
                    {currentImage && (
                        <CldImageComponent
                            src={currentImage.img}
                            alt={currentImage.label}
                            ref={imageRef as React.RefObject<HTMLImageElement>}
                            width={1920}
                            height={1080}
                            className="h-[220px] w-[300px] rounded-lg object-cover"
                        />
                    )}
                </motion.div>

                {/* <motion.img */}
                {/* <motion.img
                    ref={imageRef}
                    src={currentImage?.img || "null"}
                    alt={currentImage?.label || "null"}
                    className="pointer-events-none absolute top-0 left-0 h-[220px] w-[300px] rounded-lg object-cover"
                    style={{
                        x: imagePosition.x,
                        y: imagePosition.y,
                        opacity,
                        transition: "opacity 0.2s ease-in-out",
                    }}
                /> */}
            </section>
        </ImageRevealContext.Provider>
    );
};

export const ImageRevealItem = ({
    item,
    children,
    className,
}: {
    item: ImageItem;
    children: React.ReactNode;
    className?: string;
}) => {
    const context = useContext(ImageRevealContext);

    if (!context) {
        throw new Error("ImageRevealItem must be used within ImageReveal");
    }

    const handleHover = () => context.setCurrentImage(item);
    const handleLeave = () => context.setCurrentImage(null);

    return (
        <div
            onMouseEnter={handleHover}
            onMouseMove={handleHover}
            onMouseLeave={handleLeave}
            className={cn(
                "flex w-full cursor-pointer justify-between border-b py-5 text-center last:border-none",
                className,
            )}
        >
            {children}
        </div>
    );
};
