"use client";

import {
  DisclosureButton as DisclosureButtonPrimitive,
  type DisclosureButtonProps as DisclosureButtonPrimitiveProps,
  DisclosurePanel as DisclosurePanelPrimitive,
  type DisclosurePanelProps as DisclosurePanelPrimitiveProps,
  Disclosure as DisclosurePrimitive,
  type DisclosureProps as DisclosurePrimitiveProps,
} from "@headlessui/react";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";

import { getStrictContext } from "@/registry/lib/get-strict-context";

type DisclosureContextType = {
  isOpen: boolean;
};

const [DisclosureProvider, useDisclosure] =
  getStrictContext<DisclosureContextType>("DisclosureContext");

type DisclosureProps<TTag extends React.ElementType = "div"> =
  DisclosurePrimitiveProps<TTag> & {
    as?: TTag;
    className?: string;
  };

function Disclosure<TTag extends React.ElementType = "div">({
  children,
  ...props
}: DisclosureProps<TTag>) {
  return (
    <DisclosurePrimitive data-slot="disclosure" {...props}>
      {(bag) => (
        <DisclosureProvider value={{ isOpen: bag.open }}>
          {typeof children === "function" ? children(bag) : children}
        </DisclosureProvider>
      )}
    </DisclosurePrimitive>
  );
}

type DisclosureButtonProps<TTag extends React.ElementType = "button"> =
  DisclosureButtonPrimitiveProps<TTag> & {
    as?: TTag;
  };

function DisclosureButton<TTag extends React.ElementType = "button">(
  props: DisclosureButtonProps<TTag>,
) {
  return <DisclosureButtonPrimitive data-slot="disclosure-button" {...props} />;
}

type DisclosurePanelProps<TTag extends React.ElementType = typeof motion.div> =
  Pick<DisclosurePanelPrimitiveProps<TTag>, "static" | "unmount" | "children"> &
    Omit<HTMLMotionProps<"div">, "children"> & {
      as?: TTag;
      keepRendered?: boolean;
    };

function DisclosurePanel<TTag extends React.ElementType = typeof motion.div>(
  props: DisclosurePanelProps<TTag>,
) {
  const {
    children,
    transition = { duration: 0.35, ease: "easeInOut" },
    as = motion.div,
    unmount,
    keepRendered = false,
    ...rest
  } = props;
  const { isOpen } = useDisclosure();

  return (
    <AnimatePresence>
      {keepRendered ? (
        <DisclosurePanelPrimitive
          as={as as React.ElementType}
          static
          unmount={unmount}
        >
          {(bag) => (
            <motion.div
              animate={
                isOpen
                  ? { "--mask-stop": "100%", height: "auto", opacity: 1, y: 0 }
                  : { "--mask-stop": "0%", height: 0, opacity: 0, y: 20 }
              }
              data-slot="disclosure-panel"
              initial={{ "--mask-stop": "0%", height: 0, opacity: 0, y: 20 }}
              key="disclosure-panel"
              style={{
                maskImage:
                  "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
                overflow: "hidden",
                WebkitMaskImage:
                  "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
              }}
              transition={transition}
              {...rest}
            >
              {typeof children === "function" ? children(bag) : children}
            </motion.div>
          )}
        </DisclosurePanelPrimitive>
      ) : (
        isOpen && (
          <DisclosurePanelPrimitive
            as={as as React.ElementType}
            static
            unmount={unmount}
          >
            {(bag) => (
              <motion.div
                animate={{
                  "--mask-stop": "100%",
                  height: "auto",
                  opacity: 1,
                  y: 0,
                }}
                data-slot="disclosure-panel"
                exit={{ "--mask-stop": "0%", height: 0, opacity: 0, y: 20 }}
                initial={{ "--mask-stop": "0%", height: 0, opacity: 0, y: 20 }}
                key="disclosure-panel"
                style={{
                  maskImage:
                    "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
                  overflow: "hidden",
                  WebkitMaskImage:
                    "linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
                }}
                transition={transition}
                {...rest}
              >
                {typeof children === "function" ? children(bag) : children}
              </motion.div>
            )}
          </DisclosurePanelPrimitive>
        )
      )}
    </AnimatePresence>
  );
}

export {
  Disclosure,
  DisclosureButton,
  type DisclosureButtonProps,
  DisclosurePanel,
  type DisclosurePanelProps,
  type DisclosureProps,
  useDisclosure,
};
