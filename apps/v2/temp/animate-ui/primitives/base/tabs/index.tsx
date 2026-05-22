"use client";

import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
} from "motion/react";
import * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  AutoHeight,
  type AutoHeightProps,
} from "@/registry/primitives/effects/auto-height";
import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from "@/registry/primitives/effects/highlight";

type TabsContextType = {
  value: string | undefined;
  setValue: TabsProps["onValueChange"];
};

const [TabsProvider, useTabs] =
  getStrictContext<TabsContextType>("TabsContext");

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root>;

function Tabs(props: TabsProps) {
  const [value, setValue] = useControlledState({
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
    value: props.value,
  });

  return (
    <TabsProvider value={{ setValue, value }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        {...props}
        onValueChange={setValue}
      />
    </TabsProvider>
  );
}

type TabsHighlightProps = Omit<HighlightProps, "controlledItems" | "value">;

function TabsHighlight({
  transition = { damping: 25, stiffness: 200, type: "spring" },
  ...props
}: TabsHighlightProps) {
  const { value } = useTabs();

  return (
    <Highlight
      click={false}
      controlledItems
      data-slot="tabs-highlight"
      transition={transition}
      value={value}
      {...props}
    />
  );
}

type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

function TabsList(props: TabsListProps) {
  return <TabsPrimitive.List data-slot="tabs-list" {...props} />;
}

type TabsHighlightItemProps = HighlightItemProps & {
  value: string;
};

function TabsHighlightItem(props: TabsHighlightItemProps) {
  return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

type TabsTabProps = React.ComponentProps<typeof TabsPrimitive.Tab>;

function TabsTab(props: TabsTabProps) {
  return <TabsPrimitive.Tab data-slot="tabs-tab" {...props} />;
}

type TabsPanelProps = React.ComponentProps<typeof TabsPrimitive.Panel> &
  HTMLMotionProps<"div">;

function TabsPanel({
  value,
  keepMounted,
  transition = { duration: 0.5, ease: "easeInOut" },
  ...props
}: TabsPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <TabsPrimitive.Panel
        keepMounted={keepMounted}
        render={
          <motion.div
            animate={{ filter: "blur(0px)", opacity: 1 }}
            data-slot="tabs-panel"
            exit={{ filter: "blur(4px)", opacity: 0 }}
            initial={{ filter: "blur(4px)", opacity: 0 }}
            layout
            layoutDependency={value}
            transition={transition}
            {...props}
          />
        }
        value={value}
      />
    </AnimatePresence>
  );
}

type TabsPanelsAutoProps = Omit<AutoHeightProps, "children"> & {
  mode?: "auto-height";
  children: React.ReactNode;
  transition?: Transition;
};

type TabsPanelsLayoutProps = Omit<HTMLMotionProps<"div">, "children"> & {
  mode: "layout";
  children: React.ReactNode;
  transition?: Transition;
};

type TabsPanelsProps = TabsPanelsAutoProps | TabsPanelsLayoutProps;

const defaultTransition: Transition = {
  damping: 30,
  stiffness: 200,
  type: "spring",
};

function isAutoMode(props: TabsPanelsProps): props is TabsPanelsAutoProps {
  return !props.mode || props.mode === "auto-height";
}

function TabsPanels(props: TabsPanelsProps) {
  const { value } = useTabs();

  if (isAutoMode(props)) {
    const { children, transition = defaultTransition, ...autoProps } = props;

    return (
      <AutoHeight
        data-slot="tabs-panels"
        deps={[value]}
        transition={transition}
        {...autoProps}
      >
        <React.Fragment key={value}>{children}</React.Fragment>
      </AutoHeight>
    );
  }

  const {
    children,
    style,
    transition = defaultTransition,
    ...layoutProps
  } = props;

  return (
    <motion.div
      data-slot="tabs-panels"
      layout="size"
      layoutDependency={value}
      style={{ overflow: "hidden", ...style }}
      transition={{ layout: transition }}
      {...layoutProps}
    >
      <React.Fragment key={value}>{children}</React.Fragment>
    </motion.div>
  );
}

export {
  Tabs,
  TabsHighlight,
  TabsHighlightItem,
  type TabsHighlightItemProps,
  type TabsHighlightProps,
  TabsList,
  type TabsListProps,
  TabsPanel,
  type TabsPanelProps,
  TabsPanels,
  type TabsPanelsProps,
  type TabsProps,
  TabsTab,
  type TabsTabProps,
};
