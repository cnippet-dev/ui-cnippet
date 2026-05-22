"use client";

import * as React from "react";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";

type CodeBlockProps = React.ComponentProps<"div"> & {
  code: string;
  lang: string;
  theme?: "light" | "dark";
  themes?: { light: string; dark: string };
  writing?: boolean;
  duration?: number;
  delay?: number;
  onDone?: () => void;
  onWrite?: (info: { index: number; length: number; done: boolean }) => void;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
} & UseIsInViewOptions;

function CodeBlock({
  ref,
  code,
  lang,
  theme = "light",
  themes = {
    dark: "github-dark",
    light: "github-light",
  },
  writing = false,
  duration = 5000,
  delay = 0,
  onDone,
  onWrite,
  scrollContainerRef,
  inView = false,
  inViewOnce = true,
  inViewMargin = "0px",
  ...props
}: CodeBlockProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    {
      inView,
      inViewMargin,
      inViewOnce,
    },
  );

  const [visibleCode, setVisibleCode] = React.useState("");
  const [highlightedCode, setHighlightedCode] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);

  React.useEffect(() => {
    if (!visibleCode.length || !isInView) return;

    const loadHighlightedCode = async () => {
      try {
        const { codeToHtml } = await import("shiki");

        const highlighted = await codeToHtml(visibleCode, {
          defaultColor: theme,
          lang,
          themes,
        });

        setHighlightedCode(highlighted);
      } catch (e) {
        console.error(`Language "${lang}" could not be loaded.`, e);
      }
    };

    loadHighlightedCode();
  }, [lang, themes, isInView, visibleCode, theme]);

  React.useEffect(() => {
    if (!writing) {
      setVisibleCode(code);
      onDone?.();
      onWrite?.({ done: true, index: code.length, length: code.length });
      return;
    }

    if (!code.length || !isInView) return;

    const characters = Array.from(code);
    let index = 0;
    const totalDuration = duration;
    const interval = totalDuration / characters.length;
    let intervalId: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        if (index < characters.length) {
          setVisibleCode(() => {
            const nextChar = characters.slice(0, index + 1).join("");
            onWrite?.({
              done: false,
              index: index + 1,
              length: characters.length,
            });
            index += 1;
            return nextChar;
          });
          localRef.current?.scrollTo({
            behavior: "smooth",
            top: localRef.current?.scrollHeight,
          });
        } else {
          clearInterval(intervalId);
          setIsDone(true);
          onDone?.();
          onWrite?.({
            done: true,
            index: characters.length,
            length: characters.length,
          });
        }
      }, interval);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalId);
    };
  }, [code, duration, delay, isInView, writing, onDone, onWrite, localRef]);

  React.useEffect(() => {
    if (!writing || !isInView) return;
    const el =
      scrollContainerRef?.current ??
      (localRef.current?.parentElement as HTMLElement | null) ??
      (localRef.current as unknown as HTMLElement | null);

    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTo({
        behavior: "smooth",
        top: el.scrollHeight,
      });
    });
  }, [writing, isInView, scrollContainerRef, localRef]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      data-done={isDone}
      data-slot="code-block"
      data-writing={writing}
      ref={localRef}
      {...props}
    />
  );
}

export { CodeBlock, type CodeBlockProps };
