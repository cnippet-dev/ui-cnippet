import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useId } from "react";

const frameworks: Option[] = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
        disable: true,
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "angular",
        label: "Angular",
    },
    {
        value: "vue",
        label: "Vue.js",
    },
    {
        value: "react",
        label: "React",
    },
    {
        value: "ember",
        label: "Ember.js",
    },
    {
        value: "gatsby",
        label: "Gatsby",
    },
    {
        value: "eleventy",
        label: "Eleventy",
        disable: true,
    },
    {
        value: "solid",
        label: "SolidJS",
    },
    {
        value: "preact",
        label: "Preact",
    },
    {
        value: "qwik",
        label: "Qwik",
    },
    {
        value: "alpine",
        label: "Alpine.js",
    },
    {
        value: "lit",
        label: "Lit",
    },
];

export default function Component() {
    const id = useId();
    return (
        <div className="*:not-first:mt-2">
            <Label>Multiselect</Label>
            <MultipleSelector
                commandProps={{
                    label: "Select frameworks",
                }}
                value={frameworks.slice(0, 2)}
                defaultOptions={frameworks}
                placeholder="Select frameworks"
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={<p className="text-center text-sm">No results found</p>}
            />
        </div>
    );
}
