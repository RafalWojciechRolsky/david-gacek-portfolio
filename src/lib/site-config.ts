import configData from "@/content/site-config.json";
import type { SiteConfig } from "@/lib/types";

/**
 * Zwraca wartość środowiskową albo bezpieczny placeholder z pliku JSON.
 */
function envOrFallback(value: string | undefined, fallback: string): string {
  return value || fallback;
}

/**
 * Buduje deeplink Google Preferred Sources z publicznego adresu serwisu.
 * Gdy siteUrl jest pusty (etap developmentu), prowadzi do ogólnej strony preferencji.
 */
export function preferredSourceUrl(): string {
  const url = siteConfig.siteUrl;
  if (!url) return "https://www.google.com/preferences/source";
  const domain = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return `https://www.google.com/preferences/source?q=${domain}`;
}

/**
 * Udostępnia centralną konfigurację kontaktu, NAP i linków zewnętrznych.
 */
export const siteConfig: SiteConfig = {
  siteUrl: envOrFallback(process.env.NEXT_PUBLIC_SITE_URL, configData.siteUrl),
  phoneDisplay: envOrFallback(
    process.env.NEXT_PUBLIC_PHONE_DISPLAY,
    configData.phoneDisplay,
  ),
  phoneHref: envOrFallback(
    process.env.NEXT_PUBLIC_PHONE_HREF,
    configData.phoneHref,
  ),
  whatsappHref: envOrFallback(
    process.env.NEXT_PUBLIC_WHATSAPP_HREF,
    configData.whatsappHref,
  ),
  email: envOrFallback(process.env.NEXT_PUBLIC_EMAIL, configData.email),
  phoneHoursByLocale: {
    pl: envOrFallback(
      process.env.NEXT_PUBLIC_PHONE_HOURS,
      configData.phoneHoursByLocale.pl,
    ),
    en: envOrFallback(
      process.env.NEXT_PUBLIC_PHONE_HOURS_EN,
      configData.phoneHoursByLocale.en,
    ),
  },
  externalLinks: configData.externalLinks,
  creatorLinks: configData.creatorLinks,
};
