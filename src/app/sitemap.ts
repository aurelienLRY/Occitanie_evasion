import type { MetadataRoute } from "next";
import { AppRoutes, TRoutes } from "@/config/App-Routing";

export default function sitemap(): MetadataRoute.Sitemap {

     const  routesMap = AppRoutes.map((route: TRoutes) => ({
      url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}${route.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
    return [
        ...routesMap,
    ];
}