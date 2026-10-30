import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { publishedArticles } from "@/content/articles";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/work", "/experience", "/insights", "/contact", "/resume"].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...projects.map((p) => ({ url: absoluteUrl(`/work/${p.slug}`), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...publishedArticles.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: a.date, priority: 0.7 })),
  ];
}
