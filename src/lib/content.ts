import contentData from "@/content/site-content.json";
import type {
  HomepageData,
  Locale,
  PageData,
  PageKey,
} from "@/lib/types";

type PublicPageKey = Exclude<PageKey, "home" | "materials">;
type RoutablePageKey = Exclude<PageKey, "materials">;

interface ContentDocument {
  /** Dane homepage dla obu lokalizacji. */
  homepageContent: Record<Locale, HomepageData>;
  /** Dane podstron dla obu lokalizacji. */
  pageContent: Record<PublicPageKey, Record<Locale, PageData>>;
}

const typedContentData = contentData as ContentDocument;

/**
 * Zwraca dane homepage dla wybranej lokalizacji.
 */
export function getHomepage(locale: Locale): HomepageData {
  return typedContentData.homepageContent[locale];
}

/**
 * Zwraca dane podstrony dla klucza i lokalizacji.
 */
export function getPage(pageKey: PublicPageKey, locale: Locale): PageData {
  return typedContentData.pageContent[pageKey][locale];
}

/**
 * Zwraca wszystkie klucze stron, które mają publiczne dane.
 */
export function getPublicPageKeys(): RoutablePageKey[] {
  return [
    "home",
    "profile",
    "teacherTraining",
    "corporateEvents",
    "childrenWorkshops",
    "disc",
    "insights",
    "contact",
  ];
}
