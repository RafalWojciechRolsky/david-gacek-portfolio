import type { ReactNode } from "react";

import { PageShell } from "@/components/chrome/PageShell";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
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
  children,
}: UtilityPageProps) {
  return (
    <PageShell locale={locale} currentPage={currentPage}>
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
