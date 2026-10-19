import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
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

export type VariantRole = "demo" | "showcase";

function range(from: number, to: number): number[] {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

// Single-prop API demos stay registered for docs and installs but are hidden
// from Explore; the component's showcase variant stands in for them there.
function variantRole(
  n: number,
  roles: { demos: number[]; showcase: number },
): VariantRole | undefined {
  if (n === roles.showcase) return "showcase";
  if (roles.demos.includes(n)) return "demo";
  return undefined;
}

const VARIANTS_DIR = join(process.cwd(), "registry/default/variants");
const variantFiles = readdirSync(VARIANTS_DIR);

// Each variant file starts with `// title: …`; returns `prefix-1…N` titles in
// order and throws on a gap or a missing title so nothing shifts silently.
function variantTitles(prefix: string): string[] {
  const pattern = new RegExp(`^${prefix}-(\\d+)\\.tsx$`);
  const numbers = variantFiles
    .map((file) => Number(file.match(pattern)?.[1]))
    .filter(Boolean)
    .sort((a, b) => a - b);
  return numbers.map((n, i) => {
    const file = `${prefix}-${n}.tsx`;
    if (n !== i + 1) throw new Error(`${file}: expected ${prefix}-${i + 1}`);
    const title = readFileSync(join(VARIANTS_DIR, file), "utf-8").match(
      /^\/\/ title: (.+)/,
    )?.[1];
    if (!title) throw new Error(`${file}: first line must be // title: …`);
    return title.trim();
  });
}

// Utility function to create variants
function createVariant(options: {
  category: RegistryCategory;
  name: string;
  description?: string;
  dependencies?: string[];
  meta?: { className: string };
  role?: VariantRole;
}): ParticleItem {
  return {
    categories: categories(options.category),
    description: options.description ?? `Basic ${options.category}`,
    files: [{ path: `variants/${options.name}.tsx`, type: "registry:block" }],
    meta: {
      ...(options.meta ?? { className: "" }),
      ...(options.role && { role: options.role }),
    },
    name: options.name,
    registryDependencies: (options.dependencies ?? []).map(
      (d) => `@cnippet/${d}`,
    ),
    type: "registry:block",
  };
}

export const variants: ParticleItem[] = [
  // --- accordion ---
  ...variantTitles("v-accordion").map((description, i) =>
    createVariant({
      category: "accordion",
      dependencies: ["accordion"],
      description,
      meta: {
        className:
          "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]",
      },
      name: `v-accordion-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- alert ---
  ...variantTitles("v-alert").map((description, i) =>
    createVariant({
      category: "alert",
      dependencies: ["alert"],
      description,
      name: `v-alert-${i + 1}`,
    }),
  ),

  // --- alert-dialog ---
  ...variantTitles("v-alert-dialog").map((description, i) =>
    createVariant({
      category: "alert dialog",
      dependencies: ["alert-dialog"],
      description,
      name: `v-alert-dialog-${i + 1}`,
    }),
  ),

  // --- autocomplete ---
  ...variantTitles("v-autocomplete").map((description, i) =>
    createVariant({
      category: "autocomplete",
      dependencies: ["autocomplete"],
      description,
      name: `v-autocomplete-${i + 1}`,
      // #18 fakes chips above the input; Combobox chips (#8, #13, #23) do it properly.
      role: variantRole(i + 1, { demos: [...range(1, 9), 18], showcase: 21 }),
    }),
  ),

  // --- avatar ---
  ...variantTitles("v-avatar").map((description, i) =>
    createVariant({
      category: "avatar",
      dependencies: ["avatar"],
      description,
      name: `v-avatar-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 6), showcase: 22 }),
    }),
  ),

  // --- badge ---
  ...variantTitles("v-badge").map((description, i) =>
    createVariant({
      category: "badge",
      dependencies: ["badge"],
      description,
      name: `v-badge-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 12), showcase: 18 }),
    }),
  ),

  // --- banner ---
  ...variantTitles("v-banner").map((description, i) =>
    createVariant({
      category: "banner",
      dependencies: ["banner", "button"],
      description,
      name: `v-banner-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- breadcrumb ---
  ...variantTitles("v-breadcrumb").map((description, i) =>
    createVariant({
      category: "breadcrumb",
      dependencies: ["breadcrumb"],
      description,
      name: `v-breadcrumb-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 5), 8], showcase: 16 }),
    }),
  ),

  // --- button ---
  ...variantTitles("v-button").map((description, i) =>
    createVariant({
      category: "button",
      dependencies: ["button"],
      description,
      name: `v-button-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 19), showcase: 31 }),
    }),
  ),

  // --- calendar ---
  ...variantTitles("v-calendar").map((description, i) =>
    createVariant({
      category: "calendar",
      dependencies: ["calendar"],
      description,
      name: `v-calendar-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 6), showcase: 21 }),
    }),
  ),

  // --- card ---
  ...variantTitles("v-card").map((description, i) =>
    createVariant({
      category: "card",
      dependencies: ["card"],
      description,
      name: `v-card-${i + 1}`,
    }),
  ),

  // --- carousel ---
  ...variantTitles("v-carousel").map((description, i) =>
    createVariant({
      category: "carousel",
      dependencies: ["carousel"],
      description,
      name: `v-carousel-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- chart ---
  ...variantTitles("v-chart").map((description, i) =>
    createVariant({
      category: "chart",
      dependencies: ["chart"],
      description,
      name: `v-chart-${i + 1}`,
    }),
  ),

  // --- checkbox ---
  ...variantTitles("v-checkbox").map((description, i) =>
    createVariant({
      category: "checkbox",
      dependencies: ["checkbox"],
      description,
      name: `v-checkbox-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- checkbox-group ---
  ...variantTitles("v-checkbox-group").map((description, i) =>
    createVariant({
      category: "checkbox group",
      dependencies: ["checkbox-group"],
      description,
      name: `v-checkbox-group-${i + 1}`,
    }),
  ),

  // --- collapsible ---
  ...variantTitles("v-collapsible").map((description, i) =>
    createVariant({
      category: "collapsible",
      dependencies: ["collapsible"],
      description,
      name: `v-collapsible-${i + 1}`,
      // #3 and #11 are FAQs (accordion's job); #4 duplicates card #11.
      role: variantRole(i + 1, { demos: [1, 2, 3, 4, 11], showcase: 7 }),
    }),
  ),

  // --- color-picker ---
  ...variantTitles("v-color-picker").map((description, i) =>
    createVariant({
      category: "color picker",
      dependencies: ["color-picker", "button", "popover"],
      description,
      name: `v-color-picker-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- combobox ---
  ...variantTitles("v-combobox").map((description, i) =>
    createVariant({
      category: "combobox",
      dependencies: ["combobox"],
      description,
      name: `v-combobox-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 13), 16], showcase: 23 }),
    }),
  ),

  // --- command ---
  ...variantTitles("v-command").map((description, i) =>
    createVariant({
      category: "command",
      dependencies: ["command"],
      description,
      name: `v-command-${i + 1}`,
    }),
  ),

  // --- context-menu ---
  ...variantTitles("v-context-menu").map((description, i) =>
    createVariant({
      category: "context menu",
      dependencies: ["menu"],
      description,
      name: `v-context-menu-${i + 1}`,
    }),
  ),

  // --- data-table ---
  ...variantTitles("v-data-table").map((description, i) =>
    createVariant({
      category: "data table",
      dependencies: [
        "data-table",
        "badge",
        "button",
        "menu",
        "avatar",
        "progress",
      ],
      description,
      meta: {
        className:
          "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[90%]",
      },
      name: `v-data-table-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 8 }),
    }),
  ),

  // --- date-picker ---
  ...variantTitles("v-date-picker").map((description, i) =>
    createVariant({
      category: "date picker",
      dependencies: ["date-picker"],
      description,
      name: `v-date-picker-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 2, 3, 6], showcase: 16 }),
    }),
  ),

  // --- dialog ---
  ...variantTitles("v-dialog").map((description, i) =>
    createVariant({
      category: "dialog",
      dependencies: ["dialog"],
      description,
      name: `v-dialog-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 3], showcase: 9 }),
    }),
  ),

  // --- drawer ---
  ...variantTitles("v-drawer").map((description, i) =>
    createVariant({
      category: "drawer",
      dependencies: ["drawer"],
      description,
      name: `v-drawer-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 2, 3], showcase: 7 }),
    }),
  ),

  // --- empty ---
  ...variantTitles("v-empty").map((description, i) =>
    createVariant({
      category: "empty state",
      dependencies: [],
      description,
      name: `v-empty-${i + 1}`,
    }),
  ),

  // --- field ---
  ...variantTitles("v-field").map((description, i) =>
    createVariant({
      category: "field",
      dependencies: ["field"],
      description,
      name: `v-field-${i + 1}`,
      // "Field with <X>" integrations stay in docs; #17 combines them.
      role: variantRole(i + 1, {
        demos: [...range(1, 16), 18, 19, 20],
        showcase: 17,
      }),
    }),
  ),

  // --- fieldset ---
  ...variantTitles("v-fieldset").map((description, i) =>
    createVariant({
      category: "fieldset",
      dependencies: ["fieldset"],
      description,
      name: `v-fieldset-${i + 1}`,
    }),
  ),

  // --- file-upload ---
  ...variantTitles("v-file-upload").map((description, i) =>
    createVariant({
      category: "file upload",
      dependencies: ["file-upload", "alert", "button", "input-group"],
      description,
      name: `v-file-upload-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 3 }),
    }),
  ),

  // --- form ---
  ...variantTitles("v-form").map((description, i) =>
    createVariant({
      category: "form",
      dependencies: ["form"],
      description,
      name: `v-form-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 2], showcase: 9 }),
    }),
  ),

  // --- frame ---
  ...variantTitles("v-frame").map((description, i) =>
    createVariant({
      category: "frame",
      dependencies: ["frame"],
      description,
      name: `v-frame-${i + 1}`,
    }),
  ),

  // --- group ---
  ...variantTitles("v-group").map((description, i) =>
    createVariant({
      category: "group",
      dependencies: ["group"],
      description,
      name: `v-group-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 3, 4, 5], showcase: 19 }),
    }),
  ),

  // --- input ---
  ...variantTitles("v-input").map((description, i) =>
    createVariant({
      category: "input",
      dependencies: ["input"],
      description,
      name: `v-input-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 10), 12], showcase: 26 }),
    }),
  ),

  // --- input-group ---
  ...variantTitles("v-input-group").map((description, i) =>
    createVariant({
      category: "input group",
      dependencies: ["input-group"],
      description,
      name: `v-input-group-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 10), showcase: 22 }),
    }),
  ),

  // --- kbd ---
  ...variantTitles("v-kbd").map((description, i) =>
    createVariant({
      category: "kbd",
      dependencies: ["kbd"],
      description,
      name: `v-kbd-${i + 1}`,
    }),
  ),

  // --- label ---
  // Each of 1–15 decorates a single field; the docs page explains them one by
  // one, and Explore shows the showcase that combines them.
  ...variantTitles("v-label").map((description, i) =>
    createVariant({
      category: "label",
      dependencies: ["label"],
      description,
      name: `v-label-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 15), showcase: 16 }),
    }),
  ),

  // --- menu ---
  ...variantTitles("v-menu").map((description, i) =>
    createVariant({
      category: "menu",
      dependencies: ["menu"],
      description,
      name: `v-menu-${i + 1}`,
      // #1 already combines groups, checkbox, radio, switch and submenus.
      role: variantRole(i + 1, { demos: range(2, 9), showcase: 1 }),
    }),
  ),

  // --- meter ---
  ...variantTitles("v-meter").map((description, i) =>
    createVariant({
      category: "meter",
      dependencies: ["meter"],
      description,
      name: `v-meter-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- navigation-menu ---
  ...variantTitles("v-navigation-menu").map((description, i) =>
    createVariant({
      category: "navigation menu",
      dependencies: ["navigation-menu"],
      description,
      name: `v-navigation-menu-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- number-field ---
  ...variantTitles("v-number-field").map((description, i) =>
    createVariant({
      category: "number field",
      dependencies: ["number-field"],
      description,
      name: `v-number-field-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 8), showcase: 16 }),
    }),
  ),

  // --- otp-field ---
  ...variantTitles("v-otp-field").map((description, i) =>
    createVariant({
      category: "input otp",
      dependencies: ["otp-field"],
      description,
      name: `v-otp-field-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- pagination ---
  ...variantTitles("v-pagination").map((description, i) =>
    createVariant({
      category: "pagination",
      dependencies: ["pagination"],
      description,
      name: `v-pagination-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 21 }),
    }),
  ),

  // --- popover ---
  ...variantTitles("v-popover").map((description, i) =>
    createVariant({
      category: "popover",
      dependencies: ["popover"],
      description,
      name: `v-popover-${i + 1}`,
      role: variantRole(i + 1, { demos: [5], showcase: 1 }),
    }),
  ),

  // --- preview-card ---
  ...variantTitles("v-preview-card").map((description, i) =>
    createVariant({
      category: "preview card",
      dependencies: ["preview-card"],
      description,
      name: `v-preview-card-${i + 1}`,
    }),
  ),

  // --- progress ---
  ...variantTitles("v-progress").map((description, i) =>
    createVariant({
      category: "progress",
      dependencies: ["progress"],
      description,
      name: `v-progress-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 2), showcase: 16 }),
    }),
  ),

  // --- radio-group ---
  ...variantTitles("v-radio-group").map((description, i) =>
    createVariant({
      category: "radio group",
      dependencies: ["radio-group"],
      description,
      name: `v-radio-group-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- rating ---
  ...variantTitles("v-rating").map((description, i) =>
    createVariant({
      category: "rating",
      dependencies: ["rating", "button", "label", "textarea", "progress"],
      description,
      name: `v-rating-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- resizable ---
  ...variantTitles("v-resizable").map((description, i) =>
    createVariant({
      category: "resizable",
      dependencies: ["resizable"],
      description,
      name: `v-resizable-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- scroll-area ---
  ...variantTitles("v-scroll-area").map((description, i) =>
    createVariant({
      category: "scroll area",
      dependencies: ["scroll-area"],
      description,
      name: `v-scroll-area-${i + 1}`,
    }),
  ),

  // --- select ---
  ...variantTitles("v-select").map((description, i) =>
    createVariant({
      category: "select",
      dependencies: ["select"],
      description,
      name: `v-select-${i + 1}`,
    }),
  ),

  // --- separator ---
  ...variantTitles("v-separator").map((description, i) =>
    createVariant({
      category: "separator",
      dependencies: ["separator"],
      description,
      name: `v-separator-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 2), showcase: 16 }),
    }),
  ),

  // --- sheet ---
  ...variantTitles("v-sheet").map((description, i) =>
    createVariant({
      category: "sheet",
      dependencies: ["sheet"],
      description,
      name: `v-sheet-${i + 1}`,
    }),
  ),

  // --- sidebar ---
  ...variantTitles("v-sidebar").map((description, i) =>
    createVariant({
      category: "sidebar",
      dependencies: ["sidebar", "avatar", "collapsible", "label", "separator"],
      description,
      meta: {
        className:
          "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[90%]",
      },
      name: `v-sidebar-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- skeleton ---
  ...variantTitles("v-skeleton").map((description, i) =>
    createVariant({
      category: "skeleton",
      dependencies: ["skeleton"],
      description,
      name: `v-skeleton-${i + 1}`,
    }),
  ),

  // --- slider ---
  ...variantTitles("v-slider").map((description, i) =>
    createVariant({
      category: "slider",
      dependencies: ["slider"],
      description,
      name: `v-slider-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- sortable ---
  ...variantTitles("v-sortable").map((description, i) =>
    createVariant({
      category: "sortable",
      dependencies: ["sortable", "avatar", "badge", "checkbox"],
      description,
      // The Kanban board needs the full preview width for three columns.
      ...(i === 4 && {
        meta: {
          className:
            "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[90%]",
        },
      }),
      name: `v-sortable-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- spinner ---
  ...variantTitles("v-spinner").map((description, i) =>
    createVariant({
      category: "spinner",
      dependencies: ["spinner"],
      description,
      name: `v-spinner-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 9, 15], showcase: 16 }),
    }),
  ),

  // --- stepper ---
  ...variantTitles("v-stepper").map((description, i) =>
    createVariant({
      category: "stepper",
      dependencies: ["stepper", "button", "badge"],
      description,
      name: `v-stepper-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- switch ---
  ...variantTitles("v-switch").map((description, i) =>
    createVariant({
      category: "switch",
      dependencies: ["switch"],
      description,
      name: `v-switch-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- table ---
  ...variantTitles("v-table").map((description, i) =>
    createVariant({
      category: "table",
      dependencies: ["table"],
      description,
      name: `v-table-${i + 1}`,
      role: variantRole(i + 1, { demos: range(2, 4), showcase: 1 }),
    }),
  ),

  // --- tabs ---
  ...variantTitles("v-tabs").map((description, i) =>
    createVariant({
      category: "tabs",
      dependencies: ["tabs"],
      description,
      name: `v-tabs-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 4), 6, 8], showcase: 18 }),
    }),
  ),

  // --- tag-input ---
  ...variantTitles("v-tag-input").map((description, i) =>
    createVariant({
      category: "tag input",
      dependencies: ["tag-input", "button", "field", "label"],
      description,
      name: `v-tag-input-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- textarea ---
  ...variantTitles("v-textarea").map((description, i) =>
    createVariant({
      category: "textarea",
      dependencies: ["textarea"],
      description,
      name: `v-textarea-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 7), showcase: 13 }),
    }),
  ),

  // --- time-picker ---
  ...variantTitles("v-time-picker").map((description, i) =>
    createVariant({
      category: "time picker",
      dependencies: ["time-picker", "button", "label", "switch"],
      description,
      name: `v-time-picker-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- timeline ---
  ...variantTitles("v-timeline").map((description, i) =>
    createVariant({
      category: "timeline",
      dependencies: ["timeline", "avatar", "badge"],
      description,
      name: `v-timeline-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 1 }),
    }),
  ),

  // --- toast ---
  ...variantTitles("v-toast").map((description, i) =>
    createVariant({
      category: "toast",
      dependencies: ["toast"],
      description,
      name: `v-toast-${i + 1}`,
    }),
  ),

  // --- toggle ---
  ...variantTitles("v-toggle").map((description, i) =>
    createVariant({
      category: "toggle",
      dependencies: ["toggle"],
      description,
      name: `v-toggle-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 8), showcase: 16 }),
    }),
  ),

  // --- toggle-group ---
  ...variantTitles("v-toggle-group").map((description, i) =>
    createVariant({
      category: "toggle group",
      dependencies: ["toggle-group"],
      description,
      name: `v-toggle-group-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 5), showcase: 16 }),
    }),
  ),

  // --- toolbar ---
  ...variantTitles("v-toolbar").map((description, i) =>
    createVariant({
      category: "toolbar",
      dependencies: ["toolbar"],
      description,
      name: `v-toolbar-${i + 1}`,
    }),
  ),

  // --- tooltip ---
  ...variantTitles("v-tooltip").map((description, i) =>
    createVariant({
      category: "tooltip",
      dependencies: ["tooltip"],
      description,
      name: `v-tooltip-${i + 1}`,
    }),
  ),
];
