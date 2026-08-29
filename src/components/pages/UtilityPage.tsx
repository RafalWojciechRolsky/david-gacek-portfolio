import type { ReactNode } from "react";

import { PageShell } from "@/components/chrome/PageShell";
import { StructuredData } from "@/components/seo/StructuredData";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
import type { JsonLdGraph } from "@/lib/json-ld";
import type { Locale, PageKey } from "@/lib/types";

interface UtilityPageProps {
  /** Lokalizacja dokumentu. */
  locale: Locale;
  /** Bieżący klucz strony dla chrome. */
  currentPage: PageKey;
  /** Tytuł dokumentu. */
  title: string;
  /** Opis dokumentu. */
  intro: string;
  /** Tekst statusu dokumentu. */
  body: string;
  /** Dane strukturalne zgodne z widoczną treścią strony. */
  structuredData?: JsonLdGraph;
  /** Opcjonalne akcje ratunkowe pod treścią, np. na stronie 404. */
  children?: ReactNode;
}

/**
 * Renderuje prostą stronę techniczną lub prawną bez udawania brakującej treści.
 */
export function UtilityPage({
  locale,
  currentPage,
  title,
  intro,
  body,
  structuredData,
  children,
}: UtilityPageProps) {
  return (
    <PageShell locale={locale} currentPage={currentPage}>
      {structuredData ? <StructuredData data={structuredData} /> : null}
      <section className="utility-page">
        <div className="container utility-page-inner">
          <RhythmicMarker />
          <h1 className="section-heading">{title}</h1>
          <p className="section-intro">{intro}</p>
          <div className="utility-page-body">
            <p>{body}</p>
          </div>
          {children}
        </div>
      </section>
    </PageShell>
  );
}
