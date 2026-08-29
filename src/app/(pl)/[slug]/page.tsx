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

interface PolishSlugParams {
  /** Publiczny polski slug. */
  slug: string;
}

interface PolishSlugPageProps {
  /** Parametry dynamicznej trasy Next.js 16. */
  params: Promise<PolishSlugParams>;
}

export { viewport };

/**
 * Generuje znane polskie slugi podstron podczas budowania.
 */
export function generateStaticParams(): PolishSlugParams[] {
  return (Object.keys(routeMap) as PageKey[])
    .filter((pageKey) => pageKey !== "home" && pageKey !== "materials" && pageKey !== "insights")
    .map((pageKey) => ({ slug: routeMap[pageKey].pl }));
}

/**
 * Buduje metadata dla polskiej podstrony.
 */
export async function generateMetadata({
  params,
}: PolishSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageKey = pageKeyFromSlug("pl", slug);

  if (!pageKey || pageKey === "home" || pageKey === "materials" || pageKey === "insights") {
    return {};
  }

  return buildMetadata(getPage(pageKey, "pl"), "pl", pageKey);
}

/**
 * Renderuje dowolną polską podstronę z lokalnych danych.
 */
export default async function PolishSlugPage({ params }: PolishSlugPageProps) {
  const { slug } = await params;
  const pageKey = pageKeyFromSlug("pl", slug);

  if (!pageKey || pageKey === "home" || pageKey === "materials" || pageKey === "insights") {
    notFound();
  }

  const page = getPage(pageKey, "pl");

  return (
    <PageShell locale="pl" currentPage={pageKey}>
      <StructuredData data={buildJsonLd(page, "pl", pageKey)} />
      <GenericPage page={page} pageKey={pageKey} locale="pl" />
    </PageShell>
  );
}
