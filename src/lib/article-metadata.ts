import type { Metadata } from "next";

import { getArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/metadata";
import type { ArticleDetail, Locale } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { getMessages } from "@/messages/ui";

/**
 * Buduje metadata artykułu z lokalizowanymi alternates, obrazem hero
 * i kartą Twitter zgodną z widoczną treścią.
 */
export function buildArticleMetadata(
  article: ArticleDetail,
  locale: Locale,
): Metadata {
  const alternateArticle = getArticles(locale === "pl" ? "en" : "pl").find(
    (candidate) => candidate.id === article.id,
  );
  const polishPath = locale === "pl" ? article.href ?? "/" : alternateArticle?.href ?? "/";
  const englishPath = locale === "en" ? article.href ?? "/" : alternateArticle?.href ?? "/";
  const messages = getMessages(locale);

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: article.href,
      languages: {
        pl: polishPath,
        en: englishPath,
        "x-default": polishPath,
      },
    },
    openGraph: {
      title: `${article.title} | ${messages.brandName}`,
      description: article.seoDescription,
      url: absoluteUrl(article.href ?? "/"),
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: siteConfig.siteUrl
        ? [
            {
              url: absoluteUrl(article.hero.src),
              width: article.hero.width,
              height: article.hero.height,
              alt: article.hero.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | ${messages.brandName}`,
      description: article.seoDescription,
      images: siteConfig.siteUrl ? [absoluteUrl(article.hero.src)] : undefined,
    },
  };
}
