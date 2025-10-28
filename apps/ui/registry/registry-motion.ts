import { Registry } from "@/registry/schema";

const BASE_PATH = "components/motion/";

const generateComponents = (componentsConfig: { name: string }[]): Registry => {
    return componentsConfig.map((component) => ({
        name: component.name,
        slug: `/motions/${component.name}`,
        type: "registry:motion",
        files: [`${BASE_PATH}${component.name}.tsx`],
    }));
};

export const motions: Registry = generateComponents([
    { name: "cn-accordion" },
    { name: "animated-group" },
    { name: "animated-number" },
    { name: "blocks" },
    { name: "clip-path" },
    { name: "collapsible-cn" },
    { name: "cursor" },
    { name: "dialog-cn" },
    { name: "dock" },
    { name: "drag-items" },
    { name: "drawer-cn" },
    { name: "framer-carousel" },
    { name: "grid" },
    { name: "horizontal-scroll" },
    { name: "image-comparison" },
    { name: "image-mousetrail" },
    { name: "image-reveal" },
    { name: "image-tabs" },
    { name: "in-view" },
    { name: "infinite-slider" },
    { name: "masonary-grid" },
    { name: "morphing-dialog" },
    { name: "progressive-blur" },
    { name: "progressive-carousel" },
    { name: "ripple" },
    { name: "scroll-progress" },
    { name: "shuffle-text" },
    { name: "shuffle" },
    { name: "sliding-number" },
    { name: "spinning-text" },
    { name: "spotlight-card" },
    { name: "spotlight" },
    { name: "tabs-cn" },
    { name: "text-effect" },
    { name: "text-loop" },
    { name: "text-marquee" },
    { name: "text-morph" },
    { name: "text-roll" },
    { name: "text-scramble" },
    { name: "text-shimmer-wave" },
    { name: "text-shimmer" },
    { name: "text-wave" },
    { name: "tilt" },
    { name: "transition-panel" },
]);
