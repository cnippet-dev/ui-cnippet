import { ComponentGroup } from "@/types";

export const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

export const motions: ComponentGroup[] = [
    {
        name: "Core Components",
        items: [
            {
                name: "Accordion",
                href: "/motions/accordion",
            },
            {
                name: "Animated Group",
                href: "/motions/animated-group",
            },
            {
                name: "Border Trail",
                href: "#",
            },
            {
                name: "Collapsible",
                href: "/motions/collapsible",
                isNew: true,
            },
            {
                name: "Cursor",
                href: "/motions/cursor",
            },
            {
                name: "Infinite Slider",
                href: "/motions/infinite-slider",
            },
            {
                name: "Transition Panel",
                href: "/motions/transition-panel",
            },
            {
                name: "Board",
                href: "/motions/board",
            },
        ],
    },
    {
        name: "Creative Effects",
        items: [
            {
                name: "Image mousetrail",
                href: "/motions/image-mousetrail",
            },
            {
                name: "Image Reveal",
                href: "/motions/image-reveal",
            },
            {
                name: "Blocks",
                href: "/motions/blocks",
            },
        ],
    },
    {
        name: "Dialog/Drawer",
        items: [
            {
                name: "Morphing Dialog",
                href: "/motions/morphing-dialog",
            },
            {
                name: "Morphing Popover",
                href: "#",
            },
            {
                name: "Magnetic",
                href: "#",
            },
        ],
    },
    {
        name: "Drag Items",
        items: [
            {
                name: "Drag Items",
                href: "/motions/drag-items",
            },
            {
                name: "Swapy Drag",
                href: "#",
            },
        ],
    },
    {
        name: "ThreeJS",
        items: [
            {
                name: "Image Ripple effect",
                href: "#",
            },
            {
                name: "R3F Blob",
                href: "#",
            },
            {
                name: "Mesh Gradients",
                href: "#",
            },
        ],
    },
    {
        name: "Clip Path",
        items: [
            {
                name: "Clip Path",
                href: "/motions/clip-path",
            },
            {
                name: "Masking",
                href: "#",
            },
        ],
    },
    {
        name: "Text Effects",
        items: [
            {
                name: "Text Effect",
                href: "/motions/text-effect",
            },
            {
                name: "Text Loop",
                href: "/motions/text-loop",
            },
            {
                name: "Text Marquee ",
                href: "/motions/text-marquee",
            },
            {
                name: "Text Morph",
                href: "/motions/text-morph",
            },
            {
                name: "Text Roll",
                href: "/motions/text-roll",
            },
            {
                name: "Text Scramble",
                href: "/motions/text-scramble",
            },
            {
                name: "Text Shimmer",
                href: "/motions/text-shimmer",
            },
            {
                name: "Text Wave",
                href: "/motions/text-wave",
            },
        ],
    },
    {
        name: "Number Effects",
        items: [
            {
                name: "Animated Number",
                href: "/motions/animated-number",
            },
            {
                name: "Sliding Number",
                href: "#",
            },
        ],
    },
    {
        name: "Scroll Effects",
        items: [
            {
                name: "Horizontal Scroll",
                href: "/motions/horizontal-scroll",
            },
            {
                name: "Scroll Progress",
                href: "/motions/scroll-progress",
            },
            {
                name: "Smooth Scroll",
                href: "/motions/smooth-scroll",
            },
            {
                name: "Stacking Card",
                href: "/motions/stacking-card",
            },

            {
                name: "Sticky Scroll",
                href: "/motions/sticky-scroll",
            },
        ],
    },
    {
        name: "Tabs",
        items: [
            {
                name: "Tabs",
                href: "/motions/tabs",
            },
            {
                name: "Image Tabs",
                href: "/motions/image-tabs",
            },
        ],
    },
    {
        name: "Carousel",
        items: [
            {
                name: "Carousel (embla carousel)",
                href: "/motions/carousel",
            },
            {
                name: "Framer Carousel",
                href: "/motions/framer-carousel",
            },
            {
                name: "Progressive Carousel",
                href: "/motions/progressive-carousel",
            },
        ],
    },

    {
        name: "Grid",
        items: [
            {
                name: "Grid",
                href: "/motions/grid",
            },
            {
                name: "Masonary",
                href: "/motions/masonary",
            },
        ],
    },
    {
        name: "Interactive Elements",
        items: [
            {
                name: "Dock",
                href: "/motions/dock",
            },
            // {
            //     name: "Glow Effect",
            //     href: "#",
            // },
            {
                name: "Image Comparison",
                href: "/motions/image-comparison",
            },
            {
                name: "Spotlight",
                href: "/motions/spotlight",
            },
            {
                name: "Spotlight Card",
                href: "/motions/spotlight-card",
            },
            {
                name: "Spinning Text",
                href: "#",
            },
            {
                name: "Tilt",
                href: "/motions/tilt",
            },
        ],
    },
    {
        name: "Toolbars",
        items: [
            {
                name: "Toolbar Dynamic",
                href: "#",
            },
            {
                name: "Toolbar Expandable",
                href: "#",
            },
        ],
    },
    {
        name: "Advanced Effects",
        items: [
            {
                name: "Progressive Blur",
                href: "#",
            },
        ],
    },
];

export const charts: ComponentGroup[] = [
    {
        name: "Charts",
        items: [
            {
                name: "Area Chart",
                href: "/charts/area-chart",
            },
            {
                name: "Line Chart",
                href: "/charts/line-chart",
            },
            {
                name: "Bar Chart",
                href: "/charts/bar-chart",
            },
            {
                name: "Pie Chart",
                href: "/charts/pie-chart",
            },
            {
                name: "Radar Chart",
                href: "/charts/radar-chart",
            },
            {
                name: "Radial Chart",
                href: "/charts/radial-chart",
            },
            {
                name: "Scatter Chart",
                href: "/charts/scatter-chart",
            },
        ],
    },
];

