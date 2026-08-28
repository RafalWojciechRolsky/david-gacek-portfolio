import type { Metadata, Viewport } from "next";

import { pathFor } from "@/lib/routes";
import type { Locale, PageData, PageKey } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { getMessages } from "@/messages/ui";

/**
 * Buduje adres absolutny, jeśli domena została skonfigurowana, lub lokalny fallback.
 */
export function absoluteUrl(path: string): string {
  if (!siteConfig.siteUrl) {
    return path;
  }

  return new URL(path, siteConfig.siteUrl).toString();
}

/**
 * Buduje komplet metadanych strony publicznej wraz z lokalizowanymi alternates.
 */
export function buildMetadata(
  page: PageData,
  locale: Locale,
  pageKey: PageKey,
): Metadata {
  const currentPath = pathFor(pageKey, locale);
  const messages = getMessages(locale);
  const polishPath = pathFor(pageKey, "pl");
  const englishPath = pathFor(pageKey, "en");

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
    alternates: {
      canonical: currentPath,
      languages: {
        pl: polishPath,
        en: englishPath,
        "x-default": polishPath,
      },
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: absoluteUrl(currentPath),
      siteName: messages.brandName,
      locale: locale === "pl" ? "pl_PL" : "en_GB",
      type: pageKey === "insights" ? "website" : "website",
      images: siteConfig.siteUrl
        ? [
            {
              url: absoluteUrl("/images/dawid-gacek-portret-czarne-polo.jpeg"),
              width: 1024,
              height: 683,
              alt:
                messages.seo.imageAlt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
    robots: page.noindex ? { index: false, follow: false } : undefined,
  };
}

/**
 * Zwraca wspólny viewport z kolorem papieru systemu wizualnego.
 */
export const viewport: Viewport = {
  themeColor: "#f7f2ea",
  width: "device-width",
  initialScale: 1,
};
