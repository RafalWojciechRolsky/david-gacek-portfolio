import { PageShell } from "@/components/chrome/PageShell";
import { ActionLink } from "@/components/ui/ActionLink";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
import { pathFor } from "@/lib/routes";
import type { Locale } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface NotFoundPageProps {
  /** Lokalizacja strony błędu. */
  locale: Locale;
}

/**
 * Renderuje krótki komunikat 404 z dyskretnym znakiem rytmu i jasnym wyjściem.
 */
export function NotFoundPage({ locale }: NotFoundPageProps) {
  const messages = getMessages(locale);
  const notFound = messages.notFound;

  return (
    <PageShell locale={locale} currentPage="home">
      <section className="not-found-page" aria-labelledby="not-found-heading">
        <div className="container not-found-layout">
          <div className="not-found-content">
            <div className="not-found-mark">
              <RhythmicMarker />
              <p className="not-found-code" aria-hidden="true">
                404
              </p>
            </div>
            <h1 id="not-found-heading">{notFound.title}</h1>
            <p className="section-intro">{notFound.intro}</p>
            <div className="utility-page-actions not-found-actions">
              <ActionLink href={pathFor("home", locale)} variant="primary">
                {notFound.homeAction}
              </ActionLink>
              <ActionLink href={pathFor("contact", locale)} variant="text" withArrow>
                {notFound.contactAction}
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

