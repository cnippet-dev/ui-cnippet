import { useMemo } from "react";

type FilterSensitivity = "base" | "accent" | "case" | "variant";

interface UseFilterProps {
    sensitivity?: FilterSensitivity;
}

export function useFilter({ sensitivity = "base" }: UseFilterProps = {}) {
    const collator = useMemo(
        () =>
            new Intl.Collator("en", {
                sensitivity: sensitivity,
            }),
        [sensitivity]
    );

    const contains = (text: string, query: string) => {
        if (!query) return true;
        return text.toLowerCase().includes(query.toLowerCase());
    };

    const compare = (a: string, b: string) => {
        return collator.compare(a, b);
    };

    return {
        contains,
        compare,
    };
} 