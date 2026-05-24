export interface PropSchema {
  name: string;
  type: "string" | "enum" | "boolean" | "number";
  default: unknown;
  options?: string[];
  label: string;
  description?: string;
}

// ── Per-component prop schemas ─────────────────────────────────────────────

export const buttonSchema: PropSchema[] = [
  {
    default: "default",
    label: "Variant",
    name: "variant",
    options: [
      "default",
      "outline",
      "secondary",
      "ghost",
      "destructive",
      "link",
    ],
    type: "enum",
  },
  {
    default: "default",
    label: "Size",
    name: "size",
    options: ["sm", "default", "lg"],
    type: "enum",
  },
  { default: "Button", label: "Label", name: "label", type: "string" },
  { default: false, label: "Disabled", name: "disabled", type: "boolean" },
];

export const badgeSchema: PropSchema[] = [
  {
    default: "default",
    label: "Variant",
    name: "variant",
    options: ["default", "secondary", "destructive", "outline"],
    type: "enum",
  },
  { default: "Badge", label: "Label", name: "label", type: "string" },
];

export const inputSchema: PropSchema[] = [
  {
    default: "Enter text…",
    label: "Placeholder",
    name: "placeholder",
    type: "string",
  },
  {
    default: "text",
    label: "Type",
    name: "type",
    options: ["text", "email", "password", "number", "search", "url"],
    type: "enum",
  },
  { default: false, label: "Disabled", name: "disabled", type: "boolean" },
];

export const textareaSchema: PropSchema[] = [
  {
    default: "Enter text…",
    label: "Placeholder",
    name: "placeholder",
    type: "string",
  },
  { default: 3, label: "Rows", name: "rows", type: "number" },
  { default: false, label: "Disabled", name: "disabled", type: "boolean" },
];

export const alertSchema: PropSchema[] = [
  { default: "Heads up!", label: "Title", name: "title", type: "string" },
  {
    default: "Something you should know.",
    label: "Description",
    name: "description",
    type: "string",
  },
];

export const switchSchema: PropSchema[] = [
  { default: "Toggle", label: "Label", name: "label", type: "string" },
  { default: false, label: "Disabled", name: "disabled", type: "boolean" },
  {
    default: false,
    label: "Default on",
    name: "defaultChecked",
    type: "boolean",
  },
];

export const spinnerSchema: PropSchema[] = [];

export const kbdSchema: PropSchema[] = [
  { default: "⌘K", label: "Key", name: "label", type: "string" },
];

export const headingSchema: PropSchema[] = [
  { default: "Heading", label: "Text", name: "text", type: "string" },
  {
    default: "h2",
    label: "Element",
    name: "as",
    options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    type: "enum",
  },
  {
    default: "text-3xl",
    label: "Size",
    name: "size",
    options: [
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
      "text-7xl",
      "text-8xl",
      "text-9xl",
    ],
    type: "enum",
  },
  {
    default: "font-bold",
    label: "Weight",
    name: "weight",
    options: [
      "font-thin",
      "font-extralight",
      "font-light",
      "font-normal",
      "font-medium",
      "font-semibold",
      "font-bold",
      "font-extrabold",
      "font-black",
    ],
    type: "enum",
  },
  {
    default: "tracking-tight",
    label: "Tracking",
    name: "tracking",
    options: [
      "tracking-tighter",
      "tracking-tight",
      "tracking-normal",
      "tracking-wide",
      "tracking-wider",
      "tracking-widest",
    ],
    type: "enum",
  },
  {
    default: "leading-tight",
    label: "Leading",
    name: "leading",
    options: [
      "leading-none",
      "leading-tight",
      "leading-snug",
      "leading-normal",
      "leading-relaxed",
      "leading-loose",
    ],
    type: "enum",
  },
  {
    default: "text-left",
    label: "Align",
    name: "align",
    options: ["text-left", "text-center", "text-right"],
    type: "enum",
  },
  {
    default: "",
    label: "Color",
    name: "color",
    options: ["", "text-muted-foreground", "text-primary", "text-destructive"],
    type: "enum",
  },
];

export const textSchema: PropSchema[] = [
  {
    default: "Body paragraph text.",
    label: "Text",
    name: "text",
    type: "string",
  },
  {
    default: "text-base",
    label: "Size",
    name: "size",
    options: ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"],
    type: "enum",
  },
  {
    default: "font-normal",
    label: "Weight",
    name: "weight",
    options: [
      "font-thin",
      "font-light",
      "font-normal",
      "font-medium",
      "font-semibold",
      "font-bold",
    ],
    type: "enum",
  },
  {
    default: "tracking-normal",
    label: "Tracking",
    name: "tracking",
    options: [
      "tracking-tighter",
      "tracking-tight",
      "tracking-normal",
      "tracking-wide",
      "tracking-wider",
      "tracking-widest",
    ],
    type: "enum",
  },
  {
    default: "leading-relaxed",
    label: "Leading",
    name: "leading",
    options: [
      "leading-none",
      "leading-tight",
      "leading-snug",
      "leading-normal",
      "leading-relaxed",
      "leading-loose",
    ],
    type: "enum",
  },
  {
    default: "text-left",
    label: "Align",
    name: "align",
    options: ["text-left", "text-center", "text-right"],
    type: "enum",
  },
  {
    default: "text-muted-foreground",
    label: "Color",
    name: "color",
    options: ["", "text-muted-foreground", "text-primary", "text-destructive"],
    type: "enum",
  },
];
