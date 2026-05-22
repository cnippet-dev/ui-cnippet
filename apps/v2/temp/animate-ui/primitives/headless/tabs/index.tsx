"use client";

import {
  TabGroup as TabGroupPrimitive,
  type TabGroupProps as TabGroupPrimitiveProps,
  TabList as TabListPrimitive,
  type TabListProps as TabListPrimitiveProps,
  TabPanel as TabPanelPrimitive,
  type TabPanelProps as TabPanelPrimitiveProps,
  TabPanels as TabPanelsPrimitive,
  type TabPanelsProps as TabPanelsPrimitiveProps,
  Tab as TabPrimitive,
  type TabProps as TabPrimitiveProps,
} from "@headlessui/react";
import { motion, type Transition } from "motion/react";
import * as React from "react";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import { AutoHeight } from "@/registry/primitives/effects/auto-height";
import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from "@/registry/primitives/effects/highlight";

type TabsContextType = {
  selectedIndex: number;
};

const [TabsProvider, useTabs] =
  getStrictContext<TabsContextType>("TabsContext");

type TabGroupProps<TTag extends React.ElementType = "div"> =
  TabGroupPrimitiveProps<TTag> & {
    as?: TTag;
    className?: string;
  };

function TabGroup<TTag extends React.ElementType = "div">({
  children,
  ...props
}: TabGroupProps<TTag>) {
  return (
    <TabGroupPrimitive data-slot="tab-group" {...props}>
      {(bag) => (
        <TabsProvider value={{ selectedIndex: bag.selectedIndex }}>
          {typeof children === "function" ? children(bag) : children}
        </TabsProvider>
      )}
    </TabGroupPrimitive>
  );
}

type TabListProps<TTag extends React.ElementType = "div"> =
  TabListPrimitiveProps<TTag> & {
    as?: TTag;
    className?: string;
  };

function TabList<TTag extends React.ElementType = "div">(
  props: TabListProps<TTag>,
) {
  return <TabListPrimitive data-slot="tab-list" {...props} />;
}

type TabHighlightProps = Omit<HighlightProps, "controlledItems" | "value">;

function TabHighlight({
  transition = { damping: 25, stiffness: 200, type: "spring" },
  ...props
}: TabHighlightProps) {
  const { selectedIndex } = useTabs();

  return (
    <Highlight
      controlledItems
      data-slot="tab-highlight"
      transition={transition}
      value={selectedIndex.toString()}
      {...props}
    />
  );
}

type TabProps<TTag extends React.ElementType = "button"> = Omit<
  TabPrimitiveProps<TTag>,
  "children"
> &
  Required<Pick<TabPrimitiveProps<TTag>, "children">> & {
    index: number;
    as?: TTag;
    className?: string;
  };

function Tab<TTag extends React.ElementType = "button">(props: TabProps<TTag>) {
  const { index, as = "button", ...rest } = props;

  return (
    <TabPrimitive
      as={as as React.ElementType}
      data-slot="tab"
      index={index}
      {...rest}
    />
  );
}

type TabHighlightItemProps = HighlightItemProps & {
  index: number;
};

function TabHighlightItem({ index, ...props }: TabHighlightItemProps) {
  return (
    <HighlightItem
      data-slot="tab-highlight-item"
      value={index.toString()}
      {...props}
    />
  );
}

type TabPanelProps<TTag extends React.ElementType = typeof motion.div> = Omit<
  TabPanelPrimitiveProps<TTag>,
  "transition"
> & {
  children: React.ReactNode;
  className?: string;
  as?: TTag;
  transition?: Transition;
};

function TabPanel<TTag extends React.ElementType = typeof motion.div>(
  props: TabPanelProps<TTag>,
) {
  const {
    as = motion.div,
    transition = { duration: 0.5, ease: "easeInOut" },
    ...rest
  } = props;

  return (
    <TabPanelPrimitive
      animate={{ filter: "blur(0px)", opacity: 1 }}
      as={as as React.ElementType}
      data-slot="tab-panel"
      exit={{ filter: "blur(4px)", opacity: 0 }}
      initial={{ filter: "blur(4px)", opacity: 0 }}
      layout
      transition={transition}
      {...rest}
    />
  );
}

type TabPanelsAutoProps<TTag extends React.ElementType = typeof AutoHeight> =
  Omit<TabPanelsPrimitiveProps<TTag>, "transition" | "as"> & {
    mode?: "auto-height";
    className?: string;
    transition?: Transition;
  };

type TabPanelsLayoutProps<TTag extends React.ElementType = typeof motion.div> =
  Omit<TabPanelsPrimitiveProps<TTag>, "transition"> & {
    mode: "layout";
    className?: string;
    transition?: Transition;
  };

type TabPanelsProps<TTag extends React.ElementType> =
  | TabPanelsAutoProps<TTag>
  | TabPanelsLayoutProps<TTag>;

const defaultTransition: Transition = {
  damping: 25,
  stiffness: 200,
  type: "spring",
};

function TabPanels<TTag extends React.ElementType>(
  props: TabPanelsProps<TTag>,
) {
  const { selectedIndex } = useTabs();

  if (!("mode" in props) || props.mode === "auto-height") {
    const { transition = defaultTransition, ...rest } = props;

    return (
      <TabPanelsPrimitive
        as={AutoHeight}
        data-slot="tab-panels"
        deps={[selectedIndex]}
        transition={transition}
        {...rest}
      />
    );
  }

  if ("mode" in props && props.mode === "layout") {
    const {
      transition = defaultTransition,
      as = motion.div,
      style,
      ...rest
    } = props;

    return (
      <TabPanelsPrimitive
        as={as as React.ElementType}
        data-slot="tab-panels"
        layout="size"
        layoutDependency={selectedIndex.toString()}
        style={{ overflow: "hidden", ...style }}
        transition={{ layout: transition }}
        {...rest}
      />
    );
  }

  return <React.Fragment />;
}

export {
  Tab,
  TabGroup,
  type TabGroupProps,
  TabHighlight,
  TabHighlightItem,
  type TabHighlightItemProps,
  type TabHighlightProps,
  TabList,
  type TabListProps,
  TabPanel,
  type TabPanelProps,
  TabPanels,
  type TabPanelsProps,
  type TabProps,
};
