"use client";

import { cn } from "@workspace/ui/lib/utils";
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from "motion/react";
import * as React from "react";

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
};

function generateStars(count: number, starColor: string) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(", ");
}

function StarLayer({
  count = 1000,
  size = 1,
  transition = {
    duration: 50,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY,
  },
  starColor = "#fff",
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      className={cn("absolute top-0 left-0 h-[2000px] w-full", className)}
      data-slot="star-layer"
      transition={transition}
      {...props}
    >
      <div
        className="absolute rounded-full bg-transparent"
        style={{
          boxShadow: boxShadow,
          height: `${size}px`,
          width: `${size}px`,
        }}
      />
      <div
        className="absolute top-[2000px] rounded-full bg-transparent"
        style={{
          boxShadow: boxShadow,
          height: `${size}px`,
          width: `${size}px`,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
};

function StarsBackground({
  children,
  className,
  factor = 0.05,
  speed = 50,
  transition = { damping: 20, stiffness: 50 },
  starColor = "#fff",
  pointerEvents = true,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]",
        className,
      )}
      data-slot="stars-background"
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className={cn({ "pointer-events-none": !pointerEvents })}
        style={{ x: springX, y: springY }}
      >
        <StarLayer
          count={1000}
          size={1}
          starColor={starColor}
          transition={{
            duration: speed,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <StarLayer
          count={400}
          size={2}
          starColor={starColor}
          transition={{
            duration: speed * 2,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <StarLayer
          count={200}
          size={3}
          starColor={starColor}
          transition={{
            duration: speed * 3,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>
      {children}
    </div>
  );
}

export {
  StarLayer,
  type StarLayerProps,
  StarsBackground,
  type StarsBackgroundProps,
};
