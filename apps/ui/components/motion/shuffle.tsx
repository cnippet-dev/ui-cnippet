// components/ui/shuffle.tsx
"use client";

import { motion } from "motion/react";
import { JSX, useEffect, useRef, useState, useCallback } from "react";

export type SquareData = {
    id: number | string;
    src: string;
};

interface ShuffleGridProps {
    squareData: SquareData[];
    interval?: number;
    gridClasses?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = (array: any[]) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

export const ShuffleGrid = ({
    squareData,
    interval = 3000,
    gridClasses = "grid grid-cols-4 grid-rows-4 h-[450px] gap-1",
}: ShuffleGridProps) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [squares, setSquares] = useState<JSX.Element[]>([]);

    const generateSquares = useCallback(() => {
        return shuffle([...squareData]).map((sq) => (
            <motion.div
                key={sq.id}
                layout
                transition={{ duration: 1.5, type: "spring" }}
                className="h-full w-full"
                style={{
                    backgroundImage: `url(${sq.src})`,
                    backgroundSize: "cover",
                }}
            ></motion.div>
        ));
    }, [squareData]);

    useEffect(() => {
        setSquares(generateSquares());
    }, [generateSquares]);

    useEffect(() => {
        const shuffleSquares = () => {
            setSquares(generateSquares());
            timeoutRef.current = setTimeout(shuffleSquares, interval);
        };

        shuffleSquares();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [generateSquares, interval]);

    return <div className={gridClasses}>{squares}</div>;
};
