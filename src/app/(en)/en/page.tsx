import type { Metadata } from "next";

import { Homepage } from "@/components/pages/Homepage";
import { PageShell } from "@/components/chrome/PageShell";
import { StructuredData } from "@/components/seo/StructuredData";
import { getHomepage } from "@/lib/content";
import { buildJsonLd } from "@/lib/json-ld";
import { buildMetadata, viewport } from "@/lib/metadata";

export { viewport };

export const metadata: Metadata = buildMetadata(getHomepage("en"), "en", "home");

/**
 * Renderuje angielską stronę główną.
 */
export default function EnglishHomepage() {
  const page = getHomepage("en");

  return (
    <PageShell locale="en" currentPage="home">
      <StructuredData data={buildJsonLd(page, "en", "home")} />
      <Homepage page={page} />
    </PageShell>
  );
}
