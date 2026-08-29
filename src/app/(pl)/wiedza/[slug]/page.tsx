import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/chrome/PageShell";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { buildArticleMetadata } from "@/lib/article-metadata";
import { getArticles, getArticle } from "@/lib/articles";

interface ArticleParams {
  /** Polski slug artykułu. */
  slug: string;
}

interface PolishArticleProps {
  /** Parametry dynamicznej trasy. */
  params: Promise<ArticleParams>;
}

/**
 * Generuje slugi roboczych artykułów PL.
 */
export function generateStaticParams(): ArticleParams[] {
  return getArticles("pl").map((article) => ({
    slug: article.href?.split("/").pop() ?? article.id,
  }));
}

/**
 * Buduje metadata polskiego artykułu.
 */
export async function generateMetadata({
  params,
}: PolishArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("pl", slug);

  return article ? buildArticleMetadata(article, "pl") : {};
}

/**
 * Renderuje polski artykuł z lokalnych danych.
 */
export default async function PolishArticlePage({ params }: PolishArticleProps) {
  const { slug } = await params;
  const article = getArticle("pl", slug);

  if (!article) {
    notFound();
  }

  return (
    <PageShell locale="pl" currentPage="insights" headerTheme="paper">
      <ArticleJsonLd article={article} locale="pl" />
      <ArticlePage article={article} locale="pl" />
    </PageShell>
  );
}
