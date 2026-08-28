"use client";

import type { ReactNode } from "react";

interface AnalyticsParameters {
  /** Parametry bez danych kontaktowych i treści użytkownika. */
  [key: string]: string;
}

interface TrackedLinkProps {
  /** Cel natywnego linku. */
  href: string;
  /** Widoczna etykieta linku. */
  children: ReactNode;
  /** Nazwa anonimowego zdarzenia GA4. */
  eventName: string;
  /** Kontekst zdarzenia. */
  parameters?: AnalyticsParameters;
  /** Klasa stylu. */
  className?: string;
  /** Dodatkowa etykieta dostępności. */
  ariaLabel?: string;
}

/**
 * Mierzy kluczową akcję bez blokowania natywnej nawigacji.
 */
export function TrackedLink({
  href,
  children,
  eventName,
  parameters = {},
  className = "",
  ariaLabel,
}: TrackedLinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, parameters);
    }
  };

  return (
    <a className={className} href={href} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}

declare global {
  interface Window {
    /** Opcjonalna funkcja Google Analytics 4. */
    gtag?: (
      command: "event",
      eventName: string,
      parameters: AnalyticsParameters,
    ) => void;
  }
}
