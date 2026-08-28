import { pathFor } from "@/lib/routes";
import type { Locale, PageKey } from "@/lib/types";

import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";
import { MobileMenu } from "@/components/chrome/MobileMenu";
import { DesktopCollaborationMenu } from "@/components/chrome/DesktopCollaborationMenu";
import { getMessages } from "@/messages/ui";

interface SiteHeaderProps {
  /** Bieżąca lokalizacja. */
  locale: Locale;
  /** Bieżąca strona. */
  currentPage: PageKey;
  /** Numer telefonu do wyświetlenia. */
  phoneDisplay: string;
  /** Natywny link telefonu. */
  phoneHref: string;
  /** Link WhatsApp. */
  whatsappHref: string;
  /** Godziny odbierania. */
  phoneHours: string;
}

/**
 * Renderuje wspólny, nieprzyklejony Header dla desktopu i mobile.
 */
export function SiteHeader({
  locale,
  currentPage,
  phoneDisplay,
  phoneHref,
  whatsappHref,
  phoneHours,
}: SiteHeaderProps) {
  const messages = getMessages(locale);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href={pathFor("home", locale)}
          aria-label={messages.accessibility.homeAria}
          data-object-id="site-header-brand-link"
        >
          {messages.brandName}
        </a>
        <nav className="desktop-nav" aria-label={messages.accessibility.mainNavigation}>
          <a href={pathFor("profile", locale)} aria-current={currentPage === "profile" ? "page" : undefined}>
            {messages.header.dawid}
          </a>
          <DesktopCollaborationMenu locale={locale} currentPage={currentPage} />
          <a href={pathFor("insights", locale)} aria-current={currentPage === "insights" ? "page" : undefined}>
            {messages.header.insights}
          </a>
          <a href={pathFor("contact", locale)} aria-current={currentPage === "contact" ? "page" : undefined}>
            {messages.header.contact}
          </a>
        </nav>
        <div className="header-tools">
          <a
            className="header-call"
            href={phoneHref}
            aria-label={messages.accessibility.callAria}
            data-object-id="site-header-phone-link"
          >
            {messages.header.callShort}
          </a>
          <LanguageSwitcher locale={locale} pageKey={currentPage} objectId="site-header-language-switcher" />
          <MobileMenu
            locale={locale}
            currentPage={currentPage}
            phoneDisplay={phoneDisplay}
            phoneHref={phoneHref}
            whatsappHref={whatsappHref}
            phoneHours={phoneHours}
          />
        </div>
      </div>
    </header>
  );
}
