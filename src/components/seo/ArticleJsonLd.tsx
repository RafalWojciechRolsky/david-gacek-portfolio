import { absoluteUrl } from "@/lib/metadata";
import type { ArticleDetail, Locale } from "@/lib/types";
import { buildIdentityJsonLd, personJsonLdId, websiteJsonLdId } from "@/lib/json-ld";
import { pathFor } from "@/lib/routes";
import { getMessages } from "@/messages/ui";

interface ArticleJsonLdProps {
  /** Dane artykułu do oznaczenia. */
  article: ArticleDetail;
  /** Lokalizacja artykułu. */
  locale: Locale;
}

/**
 * Renderuje dane BlogPosting z obrazem, datami i autorem, zgodne z widoczną treścią artykułu.
 */
export function ArticleJsonLd({ article, locale }: ArticleJsonLdProps) {
  const articleUrl = absoluteUrl(article.href ?? "/");
  const messages = getMessages(locale);
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildIdentityJsonLd(locale),
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#blogposting`,
        headline: article.title,
        description: article.seoDescription,
        inLanguage: locale,
        url: articleUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        image: absoluteUrl(article.hero.src),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        articleSection: article.category.label,
        author: { "@id": personJsonLdId() },
        publisher: { "@id": personJsonLdId() },
        isPartOf: { "@id": websiteJsonLdId() },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: messages.seo.home,
            item: absoluteUrl(pathFor("home", locale)),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: messages.header.insights,
            item: absoluteUrl(pathFor("insights", locale)),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: articleUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
