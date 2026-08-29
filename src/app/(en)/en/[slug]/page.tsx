import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/chrome/PageShell";
import { GenericPage } from "@/components/pages/GenericPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPage } from "@/lib/content";
import { buildJsonLd } from "@/lib/json-ld";
import { buildMetadata, viewport } from "@/lib/metadata";
import { pageKeyFromSlug, routeMap } from "@/lib/routes";
import type { PageKey } from "@/lib/types";

interface EnglishSlugParams {
  /** Publiczny angielski slug. */
  slug: string;
}

interface EnglishSlugPageProps {
  /** Parametry dynamicznej trasy Next.js 16. */
  params: Promise<EnglishSlugParams>;
}

export { viewport };

/**
 * Generuje znane angielskie slugi podstron podczas budowania.
 */
export function generateStaticParams(): EnglishSlugParams[] {
  return (Object.keys(routeMap) as PageKey[])
    .filter((pageKey) => pageKey !== "home" && pageKey !== "materials" && pageKey !== "insights")
    .map((pageKey) => ({ slug: routeMap[pageKey].en }));
}

/**
 * Buduje metadata dla angielskiej podstrony.
 */
export async function generateMetadata({
  params,
}: EnglishSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageKey = pageKeyFromSlug("en", slug);

  if (!pageKey || pageKey === "home" || pageKey === "materials" || pageKey === "insights") {
    return {};
  }

  return buildMetadata(getPage(pageKey, "en"), "en", pageKey);
}

/**
 * Renderuje dowolną angielską podstronę z lokalnych danych.
 */
export default async function EnglishSlugPage({ params }: EnglishSlugPageProps) {
  const { slug } = await params;
  const pageKey = pageKeyFromSlug("en", slug);

  if (!pageKey || pageKey === "home" || pageKey === "materials" || pageKey === "insights") {
    notFound();
  }

  const page = getPage(pageKey, "en");

  return (
    <PageShell locale="en" currentPage={pageKey}>
      <StructuredData data={buildJsonLd(page, "en", pageKey)} />
      <GenericPage page={page} pageKey={pageKey} locale="en" />
    </PageShell>
  );
}