export const components: ComponentGroup[] = [
    {
        name: "Buttons",
        items: [
            {
                name: "Button",
                href: "/components/button",
            },
            {
                name: "File Trigger",
                href: "/components/file-trigger",
            },
            {
                name: "Toggle Group",
                href: "/components/toggle-group",
            },
            {
                name: "Toggle",
                href: "/components/toggle",
            },
        ],
    },
    {
        name: "Collections",
        items: [
            {
                name: "Accordion",
                href: "/components/accordion",
                isNew: true,
            },
            {
                name: "Dropdown",
                href: "/components/dropdown-menu",
            },
            {
                name: "Menu",
                href: "#",
            },
            {
                name: "Table",
                href: "/components/table",
            },
            {
                name: "Data Table",
                href: "/components/data-table",
            },
            {
                name: "Tree",
                href: "/components/tree",
            },
        ],
    },
    {
        name: "Controls",
        items: [
            {
                name: "Command Menu",
                href: "/components/command-menu",
            },
            {
                name: "Context Menu",
                href: "/components/context-menu",
            },
            {
                name: "Slider",
                href: "/components/slider",
            },
            {
                name: "Switch",
                href: "/components/switch",
            },
        ],
    },
    {
        name: "Date and Time",
        items: [
            {
                name: "Calendar",
                href: "/components/calendar",
            },
            {
                name: "Date Field",
                href: "/components/date-picker",
            },
            {
                name: "Time Field",
                href: "#",
            },
        ],
    },
    {
        name: "Drag and drop",
        items: [
            {
                name: "Drop Zone",
                href: "/components/drop-zone",
            },
        ],
    },
    {
        name: "Forms",
        items: [
            {
                name: "Checkbox",
                href: "/components/checkbox",
            },
            {
                name: "Form",
                href: "/components/form",
            },
            {
                name: "Input",
                href: "/components/input",
            },
            {
                name: "Input OTP",
                href: "/components/input-otp",
                isNew: true,
            },
            {
                name: "Label",
                href: "/components/label",
            },
            {
                name: "Radio Group",
                href: "/components/radio-group",
            },
            {
                name: "Tag Field",
                href: "/components/tag-field",
            },
            {
                name: "Textarea",
                href: "/components/textarea",
            },
        ],
    },
    {
        name: "Layouts",
        items: [
            {
                name: "Navigation Menu",
                href: "/components/navigation-menu",
            },
            {
                name: "Sidebar",
                href: "/components/sidebar",
            },
        ],
    },
    {
        name: "Media",
        items: [
            {
                name: "Avatar",
                href: "/components/avatar",
            },
            {
                name: "Carousel",
                href: "/components/carousel",
            },
        ],
    },
    {
        name: "Navigation",
        items: [
            {
                name: "Breadcrumb",
                href: "/components/breadcrumb",
            },
            {
                name: "Collapsible",
                href: "/components/collapsible",
            },
            {
                name: "Pagination",
                href: "/components/pagination",
            },
            {
                name: "Stepper",
                href: "/components/stepper",
                isNew: true,
            },
            {
                name: "Tabs",
                href: "/components/tabs",
            },
        ],
    },
    {
        name: "Overlays",
        items: [
            {
                name: "Dialog",
                href: "/components/dialog",
            },
            {
                name: "Drawer",
                href: "/components/drawer",
            },
            {
                name: "Popover",
                href: "/components/popover",
            },
            {
                name: "Sheet",
                href: "/components/sheet",
            },
            {
                name: "Tooltip",
                href: "/components/tooltip",
            },
        ],
    },
    {
        name: "Pickers",
        items: [
            {
                name: "Combobox",
                href: "/components/combobox",
            },
            {
                name: "Multiselect",
                href: "/components/multiselect",
                isNew: true,
            },
            {
                name: "Select",
                href: "/components/select",
                isNew: true,
            },
        ],
    },
    {
        name: "Notifications",
        items: [
            {
                name: "Sonner",
                href: "/components/sonner",
                isUpdated: true,
            },
        ],
    },
    {
        name: "Statuses",
        items: [
            {
                name: "Badge",
                href: "/components/badge",
            },
            {
                name: "Spinner",
                href: "/components/spinner",
                isNew: true,
            },
            {
                name: "Progress Circle",
                href: "#",
            },
            {
                name: "Skeleton",
                href: "/components/skeleton",
            },
        ],
    },
    {
        name: "Surfaces",
        items: [
            {
                name: "Card",
                href: "/components/card",
            },
            {
                name: "Separator",
                href: "/components/separator",
            },
            {
                name: "Resizable",
                href: "/components/resizable",
                isNew: true,
            },
        ],
    },
];

export const docs: ComponentGroup[] = [
    {
        name: "Docs",
        items: [
            {
                name: "Introduction",
                href: "/docs/introduction",
            },
            {
                name: "Installation",
                href: "/docs/installation",
            },
            {
                name: "Changelog",
                href: "/docs/changelog",
            },
        ],
    },
];

const flattenMotionItems = (): ComponentGroup[] => {
    const allItems = motions.flatMap((group) => group.items);
    return [
        {
            name: "Motion components",
            items: allItems,
        },
    ];
};

const flattenComponentsItems = (): ComponentGroup[] => {
    const allItems = components.flatMap((group) => group.items);
    return [
        {
            name: "Core components",
            items: allItems,
        },
    ];
};
export const searchDocs: ComponentGroup[] = [
    ...flattenMotionItems(),
    ...flattenComponentsItems(),
];
