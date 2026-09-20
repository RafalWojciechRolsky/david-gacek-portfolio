import { pathFor } from "@/lib/routes";
import type { FaqItem, Locale, PageData, PageKey } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { getMessages } from "@/messages/ui";

interface JsonLdObject {
  /** Wartości zgodne z minimalnym kontraktem JSON-LD używanym przez serwis. */
  [key: string]: string | number | string[] | JsonLdObject | JsonLdObject[];
}

/**
 * Buduje listę widocznych pytań FAQ dla danych strukturalnych.
 */
function faqSchema(items: FaqItem[]): JsonLdObject {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Zwraca adres kanoniczny encji, zachowując względny adres lokalnie bez domeny.
 */
function canonicalUrl(path: string): string {
  return siteConfig.siteUrl ? new URL(path, siteConfig.siteUrl).toString() : path;
}

/**
 * Zwraca trwały identyfikator osoby, by grafy każdej podstrony wskazywały tę samą encję.
 */
export function personJsonLdId(): string {
  return `${canonicalUrl("/")}#person`;
}

/**
 * Zwraca trwały identyfikator witryny, by strony i artykuły tworzyły jeden graf wiedzy.
 */
export function websiteJsonLdId(): string {
  return `${canonicalUrl("/")}#website`;
}

/**
 * Buduje dane Person i WebSite wspólne dla wszystkich stron.
 */
export function buildIdentityJsonLd(locale: Locale): JsonLdObject[] {
  const messages = getMessages(locale);
  const siteUrl = canonicalUrl("/");

  return [
    {
      "@type": "Person",
      "@id": personJsonLdId(),
      name: messages.brandName,
      url: siteUrl,
      jobTitle: messages.jobTitle,
      knowsAbout: [
        "Bum Bum Rurki",
        "Boomwhackers",
        "DISC",
        "edukacja muzyczna",
        "integracja zespołów",
      ],
      sameAs: [
        siteConfig.externalLinks.linkedin.href,
        siteConfig.externalLinks.instagram.href,
        siteConfig.externalLinks.facebook.href,
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteJsonLdId(),
      name: messages.brandName,
      url: siteUrl,
      inLanguage: ["pl", "en"],
    },
  ];
}

/**
 * Buduje BreadcrumbList z lokalizowaną etykietą strony głównej.
 * Strona główna pomija drugą pozycję, żeby nie duplikować tego samego adresu.
 */
function breadcrumbSchema(
  name: string,
  locale: Locale,
  pagePath: string,
  includeCurrent = true,
): JsonLdObject {
  const homeLabel = getMessages(locale).seo.home;
  const homePath = pathFor("home", locale);
  const homeItem: JsonLdObject = {
    "@type": "ListItem",
    position: 1,
    name: homeLabel,
    item: canonicalUrl(homePath),
  };
  const currentItem: JsonLdObject[] = includeCurrent
    ? [
        {
          "@type": "ListItem",
          position: 2,
          name,
          item: canonicalUrl(pagePath),
        },
      ]
    : [];

  return {
    "@type": "BreadcrumbList",
    itemListElement: [homeItem, ...currentItem],
  };
}

/**
 * Kompletny graf JSON-LD z jednym kontekstem schema.org.
 */
export type JsonLdGraph = {
  "@context": string;
  "@graph": JsonLdObject[];
};

/**
 * Zwraca dane strukturalne strony zgodne z widoczną treścią.
 */
export function buildJsonLd(
  page: PageData,
  locale: Locale,
  pageKey: PageKey,
): JsonLdGraph {
  const pageType =
    pageKey === "profile"
      ? "ProfilePage"
      : pageKey === "insights"
        ? "CollectionPage"
        : pageKey === "teacherTraining" ||
            pageKey === "corporateEvents" ||
            pageKey === "childrenWorkshops" ||
            pageKey === "disc"
          ? "Service"
          : "WebPage";
  const pagePath = pathFor(pageKey, locale);

  const pageSchema: JsonLdObject = {
    "@type": pageType,
    "@id": canonicalUrl(pagePath),
    name: page.title,
    description: page.seo.description,
    inLanguage: locale,
    url: canonicalUrl(pagePath),
    isPartOf: { "@id": websiteJsonLdId() },
  };

  if (pageType === "Service") {
    pageSchema.provider = {
      "@id": personJsonLdId(),
    };
    pageSchema.serviceType = page.title;
    pageSchema.areaServed = "PL";
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...buildIdentityJsonLd(locale),
      pageSchema,
      breadcrumbSchema(page.title, locale, pagePath, pageKey !== "home"),
      faqSchema(page.faq),
    ],
  };
}

/**
 * Buduje dane strukturalne strony technicznej lub prawnej bez FAQPage,
 * bo pytania FAQ nie są widoczne na tych stronach.
 */
export function buildUtilityJsonLd(
  title: string,
  description: string,
  locale: Locale,
  pagePath: string,
): JsonLdGraph {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...buildIdentityJsonLd(locale),
      {
        "@type": "WebPage",
        "@id": canonicalUrl(pagePath),
        name: title,
        description,
        inLanguage: locale,
        url: canonicalUrl(pagePath),
        isPartOf: { "@id": websiteJsonLdId() },
      },
      breadcrumbSchema(title, locale, pagePath),
    ],
  };
}
