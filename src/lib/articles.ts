import articleData from "@/content/articles.json";
import type { ArticleDetail, ArticleItem, Locale } from "@/lib/types";

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

/**
 * Zwraca artykuły powiązane merytorycznie, a w razie braku zapisu najnowsze inne.
 */
export function getRelatedArticles(
  locale: Locale,
  article: ArticleDetail,
  limit = 3,
): ArticleDetail[] {
  const all = typedArticleData.articles[locale];
  const byId = (id: string) => all.find((candidate) => candidate.id === id);
  const related = (article.related ?? [])
    .map(byId)
    .filter((candidate): candidate is ArticleDetail => Boolean(candidate));
  if (related.length) {
    return related.slice(0, limit);
  }
  return all.filter((candidate) => candidate.id !== article.id).slice(0, limit);
}

/**
 * Zwraca artykuł po identyfikatorze w wybranej lokalizacji.
 */
export function getArticleById(
  locale: Locale,
  id: string,
): ArticleDetail | undefined {
  return typedArticleData.articles[locale].find(
    (candidate) => candidate.id === id,
  );
}

/**
 * Mapuje artykuł na dane karty huba Wiedzy, aby lista miała jedno źródło prawdy.
 */
export function articleToCardItem(article: ArticleDetail): ArticleItem {
  return {
    id: `insight-${article.id}`,
    kind: "navigation",
    featured: article.featured,
    type: article.category.label,
    title: article.title,
    body: article.body,
    href: article.href,
    actionLabel: article.actionLabel,
    readTime: article.readTime,
    meta: `${article.type} | ${article.readTime}`,
    status: "available",
  };
}

/**
 * Formatuje datę ISO na czytelny zapis w danej lokalizacji.
 */
export function formatArticleDate(isoDate: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}
