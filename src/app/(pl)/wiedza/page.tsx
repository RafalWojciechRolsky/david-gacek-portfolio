import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { GenericPage } from "@/components/pages/GenericPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPage } from "@/lib/content";
import { buildMetadata, viewport } from "@/lib/metadata";

export { viewport };

export const metadata: Metadata = buildMetadata(getPage("insights", "pl"), "pl", "insights");

/**
 * Renderuje polski hub treści.
 */
export default function PolishInsightsPage() {
  const page = getPage("insights", "pl");

  return (
    <PageShell locale="pl" currentPage="insights">
      <StructuredData page={page} locale="pl" pageKey="insights" />
      <GenericPage page={page} pageKey="insights" locale="pl" />
    </PageShell>
  );
}
