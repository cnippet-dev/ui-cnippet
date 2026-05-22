"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface AnimatedSubscribeButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  subscribeStatus?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(({ subscribeStatus, onClick, className, children, ...props }, ref) => {
  const isControlled = subscribeStatus !== undefined; // controlled vs uncontrolled check
  const [isSubscribed, setIsSubscribed] = useState<boolean>(
    subscribeStatus ?? false,
  );

  useEffect(() => {
    if (isControlled) {
      setIsSubscribed(subscribeStatus!);
    }
  }, [subscribeStatus, isControlled]);

  if (
    React.Children.count(children) !== 2 ||
    !React.Children.toArray(children).every(
      (child) => React.isValidElement(child) && child.type === "span",
    )
  ) {
    throw new Error(
      "AnimatedSubscribeButton expects two children, both of which must be <span> elements.",
    );
  }

  const childrenArray = React.Children.toArray(children);
  const initialChild = childrenArray[0];
  const changeChild = childrenArray[1];

  return (
    <AnimatePresence mode="wait">
      {isSubscribed ? (
        <motion.button
          animate={{ opacity: 1 }}
          className={cn(
            "relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-primary-foreground",
            className,
          )}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!isControlled) {
              setIsSubscribed(false); // Only toggle manually if uncontrolled
            }
            onClick?.(e);
          }}
          ref={ref}
          {...props}
        >
          <motion.span
            animate={{ y: 0 }}
            className="relative flex h-full w-full items-center justify-center font-semibold"
            initial={{ y: -50 }}
            key="action"
          >
            {changeChild} {/* Use children for subscribed state */}
          </motion.span>
        </motion.button>
      ) : (
        <motion.button
          animate={{ opacity: 1 }}
          className={cn(
            "relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none bg-primary px-6 text-primary-foreground",
            className,
          )}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={(e) => {
            if (!isControlled) {
              setIsSubscribed(true); // Only toggle manually if uncontrolled
            }
            onClick?.(e);
          }}
          ref={ref}
          {...props}
        >
          <motion.span
            className="relative flex items-center justify-center font-semibold"
            exit={{ transition: { duration: 0.1 }, x: 50 }}
            initial={{ x: 0 }}
            key="reaction"
          >
            {initialChild} {/* Use children for unsubscribed state */}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
});

AnimatedSubscribeButton.displayName = "AnimatedSubscribeButton";
