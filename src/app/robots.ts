import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/metadata";

/**
 * Udostępnia robots.txt z linkiem do sitemap i blokadą prywatnej ścieżki materiałów.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/materialy", "/en/materials"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
