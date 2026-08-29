import type { ReactNode } from "react";

import { Footer } from "@/components/chrome/Footer";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import type { HeaderTheme } from "@/components/chrome/SiteHeader";
import { SkipLink } from "@/components/chrome/SkipLink";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { siteConfig } from "@/lib/site-config";
import type { Locale, PageKey } from "@/lib/types";
import { getMessages } from "@/messages/ui";

interface PageShellProps {
  /** Zawartość strony. */
  children: ReactNode;
  /** Lokalizacja. */
  locale: Locale;
  /** Bieżąca strona. */
  currentPage: PageKey;
  /** Klasa wariantu głównej treści. */
  className?: string;
  /** Opcjonalny motyw nagłówka niezależny od domyślnego motywu strony. */
  headerTheme?: HeaderTheme;
}

/**
 * Zapewnia wspólny landmark, skip link, Header i Footer dla każdej strony.
 */
export function PageShell({
  children,
  locale,
  currentPage,
  className = "",
  headerTheme,
}: PageShellProps) {
  return (
    <>
      <SkipLink label={getMessages(locale).accessibility.skipContent} />
      <AnalyticsScripts measurementId={process.env.NEXT_PUBLIC_GA_ID} />
      <SiteHeader
        locale={locale}
        currentPage={currentPage}
        phoneDisplay={siteConfig.phoneDisplay}
        phoneHref={siteConfig.phoneHref}
        whatsappHref={siteConfig.whatsappHref}
        phoneHours={siteConfig.phoneHoursByLocale[locale]}
        themeOverride={headerTheme}
      />
      <main id="main" tabIndex={-1} className={className}>
        {children}
      </main>
      <Footer locale={locale} currentPage={currentPage} />
    </>
  );
}
