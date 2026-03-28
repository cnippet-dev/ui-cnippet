import type { MetadataRoute } from "next";
import { source, docSource } from "@/lib/source";

const BASE_URL = "https://ui.cnippet.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1.0,
      url: BASE_URL,
    },
  ];

  // Docs pages (from fumadocs docSource)
  const docsRoutes: MetadataRoute.Sitemap = docSource.getPages().map((page) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.7,
    url: `${BASE_URL}${page.url}`,
  }));

  // UI component pages (from fumadocs source)
  const uiRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: 0.8,
    url: `${BASE_URL}${page.url}`,
  }));

  return [...staticRoutes, ...docsRoutes, ...uiRoutes];
}
