import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/chrome/PageShell";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { buildArticleMetadata } from "@/lib/article-metadata";
import { getArticles, getArticle } from "@/lib/articles";

interface ArticleParams {
  /** Angielski slug artykułu. */
  slug: string;
}

interface EnglishArticleProps {
  /** Parametry dynamicznej trasy. */
  params: Promise<ArticleParams>;
}

/**
 * Generuje slugi roboczych artykułów EN.
 */
export function generateStaticParams(): ArticleParams[] {
  return getArticles("en").map((article) => ({
    slug: article.href?.split("/").pop() ?? article.id,
  }));
}

/**
 * Buduje metadata angielskiego artykułu.
 */
export async function generateMetadata({
  params,
}: EnglishArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("en", slug);

  return article ? buildArticleMetadata(article, "en") : {};
}

/**
 * Renderuje angielski artykuł z lokalnych danych.
 */
export default async function EnglishArticlePage({ params }: EnglishArticleProps) {
  const { slug } = await params;
  const article = getArticle("en", slug);

  if (!article) {
    notFound();
  }

  return (
    <PageShell locale="en" currentPage="insights" headerTheme={article.category.signal}>
      <ArticleJsonLd article={article} locale="en" />
      <ArticlePage article={article} locale="en" />
    </PageShell>
  );
}
