import { cn } from "@/lib/utils";
import React, { JSX, useEffect, useState } from "react";

/*eslint-disable @typescript-eslint/no-explicit-any*/
function Blocks({
    activeDivs,
    divClass,
    classname,
    activeDivsClass,
    containerRef,
}: {
    activeDivsClass?: string;
    activeDivs?: any;
    divClass?: string;
    classname?: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const [blocks, setBlocks] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const updateBlocks = () => {
            const container = containerRef.current;
            if (container) {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const blockSize = containerWidth * 0.06; // Using 6% of section width for the block size

                const columns = Math.floor(containerWidth / blockSize);
                const rows = Math.floor(containerHeight / blockSize);

                const newBlocks = Array.from(
                    { length: columns },
                    (_, columnIndex) => (
                        <div key={columnIndex} className="h-full w-[6.5vw]">
                            {Array.from({ length: rows }, (_, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className={cn(
                                        `h-[6vh] w-full border-[1px] border-[#5dcece09] ${
                                            activeDivs[columnIndex]?.has(
                                                rowIndex,
                                            )
                                                ? `${activeDivsClass}`
                                                : ""
                                        }`,
                                        divClass,
                                    )}
                                    style={{ height: `${blockSize}px` }}
                                ></div>
                            ))}
                        </div>
                    ),
                );

                setBlocks(newBlocks);
            }
        };

        updateBlocks();
        window.addEventListener("resize", updateBlocks);

        return () => window.removeEventListener("resize", updateBlocks);
    }, [activeDivs, activeDivsClass, divClass, containerRef]);

    return (
        <div
            className={cn(
                "absolute -inset-0 top-0 left-0 flex h-full overflow-hidden",
                classname,
            )}
        >
            {blocks}
        </div>
    );
}

export default Blocks;

/*eslint-enable @typescript-eslint/no-explicit-any*/
