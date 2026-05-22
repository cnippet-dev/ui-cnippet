import { cn } from "@workspace/ui/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import type { motion } from "motion/react";
import type * as React from "react";
import {
  DisclosureButton as DisclosureButtonPrimitive,
  type DisclosureButtonProps as DisclosureButtonPrimitiveProps,
  DisclosurePanel as DisclosurePanelPrimitive,
  type DisclosurePanelProps as DisclosurePanelPrimitiveProps,
  Disclosure as DisclosurePrimitive,
  type DisclosureProps as DisclosurePrimitiveProps,
} from "@/registry/primitives/headless/disclosure";

type AccordionProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<TTag> & {
    children: React.ReactNode;
    as?: TTag;
  };

function Accordion<TTag extends React.ElementType = "div">({
  as: Component = "div",
  ...props
}: AccordionProps<TTag>) {
  return <Component data-slot="accordion" {...props} />;
}

type AccordionItemProps<TTag extends React.ElementType = "div"> =
  DisclosurePrimitiveProps<TTag>;

function AccordionItem<TTag extends React.ElementType = "div">({
  className,
  children,
  ...props
}: AccordionItemProps<TTag>) {
  return (
    <DisclosurePrimitive {...props}>
      {(bag) => (
        <div className={cn("border-b last:border-b-0", className)}>
          {typeof children === "function" ? children(bag) : children}
        </div>
      )}
    </DisclosurePrimitive>
  );
}

type AccordionButtonProps = DisclosureButtonPrimitiveProps & {
  showArrow?: boolean;
};

function AccordionButton({
  className,
  children,
  showArrow = true,
  ...props
}: AccordionButtonProps) {
  return (
    <DisclosureButtonPrimitive
      className={cn(
        "flex w-full flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {(bag) => (
        <>
          {typeof children === "function" ? children(bag) : children}
          {showArrow && (
            <ChevronDownIcon className="pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" />
          )}
        </>
      )}
    </DisclosureButtonPrimitive>
  );
}

type AccordionPanelProps<TTag extends React.ElementType = typeof motion.div> =
  DisclosurePanelPrimitiveProps<TTag>;

function AccordionPanel<TTag extends React.ElementType = typeof motion.div>({
  className,
  children,
  ...props
}: AccordionPanelProps<TTag>) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <DisclosurePanelPrimitive<any> {...props}>
      {(bag) => (
        <div className={cn("pt-0 pb-4 text-sm", className)}>
          {typeof children === "function" ? children(bag) : children}
        </div>
      )}
    </DisclosurePanelPrimitive>
  );
}

export {
  Accordion,
  AccordionButton,
  type AccordionButtonProps,
  AccordionItem,
  type AccordionItemProps,
  AccordionPanel,
  type AccordionPanelProps,
  type AccordionProps,
};
