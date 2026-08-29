import type { MetadataRoute } from "next";

import { getArticles, getArticleById } from "@/lib/articles";
import { absoluteUrl } from "@/lib/metadata";
import { getPublicPageKeys } from "@/lib/content";
import { pathFor } from "@/lib/routes";

const legalPages = [
  { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  { pl: "/regulamin", en: "/en/terms" },
] as const;

/**
 * Tworzy komplet alternatywnych wersji językowych wraz z preferowaną wersją polską.
 */
function languageAlternates(pl: string, en: string) {
  return {
    languages: {
      pl: absoluteUrl(pl),
      en: absoluteUrl(en),
      "x-default": absoluteUrl(pl),
    },
  };
}

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
        alternates: languageAlternates(polishPath, englishPath),
      },
      {
        url: absoluteUrl(englishPath),
        alternates: languageAlternates(polishPath, englishPath),
      },
    ];
  });

  const legalEntries = legalPages.flatMap(({ pl, en }) => [
    {
      url: absoluteUrl(pl),
      alternates: languageAlternates(pl, en),
    },
    {
      url: absoluteUrl(en),
      alternates: languageAlternates(pl, en),
    },
  ]);

  const articleEntries = (["pl", "en"] as const).flatMap((locale) =>
    getArticles(locale).map((article) => {
      const polishArticle =
        locale === "pl"
          ? article
          : getArticleById("pl", article.id);
      const englishArticle =
        locale === "en"
          ? article
          : getArticleById("en", article.id);

      return {
        url: absoluteUrl(article.href ?? "/"),
        lastModified: new Date(article.updatedAt),
        alternates: languageAlternates(
          polishArticle?.href ?? "/",
          englishArticle?.href ?? "/",
        ),
      };
    }),
  );

  return [...pageEntries, ...legalEntries, ...articleEntries];
}
