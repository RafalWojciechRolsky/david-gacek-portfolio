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
  /** Stabilny identyfikator obiektu ze specyfikacji. */
  objectId?: string;
  /** Włącza natywne pobieranie zasobu. */
  download?: boolean;
}

/**
 * Wysyła anonimowe zdarzenie do GA4, gdy analityka jest podłączona, bez rzucania błędów w DEV.
 */
export function trackEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
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
  objectId,
  download = false,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, parameters);
  };

  return (
    <a
      className={className}
      href={href}
      aria-label={ariaLabel}
      data-object-id={objectId}
      download={download || undefined}
      onClick={handleClick}
    >
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

export type { AnalyticsParameters };
