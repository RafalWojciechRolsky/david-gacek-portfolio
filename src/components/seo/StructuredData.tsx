import { buildJsonLd } from "@/lib/json-ld";
import type { Locale, PageData, PageKey } from "@/lib/types";

interface StructuredDataProps {
  /** Dane strony użyte również w widocznym UI. */
  page: PageData;
  /** Lokalizacja dokumentu. */
  locale: Locale;
  /** Klucz strony. */
  pageKey: PageKey;
}

/**
 * Wstawia JSON-LD renderowany po stronie serwera.
 */
export function StructuredData({
  page,
  locale,
  pageKey,
}: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildJsonLd(page, locale, pageKey)),
      }}
    />
  );
}
