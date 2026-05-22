"use client";

import { type InertiaOptions, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

type DragElementsProps = {
  children: React.ReactNode;
  dragElastic?:
    | number
    | { top?: number; left?: number; right?: number; bottom?: number }
    | boolean;
  dragConstraints?:
    | { top?: number; left?: number; right?: number; bottom?: number }
    | React.RefObject<Element | null>;
  dragMomentum?: boolean;
  dragTransition?: InertiaOptions;
  dragPropagation?: boolean;
  selectedOnTop?: boolean;
  className?: string;
};

const DragElements: React.FC<DragElementsProps> = ({
  children,
  dragElastic = 0.5,
  dragConstraints,
  dragMomentum = true,
  dragTransition = { bounceDamping: 300, bounceStiffness: 200 },
  dragPropagation = true,
  selectedOnTop = true,
  className,
}) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [zIndices, setZIndices] = useState<number[]>([]);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setZIndices(
      Array.from({ length: React.Children.count(children) }, (_, i) => i),
    );
  }, [children]);

  const bringToFront = (index: number) => {
    if (selectedOnTop) {
      setZIndices((prevIndices) => {
        const newIndices = [...prevIndices];
        const currentIndex = newIndices.indexOf(index);
        newIndices.splice(currentIndex, 1);
        newIndices.push(index);
        return newIndices;
      });
    }
  };

  return (
    <div className={`relative h-full w-full ${className}`} ref={constraintsRef}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          className={"absolute"}
          drag
          dragConstraints={dragConstraints || constraintsRef}
          dragElastic={dragElastic}
          dragMomentum={dragMomentum}
          dragPropagation={dragPropagation}
          dragTransition={dragTransition}
          key={index}
          onDragEnd={() => setIsDragging(false)}
          onDragStart={() => {
            bringToFront(index);
            setIsDragging(true);
          }}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            zIndex: zIndices.indexOf(index),
          }}
          whileDrag={{ cursor: "grabbing" }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default DragElements;
