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
  ...Array.from({ length: 2 }, (_, i) =>
    createVariant({
      category: "accordion",
      dependencies: ["accordion"],
      description: i === 0 ? "Basic accordion" : "Multi level accordion",
      name: `v-accordion-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 5 }, (_, i) =>
    createVariant({
      category: "alert",
      dependencies: ["alert"],
      description: "Basic alert",
      name: `v-alert-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 2 }, (_, i) =>
    createVariant({
      category: "alert dialog",
      dependencies: ["alert-dialog"],
      description: "basic alert dialog",
      name: `v-alert-dialog-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 6 }, (_, i) =>
    createVariant({
      category: "autocomplete",
      dependencies: ["autocomplete"],
      description: "Basic autocomplete",
      name: `v-autocomplete-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "avatar",
      dependencies: ["avatar"],
      description: "Basic avatar",
      name: `v-avatar-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 3 }, (_, i) =>
    createVariant({
      category: "badge",
      dependencies: ["badge"],
      description: "Basic badge",
      name: `v-badge-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 2 }, (_, i) =>
    createVariant({
      category: "breadcrumb",
      dependencies: ["breadcrumb"],
      description: "Basic breadcrumb",
      name: `v-breadcrumb-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 3 }, (_, i) =>
    createVariant({
      category: "button",
      dependencies: ["button"],
      description: "Basic button",
      name: `v-button-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "calendar",
      dependencies: ["button"],
      description: "Basic calendar",
      name: `v-calendar-${i + 1}`,
    }),
  ),

  createVariant({
    category: "card",
    dependencies: ["@cnippet/card"],
    description: "Basic card",
    name: "v-card-1",
  }),

  ...Array.from({ length: 3 }, (_, i) =>
    createVariant({
      category: "carousel",
      dependencies: [],
      description: "Basic carousel",
      name: `v-carousel-${i + 1}`,
    }),
  ),

  createVariant({
    category: "chart",
    dependencies: [],
    description: "Basic chart",
    name: "v-chart-1",
  }),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "checkbox",
      dependencies: ["checkbox"],
      description: "Basic checkbox",
      name: `v-checkbox-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "checkbox group",
      dependencies: ["checkbox-group"],
      description: "Basic checkbox-group",
      name: `v-checkbox-group-${i + 1}`,
    }),
  ),

  createVariant({
    category: "collapsible",
    dependencies: ["@cnippet/collapsible"],
    description: "Basic collapsible",
    name: "v-collapsible-1",
  }),

  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "combobox",
      dependencies: ["combobox"],
      description: "Basic combobox",
      name: `v-combobox-${i + 1}`,
    }),
  ),

  createVariant({
    category: "context-menu",
    dependencies: [],
    description: "Basic context menu",
    name: "v-context-menu-1",
  }),

  ...Array.from({ length: 5 }, (_, i) =>
    createVariant({
      category: "dialog",
      dependencies: ["dialog"],
      description: "Basic dialog",
      name: `v-dialog-${i + 1}`,
    }),
  ),

  createVariant({
    category: "empty state",
    dependencies: ["@cnippet/empty"],
    description: "Basic empty state",
    name: "v-empty-1",
  }),

  ...Array.from({ length: 17 }, (_, i) =>
    createVariant({
      category: "field",
      dependencies: ["field"],
      description: "Basic field",
      name: `v-field-${i + 1}`,
    }),
  ),

  createVariant({
    category: "fieldset",
    dependencies: ["@cnippet/fieldset"],
    description: "Basic fieldset",
    name: "v-fieldset-1",
  }),

  ...Array.from({ length: 2 }, (_, i) =>
    createVariant({
      category: "form",
      dependencies: ["form"],
      description: "form",
      name: `v-form-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "frame",
      dependencies: ["frame"],
      description: "frame",
      name: `v-frame-${i + 1}`,
    }),
  ),

  createVariant({
    category: "group",
    dependencies: ["@cnippet/group"],
    description: "Basic group",
    name: "v-group-1",
  }),

  ...Array.from({ length: 5 }, (_, i) =>
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

  createVariant({
    category: "kbd",
    dependencies: ["@cnippet/kbd"],
    description: "Basic kbd",
    name: "v-kbd-1",
  }),

  ...Array.from({ length: 6 }, (_, i) =>
    createVariant({
      category: "menu",
      dependencies: ["menu"],
      description: "menu",
      name: `v-menu-${i + 1}`,
    }),
  ),

  createVariant({
    category: "meter",
    dependencies: ["@cnippet/meter"],
    description: "Basic meter",
    name: "v-meter-1",
  }),

  ...Array.from({ length: 6 }, (_, i) =>
    createVariant({
      category: "number field",
      dependencies: ["number-field"],
      description: "number-field",
      name: `v-number-field-${i + 1}`,
    }),
  ),

  createVariant({
    category: "pagination",
    dependencies: ["@cnippet/pagination"],
    description: "Basic pagination",
    name: "v-pagination-1",
  }),

  ...Array.from({ length: 3 }, (_, i) =>
    createVariant({
      category: "popover",
      dependencies: ["popover"],
      description: "popover",
      name: `v-popover-${i + 1}`,
    }),
  ),

  createVariant({
    category: "preview card",
    dependencies: ["@cnippet/preview-card"],
    description: "Basic preview card",
    name: "v-preview-card-1",
  }),

  createVariant({
    category: "progress",
    dependencies: ["@cnippet/progress"],
    description: "Basic progress",
    name: "v-progress-1",
  }),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "radio group",
      dependencies: ["radio-group"],
      description: "radio-group",
      name: `v-radio-group-${i + 1}`,
    }),
  ),

  createVariant({
    category: "scroll area",
    dependencies: ["@cnippet/scroll-area"],
    description: "Basic scroll area",
    name: "v-scroll-area-1",
  }),

  ...Array.from({ length: 7 }, (_, i) =>
    createVariant({
      category: "select",
      dependencies: ["select"],
      description: "select",
      name: `v-select-${i + 1}`,
    }),
  ),

  createVariant({
    category: "separator",
    dependencies: ["@cnippet/separator"],
    description: "Basic separator",
    name: "v-separator-1",
  }),

  ...Array.from({ length: 3 }, (_, i) =>
    createVariant({
      category: "sheet",
      dependencies: ["sheet"],
      description: "sheet",
      name: `v-sheet-${i + 1}`,
    }),
  ),

  createVariant({
    category: "skeleton",
    dependencies: ["@cnippet/skeleton"],
    description: "Basic skeleton",
    name: "v-skeleton-1",
  }),

  createVariant({
    category: "slider",
    dependencies: ["@cnippet/slider"],
    description: "Basic slider",
    name: "v-slider-1",
  }),

  createVariant({
    category: "spinner",
    dependencies: ["@cnippet/spinner"],
    description: "Basic spinner",
    name: "v-spinner-1",
  }),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "switch",
      dependencies: ["switch"],
      description: "Basic switch",
      name: `v-switch-${i + 1}`,
    }),
  ),

  createVariant({
    category: "table",
    dependencies: ["@cnippet/table"],
    description: "Basic table",
    name: "v-table-1",
  }),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "tabs",
      dependencies: ["tabs"],
      description: "tabs",
      name: `v-tabs-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 4 }, (_, i) =>
    createVariant({
      category: "textarea",
      dependencies: ["textarea"],
      description: "textarea",
      name: `v-textarea-${i + 1}`,
    }),
  ),

  ...Array.from({ length: 8 }, (_, i) =>
    createVariant({
      category: "toast",
      dependencies: ["toast"],
      description: "toast",
      name: `v-toast-${i + 1}`,
    }),
  ),

  createVariant({
    category: "toggle",
    dependencies: ["@cnippet/toggle"],
    description: "Basic toggle",
    name: "v-toggle-1",
  }),

  createVariant({
    category: "toggle group",
    dependencies: ["@cnippet/toggle-group"],
    description: "Basic toggle group",
    name: "v-toggle-group-1",
  }),

  createVariant({
    category: "toolbar",
    dependencies: ["@cnippet/toolbar"],
    description: "Basic toolbar",
    name: "v-toolbar-1",
  }),

  createVariant({
    category: "tooltip",
    dependencies: ["@cnippet/tooltip"],
    description: "Basic tooltip",
    name: "v-tooltip-1",
  }),
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
