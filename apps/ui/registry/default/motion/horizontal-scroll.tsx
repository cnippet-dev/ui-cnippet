"use client";
import { motion, useTransform, useScroll } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface HorizontalScrollProps {
    cards: {
        id: number;
        url: string;
        title: string;
    }[];
    className?: string;
}

interface CardProps {
    card: {
        id: number;
        url: string;
        title: string;
    };
}

export const HorizontalScroll = ({
    cards,
    className,
}: HorizontalScrollProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section
            ref={targetRef}
            className={twMerge("relative h-[300vh]", className)}
        >
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => (
                        <Card key={card.id} card={card} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ card }: CardProps) => {
    return (
        <div className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200">
            <Image
                src={card.url}
                alt={card.title}
                width={1920}
                height={1080}
                className="absolute inset-0 z-0 h-full w-full transition-transform duration-300 group-hover:scale-110 object-cover"
            />

            <div className="absolute inset-0 z-10 grid place-content-center">
                <p className="bg-linear-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
                    {card.title}
                </p>
            </div>
        </div>
    );
};
