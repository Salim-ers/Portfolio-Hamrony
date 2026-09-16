import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projets`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${base}/projets/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
