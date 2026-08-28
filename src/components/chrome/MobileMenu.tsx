"use client";

import { useRef, useState } from "react";

import { pathFor } from "@/lib/routes";
import type { Locale, PageKey } from "@/lib/types";
import { getMessages } from "@/messages/ui";

import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";

interface MobileMenuProps {
  /** Bieżąca lokalizacja. */
  locale: Locale;
  /** Bieżąca strona dla semantyki aktywnego linku. */
  currentPage: PageKey;
  /** Dane kontaktowe panelu. */
  phoneDisplay: string;
  /** Link telefonu. */
  phoneHref: string;
  /** Link WhatsApp. */
  whatsappHref: string;
  /** Godziny odbierania. */
  phoneHours: string;
}

/**
 * Udostępnia pełnoekranowe menu mobilne z natywnym fallbackiem details.
 */
export function MobileMenu({
  locale,
  currentPage,
  phoneDisplay,
  phoneHref,
  whatsappHref,
  phoneHours,
}: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const messages = getMessages(locale);

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
    setIsOpen(false);
    summaryRef.current?.focus();
  };

  const handleToggle = () => {
    const nextOpen = detailsRef.current?.open ?? false;
    setIsOpen(nextOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key === "Tab" && isOpen && detailsRef.current) {
      const focusableElements = Array.from(
        detailsRef.current.querySelectorAll<HTMLElement>("a, summary"),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (
        firstElement &&
        lastElement &&
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        firstElement &&
        lastElement &&
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  return (
    <details
      className="mobile-nav"
      ref={detailsRef}
      onToggle={handleToggle}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (
          isOpen &&
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          closeMenu();
        }
      }}
    >
      <summary
        ref={summaryRef}
        role="button"
        aria-label={isOpen ? messages.accessibility.closeMenu : messages.accessibility.openMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
      >
        <span className="mobile-menu-icon" aria-hidden="true" />
        <span>{isOpen ? messages.header.close : messages.header.menu}</span>
      </summary>
      <nav
        className="mobile-panel"
        id="mobile-navigation-panel"
        aria-label={messages.accessibility.mobileNavigation}
      >
        <a href={pathFor("profile", locale)} aria-current={currentPage === "profile" ? "page" : undefined} onClick={closeMenu}>
          {messages.header.dawid}
        </a>
        <p className="mobile-group">{messages.header.mobileWorkWith}</p>
        <a
          href={pathFor("teacherTraining", locale)}
          aria-current={currentPage === "teacherTraining" ? "page" : undefined}
          onClick={closeMenu}
        >
          {messages.header.teacherTraining}
        </a>
        <a
          href={pathFor("childrenWorkshops", locale)}
          aria-current={currentPage === "childrenWorkshops" ? "page" : undefined}
          onClick={closeMenu}
        >
          {messages.header.childrenWorkshops}
        </a>
        <a
          href={pathFor("corporateEvents", locale)}
          aria-current={currentPage === "corporateEvents" ? "page" : undefined}
          onClick={closeMenu}
        >
          {messages.header.corporateEvents}
        </a>
        <a
          href={pathFor("disc", locale)}
          aria-current={currentPage === "disc" ? "page" : undefined}
          onClick={closeMenu}
        >
          {messages.header.disc}
        </a>
        <a
          href={pathFor("insights", locale)}
          aria-current={currentPage === "insights" ? "page" : undefined}
          onClick={closeMenu}
        >
          {messages.header.insights}
        </a>
        <a
          href={pathFor("contact", locale)}
          aria-current={currentPage === "contact" ? "page" : undefined}
          onClick={closeMenu}
        >
          {messages.header.contact}
        </a>
        <LanguageSwitcher locale={locale} pageKey={currentPage} />
        <div className="mobile-contact">
          <a className="mobile-phone-link" href={phoneHref} onClick={closeMenu}>
              <strong>{messages.header.call}</strong>
            <span className="mobile-phone-number">{phoneDisplay}</span>
            <small>{phoneHours}</small>
          </a>
          <a href={whatsappHref} onClick={closeMenu}>
            {messages.header.whatsapp}
          </a>
        </div>
      </nav>
    </details>
  );
}
