import { MetadataRoute } from "next";

import {
    allCharts,
    allComponents,
    allMotions,
    allDocs,
} from "@/.content-collections/generated";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const BASE_URL = process.env.NEXT_PUBLIC_URL
        ? `${process.env.NEXT_PUBLIC_URL}`
        : "http://localhost:3000";

    const allRoutes = [`/components`, `/motions`, `/charts`];

    const routes: MetadataRoute.Sitemap = allRoutes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
    }));

    const components: MetadataRoute.Sitemap = allComponents.map(
        ({ slugAsParams }) => ({
            url: `${BASE_URL}/components/${slugAsParams}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        }),
    );

    const motions: MetadataRoute.Sitemap = allMotions.map(
        ({ slugAsParams }) => ({
            url: `${BASE_URL}/motions/${slugAsParams}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        }),
    );

    const charts: MetadataRoute.Sitemap = allCharts.map(({ slugAsParams }) => ({
        url: `${BASE_URL}/charts/${slugAsParams}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
    }));

    const docs: MetadataRoute.Sitemap = allDocs.map(({ slugAsParams }) => ({
        url: `${BASE_URL}/docs/${slugAsParams}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
    }));

    return [
        {
            url: `${BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        ...routes,
        ...docs,
        ...components,
        ...motions,
        ...charts,
    ];
}
