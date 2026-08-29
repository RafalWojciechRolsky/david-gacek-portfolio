import { pathFor } from "@/lib/routes";
import type { FaqItem, Locale, PageData, PageKey } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { getMessages } from "@/messages/ui";

interface JsonLdObject {
  /** Wartości zgodne z minimalnym kontraktem JSON-LD używanym przez serwis. */
  [key: string]: string | string[] | JsonLdObject | JsonLdObject[];
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
 * Buduje dane Person i WebSite wspólne dla wszystkich stron.
 */
function identitySchema(locale: Locale, pageKey: PageKey): JsonLdObject[] {
  const messages = getMessages(locale);
  const pagePath = pathFor(pageKey, locale);
  const pageUrl = siteConfig.siteUrl
    ? new URL(pagePath, siteConfig.siteUrl).toString()
    : pagePath;

  return [
    {
      "@type": "Person",
      name: messages.brandName,
      url: pageUrl,
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
        siteConfig.externalLinks.patronite.href,
      ],
    },
    {
      "@type": "WebSite",
      name: messages.brandName,
      url: siteConfig.siteUrl || pagePath,
      inLanguage: locale,
    },
  ];
}

/**
 * Buduje BreadcrumbList zgodny z lokalizowaną ścieżką.
 */
function breadcrumbSchema(
  page: PageData,
  locale: Locale,
  pageKey: PageKey,
): JsonLdObject {
  const homeLabel = getMessages(locale).seo.home;
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: "1",
        name: homeLabel,
        item: siteConfig.siteUrl
          ? new URL(pathFor("home", locale), siteConfig.siteUrl).toString()
          : pathFor("home", locale),
      },
      {
        "@type": "ListItem",
        position: "2",
        name: page.title,
        item: siteConfig.siteUrl
          ? new URL(pathFor(pageKey, locale), siteConfig.siteUrl).toString()
          : pathFor(pageKey, locale),
      },
    ],
  };
}

/**
 * Zwraca dane strukturalne strony zgodne z widoczną treścią.
 */
export function buildJsonLd(
  page: PageData,
  locale: Locale,
  pageKey: PageKey,
): JsonLdObject[] {
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

  const pageSchema: JsonLdObject = {
    "@type": pageType,
    name: page.title,
    description: page.seo.description,
    inLanguage: locale,
    url: siteConfig.siteUrl
      ? new URL(pathFor(pageKey, locale), siteConfig.siteUrl).toString()
      : pathFor(pageKey, locale),
  };

  if (pageType === "Service") {
    pageSchema.provider = {
      "@type": "Person",
      name: "Dawid Gacek",
    };
    pageSchema.areaServed = "PL";
  }

  return [
    ...identitySchema(locale, pageKey),
    pageSchema,
    breadcrumbSchema(page, locale, pageKey),
    faqSchema(page.faq),
  ];
}
