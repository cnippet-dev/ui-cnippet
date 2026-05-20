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
      description: [
        "Default",
        "With Icon",
        "With Icon and Action Buttons",
        "Info Alert",
        "Success Alert",
        "Warning Alert",
        "Error Alert",
        "Stacked alerts within a Frame",
        "Alert with actions integrated within a Frame",
        "Feature discovery alert",
      ][i],
      name: `v-alert-${i + 1}`,
    }),
  ),

  // --- alert-dialog ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "alert dialog",
      dependencies: ["alert-dialog"],
      description: [
        "Default",
        "Small Size Alert Dialog",
        "Alert Dialog Within A Standard Dialog",
        "Task Success Confirmation",
        "Account Deactivation Confirmation",
        "Warning For Unsaved Changes",
        "Confirmation For Successful e-ticket Registration",
        "System Update Notification",
        "Billing Warning For Expired Subscriptions",
        "Logout Confirmation Dialog",
      ][i],
      name: `v-alert-dialog-${i + 1}`,
    }),
  ),

  // --- autocomplete ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "autocomplete",
      dependencies: ["autocomplete"],
      description: [
        "Default",
        "Sizes",
        "With Label",
        "Inline Autocomplete",
        "Auto Highlight",
        "With Trigger and Clear Buttons",
        "With Clear Button",
        "With Search Icon",
        "Grouped Items",
        "Limit Results",
        "Async Search",
        "Form Integration",
        "Timezone Picker",
        "Person Picker",
      ][i],
      name: `v-autocomplete-${i + 1}`,
    }),
  ),

  // --- avatar ---
  ...Array.from({ length: 16 }, (_, i) =>
    createVariant({
      category: "avatar",
      dependencies: ["avatar"],
      description: [
        "Default",
        "With Fallback",
        "Different Sizes",
        "Different Radius",
        "Avatar Group",
        "Avatar Group With Numeric Count",
        "With Details and Badge",
        "Avatar Social Proof With Text Label",
        "Compact Social Proof With Initials",
        "With Hover Effect",
        "With Hover Effect & Tooltips",
        "Avatar Inside An Empty State Example",
        "With Loading State Demonstration",
        "With Custom Badge",
        "With Ring Animation",
        "With Dropdown Menu",
      ][i],
      name: `v-avatar-${i + 1}`,
    }),
  ),

  // --- badge ---
  ...Array.from({ length: 12 }, (_, i) =>
    createVariant({
      category: "badge",
      dependencies: ["badge"],
      description: [
        "Default",
        "Outline",
        "Secondary",
        "Destructive",
        "Info",
        "Success",
        "Warning",
        "Error",
        "Size Variations",
        "With Icon",
        "With Link",
        "With Count",
      ][i],
      name: `v-badge-${i + 1}`,
    }),
  ),

  // --- breadcrumb ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "breadcrumb",
      dependencies: ["breadcrumb"],
      description: [
        "Default",
        "With custom separator",
        "With Dropdown Menu",
        "With Next.js Link",
        "With Icons For Each Item",
        "With Avatar",
        "Inside Card",
        "Starting With Home Icon",
        "Button-style",
        "With Project, Sser and Document Info",
      ][i],
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
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "calendar",
      dependencies: ["calendar"],
      description: [
        "Default",
        "Fallback Only",
        "Different Sizes",
        "Dropdown Navigation",
        "Custom Select Dropdown",
        "Custom Combobox Dropdown",
        "Multiple Selection",
        "Appointment Booking",
        "Two-Month Range Picker",
        "Event Indicators",
        "Date Picker with Presets",
        "Date of Birth",
        "Week Picker",
      ][i],
      name: `v-calendar-${i + 1}`,
    }),
  ),

  // --- card ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "card",
      dependencies: ["card"],
      description: [
        "Default",
        "With Border",
        "With Border Separation",
        "With Link",
        "With Dropdown Menu",
        "With Image",
        "With Image Scale Hover Effect",
        "With Image and Shadow Fade Effect",
        "With Stacked depth Effect",
        "Login Form Card",
        "Expandable Content Card",
        "With Overflow Menu",
        "With Header Badge & Actions",
        "With Icon, Title and Link",
        "With Header Label and Link",
      ][i],
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
      description: [
        "Default",
        "Disabled",
        "With Description",
        "Card Style",
        "Form Integration",
        "Payment method card checkbox",
      ][i],
      name: `v-checkbox-${i + 1}`,
    }),
  ),

  // --- checkbox-group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "checkbox group",
      dependencies: ["checkbox-group"],
      description: [
        "Default",
        "With Disabled Item",
        "Parent Checkbox",
        "Nested Parent Checkbox",
        "Form Integration",
      ][i],
      name: `v-checkbox-group-${i + 1}`,
    }),
  ),

  // --- collapsible ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "collapsible",
      dependencies: ["collapsible"],
      description: [
        "Default",
        "Collapsible",
        "Collapsible animated card",
        "Collapsible card with bottom trigger",
        "Collapsible form fields",
        "Multi-level collapsible menu",
        "Tree view with file actions",
      ][i],
      name: `v-collapsible-${i + 1}`,
    }),
  ),

  // --- combobox ---
  ...Array.from({ length: 17 }, (_, i) =>
    createVariant({
      category: "combobox",
      dependencies: ["combobox"],
      description: [
        "Default",
        "Disabled",
        "Sizes",
        "With Label",
        "Auto Highlight",
        "With Clear Button",
        "With Groups",
        "Multiple Selection",
        "With Search Icon",
        "With Trigger Button",
        "With Select Button",
        "Form Integration",
        "Form Integration - Multiple",
        "Async Search",
        "Rich Item Rendering",
        "Controlled",
      ][i],
      name: `v-combobox-${i + 1}`,
    }),
  ),

  // --- command ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "command",
      dependencies: ["command"],
      description: [
        "Default",
        "Simple Command",
        "Command With Groups",
        "Command With File Search",
        "User Search Command With Avatars",
        "Action Palette With Keyboard Shortcuts",
        "With Recent And Favorites Sections",
      ][i],
      name: `v-command-${i + 1}`,
    }),
  ),

  // --- context-menu ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "context menu",
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
      description: [
        "Default",
        "Open from a Menu",
        "Dialog with Bare Footer",
        "Dialog with scroll inside",
        "Nested Dialogs",
        "With Destructive Action",
        "Cookie Preferences",
        "Session Expired",
        "Edit Profile with Avatar",
        "Invite Team Members",
      ][i],
      name: `v-dialog-${i + 1}`,
    }),
  ),

  // --- drawer ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "drawer",
      dependencies: ["drawer"],
      description: [
        "Default",
        "Multiple Positions — Inset",
        "Multiple Positions — Straight",
        "Multi-step Nested Drawers",
        "Navigation Menu",
        "Filter & Sort Panel",
        "Shopping Cart",
        "Notification Center",
      ][i],
      name: `v-drawer-${i + 1}`,
    }),
  ),

  // --- empty ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "empty state",
      dependencies: [],
      description: [
        "Default",
        "Search empty state",
        "Empty state with search input",
        "Empty state with add button",
        "Dashed upload empty state",
        "No automations empty state with toggle illustration",
        "No products empty state with stacked cards and blur effect",
        "No payments empty state with credit card illustration",
        "No events empty state with calendar illustration",
      ][i],
      name: `v-empty-${i + 1}`,
    }),
  ),

  // --- field ---
  ...Array.from({ length: 20 }, (_, i) =>
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
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "group",
      dependencies: ["group"],
      description: [
        "Default",
        "With Input",
        "Small Size",
        "Large Size",
        "With Disabled Button",
        "With Default Buttons",
        "With Start Labeled Text",
        "With End Text",
        "Vertical",
        "Nested Groups",
        "With Popup",
        "With Input Group",
        "With Menu",
        "With Select",
      ][i],
      name: `v-group-${i + 1}`,
    }),
  ),

  // --- input ---
  ...Array.from({ length: 20 }, (_, i) =>
    createVariant({
      category: "input",
      dependencies: ["input"],
      description: [
        "Default",
        "With Label",
        "With Description",
        "With Error Message",
        "With Character Counter",
        "With Password Type",
        "With Phone Type",
        "With URL Type",
        "With Number Type",
        "With Date Type",
        "With File Type",
        "With Required Indicator",
        "With Time Type",
        "With Multiple Fields",
        "Input label with tooltip",
        "With Badge",
        "With Optional Badge",
        "With Link and Visibility Toggle",
        "with multiple error messages",
        "Basic password strength with dynamic hint and icons",
      ][i],
      name: `v-input-${i + 1}`,
    }),
  ),

  // --- input-group ---
  ...Array.from({ length: 20 }, (_, i) =>
    createVariant({
      category: "input group",
      dependencies: ["input-group"],
      description: [
        "Default",
        "With End Icon",
        "With Start Text",
        "With End Text",
        "With Start and End Text",
        "With Tooltip",
        "With Icon Button",
        "With Button",
        "With Badge",
        "With Keyboard Shortcut",
        "With Inner Label",
        "Sizes",
        "Disabled",
        "Loading",
        "With Number Field",
        "With Textarea",
      ][i],
      name: `v-input-group-${i + 1}`,
    }),
  ),

  // --- kbd ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "kbd",
      dependencies: ["kbd"],
      description: [
        "Default",
        "Input group",
        "Keys grouped together",
        "With icons",
        "In a tooltip",
        "Reference list",
      ][i],
      name: `v-kbd-${i + 1}`,
    }),
  ),

  // --- label ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "label",
      dependencies: ["label"],
      description: [
        "Default",
        "With checkbox",
        "With textarea field",
        "With required indicator",
        "With optional indicator",
        "With tooltip info icon",
        "With badge indicator",
        "With character counter",
        "With helper description text",
        "With status indicator dot",
      ][i],
      name: `v-label-${i + 1}`,
    }),
  ),

  // --- menu ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "menu",
      dependencies: ["menu"],
      description: [
        "Default",
        "Open on Hover",
        "With Checkbox",
        "With Switch",
        "With Radio Group",
        "With Link",
        "With Group Label",
        "Nested Menu",
        "Close on Click",
        "Open a Dialog",
      ][i],
      name: `v-menu-${i + 1}`,
    }),
  ),

  // --- meter ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "meter",
      dependencies: ["meter"],
      description: [
        "Default",
        "With Label",
        "With Formatted Value",
        "With Range",
      ][i],
      name: `v-meter-${i + 1}`,
    }),
  ),

  // --- number-field ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "number field",
      dependencies: ["number-field"],
      description: [
        "Default",
        "Sizes",
        "Disabled",
        "With External Label",
        "With Scrub",
        "With Range",
        "With Formatted Value",
        "With Step",
        "Form Integration",
      ][i],
      name: `v-number-field-${i + 1}`,
    }),
  ),

  // --- otp-field ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "input otp",
      dependencies: ["otp-field"],
      description: [
        "Default",
        "Large",
        "With Separator",
        "With Label",
        "Custom sanitization",
        "Auto Validation",
        "Alphanumeric",
        "Placeholder hints",
        "Masked entry",
      ][i],
      name: `v-otp-field-${i + 1}`,
    }),
  ),

  // --- pagination ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "pagination",
      dependencies: ["pagination"],
      description: [
        "Default",
        "Without Labels",
        "With Hover Effect",
        "With Circle Buttons",
        "With Go-To-Page Input",
        "Numbered Pagination In Card",
        "With Arrows Buttons",
        "With Page Info On Center",
        "With Page Info On Left",
        "With Outline Style Buttons",
        "With Page Select Dropdown And First/Last Navigation",
        "Numbered Pagination With Go-To-Page Input",
        "With Page Info, Numbered Pages, Ellipsis, and Per-Page Select",
      ][i],
      name: `v-pagination-${i + 1}`,
    }),
  ),

  // --- popover ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "popover",
      dependencies: ["popover"],
      description: [
        "Default",
        "With Close Button",
        "Tooltip Style",
        "Animated Popovers",
        "Shared Popover with Multiple Triggers",
        "Placement",
        "User Profile Card",
        "Timestamp Detail",
        "Quick Settings",
        "Feature Tour",
        "Share Link",
        "Accent Color Picker",
        "Keyboard Shortcuts",
        "Filter Panel",
        "Set a Reminder",
        "System Status",
      ][i],
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
      description: [
        "Default",
        "With Formatted Value",
        "With status messages",
        "With slider",
        "Multi-step progress indicator",
        "With custom colors",
      ][i],
      name: `v-progress-${i + 1}`,
    }),
  ),

  // --- radio-group ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "radio group",
      dependencies: ["radio-group"],
      description: [
        "Default",
        "Disabled",
        "With Description",
        "Card Style",
        "Colored Variants",
        "With Legend",
        "In Card With Description",
        "In Card With Icons",
        "Form Integration",
      ][i],
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
      description: [
        "Default",
        "Sheet with Inset",
        "Side Sheets",
        "Scrollable Content",
        "Shopping Cart",
        "Notification Center",
        "Team Invite",
        "Activity Log",
        "Navigation Menu",
        "Issue Detail",
      ][i],
      name: `v-sheet-${i + 1}`,
    }),
  ),

  // --- skeleton ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "skeleton",
      dependencies: ["skeleton"],
      description: [
        "Default",
        "Skeleton only",
        "Card component",
        "Dashboard stats row",
        "List with actions",
      ][i],
      name: `v-skeleton-${i + 1}`,
    }),
  ),

  // --- slider ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "slider",
      dependencies: ["slider"],
      description: [
        "Default",
        "With Label and Value",
        "Disabled",
        "With Reference Labels",
        "With Tick Marks",
        "With Dynamic Tooltip Indicator",
        "Rating Slider With Emoji Feedback",
      ][i],
      name: `v-slider-${i + 1}`,
    }),
  ),

  // --- spinner ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "spinner",
      dependencies: ["spinner"],
      description: [
        "Default",
        "Input Group",
        "In buttons",
        "Spinner in empty state",
        "Overlay loading spinner",
        "Full page loading state",
        "Inline loading text with spinner",
        "overlay on card",
        "Color variants",
      ][i],
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
      description: [
        "Default",
        "Card-style table",
        "Table in CardFrame",
        "Table in Frame",
        "Orders table with customer info and payment status",
        "Team members table with avatars, roles, and status",
        "Subscriptions table with plan badges and billing info",
      ][i],
      name: `v-table-${i + 1}`,
    }),
  ),

  // --- tabs ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "tabs",
      dependencies: ["tabs"],
      description: [
        "Default",
        "Underline Variant",
        "Vertical Orientation",
        "Underline with Vertical Orientation",
        "With Card and Input Element",
        "Underline Style",
        "Vertical Orientation",
        "Underline and Vertical Orientation",
        "With Icons",
        "With Badge Counts",
        "With Icons And Line Variant",
        "Segmented Control Tabs",
      ][i],
      name: `v-tabs-${i + 1}`,
    }),
  ),

  // --- textarea ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "textarea",
      dependencies: ["textarea"],
      description: [
        "Default",
        "Sizes",
        "Disabled",
        "With Label",
        "With Description",
        "With Character Count",
        "Form Integration",
      ][i],
      name: `v-textarea-${i + 1}`,
    }),
  ),

  // --- toast ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toast",
      dependencies: ["toast"],
      description: [
        "Default",
        "With Status",
        "Loading",
        "With Action",
        "Promise",
        "With Varying Heights",
        "Submit Button with Error Toast",
      ][i],
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
  ...Array.from({ length: 12 }, (_, i) =>
    createVariant({
      category: "tooltip",
      dependencies: ["tooltip"],
      description: [
        "Default",
        "Grouped Tooltips",
        "Animated Tooltips",
        "Placement",
        "Info Icon",
        "Rich Tooltip",
        "Keyboard Shortcut Toolbar",
        "Avatar Stack",
        "Trend Metrics",
        "Color Palette Inspector",
        "Copy to Clipboard",
        "Feature Gate",
      ][i],
      name: `v-tooltip-${i + 1}`,
    }),
  ),
];
