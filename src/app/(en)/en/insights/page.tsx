import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { GenericPage } from "@/components/pages/GenericPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { filterInsightsByCategory } from "@/lib/articles";
import { getPage } from "@/lib/content";
import { buildMetadata, viewport } from "@/lib/metadata";

export { viewport };

export const metadata: Metadata = buildMetadata(getPage("insights", "en"), "en", "insights");

interface EnglishInsightsPageProps {
  /** Parametry zapytania obsługujące serwerowy filtr kategorii. */
  searchParams: Promise<{ kategoria?: string }>;
}

/**
 * Renderuje angielski hub treści z opcjonalnym filtrem kategorii.
 */
export default async function EnglishInsightsPage({
  searchParams,
}: EnglishInsightsPageProps) {
  const { kategoria } = await searchParams;
  const page = filterInsightsByCategory(getPage("insights", "en"), kategoria);

  return (
    <PageShell locale="en" currentPage="insights">
      <StructuredData page={page} locale="en" pageKey="insights" />
      <GenericPage
        page={page}
        pageKey="insights"
        locale="en"
        articleLibraryNav={<CategoryNav locale="en" active={kategoria} />}
      />
    </PageShell>
  );
}
