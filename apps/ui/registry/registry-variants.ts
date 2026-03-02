import type { Registry } from "cnippet/schema";
import type { RegistryCategory } from "./registry-categories";

// Type helper to enforce RegistryCategory[] for categories field
type ParticleItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

// Helper function to ensure categories are valid RegistryCategory values
function categories<T extends RegistryCategory[]>(...categories: T): T {
  return categories;
}

// Utility function to create variants
function createVariant(options: {
  category: RegistryCategory;
  name: string;
  description: string;
  dependencies: string[];
  meta?: { className: string };
  type?: "registry:block" | "registry:component";
}): ParticleItem {
  const fileName = `variants/${options.name}.tsx`;

  return {
    categories: categories(options.category),
    description: options.description,
    files: [{ path: fileName, type: options.type || "registry:block" }],
    meta: options.meta || { className: "" },
    name: options.name,
    registryDependencies: options.dependencies,
    type: options.type || "registry:block",
  };
}

export const variants: ParticleItem[] = [
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "accordion",
      dependencies: ["accordion"],
      description: i === 0 ? "Basic accordion" : "Multi level accordion",
      name: `v-accordion-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "alert",
      dependencies: ["alert"],
      description: "Basic alert",
      name: `v-alert-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "alert dialog",
      dependencies: ["alert-dialog"],
      description: "basic alert dialog",
      name: `v-alert-dialog-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "autocomplete",
      dependencies: ["autocomplete"],
      description: "Basic autocomplete",
      name: `v-autocomplete-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "avatar",
      dependencies: ["avatar"],
      description: "Basic avatar",
      name: `v-avatar-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "badge",
      dependencies: ["badge"],
      description: "Basic badge",
      name: `v-badge-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "breadcrumb",
      dependencies: ["breadcrumb"],
      description: "Basic breadcrumb",
      name: `v-breadcrumb-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "button",
      dependencies: ["button"],
      description: "Basic button",
      name: `v-button-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "calendar",
      dependencies: ["button"],
      description: "Basic calendar",
      name: `v-calendar-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "card",
      dependencies: [],
      description: "Basic Card",
      name: `v-card-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "carousel",
      dependencies: [],
      description: "Basic carousel",
      name: `v-carousel-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "chart",
      dependencies: ["chart"],
      description: "Basic chart",
      name: `v-chart-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "checkbox",
      dependencies: ["checkbox"],
      description: "Basic checkbox",
      name: `v-checkbox-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "checkbox group",
      dependencies: ["checkbox-group"],
      description: "Basic checkbox-group",
      name: `v-checkbox-group-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "collapsible",
      dependencies: ["collapsible"],
      description: "Basic collapsible",
      name: `v-collapsible-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "combobox",
      dependencies: ["combobox"],
      description: "Basic combobox",
      name: `v-combobox-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "context-menu",
      dependencies: ["context-menu"],
      description: "Basic context menu",
      name: `v-context-menu-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "dialog",
      dependencies: ["dialog"],
      description: "Basic dialog",
      name: `v-dialog-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "empty state",
      dependencies: [],
      description: "empty state",
      name: `v-empty-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 17 }, (_, i) =>
    createVariant({
      category: "field",
      dependencies: ["field"],
      description: "Basic field",
      name: `v-field-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "fieldset",
      dependencies: [],
      description: "Basic fieldset",
      name: `v-fieldset-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "form",
      dependencies: ["form"],
      description: "form",
      name: `v-form-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "frame",
      dependencies: ["frame"],
      description: "frame",
      name: `v-frame-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "group",
      dependencies: [],
      description: "group",
      name: `v-group-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "input",
      dependencies: ["input"],
      description: "input",
      name: `v-input-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 12 }, (_, i) =>
    createVariant({
      category: "input group",
      dependencies: ["input-group"],
      description: "input-group",
      name: `v-input-group-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "kbd",
      dependencies: [],
      description: "kbd",
      name: `v-kbd-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "menu",
      dependencies: ["menu"],
      description: "menu",
      name: `v-menu-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "meter",
      dependencies: [],
      description: "meter",
      name: `v-meter-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "number field",
      dependencies: ["number-field"],
      description: "number-field",
      name: `v-number-field-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "pagination",
      dependencies: ["pagination"],
      description: "pagination",
      name: `v-pagination-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "popover",
      dependencies: ["popover"],
      description: "popover",
      name: `v-popover-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "preview card",
      dependencies: [],
      description: "preview card",
      name: `v-preview-card-${i + 1}`,
    }),
  ),
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "progress",
      dependencies: [],
      description: "progress",
      name: `v-progress-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "radio group",
      dependencies: ["radio-group"],
      description: "radio-group",
      name: `v-radio-group-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "scroll area",
      dependencies: [],
      description: "scroll area",
      name: `v-scroll-area-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "select",
      dependencies: ["select"],
      description: "select",
      name: `v-select-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "separator",
      dependencies: ["separator"],
      description: "separator",
      name: `v-separator-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "sheet",
      dependencies: ["sheet"],
      description: "sheet",
      name: `v-sheet-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "skeleton",
      dependencies: ["skeleton"],
      description: "skeleton",
      name: `v-skeleton-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "slider",
      dependencies: ["slider"],
      description: "slider",
      name: `v-slider-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "spinner",
      dependencies: ["spinner"],
      description: "spinner",
      name: `v-spinner-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "switch",
      dependencies: ["switch"],
      description: "Basic switch",
      name: `v-switch-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "table",
      dependencies: ["table"],
      description: "table",
      name: `v-table-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "tabs",
      dependencies: ["tabs"],
      description: "tabs",
      name: `v-tabs-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "textarea",
      dependencies: ["textarea"],
      description: "textarea",
      name: `v-textarea-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toast",
      dependencies: ["toast"],
      description: "toast",
      name: `v-toast-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toggle",
      dependencies: ["toggle"],
      description: "toggle",
      name: `v-toggle-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toggle group",
      dependencies: ["toggle group"],
      description: "toggle group",
      name: `v-toggle-group-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toolbar",
      dependencies: ["toolbar"],
      description: "toolbar",
      name: `v-toolbar-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "tooltip",
      dependencies: ["tooltip"],
      description: "tooltip",
      name: `v-tooltip-${i + 1}`,
    }),
  ),
];

// Alternative: If you want even more concise for components with multiple variants,
// you can create a helper function for bulk variant creation:
function _createMultipleVariants(
  category: RegistryCategory,
  count: number,
  baseDescription: string | ((index: number) => string),
  dependencies: string[],
  baseName?: string,
): ParticleItem[] {
  return Array.from({ length: count }, (_, i) =>
    createVariant({
      category,
      dependencies,
      description:
        typeof baseDescription === "function"
          ? baseDescription(i)
          : `${baseDescription} ${i + 1}`,
      name: baseName
        ? `${baseName}-${i + 1}`
        : `v-${category}-${i + 1}`.replace(/\s+/g, "-"),
    }),
  );
}

// Then you could use it like:
// const alertVariants = createMultipleVariants("alert", 5, "Basic alert", ["alert"]);m
