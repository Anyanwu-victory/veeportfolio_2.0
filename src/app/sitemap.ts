import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const publicPaths = ["/", "/about", "/work", "/portfolio", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
