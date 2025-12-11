/**
 * Registry Categories Type Definition
 *
 * This file defines all valid categories that can be used in registry items.
 * Categories are divided into:
 * - Component categories: Main UI components (e.g., "input", "button")
 * - Tag categories: Additional tags/features (e.g., "loading", "disabled")
 */

// Main component categories (UI primitives)
export const componentCategories = [
  "accordion",
  "alert",
  "alert dialog",
  "autocomplete",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "checkbox group",
  "collapsible",
  "combobox",
  "context-menu",
  "dialog",
  "empty state",
  "field",
  "fieldset",
  "form",
  "frame",
  "group",
  "input",
  "input group",
  "kbd",
  "label",
  "menu",
  "meter",
  "number field",
  "pagination",
  "popover",
  "preview card",
  "progress",
  "radio group",
  "scroll area",
  "select",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle group",
  "toolbar",
  "tooltip",
] as const;

// Tag categories (features, states, modifiers)
export const tagCategories = [
  "async",
  "copy",
  "disabled",
  "error",
  "file",
  "filter",
  "info",
  "loading",
  "multiselect",
  "password",
  "search",
  "sort",
  "success",
  "tag",
  "tanstack",
  "text editor",
  "time",
  "upload",
  "validation",
  "warning",
  "zod",
] as const;

// Combined categories array in custom order (components first, then tags)
export const registryCategories = [
  ...componentCategories,
  ...tagCategories,
] as const;

export type ComponentCategory = (typeof componentCategories)[number];
export type TagCategory = (typeof tagCategories)[number];
export type RegistryCategory = (typeof registryCategories)[number];

// Helper function to check if a category is a component category
export function isComponentCategory(
  category: string,
): category is ComponentCategory {
  return componentCategories.includes(category as ComponentCategory);
}

// Helper function to check if a category is a tag category
export function isTagCategory(category: string): category is TagCategory {
  return tagCategories.includes(category as TagCategory);
}

// Custom order for display (components first, then tags)
export const categoryDisplayOrder: RegistryCategory[] = [
  ...componentCategories,
  ...tagCategories,
];

// Helper function to get category sort order
export function getCategorySortOrder(category: string): number {
  const index = categoryDisplayOrder.indexOf(category as RegistryCategory);
  return index === -1 ? Number.POSITIVE_INFINITY : index;
}

// Helper function to validate if a string is a valid RegistryCategory
export function isValidRegistryCategory(
  category: string,
): category is RegistryCategory {
  return registryCategories.includes(category as RegistryCategory);
}
