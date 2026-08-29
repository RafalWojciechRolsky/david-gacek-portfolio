import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { CategoryNav } from "@/components/sections/CategoryNav";
import { GenericPage } from "@/components/pages/GenericPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { filterInsightsByCategory } from "@/lib/articles";
import { getPage } from "@/lib/content";
import { buildJsonLd } from "@/lib/json-ld";
import { buildMetadata, viewport } from "@/lib/metadata";

export { viewport };

export const metadata: Metadata = buildMetadata(getPage("insights", "pl"), "pl", "insights");

interface PolishInsightsPageProps {
  /** Parametry zapytania obsługujące serwerowy filtr kategorii. */
  searchParams: Promise<{ kategoria?: string }>;
}

/**
 * Renderuje polski hub treści z opcjonalnym filtrem kategorii.
 */
export default async function PolishInsightsPage({
  searchParams,
}: PolishInsightsPageProps) {
  const { kategoria } = await searchParams;
  const page = filterInsightsByCategory(getPage("insights", "pl"), kategoria);

  return (
    <PageShell locale="pl" currentPage="insights">
      <StructuredData data={buildJsonLd(page, "pl", "insights")} />
      <GenericPage
        page={page}
        pageKey="insights"
        locale="pl"
        articleLibraryNav={<CategoryNav locale="pl" active={kategoria} />}
      />
    </PageShell>
  );
}
