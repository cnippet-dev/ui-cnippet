import { Transition } from "motion/react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnimationOptions = {
    delay?: number;
    duration?: number;
    ease?: Transition["ease"];
    once?: boolean;
    amount?: number;
    type?: "spring" | "tween" | "inertia";
    stiffness?: number;
    damping?: number;
    mass?: number;
    bounce?: number;
    repeat?: number;
    repeatType?: "loop" | "reverse" | "mirror";
    scroll?: boolean;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
    filter?: string;
    [key: string]: any;
};

const baseTransition = (options?: AnimationOptions): Transition => ({
    delay: options?.delay || 0,
    duration: options?.duration || 0.6,
    ease: options?.ease || "easeOut",
    type: options?.type || "tween",
    stiffness: options?.stiffness || 100,
    damping: options?.damping || 10,
    mass: options?.mass || 1,
    bounce: options?.bounce || 0,
    repeat: options?.repeat || 0,
    repeatType: options?.repeatType || "loop",
});

const createMotionProps = (
    baseInitial: any,
    baseAnimate: any,
    options?: AnimationOptions
) => {
    const initial = {
        ...baseInitial,
        ...(options?.customInitial || {}),
        filter: options?.filter ? `blur(${options.filter}px)` : baseInitial.filter
    };

    const animate = {
        ...baseAnimate,
        ...(options?.customAnimate || {}),
        filter: options?.filter ? "blur(0px)" : baseAnimate.filter
    };

    const transition = baseTransition(options);

    if (options?.scroll) {
        return {
            initial: "hidden",
            whileInView: "visible",
            viewport: {
                once: options?.once ?? true,
                amount: options?.amount ?? 0.25
            },
            variants: {
                hidden: initial,
                visible: {
                    ...animate,
                    transition
                }
            }
        };
    }

    return {
        initial: "hidden",
        animate: "visible",
        variants: {
            hidden: initial,
            visible: {
                ...animate,
                transition
            }
        }
    };
};

// ============================================================================
// FADE ANIMATION
// ============================================================================

export const fadeIn = (options?: AnimationOptions) =>
    createMotionProps({ opacity: 0 }, { opacity: 1 }, options);

export const fadeUp = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, y: options?.y ?? 30 },
        { opacity: 1, y: 0 },
        options
    );

export const fadeDown = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, y: options?.y ?? -30 },
        { opacity: 1, y: 0 },
        options
    );

export const fadeLeft = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, x: options?.x ?? 30 },
        { opacity: 1, x: 0 },
        options
    );

export const fadeRight = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, x: options?.x ?? -30 },
        { opacity: 1, x: 0 },
        options
    );

// ============================================================================
// SLIDE ANIMATION
// ============================================================================

// ADD SLIDE UP|DOWN|LEFT|RIGHT

// ============================================================================
// ZOOM ANIMATION
// ============================================================================

export const zoomIn = (options?: AnimationOptions) =>
    createMotionProps(
        { scale: options?.scale ?? 0, opacity: 0 },
        { scale: 1, opacity: 1 },
        options
    );

export const zoomOut = (options?: AnimationOptions) =>
    createMotionProps(
        { scale: options?.scale ?? 1.2, opacity: 0 },
        { scale: 1, opacity: 1 },
        options
    );

// ADD ZOOM UP|DOWN|LEFT|RIGHT


// ============================================================================
// SCALE ANIMATION
// ============================================================================

export const scaleIn = (options?: AnimationOptions) =>
    createMotionProps(
        { scale: options?.scale ?? 0 },
        { scale: 1 },
        {
            ...options,
            type: "spring",
            bounce: 0.4
        }
    );

// ADD SCALE OUT|BOUNCE|ELASTIC


// ============================================================================
// ROTATE ANIMATION
// ============================================================================

export const rotateIn = (options?: AnimationOptions) =>
    createMotionProps(
        { rotate: options?.rotate ?? -45, opacity: 0 },
        { rotate: 0, opacity: 1 },
        options
    );

// ADD ROTATE OUT|SPIN|FLIP

// ============================================================================
// FADE W/ BLUR ANIMATION
// ============================================================================


export const fadeInBlur = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)" },
        options
    );

export const fadeUpBlur = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, y: options?.y ?? 30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        options
    );

export const fadeDownBlur = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, y: options?.y ?? -30, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)" },
        options
    );


export const fadeleftBlur = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, x: options?.x ?? 30, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)" },
        options
    );

export const fadeRightBlur = (options?: AnimationOptions) =>
    createMotionProps(
        { opacity: 0, x: options?.x ?? 30, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)" },
        options
    );










export const staggerContainer = (
    options?: AnimationOptions & { staggerChildren?: number }
) => ({
    variants: {
        visible: {
            transition: {
                staggerChildren: options?.staggerChildren || 0.1,
                ...baseTransition(options)
            }
        }
    }
});
/* eslint-enable @typescript-eslint/no-explicit-any */