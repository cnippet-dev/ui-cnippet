export interface PropSchema {
  name: string;
  type: "string" | "enum" | "boolean" | "number";
  default: unknown;
  options?: string[];
  label: string;
  description?: string;
}

export const buttonSchema: PropSchema[] = [
  {
    default: "default",
    label: "Variant",
    name: "variant",
    options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
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
  { default: false, label: "Default on", name: "defaultChecked", type: "boolean" },
];

export const spinnerSchema: PropSchema[] = [];

export const kbdSchema: PropSchema[] = [
  { default: "⌘K", label: "Key", name: "label", type: "string" },
];
