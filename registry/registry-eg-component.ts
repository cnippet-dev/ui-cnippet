import { Registry } from "@/registry/schema";

const BASE_PATH = "registry/default/";

const generateExamples = (
    examplesConfig: { name: string; number?: string }[],
): Registry => {
    return examplesConfig.map((example) => {
        const parts = example.name.split("-");

        const extractedParts =
            parts.length > 2 ? [parts[0], parts[1]] : [parts[0]];

        return {
            name: example.name,
            slug: `/components/${extractedParts.join("-")}`,
            type: "registry:components",
            files: [
                `${BASE_PATH}components/${extractedParts.join("-")}/${example.name}.tsx`,
            ],
            number: example.number,
        };
    });
};

export const componentExamples: Registry = generateExamples([
    { name: "avatar-demo", number: "3" },
    { name: "avatar-desc" },
    { name: "avatar-stack" },

    { name: "badge-demo", number: "2" },
    { name: "badge-status" },

    { name: "breadcrumb-demo", number: "4" },
    { name: "breadcrumb-folder" },
    { name: "breadcrumb-icon" },
    { name: "breadcrumb-select" },

    { name: "button-demo", number: "2" },
    { name: "button-icons" },
    { name: "button-login" },

    { name: "calendar-demo", number: "2" },
    { name: "calendar-range" },

    { name: "card-demo", number: "2" },
    { name: "card-notification" },

    { name: "checkbox-demo", number: "4" },
    { name: "checkbox-box" },
    { name: "checkbox-color" },
    { name: "checkbox-terms" },

    { name: "collapsible-accordion" },

    { name: "combobox-demo", number: "1" },

    { name: "command-menu-demo", number: "1" },

    { name: "context-menu-demo", number: "1" },

    { name: "data-table-demo", number: "1" },

    { name: "date-picker-demo", number: "2" },
    { name: "date-picker-range" },

    { name: "drawer-demo", number: "1" },

    { name: "drop-zone-demo", number: "2" },
    { name: "drop-zone-message" },

    { name: "dropdown-menu-demo", number: "1" },
    { name: "dropdown-menu-checkboxes" },

    { name: "file-trigger-demo", number: "1" },

    { name: "form-demo", number: "1" },

    { name: "input-demo", number: "9" },
    { name: "input-addon" },
    { name: "input-double" },
    { name: "input-helper" },
    { name: "input-icon" },
    { name: "input-labelfloat" },
    { name: "input-otp" },
    { name: "input-phone" },
    { name: "input-spaced" },

    { name: "label-demo", number: "1" },

    { name: "loader-demo", number: "1" },

    { name: "multiselect-demo", number: "2" },
    { name: "multiselect-clear" },

    { name: "navigation-menu-demo", number: "1" },

    { name: "pagination-demo", number: "4" },
    { name: "pagination-numbers" },
    { name: "pagination-page" },
    { name: "pagination-select" },

    { name: "popover-demo", number: "1" },

    { name: "radio-group-demo", number: "4" },
    { name: "radio-group-desc" },
    { name: "radio-group-review" },
    { name: "radio-group-theme" },

    { name: "select-demo", number: "2" },
    { name: "select-icon" },
    { name: "select-placeholder" },

    { name: "separator-demo", number: "1" },

    { name: "sheet-demo", number: "1" },

    { name: "sidebar-demo", number: "1" },

    { name: "skeleton-demo", number: "1" },

    { name: "slider-demo", number: "6" },
    { name: "slider-feedback" },
    { name: "slider-minmax" },
    { name: "slider-output" },
    { name: "slider-square" },
    { name: "slider-thumb" },

    { name: "sonner-demo", number: "3" },
    { name: "sonner-direction" },
    { name: "sonner-custom" },

    { name: "stepper-demo", number: "3" },
    { name: "stepper-step" },
    { name: "stepper-vertical" },

    { name: "switch-demo", number: "6" },
    { name: "switch-icon" },
    { name: "switch-label" },
    { name: "switch-sliding" },
    { name: "switch-square" },
    { name: "switch-text" },

    { name: "table-demo", number: "1" },

    { name: "tabs-demo", number: "1" },

    { name: "tag-field-demo", number: "1" },

    { name: "textarea-demo", number: "5" },
    { name: "textarea-autogrow" },
    { name: "textarea-label" },
    { name: "textarea-limit" },
    { name: "textarea-text" },

    // { name: "toast-demo", number: "3" },
    // { name: "toast-custom" },
    // { name: "toast-direction" },

    { name: "toggle-demo", number: "1" },
    { name: "toggle-text" },

    { name: "toggle-group-demo", number: "1" },
    { name: "toggle-group-single" },

    { name: "tooltip-demo", number: "5" },
    { name: "tooltip-arrow" },
    { name: "tooltip-dark" },
    { name: "tooltip-direction" },
    { name: "tooltip-image" },

    { name: "tree-demo", number: "1" },
    { name: "tree-icons" },
    { name: "tree-track" },
]);
