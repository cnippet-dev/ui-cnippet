"use client";
import { PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Cursor } from "@/components/motion/cursor";

export default function Cursor1() {
  const [isHovering, setIsHovering] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const handlePositionChange = (x: number, y: number) => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const isInside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
      setIsHovering(isInside);
    }
  };

  return (
    <div className="z-999 flex h-[300px] w-full items-center justify-center">
      <Cursor
        attachToParent
        onPositionChange={handlePositionChange}
        springConfig={{
          bounce: 0.001,
        }}
        transition={{
          duration: 0.15,
          ease: "easeInOut",
        }}
        variants={{
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.3 },
          initial: { opacity: 0, scale: 0.3 },
        }}
      >
        <motion.div
          animate={{
            height: isHovering ? 32 : 16,
            width: isHovering ? 80 : 16,
          }}
          className="flex items-center justify-center rounded-[24px] bg-gray-500/40 backdrop-blur-md dark:bg-gray-300/40"
        >
          <AnimatePresence>
            {isHovering ? (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex w-full items-center justify-center"
                exit={{ opacity: 0, scale: 0.6 }}
                initial={{ opacity: 0, scale: 0.6 }}
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
          alt="Olympic logo Paris 2024"
          className="h-52 w-full max-w-48 rounded-[8px] border border-zinc-100 object-cover dark:border-neutral-900"
          height={680}
          sizes="100vw"
          src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h1.jpg"
          width={1080}
        />
      </div>
    </div>
  );
}
