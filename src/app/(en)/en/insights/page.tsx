import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/PageShell";
import { GenericPage } from "@/components/pages/GenericPage";
import { StructuredData } from "@/components/seo/StructuredData";
import { getPage } from "@/lib/content";
import { buildMetadata, viewport } from "@/lib/metadata";

export { viewport };

export const metadata: Metadata = buildMetadata(getPage("insights", "en"), "en", "insights");

/**
 * Renderuje angielski hub treści.
 */
export default function EnglishInsightsPage() {
  const page = getPage("insights", "en");

  return (
    <PageShell locale="en" currentPage="insights">
      <StructuredData page={page} locale="en" pageKey="insights" />
      <GenericPage page={page} pageKey="insights" locale="en" />
    </PageShell>
  );
}
