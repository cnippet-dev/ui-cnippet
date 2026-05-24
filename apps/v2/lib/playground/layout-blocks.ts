export interface LayoutBlockDefinition {
  id: string;
  label: string;
  /** Base Tailwind classes always applied regardless of props */
  baseClasses: string;
  defaultProps: Record<string, string | boolean>;
  /** Maps propName → propValue → tailwind class */
  tailwindMap: Record<string, Record<string, string>>;
}

export const layoutBlocks: LayoutBlockDefinition[] = [
  {
    baseClasses: "flex flex-row",
    defaultProps: {
      align: "center",
      gap: "4",
      justify: "start",
      wrap: "false",
    },
    id: "flex-row",
    label: "Flex row",
    tailwindMap: {
      align: {
        baseline: "items-baseline",
        center: "items-center",
        end: "items-end",
        start: "items-start",
        stretch: "items-stretch",
      },
      gap: {
        "0": "gap-0",
        "1": "gap-1",
        "2": "gap-2",
        "3": "gap-3",
        "4": "gap-4",
        "6": "gap-6",
        "8": "gap-8",
      },
      justify: {
        around: "justify-around",
        between: "justify-between",
        center: "justify-center",
        end: "justify-end",
        evenly: "justify-evenly",
        start: "justify-start",
      },
      wrap: { false: "", true: "flex-wrap" },
    },
  },
  {
    baseClasses: "flex flex-col",
    defaultProps: {
      align: "stretch",
      gap: "4",
      justify: "start",
      wrap: "false",
    },
    id: "flex-col",
    label: "Flex column",
    tailwindMap: {
      align: {
        center: "items-center",
        end: "items-end",
        start: "items-start",
        stretch: "items-stretch",
      },
      gap: {
        "0": "gap-0",
        "1": "gap-1",
        "2": "gap-2",
        "3": "gap-3",
        "4": "gap-4",
        "6": "gap-6",
        "8": "gap-8",
      },
      justify: {
        between: "justify-between",
        center: "justify-center",
        end: "justify-end",
        start: "justify-start",
      },
      wrap: { false: "", true: "flex-wrap" },
    },
  },
  {
    baseClasses: "grid grid-cols-2",
    defaultProps: { gap: "4" },
    id: "grid-2col",
    label: "Grid 2-col",
    tailwindMap: {
      gap: {
        "0": "gap-0",
        "2": "gap-2",
        "4": "gap-4",
        "6": "gap-6",
        "8": "gap-8",
      },
    },
  },
  {
    baseClasses: "grid grid-cols-3",
    defaultProps: { gap: "4" },
    id: "grid-3col",
    label: "Grid 3-col",
    tailwindMap: {
      gap: {
        "0": "gap-0",
        "2": "gap-2",
        "4": "gap-4",
        "6": "gap-6",
        "8": "gap-8",
      },
    },
  },
  {
    baseClasses: "grid grid-cols-4",
    defaultProps: { gap: "4" },
    id: "grid-4col",
    label: "Grid 4-col",
    tailwindMap: {
      gap: {
        "0": "gap-0",
        "2": "gap-2",
        "4": "gap-4",
        "6": "gap-6",
        "8": "gap-8",
      },
    },
  },
  {
    baseClasses: "mx-auto w-full",
    defaultProps: { maxWidth: "4xl", padding: "4" },
    id: "container",
    label: "Container",
    tailwindMap: {
      maxWidth: {
        "2xl": "max-w-2xl",
        "4xl": "max-w-4xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        lg: "max-w-lg",
        md: "max-w-md",
        sm: "max-w-sm",
        xl: "max-w-xl",
      },
      padding: {
        "0": "p-0",
        "2": "p-2",
        "4": "p-4",
        "6": "p-6",
        "8": "p-8",
        "12": "p-12",
      },
    },
  },
];

/** Resolve the Tailwind className string for a layout node's current props */
export function buildLayoutClasses(
  blockId: string,
  props: Record<string, unknown>,
): string {
  const block = layoutBlocks.find((b) => b.id === blockId);
  if (!block) return "";

  const classes = [block.baseClasses];

  // Merge defaultProps with actual props
  const merged = { ...block.defaultProps, ...props };

  for (const [propName, propValue] of Object.entries(merged)) {
    const mapping = block.tailwindMap[propName];
    if (mapping) {
      const cls = mapping[String(propValue)];
      if (cls) classes.push(cls);
    }
  }

  return classes.filter(Boolean).join(" ");
}

/** Returns the PropSchema array for a layout block's configurable props */
export function getLayoutPropsSchema(blockId: string) {
  const block = layoutBlocks.find((b) => b.id === blockId);
  if (!block) return [];

  return Object.entries(block.tailwindMap).map(([propName, mapping]) => ({
    default: block.defaultProps[propName] ?? Object.keys(mapping)[0],
    label: propName.charAt(0).toUpperCase() + propName.slice(1),
    name: propName,
    options: Object.keys(mapping),
    type: "enum" as const,
  }));
}

export function isLayoutBlock(registryId: string): boolean {
  return layoutBlocks.some((b) => b.id === registryId);
}
