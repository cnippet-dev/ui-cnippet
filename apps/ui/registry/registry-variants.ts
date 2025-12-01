import type { Registry } from "shadcn/schema";

import type { RegistryCategory } from "./registry-categories";

// Type helper to enforce RegistryCategory[] for categories field
type ParticleItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

// Helper function to ensure categories are valid RegistryCategory values
function categories<T extends RegistryCategory[]>(...categories: T): T {
  return categories;
}

export const variants: ParticleItem[] = [
  {
    categories: categories("accordion"),
    description: "Basic accordion",
    files: [{ path: "variants/v-accordion-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-accordion-1",
    registryDependencies: ["@cnippet/accordion"],
    type: "registry:block",
  },
  {
    categories: categories("alert"),
    description: "Basic alert",
    files: [{ path: "variants/v-alert-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-alert-1",
    registryDependencies: ["@cnippet/alert"],
    type: "registry:block",
  },
  {
    categories: categories("alert dialog"),
    description: "Basic alert dialog",
    files: [{ path: "variants/v-alert-dialog-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-alert-dialog-1",
    registryDependencies: ["@cnippet/alert-dialog"],
    type: "registry:block",
  },
  {
    categories: categories("autocomplete"),
    description: "Basic autocomplete",
    files: [{ path: "variants/v-autocomplete-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-autocomplete-1",
    registryDependencies: ["@cnippet/autocomplete"],
    type: "registry:block",
  },
  {
    categories: categories("avatar"),
    description: "Basic avatar",
    files: [{ path: "variants/v-avatar-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-avatar-1",
    registryDependencies: ["@cnippet/avatar"],
    type: "registry:block",
  },
  {
    categories: categories("badge"),
    description: "Basic badge",
    files: [{ path: "variants/v-badge-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-badge-1",
    registryDependencies: ["@cnippet/badge"],
    type: "registry:block",
  },
  {
    categories: categories("breadcrumb"),
    description: "Basic breadcrumb",
    files: [{ path: "variants/v-breadcrumb-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-breadcrumb-1",
    registryDependencies: ["@cnippet/breadcrumb"],
    type: "registry:block",
  },
  {
    categories: categories("button"),
    description: "Basic button",
    files: [{ path: "variants/v-button-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-button-1",
    registryDependencies: ["@cnippet/button"],
    type: "registry:block",
  },
  {
    categories: categories("card"),
    description: "Basic card",
    files: [{ path: "variants/v-card-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-card-1",
    registryDependencies: ["@cnippet/card"],
    type: "registry:block",
  },
  {
    categories: categories("checkbox"),
    description: "Basic checkbox",
    files: [{ path: "variants/v-checkbox-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-checkbox-1",
    registryDependencies: ["@cnippet/checkbox"],
    type: "registry:block",
  },
  {
    categories: categories("checkbox group"),
    description: "Basic checkbox group",
    files: [
      { path: "variants/v-checkbox-group-1.tsx", type: "registry:block" },
    ],
    meta: {
      className: "",
    },
    name: "v-checkbox-group-1",
    registryDependencies: ["@cnippet/checkbox-group"],
    type: "registry:block",
  },
  {
    categories: categories("collapsible"),
    description: "Basic collapsible",
    files: [{ path: "variants/v-collapsible-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-collapsible-1",
    registryDependencies: ["@cnippet/collapsible"],
    type: "registry:block",
  },
  {
    categories: categories("combobox"),
    description: "Basic combobox",
    files: [{ path: "variants/v-combobox-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-combobox-1",
    registryDependencies: ["@cnippet/combobox"],
    type: "registry:block",
  },
  {
    categories: categories("dialog"),
    description: "Basic dialog",
    files: [{ path: "variants/v-dialog-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-dialog-1",
    registryDependencies: ["@cnippet/dialog"],
    type: "registry:block",
  },
  {
    categories: categories("empty state"),
    description: "Basic empty state",
    files: [{ path: "variants/v-empty-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-empty-1",
    registryDependencies: ["@cnippet/empty"],
    type: "registry:block",
  },
  {
    categories: categories("field"),
    description: "Basic field",
    files: [{ path: "variants/v-field-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-field-1",
    registryDependencies: ["@cnippet/field"],
    type: "registry:block",
  },
  {
    categories: categories("fieldset"),
    description: "Basic fieldset",
    files: [{ path: "variants/v-fieldset-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-fieldset-1",
    registryDependencies: ["@cnippet/fieldset"],
    type: "registry:block",
  },
  {
    categories: categories("form"),
    description: "Basic form",
    files: [{ path: "variants/v-form-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-form-1",
    registryDependencies: ["@cnippet/form"],
    type: "registry:block",
  },
  {
    categories: categories("frame"),
    description: "Basic frame",
    files: [{ path: "variants/v-frame-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-frame-1",
    registryDependencies: ["@cnippet/frame"],
    type: "registry:block",
  },
  {
    categories: categories("group"),
    description: "Basic group",
    files: [{ path: "variants/v-group-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-group-1",
    registryDependencies: ["@cnippet/group"],
    type: "registry:block",
  },
  {
    categories: categories("input"),
    description: "Basic input",
    files: [{ path: "variants/v-input-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-input-1",
    registryDependencies: ["@cnippet/input"],
    type: "registry:block",
  },
  {
    categories: categories("input"),
    description: "Input with label",
    files: [{ path: "variants/v-input-6.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-input-6",
    registryDependencies: ["@cnippet/input"],
    type: "registry:block",
  },
  {
    categories: categories("input group"),
    description: "Basic input group",
    files: [{ path: "variants/v-input-group-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-input-group-1",
    registryDependencies: ["@cnippet/input-group"],
    type: "registry:block",
  },
  {
    categories: categories("kbd"),
    description: "Basic kbd",
    files: [{ path: "variants/v-kbd-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-kbd-1",
    registryDependencies: ["@cnippet/kbd"],
    type: "registry:block",
  },
  {
    categories: categories("menu"),
    description: "Basic menu",
    files: [{ path: "variants/v-menu-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-menu-1",
    registryDependencies: ["@cnippet/menu"],
    type: "registry:block",
  },
  {
    categories: categories("meter"),
    description: "Basic meter",
    files: [{ path: "variants/v-meter-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-meter-1",
    registryDependencies: ["@cnippet/meter"],
    type: "registry:block",
  },
  {
    categories: categories("number field"),
    description: "Basic number field",
    files: [{ path: "variants/v-number-field-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-number-field-1",
    registryDependencies: ["@cnippet/number-field"],
    type: "registry:block",
  },
  {
    categories: categories("pagination"),
    description: "Basic pagination",
    files: [{ path: "variants/v-pagination-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-pagination-1",
    registryDependencies: ["@cnippet/pagination"],
    type: "registry:block",
  },
  {
    categories: categories("popover"),
    description: "Basic popover",
    files: [{ path: "variants/v-popover-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-popover-1",
    registryDependencies: ["@cnippet/popover"],
    type: "registry:block",
  },
  {
    categories: categories("preview card"),
    description: "Basic preview card",
    files: [{ path: "variants/v-preview-card-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-preview-card-1",
    registryDependencies: ["@cnippet/preview-card"],
    type: "registry:block",
  },
  {
    categories: categories("progress"),
    description: "Basic progress",
    files: [{ path: "variants/v-progress-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-progress-1",
    registryDependencies: ["@cnippet/progress"],
    type: "registry:block",
  },
  {
    categories: categories("radio group"),
    description: "Basic radio group",
    files: [{ path: "variants/v-radio-group-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-radio-group-1",
    registryDependencies: ["@cnippet/radio-group"],
    type: "registry:block",
  },
  {
    categories: categories("scroll area"),
    description: "Basic scroll area",
    files: [{ path: "variants/v-scroll-area-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-scroll-area-1",
    registryDependencies: ["@cnippet/scroll-area"],
    type: "registry:block",
  },
  {
    categories: categories("select"),
    description: "Basic select",
    files: [{ path: "variants/v-select-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-select-1",
    registryDependencies: ["@cnippet/select"],
    type: "registry:block",
  },
  {
    categories: categories("separator"),
    description: "Basic separator",
    files: [{ path: "variants/v-separator-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-separator-1",
    registryDependencies: ["@cnippet/separator"],
    type: "registry:block",
  },
  {
    categories: categories("sheet"),
    description: "Basic sheet",
    files: [{ path: "variants/v-sheet-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-sheet-1",
    registryDependencies: ["@cnippet/sheet"],
    type: "registry:block",
  },
  {
    categories: categories("skeleton"),
    description: "Basic skeleton",
    files: [{ path: "variants/v-skeleton-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-skeleton-1",
    registryDependencies: ["@cnippet/skeleton"],
    type: "registry:block",
  },
  {
    categories: categories("slider"),
    description: "Basic slider",
    files: [{ path: "variants/v-slider-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-slider-1",
    registryDependencies: ["@cnippet/slider"],
    type: "registry:block",
  },
  {
    categories: categories("spinner"),
    description: "Basic spinner",
    files: [{ path: "variants/v-spinner-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-spinner-1",
    registryDependencies: ["@cnippet/spinner"],
    type: "registry:block",
  },
  {
    categories: categories("switch"),
    description: "Basic switch",
    files: [{ path: "variants/v-switch-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-switch-1",
    registryDependencies: ["@cnippet/switch"],
    type: "registry:block",
  },
  {
    categories: categories("table"),
    description: "Basic table",
    files: [{ path: "variants/v-table-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-table-1",
    registryDependencies: ["@cnippet/table"],
    type: "registry:block",
  },
  {
    categories: categories("tabs"),
    description: "Basic tabs",
    files: [{ path: "variants/v-tabs-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-tabs-1",
    registryDependencies: ["@cnippet/tabs"],
    type: "registry:block",
  },
  {
    categories: categories("textarea"),
    description: "Basic textarea",
    files: [{ path: "variants/v-textarea-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-textarea-1",
    registryDependencies: ["@cnippet/textarea"],
    type: "registry:block",
  },
  {
    categories: categories("toast"),
    description: "Basic toast",
    files: [{ path: "variants/v-toast-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-toast-1",
    registryDependencies: ["@cnippet/toast"],
    type: "registry:block",
  },
  {
    categories: categories("toggle"),
    description: "Basic toggle",
    files: [{ path: "variants/v-toggle-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-toggle-1",
    registryDependencies: ["@cnippet/toggle"],
    type: "registry:block",
  },
  {
    categories: categories("toggle group"),
    description: "Basic toggle group",
    files: [{ path: "variants/v-toggle-group-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-toggle-group-1",
    registryDependencies: ["@cnippet/toggle-group"],
    type: "registry:block",
  },
  {
    categories: categories("toolbar"),
    description: "Basic toolbar",
    files: [{ path: "variants/v-toolbar-1.tsx", type: "registry:block" }],
    meta: {
      className: "",
    },
    name: "v-toolbar-1",
    registryDependencies: ["@cnippet/toolbar"],
    type: "registry:block",
  },
  {
    categories: categories("tooltip"),
    description: "Basic tooltip",
    files: [{ path: "variants/v-tooltip-1.tsx", type: "registry:block" }],
      meta: {
      className: "",
    },
    name: "v-tooltip-1",
    registryDependencies: ["@cnippet/tooltip"],
    type: "registry:block",
  },
];
