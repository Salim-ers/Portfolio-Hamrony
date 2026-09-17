import type { MetadataRoute } from "next";
import { works } from "@/data/works";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/creation`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/systemes`, changeFrequency: "monthly", priority: 0.9 },
    ...works.map((w) => ({
      url: `${base}/creation/${w.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
