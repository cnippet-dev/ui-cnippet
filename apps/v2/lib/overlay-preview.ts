// Overlay variants hide their UI behind a trigger, so Explore renders them in
// an isolated iframe that opens the overlay on load. The iframe keeps each
// modal's portal, scroll lock and focus trap away from the page and the other
// cards.

// "trigger": open the first overlay trigger the variant renders.
// "toast": toast variants fire from a plain button instead.
export type OverlayOpenMode = "toast" | "trigger";

export const OVERLAY_CATEGORIES: Record<string, OverlayOpenMode> = {
  "alert dialog": "trigger",
  command: "trigger",
  "context menu": "trigger",
  dialog: "trigger",
  drawer: "trigger",
  menu: "trigger",
  popover: "trigger",
  "preview card": "trigger",
  sheet: "trigger",
  toast: "toast",
};

// Top-level triggers only: sub-menu triggers and tooltips are skipped.
export const OVERLAY_TRIGGER_SELECTOR = [
  "alert-dialog-trigger",
  "command-dialog-trigger",
  "context-menu-trigger",
  "dialog-trigger",
  "drawer-trigger",
  "menu-trigger",
  "popover-trigger",
  "preview-card-trigger",
  "sheet-trigger",
]
  .map((slot) => `[data-slot="${slot}"]`)
  .join(",");

export function isOverlayCategory(category: string): boolean {
  return category in OVERLAY_CATEGORIES;
}

export function overlayPreviewUrl(name: string): string {
  return `/preview/${name}`;
}
