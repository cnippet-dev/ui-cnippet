import { type UseInViewOptions, useInView } from "motion/react";
import * as React from "react";

interface UseIsInViewOptions {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
}

function useIsInView<T extends HTMLElement = HTMLElement>(
  ref: React.Ref<T>,
  options: UseIsInViewOptions = {},
) {
  const { inView, inViewOnce = false, inViewMargin = "0px" } = options;
  const localRef = React.useRef<T>(null);
  React.useImperativeHandle(ref, () => localRef.current as T);
  const inViewResult = useInView(localRef, {
    margin: inViewMargin,
    once: inViewOnce,
  });
  const isInView = !inView || inViewResult;
  return { isInView, ref: localRef };
}

export { type UseIsInViewOptions, useIsInView };
