import { useMemo } from 'react';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
let sectionsCache: any = null;

export const useSectionsData = () => {
    return useMemo(() => {
        if (sectionsCache) {
            return sectionsCache;
        }

        return null;
    }, []);
};

export const getComponentsData = async () => {
    if (sectionsCache) {
        return sectionsCache;
    }

    const { allComponents } = await import("@/.content-collections/generated");
    sectionsCache = allComponents;
    return allComponents;
};
