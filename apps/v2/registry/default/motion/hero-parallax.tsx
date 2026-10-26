"use client";

import {
  type MotionValue,
  motion,
  type SpringOptions,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { type ReactNode, type RefObject, useRef } from "react";
import { cn } from "@/lib/utils";

export type HeroParallaxProduct = {
  title: string;
  link: string;
  thumbnail: string;
};

export type HeroParallaxProps = {
  products: HeroParallaxProduct[];
  rows?: number;
  /** Horizontal travel in px per row, multiplied by `rowSpeeds`. */
  distance?: number;
  /** Speed multiplier per row for a layered, multi-depth feel. */
  rowSpeeds?: number[];
  /** Header content shown above the rows. */
  children?: ReactNode;
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
  cardClassName?: string;
};

const SPRING: SpringOptions = { bounce: 0, damping: 30, stiffness: 300 };

function ProductCard({
  product,
  x,
  still,
  className,
}: {
  product: HeroParallaxProduct;
  x: MotionValue<number>;
  still: boolean;
  className?: string;
}) {
  return (
    <motion.a
      className={cn(
        "group/product relative block h-40 w-60 shrink-0 overflow-hidden rounded-xl border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring md:h-56 md:w-80",
        className,
      )}
      href={product.link}
      style={still ? undefined : { x }}
      whileHover={still ? undefined : { y: -8 }}
    >
      <img
        alt={product.title}
        className="size-full object-cover"
        height={224}
        loading="lazy"
        src={product.thumbnail}
        width={320}
      />
      <span className="absolute inset-0 bg-black/0 transition-colors group-hover/product:bg-black/50" />
      <span className="absolute bottom-3 left-3 font-medium text-sm text-white opacity-0 transition-opacity group-hover/product:opacity-100 group-focus-visible/product:opacity-100">
        {product.title}
      </span>
    </motion.a>
  );
}

function Row({
  products,
  progress,
  travel,
  cardClassName,
  still,
}: {
  products: HeroParallaxProduct[];
  progress: MotionValue<number>;
  travel: number;
  cardClassName?: string;
  still: boolean;
}) {
  const x = useSpring(useTransform(progress, [0, 1], [0, travel]), SPRING);
  return (
    <div className={cn("flex gap-6", travel > 0 && "flex-row-reverse")}>
      {products.map((product) => (
        <ProductCard
          className={cardClassName}
          key={product.title}
          product={product}
          still={still}
          x={x}
        />
      ))}
    </div>
  );
}

export function HeroParallax({
  products,
  rows = 3,
  distance = 600,
  rowSpeeds,
  children,
  containerRef,
  className,
  cardClassName,
}: HeroParallaxProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end start"],
    target: ref,
  });

  const tilt = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    SPRING,
  );
  const turn = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    SPRING,
  );
  const fade = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    SPRING,
  );
  const lift = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-200, 40]),
    SPRING,
  );

  const perRow = Math.ceil(products.length / rows);
  const productRows = Array.from({ length: rows }, (_, r) =>
    products.slice(r * perRow, (r + 1) * perRow),
  );

  return (
    <div
      className={cn(
        "perspective-[1000px] transform-3d relative flex flex-col overflow-hidden py-20",
        className,
      )}
      ref={ref}
    >
      {children ? (
        <div className="relative z-10 mb-16 px-4">{children}</div>
      ) : null}
      <motion.div
        className="flex flex-col gap-6"
        style={
          reduceMotion
            ? undefined
            : { opacity: fade, rotateX: tilt, rotateZ: turn, y: lift }
        }
      >
        {productRows.map((row, r) => (
          <Row
            cardClassName={cardClassName}
            key={r}
            products={row}
            progress={scrollYProgress}
            still={reduceMotion}
            travel={(r % 2 === 0 ? 1 : -1) * distance * (rowSpeeds?.[r] ?? 1)}
          />
        ))}
      </motion.div>
    </div>
  );
}
