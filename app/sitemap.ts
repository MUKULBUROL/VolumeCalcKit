import { MetadataRoute } from "next";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com";

  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/volume-formulas`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-calculate-volume`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-calculate-cbm`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Calculator routes from registry
  const calculatorPages: MetadataRoute.Sitemap = CALCULATORS_REGISTRY.map((calc) => ({
    url: `${baseUrl}/${calc.slug}`,
    lastModified: new Date(calc.lastReviewed),
    changeFrequency: "monthly",
    priority: calc.popular ? 0.9 : 0.8,
  }));

  return [...staticPages, ...calculatorPages];
}
