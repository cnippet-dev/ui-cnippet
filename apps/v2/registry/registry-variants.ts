import type { Registry } from "shadcn/schema";
import type { RegistryCategory } from "./registry-categories";

// Type helper to enforce RegistryCategory[] for categories field
type ParticleItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

// Helper function to ensure categories are valid RegistryCategory values
function categories<T extends RegistryCategory[]>(...cats: T): T {
  return cats;
}

// Utility function to create variants
function createVariant(options: {
  category: RegistryCategory;
  name: string;
  description?: string;
  dependencies?: string[];
  meta?: { className: string };
}): ParticleItem {
  return {
    categories: categories(options.category),
    description: options.description ?? `Basic ${options.category}`,
    files: [{ path: `variants/${options.name}.tsx`, type: "registry:block" }],
    meta: options.meta ?? { className: "" },
    name: options.name,
    registryDependencies: (options.dependencies ?? []).map(
      (d) => `@cnippet/${d}`,
    ),
    type: "registry:block",
  };
}

export const variants: ParticleItem[] = [
  // --- accordion ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "accordion",
      dependencies: ["accordion"],
      description: [
        "Default",
        "Single Accordion",
        "Multiple Accordion",
        "Controlled Accordion",
        "With plus/minus indicators",
        "With borders and rounded corners",
        "Embedded within a Card",
        "Nested accordion example with bordered items",
        "User list accordion with avatars and role indicators",
      ][i],
      meta: {
        className:
          "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]",
      },
      name: `v-accordion-${i + 1}`,
    }),
  ),

  // --- alert ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "alert",
      dependencies: ["alert"],
      name: `v-alert-${i + 1}`,
    }),
  ),

  // --- alert-dialog ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "alert dialog",
      dependencies: ["alert-dialog"],
      name: `v-alert-dialog-${i + 1}`,
    }),
  ),

  // --- autocomplete ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "autocomplete",
      dependencies: ["autocomplete"],
      name: `v-autocomplete-${i + 1}`,
    }),
  ),

  // --- avatar ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "avatar",
      dependencies: ["avatar"],
      name: `v-avatar-${i + 1}`,
    }),
  ),

  // --- badge ---
  ...Array.from({ length: 12 }, (_, i) =>
    createVariant({
      category: "badge",
      dependencies: ["badge"],
      name: `v-badge-${i + 1}`,
    }),
  ),

  // --- breadcrumb ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "breadcrumb",
      dependencies: ["breadcrumb"],
      name: `v-breadcrumb-${i + 1}`,
    }),
  ),

  // --- button ---
  ...Array.from({ length: 25 }, (_, i) =>
    createVariant({
      category: "button",
      dependencies: ["button"],
      description: [
        "Default",
        "Outline",
        "Secondary",
        "Destructive",
        "Destructive Outline",
        "Ghost",
        "Link",
        "Extra-small Size",
        "Small Size",
        "Large Size",
        "Extra-large Size",
        "Disabled",
        "Icon",
        "Button with an icon on the right",
        "Button with an icon on the left",
        "Outline button with an icon on the left",
        "Ghost button with an icon on the right",
        "Destructive button with an icon on the left",
        "Link button with an icon on the right",
        "Star button with count",
        "Button with an unread badge",
        "Button with icon, label, and shortcut keys",
        "Icon-only copy button with feedback",
        "Animated hamburger / close toggle button",
        "Sliding Icon Button (Hover reveal)",
      ][i],
      name: `v-button-${i + 1}`,
    }),
  ),

  // --- calendar ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "calendar",
      dependencies: ["calendar"],
      name: `v-calendar-${i + 1}`,
    }),
  ),

  // --- card ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "card",
      dependencies: ["card"],
      name: `v-card-${i + 1}`,
    }),
  ),

  // --- carousel ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "carousel",
      dependencies: ["carousel"],
      name: `v-carousel-${i + 1}`,
    }),
  ),

  // --- chart ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "chart",
      dependencies: ["chart"],
      name: `v-chart-${i + 1}`,
    }),
  ),

  // --- checkbox ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "checkbox",
      dependencies: ["checkbox"],
      name: `v-checkbox-${i + 1}`,
    }),
  ),

  // --- checkbox-group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "checkbox group",
      dependencies: ["checkbox-group"],
      name: `v-checkbox-group-${i + 1}`,
    }),
  ),

  // --- collapsible ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "collapsible",
      dependencies: ["collapsible"],
      name: `v-collapsible-${i + 1}`,
    }),
  ),

  // --- combobox ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "combobox",
      dependencies: ["combobox"],
      name: `v-combobox-${i + 1}`,
    }),
  ),

  // --- command ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "command",
      dependencies: ["command"],
      name: `v-command-${i + 1}`,
    }),
  ),

  // --- context-menu ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "menu",
      dependencies: ["menu"],
      name: `v-context-menu-${i + 1}`,
    }),
  ),

  // --- date-picker ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "date picker",
      dependencies: ["date-picker"],
      name: `v-date-picker-${i + 1}`,
    }),
  ),

  // --- dialog ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "dialog",
      dependencies: ["dialog"],
      name: `v-dialog-${i + 1}`,
    }),
  ),

  // --- drawer ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "drawer",
      dependencies: ["drawer"],
      name: `v-drawer-${i + 1}`,
    }),
  ),

  // --- empty ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "empty state",
      dependencies: [],
      name: `v-empty-${i + 1}`,
    }),
  ),

  // --- field ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "field",
      dependencies: ["field"],
      name: `v-field-${i + 1}`,
    }),
  ),

  // --- fieldset ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "fieldset",
      dependencies: ["fieldset"],
      name: `v-fieldset-${i + 1}`,
    }),
  ),

  // --- form ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "form",
      dependencies: ["form"],
      name: `v-form-${i + 1}`,
    }),
  ),

  // --- frame ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "frame",
      dependencies: ["frame"],
      name: `v-frame-${i + 1}`,
    }),
  ),

  // --- group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "group",
      dependencies: ["group"],
      name: `v-group-${i + 1}`,
    }),
  ),

  // --- input ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "input",
      dependencies: ["input"],
      name: `v-input-${i + 1}`,
    }),
  ),

  // --- input-group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "input group",
      dependencies: ["input-group"],
      name: `v-input-group-${i + 1}`,
    }),
  ),

  // --- kbd ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "kbd",
      dependencies: ["kbd"],
      name: `v-kbd-${i + 1}`,
    }),
  ),

  // --- label ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "label",
      dependencies: ["label"],
      name: `v-label-${i + 1}`,
    }),
  ),

  // --- menu ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "menu",
      dependencies: ["menu"],
      name: `v-menu-${i + 1}`,
    }),
  ),

  // --- meter ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "meter",
      dependencies: ["meter"],
      name: `v-meter-${i + 1}`,
    }),
  ),

  // --- number-field ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "number field",
      dependencies: ["number-field"],
      name: `v-number-field-${i + 1}`,
    }),
  ),

  // --- otp-field ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "input otp",
      dependencies: ["otp-field"],
      name: `v-otp-field-${i + 1}`,
    }),
  ),

  // --- pagination ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "pagination",
      dependencies: ["pagination"],
      name: `v-pagination-${i + 1}`,
    }),
  ),

  // --- popover ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "popover",
      dependencies: ["popover"],
      name: `v-popover-${i + 1}`,
    }),
  ),

  // --- preview-card ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "preview card",
      dependencies: ["preview-card"],
      name: `v-preview-card-${i + 1}`,
    }),
  ),

  // --- progress ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "progress",
      dependencies: ["progress"],
      name: `v-progress-${i + 1}`,
    }),
  ),

  // --- radio-group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "radio group",
      dependencies: ["radio-group"],
      name: `v-radio-group-${i + 1}`,
    }),
  ),

  // --- scroll-area ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "scroll area",
      dependencies: ["scroll-area"],
      name: `v-scroll-area-${i + 1}`,
    }),
  ),

  // --- select ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "select",
      dependencies: ["select"],
      name: `v-select-${i + 1}`,
    }),
  ),

  // --- separator ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "separator",
      dependencies: ["separator"],
      name: `v-separator-${i + 1}`,
    }),
  ),

  // --- sheet ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "sheet",
      dependencies: ["sheet"],
      name: `v-sheet-${i + 1}`,
    }),
  ),

  // --- skeleton ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "skeleton",
      dependencies: ["skeleton"],
      name: `v-skeleton-${i + 1}`,
    }),
  ),

  // --- slider ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "slider",
      dependencies: ["slider"],
      name: `v-slider-${i + 1}`,
    }),
  ),

  // --- spinner ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "spinner",
      dependencies: ["spinner"],
      name: `v-spinner-${i + 1}`,
    }),
  ),

  // --- switch ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "switch",
      dependencies: ["switch"],
      description: [
        "Default",
        "Description",
        "Switch in different sizes",
        "Switch group",
        "Switch list in card with icons",
        "Destructive switch with confirmation text",
        "Compact settings table with switches",
        "Switch with descriptions in card grid",
      ][i],
      name: `v-switch-${i + 1}`,
    }),
  ),

  // --- table ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "table",
      dependencies: ["table"],
      name: `v-table-${i + 1}`,
    }),
  ),

  // --- tabs ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "tabs",
      dependencies: ["tabs"],
      name: `v-tabs-${i + 1}`,
    }),
  ),

  // --- textarea ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "textarea",
      dependencies: ["textarea"],
      name: `v-textarea-${i + 1}`,
    }),
  ),

  // --- toast ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toast",
      dependencies: ["toast"],
      name: `v-toast-${i + 1}`,
    }),
  ),

  // --- toggle ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toggle",
      dependencies: ["toggle"],
      description: [
        "Default",
        "Toggle buttons with outline variant",
        "Toggle buttons in different sizes",
        "Toggle with button and icon",
        "Toggle with icon",
        "Toggle with notification count badge",
        "Toggle with icon swap on press",
        "Toggle with text label that changes",
      ][i],
      name: `v-toggle-${i + 1}`,
    }),
  ),

  // --- toggle-group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toggle group",
      dependencies: ["toggle-group"],
      description: [
        "Default",
        "Toggle groups in different sizes",
        "With Outline Toggles",
        "Vertical",
        "Multiple selection",
        "For text alignment",
        "View mode switching",
        "For color theme",
        "For pricing tier",
      ][i],
      name: `v-toggle-group-${i + 1}`,
    }),
  ),

  // --- toolbar ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toolbar",
      dependencies: ["toolbar"],
      name: `v-toolbar-${i + 1}`,
    }),
  ),

  // --- tooltip ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "tooltip",
      dependencies: ["tooltip"],
      name: `v-tooltip-${i + 1}`,
    }),
  ),
];
