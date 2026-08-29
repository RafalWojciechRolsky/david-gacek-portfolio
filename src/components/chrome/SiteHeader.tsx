"use client";

import { useEffect, useState, useRef } from "react";
import { pathFor } from "@/lib/routes";
import type { Locale, PageKey } from "@/lib/types";

import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";
import { MobileMenu } from "@/components/chrome/MobileMenu";
import { DesktopCollaborationMenu } from "@/components/chrome/DesktopCollaborationMenu";
import { getMessages } from "@/messages/ui";

const HERO_THEMES: Record<PageKey, string> = {
  home: "paper",
  profile: "white",
  teacherTraining: "cobalt",
  corporateEvents: "coral",
  childrenWorkshops: "ochre",
  disc: "green",
  projects: "paper",
  insights: "ink",
  contact: "dark-cobalt",
  materials: "paper",
};

/** Motywy powierzchni dostępne dla nagłówka strony. */
export type HeaderTheme =
  | "paper"
  | "white"
  | "cobalt"
  | "dark-cobalt"
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

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;

      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 100 && currentScrollY > prevScrollY) {
        setIsHidden(true);
      } else if (currentScrollY < prevScrollY || currentScrollY <= 30) {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
