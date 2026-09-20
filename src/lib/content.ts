import contentData from "@/content/site-content.json";
import type {
  HomepageData,
  Locale,
  PageData,
  PageKey,
} from "@/lib/types";

type ContentPageKey = Exclude<PageKey, "home">;
type RoutablePageKey = Exclude<PageKey, "materials">;

interface ContentDocument {
  /** Dane homepage dla obu lokalizacji. */
  homepageContent: Record<Locale, HomepageData>;
  /** Dane podstron (także noindex materials) dla obu lokalizacji. */
  pageContent: Record<ContentPageKey, Record<Locale, PageData>>;
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
export function getPage(pageKey: ContentPageKey, locale: Locale): PageData {
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
