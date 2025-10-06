"use client";
import { motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";

interface ShuffleBoxesProps {
    numBoxes?: number;
    colors?: string[];
    shuffleInterval?: number;
    gridColumns?: number;
    rowHeight?: number;
}

interface Box {
    id: string;
    colSpan: number;
    rowSpan: number;
    color: string;
    startCol: number;
}

export const GridShuffleBoxes = ({
    numBoxes = 8,
    colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"],
    shuffleInterval = 3000,
    gridColumns = 12,
    rowHeight = 100,
}: ShuffleBoxesProps) => {
    const [boxes, setBoxes] = useState<Box[]>([]);

    const generateLayout = useCallback(() => {
        const newBoxes: Box[] = [];
        let currentColumn = 1;
        let currentRow = 1;
        const maxRowSpan = 2;

        for (let i = 0; i < numBoxes; i++) {
            const colSpan = Math.floor(Math.random() * 3) + 2; // 2-4 columns
            const rowSpan = Math.floor(Math.random() * maxRowSpan) + 1; // 1-2 rows

            if (currentColumn + colSpan > gridColumns) {
                currentRow += rowSpan;
                currentColumn = 1;
            }

            newBoxes.push({
                id: `box-${i}`,
                colSpan,
                rowSpan,
                color: colors[Math.floor(Math.random() * colors.length)],
                startCol: currentColumn,
            });

            currentColumn += colSpan + 1; // +1 for gap

            // Force new row if next box won't fit
            if (currentColumn >= gridColumns - 3) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                currentRow += rowSpan;
                currentColumn = 1;
            }
        }

        return newBoxes;
    }, [numBoxes, colors, gridColumns]);

    useEffect(() => {
        setBoxes(generateLayout());
    }, [generateLayout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBoxes(generateLayout());
        }, shuffleInterval);

        return () => clearInterval(interval);
    }, [generateLayout, shuffleInterval]);

    return (
        <div
            className={`grid h-full w-full gap-0`}
            style={{
                gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
                // gridTemplateRows: `repeat(${gridColumns}, minmax(0, 1fr))`,

                gridAutoRows: `${rowHeight}px`,
            }}
        >
            {boxes.map((box) => (
                <motion.div
                    key={box.id}
                    layout
                    transition={{ type: "spring", stiffness: 30, damping: 15 }}
                    className="rounded bg-opacity-80 backdrop-blur-sm"
                    style={{
                        gridColumn: `${box.startCol} / span ${box.colSpan}`,
                        gridRow: `span ${box.rowSpan}`,
                        backgroundColor: box.color,
                    }}
                />
            ))}

            {/* Static text overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-center p-8">
                <h2 className="mb-4 text-5xl font-bold text-white drop-shadow-lg">
                    EMPOWER DIGITAL
                    <br />
                    CITIZENS OF THE FUTURE
                </h2>
                <p className="max-w-xl text-lg text-white drop-shadow-md">
                    Digital Literacy Hub creates the next generation of STEM
                    programs that empower students on their learning journey
                    through 21st century education and help them thrive.
                </p>
            </div>
        </div>
    );
};
