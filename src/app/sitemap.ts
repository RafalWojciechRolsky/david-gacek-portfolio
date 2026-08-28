import type { MetadataRoute } from "next";

import { getArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/metadata";
import { getPublicPageKeys } from "@/lib/content";
import { pathFor } from "@/lib/routes";

/**
 * Buduje sitemapę dla wszystkich publicznych stron w obu językach.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries = getPublicPageKeys().flatMap((pageKey) => {
    const polishPath = pathFor(pageKey, "pl");
    const englishPath = pathFor(pageKey, "en");

    return [
      {
        url: absoluteUrl(polishPath),
        alternates: {
          languages: {
            pl: absoluteUrl(polishPath),
            en: absoluteUrl(englishPath),
          },
        },
      },
      {
        url: absoluteUrl(englishPath),
        alternates: {
          languages: {
            pl: absoluteUrl(polishPath),
            en: absoluteUrl(englishPath),
          },
        },
      },
    ];
  });

  const articleEntries = (["pl", "en"] as const).flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: absoluteUrl(article.href ?? "/"),
    })),
  );

  return [...pageEntries, ...articleEntries];
}
