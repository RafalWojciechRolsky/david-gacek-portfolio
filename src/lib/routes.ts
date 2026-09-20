import type { Locale, PageKey } from "@/lib/types";

/**
 * Lokalizowane slugi stron publicznych.
 */
export const routeMap: Record<PageKey, Record<Locale, string>> = {
  home: { pl: "", en: "" },
  profile: { pl: "dawid-gacek", en: "dawid-gacek" },
  teacherTraining: {
    pl: "szkolenia-bum-bum-rurki",
    en: "boomwhackers-teacher-training",
  },
  corporateEvents: {
    pl: "muzyczny-team-building",
    en: "music-team-building",
  },
  childrenWorkshops: {
    pl: "warsztaty-muzyczne-dla-dzieci",
    en: "music-workshops-for-children",
  },
  disc: { pl: "szkolenia-disc-dla-zespolow", en: "disc-team-training" },
  insights: { pl: "wiedza", en: "insights" },
  contact: { pl: "kontakt", en: "contact" },
  materials: { pl: "materialy", en: "materials" },
};

/**
 * Dawne angielskie adresy prowadzące do aktualnych stron kanonicznych.
 */
export const legacyRouteAliases = {
  "/en/knowledge": "/en/insights",
} as const;

/**
 * Lokalizowane ścieżki dokumentów prawnych.
 */
export const legalRoutes = {
  privacy: { pl: "/polityka-prywatnosci", en: "/en/privacy-policy" },
  terms: { pl: "/regulamin", en: "/en/terms" },
} as const;

/**
 * Zwraca publiczną ścieżkę strony w wybranym języku.
 */
export function pathFor(pageKey: PageKey, locale: Locale): string {
  const slug = routeMap[pageKey][locale];
  return locale === "pl" ? `/${slug}`.replace(/\/$/, "/") : `/en/${slug}`.replace(/\/$/, "/");
}

/**
 * Zwraca ścieżkę z prawidłową kotwicą dla bieżącej lokalizacji.
 */
export function pathWithAnchor(
  pageKey: PageKey,
  locale: Locale,
  anchor: string,
): string {
  return `${pathFor(pageKey, locale)}#${anchor}`;
}

/**
 * Zwraca klucz strony na podstawie lokalizowanego sluga.
 */
export function pageKeyFromSlug(locale: Locale, slug: string): PageKey | undefined {
  return (Object.keys(routeMap) as PageKey[]).find(
    (pageKey) => routeMap[pageKey][locale] === slug,
  );
}

/**
 * Zwraca odpowiednik bieżącej strony w drugim języku.
 */
export function alternateLocale(locale: Locale): Locale {
  return locale === "pl" ? "en" : "pl";
}
