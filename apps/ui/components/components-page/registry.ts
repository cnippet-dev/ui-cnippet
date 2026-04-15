export interface VariantDef {
  key: string; // exact key in Index, e.g. "v-button-2"
  label: string; // heading from MDX, e.g. "Variants"
}

export interface ComponentDef {
  name: string;
  href: string;
  variants: VariantDef[];
}

export interface CategoryDef {
  label: string;
  components: ComponentDef[];
}

export const catalogue: CategoryDef[] = [
  {
    components: [
      {
        href: "/ui/actions/button",
        name: "Button",
        variants: [
          { key: "v-button-1", label: "Default" },
          { key: "v-button-2", label: "Variants" },
          { key: "v-button-3", label: "Sizes" },
        ],
      },
      {
        href: "/ui/actions/switch",
        name: "Switch",
        variants: [
          { key: "v-switch-1", label: "Default" },
          { key: "v-switch-2", label: "With Description" },
          { key: "v-switch-3", label: "Card Style" },
          { key: "v-switch-4", label: "Form Integration" },
        ],
      },
      {
        href: "/ui/actions/toggle",
        name: "Toggle",
        variants: [{ key: "v-toggle-1", label: "Default" }],
      },
      {
        href: "/ui/actions/toggle-group",
        name: "Toggle Group",
        variants: [{ key: "v-toggle-group-1", label: "Default" }],
      },
      {
        href: "/ui/actions/toolbar",
        name: "Toolbar",
        variants: [{ key: "v-toolbar-1", label: "Default" }],
      },
    ],
    label: "Actions",
  },
  {
    components: [
      {
        href: "/ui/data/accordion",
        name: "Accordion",
        variants: [
          { key: "v-accordion-1", label: "Default" },
          { key: "v-accordion-2", label: "Plus / Minus Icons" },
          { key: "v-accordion-3", label: "With Borders" },
          { key: "v-accordion-4", label: "Multiple" },
          { key: "v-accordion-5", label: "Within a Card" },
          { key: "v-accordion-6", label: "Custom Icons & Badges" },
          { key: "v-accordion-7", label: "Rotating Arrow" },
        ],
      },
      {
        href: "/ui/data/chart",
        name: "Chart",
        variants: [{ key: "v-chart-1", label: "Default" }],
      },
      {
        href: "/ui/data/collapsible",
        name: "Collapsible",
        variants: [{ key: "v-collapsible-1", label: "Default" }],
      },
      {
        href: "/ui/data/empty",
        name: "Empty",
        variants: [{ key: "v-empty-1", label: "Default" }],
      },
      {
        href: "/ui/data/table",
        name: "Table",
        variants: [{ key: "v-table-1", label: "Default" }],
      },
    ],
    label: "Data Display",
  },
  {
    components: [
      {
        href: "/ui/feedback/alert",
        name: "Alert",
        variants: [
          { key: "v-alert-1", label: "Default" },
          { key: "v-alert-2", label: "Info" },
          { key: "v-alert-3", label: "Success" },
          { key: "v-alert-4", label: "Warning" },
          { key: "v-alert-5", label: "Error" },
          { key: "v-alert-6", label: "With Action" },
        ],
      },
      {
        href: "/ui/feedback/badge",
        name: "Badge",
        variants: [
          { key: "v-badge-1", label: "Default" },
          { key: "v-badge-2", label: "Variants" },
          { key: "v-badge-3", label: "Sizes" },
        ],
      },
      {
        href: "/ui/feedback/kbd",
        name: "Kbd",
        variants: [{ key: "v-kbd-1", label: "Default" }],
      },
      {
        href: "/ui/feedback/progress",
        name: "Progress",
        variants: [{ key: "v-progress-1", label: "Default" }],
      },
      {
        href: "/ui/feedback/skeleton",
        name: "Skeleton",
        variants: [{ key: "v-skeleton-1", label: "Default" }],
      },
      {
        href: "/ui/feedback/spinner",
        name: "Spinner",
        variants: [{ key: "v-spinner-1", label: "Default" }],
      },
      {
        href: "/ui/feedback/toast",
        name: "Toast",
        variants: [
          { key: "v-toast-1", label: "Default" },
          { key: "v-toast-2", label: "With Status" },
          { key: "v-toast-3", label: "Loading" },
          { key: "v-toast-4", label: "With Action" },
          { key: "v-toast-5", label: "Promise" },
          { key: "v-toast-6", label: "Varying Heights" },
          { key: "v-toast-7", label: "Anchored Toast" },
          { key: "v-toast-8", label: "Error Toast" },
        ],
      },
    ],
    label: "Feedback",
  },
  {
    components: [
      {
        href: "/ui/forms/checkbox",
        name: "Checkbox",
        variants: [
          { key: "v-checkbox-1", label: "Default" },
          { key: "v-checkbox-2", label: "With Description" },
          { key: "v-checkbox-3", label: "Card Style" },
          { key: "v-checkbox-4", label: "Form Integration" },
        ],
      },
      {
        href: "/ui/forms/checkbox-group",
        name: "Checkbox Group",
        variants: [
          { key: "v-checkbox-group-1", label: "Default" },
          { key: "v-checkbox-group-2", label: "Parent Checkbox" },
          { key: "v-checkbox-group-3", label: "Nested Parent" },
          { key: "v-checkbox-group-4", label: "Form Integration" },
        ],
      },
      {
        href: "/ui/forms/field",
        name: "Field",
        variants: [
          { key: "v-field-1", label: "Default" },
          { key: "v-field-2", label: "Required" },
          { key: "v-field-3", label: "With Error" },
          { key: "v-field-4", label: "With Validity" },
          { key: "v-field-5", label: "Input Group" },
          { key: "v-field-9", label: "Textarea" },
          { key: "v-field-11", label: "Checkbox" },
          { key: "v-field-17", label: "Complete Form" },
        ],
      },
      {
        href: "/ui/forms/fieldset",
        name: "Fieldset",
        variants: [{ key: "v-fieldset-1", label: "Default" }],
      },
      {
        href: "/ui/forms/form",
        name: "Form",
        variants: [
          { key: "v-form-1", label: "Default" },
          { key: "v-form-2", label: "With Zod" },
        ],
      },
      {
        href: "/ui/forms/input",
        name: "Input",
        variants: [
          { key: "v-input-1", label: "Default" },
          { key: "v-input-2", label: "Sizes" },
          { key: "v-input-3", label: "File" },
          { key: "v-input-4", label: "With Label" },
          { key: "v-input-5", label: "With Button" },
        ],
      },
      {
        href: "/ui/forms/input-group",
        name: "Input Group",
        variants: [
          { key: "v-input-group-1", label: "Default" },
          { key: "v-input-group-2", label: "With Text" },
          { key: "v-input-group-5", label: "With Icon Button" },
          { key: "v-input-group-6", label: "With Button" },
          { key: "v-input-group-8", label: "Keyboard Shortcut" },
          { key: "v-input-group-10", label: "Sizes" },
          { key: "v-input-group-12", label: "With Textarea" },
        ],
      },
      {
        href: "/ui/forms/label",
        name: "Label",
        variants: [{ key: "v-input-6", label: "Default" }],
      },
      {
        href: "/ui/forms/meter",
        name: "Meter",
        variants: [{ key: "v-meter-1", label: "Default" }],
      },
      {
        href: "/ui/forms/number-field",
        name: "Number Field",
        variants: [
          { key: "v-number-field-1", label: "Default" },
          { key: "v-number-field-2", label: "Sizes" },
          { key: "v-number-field-4", label: "Formatted Value" },
          { key: "v-number-field-5", label: "With Step" },
        ],
      },
      {
        href: "/ui/forms/radio-group",
        name: "Radio Group",
        variants: [
          { key: "v-radio-group-1", label: "Default" },
          { key: "v-radio-group-2", label: "With Description" },
          { key: "v-radio-group-3", label: "Card Style" },
          { key: "v-radio-group-4", label: "Form Integration" },
        ],
      },
      {
        href: "/ui/forms/slider",
        name: "Slider",
        variants: [{ key: "v-slider-1", label: "Default" }],
      },
      {
        href: "/ui/forms/textarea",
        name: "Textarea",
        variants: [
          { key: "v-textarea-1", label: "Default" },
          { key: "v-textarea-2", label: "Sizes" },
          { key: "v-textarea-3", label: "With Label" },
          { key: "v-textarea-4", label: "Form Integration" },
        ],
      },
    ],
    label: "Forms",
  },
  {
    components: [
      {
        href: "/ui/layout/card",
        name: "Card",
        variants: [{ key: "v-card-1", label: "Default" }],
      },
      {
        href: "/ui/layout/frame",
        name: "Frame",
        variants: [
          { key: "v-frame-1", label: "Default" },
          { key: "v-frame-2", label: "In Collapsible" },
          { key: "v-frame-3", label: "Separated Panels" },
          { key: "v-frame-4", label: "Stacked Panels" },
        ],
      },
      {
        href: "/ui/layout/group",
        name: "Group",
        variants: [{ key: "v-group-1", label: "Default" }],
      },
      {
        href: "/ui/layout/preview-card",
        name: "Preview Card",
        variants: [{ key: "v-preview-card-1", label: "Default" }],
      },
      {
        href: "/ui/layout/scroll-area",
        name: "Scroll Area",
        variants: [{ key: "v-scroll-area-1", label: "Default" }],
      },
      {
        href: "/ui/layout/separator",
        name: "Separator",
        variants: [{ key: "v-separator-1", label: "Default" }],
      },
    ],
    label: "Layout",
  },
  {
    components: [
      {
        href: "/ui/media/avatar",
        name: "Avatar",
        variants: [
          { key: "v-avatar-1", label: "Default" },
          { key: "v-avatar-2", label: "Sizes" },
          { key: "v-avatar-3", label: "Radius" },
          { key: "v-avatar-4", label: "Group" },
        ],
      },
      {
        href: "/ui/media/carousel",
        name: "Carousel",
        variants: [
          { key: "v-carousel-1", label: "Default" },
          { key: "v-carousel-2", label: "Fallback Only" },
          { key: "v-carousel-3", label: "Sizes" },
        ],
      },
    ],
    label: "Media",
  },
  {
    components: [
      {
        href: "/ui/navigation/breadcrumb",
        name: "Breadcrumb",
        variants: [
          { key: "v-breadcrumb-1", label: "Default" },
          { key: "v-breadcrumb-2", label: "Custom Separator" },
        ],
      },
      {
        href: "/ui/navigation/menu",
        name: "Menu",
        variants: [
          { key: "v-menu-1", label: "Default" },
          { key: "v-menu-2", label: "Open on Hover" },
          { key: "v-menu-3", label: "With Link" },
          { key: "v-menu-4", label: "With Group Label" },
          { key: "v-menu-5", label: "Nested Menu" },
          { key: "v-menu-6", label: "Close on Click" },
        ],
      },
      {
        href: "/ui/navigation/pagination",
        name: "Pagination",
        variants: [{ key: "v-pagination-1", label: "Default" }],
      },
      {
        href: "/ui/navigation/tabs",
        name: "Tabs",
        variants: [
          { key: "v-tabs-1", label: "Default" },
          { key: "v-tabs-2", label: "Underline" },
          { key: "v-tabs-3", label: "Vertical" },
          { key: "v-tabs-4", label: "Underline Vertical" },
        ],
      },
    ],
    label: "Navigation",
  },
  {
    components: [
      {
        href: "/ui/overlays/alert-dialog",
        name: "Alert Dialog",
        variants: [
          { key: "v-alert-dialog-1", label: "Default" },
          { key: "v-alert-dialog-2", label: "Close Confirmation" },
          { key: "v-alert-dialog-3", label: "Unsaved Changes" },
        ],
      },
      {
        href: "/ui/overlays/context-menu",
        name: "Context Menu",
        variants: [{ key: "v-context-menu-1", label: "Default" }],
      },
      {
        href: "/ui/overlays/dialog",
        name: "Dialog",
        variants: [
          { key: "v-dialog-1", label: "Default" },
          { key: "v-dialog-2", label: "Open from Menu" },
          { key: "v-dialog-3", label: "Bare Footer" },
          { key: "v-dialog-4", label: "Scroll Inside" },
          { key: "v-dialog-5", label: "Nested Dialogs" },
        ],
      },
      {
        href: "/ui/overlays/popover",
        name: "Popover",
        variants: [
          { key: "v-popover-1", label: "Default" },
          { key: "v-popover-2", label: "With Close Button" },
          { key: "v-popover-3", label: "Animated" },
        ],
      },
      {
        href: "/ui/overlays/sheet",
        name: "Sheet",
        variants: [
          { key: "v-sheet-1", label: "Default" },
          { key: "v-sheet-2", label: "With Inset" },
          { key: "v-sheet-3", label: "Side Sheets" },
        ],
      },
      {
        href: "/ui/overlays/tooltip",
        name: "Tooltip",
        variants: [{ key: "v-tooltip-1", label: "Default" }],
      },
    ],
    label: "Overlays",
  },
  {
    components: [
      {
        href: "/ui/pickers/autocomplete",
        name: "Autocomplete",
        variants: [
          { key: "v-autocomplete-1", label: "Default" },
          { key: "v-autocomplete-2", label: "Sizes" },
          { key: "v-autocomplete-3", label: "With Label" },
          { key: "v-autocomplete-4", label: "Inline" },
          { key: "v-autocomplete-5", label: "Auto Highlight" },
          { key: "v-autocomplete-6", label: "With Clear Button" },
        ],
      },
      {
        href: "/ui/pickers/calendar",
        name: "Calendar",
        variants: [{ key: "v-calendar-1", label: "Default" }],
      },
      {
        href: "/ui/pickers/combobox",
        name: "Combobox",
        variants: [
          { key: "v-combobox-1", label: "Default" },
          { key: "v-combobox-2", label: "Sizes" },
          { key: "v-combobox-3", label: "With Label" },
          { key: "v-combobox-5", label: "With Clear Button" },
          { key: "v-combobox-6", label: "With Groups" },
          { key: "v-combobox-7", label: "Multiple Selection" },
          { key: "v-combobox-9", label: "Form Integration" },
        ],
      },
      {
        href: "/ui/pickers/select",
        name: "Select",
        variants: [
          { key: "v-select-1", label: "Default" },
          { key: "v-select-2", label: "Sizes" },
          { key: "v-select-3", label: "With Groups" },
          { key: "v-select-4", label: "Multiple Selection" },
          { key: "v-select-5", label: "Options with Icon" },
          { key: "v-select-7", label: "Form Integration" },
        ],
      },
    ],
    label: "Pickers",
  },
];

export const totalComponents = catalogue.reduce(
  (sum, cat) => sum + cat.components.length,
  0,
);
