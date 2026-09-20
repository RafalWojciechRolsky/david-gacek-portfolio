"use client";

import { useSyncExternalStore } from "react";
import { pathFor } from "@/lib/routes";
import type { Locale, PageKey } from "@/lib/types";

import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";
import { trackEvent } from "@/components/analytics/TrackedLink";
import { MobileMenu } from "@/components/chrome/MobileMenu";
import { DesktopCollaborationMenu } from "@/components/chrome/DesktopCollaborationMenu";
import { RhythmicMarker } from "@/components/ui/RhythmicMarker";
import { getMessages } from "@/messages/ui";

const HERO_THEMES: Record<PageKey, string> = {
  home: "paper",
  profile: "white",
  teacherTraining: "cobalt",
  corporateEvents: "coral",
  childrenWorkshops: "ochre",
  disc: "green",
  insights: "ink",
  contact: "cobalt-light",
  materials: "paper",
};

/** Stan nagłówka wynikający z pozycji i kierunku przewijania. */
type HeaderScrollState = "top" | "scrolled" | "hidden";

let headerScrollSnapshot: HeaderScrollState = "top";

/**
 * Zwraca ostatni stabilny stan nagłówka dla Reacta.
 */
function getHeaderScrollSnapshot(): HeaderScrollState {
  return headerScrollSnapshot;
}

/**
 * Zapewnia zgodny z SSR stan początkowy przed hydratacją.
 */
function getServerHeaderScrollSnapshot(): HeaderScrollState {
  return "top";
}

/**
 * Subskrybuje przewijanie jako zewnętrzne źródło stanu bez ręcznej synchronizacji efektami.
 */
function subscribeToHeaderScroll(onStoreChange: () => void): () => void {
  let previousScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const nextSnapshot: HeaderScrollState =
      currentScrollY <= 30
        ? "top"
        : currentScrollY > 100 && currentScrollY > previousScrollY
          ? "hidden"
          : "scrolled";

    previousScrollY = currentScrollY;

    if (nextSnapshot !== headerScrollSnapshot) {
      headerScrollSnapshot = nextSnapshot;
      onStoreChange();
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}

/** Motywy powierzchni dostępne dla nagłówka strony. */
export type HeaderTheme =
  | "paper"
  | "paper-deep"
  | "white"
  | "cobalt"
  | "cobalt-light"
  | "coral"
  | "ochre"
  | "green"
  | "ink";

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
  /** Opcjonalnie odłącza powierzchnię nagłówka od domyślnego motywu strony. */
  themeOverride?: HeaderTheme;
}

/**
 * Renderuje inteligentny Header dla desktopu i mobile z dopasowaniem barwnym do Hero i auto-ukrywaniem.
 */
export function SiteHeader({
  locale,
  currentPage,
  phoneDisplay,
  phoneHref,
  whatsappHref,
  phoneHours,
  themeOverride,
}: SiteHeaderProps) {
  const messages = getMessages(locale);
  const theme = themeOverride ?? HERO_THEMES[currentPage] ?? "paper";
  const scrollState = useSyncExternalStore(
    subscribeToHeaderScroll,
    getHeaderScrollSnapshot,
    getServerHeaderScrollSnapshot,
  );
  const isScrolled = scrollState !== "top";
  const isHidden = scrollState === "hidden";

  const headerClasses = [
    "site-header",
    `site-header--theme-${theme}`,
    `site-header--page-${currentPage}`,
    isScrolled ? "site-header--scrolled" : "site-header--at-top",
    isHidden ? "site-header--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      <div className="container header-inner">
        <a
          className="brand"
          href={pathFor("home", locale)}
          aria-label={messages.accessibility.homeAria}
          data-object-id="site-header-brand-link"
        >
          <RhythmicMarker signal="cobalt" />
          {messages.brandName}
        </a>
        <nav className="desktop-nav" aria-label={messages.accessibility.mainNavigation}>
          <DesktopCollaborationMenu locale={locale} currentPage={currentPage} />
          <a href={pathFor("insights", locale)} aria-current={currentPage === "insights" ? "page" : undefined}>
            {messages.header.insights}
          </a>
          <a href={pathFor("profile", locale)} aria-current={currentPage === "profile" ? "page" : undefined}>
            {messages.header.dawid}
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
            onClick={() => trackEvent("click_phone", { location: "header" })}
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
