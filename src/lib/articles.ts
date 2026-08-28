import articleData from "@/content/articles.json";
import type { ArticleDetail, Locale } from "@/lib/types";

interface ArticleDocument {
  /** Artykuły pogrupowane według lokalizacji. */
  articles: Record<Locale, ArticleDetail[]>;
}

const typedArticleData = articleData as ArticleDocument;

/**
 * Zwraca artykuł po zlokalizowanym slugu.
 */
export function getArticle(
  locale: Locale,
  slug: string,
): ArticleDetail | undefined {
  return typedArticleData.articles[locale].find(
    (article) => article.href?.split("/").pop() === slug,
  );
}

/**
 * Zwraca wszystkie artykuły w wybranej lokalizacji.
 */
export function getArticles(locale: Locale): ArticleDetail[] {
  return typedArticleData.articles[locale];
}
