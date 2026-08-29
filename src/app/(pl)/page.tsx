import type { Metadata } from "next";

import { Homepage } from "@/components/pages/Homepage";
import { PageShell } from "@/components/chrome/PageShell";
import { StructuredData } from "@/components/seo/StructuredData";
import { getHomepage } from "@/lib/content";
import { buildJsonLd } from "@/lib/json-ld";
import { buildMetadata, viewport } from "@/lib/metadata";

export { viewport };

export const metadata: Metadata = buildMetadata(getHomepage("pl"), "pl", "home");

/**
 * Renderuje polską stronę główną.
 */
export default function PolishHomepage() {
  const page = getHomepage("pl");

  return (
    <PageShell locale="pl" currentPage="home">
      <StructuredData data={buildJsonLd(page, "pl", "home")} />
      <Homepage page={page} />
    </PageShell>
  );
}
