import type { MetadataRoute } from "next";
import { docSource, source } from "@/lib/source";

const BASE_URL = "https://ui.cnippet.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1.0,
      url: BASE_URL,
    },
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 0.9,
      url: `${BASE_URL}/explore`,
    },
  ];

  const uiPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 0.8,
    url: `${BASE_URL}${page.url}`,
  }));

  const docPages: MetadataRoute.Sitemap = docSource.getPages().map((page) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.7,
    url: `${BASE_URL}${page.url}`,
  }));

  return [...staticRoutes, ...uiPages, ...docPages];
}
