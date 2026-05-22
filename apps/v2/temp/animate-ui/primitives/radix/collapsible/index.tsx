"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type CollapsibleContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const [CollapsibleProvider, useCollapsible] =
  getStrictContext<CollapsibleContextType>("CollapsibleContext");

type CollapsibleProps = React.ComponentProps<typeof CollapsiblePrimitive.Root>;

function Collapsible(props: CollapsibleProps) {
  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
    value: props?.open,
  });

  return (
    <CollapsibleProvider value={{ isOpen, setIsOpen }}>
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        {...props}
        onOpenChange={setIsOpen}
      />
    </CollapsibleProvider>
  );
}

type CollapsibleTriggerProps = React.ComponentProps<
  typeof CollapsiblePrimitive.Trigger
>;

function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  );
}

type CollapsibleContentProps = Omit<
  React.ComponentProps<typeof CollapsiblePrimitive.Content>,
  "asChild" | "forceMount"
> &
  HTMLMotionProps<"div"> & {
    keepRendered?: boolean;
  };

function CollapsibleContent({
  keepRendered = false,
  transition = { duration: 0.35, ease: "easeInOut" },
  ...props
}: CollapsibleContentProps) {
  const { isOpen } = useCollapsible();

  return (
    <AnimatePresence>
      {keepRendered ? (
        <CollapsiblePrimitive.Content asChild forceMount>
          <motion.div
            animate={
              isOpen
                ? { height: "auto", opacity: 1, overflow: "hidden", y: 0 }
                : { height: 0, opacity: 0, overflow: "hidden", y: 20 }
            }
            data-slot="collapsible-content"
            initial={{ height: 0, opacity: 0, overflow: "hidden", y: 20 }}
            key="collapsible-content"
            layout
            transition={transition}
            {...props}
          />
        </CollapsiblePrimitive.Content>
      ) : (
        isOpen && (
          <CollapsiblePrimitive.Content asChild forceMount>
            <motion.div
              animate={{ height: "auto", opacity: 1, overflow: "hidden", y: 0 }}
              data-slot="collapsible-content"
              exit={{ height: 0, opacity: 0, overflow: "hidden", y: 20 }}
              initial={{ height: 0, opacity: 0, overflow: "hidden", y: 20 }}
              key="collapsible-content"
              layout
              transition={transition}
              {...props}
            />
          </CollapsiblePrimitive.Content>
        )
      )}
    </AnimatePresence>
  );
}

export {
  Collapsible,
  CollapsibleContent,
  type CollapsibleContentProps,
  type CollapsibleContextType,
  type CollapsibleProps,
  CollapsibleTrigger,
  type CollapsibleTriggerProps,
  useCollapsible,
};
