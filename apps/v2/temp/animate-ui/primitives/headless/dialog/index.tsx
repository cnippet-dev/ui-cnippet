"use client";

import {
  CloseButton,
  type CloseButtonProps,
  DialogBackdrop as DialogBackdropPrimitive,
  type DialogBackdropProps as DialogBackdropPrimitiveProps,
  Description as DialogDescriptionPrimitive,
  DialogPanel as DialogPanelPrimitive,
  type DialogPanelProps as DialogPanelPrimitiveProps,
  Dialog as DialogPrimitive,
  type DialogProps as DialogPrimitiveProps,
  DialogTitle as DialogTitlePrimitive,
  type DialogTitleProps as DialogTitlePrimitiveProps,
} from "@headlessui/react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
} from "motion/react";
import type * as React from "react";

type DialogProps<TTag extends React.ElementType = "div"> = Omit<
  DialogPrimitiveProps<TTag>,
  "static"
> & {
  className?: string;
  as?: TTag;
};

function Dialog<TTag extends React.ElementType = "div">({
  className,
  ...props
}: DialogProps<TTag>) {
  return (
    <AnimatePresence>
      {props?.open && (
        <DialogPrimitive
          className={className}
          data-slot="dialog"
          {...props}
          static
        />
      )}
    </AnimatePresence>
  );
}

type DialogBackdropProps<TTag extends React.ElementType = typeof motion.div> =
  Omit<DialogBackdropPrimitiveProps<TTag>, "transition"> &
    HTMLMotionProps<"div"> & {
      as?: TTag;
    };

function DialogBackdrop<TTag extends React.ElementType = typeof motion.div>(
  props: DialogBackdropProps<TTag>,
) {
  const {
    as = motion.div,
    transition = { duration: 0.2, ease: "easeInOut" },
    ...rest
  } = props;

  return (
    <DialogBackdropPrimitive
      animate={{ filter: "blur(0px)", opacity: 1, transition }}
      as={as as React.ElementType}
      data-slot="dialog-backdrop"
      exit={{ filter: "blur(4px)", opacity: 0, transition }}
      initial={{ filter: "blur(4px)", opacity: 0, transition }}
      key="dialog-backdrop"
      {...rest}
    />
  );
}

type DialogFlipDirection = "top" | "bottom" | "left" | "right";

type DialogPanelProps<TTag extends React.ElementType = typeof motion.div> =
  Omit<DialogPanelPrimitiveProps<TTag>, "transition"> &
    Omit<HTMLMotionProps<"div">, "children"> & {
      from?: DialogFlipDirection;
      transition?: Transition;
      as?: TTag;
    };

function DialogPanel<TTag extends React.ElementType = typeof motion.div>(
  props: DialogPanelProps<TTag>,
) {
  const {
    children,
    as = motion.div,
    from = "top",
    transition = { damping: 25, stiffness: 150, type: "spring" },
    ...rest
  } = props;

  const initialRotation =
    from === "bottom" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  return (
    <DialogPanelPrimitive
      animate={{
        filter: "blur(0px)",
        opacity: 1,
        transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
        transition,
      }}
      as={as as React.ElementType}
      data-slot="dialog-panel"
      exit={{
        filter: "blur(4px)",
        opacity: 0,
        transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        transition,
      }}
      initial={{
        filter: "blur(4px)",
        opacity: 0,
        transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        transition,
      }}
      key="dialog-panel"
      {...rest}
    >
      {(bag) => (
        <>{typeof children === "function" ? children(bag) : children}</>
      )}
    </DialogPanelPrimitive>
  );
}

type DialogCloseProps<TTag extends React.ElementType = "div"> =
  CloseButtonProps<TTag> & {
    as?: TTag;
  };

function DialogClose<TTag extends React.ElementType = "button">(
  props: DialogCloseProps<TTag>,
) {
  const { as = "button", ...rest } = props;

  return (
    <CloseButton
      as={as as React.ElementType}
      data-slot="dialog-close"
      {...rest}
    />
  );
}

type DialogHeaderProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<TTag> & {
    as?: TTag;
  };

function DialogHeader<TTag extends React.ElementType = "div">({
  as: Component = "div",
  ...props
}: DialogHeaderProps<TTag>) {
  return <Component data-slot="dialog-header" {...props} />;
}

type DialogFooterProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<TTag> & {
    as?: TTag;
  };

function DialogFooter({ as: Component = "div", ...props }: DialogFooterProps) {
  return <Component data-slot="dialog-footer" {...props} />;
}

type DialogTitleProps<TTag extends React.ElementType = "h2"> =
  DialogTitlePrimitiveProps<TTag> & {
    as?: TTag;
    className?: string;
  };

function DialogTitle<TTag extends React.ElementType = "h2">(
  props: DialogTitleProps<TTag>,
) {
  return <DialogTitlePrimitive data-slot="dialog-title" {...props} />;
}

type DialogDescriptionProps<TTag extends React.ElementType = "div"> =
  React.ComponentProps<typeof DialogDescriptionPrimitive<TTag>> & {
    as?: TTag;
    className?: string;
  };

function DialogDescription<TTag extends React.ElementType = "div">(
  props: DialogDescriptionProps<TTag>,
) {
  return (
    <DialogDescriptionPrimitive data-slot="dialog-description" {...props} />
  );
}

export {
  Dialog,
  DialogBackdrop,
  type DialogBackdropProps,
  DialogClose,
  type DialogCloseProps,
  DialogDescription,
  type DialogDescriptionProps,
  type DialogFlipDirection,
  DialogFooter,
  type DialogFooterProps,
  DialogHeader,
  type DialogHeaderProps,
  DialogPanel,
  type DialogPanelProps,
  type DialogProps,
  DialogTitle,
  type DialogTitleProps,
};
