import { Registry } from "@/registry/schema";

const BASE_PATH = "hooks/";

const generateComponents = (
    componentsConfig: { name: string; files?: string[] }[],
): Registry => {
    return componentsConfig.map((component) => ({
        name: component.name,
        slug: `/components/${component.name}`,
        type: "registry:hook",
        files: component.files ?? [`${BASE_PATH}${component.name}.tsx`],
    }));
};

export const hooks: Registry = generateComponents([
    {
        name: "use-character-limit",
        files: [`${BASE_PATH}use-character-limit.ts`],
    },
    { name: "use-click-outside" },
    { name: "use-filter", files: [`${BASE_PATH}use-filter.ts`] },
    { name: "use-image-upload" },
    { name: "use-pagination", files: [`${BASE_PATH}use-pagination.ts`] },
    { name: "use-prevent-scroll" },
    // { name: "use-toast", files: [`${BASE_PATH}use-toast.ts`] },
]);
