import Script from "next/script";

interface AnalyticsScriptsProps {
  /** Identyfikator pomiaru GA4, jeśli został skonfigurowany. */
  measurementId?: string;
}

/**
 * Ładuje GA4 tylko po konfiguracji i nie przekazuje danych PII.
 */
export function AnalyticsScripts({ measurementId }: AnalyticsScriptsProps) {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${measurementId}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
