import type { JsonLdGraph } from "@/lib/json-ld";

interface StructuredDataProps {
  /** Kompletny graf JSON-LD zgodny z widoczną treścią. */
  data: JsonLdGraph;
}

/**
 * Wstawia JSON-LD renderowany po stronie serwera.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
