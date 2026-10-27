import type { MetadataRoute } from "next";
import { chartSource, docSource, motionSource, source } from "@/lib/source";

const BASE_URL = "https://ui.cnippet.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      changeFrequency: "monthly",
      priority: 1.0,
      url: BASE_URL,
    },
    {
      changeFrequency: "weekly",
      priority: 0.9,
      url: `${BASE_URL}/explore`,
    },
    {
      changeFrequency: "monthly",
      priority: 0.8,
      url: `${BASE_URL}/playground`,
    },
    {
      changeFrequency: "monthly",
      priority: 0.8,
      url: `${BASE_URL}/themes`,
    },
  ];

  const uiPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    changeFrequency: "weekly",
    priority: 0.8,
    url: `${BASE_URL}${page.url}`,
  }));

  const docPages: MetadataRoute.Sitemap = docSource.getPages().map((page) => ({
    changeFrequency: "monthly",
    priority: 0.7,
    url: `${BASE_URL}${page.url}`,
  }));

  const motionPages: MetadataRoute.Sitemap = motionSource
    .getPages()
    .map((page) => ({
      changeFrequency: "weekly",
      priority: 0.8,
      url: `${BASE_URL}${page.url}`,
    }));

  const chartPages: MetadataRoute.Sitemap = chartSource
    .getPages()
    .map((page) => ({
      changeFrequency: "weekly",
      priority: 0.8,
      url: `${BASE_URL}${page.url}`,
    }));

  return [
    ...staticRoutes,
    ...uiPages,
    ...docPages,
    ...motionPages,
    ...chartPages,
  ];
}
