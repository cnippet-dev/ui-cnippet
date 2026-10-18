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
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Changelog / Release Notes with versioned entries",
        "Searchable FAQ with live keyword filter",
        "Settings sidebar navigation with icon sections",
        "Job board listings with requirements and apply action",
        "Onboarding step tracker with completion state",
        "Product specifications table by category",
        "Showcase: single and multiple",
      ][i],
      meta: {
        className:
          "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[80%]",
      },
      name: `v-accordion-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- alert ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Dismissible announcement banner with CTA",
        "Cookie consent banner with accept and decline",
        "Storage limit warning with usage progress bar",
        "Update available with async install feedback",
        "Email verification with resend countdown",
      ][i],
      name: `v-alert-${i + 1}`,
    }),
  ),

  // --- alert-dialog ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "File Overwrite Confirmation with three-way choice",
        "Subscription Downgrade Warning with feature loss list",
        "Transfer Ownership with typed confirmation input",
        "Clear All Data with checkbox consent gate",
        "Rate Limit Exceeded with live countdown timer",
      ][i],
      name: `v-alert-dialog-${i + 1}`,
    }),
  ),

  // --- autocomplete ---
  ...Array.from({ length: 21 }, (_, i) =>
    createVariant({
      category: "autocomplete",
      dependencies: ["autocomplete"],
      description: [
        "Default",
        "Disabled",
        "Sizes",
        "With Label",
        "Inline Autocomplete",
        "Auto Highlight",
        "With Clear Button",
        "With Trigger and Clear Buttons",
        "With Search Icon",
        "Grouped Items",
        "Limit Results",
        "Async Search",
        "Form Integration",
        "Timezone Picker",
        "Person Picker",
        "Country picker with flag and ISO code",
        "Repository picker with language and star count",
        "Multi-select tag input with dismissible chip pills",
        "Priority selector with icon and description",
        "Tech stack picker grouped by category",
        "Showcase: clear, trigger, groups, sizes and disabled",
      ][i],
      name: `v-autocomplete-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 9), showcase: 21 }),
    }),
  ),

  // --- avatar ---
  ...Array.from({ length: 22 }, (_, i) =>
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
        "Team grid with online presence status dots",
        "Pull request comment thread",
        "Interactive assignee picker with selection state",
        "Contributor leaderboard with rank and commit count",
        "Profile card with stats and action buttons",
        "Showcase: sizes, radius, fallback and group",
      ][i],
      name: `v-avatar-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 6), showcase: 22 }),
    }),
  ),

  // --- badge ---
  ...Array.from({ length: 18 }, (_, i) =>
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
        "Status dot indicators (Online, Busy, Away, Offline)",
        "Release channel tags (Stable, Beta, Experimental, Deprecated)",
        "Subscription plan tiers with pricing",
        "Notification category badges with unread counts",
        "Priority labels in a task list",
        "Showcase: variants, sizes, icons and counts",
      ][i],
      name: `v-badge-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 12), showcase: 18 }),
    }),
  ),

  // --- breadcrumb ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "File path breadcrumb with folder and file icons in monospace",
        "Checkout step progress breadcrumb with numbered circles and navigation buttons",
        "Admin hierarchy breadcrumb with colored icon badges per level",
        "Page header breadcrumb with edit and share action buttons",
        "Compact breadcrumb with ellipsis and hidden-items count badge",
        "Showcase: separators, home icon and ellipsis",
      ][i],
      name: `v-breadcrumb-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 5), 8], showcase: 16 }),
    }),
  ),

  // --- button ---
  ...Array.from({ length: 31 }, (_, i) =>
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
        "Social login buttons with GitHub, Google, and email options",
        "Loading and success state button with animated icon swap",
        "File upload button with attachment preview and clear action",
        "Split button with primary action and dropdown menu via Group",
        "Segmented view toggle with list, table, and kanban options",
        "Showcase: variants, sizes, icons and states",
      ][i],
      name: `v-button-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 19), showcase: 31 }),
    }),
  ),

  // --- calendar ---
  ...Array.from({ length: 21 }, (_, i) =>
    createVariant({
      category: "calendar",
      dependencies: ["calendar"],
      description: [
        "Default",
        "Larger cell size",
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
        "Holiday highlights with name on select",
        "Hotel stay check-in and check-out",
        "Habit tracker with completion indicators and monthly streak counter",
        "Sprint planner with two-month range selection and duration stats",
        "Time off request with leave type selector and range picker",
        "Mini year view with all 12 months in a compact grid",
        "Time slot booking with available/booked slot grid and confirmation",
        "Showcase: single date and range with dropdowns",
      ][i],
      name: `v-calendar-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 6), showcase: 21 }),
    }),
  ),

  // --- card ---
  ...Array.from({ length: 20 }, (_, i) =>
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
        "GitHub repository list cards with language, star, and fork counts",
        "Settings card with sidebar navigation and swappable content panels",
        "Pricing plan card with feature checklist and highlighted ring",
        "Event card with date, time, location, attendee count, and RSVP button",
        "Stats dashboard grid with four metric tiles and trend indicators",
      ][i],
      name: `v-card-${i + 1}`,
    }),
  ),

  // --- carousel ---
  ...Array.from({ length: 16 }, (_, i) =>
    createVariant({
      category: "carousel",
      dependencies: ["carousel"],
      description: [
        "Default",
        "Multiple Items",
        "Custom Spacing",
        "Vertical Orientation",
        "Autoplay with Indicators",
        "Testimonials",
        "Product Showcase",
        "Onboarding Steps",
        "Team Members",
        "Gallery with Thumbnails",
        "Testimonial carousel with avatar, quote, and dot indicators",
        "Pricing plan carousel with arrow navigation and highlighted active plan",
        "Media gallery carousel with caption badge and progress dots",
        "Changelog carousel with drag-free multi-slide and version tags",
        "Feature highlight carousel with icon slides and Prev/Next controls",
        "Showcase: horizontal and vertical",
      ][i],
      name: `v-carousel-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- chart ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "chart",
      dependencies: ["chart"],
      description: [
        "Multi-Series Bar Chart",
        "Area Chart",
        "Bar Chart",
        "Line Chart",
        "Pie Chart",
        "Radar Chart",
        "Radial Bar Chart",
        "Stacked monthly expense bars",
        "Scatter plot of scores",
        "Revenue bars with target reference line",
        "Stacked area chart with two revenue series and a Y-axis legend",
        "Horizontal bar chart ranking traffic channels by session count",
        "Donut chart with center label showing team headcount by department",
        "Multi-series line chart comparing API response percentiles (p50/p90/p99)",
        "Composed chart overlaying revenue bars with a growth-rate line on dual axes",
      ][i],
      name: `v-chart-${i + 1}`,
    }),
  ),

  // --- checkbox ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Select All with Indeterminate State",
        "Issue Label Picker",
        "Notification Channel Selector",
        "Multi-Consent Registration Gate",
        "Weekly availability grid with checkboxes per day and time slot",
        "Role permissions picker with colored badge per access level",
        "Notification preferences matrix with event rows and channel columns",
        "Plan add-on selector with dynamic price total as features are toggled",
        "Sprint task checklist with priority badges and completion celebration",
        "Showcase: states and descriptions",
      ][i],
      name: `v-checkbox-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- checkbox-group ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "checkbox group",
      dependencies: ["checkbox-group"],
      description: [
        "Default",
        "With Disabled Item",
        "Parent Checkbox",
        "Nested Parent Checkbox",
        "Form Integration",
        "Weekday picker",
        "Language picker with selection badges",
        "Notification preferences with descriptions",
        "Feature flags",
        "Notification channels with icons",
        "Two-level nested group for tech stack selection by frontend and backend category",
        "Recurring schedule picker with weekday and weekend sub-groups and day count badge",
        "Integration enablement list with card rows and a master enable-all parent checkbox",
        "Data export selector with two section groups and an item count summary",
        "Food preference picker with independent cuisine and dietary checkbox groups",
      ][i],
      name: `v-checkbox-group-${i + 1}`,
    }),
  ),

  // --- collapsible ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Read More Content Expander",
        "CI/CD Build Step Log Viewer",
        "Incident Status with Timeline",
        "Accordion-style FAQ with single-open behavior and question count badge",
        "Sidebar filter panel with collapsible groups, checkboxes, and active count",
        "Package dependency list with version badges and expandable package names",
        "Team directory with status dots, role labels, and per-team collapsible sections",
        "Privacy policy card with accordion sections and single-panel-open behavior",
      ][i],
      name: `v-collapsible-${i + 1}`,
    }),
  ),

  // --- combobox ---
  ...Array.from({ length: 23 }, (_, i) =>
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
        "Creatable option when nothing matches",
        "City picker with timezone and country code trailing metadata",
        "Sprint selector with status badge and date range per item",
        "Font picker grouped by category with live preview sentence",
        "Timezone picker with UTC offset badge in trigger and region info below",
        "Currency picker with symbol icon in trigger and code trailing each item",
        "Showcase: single, multiple chips, sizes and disabled",
      ][i],
      name: `v-combobox-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 13), 16], showcase: 23 }),
    }),
  ),

  // --- command ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Project switcher",
        "Invite members with multi-select",
        "Label picker with multi-select",
        "Account settings palette with grouped profile, preferences, and sign-out actions",
        "Repository search palette showing issues, pull requests, branches, and files",
        "Go-to-page palette with shortcut hints and arrow icon for unbound items",
        "Appearance picker with theme and accent-color options and active check marks",
        "Quick-open palette with page list, notification badges, and a keyboard footer",
      ][i],
      name: `v-command-${i + 1}`,
    }),
  ),

  // --- context-menu ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "context menu",
      dependencies: ["menu"],
      description: [
        "Browser page with submenu, checkbox toggles and profile radio",
        "Media library with Move to and Share submenus",
        "Code editor with keyboard shortcuts",
        "Calendar events with labelled action groups",
        "Spreadsheet cells with icon actions",
        "Data table with column visibility checkboxes",
        "Folder view with Sort by and View radio groups",
        "Inbox rows with destructive delete",
        "Canvas layers opening on each side",
        "Team members dialog with role submenu",
        "Bookmark list with per-item star toggle, open, copy, share, and delete actions",
        "Rich-text editor with checkbox formatting and alignment submenu",
        "File explorer rows with extension badge, rename, download, and delete per file",
        "Social feed with upvote/downvote controls and a report submenu per post",
        "Task board with inline status radio, priority submenu, reassign, and delete",
      ][i],
      name: `v-context-menu-${i + 1}`,
    }),
  ),

  // --- data-table ---
  ...Array.from({ length: 8 }, (_, i) =>
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
      description: [
        "Sortable invoices",
        "Customer directory with search and pagination",
        "Team members with row selection and bulk actions",
        "Orders with column visibility menu",
        "Issue tracker with faceted status and priority filters",
        "Department budgets with expandable sub-rows",
        "API keys card table with row actions",
        "Showcase: search, filters, selection, sorting and pagination",
      ][i],
      meta: {
        className:
          "**:data-[slot=preview]:w-full sm:**:data-[slot=preview]:max-w-[90%]",
      },
      name: `v-data-table-${i + 1}`,
      role: variantRole(i + 1, { demos: [], showcase: 8 }),
    }),
  ),

  // --- date-picker ---
  ...Array.from({ length: 16 }, (_, i) =>
    createVariant({
      category: "date picker",
      dependencies: ["date-picker"],
      description: [
        "Default",
        "Date Range",
        "Dropdown Navigation",
        "With Presets",
        "With Input",
        "Auto-close on Select",
        "Appointment Booking",
        "Team Meeting Scheduler",
        "Delivery Date Selector",
        "Task Deadline Reschedule",
        "Report Period Range with Presets",
        "Recurring Event Date Picker",
        "Hotel Stay Range with Duration Shortcuts",
        "Birthday Picker with Age Validation",
        "Multi-date Availability Selector",
        "Showcase: single, range, birthday and disabled",
      ][i],
      name: `v-date-picker-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 2, 3, 6], showcase: 16 }),
    }),
  ),

  // --- dialog ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Share Document with Link Copy",
        "Two-Factor Authentication Setup",
        "Subscription Cancellation with Reason",
        "API Key Generation and Reveal",
        "Product Feedback Star Rating",
      ][i],
      name: `v-dialog-${i + 1}`,
    }),
  ),

  // --- drawer ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Delete account confirmation with undo",
        "Edit profile form",
        "User Preferences & Theme Settings",
        "File Attachments with Upload",
        "Activity Log with Status Timeline",
        "Help Center with FAQ Search",
        "Quick Actions Grid",
      ][i],
      name: `v-drawer-${i + 1}`,
    }),
  ),

  // --- empty ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "No recent activity empty state",
        "All caught up — no new notifications",
        "No team members — invite form empty state",
        "No matching results — clear filters empty state",
        "Inbox zero — illustration with compose action",
        "Access restricted — permission request empty state",
      ][i],
      name: `v-empty-${i + 1}`,
    }),
  ),

  // --- field ---
  ...Array.from({ length: 22 }, (_, i) =>
    createVariant({
      category: "field",
      dependencies: ["field"],
      description: [
        "Basic field with label and description",
        "Required password field",
        "Disabled field",
        "Field with validation error",
        "Field with validity state inspector",
        "Field wrapping an input group",
        "Field with autocomplete",
        "Field with single-select combobox",
        "Field with multi-select combobox chips",
        "Field with textarea",
        "Field with select dropdown",
        "Field with checkbox",
        "Field with checkbox group",
        "Field with radio group",
        "Field with slider",
        "Field with number input",
        "Complete multi-field form",
        "Field with switch toggle",
        "Field with date picker",
        "Field with OTP verification input",
        "Resume dropzone with file validation",
        "Field with password strength indicator",
      ][i],
      name: `v-field-${i + 1}`,
    }),
  ),

  // --- fieldset ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "fieldset",
      dependencies: ["fieldset"],
      description: [
        "Billing details fieldset",
        "Personal information fieldset",
        "Shipping address fieldset",
        "Notification preferences fieldset",
        "Change password fieldset",
        "Payment information fieldset",
        "Account settings fieldset with timezone select",
        "Team member invite fieldset",
        "Support request fieldset with textarea",
        "Social links fieldset with URL prefixes",
      ][i],
      name: `v-fieldset-${i + 1}`,
    }),
  ),

  // --- form ---
  ...Array.from({ length: 13 }, (_, i) =>
    createVariant({
      category: "form",
      dependencies: ["form"],
      description: [
        "Default",
        "Multi-field form with validation",
        "Sign In",
        "Profile Settings",
        "Contact Form",
        "Change Password",
        "Newsletter Signup",
        "3-Step Onboarding Wizard",
        "Sign Up / Register",
        "Feedback form with rating",
        "Forgot password — reset email",
        "Delete account — danger zone confirmation",
        "Invite team member",
      ][i],
      name: `v-form-${i + 1}`,
    }),
  ),

  // --- frame ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "frame",
      dependencies: ["frame"],
      description: [
        "Default",
        "Separated panels",
        "With collapsible panel",
        "Dense layout",
        "With action button in header",
        "Stats metrics display",
        "With badge status indicator",
        "Read-only key-value info",
        "With footer CTA buttons",
        "Danger zone with typed delete confirmation",
      ][i],
      name: `v-frame-${i + 1}`,
    }),
  ),

  // --- group ---
  ...Array.from({ length: 19 }, (_, i) =>
    createVariant({
      category: "group",
      dependencies: ["group"],
      description: [
        "Default",
        "With Input",
        "Small Size",
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
        "Text formatting toolbar",
        "Thumbs up / down vote buttons",
        "Media player controls",
        "Price range input with apply button",
        "Search with category filter select",
        "Showcase: outline, small, primary and with input",
      ][i],
      name: `v-group-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 3, 4, 5], showcase: 19 }),
    }),
  ),

  // --- input ---
  ...Array.from({ length: 26 }, (_, i) =>
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
        "File picker with clear button",
        "With Required Indicator",
        "Time slot select",
        "With Multiple Fields",
        "Input label with tooltip",
        "With Badge",
        "With Optional Badge",
        "With Link and Visibility Toggle",
        "With multiple error messages",
        "Password strength with dynamic hint and icons",
        "Disabled input with masked value",
        "Readonly with copy-to-clipboard button",
        "Input with inline start icon",
        "Color picker with swatches and hex input",
        "Input with inline clear button",
        "Showcase: labels, required, error, disabled and sizes",
      ][i],
      name: `v-input-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 10), 12], showcase: 26 }),
    }),
  ),

  // --- input-group ---
  ...Array.from({ length: 22 }, (_, i) =>
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
        "With currency select prefix",
        "Newsletter subscribe with arrow button",
        "With inline clear button",
        "Chat input with async send",
        "Textarea with character countdown",
        "Showcase: icons, text add-ons, shortcut and button",
      ][i],
      name: `v-input-group-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 10), showcase: 22 }),
    }),
  ),

  // --- kbd ---
  ...Array.from({ length: 11 }, (_, i) =>
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
        "Keyboard shortcut in button",
        "Arrow key navigation display",
        "Cross-platform Mac vs Win shortcut table",
        "Shortcuts in menu items",
        "Command palette result rows with navigation hints",
      ][i],
      name: `v-kbd-${i + 1}`,
    }),
  ),

  // --- label ---
  // Each of 1–15 decorates a single field; the docs page explains them one by
  // one, and Explore shows the showcase that combines them.
  ...Array.from({ length: 16 }, (_, i) =>
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
        "With keyboard shortcut",
        "With inline link",
        "With icon prefix",
        "Horizontal layout",
        "With error state",
        "Showcase: markers, hints, links and errors",
      ][i],
      name: `v-label-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 15), showcase: 16 }),
    }),
  ),

  // --- menu ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Account menu",
        "File actions",
        "Icon button trigger",
        "Notification settings",
        "Share with export sub-menu",
      ][i],
      name: `v-menu-${i + 1}`,
    }),
  ),

  // --- meter ---
  ...Array.from({ length: 16 }, (_, i) =>
    createVariant({
      category: "meter",
      dependencies: ["meter"],
      description: [
        "Default",
        "Without Value",
        "With Formatted Value",
        "With Custom Range",
        "Live deployment meter with restart",
        "Language usage breakdown",
        "Password strength meter",
        "API usage by team member",
        "Quarterly budget by department",
        "Score card with letter grade",
        "Stacked resource meters",
        "Color-coded by severity",
        "Storage breakdown with icons",
        "Upload progress card",
        "Profile strength checklist",
        "Showcase: percentage, formatted value and custom range",
      ][i],
      name: `v-meter-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- number-field ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Font size with live preview",
        "Percentage with scrub",
        "Shopping cart quantity row",
        "Typography settings",
        "Min/max budget range",
        "Controlled with reset",
        "Showcase: label, scrub, sizes and disabled",
      ][i],
      name: `v-number-field-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 8), showcase: 16 }),
    }),
  ),

  // --- otp-field ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "4-digit PIN with confirm",
        "Email verification card",
        "2FA authenticator app",
        "8-char invite code with separator",
        "Success state on completion",
        "Resend countdown timer",
        "Showcase: separator, large and disabled",
      ][i],
      name: `v-otp-field-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 16 }),
    }),
  ),

  // --- pagination ---
  ...Array.from({ length: 21 }, (_, i) =>
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
        "Rows per page with first/last navigation",
        "With Page Select Dropdown And First/Last Navigation",
        "Numbered Pagination With Go-To-Page Input",
        "With Page Info, Numbered Pages, Ellipsis, and Per-Page Select",
        "Smart ellipsis with results count",
        "Mini pill",
        "Older/newer cursor navigation",
        "Controlled with smart ellipsis",
        "Results summary with compact nav",
        "Loading/disabled state",
        "Showcase: numbered, icon-only and page info",
      ][i],
      name: `v-pagination-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 4), showcase: 21 }),
    }),
  ),

  // --- popover ---
  ...Array.from({ length: 20 }, (_, i) =>
    createVariant({
      category: "popover",
      dependencies: ["popover"],
      description: [
        "Feedback form",
        "With Close Button",
        "Tooltip Style",
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
        "Emoji picker",
        "Confirmation / delete",
        "Inline tag editor",
        "Notification panel",
        "Inline text edit",
      ][i],
      name: `v-popover-${i + 1}`,
    }),
  ),

  // --- preview-card ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "preview card",
      dependencies: ["preview-card"],
      description: [
        "Website link preview with stats",
        "Venue location preview",
        "Package preview with license and version",
        "Event preview with date and attendees",
        "Company profile preview",
        "GitHub repository preview",
        "Video preview with duration",
        "Hashtag previews with post counts",
        "Product preview with add to cart",
        "Reference links with URL previews",
        "User mention profile card",
        "Article / blog post preview",
        "Product card with rating",
        "GitHub-style issue preview",
        "NPM package preview with weekly downloads",
      ][i],
      name: `v-preview-card-${i + 1}`,
    }),
  ),

  // --- progress ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Skills Meter",
        "Multi-file Upload Queue",
        "Monthly Budget Breakdown",
        "API Usage with Tier Milestones",
        "Survey completion counter",
        "Download with speed stats",
        "Fundraiser goal tracker",
        "Reading progress bar",
        "Build pipeline stages",
        "Showcase: plain, labelled and formatted value",
      ][i],
      name: `v-progress-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 2), showcase: 16 }),
    }),
  ),

  // --- radio-group ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Plan picker with descriptions",
        "Horizontal Layout",
        "Shipping Options",
        "Theme Selector",
        "Availability Status",
        "Billing Frequency",
        "Showcase: simple, disabled and with descriptions",
      ][i],
      name: `v-radio-group-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- scroll-area ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "scroll area",
      dependencies: ["scroll-area"],
      description: [
        "Default",
        "With Scroll Fade",
        "Horizontal",
        "Horizontal with Scrollbar Gutter",
        "Both Directions",
        "Alphabetical contact list",
        "Task backlog list",
        "Wide data table",
        "Activity timeline",
        "Code viewer",
        "Chat Feed",
        "Notification List",
        "Sidebar Navigation",
        "Server log viewer",
        "File Explorer",
      ][i],
      name: `v-scroll-area-${i + 1}`,
    }),
  ),

  // --- select ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "select",
      dependencies: ["select"],
      description: [
        "Timezone select",
        "Sizes",
        "Grouped framework select",
        "Multiple selection for permissions",
        "Settings navigation with icons",
        "Currency select",
        "Form field with description",
        "Plan select with separator",
        "Country select with flags",
        "Theme select with descriptions",
        "With Disabled Options",
        "Region select with groups",
        "Priority with badges",
        "Items with Description",
        "Sort Order with Icons",
      ][i],
      name: `v-select-${i + 1}`,
    }),
  ),

  // --- separator ---
  ...Array.from({ length: 16 }, (_, i) =>
    createVariant({
      category: "separator",
      dependencies: ["separator"],
      description: [
        "Default",
        "Vertical",
        "Settings menu dividers",
        "Key-value list",
        "Divider with label",
        "Order summary",
        "Breadcrumb dividers",
        "Onboarding checklist",
        "Grouped navigation sections",
        "Profile card",
        "Social Stats Bar",
        "Activity sections",
        "Footer Links",
        "Settings list with descriptions",
        "Toolbar with Separator Groups",
        "Showcase: horizontal and vertical",
      ][i],
      name: `v-separator-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 2), showcase: 16 }),
    }),
  ),

  // --- sheet ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Export Data Panel",
        "User Profile Viewer",
        "Support Contact Form",
        "Keyboard Shortcuts Reference",
        "API Key Manager",
      ][i],
      name: `v-sheet-${i + 1}`,
    }),
  ),

  // --- skeleton ---
  ...Array.from({ length: 15 }, (_, i) =>
    createVariant({
      category: "skeleton",
      dependencies: ["skeleton"],
      description: [
        "Default",
        "Skeleton only",
        "Card component",
        "Dashboard stats row",
        "List with actions",
        "Blog Article",
        "Data Table",
        "Sidebar Dashboard Layout",
        "Chat Thread",
        "Settings Page",
        "Product Grid",
        "Form Fields",
        "Email Inbox",
        "Kanban Board",
        "Profile Hero Page",
      ][i],
      name: `v-skeleton-${i + 1}`,
    }),
  ),

  // --- slider ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Price range with labels",
        "Three-band equalizer",
        "Session timeout with stops",
        "Volume Control With Mute Toggle",
        "Dual-Thumb Price Range",
        "Hue Color Picker",
        "Temperature Control",
        "Display Settings Sliders",
        "Showcase: single, range and disabled",
      ][i],
      name: `v-slider-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- spinner ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Semantic color variants",
        "Step-by-step workspace loading",
        "Page Transition Overlay",
        "File Upload Progress",
        "Table Row Loading State",
        "Auth Form With Spinner",
        "Spinner Sizes",
        "Showcase: sizes, colors and in context",
      ][i],
      name: `v-spinner-${i + 1}`,
      role: variantRole(i + 1, { demos: [1, 9, 15], showcase: 16 }),
    }),
  ),

  // --- switch ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Cookie Preferences Manager",
        "Notification Delivery Channels",
        "Plan Feature Toggles",
        "Privacy Settings With Icons",
        "Dark Mode Toggle Card",
        "Required Agreement Switch",
        "Do Not Disturb Mode",
        "Showcase: states, sizes and descriptions",
      ][i],
      name: `v-switch-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 3), showcase: 16 }),
    }),
  ),

  // --- table ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Sortable API Endpoints",
        "Storage Usage with Progress Bars",
        "Audit Log",
        "Product inventory with stock level badges and quantity",
        "Invoice history with status badges and outstanding total",
        "Feature comparison table with checkmarks across plan tiers",
        "Server health monitoring with CPU and memory progress bars",
        "Contributor leaderboard with rank, avatar, and change indicator",
      ][i],
      name: `v-table-${i + 1}`,
      role: variantRole(i + 1, { demos: range(2, 4), showcase: 1 }),
    }),
  ),

  // --- tabs ---
  ...Array.from({ length: 18 }, (_, i) =>
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
        "Account settings tabs with card forms",
        "Underline and Vertical Orientation",
        "With Icons",
        "With Badge Counts",
        "With Icons And Line Variant",
        "Segmented Control Tabs",
        "Settings navigation with vertical underline tabs and profile form",
        "Code file viewer with per-file tabs and copy button",
        "Profile repository listing with badge counts per tab",
        "Pricing toggle between monthly and yearly billing with plan cards",
        "Dashboard metrics with icon tabs and stat card content panels",
        "Showcase: default, underline and vertical",
      ][i],
      name: `v-tabs-${i + 1}`,
      role: variantRole(i + 1, { demos: [...range(1, 4), 6, 8], showcase: 18 }),
    }),
  ),

  // --- textarea ---
  ...Array.from({ length: 13 }, (_, i) =>
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
        "Auto-grow with live word and character count",
        "Write / Preview markdown toggle",
        "Support ticket with category chips and message field",
        "Chat message composer with bubble thread and send on Enter",
        "Release notes editor with title input and publish action",
        "Showcase: description, error, disabled and sizes",
      ][i],
      name: `v-textarea-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 7), showcase: 13 }),
    }),
  ),

  // --- toast ---
  ...Array.from({ length: 15 }, (_, i) =>
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
        "Staggered Notification Burst",
        "Timeout Control",
        "Auto-progressing Deploy Pipeline",
        "Anchored clipboard copy with tooltip-style toast",
        "Team invite with per-row undo action",
        "Background CSV export with download action on complete",
        "Session expiry warning with live countdown and renew action",
        "Unsaved changes reminder with save and discard actions",
      ][i],
      name: `v-toast-${i + 1}`,
    }),
  ),

  // --- toggle ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Video Call Controls Bar",
        "Role Filter Chips with Live Count",
        "Bookmark toggle per article row with saved count",
        "Rich-text formatting toolbar with markdown preview",
        "Social post interactions with live like and repost counts",
        "Server settings toggles with icon swap and status color",
        "Task list with per-task priority flag toggles",
        "Showcase: variants, sizes, icons and states",
      ][i],
      name: `v-toggle-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 8), showcase: 16 }),
    }),
  ),

  // --- toggle-group ---
  ...Array.from({ length: 16 }, (_, i) =>
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
        "Language picker with live code snippet preview",
        "Per-column sort direction control",
        "Issue priority picker with color-coded labels",
        "Date range quick-select with live stats grid",
        "Code viewer toolbar with multi-select options",
        "Zoom level control with live scale preview",
        "Showcase: single, multiple, outline and vertical",
      ][i],
      name: `v-toggle-group-${i + 1}`,
      role: variantRole(i + 1, { demos: range(1, 5), showcase: 16 }),
    }),
  ),

  // --- toolbar ---
  ...Array.from({ length: 10 }, (_, i) =>
    createVariant({
      category: "toolbar",
      dependencies: ["toolbar"],
      description: [
        "Spreadsheet toolbar with alignment, number format and font",
        "Rich text editor toolbar with formatting and alignment controls",
        "Image editor toolbar with transform, zoom, and export actions",
        "Data table toolbar with search input, filter controls, and add row",
        "Code editor toolbar with language select, word wrap, copy, and run",
        "Document collaboration toolbar with edit/preview toggle and share",
        "File browser toolbar with search, sort and view toggle",
        "Canvas toolbar with theme toggle and zoom controls",
        "Video call controls toolbar",
        "Block editor toolbar with block type and inline marks",
      ][i],
      name: `v-toolbar-${i + 1}`,
    }),
  ),

  // --- tooltip ---
  ...Array.from({ length: 17 }, (_, i) =>
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
        "Form field validation hints with info icon tooltips",
        "System status dots revealing service name, uptime, and latency",
        "Icon-only sidebar nav with label and description tooltips",
        "Permissions matrix with role access details per cell",
        "Deployment pipeline steps with status and detail per stage",
      ][i],
      name: `v-tooltip-${i + 1}`,
    }),
  ),
];
