import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "ui",
    registryDependencies: [
      "@cnippet/accordion",
      "@cnippet/alert",
      "@cnippet/alert-dialog",
      "@cnippet/autocomplete",
      "@cnippet/avatar",
      "@cnippet/badge",
      "@cnippet/breadcrumb",
      "@cnippet/button",
      "@cnippet/calendar",
      "@cnippet/card",
      "@cnippet/carousel",
      "@cnippet/chart",
      "@cnippet/checkbox",
      "@cnippet/checkbox-group",
      "@cnippet/collapsible",
      "@cnippet/combobox",
      "@cnippet/command",
      "@cnippet/context-menu",
      "@cnippet/dialog",
      "@cnippet/drawer",
      "@cnippet/empty",
      "@cnippet/field",
      "@cnippet/fieldset",
      "@cnippet/form",
      "@cnippet/frame",
      "@cnippet/group",
      "@cnippet/input",
      "@cnippet/otp-field",
      "@cnippet/input-group",
      "@cnippet/kbd",
      "@cnippet/label",
      "@cnippet/menu",
      "@cnippet/meter",
      "@cnippet/number-field",
      "@cnippet/pagination",
      "@cnippet/popover",
      "@cnippet/preview-card",
      "@cnippet/progress",
      "@cnippet/radio-group",
      "@cnippet/scroll-area",
      "@cnippet/select",
      "@cnippet/separator",
      "@cnippet/sheet",
      "@cnippet/sidebar",
      "@cnippet/skeleton",
      "@cnippet/slider",
      "@cnippet/spinner",
      "@cnippet/switch",
      "@cnippet/table",
      "@cnippet/tabs",
      "@cnippet/textarea",
      "@cnippet/toast",
      "@cnippet/toggle",
      "@cnippet/toggle-group",
      "@cnippet/toolbar",
      "@cnippet/tooltip",
    ],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
    name: "accordion",
    type: "registry:ui",
  },
  {
    cssVars: {
      dark: {
        "destructive-foreground": "var(--color-red-400)",
        info: "var(--color-blue-500)",
        "info-foreground": "var(--color-blue-400)",
        success: "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-400)",
        warning: "var(--color-amber-500)",
        "warning-foreground": "var(--color-amber-400)",
      },
      light: {
        "destructive-foreground": "var(--color-red-700)",
        info: "var(--color-blue-500)",
        "info-foreground": "var(--color-blue-700)",
        success: "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-700)",
        warning: "var(--color-amber-500)",
        "warning-foreground": "var(--color-amber-700)",
      },
    },
    files: [
      {
        path: "ui/alert.tsx",
        type: "registry:ui",
      },
    ],
    name: "alert",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/alert-dialog.tsx",
        type: "registry:ui",
      },
    ],
    name: "alert-dialog",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/autocomplete.tsx",
        type: "registry:ui",
      },
    ],
    name: "autocomplete",
    registryDependencies: ["@cnippet/input", "@cnippet/scroll-area"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:ui",
      },
    ],
    name: "avatar",
    type: "registry:ui",
  },
  {
    cssVars: {
      dark: {
        "destructive-foreground": "var(--color-red-400)",
        info: "var(--color-blue-500)",
        "info-foreground": "var(--color-blue-400)",
        success: "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-400)",
        warning: "var(--color-amber-500)",
        "warning-foreground": "var(--color-amber-400)",
      },
      light: {
        "destructive-foreground": "var(--color-red-700)",
        info: "var(--color-blue-500)",
        "info-foreground": "var(--color-blue-700)",
        success: "var(--color-emerald-500)",
        "success-foreground": "var(--color-emerald-700)",
        warning: "var(--color-amber-500)",
        "warning-foreground": "var(--color-amber-700)",
      },
    },
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui",
      },
    ],
    name: "badge",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/breadcrumb.tsx",
        type: "registry:ui",
      },
    ],
    name: "breadcrumb",
    type: "registry:ui",
  },
  {
    cssVars: {
      dark: {
        "destructive-foreground": "var(--color-red-400)",
      },
      light: {
        "destructive-foreground": "var(--color-red-700)",
      },
    },
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
    name: "button",
    registryDependencies: ["@cnippet/spinner"],
    type: "registry:ui",
  },
  {
    dependencies: ["react-day-picker", "lucide-react"],
    files: [
      {
        path: "ui/calendar.tsx",
        type: "registry:ui",
      },
    ],
    name: "calendar",
    registryDependencies: [],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui",
      },
    ],
    name: "card",
    type: "registry:ui",
  },
  {
    dependencies: ["embla-carousel-react"],
    files: [
      {
        path: "ui/carousel.tsx",
        type: "registry:ui",
      },
    ],
    name: "carousel",
    type: "registry:ui",
  },
  {
    dependencies: ["recharts"],
    files: [
      {
        path: "ui/chart.tsx",
        type: "registry:ui",
      },
    ],
    name: "chart",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/checkbox.tsx",
        type: "registry:ui",
      },
    ],
    name: "checkbox",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/checkbox-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "checkbox-group",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/collapsible.tsx",
        type: "registry:ui",
      },
    ],
    name: "collapsible",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/combobox.tsx",
        type: "registry:ui",
      },
    ],
    name: "combobox",
    registryDependencies: ["@cnippet/input", "@cnippet/scroll-area"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/command.tsx",
        type: "registry:ui",
      },
    ],
    name: "command",
    registryDependencies: ["@cnippet/autocomplete"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [
      {
        path: "ui/context-menu.tsx",
        type: "registry:ui",
      },
    ],
    name: "context-menu",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/dialog.tsx",
        type: "registry:ui",
      },
    ],
    name: "dialog",
    registryDependencies: ["@cnippet/button", "@cnippet/scroll-area"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/drawer.tsx",
        type: "registry:ui",
      },
    ],
    name: "drawer",
    registryDependencies: ["@cnippet/button", "@cnippet/scroll-area"],
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/empty.tsx",
        type: "registry:ui",
      },
    ],
    name: "empty",
    type: "registry:ui",
  },
  {
    cssVars: {
      dark: {
        "destructive-foreground": "var(--color-red-400)",
      },
      light: {
        "destructive-foreground": "var(--color-red-700)",
      },
    },
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/field.tsx",
        type: "registry:ui",
      },
    ],
    name: "field",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/fieldset.tsx",
        type: "registry:ui",
      },
    ],
    name: "fieldset",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/form.tsx",
        type: "registry:ui",
      },
    ],
    name: "form",
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/frame.tsx",
        type: "registry:ui",
      },
    ],
    name: "frame",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/group.tsx",
        type: "registry:ui",
      },
    ],
    name: "group",
    registryDependencies: ["@cnippet/separator"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:ui",
      },
    ],
    name: "input",
    type: "registry:ui",
  },
  {
    css: {
      "@keyframes caret-blink": {
        "0%, 70%, to": {
          opacity: "1",
        },
        "20%, 50%": {
          opacity: "0",
        },
      },
    },
    cssVars: {
      theme: {
        "--animate-caret-blink": "1s ease-out infinite caret-blink",
      },
    },
    dependencies: ["otp-field"],
    files: [
      {
        path: "ui/otp-field.tsx",
        type: "registry:ui",
      },
    ],
    name: "otp-field",
    registryDependencies: ["@cnippet/separator"],
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/input-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "input-group",
    registryDependencies: ["@cnippet/input", "@cnippet/textarea"],
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/kbd.tsx",
        type: "registry:ui",
      },
    ],
    name: "kbd",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/label.tsx",
        type: "registry:ui",
      },
    ],
    name: "label",
    type: "registry:ui",
  },
  {
    cssVars: {
      dark: {
        "destructive-foreground": "var(--color-red-400)",
      },
      light: {
        "destructive-foreground": "var(--color-red-700)",
      },
    },
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/menu.tsx",
        type: "registry:ui",
      },
    ],
    name: "menu",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/meter.tsx",
        type: "registry:ui",
      },
    ],
    name: "meter",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/number-field.tsx",
        type: "registry:ui",
      },
    ],
    name: "number-field",
    registryDependencies: ["@cnippet/label"],
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/pagination.tsx",
        type: "registry:ui",
      },
    ],
    name: "pagination",
    registryDependencies: ["@cnippet/button"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/popover.tsx",
        type: "registry:ui",
      },
    ],
    name: "popover",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/preview-card.tsx",
        type: "registry:ui",
      },
    ],
    name: "preview-card",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/progress.tsx",
        type: "registry:ui",
      },
    ],
    name: "progress",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/radio-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "radio-group",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/scroll-area.tsx",
        type: "registry:ui",
      },
    ],
    name: "scroll-area",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/select.tsx",
        type: "registry:ui",
      },
    ],
    name: "select",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/separator.tsx",
        type: "registry:ui",
      },
    ],
    name: "separator",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/sheet.tsx",
        type: "registry:ui",
      },
    ],
    name: "sheet",
    registryDependencies: ["@cnippet/button", "@cnippet/scroll-area"],
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/sidebar.tsx",
        type: "registry:ui",
      },
    ],
    name: "sidebar",
    registryDependencies: [
      "@cnippet/button",
      "@cnippet/input",
      "@cnippet/scroll-area",
      "@cnippet/separator",
      "@cnippet/sheet",
      "@cnippet/skeleton",
      "@cnippet/tooltip",
      "@cnippet/use-media-query",
      "@cnippet/utils",
    ],
    type: "registry:ui",
  },
  {
    css: {
      "@keyframes skeleton": {
        to: {
          "background-position": "-200% 0",
        },
      },
    },
    cssVars: {
      theme: {
        "--animate-skeleton": "skeleton 2s -1s infinite linear",
      },
    },
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:ui",
      },
    ],
    name: "skeleton",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/slider.tsx",
        type: "registry:ui",
      },
    ],
    name: "slider",
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/spinner.tsx",
        type: "registry:ui",
      },
    ],
    name: "spinner",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui",
      },
    ],
    name: "switch",
    type: "registry:ui",
  },
  {
    files: [
      {
        path: "ui/table.tsx",
        type: "registry:ui",
      },
    ],
    name: "table",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/tabs.tsx",
        type: "registry:ui",
      },
    ],
    name: "tabs",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/textarea.tsx",
        type: "registry:ui",
      },
    ],
    name: "textarea",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/toast.tsx",
        type: "registry:ui",
      },
    ],
    name: "toast",
    registryDependencies: ["@cnippet/button"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/toggle.tsx",
        type: "registry:ui",
      },
    ],
    name: "toggle",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/toggle-group.tsx",
        type: "registry:ui",
      },
    ],
    name: "toggle-group",
    registryDependencies: ["@cnippet/separator", "@cnippet/toggle"],
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/toolbar.tsx",
        type: "registry:ui",
      },
    ],
    name: "toolbar",
    type: "registry:ui",
  },
  {
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/tooltip.tsx",
        type: "registry:ui",
      },
    ],
    name: "tooltip",
    type: "registry:ui",
  },
];
